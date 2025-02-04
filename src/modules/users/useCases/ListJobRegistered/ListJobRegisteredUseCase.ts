import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/implemantation/IUserRepository";
import { AppError } from "../../../../shared/errors/AppErrors";
import { IListJobsCreated } from "../../interfaces";

@injectable()
class ListJobRegisteredUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute(userid: string): Promise<IListJobsCreated[] | []> {
    const user = await this.userRepository.findByIdGoogle(userid);

    if (!user) {
      throw new AppError("User does not exist!", 404);
    }

    if (user.registeredjobs.length === 0) {
      return [];
    }

    if (user.registeredjobs.length < 1) {
      throw new AppError("Error when searching for vacancies!", 404);
    }

    const listJobRegistered = await this.userRepository.listJobRegistered(user);

    if (!listJobRegistered) {
      throw new AppError("Error when searching for vacancies!", 404);
    }

    return listJobRegistered;
  }
}

export { ListJobRegisteredUseCase };
