import { IEmployment, IUserParticipant } from "../../interfaces";

interface IEmploymentRepository {
  listParticipants(employment: IEmployment): Promise<IUserParticipant[][] | []>;
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
    questions: string[],
  ): Promise<IEmployment | null>;
  findById(idemployment: string): Promise<IEmployment | null>;
}

export { IEmploymentRepository };
