import { inject, injectable } from "tsyringe";
import { IEmailRepository } from "../../repostiories/implementation/IEmailRepository";
import { IRecruiterSendMessageSteps } from "../../interfaces";
import { AppError } from "../../../../shared/errors/AppErrors";
import path from "path";
import { emailQueue } from "../../../../shared/services/connectRedisEmailQueue";

@injectable()
class RecruiterSendNewStepEmailUseCase {
  constructor(
    @inject("EmailRepository")
    private emailRepository: IEmailRepository,
  ) {}

  async execute({
    allTo,
    subject,
    emailRecruiter,
    message,
    jobTitle,
    companyName,
    nameStage,
    currentStage,
    totalStage,
  }: IRecruiterSendMessageSteps) {
    if (subject.length < 5) {
      throw new AppError("Subject must have at least 5 characters.", 400);
    }

    if (allTo.length > 10 || allTo.length < 1) {
      throw new AppError("AllTo must contain between 1 and 10 items.", 400);
    }

    const templatePath = message
      ? path.join(__dirname, "../../templates/recruiterSendUserNextStep.html")
      : path.join(
          __dirname,
          "../../templates/recruiterSendUserNextStepNoMessage.html",
        );

    if (!emailQueue.client.status || emailQueue.client.status !== "ready") {
      throw new AppError("Redis is unavailable. Please try again later.", 503);
    }

    await Promise.all(
      allTo
        .filter((to) => this.emailRepository.isValidEmail(to))
        .map((to) =>
          this.emailRepository.sendRecruiterMessage(
            to,
            {
              emailRecruiter,
              companyName,
              jobTitle,
              message,
              subject,
              nameStage,
              currentStage,
              totalStage,
            },
            templatePath,
          ),
        ),
    );
  }
}

export { RecruiterSendNewStepEmailUseCase };
