import { IEmployment, IUserParticipant } from "../../interfaces";

interface IEmploymentRepository {
  filterListIdsMustDeletedDate(
    employmentsMustDeleted: IEmployment[],
  ): string[] | null;
  employmentsMustDeletedDateCause(): Promise<IEmployment[] | null>;
  listParticipants(employment: IEmployment): Promise<IUserParticipant[] | []>;
  createEmployment({
    name,
    title,
    description,
    companyImg,
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
    createdAt,
    steps,
  }: IEmployment): Promise<IEmployment>;
  addJobParticipants(
    employment: IEmployment,
    iduser: string,
    questions: string[],
  ): Promise<IEmployment | null>;
  findById(idemployment: string): Promise<IEmployment | null>;
  listAllEmployment(): Promise<IEmployment[] | null>;
}

export { IEmploymentRepository };
