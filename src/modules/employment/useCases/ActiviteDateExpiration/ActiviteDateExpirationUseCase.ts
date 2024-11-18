import { inject, injectable } from "tsyringe";
import { IEmploymentRepository } from "../../repositories/implamentarion/IEmploymentRepository";
import { AppError } from "../../../../shared/errors/AppErrors";

@injectable()
class ActiviteDateExpirationUseCase {
  constructor(
    @inject("EmploymentRepository")
    private employmentRepository: IEmploymentRepository,
  ) {}

  async execute(): Promise<void> {
    const employmentsExpiration =
      await this.employmentRepository.findExpiredEmployments();

    if (!employmentsExpiration.length) {
      throw new AppError("No employments with expired dates found.", 404);
    }

    const idsEmploymentsExpiration = this.employmentRepository.filterListIds(
      employmentsExpiration,
    );

    if (!idsEmploymentsExpiration) {
      throw new AppError("No ids found!", 404);
    }

    try {
      await this.employmentRepository.ActiveDateExpirationInEmployments(
        idsEmploymentsExpiration,
      );
    } catch (error) {
      throw new AppError(
        "Failed to activate date expiration for employments.",
        500,
      );
    }
  }
}

export { ActiviteDateExpirationUseCase };
