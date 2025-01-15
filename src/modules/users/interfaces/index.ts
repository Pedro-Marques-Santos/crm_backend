import { IEmployment } from "../../employment/interfaces";

interface IUser {
  name: string;
  title: string;
  idgoogle: string;
  linkedinURL: string;
  description: string;
  email: string;
  workingGroup: string[];
  date: Date;
  registeredjobs: IRegisteredJobs[];
  jobsstatistics: IRegisteredJobs[];
  isRecruiter: boolean;
  _id?: string;
  imgprofile?: string | null;
  curriculumfile?: string | null;
}

interface IRegisteredJobs {
  id: string;
  date: Date;
}

interface IListJobsCreated {
  step: number | undefined;
  employment: IEmployment;
}

interface IEditUserNoImg {
  name: string;
  email: string;
  date: Date;
  description: string;
  linkedinURL: string;
  id: string;
  workingGroup: string[];
}

export { IUser, IListJobsCreated, IEditUserNoImg };
