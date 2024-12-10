import { Response, Request } from "express";
import { container } from "tsyringe";
import { RecruiterSendEmailUseCase } from "./RecruiterSendEmailUseCase";

class RecruiterSendEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { to, subject, emailRecruiter, message, jobTitle, companyName } =
      request.body;

    const recruiterSendEmailUseCase = container.resolve(
      RecruiterSendEmailUseCase,
    );

    await recruiterSendEmailUseCase.execute(
      to,
      emailRecruiter,
      subject,
      message,
      jobTitle,
      companyName,
    );

    return response.status(202).send();
  }
}

export { RecruiterSendEmailController };
