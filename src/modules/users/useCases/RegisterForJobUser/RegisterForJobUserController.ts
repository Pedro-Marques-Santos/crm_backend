import { Response, Request } from "express";

import { container } from "tsyringe";
import { RegisterForJobUserUseCase } from "./RegisterForJobUserUseCase";

class RegisterForJobUserController {
  async handle(request: Request, response: Response) {
    const { idemployment } = request.body;

    const idgoogleuser = request.user.id;

    const registerForJobUserUseCase = container.resolve(
      RegisterForJobUserUseCase,
    );

    const modifyUser = await registerForJobUserUseCase.execute(
      idgoogleuser,
      idemployment,
    );

    return response.json(modifyUser);
  }
}

export { RegisterForJobUserController };
