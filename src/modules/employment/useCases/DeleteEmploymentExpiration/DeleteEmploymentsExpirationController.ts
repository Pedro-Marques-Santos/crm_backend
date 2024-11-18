import { Response } from "express";
import { container } from "tsyringe";
import { DeleteEmploymentsExpirationsUseCases } from "./DeleteEmploymentsExpirationsUseCases";

class DeleteEmploymentsExpirationsController {
  async handle(response: Response): Promise<Response> {
    const deleteEmploymentsExpirationsUseCases = container.resolve(
      DeleteEmploymentsExpirationsUseCases,
    );

    await deleteEmploymentsExpirationsUseCases.execute();

    return response.status(202).send();
  }
}

export { DeleteEmploymentsExpirationsController };
