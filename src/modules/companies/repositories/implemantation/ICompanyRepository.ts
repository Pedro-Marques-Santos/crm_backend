import { IEmployment } from "../../../employment/interfaces";
import { ICompany } from "../../interfaces";

interface ICompanyRepository {
  putImageInUserProfile(
    user: ICompany,
    imgprofile: string,
  ): Promise<ICompany | null>;
  listJobsCreatedExpired(company: ICompany): Promise<IEmployment[] | []>;
  listJobsCreated(company: ICompany): Promise<IEmployment[] | []>;
  addJobOpportunity(company: ICompany, idjob: string): Promise<ICompany | null>;
  createCompany({
    name,
    idgoogle,
    createdjobs,
    isRecruiter,
    imgprofile,
  }: ICompany): Promise<ICompany>;
  findByIdGoogle(id: string): Promise<ICompany | null>;
  findById(id: string): Promise<ICompany | null>;
  editCompanyNoImg(
    name: string,
    email: string,
    id: string,
  ): Promise<ICompany | null>;
  companiesMustBeEdited(
    listIdsCompanyMustDeletedInArrayEmplyoment: (string | undefined)[],
  ): Promise<ICompany[]>;
  filterUpdatedCompanies(
    companies: ICompany[],
    listIdsEmploymentMustDeleted: string[],
  ): ICompany[];
  saveUpdatedCompanies(updatedCompanies: ICompany[]): Promise<void>;
}

export { ICompanyRepository };
