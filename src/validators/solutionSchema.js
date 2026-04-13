// validators/solutionSchema.js

import { z } from "zod";

export const solutionSchema = z.object({
  title: z
    .string()
    .min(5, "Title is required"),

  summary: z
    .string()
    .min(20, "Summary too short"),

  tech: z
    .string()
    .min(2, "Tech stack required"),

  github: z
    .string()
    .url("Enter valid GitHub URL")
    .optional()
    .or(z.literal("")),

  demo: z
    .string()
    .url("Enter valid demo URL")
    .optional()
    .or(z.literal("")),
});