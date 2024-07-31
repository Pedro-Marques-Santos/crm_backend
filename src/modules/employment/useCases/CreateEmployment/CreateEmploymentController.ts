import { Response, Request } from "express";

import { container } from "tsyringe";
import { CreateEmploymentUseCase } from "./CreateEmploymentUseCase";

class CreateEmploymentController {
  async handle(request: Request, response: Response): Promise<Response> {
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
    } = request.body;

    const userid = request.user.id;

    const createEmploymentUseCase = container.resolve(CreateEmploymentUseCase);

    const employmnet = await createEmploymentUseCase.execute({
      name,
      title,
      description,
      occupationarea,
      entrylevel,
      typehiring,
      workmodality,
      city,
      region,
      idgoogle: userid,
      questionaboutjob,
      ourparticipants,
      wage,
      steps,
    });

    return response.json(employmnet);
  }
}

export { CreateEmploymentController };
