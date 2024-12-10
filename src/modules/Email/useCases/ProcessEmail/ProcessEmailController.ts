import { Response } from "express";
import { container } from "tsyringe";
import { ProcessEmailUseCase } from "./ProcessEmailUseCase";

class ProcessEmailController {
  async handle(response: Response): Promise<Response> {
    const processEmailUseCase = container.resolve(ProcessEmailUseCase);

    await processEmailUseCase.execute();

    return response.status(202).send();
  }
}

export { ProcessEmailController };
