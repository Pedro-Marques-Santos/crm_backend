import { IEditUserNoImg, IListJobsCreated, IUser } from "../../interfaces";

interface IUserRepository {
  putPdfInUserProfile(
    user: IUser,
    curriculumfile: string,
  ): Promise<IUser | null>;
  putImageInUserProfile(user: IUser, imgprofile: string): Promise<IUser | null>;
  putImageAndPdfInUserProfile(
    user: IUser,
    imgprofile: string,
    curriculumfile: string,
  ): Promise<IUser | null>;
  EditUserNoImg({
    name,
    description,
    date,
    linkedinURL,
    email,
    id,
    workingGroup,
  }: IEditUserNoImg): Promise<IUser | null>;
  listJobRegistered(user: IUser): Promise<IListJobsCreated[] | []>;
  addJobRegister(
    user: IUser,
    idemployment: string,
    date: Date,
  ): Promise<IUser | null>;
  addRegisterStatistics(
    user: IUser,
    idemployment: string,
    date: Date,
  ): Promise<IUser | null>;
  createUser({
    name,
    idgoogle,
    linkedinURL,
    email,
    workingGroup,
    description,
    date,
    registeredjobs,
    isRecruiter,
    imgprofile,
    title,
    curriculumfile,
  }: IUser): Promise<IUser>;
  findByIdGoogle(id: string): Promise<IUser | null>;
  findByUsersIds(
    listUsersThatIdEmploymentMustDeleted: string[],
  ): Promise<IUser[]>;
  updatedUsersDateVacancyDelete(
    users: IUser[],
    listIdsEmploymentMustDeleted: string[],
  ): IUser[];
  saveUpdatedUsers(updatedUsers: IUser[]): Promise<void>;
}

export { IUserRepository };
