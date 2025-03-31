import { inject, injectable } from "tsyringe";
import { IEmploymentRepository } from "../../repositories/implamentarion/IEmploymentRepository";
import { AppError } from "../../../../shared/errors/AppErrors";
import { IUserParticipant } from "../../interfaces";
import { ICompanyRepository } from "../../../companies/repositories/implemantation/ICompanyRepository";

@injectable()
class ListParticipantsUseCases {
  constructor(
    @inject("EmploymentRepository")
    private employmentRepository: IEmploymentRepository,
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository,
  ) {}

  async execute(
    idgoogle: string,
    idemployment: string,
    statusEmplyoment: boolean,
  ): Promise<IUserParticipant[]> {
    const employment = await this.employmentRepository.findById(idemployment);
    const company = await this.companyRepository.findByIdGoogle(idgoogle);

    if (!company) {
      throw new AppError("Company does not exist!", 404);
    }

    if (!employment) {
      throw new AppError("Job vacancy not found in the system!", 404);
    }

    if (statusEmplyoment === null || statusEmplyoment === undefined) {
      throw new AppError("Employment status not found!", 404);
    }

    if (employment.dataExpirationActivity !== statusEmplyoment) {
      throw new AppError(
        "The employment status has been updated. Please refresh the page to see the latest changes.",
        409,
      );
    }

    const listParticipants =
      await this.employmentRepository.listParticipants(employment);

    if (!listParticipants) {
      throw new AppError(
        "Errors when searching for users registered in the vacancy!",
        404,
      );
    }

    return listParticipants;
  }
}

export { ListParticipantsUseCases };
