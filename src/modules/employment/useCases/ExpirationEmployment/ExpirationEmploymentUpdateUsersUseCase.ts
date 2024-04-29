import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../users/repositories/implemantation/IUserRepository";
import { IEmployment } from "../../interfaces";

@injectable()
class ExpirationEmploymentUpdateUsersUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute(
    listIdsEmploymentMustDeleted: string[],
    employmentsMustDeleted: IEmployment[],
  ) {
    const listUsersThatIdEmploymentMustDeleted =
      await this.userRepository.listAllUsersThatIdEmploymentMustDeleted(
        employmentsMustDeleted,
      );

    const users = await this.userRepository.findByUsersIds(
      listUsersThatIdEmploymentMustDeleted,
    );

    const updatedUsers = this.userRepository.filterUpdatedUsers(
      users,
      listIdsEmploymentMustDeleted,
    );

    await this.userRepository.saveUpdatedUsers(updatedUsers);
  }
}

export { ExpirationEmploymentUpdateUsersUseCase };
