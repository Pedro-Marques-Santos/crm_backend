import { IEmployment } from "../interfaces";
import { Employment } from "../model";
import { IEmploymentRepository } from "./implamentarion/IEmploymentRepository";

class EmploymentRepository implements IEmploymentRepository {
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
    questionAboutJob,
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
      questionAboutJob,
    });

    const employmentResult = await employment.save();

    return employmentResult;
  }
}

export { EmploymentRepository };
