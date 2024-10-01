import { IEmployment, IOurParticipants } from "../../employment/interfaces";
import { Employment } from "../../employment/model";
import { IUser } from "../interfaces";
import { User } from "../model";
import { IUserRepository } from "./implemantation/IUserRepository";

class UserRepository implements IUserRepository {
  async saveUpdatedUsers(updatedUsers: IUser[]): Promise<void> {
    await Promise.all(
      updatedUsers.map(async (user) => {
        await User.findByIdAndUpdate(user._id, user);
      }),
    );
  }

  filterUpdatedUsers(
    users: IUser[],
    listIdsEmploymentMustDeleted: string[],
  ): IUser[] {
    const updatedUsers = users.map((user) => {
      const updatedJobs = user.registeredjobs.filter(
        (job) => !listIdsEmploymentMustDeleted.includes(job.id),
      );
      user.registeredjobs = updatedJobs;
      return user;
    });

    return updatedUsers;
  }

  async listAllUsersThatIdEmploymentMustDeleted(
    employmentsMustDeleted: IEmployment[],
  ): Promise<string[]> {
    const listAllUsersThatIdEmploymentMustDeleted =
      employmentsMustDeleted.flatMap((employment) => {
        return employment.ourparticipants.map((element) => {
          return element.id;
        });
      });

    const listUsersThatIdEmploymentMustDeleted = [
      ...new Set(listAllUsersThatIdEmploymentMustDeleted),
    ];

    return listUsersThatIdEmploymentMustDeleted;
  }

  async findByUsersIds(
    listUsersThatIdEmploymentMustDeleted: string[],
  ): Promise<IUser[]> {
    const users = await User.find({
      _id: { $in: listUsersThatIdEmploymentMustDeleted },
    });

    return users;
  }

  async listJobRegistered(user: IUser): Promise<IEmployment[] | null> {
    const listJobsCreatedInPromise = (await Employment.find({
      _id: { $in: user.registeredjobs.map((job) => job.id) },
    })) as IEmployment[];

    const sortedJobs = listJobsCreatedInPromise.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    const listJobsCreated = sortedJobs.map((employment: IEmployment) => {
      return employment;
    });

    return listJobsCreated ? listJobsCreated : [];
  }

  async addJobRegister(
    user: IUser,
    idemployment: string,
    date: Date,
  ): Promise<IUser | null> {
    const registerjob = {
      id: idemployment,
      date: date,
    };

    user.registeredjobs.push(registerjob);

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
    linkedinURL,
    email,
    workingGroup,
    idgoogle,
    description,
    date,
    registeredjobs,
    isRecruiter,
    imgprofile,
    title,
    curriculumfile,
  }: IUser): Promise<IUser> {
    const user = new User({
      name: name,
      idgoogle: idgoogle,
      linkedinURL: linkedinURL,
      email: email,
      workingGroup: workingGroup,
      description: description,
      date: date,
      registeredjobs: registeredjobs,
      isRecruiter: isRecruiter,
      imgprofile: imgprofile,
      title: title,
      curriculumfile: curriculumfile,
    });

    const userResult = await user.save();

    return userResult;
  }
}

export { UserRepository };
