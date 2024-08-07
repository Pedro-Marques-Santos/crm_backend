import { Response, Request } from "express";

import { container } from "tsyringe";
import { RegisterForJobUserUseCase } from "./RegisterForJobUserUseCase";

class RegisterForJobUserController {
  async handle(request: Request, response: Response) {
    const { idemployment, questions } = request.body;

    const idgoogleuser = request.user.id;

    const registerForJobUserUseCase = container.resolve(
      RegisterForJobUserUseCase,
    );

    const date = new Date();

    const modifyUser = await registerForJobUserUseCase.execute(
      idgoogleuser,
      idemployment,
      questions,
      date,
    );

    return response.json(modifyUser);
  }
}

export { RegisterForJobUserController };
