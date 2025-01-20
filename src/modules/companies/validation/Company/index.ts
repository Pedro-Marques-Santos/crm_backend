import { z } from "zod";

export const CompanyValidationSchema = z.object({
  name: z
    .string()
    .min(5, "Name must have at least 5 characters")
    .max(25, "Name must have at most 25 characters"),
  email: z
    .string()
    .email("Email must be a valid email address")
    .max(150, "Email must have at most 150 characters"),
});

export default { CompanyValidationSchema };
