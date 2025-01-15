import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/implemantation/IUserRepository";
import { AppError } from "../../../../shared/errors/AppErrors";
import { IUser } from "../../interfaces";

interface IUseCase {
  name: string;
  email: string;
  linkedinURL: string;
  date: Date;
  description: string;
  idgoogle: string;
  workingGroup: string[];
}

@injectable()
class EditUserNoImgUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute({
    name,
    email,
    linkedinURL,
    date,
    description,
    idgoogle,
    workingGroup,
  }: IUseCase): Promise<IUser> {
    const user = await this.userRepository.findByIdGoogle(idgoogle);

    if (!user || !user._id) {
      throw new AppError("User with the provided ID not found", 404);
    }

    const userEdit = await this.userRepository.EditUserNoImg({
      name,
      description,
      date,
      linkedinURL,
      email,
      id: user._id,
      workingGroup,
    });

    if (!userEdit) {
      throw new AppError("Error searching for user", 404);
    }

    return userEdit;
  }
}

export { EditUserNoImgUseCase };
