import { inject, injectable } from "tsyringe";
import { IEmploymentRepository } from "../../../employment/repositories/implamentarion/IEmploymentRepository";
import { IEmployment } from "../../../employment/interfaces";
import { AppError } from "../../../../shared/errors/AppErrors";

@injectable()
class NextStepUseCase {
  constructor(
    @inject("EmploymentRepository")
    private employmentRepository: IEmploymentRepository,
  ) {}

  async execute(idemployment: string, iduser: string): Promise<IEmployment> {
    const employment = await this.employmentRepository.findById(idemployment);

    if (!employment) {
      throw new AppError("Job vacancy not found in the system!", 404);
    }

    const participantIndex = this.employmentRepository.findIndexOurparticipant(
      employment.ourparticipants,
      iduser,
    );

    if (participantIndex === -1) {
      throw new AppError("Participant not found!", 404);
    }

    const participant = employment.ourparticipants[participantIndex];

    if (employment.steps.length <= participant.step) {
      throw new AppError("User is already in the last step!", 404);
    }

    employment.ourparticipants[participantIndex].step = participant.step + 1;

    const newEmployment =
      await this.employmentRepository.upgradeEmploymenToNextStep(employment);

    if (!newEmployment) {
      throw new AppError("Error sending user to next step!", 404);
    }

    return newEmployment;
  }
}

export { NextStepUseCase };
