import { ICompany } from "../../interfaces";

interface ICompanyRepository {
  addJobOpportunity(company: ICompany, idjob: string): Promise<ICompany | null>;
  createCompany({
    name,
    lastname,
    idgoogle,
    createdjobs,
    isRecruiter,
  }: ICompany): Promise<ICompany>;
  findByIdGoogle(id: string): Promise<ICompany | null>;
}

export { ICompanyRepository };
