import { inject, injectable } from "tsyringe";
import { ICompanyRepository } from "../../repositories/implemantation/ICompanyRepository";
import { AppError } from "../../../../shared/errors/AppErrors";
import {
  deletedImgFromFirebaseStorage,
  uploadImageFirebaseStorage,
} from "../../../../shared/infra/http/middlewares/firebaseStorage";
import { ICompany } from "../../interfaces";

@injectable()
class EditImgCompanyUseCase {
  constructor(
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository,
  ) {}

  async execute(
    idgoogle: string,
    imgFile: Express.Multer.File,
  ): Promise<ICompany | null> {
    const company = await this.companyRepository.findByIdGoogle(idgoogle);

    if (!company || !company._id) {
      throw new AppError("Company with the provided ID not found", 404);
    }

    if (company.imgprofile) {
      await deletedImgFromFirebaseStorage(company.imgprofile);
    }

    const imgprofileUrl = await uploadImageFirebaseStorage(
      imgFile,
      company._id,
    );

    const newCompany = await this.companyRepository.putImageInUserProfile(
      company,
      imgprofileUrl,
    );

    return newCompany;
  }
}

export { EditImgCompanyUseCase };
