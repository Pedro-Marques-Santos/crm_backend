import { Response, Request } from "express";

import { container } from "tsyringe";
import { NextGroupStepUseCase } from "./NextGroupStepUseCase";

class NextGroupStepController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { idusers, idemployment, statusEmplyoment } = request.body;

    const nextGroupStepUseCase = container.resolve(NextGroupStepUseCase);

    const newEmployment = await nextGroupStepUseCase.execute(
      idemployment,
      idusers,
      statusEmplyoment,
    );

    return response.json(newEmployment);
  }
}

export { NextGroupStepController };
