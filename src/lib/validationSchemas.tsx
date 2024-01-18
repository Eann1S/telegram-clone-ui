import { z } from "zod";

export const BaseAuthValidationSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Minimum password length is 8 characters"),
});

export const SignUpValidationSchema = BaseAuthValidationSchema.extend({
  username: z
    .string()
    .min(6, "Username length should be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const SignInValidationSchema = BaseAuthValidationSchema.extend({
  keepSignedIn: z.boolean().default(false),
});

export const EmailConfirmationValidationSchema = z.object({
  confirmationCode: z.string().min(1, "Please enter confirmation code"),
});
