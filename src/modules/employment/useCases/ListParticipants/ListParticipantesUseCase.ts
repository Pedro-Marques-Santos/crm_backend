import { inject, injectable } from "tsyringe";
import { IEmploymentRepository } from "../../repositories/implamentarion/IEmploymentRepository";
import { AppError } from "../../../../shared/errors/AppErrors";
import { ICompanyRepository } from "../../../companies/repositories/implmantation/ICompanyRepository";
import { IUserParticipant } from "../../interfaces";

@injectable()
class ListParticipantsUseCases {
  constructor(
    @inject("EmploymentRepository")
    private employmentRepository: IEmploymentRepository,
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository,
  ) {}

  async execute(
    idgoogle: string,
    idemployment: string,
  ): Promise<IUserParticipant[][]> {
    const employment = await this.employmentRepository.findById(idemployment);
    const company = await this.companyRepository.findByIdGoogle(idgoogle);

    if (!company) {
      throw new AppError("Company não existe!", 400);
    }

    if (!employment) {
      throw new AppError("Vaga de emprego não econtrando no sistema!", 400);
    }

    const listParticipants =
      await this.employmentRepository.listParticipants(employment);

    if (!listParticipants) {
      throw new AppError("Erros ao buscar usuário registrados na vaga!", 400);
    }

    return listParticipants;
  }
}

export { ListParticipantsUseCases };
