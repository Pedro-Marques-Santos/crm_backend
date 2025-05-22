import { Response, Request } from "express";

import { container } from "tsyringe";
import { DeleteEmploymentUseCase } from "./DeleteEmploymentUseCase";

class DeleteEmploymentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { idEmployment, statusEmplyoment } = request.body;

    const idgoogle = request.user.id;

    const deleteEmploymentUseCase = container.resolve(DeleteEmploymentUseCase);

    await deleteEmploymentUseCase.execute(
      idEmployment,
      idgoogle,
      statusEmplyoment,
    );

    return response.status(202).send();
  }
}

export { DeleteEmploymentController };
