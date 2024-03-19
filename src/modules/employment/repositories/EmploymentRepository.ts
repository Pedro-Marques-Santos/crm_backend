import { IEmployment } from "../interfaces";
import { Employment } from "../model";
import { IEmploymentRepository } from "./implamentarion/IEmploymentRepository";

class EmploymentRepository implements IEmploymentRepository {
  async findById(idemployment: string): Promise<IEmployment | null> {
    const employment = await Employment.findById(idemployment);

    return employment;
  }

  async addJobParticipants(
    employment: IEmployment,
    iduser: string,
  ): Promise<IEmployment | null> {
    employment.ourparticipants.push(iduser);

    const modifyCompany = await Employment.findOneAndUpdate(
      { _id: employment._id?.toString() },
      employment,
    );

    return modifyCompany;
  }

  async createEmployment({
    name,
    title,
    descrition,
    occupationarea,
    entrylevel,
    typehiring,
    workmodality,
    city,
    region,
    questionaboutjob,
    ourparticipants,
  }: IEmployment): Promise<IEmployment> {
    const employment = new Employment({
      name,
      title,
      descrition,
      occupationarea,
      entrylevel,
      typehiring,
      workmodality,
      city,
      region,
      questionaboutjob,
      ourparticipants,
    });

    const employmentResult = await employment.save();

    return employmentResult;
  }
}

export { EmploymentRepository };
