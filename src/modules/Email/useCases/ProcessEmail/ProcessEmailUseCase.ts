import { inject, injectable } from "tsyringe";
import { transporter } from "../../../../shared/services/connectGmailSMTP";
import { AppError } from "../../../../shared/errors/AppErrors";
import { IEmailRepository } from "../../repostiories/implementation/IEmailRepository";
import { emailQueue } from "../../../../shared/services/connectRedisEmailQueue";

@injectable()
class ProcessEmailUseCase {
  constructor(
    @inject("EmailRepository")
    private emailRepository: IEmailRepository,
  ) {}

  async execute() {
    const jobs = (await emailQueue.getJobs(["waiting"])).reverse();

    const batchSize = 100;

    if (jobs.length === 0) {
      throw new AppError("No email to send!", 404);
    }

    const batch = jobs.slice(0, batchSize);

    const emailPromises = batch.map(async (job) => {
      const { to, emailRecruiter, subject, htmlTemplate } = job.data;

      if (!this.emailRepository.isValidEmail(to)) {
        await job.remove();
        return;
      }

      try {
        await transporter.sendMail({
          from: emailRecruiter,
          to,
          subject,
          html: htmlTemplate,
        });

        await job.remove();
      } catch (error) {
        if (
          error.message.includes("Invalid email") ||
          error.responseCode === 550
        ) {
          await job.remove();
        } else {
          console.error(
            `Erro temporário ao enviar e-mail para ${to}. Mantendo na fila para nova tentativa.`,
          );
        }
      }
    });

    await Promise.all(emailPromises);
  }
}

export { ProcessEmailUseCase };
