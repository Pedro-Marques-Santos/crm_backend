import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/implemantation/IUserRepository";
import { AppError } from "../../../../shared/errors/AppErrors";

import path from "path";
import fs from "fs";
import { compressPDF } from "../../../../shared/external-tools/ghostscript/compressPDF";
import {
  deletedPdfFromFirebaseStorage,
  uploadPDFtoFirebaseStorage,
} from "../../../../shared/infra/http/middlewares/firebaseStorage";
import { IUser } from "../../interfaces";

interface IEditUseCase {
  idgoogle: string;
  pdfFile: Express.Multer.File;
}

@injectable()
class EditResumeUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute({ idgoogle, pdfFile }: IEditUseCase): Promise<IUser> {
    const user = await this.userRepository.findByIdGoogle(idgoogle);

    if (!user || !user._id) {
      throw new AppError("User not found!", 404);
    }

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

    if (user.curriculumfile) {
      await deletedPdfFromFirebaseStorage(user.curriculumfile);
    }

    const curriculumfile = await uploadPDFtoFirebaseStorage(
      {
        ...pdfFile,
        buffer: compressedBuffer,
      },
      user._id,
    );

    const newUser = await this.userRepository.putPdfInUserProfile(
      user,
      curriculumfile,
    );

    if (!newUser) {
      throw new AppError("There was an error editing the user's pdf!", 404);
    }

    return newUser;
  }
}

export { EditResumeUseCase };
