"use client";

import {BaseFormInput} from "../formInputs";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseAuthValidationSchema } from "../../../lib/schemas";
import { AuthFormInputContainer } from "../formInputContainers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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

type SignUpFormData = z.infer<typeof SignUpSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignUpFormData>({ resolver: zodResolver(SignUpSchema) });

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    console.log(data);
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("username", data.username);
    router.push("/email-confirmation");
  };

  useEffect(() => {
    setValue('username', localStorage.getItem('username') || '');
    setValue('email', localStorage.getItem('userEmail') || '');
  }, [setValue])

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
          <BaseFormInput
            id="username"
            type="text"
            register={register}
          />
        </AuthFormInputContainer>
        <AuthFormInputContainer
          inputName="Email"
          errorMessage={errors.email?.message}
        >
          <BaseFormInput
            id="email"
            type="email"
            placeholder="example@gmail.com"
            register={register}
          />
        </AuthFormInputContainer>
        <AuthFormInputContainer
          inputName="Password"
          errorMessage={errors.password?.message}
        >
          <BaseFormInput id="password" type="text" register={register} />
        </AuthFormInputContainer>
        <AuthFormInputContainer
          inputName="Confirm password"
          errorMessage={errors.confirmPassword?.message}
        >
          <BaseFormInput id="confirmPassword" type="text" register={register} />
        </AuthFormInputContainer>
        <button
          type="submit"
          className="text-purple-700 text-md font-semibold p-2 rounded-lg ring-1 ring-gray-100 hover:bg-indigo-100 focus:bg-indigo-200"
        >
          Sign Up
        </button>
        <div className="ml-2 text-xs block">
          <span className="font-normal">Already have an account?</span>
          <Link
            href={"/login"}
            className="text-purple-500 font-semibold hover:text-purple-600"
          >
            {" "}
            Sign In!
          </Link>
        </div>
      </form>
    </>
  );
}
