import { z } from "zod";

export const SendEmailValidationSchema = z.object({
  to: z
    .string()
    .email("Email must be a valid email address")
    .max(150, "Email must have at most 150 characters"),
  jobTitle: z.string().max(70, "Title must have at most 70 characters"),
  emailRecruiter: z
    .string()
    .email("Email must be a valid email address")
    .max(150, "Email must have at most 150 characters"),
  message: z.string().max(600, "Message must have at most 600 characters"),
  subject: z.string().max(80, "Subject max 80 caracteres"),
  companyName: z.string().max(60, "Name must have at most 60 characters"),
});

export default { SendEmailValidationSchema };
