import { Response, Request } from "express";

import { container } from "tsyringe";
import { CreateCompanyUseCase } from "./CreateCompanyUseCase";

class CreateCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, lastname, createdjobs, isRecruiter } = request.body;

    const idgoogle = request.user.id;

    const createCompanyUseCase = container.resolve(CreateCompanyUseCase);

    const company = await createCompanyUseCase.execute({
      name,
      idgoogle,
      lastname,
      createdjobs,
      isRecruiter,
    });

    return response.json({ company });
  }
}

export { CreateCompanyController };
