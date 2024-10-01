import { Response, Request } from "express";

import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { AppError } from "../../../../shared/errors/AppErrors";
import {
  verifyFileStorage,
  verifyImgStorage,
} from "../../../../shared/infra/http/middlewares/firebaseStorage";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      linkedinURL,
      description,
      date,
      registeredjobs,
      isRecruiter,
      email,
      workingGroup,
      title,
    } = request.body;

    const files = request.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const imageFile = files?.file?.[0];
    const pdfFile = files?.pdfFile?.[0];

    if (!imageFile) {
      throw new AppError("Erro ao tentar encontrar o arquivo de imagem!", 400);
    }

    if (!pdfFile) {
      throw new AppError("Erro ao tentar encontrar o arquivo PDF!", 400);
    }

    console.log("imageFile", imageFile);
    console.log("pdfFile", pdfFile);

    verifyImgStorage(imageFile);
    verifyFileStorage(pdfFile);

    const idgoogle = request.user.id;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute(
      {
        name,
        title,
        idgoogle,
        linkedinURL,
        email,
        workingGroup,
        description,
        date,
        registeredjobs,
        isRecruiter,
      },
      imageFile,
      pdfFile,
    );

    return response.json(user);
  }
}

export { CreateUserController };
