import { z } from "zod";

export const internSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters"),

  email: z
    .email("Invalid email address"),

  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),

  college: z
    .string()
    .min(2, "College name is required"),

  designation: z
    .string()
    .min(2, "Designation is required"),

  startDate: z.string(),

  endDate: z.string(),
});