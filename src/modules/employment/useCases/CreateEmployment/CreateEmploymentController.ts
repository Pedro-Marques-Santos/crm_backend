import { Response, Request } from "express";

import { container } from "tsyringe";
import { CreateEmploymentUseCase } from "./CreateEmploymentUseCase";

class CreateEmploymentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      title,
      descrition,
      occupationarea,
      entrylevel,
      typehiring,
      workmodality,
      city,
      region,
      questionaboutjob,
      ourparticipants,
    } = request.body;

    const userid = request.user.id;

    const createEmploymentUseCase = container.resolve(CreateEmploymentUseCase);

    const employmnet = await createEmploymentUseCase.execute({
      name,
      title,
      descrition,
      occupationarea,
      entrylevel,
      typehiring,
      workmodality,
      city,
      region,
      idgoogle: userid,
      questionaboutjob,
      ourparticipants,
    });

    return response.json(employmnet);
  }
}

export { CreateEmploymentController };
