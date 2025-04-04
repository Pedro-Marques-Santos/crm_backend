import { inject, injectable } from "tsyringe";
import { IEmailRepository } from "../../repostiories/implementation/IEmailRepository";
import { AppError } from "../../../../shared/errors/AppErrors";
import path from "path";
import { emailQueue } from "../../../../shared/services/connectRedisEmailQueue";

@injectable()
class RecruiterSendEmailUseCase {
  constructor(
    @inject("EmailRepository")
    private emailRepository: IEmailRepository,
  ) {}

  async execute(
    to: string,
    emailRecruiter: string,
    subject: string,
    message: string,
    jobTitle: string,
    companyName: string,
  ) {
    if (!this.emailRepository.isValidEmail(to)) {
      throw new AppError("Email invalid", 404);
    }

    if (message.length < 10) {
      throw new AppError("Message must have at least 10 characters", 404);
    }

    const templatePath = path.join(
      __dirname,
      "../../templates/recruiterSendMessageToUser.html",
    );

    if (!emailQueue.client.status || emailQueue.client.status !== "ready") {
      throw new AppError("Redis is unavailable. Please try again later.", 503);
    }

    await this.emailRepository.sendRecruiterMessage(
      to,
      {
        emailRecruiter,
        companyName,
        jobTitle,
        message,
        subject,
      },
      templatePath,
    );
  }
}

export { RecruiterSendEmailUseCase };
