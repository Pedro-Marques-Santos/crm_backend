import { Response, Request } from "express";
import { AppError } from "../../../../shared/errors/AppErrors";
import { verifyFileStorage } from "../../../../shared/infra/http/middlewares/firebaseStorage";
import { container } from "tsyringe";
import { EditResumeUseCase } from "./EditResumeUseCase";

class EditResumeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const pdfFile = request.file;

    if (!pdfFile) {
      throw new AppError("Erro ao tentar encontrar o arquivo PDF!", 400);
    }

    verifyFileStorage(pdfFile);

    const idgoogle = request.user.id;

    const editResumeUseCase = container.resolve(EditResumeUseCase);

    const newUser = await editResumeUseCase.execute({ idgoogle, pdfFile });

    return response.json(newUser);
  }
}

export { EditResumeController };
