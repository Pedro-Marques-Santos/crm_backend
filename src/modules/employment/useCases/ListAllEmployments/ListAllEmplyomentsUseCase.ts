import { inject, injectable } from "tsyringe";
import { IEmploymentRepository } from "../../repositories/implamentarion/IEmploymentRepository";
import { IEmployment } from "../../interfaces";

@injectable()
class ListAllEmplyomentsUseCase {
  constructor(
    @inject("EmploymentRepository")
    private employmentRepository: IEmploymentRepository,
  ) {}

  async execute(): Promise<IEmployment[] | null> {
    const listAllEmplyoments =
      await this.employmentRepository.listAllEmployment();

    return listAllEmplyoments;
  }
}

export { ListAllEmplyomentsUseCase };
