import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/implemantation/IUserRepository";
import { IUser } from "../../interfaces";
import { ICompanyRepository } from "../../../companies/repositories/implmantation/ICompanyRepository";
import { AppError } from "../../../../shared/errors/AppErrors";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository,
  ) {}

  async execute({
    name,
    idgoogle,
    lastname,
    description,
    date,
    registeredjobs,
    isRecruiter,
  }: IUser): Promise<IUser> {
    const verifyUser = await this.userRepository.findByIdGoogle(idgoogle);
    const verifyCompany = await this.companyRepository.findByIdGoogle(idgoogle);

    if (verifyUser || verifyCompany) {
      throw new AppError("email already registered", 409);
    }

    const user = await this.userRepository.createUser({
      name,
      idgoogle,
      lastname,
      description,
      date,
      registeredjobs,
      isRecruiter,
    });

    return user;
  }
}

export { CreateUserUseCase };
