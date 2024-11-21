import { inject, injectable } from "tsyringe";
import { ICompanyRepository } from "../../repositories/implemantation/ICompanyRepository";
import { AppError } from "../../../../shared/errors/AppErrors";
import { IEmployment } from "../../../employment/interfaces";

@injectable()
class ListCreatedJobsExpiredUseCase {
  constructor(
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository,
  ) {}

  async execute(idgoogle: string): Promise<IEmployment[] | []> {
    const company = await this.companyRepository.findByIdGoogle(idgoogle);

    if (!company) {
      throw new AppError("Company does not exist!", 404);
    }

    if (company.createdjobs.length === 0) {
      return [];
    }

    if (company.createdjobs.length < 0) {
      throw new AppError("Error when searching for vacancies!", 404);
    }

    const employments =
      await this.companyRepository.listJobsCreatedExpired(company);

    return employments;
  }
}

export { ListCreatedJobsExpiredUseCase };
