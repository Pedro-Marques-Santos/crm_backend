import { inject, injectable } from "tsyringe";
import { IEmploymentRepository } from "../../repositories/implamentarion/IEmploymentRepository";
import { ICompanyRepository } from "../../../companies/repositories/implemantation/ICompanyRepository";
import { AppError } from "../../../../shared/errors/AppErrors";

@injectable()
class ReactiveEmploymentUseCase {
  constructor(
    @inject("EmploymentRepository")
    private employmentRepository: IEmploymentRepository,
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository,
  ) {}

  async execute(idgoogle: string, idemployment: string, qtDays: number) {
    if (qtDays < 10) {
      throw new AppError("Invalid number of days", 404);
    }

    const company = await this.companyRepository.findByIdGoogle(idgoogle);
    const employment =
      await this.employmentRepository.findByIdExpiration(idemployment);

    if (!employment || !company) {
      throw new AppError("Employment does not found!", 404);
    }

    if (employment.companyId !== company._id?.toString()) {
      throw new AppError("Access to this employment record is denied", 403);
    }

    const { currentDate, newDataExpiration, newDateDelete } =
      await this.employmentRepository.calculateNewDates(qtDays);

    const newEmployment = await this.employmentRepository.reactiveEmployment(
      employment,
      currentDate,
      newDataExpiration,
      newDateDelete,
    );

    if (!newEmployment) {
      throw new AppError("Employment does not found!", 404);
    }

    return newEmployment;
  }
}

export { ReactiveEmploymentUseCase };
