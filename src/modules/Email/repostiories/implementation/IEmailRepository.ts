import { ISendRecruiterMessage } from "../../interfaces";

interface IEmailRepository {
  sendRecruiterMessage(
    to: string,
    variables: ISendRecruiterMessage,
    templatePath: string,
  ): Promise<void>;
  isValidEmail(email: string): boolean;
}

export { IEmailRepository };
