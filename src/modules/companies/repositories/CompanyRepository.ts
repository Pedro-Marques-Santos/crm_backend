import { IEmployment } from "../../employment/interfaces";
import { Employment } from "../../employment/model";
import { ICompany } from "../interfaces";
import { Company } from "../model";
import { ICompanyRepository } from "./implemantation/ICompanyRepository";

class CompanyRepository implements ICompanyRepository {
  async saveUpdatedCompanies(updatedCompanies: ICompany[]): Promise<void> {
    await Promise.all(
      updatedCompanies.map(async (company) => {
        await Company.findByIdAndUpdate(company._id, company);
      }),
    );
  }

  filterUpdatedCompanies(
    companies: ICompany[],
    listIdsEmploymentMustDeleted: string[],
  ): ICompany[] {
    const updatedCompanies = companies.map((company) => {
      const updatedJobs = company.createdjobs.filter(
        (job) => !listIdsEmploymentMustDeleted.includes(job),
      );
      company.createdjobs = updatedJobs;
      return company;
    });

    return updatedCompanies;
  }

  async companiesMustBeEdited(
    listIdsCompanyMustDeletedInArrayEmplyoment: (string | undefined)[],
  ): Promise<ICompany[]> {
    const companies = await Company.find({
      _id: { $in: listIdsCompanyMustDeletedInArrayEmplyoment },
    });

    return companies;
  }

  filterListIdsCompanyMustDeletedInArrayEmplyoment(
    employmentsMustDeleted: IEmployment[],
  ): string[] {
    const listIdsCompanyMustDeletedInArrayEmplyoment = employmentsMustDeleted
      .map((employment) => {
        return employment.companyId;
      })
      .filter((employmentId) => employmentId !== undefined) as string[];

    const listUsers = [...new Set(listIdsCompanyMustDeletedInArrayEmplyoment)];

    return listUsers;
  }

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
    createdjobs,
    idgoogle,
    isRecruiter,
    imgprofile,
    email,
  }: ICompany): Promise<ICompany> {
    const company = new Company({
      name: name,
      idgoogle: idgoogle,
      createdjobs: createdjobs,
      isRecruiter: isRecruiter,
      imgprofile: imgprofile,
      email: email,
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
