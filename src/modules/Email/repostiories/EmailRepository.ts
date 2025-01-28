import { IEmailRepository } from "./implementation/IEmailRepository";

import fs from "fs";
import { ISendRecruiterMessage } from "../interfaces";
import { emailQueue } from "../../../shared/services/connectRedisEmailQueue";

class EmailRepository implements IEmailRepository {
  async sendRecruiterMessage(
    to: string,
    variables: ISendRecruiterMessage,
    templatePath: string,
  ) {
    let htmlTemplate = fs.readFileSync(templatePath, "utf-8");

    // Replace variables in the template
    for (const [key, value] of Object.entries(variables)) {
      htmlTemplate = htmlTemplate.replace(`{{${key}}}`, value);
    }

    const { subject, emailRecruiter } = variables;

    await emailQueue.add(
      {
        to,
        emailRecruiter,
        subject,
        htmlTemplate,
      },
      {
        attempts: 3, // Tentar enviar até 1 vezes em caso de falha
        removeOnComplete: false, // Opcional: Manter histórico para depuração
        backoff: { type: "exponential", delay: 2000 },
      },
    );
  }

  isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export { EmailRepository };
