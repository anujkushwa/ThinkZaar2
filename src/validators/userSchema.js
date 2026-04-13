// validators/userSchema.js

import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(3, "Name required"),

  email: z
    .string()
    .email("Valid email required"),

  role: z.enum([
    "Student",
    "Innovator",
    "Mentor",
    "Admin",
  ]),
});