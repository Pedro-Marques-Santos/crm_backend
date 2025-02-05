import { Response, Request } from "express";
import { container } from "tsyringe";
import { SearchEmploymentUseCase } from "./SearchEmploymentUseCase";

class SearchEmploymentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { idemployment } = request.body;

    const searchEmploymentUseCase = container.resolve(SearchEmploymentUseCase);

    const employment = await searchEmploymentUseCase.execute(idemployment);

    return response.json(employment);
  }
}

export { SearchEmploymentController };
