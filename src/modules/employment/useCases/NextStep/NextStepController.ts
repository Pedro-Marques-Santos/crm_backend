import { Response, Request } from "express";

import { container } from "tsyringe";
import { NextStepUseCase } from "./NextStepUseCase";

class NextStepController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { iduser, idemployment, statusEmplyoment } = request.body;

    const nextStepUseCase = container.resolve(NextStepUseCase);

    const newEmployment = await nextStepUseCase.execute(
      idemployment,
      iduser,
      statusEmplyoment,
    );

    return response.json(newEmployment);
  }
}

export { NextStepController };
