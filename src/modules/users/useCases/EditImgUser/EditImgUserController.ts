import { Response, Request } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppErrors";
import { verifyImgStorage } from "../../../../shared/infra/http/middlewares/firebaseStorage";
import { EditImgUserUseCase } from "./EditImgUserUseCase";

class EditImgUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const imgFile = request.file;

    if (!request.file) {
      throw new AppError("No image found to change profile picture!", 400);
    }

    verifyImgStorage(imgFile);

    const idgoogle = request.user.id;

    const editImgUserUseCase = container.resolve(EditImgUserUseCase);

    const newUser = await editImgUserUseCase.execute(idgoogle, imgFile);

    return response.json(newUser);
  }
}

export { EditImgUserController };
