import { Response } from "express";
import { container } from "tsyringe";
import { ActiviteDateExpirationUseCase } from "./ActiviteDateExpirationUseCase";

class ActiveDateExpirationController {
  async handle(response: Response): Promise<Response> {
    const activeDateExpirationUseCase = container.resolve(
      ActiviteDateExpirationUseCase,
    );

    await activeDateExpirationUseCase.execute();

    return response.status(202).send();
  }
}

export { ActiveDateExpirationController };
