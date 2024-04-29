import { inject, injectable } from "tsyringe";
import { container } from "tsyringe";
import { Employment } from "../../model";
import { IEmploymentRepository } from "../../repositories/implamentarion/IEmploymentRepository";
import { AppError } from "../../../../shared/errors/AppErrors";
import { ExpirationEmploymentUpdateUsersUseCase } from "./ExpirationEmploymentUpdateUsersUseCase";
import { ExpirationEmploymentUpdateCompaniesUseCase } from "./ExpirationEmploymentUpdateCompaniesUseCase";
import { ExpirationEmploymentDeleteUseCase } from "./ExpirationEmploymentDeleteUseCase";

@injectable()
class ExpirationEmploymentDeleteAndUpdate {
  constructor(
    @inject("EmploymentRepository")
    private employmentRepository: IEmploymentRepository,
  ) {}

  async execute() {
    const employmentsMustDeleted = await Employment.find({
      dataDelete: { $lte: new Date() },
    });

    if (employmentsMustDeleted.length < 1) {
      throw new AppError("No jobs to delete", 404);
    }

    const listIdsEmploymentMustDeleted =
      this.employmentRepository.filterListIdsMustDeletedDate(
        employmentsMustDeleted,
      );

    if (!listIdsEmploymentMustDeleted) {
      throw new AppError("Error filtering idsEmploymentsMustDeleted", 400);
    }

    const expirationEmploymentUpdateUsersUseCase = container.resolve(
      ExpirationEmploymentUpdateUsersUseCase,
    );

    const expirationEmploymentUpdateCompaniesUseCase = container.resolve(
      ExpirationEmploymentUpdateCompaniesUseCase,
    );

    const expirationEmploymentDeleteUseCase = container.resolve(
      ExpirationEmploymentDeleteUseCase,
    );

    await expirationEmploymentUpdateUsersUseCase.execute(
      listIdsEmploymentMustDeleted,
      employmentsMustDeleted,
    );

    await expirationEmploymentUpdateCompaniesUseCase.execute(
      employmentsMustDeleted,
      listIdsEmploymentMustDeleted,
    );

    await expirationEmploymentDeleteUseCase.execute(
      listIdsEmploymentMustDeleted,
    );
  }
}

export { ExpirationEmploymentDeleteAndUpdate };
