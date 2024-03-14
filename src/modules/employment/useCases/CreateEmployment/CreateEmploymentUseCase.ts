import { inject, injectable } from "tsyringe";
import { IEmploymentRepository } from "../../repositories/implamentarion/IEmploymentRepository";
import { IEmployment, IEmploymentUseCase } from "../../interfaces";
import { ICompanyRepository } from "../../../companies/repositories/implmantation/ICompanyRepository";
import { AppError } from "../../../../shared/errors/AppErrors";

@injectable()
class CreateEmploymentUseCase {
  constructor(
    @inject("EmploymentRepository")
    private employmentRepository: IEmploymentRepository,
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository,
  ) {}

  async execute({
    name,
    title,
    descrition,
    occupationarea,
    entrylevel,
    typehiring,
    workmodality,
    city,
    region,
    idgoogle,
    questionAboutJob,
  }: IEmploymentUseCase): Promise<IEmployment> {
    const company = await this.companyRepository.findByIdGoogle(idgoogle);

    if (!company) {
      throw new AppError("company não existe!", 400);
    }

    if (questionAboutJob && questionAboutJob.length > 2) {
      throw new AppError(
        "o usuário pode somente fazer duas perguntas ao colaborador!",
        400,
      );
    }

    const emploment = await this.employmentRepository.createEmployment({
      name,
      title,
      descrition,
      occupationarea,
      entrylevel,
      typehiring,
      workmodality,
      city,
      region,
      questionAboutJob,
    });

    if (!emploment._id) {
      throw new AppError("erro ao tentar criar vaga de emprego!", 400);
    }

    const modifycompany = await this.companyRepository.addJobOpportunity(
      company,
      emploment._id.toString(),
    );

    if (!modifycompany) {
      throw new AppError("company não existe!", 400);
    }

    return emploment;
  }
}

export { CreateEmploymentUseCase };
