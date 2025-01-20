import { Response, Request } from "express";
import { container } from "tsyringe";
import { RecruiterSendEmailUseCase } from "./RecruiterSendEmailUseCase";
import { SendEmailValidationSchema } from "../../validation/SendEmail";

class RecruiterSendEmailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { to, subject, emailRecruiter, message, jobTitle, companyName } =
      request.body;

    const validationResult = SendEmailValidationSchema.safeParse({
      to,
      subject,
      emailRecruiter,
      message,
      jobTitle,
      companyName,
    });

    if (!validationResult.success) {
      const validationErrors = validationResult.error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      }));

      return response.status(400).json({ errors: validationErrors });
    }

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
