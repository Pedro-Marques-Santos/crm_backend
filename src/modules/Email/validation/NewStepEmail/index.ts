import { z } from "zod";

export const NewStepEmailValidationSchema = z.object({
  allTo: z
    .array(
      z
        .string()
        .email("Email must be a valid email address")
        .max(150, "Email must have at most 150 characters"),
    )
    .min(1, "At least one recipient is required"),
  emailRecruiter: z
    .string()
    .email("Email must be a valid email address")
    .max(150, "Email must have at most 150 characters"),
  subject: z.string().max(80, "Subject must have at most 80 characters"),
  message: z.string().max(600, "Message must have at most 600 characters"),
  jobTitle: z.string().max(70, "Job title must have at most 70 characters"),
  companyName: z
    .string()
    .max(60, "Company name must have at most 60 characters"),
  nameStage: z.string().max(80, "Stage name must have at most 80 characters"),
  currentStage: z.number(),
  totalStage: z.number(),
});

export default { NewStepEmailValidationSchema };
