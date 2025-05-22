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
    description,
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
    steps,
    expirationDays,
  }: IEmploymentUseCase): Promise<IEmployment> {
    const company = await this.companyRepository.findByIdGoogle(idgoogle);

    const createdAt: Date = new Date();

    const { dataExpiration, dataDelete } =
      this.employmentRepository.calculateDatesExpiration(expirationDays);

    if (!company || !company.imgprofile) {
      throw new AppError("Company was not found in the system!", 400);
    }

    if (!steps || steps.length < 2 || steps.length > 5) {
      throw new AppError("Erro in register Column Steps!", 409);
    }

    if (!wage || wage.length > 2) {
      throw new AppError("Erro in register Column Wage!", 409);
    }

    if (questionaboutjob && questionaboutjob.length > 4) {
      throw new AppError(
        "The user can only ask two questions to the collaborator!",
        409,
      );
    }

    const emploment = await this.employmentRepository.createEmployment({
      name,
      title,
      description,
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
      companyImg: company.imgprofile,
      createdAt,
      steps,
      dataExpiration,
      dataDelete,
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
