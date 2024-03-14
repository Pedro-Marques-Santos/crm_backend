import { inject, injectable } from "tsyringe";
import { ICompanyRepository } from "../../repositories/implmantation/ICompanyRepository";
import { ICompany } from "../../interfaces";
import { IUserRepository } from "../../../users/repositories/implemantation/IUserRepository";
import { AppError } from "../../../../shared/errors/AppErrors";

@injectable()
class CreateCompanyUseCase {
  constructor(
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute({
    name,
    idgoogle,
    lastname,
    createdjobs,
    isRecruiter,
  }: ICompany): Promise<ICompany> {
    const verifyCompany = await this.companyRepository.findByIdGoogle(idgoogle);
    const verifyUser = await this.userRepository.findByIdGoogle(idgoogle);

    if (verifyUser || verifyCompany) {
      throw new AppError("Email already registered", 409);
    }

    const company = await this.companyRepository.createCompany({
      name,
      idgoogle,
      lastname,
      createdjobs,
      isRecruiter,
    });

    return company;
  }
}

export { CreateCompanyUseCase };
