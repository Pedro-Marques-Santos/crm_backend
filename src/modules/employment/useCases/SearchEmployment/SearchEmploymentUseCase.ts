import { inject, injectable } from "tsyringe";
import { IEmploymentRepository } from "../../repositories/implamentarion/IEmploymentRepository";
import { AppError } from "../../../../shared/errors/AppErrors";
import { IEmployment } from "../../interfaces";

@injectable()
class SearchEmploymentUseCase {
  constructor(
    @inject("EmploymentRepository")
    private employmentRepository: IEmploymentRepository,
  ) {}

  async execute(idemployment: string): Promise<IEmployment> {
    if (!idemployment) {
      throw new AppError("Id Employment does not found!", 404);
    }

    const employment =
      await this.employmentRepository.findByIdNotExpired(idemployment);

    if (!employment) {
      throw new AppError("Employment does not found!", 404);
    }

    return employment;
  }
}

export { SearchEmploymentUseCase };
