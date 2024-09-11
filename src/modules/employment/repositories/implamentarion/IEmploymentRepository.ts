import {
  IEmployment,
  IOurParticipants,
  IUserParticipant,
} from "../../interfaces";

interface IEmploymentRepository {
  modifyEmploymentWithAllNewSteps(
    participantsIndexes: number[],
    employment: IEmployment,
    participants: IOurParticipants[],
  ): IEmployment;
  allparticipant(
    participantsIndexes: number[],
    employment: IEmployment,
  ): IOurParticipants[];
  allSameStepParticipants(
    participants: IOurParticipants[],
    stepOne: number,
  ): boolean;
  findIndexOurparticipant(
    ourparticipants: IOurParticipants[],
    iduser: string,
  ): number;
  findIndexOurparticipants(
    ourparticipants: IOurParticipants[],
    idusers: string[],
  ): number[];
  upgradeEmploymenToNextStep(
    employment: IEmployment,
  ): Promise<IEmployment | null>;
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
