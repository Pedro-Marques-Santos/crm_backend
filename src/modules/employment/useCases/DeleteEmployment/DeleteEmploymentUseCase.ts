import { inject, injectable } from "tsyringe";
import { IEmploymentRepository } from "../../repositories/implamentarion/IEmploymentRepository";
import { ICompanyRepository } from "../../../companies/repositories/implemantation/ICompanyRepository";
import { AppError } from "../../../../shared/errors/AppErrors";
import { IUserRepository } from "../../../users/repositories/implemantation/IUserRepository";

@injectable()
class DeleteEmploymentUseCase {
  constructor(
    @inject("EmploymentRepository")
    private employmentRepository: IEmploymentRepository,
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute(
    idEmployment: string,
    idgoogle: string,
    statusEmplyoment: boolean,
  ): Promise<void> {
    const company = await this.companyRepository.findByIdGoogle(idgoogle);
    const employment = await this.employmentRepository.findById(idEmployment);

    if (statusEmplyoment === null || statusEmplyoment === undefined) {
      throw new AppError("Employment status not found!", 404);
    }

    if (!employment || !company || !employment._id) {
      throw new AppError("Employment does not found!", 404);
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

    //User
    const usersIdsRegisteredInEmployment = employment.ourparticipants.map(
      (participant) => participant.id,
    );

    const users = await this.userRepository.findByUsersIds(
      usersIdsRegisteredInEmployment,
    );

    const updatedUsers = this.userRepository.updatedUsersDateVacancyDelete(
      users,
      [employment._id.toString()],
    );

    await this.userRepository.saveUpdatedUsers(updatedUsers);

    //company
    const updatedCompanies = this.companyRepository.filterUpdatedCompanies(
      [company],
      [employment._id.toString()],
    );

    await this.companyRepository.saveUpdatedCompanies(updatedCompanies);

    //deleteEmployment
    await this.employmentRepository.deleteEmploymentsExpired([employment._id]);
  }
}

export { DeleteEmploymentUseCase };
