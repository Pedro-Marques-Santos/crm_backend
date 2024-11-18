import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/implemantation/IUserRepository";
import { IUser } from "../../interfaces";
import { ICompanyRepository } from "../../../companies/repositories/implemantation/ICompanyRepository";
import { AppError } from "../../../../shared/errors/AppErrors";
import {
  uploadImageFirebaseStorage,
  uploadPDFtoFirebaseStorage,
} from "../../../../shared/infra/http/middlewares/firebaseStorage";
import { compressPDF } from "../../../../shared/external-tools/ghostscript/compressPDF";
import path from "path";
import fs from "fs";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository,
  ) {}

  async execute(
    {
      name,
      idgoogle,
      linkedinURL,
      email,
      workingGroup,
      description,
      date,
      registeredjobs,
      jobsstatistics,
      isRecruiter,
      title,
    }: IUser,
    imageFile: Express.Multer.File,
    pdfFile: Express.Multer.File,
  ): Promise<IUser> {
    const verifyUser = await this.userRepository.findByIdGoogle(idgoogle);
    const verifyCompany = await this.companyRepository.findByIdGoogle(idgoogle);

    if (verifyUser || verifyCompany) {
      throw new AppError("email already registered", 409);
    }

    if (workingGroup.length < 3 || workingGroup.length > 10) {
      throw new AppError(
        "Working group can not more than ten or less than three",
        404,
      );
    }

    const user = await this.userRepository.createUser({
      name,
      idgoogle,
      linkedinURL,
      email,
      workingGroup,
      description,
      date,
      registeredjobs,
      jobsstatistics,
      isRecruiter,
      imgprofile: null,
      title,
      curriculumfile: null,
    });

    if (!user || !user._id) {
      throw new AppError("Error ao criar usuário", 404);
    }

    const imgprofile = await uploadImageFirebaseStorage(imageFile, user._id);

    let compressedBuffer: Buffer;

    try {
      // Comprimir o PDF antes do upload
      const outputFilePath = path.join(__dirname, "compressed.pdf");
      await compressPDF(pdfFile.buffer, outputFilePath);
      compressedBuffer = fs.readFileSync(outputFilePath);

      // Remover o arquivo temporário comprimido após o uso
      fs.unlinkSync(outputFilePath);
    } catch (error) {
      // Caso ocorra algum problema na compressão, usar o PDF original
      console.error(
        "Falha ao comprimir o PDF, enviando o arquivo original.",
        error,
      );
      compressedBuffer = pdfFile.buffer;
    }

    const curriculumfile = await uploadPDFtoFirebaseStorage(
      {
        ...pdfFile,
        buffer: compressedBuffer,
      },
      user._id,
    );

    const newUser = await this.userRepository.putImageAndPdfInUserProfile(
      user,
      imgprofile,
      curriculumfile,
    );

    if (!newUser) {
      throw new AppError(
        "User created successfully, but there was an error saving img and pdf",
        500,
      );
    }

    return newUser || user;
  }
}

export { CreateUserUseCase };
