import { Response, Request } from "express";

import { container } from "tsyringe";
import { EditEmploymentUseCase } from "./EditEmploymentUseCase";
import { EmploymentValidationSchema } from "../../validation/Employment";

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
    });

    if (!validationResult.success) {
      const validationErrors = validationResult.error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));

      return response.status(400).json({ errors: validationErrors });
    }

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
