import { inject, injectable } from "tsyringe";
import { ICompanyRepository } from "../../repositories/implemantation/ICompanyRepository";
import { AppError } from "../../../../shared/errors/AppErrors";
import { ICompany } from "../../interfaces";

@injectable()
class EditCompanyNoImgUseCase {
  constructor(
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository,
  ) {}

  async execute(
    name: string,
    email: string,
    idgoogle: string,
  ): Promise<ICompany> {
    const company = await this.companyRepository.findByIdGoogle(idgoogle);

    if (!company || !company._id) {
      throw new AppError("Company with the provided ID not found", 404);
    }

    const newCompany = await this.companyRepository.editCompanyNoImg(
      name,
      email,
      company._id,
    );

    if (!newCompany) {
      throw new AppError("Error in editing process", 404);
    }

    return newCompany;
  }
}

export { EditCompanyNoImgUseCase };
