import { inject, injectable } from "tsyringe";
import { ICompanyRepository } from "../../../companies/repositories/implemantation/ICompanyRepository";
import { IEmployment } from "../../interfaces";

@injectable()
class ExpirationEmploymentUpdateCompaniesUseCase {
  constructor(
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository,
  ) {}

  async execute(
    employmentsMustDeleted: IEmployment[],
    listIdsEmploymentMustDeleted: string[],
  ) {
    const listIdsCompanyMustDeletedInArrayEmplyoment =
      this.companyRepository.filterListIdsCompanyMustDeletedInArrayEmplyoment(
        employmentsMustDeleted,
      );

    const companies = await this.companyRepository.companiesMustBeEdited(
      listIdsCompanyMustDeletedInArrayEmplyoment,
    );

    const updatedCompanies = this.companyRepository.filterUpdatedCompanies(
      companies,
      listIdsEmploymentMustDeleted,
    );

    await this.companyRepository.saveUpdatedCompanies(updatedCompanies);
  }
}

export { ExpirationEmploymentUpdateCompaniesUseCase };
