import { IEmployment } from "../../employment/interfaces";
import { Employment } from "../../employment/model";
import { ICompany } from "../interfaces";
import { Company } from "../model";
import { ICompanyRepository } from "./implmantation/ICompanyRepository";

class CompanyRepository implements ICompanyRepository {
  async listJobsCreated(company: ICompany): Promise<IEmployment[][] | []> {
    const listJobsCreatedInPromise = (await Employment.find({
      _id: { $in: company.createdjobs },
    })) as IEmployment[];

    const listJobsCreated = listJobsCreatedInPromise.map(
      (employment: IEmployment) => {
        return [employment];
      },
    );

    return listJobsCreated ? listJobsCreated : [];
  }

  async addJobOpportunity(
    company: ICompany,
    idjob: string,
  ): Promise<ICompany | null> {
    company.createdjobs.push(idjob);

    const modifyCompany = await Company.findOneAndUpdate(
      { idgoogle: company.idgoogle },
      company,
    );

    return modifyCompany;
  }

  async createCompany({
    name,
    lastname,
    createdjobs,
    idgoogle,
    isRecruiter,
  }: ICompany): Promise<ICompany> {
    const company = new Company({
      name: name,
      idgoogle: idgoogle,
      lastname: lastname,
      createdjobs: createdjobs,
      isRecruiter: isRecruiter,
    });

    const companyResult = await company.save();

    return companyResult;
  }

  async findByIdGoogle(id: string): Promise<ICompany | null> {
    const company = await Company.findOne({ idgoogle: id });
    return company;
  }
}

export { CompanyRepository };
