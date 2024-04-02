import { IEmployment } from "../../../employment/interfaces";
import { IUser } from "../../interfaces";

interface IUserRepository {
  listJobRegistered(user: IUser): Promise<IEmployment[][] | null>;
  addJobRegister(user: IUser, idemployment: string): Promise<IUser | null>;
  createUser({
    name,
    idgoogle,
    lastname,
    description,
    date,
    registeredjobs,
    isRecruiter,
  }: IUser): Promise<IUser>;
  findByIdGoogle(id: string): Promise<IUser | null>;
}

export { IUserRepository };
