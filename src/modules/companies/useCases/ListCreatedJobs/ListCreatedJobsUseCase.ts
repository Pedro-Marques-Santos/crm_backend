import { inject, injectable } from "tsyringe";
import { ICompanyRepository } from "../../repositories/implmantation/ICompanyRepository";
import { AppError } from "../../../../shared/errors/AppErrors";

@injectable()
class ListCreatedJobsUseCase {
  constructor(
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository,
  ) {}

  async execute(idgoogleuser: string) {
    const company = await this.companyRepository.findByIdGoogle(idgoogleuser);

    if (!company) {
      throw new AppError("Company não existe!", 400);
    }

    if (company.createdjobs.length === 0) {
      throw new AppError("Você não criou nenhuma vaga de emprego!", 400);
    }

    if (company.createdjobs.length < 0) {
      throw new AppError("Error ao buscar vagas!", 400);
    }

    const listjobscreated =
      await this.companyRepository.listJobsCreated(company);

    if (!listjobscreated) {
      throw new AppError("Error ao buscar vagas criadas!", 400);
    }

    return listjobscreated;
  }
}

export { ListCreatedJobsUseCase };
