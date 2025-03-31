import { inject, injectable } from "tsyringe";
import { IEmploymentRepository } from "../../repositories/implamentarion/IEmploymentRepository";
import { IEmployment, IEmploymentUseCase } from "../../interfaces";
import { AppError } from "../../../../shared/errors/AppErrors";
import { ICompanyRepository } from "../../../companies/repositories/implemantation/ICompanyRepository";

@injectable()
class EditEmploymentUseCase {
  constructor(
    @inject("EmploymentRepository")
    private employmentRepository: IEmploymentRepository,
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository,
  ) {}

  async execute(
    {
      name,
      title,
      description,
      occupationarea,
      entrylevel,
      typehiring,
      workmodality,
      city,
      region,
      questionaboutjob,
      ourparticipants,
      wage,
      steps,
      idgoogle,
    }: IEmploymentUseCase,
    idemployment: string,
    statusEmplyoment: boolean,
  ): Promise<IEmployment> {
    const company = await this.companyRepository.findByIdGoogle(idgoogle);
    const employment = await this.employmentRepository.findById(idemployment);

    if (!employment || !company) {
      throw new AppError("Employment does not found!", 404);
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

    if (employment.companyId !== company._id?.toString()) {
      throw new AppError("Access to this employment record is denied", 403);
    }

    const newEmployment = await this.employmentRepository.editEmployment(
      {
        name,
        title,
        description,
        occupationarea,
        entrylevel,
        typehiring,
        workmodality,
        city,
        region,
        idgoogle,
        questionaboutjob,
        ourparticipants,
        wage,
        steps,
      },
      idemployment,
    );

    if (!newEmployment) {
      throw new AppError("Error in edit employment!", 404);
    }

    return newEmployment;
  }
}

export { EditEmploymentUseCase };
