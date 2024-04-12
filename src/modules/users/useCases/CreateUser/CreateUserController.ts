import { Response, Request } from "express";

import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { AppError } from "../../../../shared/errors/AppErrors";
import { verifyImgStorage } from "../../../../shared/infra/http/middlewares/firebaseStorage";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, lastname, description, date, registeredjobs, isRecruiter } =
      request.body;

    const file = request.file;

    if (!request.file) {
      throw new AppError("Erro ao tentar encontrar o arquivo file!", 400);
    }

    verifyImgStorage(file);

    const idgoogle = request.user.id;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute(
      {
        name,
        idgoogle,
        lastname,
        description,
        date,
        registeredjobs,
        isRecruiter,
      },
      file,
    );

    return response.json(user);
  }
}

export { CreateUserController };
