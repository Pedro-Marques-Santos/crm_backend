import { IUser } from "../../interfaces";

interface IUserRepository {
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
