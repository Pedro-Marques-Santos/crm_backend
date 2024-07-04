import { IEmployment, IUserParticipant } from "../../interfaces";

interface IEmploymentRepository {
  filterListIdsMustDeletedDate(
    employmentsMustDeleted: IEmployment[],
  ): string[] | null;
  employmentsMustDeletedDateCause(): Promise<IEmployment[] | null>;
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
    companyId,
    wage,
  }: IEmployment): Promise<IEmployment>;
  addJobParticipants(
    employment: IEmployment,
    iduser: string,
    questions: string[],
  ): Promise<IEmployment | null>;
  findById(idemployment: string): Promise<IEmployment | null>;
}

export { IEmploymentRepository };
