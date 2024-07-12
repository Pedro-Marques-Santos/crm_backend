import { Response, Request } from "express";

import { container } from "tsyringe";
import { ListAllEmplyomentsUseCase } from "./ListAllEmplyomentsUseCase";

class ListAllEmploymentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllEmploymentsUseCase = container.resolve(
      ListAllEmplyomentsUseCase,
    );

    const listAllEmployments = await listAllEmploymentsUseCase.execute();

    return response.json(listAllEmployments);
  }
}

export { ListAllEmploymentsController };
