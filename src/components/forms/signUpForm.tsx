"use client";

import { AuthFormInput } from "../inputs/authFormInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseAuthValidationSchema } from "../../lib/schemas";
import { AuthFormInputContainer } from "../inputContainers/authInputContainer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signUpUser } from "@/lib/actions";
import { SubmitButton } from "../buttons/submitButton";
import { AlternativeAuthMethodLink } from "../links/alternativeAuthMethodLink";

const SignUpSchema = BaseAuthValidationSchema.extend({
  username: z
    .string()
    .min(6, "Username length should be at least 6 characters"),
  email: z.string().email("Invalid email format"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SignUpFormData = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<SignUpFormData>({ resolver: zodResolver(SignUpSchema) });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("username", data.username);
    
    const res = await signUpUser(data);
    if (res.ok) {
      router.push("/email-confirmation");
    } else {
      const json = await res.json();
      setError("email", { message: json.email || "" });
      setError("username", { message: json.username || "" });
      setError("password", { message: json.password || "" });
      setError("root", { message: json.message || "" });
    }
  };

  useEffect(() => {
    setValue("username", localStorage.getItem("username") || "");
    setValue("email", localStorage.getItem("userEmail") || "");
  }, [setValue]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full h-full space-y-4"
      >
        <AuthFormInputContainer
          inputName="Username"
          errorMessage={errors.username?.message}
        >
          <AuthFormInput id="username" type="text" register={register} />
        </AuthFormInputContainer>
        <AuthFormInputContainer
          inputName="Email"
          errorMessage={errors.email?.message}
        >
          <AuthFormInput
            id="email"
            type="text"
            placeholder="example@gmail.com"
            register={register}
          />
        </AuthFormInputContainer>
        <AuthFormInputContainer
          inputName="Password"
          errorMessage={errors.password?.message}
        >
          <AuthFormInput id="password" type="password" register={register} />
        </AuthFormInputContainer>
        <AuthFormInputContainer
          inputName="Confirm password"
          errorMessage={errors.confirmPassword?.message}
        >
          <AuthFormInput
            id="confirmPassword"
            type="password"
            register={register}
          />
        </AuthFormInputContainer>
        {errors.root && (
          <p className="ml-2 text-xs font-medium text-red-500">
            {errors.root.message}
          </p>
        )}
        <SubmitButton text="Sign Up" />
        <AlternativeAuthMethodLink
          description="Already have an account?"
          href={"/signIn"}
          linkText="Sign In!"
        />
      </form>
    </>
  );
}
