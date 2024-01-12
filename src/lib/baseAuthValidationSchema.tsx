import { z } from "zod";

export const BaseAuthValidationSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Minimum password length is 8 characters"),
});
