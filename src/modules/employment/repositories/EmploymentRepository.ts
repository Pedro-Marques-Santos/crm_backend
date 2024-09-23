import { User } from "../../users/model";
import { IEmployment, IOurParticipants, IUserParticipant } from "../interfaces";
import { Employment } from "../model";
import { IEmploymentRepository } from "./implamentarion/IEmploymentRepository";

class EmploymentRepository implements IEmploymentRepository {
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
    const neweparticipant = {
      id: iduser,
      questions: questions,
      step: 0,
    };

    employment.ourparticipants.push(neweparticipant);

    const modifyCompany = await Employment.findOneAndUpdate(
      { _id: employment._id?.toString() },
      employment,
    );

    return modifyCompany;
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
