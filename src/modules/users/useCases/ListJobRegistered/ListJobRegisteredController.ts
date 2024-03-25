import { Response, Request } from "express";
import { container } from "tsyringe";
import { ListJobRegisteredUseCase } from "./ListJobRegisteredUseCase";

class ListJobRegisteredController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userid = request.user.id;

    const listJobRegisteredUseCase = container.resolve(
      ListJobRegisteredUseCase,
    );

    const listJobRegistered = await listJobRegisteredUseCase.execute(userid);

    return response.json(listJobRegistered);
  }
}

export { ListJobRegisteredController };
