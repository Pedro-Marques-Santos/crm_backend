import { inject, injectable } from "tsyringe";
import { IEmploymentRepository } from "../../repositories/implamentarion/IEmploymentRepository";
import { AppError } from "../../../../shared/errors/AppErrors";
import { IEmployment } from "../../interfaces";

@injectable()
class NextGroupStepUseCase {
  constructor(
    @inject("EmploymentRepository")
    private employmentRepository: IEmploymentRepository,
  ) {}

  async execute(idemployment: string, idusers: string[]): Promise<IEmployment> {
    if (idusers.length > 10) {
      throw new AppError(
        "The maximum number of users allowed to advance in the group per step is 10!",
        404,
      );
    }

    const employment = await this.employmentRepository.findById(idemployment);

    if (!employment) {
      throw new AppError("Job vacancy not found in the system!", 404);
    }

    const participantsIndexes =
      this.employmentRepository.findIndexOurparticipants(
        employment.ourparticipants,
        idusers,
      );

    const participants = this.employmentRepository.allparticipant(
      participantsIndexes,
      employment,
    );

    const stepOne = participants[0].step;

    if (employment.steps.length <= stepOne) {
      throw new AppError("User is already in the last step!", 404);
    }

    const allSameStep = this.employmentRepository.allSameStepParticipants(
      participants,
      stepOne,
    );

    if (!allSameStep) {
      throw new AppError(
        "All employees need to be at the same stage to move forward together to the next step!",
        404,
      );
    }

    const modifiedEmployment =
      this.employmentRepository.modifyEmploymentWithAllNewSteps(
        participantsIndexes,
        employment,
        stepOne,
      );

    const newEmployment =
      await this.employmentRepository.upgradeEmploymenToNextStep(
        modifiedEmployment,
      );

    if (!newEmployment) {
      throw new AppError("Error sending users to next step!", 404);
    }

    return newEmployment;
  }
}

export { NextGroupStepUseCase };
