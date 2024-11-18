import { User } from "../../users/model";
import {
  IEmployment,
  IEmploymentUseCase,
  IOurParticipants,
  IUserParticipant,
} from "../interfaces";
import { Employment } from "../model";
import { IEmploymentRepository } from "./implamentarion/IEmploymentRepository";

class EmploymentRepository implements IEmploymentRepository {
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
    const listAllEmployments = await Employment.find();

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
        (participant) => participant.id.toString() === user._id.toString(),
      );

      return {
        user: user,
        questions: participant?.questions,
        step: participant?.step,
      };
    }) as IUserParticipant[];

    return users ? users : [];
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
    });

    const employmentResult = await employment.save();

    return employmentResult;
  }
}

export { EmploymentRepository };
