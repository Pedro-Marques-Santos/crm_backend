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
  createdAt?: Date;
  dataExpiration?: Date;
  dataDelete?: Date;
  dataExpirationActivity?: boolean;
  companyId?: string;
  wage: String[];
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
}

interface IOurParticipants {
  id: string;
  questions: string[];
}

interface IUserParticipant {
  user: IUser;
  questions: string[];
}

export { IEmployment, IEmploymentUseCase, IOurParticipants, IUserParticipant };
