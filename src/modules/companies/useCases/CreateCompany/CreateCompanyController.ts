import { Response, Request } from "express";

import { container } from "tsyringe";
import { CreateCompanyUseCase } from "./CreateCompanyUseCase";
import { AppError } from "../../../../shared/errors/AppErrors";
import { verifyImgStorage } from "../../../../shared/infra/http/middlewares/firebaseStorage";

class CreateCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, createdjobs, isRecruiter } = request.body;

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
      },
      file,
    );

    return response.json({ company });
  }
}

export { CreateCompanyController };
