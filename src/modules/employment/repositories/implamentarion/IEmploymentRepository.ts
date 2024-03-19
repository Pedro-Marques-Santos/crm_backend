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
}

export { IEmploymentRepository };
