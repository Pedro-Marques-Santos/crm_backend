import { User } from "../../users/model";
import {
  IEmployment,
  IEmploymentUseCase,
  IExpirationResult,
  IOurParticipants,
  IUserParticipant,
} from "../interfaces";
import { Employment } from "../model";
import { IEmploymentRepository } from "./implamentarion/IEmploymentRepository";

class EmploymentRepository implements IEmploymentRepository {
  async reactiveEmployment(
    employment: IEmployment,
    currentDate: Date,
    newDataExpiration: Date,
    newDateDelete: Date,
  ): Promise<IEmployment | null> {
    const editEmployment = await Employment.findByIdAndUpdate(
      employment._id,
      {
        createdAt: currentDate,
        dataExpiration: newDataExpiration,
        dataDelete: newDateDelete,
        dataExpirationActivity: false,
      },
      { new: true },
    );

    return editEmployment;
  }

  async calculateNewDates(qtDays: number) {
    const currentDate = new Date();

    const newDataExpiration = new Date(currentDate);
    newDataExpiration.setDate(currentDate.getDate() + qtDays);

    const newDateDelete = new Date(currentDate);
    newDateDelete.setDate(currentDate.getDate() + qtDays + 15);

    return { currentDate, newDataExpiration, newDateDelete };
  }

  async deleteEmploymentsExpired(
    idsEmploymentsMustDelete: string[],
  ): Promise<void> {
    await Employment.deleteMany({
      _id: { $in: idsEmploymentsMustDelete },
    });
  }

