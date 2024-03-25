import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/implemantation/IUserRepository";
import { AppError } from "../../../../shared/errors/AppErrors";
import { IEmploymentRepository } from "../../../employment/repositories/implamentarion/IEmploymentRepository";

@injectable()
class ListJobRegisteredUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("EmploymentRepository")
    private employmentRepository: IEmploymentRepository,
  ) {}

  async execute(userid: string) {
    const user = await this.userRepository.findByIdGoogle(userid);

    if (!user) {
      throw new AppError("Usuário não existe!", 400);
    }

    if (user.registeredjobs.length === 0) {
      throw new AppError("Você não registrou em nenhuma vaga!", 400);
    }

    if (user.registeredjobs.length < 1) {
      throw new AppError("Error ao buscar vagas!", 400);
    }

    const listJobRegistered = await this.userRepository.listJobRegistered(user);

    if (!listJobRegistered) {
      throw new AppError("Error ao buscar vagas!", 400);
    }

    return listJobRegistered;
  }
}

export { ListJobRegisteredUseCase };
