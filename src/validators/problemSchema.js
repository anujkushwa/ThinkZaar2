// validators/problemSchema.js

import { z } from "zod";

export const problemSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters"),

  category: z
    .string()
    .min(2, "Category is required"),

  description: z
    .string()
    .min(20, "Description too short"),

  reward: z
    .string()
    .optional(),

  deadline: z
    .string()
    .optional(),
});