import { IEmployment } from "../../../employment/interfaces";
import { ICompany } from "../../interfaces";

interface ICompanyRepository {
  putImageInUserProfile(
    user: ICompany,
    imgprofile: string,
  ): Promise<ICompany | null>;
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
  filterListIdsCompanyMustDeletedInArrayEmplyoment(
    employmentsMustDeleted: IEmployment[],
  ): string[];
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
