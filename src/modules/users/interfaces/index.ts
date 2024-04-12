interface IUser {
  name: string;
  idgoogle: string;
  lastname: string;
  description: string;
  date: Date;
  registeredjobs: string[];
  isRecruiter: boolean;
  _id?: string;
  imgprofile?: string;
}

export { IUser };
