import { IUser } from "../../users/interfaces";

interface IEmployment {
  name: string;
  title: string;
  description: string;
  occupationarea: string[];
  entrylevel: string;
  typehiring: string;
  workmodality: string;
  city: string;
  region: string;
  ourparticipants: IOurParticipants[];
  questionaboutjob?: string[];
  _id?: string;
  createdAt: Date;
  dataExpiration?: Date;
  dataDelete?: Date;
  dataExpirationActivity?: boolean;
  companyId?: string;
  wage: String[];
  companyImg: string;
  steps: ISteps[];
}

interface IEmploymentUseCase {
  name: string;
  title: string;
  description: string;
  occupationarea: string[];
  entrylevel: string;
  typehiring: string;
  workmodality: string;
  city: string;
  region: string;
  idgoogle: string;
  ourparticipants: IOurParticipants[];
  questionaboutjob?: string[];
  wage: String[];
  steps: ISteps[];
  expirationDays?: number;
}

interface ISteps {
  stepName: string;
}

interface IOurParticipants {
  id: string;
  questions: string[];
  step: number;
}

interface IUserParticipant {
  user: IUser;
  questions: string[];
}

interface IExpirationResult {
  dataExpiration: Date;
  dataDelete: Date;
}

export {
  IEmployment,
  IEmploymentUseCase,
  IOurParticipants,
  IUserParticipant,
  IExpirationResult,
};
