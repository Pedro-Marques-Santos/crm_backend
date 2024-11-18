import { inject, injectable } from "tsyringe";
import { IEmploymentRepository } from "../../../repositories/implamentarion/IEmploymentRepository";
import { ICompanyRepository } from "../../../../companies/repositories/implemantation/ICompanyRepository";
import { IEmployment } from "../../../interfaces";

@injectable()
class DeleteIdsEmploymentsOfCompaniesUseCase {
  constructor(
    @inject("EmploymentRepository")
    private employmentRepository: IEmploymentRepository,
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository,
  ) {}

  async execute(
    employments: IEmployment[],
    idsEmploymentsMustDelete: string[],
  ) {
    const idsCompaniesMustDeleteEmploymentsIds =
      this.employmentRepository.findIdsCompaniesThatIdsEmploymentsMustDelete(
        employments,
      );

    const companies = await this.companyRepository.companiesMustBeEdited(
      idsCompaniesMustDeleteEmploymentsIds,
    );

    const updatedCompanies = this.companyRepository.filterUpdatedCompanies(
      companies,
      idsEmploymentsMustDelete,
    );

    await this.companyRepository.saveUpdatedCompanies(updatedCompanies);
  }
}

export { DeleteIdsEmploymentsOfCompaniesUseCase };
