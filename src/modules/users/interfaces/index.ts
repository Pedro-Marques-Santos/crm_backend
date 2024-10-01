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
  isRecruiter: boolean;
  _id?: string;
  imgprofile?: string;
  curriculumfile?: string;
}

interface IRegisteredJobs {
  id: string;
  date: Date;
}

export { IUser };
