import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/implemantation/IUserRepository";
import { IUser } from "../../interfaces";
import { AppError } from "../../../../shared/errors/AppErrors";

@injectable()
class RegisterForJobUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute(idgoogleuser: string, idemployment: string): Promise<IUser> {
    const user = await this.userRepository.findByIdGoogle(idgoogleuser);

    if (!user) {
      throw new AppError("user não existe!", 400);
    }

    const userexist = user.registeredjobs.includes(idemployment);

    if (userexist) {
      throw new AppError("usuário já está registrado nessa vaga!", 400);
    }

    const modifyUser = await this.userRepository.addJobRegister(
      user,
      idemployment,
    );

    if (!modifyUser) {
      throw new AppError("erro ao modificar user!", 400);
    }

    return modifyUser;
  }
}

export { RegisterForJobUserUseCase };
