import { IEmployment } from "../../interfaces";

interface IEmploymentRepository {
  createEmployment({
    name,
    title,
    descrition,
    occupationarea,
    entrylevel,
    typehiring,
    workmodality,
    city,
    region,
    ourparticipants,
    questionaboutjob,
  }: IEmployment): Promise<IEmployment>;
  addJobParticipants(
    employment: IEmployment,
    iduser: string,
  ): Promise<IEmployment | null>;
  findById(idemployment: string): Promise<IEmployment | null>;
}

export { IEmploymentRepository };
