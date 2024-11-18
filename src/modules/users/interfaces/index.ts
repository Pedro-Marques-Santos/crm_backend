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

export { IUser };
