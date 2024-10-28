import { Response, Request } from "express";
import { verifyImgStorage } from "../../../../shared/infra/http/middlewares/firebaseStorage";
import { container } from "tsyringe";
import { EditImgCompanyUseCase } from "./EditImgCompanyUseCase";
import { AppError } from "../../../../shared/errors/AppErrors";

class EditImgCompanyController {
  async handle(request: Request, response: Response) {
    const imgFile = request.file;

    if (!request.file) {
      throw new AppError("No image found to change profile picture!", 400);
    }

    verifyImgStorage(imgFile);

    const idgoogle = request.user.id;

    const editImgCompanyUseCase = container.resolve(EditImgCompanyUseCase);

    const newCompany = await editImgCompanyUseCase.execute(idgoogle, imgFile);

    return response.json(newCompany);
  }
}

export { EditImgCompanyController };
