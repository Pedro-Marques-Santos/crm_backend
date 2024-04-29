import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppErrors";
import { ICompanyRepository } from "../../repositories/implemantation/ICompanyRepository";

@injectable()
class ListCreatedJobsUseCase {
  constructor(
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository,
  ) {}

  async execute(idgoogleuser: string) {
    const company = await this.companyRepository.findByIdGoogle(idgoogleuser);

    if (!company) {
      throw new AppError("Company does not exist!", 404);
    }

    if (company.createdjobs.length === 0) {
      throw new AppError("You have not created any job openings!", 404);
    }

    if (company.createdjobs.length < 0) {
      throw new AppError("Error when searching for vacancies!", 404);
    }

    const listjobscreated =
      await this.companyRepository.listJobsCreated(company);

    if (!listjobscreated) {
      throw new AppError("Error when searching for created vacancies!", 404);
    }

    return listjobscreated;
  }
}

export { ListCreatedJobsUseCase };
