import {
  IEmployment,
  IEmploymentUseCase,
  IOurParticipants,
  IUserParticipant,
} from "../../interfaces";

interface IEmploymentRepository {
  reactiveEmployment(
    employment: IEmployment,
    currentDate: Date,
    newDataExpiration: Date,
    newDateDelete: Date,
  ): Promise<IEmployment | null>;
  calculateNewDates(qtDays: number): Promise<{
    currentDate: Date;
    newDataExpiration: Date;
    newDateDelete: Date;
  }>;
  deleteEmploymentsExpired(idsEmploymentsMustDelete: string[]): Promise<void>;
  findIdsCompaniesThatIdsEmploymentsMustDelete(
    employmentsMustDeleted: IEmployment[],
  ): string[];
  findIdsUsersThatIdsEmploymentsMustDelete(
    employmentsMustDeleted: IEmployment[],
  ): string[];
  findDateDeleteEmployments(): Promise<IEmployment[]>;
  findExpiredEmployments(): Promise<IEmployment[]>;
  ActiveDateExpirationInEmployments(idsEmployments: string[]): Promise<void>;
  modifyEmploymentWithAllNewSteps(
    participantsIndexes: number[],
    employment: IEmployment,
    stepOne: number,
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
  filterListIds(listIdsEmployment: IEmployment[]): string[] | null;
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
  findByIdExpiration(idemployment: string): Promise<IEmployment | null>;
  findById(idemployment: string): Promise<IEmployment | null>;
  listAllEmployment(): Promise<IEmployment[] | null>;
  editEmployment(
    {
      name,
      title,
      description,
      occupationarea,
      entrylevel,
      typehiring,
      workmodality,
      city,
      region,
      idgoogle,
      questionaboutjob,
      ourparticipants,
      wage,
      steps,
    }: IEmploymentUseCase,
    idemployment: string,
  ): Promise<IEmployment | null>;
}

export { IEmploymentRepository };
