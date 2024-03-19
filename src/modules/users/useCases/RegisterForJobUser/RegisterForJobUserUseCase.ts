import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/implemantation/IUserRepository";
import { IUser } from "../../interfaces";
import { AppError } from "../../../../shared/errors/AppErrors";
import { IEmploymentRepository } from "../../../employment/repositories/implamentarion/IEmploymentRepository";

@injectable()
class RegisterForJobUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("EmploymentRepository")
    private employmentRepository: IEmploymentRepository,
  ) {}

  async execute(idgoogleuser: string, idemployment: string): Promise<IUser> {
    const user = await this.userRepository.findByIdGoogle(idgoogleuser);
    const employment = await this.employmentRepository.findById(idemployment);

    if (!user || !user._id) {
      throw new AppError("user não existe!", 400);
    }

    if (!employment || !employment._id) {
      throw new AppError("Vaga de emprego não existe!", 400);
    }

    const userexist = user.registeredjobs.includes(idemployment);

    const userexistinemployment = employment.ourparticipants.includes(
      employment._id.toString(),
    );

    if (userexist || userexistinemployment) {
      throw new AppError("usuário já está registrado nessa vaga!", 400);
    }

    const modifyUser = await this.userRepository.addJobRegister(
      user,
      idemployment,
    );

    const modifyEmployment = await this.employmentRepository.addJobParticipants(
      employment,
      user._id.toString(),
    );

    if (!modifyUser || !modifyEmployment) {
      throw new AppError("Erro ao registrar em novo processo seletivo!", 400);
    }

    return modifyUser;
  }
}

export { RegisterForJobUserUseCase };
