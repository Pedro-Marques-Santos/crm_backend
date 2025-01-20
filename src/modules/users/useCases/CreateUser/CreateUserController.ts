import { Response, Request } from "express";

import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { AppError } from "../../../../shared/errors/AppErrors";
import {
  verifyFileStorage,
  verifyImgStorage,
} from "../../../../shared/infra/http/middlewares/firebaseStorage";
import { UserValidationSchema } from "../../validation/User";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      linkedinURL,
      description,
      date,
      registeredjobs,
      jobsstatistics,
      isRecruiter,
      email,
      workingGroup,
      title,
    } = request.body;

    const validationResult = UserValidationSchema.safeParse({
      name,
      linkedinURL,
      description,
      email,
      workingGroup,
      title,
      date,
    });

    if (!validationResult.success) {
      const validationErrors = validationResult.error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));

      return response.status(400).json({ errors: validationErrors });
    }

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
        jobsstatistics,
        isRecruiter,
      },
      imageFile,
      pdfFile,
    );

    return response.json(user);
  }
}

export { CreateUserController };
