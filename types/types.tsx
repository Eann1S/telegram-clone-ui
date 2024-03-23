import {
  EmailConfirmationValidationSchema,
  SignInValidationSchema,
  SignUpValidationSchema,
} from "@/lib/validationSchemas";
import { z } from "zod";

export type BaseError = {
  message?: string;
};

export type SignUpError = BaseError & {
  email?: string;
  username?: string;
  password?: string;
};

export type SignUpFormData = z.infer<typeof SignUpValidationSchema>;
export type SignInFormData = z.infer<typeof SignInValidationSchema>;
export type EmailConfirmationFormData = z.infer<
  typeof EmailConfirmationValidationSchema
>;

export type SignUpUserData = Omit<SignUpFormData, "confirmPassword">;
