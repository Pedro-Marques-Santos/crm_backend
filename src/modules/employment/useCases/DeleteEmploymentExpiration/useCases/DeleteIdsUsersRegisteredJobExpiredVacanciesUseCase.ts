import { inject, injectable } from "tsyringe";
import { IEmploymentRepository } from "../../../repositories/implamentarion/IEmploymentRepository";
import { IEmployment } from "../../../interfaces";
import { IUserRepository } from "../../../../users/repositories/implemantation/IUserRepository";

@injectable()
class DeleteIdsUsersRegisteredJobExpiredVacanciesUseCase {
  constructor(
    @inject("EmploymentRepository")
    private employmentRepository: IEmploymentRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute(
    idsEmploymentsMustDelete: string[],
    employments: IEmployment[],
  ) {
    const usersThatIdEmploymentMustDeleted =
      this.employmentRepository.findIdsUsersThatIdsEmploymentsMustDelete(
        employments,
      );

    const users = await this.userRepository.findByUsersIds(
      usersThatIdEmploymentMustDeleted,
    );

    const updatedUsers = this.userRepository.updatedUsersDateVacancyDelete(
      users,
      idsEmploymentsMustDelete,
    );

    await this.userRepository.saveUpdatedUsers(updatedUsers);
  }
}

export { DeleteIdsUsersRegisteredJobExpiredVacanciesUseCase };
