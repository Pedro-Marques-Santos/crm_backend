interface IUser {
  name: string;
  idgoogle: string;
  linkedinURL: string;
  description: string;
  email: string;
  workingGroup: string[];
  date: Date;
  registeredjobs: string[];
  isRecruiter: boolean;
  _id?: string;
  imgprofile?: string;
}

export { IUser };
