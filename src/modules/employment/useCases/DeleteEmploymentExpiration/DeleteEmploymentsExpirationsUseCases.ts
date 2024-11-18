import { inject, injectable } from "tsyringe";
import { IEmploymentRepository } from "../../repositories/implamentarion/IEmploymentRepository";
import { AppError } from "../../../../shared/errors/AppErrors";
import { container } from "tsyringe";
import { DeleteIdsUsersRegisteredJobExpiredVacanciesUseCase } from "./useCases/DeleteIdsUsersRegisteredJobExpiredVacanciesUseCase";
import { DeleteIdsEmploymentsOfCompaniesUseCase } from "./useCases/DeleteIdsEmploymentsOfCompaniesUseCase";

@injectable()
class DeleteEmploymentsExpirationsUseCases {
  constructor(
    @inject("EmploymentRepository")
    private employmentRepository: IEmploymentRepository,
  ) {}

  async execute() {
    const deleteIdsUsersRegisteredUseCase = container.resolve(
      DeleteIdsUsersRegisteredJobExpiredVacanciesUseCase,
    );

    const deleteIdsEmploymentsOfCompaniesUseCase = container.resolve(
      DeleteIdsEmploymentsOfCompaniesUseCase,
    );

    const employments =
      await this.employmentRepository.findDateDeleteEmployments();

    if (!employments.length) {
      throw new AppError("No employments with delete dates found.", 404);
    }

    const idsEmploymentsMustDelete =
      this.employmentRepository.filterListIds(employments);

    if (!idsEmploymentsMustDelete) {
      throw new AppError("No ids found!", 404);
    }

    await deleteIdsUsersRegisteredUseCase.execute(
      idsEmploymentsMustDelete,
      employments,
    );

    await deleteIdsEmploymentsOfCompaniesUseCase.execute(
      employments,
      idsEmploymentsMustDelete,
    );

    await this.employmentRepository.deleteEmploymentsExpired(
      idsEmploymentsMustDelete,
    );
  }
}

export { DeleteEmploymentsExpirationsUseCases };
