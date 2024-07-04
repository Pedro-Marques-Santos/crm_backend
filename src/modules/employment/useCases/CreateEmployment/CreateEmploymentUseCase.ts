import { inject, injectable } from "tsyringe";
import { IEmploymentRepository } from "../../repositories/implamentarion/IEmploymentRepository";
import { IEmployment, IEmploymentUseCase } from "../../interfaces";
import { ICompanyRepository } from "../../../companies/repositories/implemantation/ICompanyRepository";
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
    questionaboutjob,
    ourparticipants,
    wage,
  }: IEmploymentUseCase): Promise<IEmployment> {
    const company = await this.companyRepository.findByIdGoogle(idgoogle);

    if (!company) {
      throw new AppError("Company was not found in the system!", 400);
    }

    if (!wage || wage.length > 2) {
      throw new AppError("Erro in register Column Wage!", 409);
    }

    if (questionaboutjob && questionaboutjob.length > 2) {
      throw new AppError(
        "The user can only ask two questions to the collaborator!",
        409,
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
      questionaboutjob,
      ourparticipants,
      companyId: company._id,
      wage,
    });

    if (!emploment._id) {
      throw new AppError("Error when trying to create a job vacancy!", 500);
    }

    const modifycompany = await this.companyRepository.addJobOpportunity(
      company,
      emploment._id.toString(),
    );

    if (!modifycompany) {
      throw new AppError("Error when trying to create a job vacancy!!", 500);
    }

    return emploment;
  }
}

export { CreateEmploymentUseCase };
