import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/implemantation/IUserRepository";
import { AppError } from "../../../../shared/errors/AppErrors";
import {
  deletedImgFromFirebaseStorage,
  uploadImageFirebaseStorage,
} from "../../../../shared/infra/http/middlewares/firebaseStorage";
import { IUser } from "../../interfaces";

@injectable()
class EditImgUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute(
    idgoogle: string,
    imgFile: Express.Multer.File,
  ): Promise<IUser | null> {
    const user = await this.userRepository.findByIdGoogle(idgoogle);

    if (!user || !user._id) {
      throw new AppError("Company with the provided ID not found", 404);
    }

    if (user.imgprofile) {
      await deletedImgFromFirebaseStorage(user.imgprofile);
    }

    const imgprofileUrl = await uploadImageFirebaseStorage(imgFile, user._id);

    const newUser = await this.userRepository.putImageInUserProfile(
      user,
      imgprofileUrl,
    );

    return newUser;
  }
}

export { EditImgUserUseCase };
