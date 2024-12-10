import { Response, Request } from "express";
import { container } from "tsyringe";
import { RecruiterSendNewStepEmailUseCase } from "./RecruiterSendNewStepEmailUseCase";

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
