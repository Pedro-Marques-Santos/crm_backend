import { Response, Request } from "express";
import { container } from "tsyringe";
import { ListCreatedJobsExpiredUseCase } from "./ListCreatedJobsExpiredUseCase";

class ListCreatedJobsExpiredController {
  async handle(request: Request, response: Response) {
    const idgoogle = request.user.id;

    const listCreatedJobsExpiredUseCase = container.resolve(
      ListCreatedJobsExpiredUseCase,
    );

    const employments = await listCreatedJobsExpiredUseCase.execute(idgoogle);

    return response.json(employments);
  }
}

export { ListCreatedJobsExpiredController };
