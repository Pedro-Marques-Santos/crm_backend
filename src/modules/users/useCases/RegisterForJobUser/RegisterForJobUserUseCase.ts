import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/implemantation/IUserRepository";
import { IUser } from "../../interfaces";
import { AppError } from "../../../../shared/errors/AppErrors";
import { IEmploymentRepository } from "../../../employment/repositories/implamentarion/IEmploymentRepository";
import { IOurParticipants } from "../../../employment/interfaces";

@injectable()
class RegisterForJobUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("EmploymentRepository")
    private employmentRepository: IEmploymentRepository,
  ) {}

  async execute(
    idgoogleuser: string,
    idemployment: string,
    questions: string[],
    date: Date,
  ): Promise<IUser> {
    const user = await this.userRepository.findByIdGoogle(idgoogleuser);
    const employment = await this.employmentRepository.findById(idemployment);

    if (!user || !user._id) {
      throw new AppError("Resource not found: User does not exist!", 404);
    }

    if (!employment || !employment._id) {
      throw new AppError("Job vacancy does not exist!", 404);
    }

    if (
      employment.questionaboutjob &&
      questions.length !== employment.questionaboutjob.length
    ) {
      throw new AppError(
        "Validation failed: Please provide answers to all required questions!",
        422,
      );
    }

    const userexist = user.registeredjobs.some(
      (job) => job.id && job.id.includes(idemployment),
    );

    const userexistinemployment = employment.ourparticipants.find(
      (participant: IOurParticipants) =>
        participant.id === employment._id?.toString(),
    );

    if (userexist || userexistinemployment) {
      throw new AppError(
        "Conflict: User is already registered for this job vacancy!",
        409,
      );
    }

    const modifyUser = await this.userRepository.addJobRegister(
      user,
      idemployment,
      date,
    );

    await this.userRepository.addRegisterStatistics(user, idemployment, date);

    const modifyEmployment = await this.employmentRepository.addJobParticipants(
      employment,
      user._id.toString(),
      questions,
    );

    if (!modifyUser || !modifyEmployment) {
      throw new AppError(
        "Operation failed: Unable to complete the registration process!",
        400,
      );
    }

    return modifyUser;
  }
}

export { RegisterForJobUserUseCase };
