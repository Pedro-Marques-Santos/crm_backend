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
      throw new AppError("User does not exist!", 400);
    }

    if (!employment || !employment._id) {
      throw new AppError("Job vacancy does not exist!", 400);
    }

    if (
      employment.questionaboutjob &&
      questions.length !== employment.questionaboutjob.length
    ) {
      throw new AppError(
        "You must answer all of the Recruiter's questions!",
        422,
      );
    }

    const userexist = user.registeredjobs.some((job) =>
      job.id.includes(idemployment),
    );

    const userexistinemployment = employment.ourparticipants.find(
      (participant: IOurParticipants) =>
        participant.id === employment._id?.toString(),
    );

    if (userexist || userexistinemployment) {
      throw new AppError("User is already registered for this vacancy!", 400);
    }

    const modifyUser = await this.userRepository.addJobRegister(
      user,
      idemployment,
      date,
    );

    const modifyEmployment = await this.employmentRepository.addJobParticipants(
      employment,
      user._id.toString(),
      questions,
    );

    if (!modifyUser || !modifyEmployment) {
      throw new AppError(
        "Error when registering in new selection process!",
        400,
      );
    }

    return modifyUser;
  }
}

export { RegisterForJobUserUseCase };
