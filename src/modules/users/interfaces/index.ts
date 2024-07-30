interface IUser {
  name: string;
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
}

interface IRegisteredJobs {
  id: string;
  date: Date;
}

export { IUser };
