import { Response, Request } from "express";
import { container } from "tsyringe";
import { ExpirationEmploymentDeleteAndUpdate } from "./ExpirationEmploymentDeleteAndUpdate";
import { ExpirationEmplyomentUseCase } from "./ExpirationEmploymentUseCase";

class ExpirationEmploymentController {
  async handle(request: Request, response: Response) {
    const expirationEmploymentUseCase = container.resolve(
      ExpirationEmplyomentUseCase,
    );

    const expirationEmploymentDeleteAndUpdate = container.resolve(
      ExpirationEmploymentDeleteAndUpdate,
    );

    await expirationEmploymentUseCase.execute();

    await expirationEmploymentDeleteAndUpdate.execute();

    return response.status(202).send();
  }
}

export { ExpirationEmploymentController };
