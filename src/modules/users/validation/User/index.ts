import { z } from "zod";

export const UserValidationSchema = z.object({
  name: z
    .string()
    .min(5, "Name must have at least 5 characters")
    .max(25, "Name must have at most 25 characters"),
  title: z
    .string()
    .min(5, "Name must have at least 5 characters")
    .max(25, "Name must have at most 50 characters"),
  linkedinURL: z
    .string()
    .max(80, "LinkedIn URL must have at most 80 characters"),
  email: z
    .string()
    .email("Email must be a valid email address")
    .max(150, "Email must have at most 150 characters"),
  workingGroup: z
    .array(z.string())
    .min(3, "Working group must have at least 3 members")
    .max(6, "Working group must have at most 6 members"),
  description: z
    .string()
    .min(40, "Name must have at least 40 characters")
    .max(200, "Description must have at most 200 characters")
    .optional(),
  date: z.string().max(40),
});

export default { UserValidationSchema };
