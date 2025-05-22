import { Response, Request } from "express";

import { container } from "tsyringe";
import { CreateEmploymentUseCase } from "./CreateEmploymentUseCase";
import { EmploymentValidationSchema } from "../../validation/Employment";

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
      expirationDays,
    } = request.body;

    const validationResult = EmploymentValidationSchema.safeParse({
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
      wage,
      steps,
      expirationDays,
    });

    if (!validationResult.success) {
      const validationErrors = validationResult.error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));

      return response.status(400).json({ errors: validationErrors });
    }

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
      expirationDays,
    });

    return response.json(employmnet);
  }
}

export { CreateEmploymentController };
