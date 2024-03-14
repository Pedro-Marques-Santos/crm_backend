import { IUser } from "../interfaces";
import { User } from "../model";
import { IUserRepository } from "./implemantation/IUserRepository";

class UserRepository implements IUserRepository {
  async addJobRegister(
    user: IUser,
    idemployment: string,
  ): Promise<IUser | null> {
    user.registeredjobs.push(idemployment);

    const modifyCompany = await User.findOneAndUpdate(
      { idgoogle: user.idgoogle },
      user,
    );

    return modifyCompany;
  }

  async findByIdGoogle(id: string): Promise<IUser | null> {
    const user = await User.findOne({ idgoogle: id });
    return user;
  }
  async createUser({
    name,
    lastname,
    idgoogle,
    description,
    date,
    registeredjobs,
    isRecruiter,
  }: IUser): Promise<IUser> {
    const user = new User({
      name: name,
      idgoogle: idgoogle,
      lastname: lastname,
      description: description,
      date: date,
      registeredjobs: registeredjobs,
      isRecruiter: isRecruiter,
    });

    const userResult = await user.save();

    return userResult;
  }
}

export { UserRepository };
