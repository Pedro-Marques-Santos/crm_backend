import { Response, Request } from "express";
import { container } from "tsyringe";
import { ListCreatedJobsUseCase } from "./ListCreatedJobsUseCase";

class ListCreatedJobsController {
  async handle(request: Request, response: Response) {
    const userid = request.user.id;

    const listCreatedJobsUseCase = container.resolve(ListCreatedJobsUseCase);

    const listJobsRegistered = await listCreatedJobsUseCase.execute(userid);

    return response.json(listJobsRegistered);
  }
}

export { ListCreatedJobsController };
