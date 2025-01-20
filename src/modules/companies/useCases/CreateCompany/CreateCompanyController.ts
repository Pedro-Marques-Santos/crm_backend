import { Response, Request } from "express";

import { container } from "tsyringe";
import { CreateCompanyUseCase } from "./CreateCompanyUseCase";
import { AppError } from "../../../../shared/errors/AppErrors";
import { verifyImgStorage } from "../../../../shared/infra/http/middlewares/firebaseStorage";
import { CompanyValidationSchema } from "../../validation/Company";

class CreateCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, createdjobs, isRecruiter, email } = request.body;

    const validationResult = CompanyValidationSchema.safeParse({
      name,
      email,
    });

    if (!validationResult.success) {
      const validationErrors = validationResult.error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));

      return response.status(400).json({ errors: validationErrors });
    }

    const file = request.file;

    if (!request.file) {
      throw new AppError("Erro ao tentar encontrar imagem de perfil!", 400);
    }

    verifyImgStorage(file);

    const idgoogle = request.user.id;

    const createCompanyUseCase = container.resolve(CreateCompanyUseCase);

    const company = await createCompanyUseCase.execute(
      {
        name,
        idgoogle,
        createdjobs,
        isRecruiter,
        email,
      },
      file,
    );

    return response.json({ company });
  }
}

export { CreateCompanyController };
