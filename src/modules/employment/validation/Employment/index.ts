import { z } from "zod";

export const EmploymentValidationSchema = z.object({
  name: z
    .string()
    .min(3, "Name must have at least 3 characters")
    .max(40, "Name must have at most 40 characters"),
  title: z
    .string()
    .min(3, "Title must have at least 3 characters")
    .max(70, "Title must have at most 70 characters"),
  entrylevel: z
    .string()
    .min(3, "Entrylevel must have at least 3 characters")
    .max(15, "Entrylevel must have at most 15 characters"),
  workmodality: z
    .string()
    .min(3, "Workmodality must have at least 3 characters")
    .max(15, "Workmodality must have at most 15 characters"),
  city: z
    .string()
    .min(2, "City must have at least 2 characters")
    .max(20, "City must have at most 20 characters"),
  region: z
    .string()
    .min(2, "Region must have at least 2 characters")
    .max(20, "Region must have at most 20 characters"),
  typehiring: z
    .string()
    .min(2, "Typehiring must have at least 2 characters")
    .max(30, "Typehiring must have at most 30 characters"),
  occupationarea: z
    .array(z.string())
    .length(3, "Occupationarea must have exactly 3 areas"),
  questionaboutjob: z
    .array(
      z.string().max(60, "Questionaboutjob must have at most 60 characters"),
    )
    .max(4, "You can provide at most 4 questions")
    .optional(),
  steps: z
    .array(
      z.object({
        stepName: z
          .string()
          .max(55, "Step name must have at most 55 characters"),
      }),
    )
    .min(2, "Steps must have at least 2 items")
    .max(5, "Steps must have at most 5 items"),
  description: z
    .string()
    .min(20, "Description must have at least 20 characters")
    .max(3500, "Description must have at most 3500 characters"),
  wage: z.array(z.number()).length(2, "Wage must have exactly 2 elements"),
  expirationDays: z.number().optional(),
});

export default { EmploymentValidationSchema };
