import { Response, Request } from "express";
import { container } from "tsyringe";
import { ReactiveEmploymentUseCase } from "./ReactiveEmploymentUseCase";

class ReactiveEmploymentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { idemployment, qtDays } = request.body;

    const idgoogle = request.user.id;

    const reactiveEmploymentUseCase = container.resolve(
      ReactiveEmploymentUseCase,
    );

    const employment = await reactiveEmploymentUseCase.execute(
      idgoogle,
      idemployment,
      qtDays,
    );

    return response.status(202).send();
  }
}

export { ReactiveEmploymentController };
