import { inject, injectable } from "tsyringe";
import { ICompanyRepository } from "../../repositories/implemantation/ICompanyRepository";
import { ICompany } from "../../interfaces";
import { IUserRepository } from "../../../users/repositories/implemantation/IUserRepository";
import { AppError } from "../../../../shared/errors/AppErrors";
import { uploadImageFirebaseStorage } from "../../../../shared/infra/http/middlewares/firebaseStorage";

@injectable()
class CreateCompanyUseCase {
  constructor(
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute(
    { name, idgoogle, createdjobs, isRecruiter, email }: ICompany,
    file: Express.Multer.File,
  ): Promise<ICompany> {
    const verifyCompany = await this.companyRepository.findByIdGoogle(idgoogle);
    const verifyUser = await this.userRepository.findByIdGoogle(idgoogle);

    if (verifyUser || verifyCompany) {
      throw new AppError("Email already registered", 409);
    }

    const imgprofile = await uploadImageFirebaseStorage(file);

    const company = await this.companyRepository.createCompany({
      name,
      idgoogle,
      createdjobs,
      isRecruiter,
      imgprofile,
      email,
    });

    return company;
  }
}

export { CreateCompanyUseCase };
