import { IEmployment, IOurParticipants } from "../../employment/interfaces";
import { Employment } from "../../employment/model";
import { IEditUserNoImg, IListJobsCreated, IUser } from "../interfaces";
import { User } from "../model";
import { IUserRepository } from "./implemantation/IUserRepository";

class UserRepository implements IUserRepository {
  async putPdfInUserProfile(
    user: IUser,
    curriculumfile: string,
  ): Promise<IUser | null> {
    const newUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          curriculumfile: curriculumfile,
        },
      },
      { new: true },
    );

    return newUser;
  }

  async putImageInUserProfile(
    user: IUser,
    imgprofile: string,
  ): Promise<IUser | null> {
    const newUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          imgprofile: imgprofile,
        },
      },
      { new: true },
    );

    return newUser;
  }

  async putImageAndPdfInUserProfile(
    user: IUser,
    imgprofile: string,
    curriculumfile: string,
  ): Promise<IUser | null> {
    const newUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          imgprofile: imgprofile,
          curriculumfile: curriculumfile,
        },
      },
      { new: true },
    );

    return newUser;
  }

  async saveUpdatedUsers(updatedUsers: IUser[]): Promise<void> {
    await Promise.all(
      updatedUsers.map(async (user) => {
        await User.findByIdAndUpdate(user._id, user);
      }),
    );
  }

  updatedUsersDateVacancyDelete(
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

  async findByUsersIds(
    listUsersThatIdEmploymentMustDeleted: string[],
  ): Promise<IUser[]> {
    const users = await User.find({
      _id: { $in: listUsersThatIdEmploymentMustDeleted },
    });

    return users;
  }

  async listJobRegistered(user: IUser): Promise<IListJobsCreated[]> {
    const registeredJobIds = user.registeredjobs.map((job) => job.id);
    const jobs = (await Employment.find({
      _id: { $in: registeredJobIds },
    })) as IEmployment[];

    const listJobsCreated: IListJobsCreated[] = jobs
      .reverse()
      .map((job) => {
        const participant = job.ourparticipants.find(
          (p) => p.id === user._id?.toString(),
        );

        if (
          participant &&
          participant.step &&
          job.steps[participant.step - 1]
        ) {
          const stepName = job.steps[participant.step - 1].stepName;

          return {
            step: participant.step,
            stepName: stepName,
            employment: job,
          };
        }

        return null;
      })
      .filter((job) => job !== null) as IListJobsCreated[];

    return listJobsCreated;
  }

  async EditUserNoImg({
    name,
    description,
    date,
    linkedinURL,
    email,
    id,
    workingGroup,
  }: IEditUserNoImg): Promise<IUser | null> {
    const editUser = await User.findByIdAndUpdate(
      id,
      {
        name: name,
        email: email,
        description: description,
        date: date,
        linkedinURL: linkedinURL,
        workingGroup: workingGroup,
      },
      { new: true },
    );
    return editUser;
  }

  async addRegisterStatistics(
    user: IUser,
    idemployment: string,
    date: Date,
  ): Promise<IUser | null> {
    const jobsstatistics = {
      id: idemployment,
      date: date,
    };

    user.jobsstatistics.push(jobsstatistics);

    const modifyCompany = await User.findOneAndUpdate(
      { idgoogle: user.idgoogle },
      user,
    );

    return modifyCompany;
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
    jobsstatistics,
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
      jobsstatistics,
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