  findIdsCompaniesThatIdsEmploymentsMustDelete(
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

  findIdsUsersThatIdsEmploymentsMustDelete(
    employmentsMustDeleted: IEmployment[],
  ): string[] {
    const listAllUsersThatIdEmploymentMustDeleted =
      employmentsMustDeleted.flatMap((employment) => {
        return employment.ourparticipants.map((element) => {
          return element.id;
        });
      });

    const listUsersThatIdEmploymentMustDeleted = [
      ...new Set(listAllUsersThatIdEmploymentMustDeleted),
    ];

    return listUsersThatIdEmploymentMustDeleted;
  }

  async findDateDeleteEmployments(): Promise<IEmployment[]> {
    const employmentsExpiration = await Employment.find({
      dataDelete: { $lte: new Date() },
      dataExpirationActivity: true,
    });

    return employmentsExpiration;
  }

  async findExpiredEmployments(): Promise<IEmployment[]> {
    const employmentsExpiration = await Employment.find({
      dataExpiration: { $lte: new Date() },
      dataExpirationActivity: false,
    });

    return employmentsExpiration;
  }

  async ActiveDateExpirationInEmployments(
    idsEmployments: string[],
  ): Promise<void> {
    await Employment.updateMany(
      { _id: { $in: idsEmployments } },
      { dataExpirationActivity: true },
    );
  }

  modifyEmploymentWithAllNewSteps(
    participantsIndexes: number[],
    employment: IEmployment,
    stepOne: number,
  ): IEmployment {
    participantsIndexes.map((participantIndex) => {
      employment.ourparticipants[participantIndex].step = stepOne + 1;
    });

    return employment;
  }

  allSameStepParticipants(
    participants: IOurParticipants[],
    stepOne: number,
  ): boolean {
    const allSameStep = participants.every(
      (participant) => participant.step === stepOne,
    );

    return allSameStep;
  }

  allparticipant(
    participantsIndexes: number[],
    employment: IEmployment,
  ): IOurParticipants[] {
    const allparticipant = participantsIndexes.map((participantIndex) => {
      return employment.ourparticipants[participantIndex];
    });

    return allparticipant;
  }

  findIndexOurparticipant(
    ourparticipants: IOurParticipants[],
    iduser: string,
  ): number {
    const participantIndex = ourparticipants.findIndex(
      (participant) => participant.id === iduser,
    );
    return participantIndex;
  }

  findIndexOurparticipants(
    ourparticipants: IOurParticipants[],
    idusers: string[],
  ): number[] {
    const participantsIndexes: number[] = [];

    idusers.map((iduser) => {
      const participantIndex = ourparticipants.findIndex(
        (participant) => participant.id === iduser,
      );

      participantsIndexes.push(participantIndex);
    });

    return participantsIndexes;
  }

  async listAllEmployment(): Promise<IEmployment[] | null> {
    const listAllEmployments = await Employment.find({
      dataExpirationActivity: false,
    });

    const sortedEmployments = listAllEmployments.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    return sortedEmployments ? sortedEmployments : null;
  }

  filterListIdsMustDeletedDate(
    employmentsMustDeleted: IEmployment[],
  ): string[] | null {
    const listIdsEmploymentMustDeleted = employmentsMustDeleted
      .map((employment) => {
        return employment._id?.toString();
      })
      .filter((id) => id !== undefined) as string[];

    return listIdsEmploymentMustDeleted ? listIdsEmploymentMustDeleted : null;
  }

  filterListIds(listIdsEmployment: IEmployment[]): string[] | null {
    const listIds = listIdsEmployment
      .map((employment) => {
        return employment._id?.toString();
      })
      .filter((id) => id !== undefined) as string[];

    return listIds ? listIds : null;
  }

  async employmentsMustDeletedDateCause(): Promise<IEmployment[] | null> {
    const employmentsMustDeleted = await Employment.find({
      dataDelete: { $lte: new Date() },
    });
    return employmentsMustDeleted ? employmentsMustDeleted : null;
  }

  async listParticipants(
    employment: IEmployment,
  ): Promise<IUserParticipant[] | []> {
    const listUsersIds = employment.ourparticipants.map(
      (participant) => participant.id,
    );

    const listUsers = await User.find({ _id: { $in: listUsersIds } });

    const users = listUsers.map((user) => {
      const participant = employment.ourparticipants.find(
        (participant) =>
          participant.id && participant.id.toString() === user._id.toString(),
      );

      return {
        user: user,
        questions: participant?.questions,
        step: participant?.step,
      };
    }) as IUserParticipant[];

    return users ? users : [];
  }

  async findByIdExpiration(idemployment: string): Promise<IEmployment | null> {
    const employment = await Employment.findOne({
      _id: idemployment,
      dataExpirationActivity: true,
    });

    return employment;
  }

  async findByIdNotExpired(idemployment: string): Promise<IEmployment | null> {
    const employment = await Employment.findOne({
      _id: idemployment,
      dataExpirationActivity: false,
    });

    return employment;
  }

  async findById(idemployment: string): Promise<IEmployment | null> {
    const employment = await Employment.findById(idemployment);

    return employment;
  }

  async upgradeEmploymenToNextStep(
    employment: IEmployment,
  ): Promise<IEmployment | null> {
    const modifyEmploymentUserStep = await Employment.findOneAndUpdate(
      { _id: employment._id?.toString() },
      employment,
    );

    return modifyEmploymentUserStep;
  }

  async addJobParticipants(
    employment: IEmployment,
    iduser: string,
    questions: string[],
  ): Promise<IEmployment | null> {
    const newparticipant = {
      id: iduser,
      questions: questions,
      step: 1,
    };

    employment.ourparticipants.push(newparticipant);

    const modifyCompany = await Employment.findOneAndUpdate(
      { _id: employment._id?.toString() },
      employment,
    );

    return modifyCompany;
  }

  async editEmployment(
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
  ): Promise<IEmployment | null> {
    const editEmployment = await Employment.findByIdAndUpdate(
      idemployment,
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
        questionaboutjob,
        ourparticipants,
        wage,
        steps,
      },
      { new: true },
    );

    return editEmployment;
  }

  calculateDatesExpiration(expirationDays?: number): IExpirationResult {
    const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
    const createdAt = new Date();

    const validExpirationDays = expirationDays ?? 10;
    const validDeleteDays = expirationDays != null ? expirationDays + 10 : 15;

    const dataExpiration = new Date(
      createdAt.getTime() + validExpirationDays * MILLISECONDS_PER_DAY,
    );

    const dataDelete = new Date(
      createdAt.getTime() + validDeleteDays * MILLISECONDS_PER_DAY,
    );

    return { dataExpiration, dataDelete };
  }

  async createEmployment({
    name,
    title,
    description,
    occupationarea,
    entrylevel,
    typehiring,
    workmodality,
    city,
    region,
    questionaboutjob,
    ourparticipants,
    companyId,
    wage,
    companyImg,
    createdAt,
    steps,
    dataExpiration,
    dataDelete,
  }: IEmployment): Promise<IEmployment> {
    const employment = new Employment({
      name,
      title,
      description,
      occupationarea,
      entrylevel,
      typehiring,
      workmodality,
      city,
      region,
      questionaboutjob,
      ourparticipants,
      dataExpirationActivity: false,
      companyId,
      wage,
      companyImg,
      createdAt,
      steps,
      dataExpiration,
      dataDelete,
    });

    const employmentResult = await employment.save();

    return employmentResult;
  }
}

export { EmploymentRepository };
