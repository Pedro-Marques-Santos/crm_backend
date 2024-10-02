import { IEmployment, IOurParticipants } from "../../../employment/interfaces";
import { IUser } from "../../interfaces";

interface IUserRepository {
  putImageAndPdfInUserProfile(
    user: IUser,
    imgprofile: string,
    curriculumfile: string,
  ): Promise<IUser | null>;
  listJobRegistered(user: IUser): Promise<IEmployment[] | null>;
  addJobRegister(
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
  listAllUsersThatIdEmploymentMustDeleted(
    employmentsMustDeleted: IEmployment[],
  ): Promise<string[]>;
  findByUsersIds(
    listUsersThatIdEmploymentMustDeleted: string[],
  ): Promise<IUser[]>;
  filterUpdatedUsers(
    users: IUser[],
    listIdsEmploymentMustDeleted: string[],
  ): IUser[];
  saveUpdatedUsers(updatedUsers: IUser[]): Promise<void>;
}

export { IUserRepository };
