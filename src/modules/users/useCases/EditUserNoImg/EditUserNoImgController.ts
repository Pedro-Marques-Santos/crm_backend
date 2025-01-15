import { Response, Request } from "express";
import { container } from "tsyringe";
import { EditUserNoImgUseCase } from "./EditUserNoImgUseCase";

class EditUserNoImgController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, linkedinURL, date, description, workingGroup } =
      request.body;

    const idgoogle = request.user.id;

    const editUserNoImgUseCase = container.resolve(EditUserNoImgUseCase);

    const editUser = await editUserNoImgUseCase.execute({
      name,
      email,
      linkedinURL,
      date,
      description,
      idgoogle,
      workingGroup,
    });

    return response.json(editUser);
  }
}

export { EditUserNoImgController };
