import { Response, Request } from "express";

import { container } from "tsyringe";
import { EditEmploymentUseCase } from "./EditEmploymentUseCase";

class EditEmploymentController {
  async handle(request: Request, response: Response) {
    const {
      name,
      title,
      description,
      occupationarea,
      entrylevel,
      typehiring,
      workmodality,
      city,
      region,
      questionaboutjob,
      ourparticipants,
      wage,
      steps,
      idemployment,
    } = request.body;

    const idgoogle = request.user.id;

    const editEmploymentUseCase = container.resolve(EditEmploymentUseCase);

    const employment = await editEmploymentUseCase.execute(
      {
        name,
        title,
        description,
        occupationarea,
        entrylevel,
        typehiring,
        workmodality,
        city,
        region,
        questionaboutjob,
        ourparticipants,
        wage,
        steps,
        idgoogle,
      },
      idemployment,
    );

    return response.json(employment);
  }
}

export { EditEmploymentController };
