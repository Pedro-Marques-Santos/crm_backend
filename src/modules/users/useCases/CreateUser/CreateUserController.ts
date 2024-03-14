import { Response, Request } from "express";

import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, lastname, description, date, registeredjobs, isRecruiter } =
      request.body;

    const idgoogle = request.user.id;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      name,
      idgoogle,
      lastname,
      description,
      date,
      registeredjobs,
      isRecruiter,
    });

    return response.json(user);
  }
}

export { CreateUserController };
