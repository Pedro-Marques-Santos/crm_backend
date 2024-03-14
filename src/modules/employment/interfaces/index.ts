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
  questionAboutJob?: string[];
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
  questionAboutJob?: string[];
}

export { IEmployment, IEmploymentUseCase };
