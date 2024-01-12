"use client";

import { AuthFormInput } from "../inputs/authFormInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthFormInputContainer,
  InputErrorMessage,
} from "../inputContainers/authInputContainer";
import { BaseAuthValidationSchema } from "../../lib/schemas";
import { signIn } from "next-auth/react";
import { SubmitButton } from "../buttons/submitButton";
import { AlternativeAuthMethodLink } from "@/components/links/alternativeAuthMethodLink";

const SignInValidationSchema = BaseAuthValidationSchema.extend({
  keepSignedIn: z.boolean(),
});

export type SignInFormData = z.infer<typeof SignInValidationSchema>;

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInValidationSchema),
  });

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (res?.error) {
      setError("root", { message: res.error });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full h-full space-y-4"
    >
      <AuthFormInputContainer
        inputName="Email"
        errorMessage={errors.email?.message}
      >
        <AuthFormInput id="email" type="text" register={register} />
      </AuthFormInputContainer>
      <AuthFormInputContainer
        inputName="Password"
        errorMessage={errors.password?.message}
      >
        <AuthFormInput id="password" type="password" register={register} />
      </AuthFormInputContainer>
      <div className="ml-3 flex flex-row items-center space-x-5">
        <input
          id="keepSignedIn"
          type="checkbox"
          className="w-5 h-5 transition duration-200 text-purple-500 bg-gray-100 border-gray-300 rounded-sm focus:ring-0 hover:cursor-pointer"
          {...register("keepSignedIn")}
        />
        <label
          htmlFor="keepSignedIn"
          className="font-medium text-sm hover:cursor-pointer"
        >
          Keep me signed in
        </label>
      </div>
      <SubmitButton text="Sign In" />
      {errors.root && <InputErrorMessage errorMessage={errors.root.message} />}
      <AlternativeAuthMethodLink
        description="Haven't account yet?"
        href={"/signUp"}
        linkText="Sign Up Now!"
      />
    </form>
  );
}
