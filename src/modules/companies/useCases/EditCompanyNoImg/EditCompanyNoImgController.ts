import { Response, Request } from "express";
import { container } from "tsyringe";
import { EditCompanyNoImgUseCase } from "./EditCompanyNoImgUseCase";

class EditCompanyNoImgController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const idgoogle = request.user.id;

    const editCompanyNoImgUseCase = container.resolve(EditCompanyNoImgUseCase);

    const company = await editCompanyNoImgUseCase.execute(
      name,
      email,
      idgoogle,
    );

    return response.json(company);
  }
}

export { EditCompanyNoImgController };
