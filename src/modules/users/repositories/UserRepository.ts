import { IEmployment } from "../../employment/interfaces";
import { Employment } from "../../employment/model";
import { IUser } from "../interfaces";
import { User } from "../model";
import { IUserRepository } from "./implemantation/IUserRepository";

class UserRepository implements IUserRepository {
  async listJobRegistered(user: IUser): Promise<IEmployment[][] | null> {
    const listJobsCreatedInPromise = (await Employment.find({
      _id: { $in: user.registeredjobs },
    })) as IEmployment[];

    const listJobsCreated = listJobsCreatedInPromise.map(
      (employment: IEmployment) => {
        return [employment];
      },
    );

    return listJobsCreated ? listJobsCreated : [];
  }

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
    imgprofile,
  }: IUser): Promise<IUser> {
    const user = new User({
      name: name,
      idgoogle: idgoogle,
      lastname: lastname,
      description: description,
      date: date,
      registeredjobs: registeredjobs,
      isRecruiter: isRecruiter,
      imgprofile: imgprofile,
    });

    const userResult = await user.save();

    return userResult;
  }
}

export { UserRepository };
