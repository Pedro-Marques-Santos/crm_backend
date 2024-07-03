import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/implemantation/IUserRepository";
import { IUser } from "../../interfaces";
import { ICompanyRepository } from "../../../companies/repositories/implemantation/ICompanyRepository";
import { AppError } from "../../../../shared/errors/AppErrors";
import { uploadImageFirebaseStorage } from "../../../../shared/infra/http/middlewares/firebaseStorage";

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
      isRecruiter,
    }: IUser,
    file: Express.Multer.File,
  ): Promise<IUser> {
    const verifyUser = await this.userRepository.findByIdGoogle(idgoogle);
    const verifyCompany = await this.companyRepository.findByIdGoogle(idgoogle);

    if (verifyUser || verifyCompany) {
      throw new AppError("email already registered", 409);
    }

    if (workingGroup.length !== 3) {
      throw new AppError(
        "belonging to the working group, only 3 groups can be selected!",
        404,
      );
    }

    const imgprofile = await uploadImageFirebaseStorage(file);

    const user = await this.userRepository.createUser({
      name,
      idgoogle,
      linkedinURL,
      email,
      workingGroup,
      description,
      date,
      registeredjobs,
      isRecruiter,
      imgprofile,
    });

    return user;
  }
}

export { CreateUserUseCase };
