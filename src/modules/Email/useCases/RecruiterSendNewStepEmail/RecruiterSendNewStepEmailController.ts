import { Response, Request } from "express";
import { container } from "tsyringe";
import { RecruiterSendNewStepEmailUseCase } from "./RecruiterSendNewStepEmailUseCase";
import { NewStepEmailValidationSchema } from "../../validation/NewStepEmail";

class RecruiterSendNewStepEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      allTo,
      subject,
      emailRecruiter,
      message,
      jobTitle,
      companyName,
      nameStage,
      currentStage,
      totalStage,
    } = request.body;

    const validationResult = NewStepEmailValidationSchema.safeParse({
      allTo,
      subject,
      emailRecruiter,
      message,
      jobTitle,
      companyName,
      nameStage,
      currentStage,
      totalStage,
    });

    if (!validationResult.success) {
      const validationErrors = validationResult.error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));

      return response.status(400).json({ errors: validationErrors });
    }

    const recruiterSendNewStepEmailUseCase = container.resolve(
      RecruiterSendNewStepEmailUseCase,
    );

    await recruiterSendNewStepEmailUseCase.execute({
      allTo,
      subject,
      emailRecruiter,
      message,
      jobTitle,
      companyName,
      nameStage,
      currentStage,
      totalStage,
    });

    return response.status(202).send();
  }
}

export { RecruiterSendNewStepEmailController };
