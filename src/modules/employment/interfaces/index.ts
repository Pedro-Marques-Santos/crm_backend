interface IEmployment {
  name: string;
  title: string;
  descrition: string;
  occupationarea: string[];
  entrylevel: string;
  typehiring: string;
  workmodality: string;
  city: string;
  region: string;
  ourparticipants: string[];
  questionaboutjob?: string[];
  _id?: string;
}

interface IEmploymentUseCase {
  name: string;
  title: string;
  descrition: string;
  occupationarea: string[];
  entrylevel: string;
  typehiring: string;
  workmodality: string;
  city: string;
  region: string;
  idgoogle: string;
  ourparticipants: string[];
  questionaboutjob?: string[];
}

export { IEmployment, IEmploymentUseCase };
