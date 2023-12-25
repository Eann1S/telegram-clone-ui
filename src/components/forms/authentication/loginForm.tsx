"use client";

import Link from "next/link";
import {BaseFormInput} from "../formInputs";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormInputContainer } from "../formInputContainers";
import { BaseAuthValidationSchema } from "../../../lib/schemas";

const SignInValidationSchema = BaseAuthValidationSchema.extend({
  keepSignedIn: z.boolean()
})

type SignInFormData = z.infer<typeof SignInValidationSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInValidationSchema),
  });

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    console.log(data);
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
        <BaseFormInput id="email" type="email" register={register} />
      </AuthFormInputContainer>
      <AuthFormInputContainer
        inputName="Password"
        errorMessage={errors.password?.message}
      >
        <BaseFormInput id="password" type="text" register={register} />
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
      <button className="text-purple-700 text-md font-semibold p-2 rounded-lg ring-1 ring-gray-100 hover:bg-indigo-100 focus:bg-indigo-200">
        Sign In
      </button>
      <div className="ml-2 text-xs mt-1 block">
        <span className="font-normal">Haven&apos;t account yet?</span>
        <Link
          href={"/register"}
          className="text-purple-500 font-semibold hover:text-purple-600"
        >
          {" "}
          Sign Up Now!
        </Link>
      </div>
    </form>
  );
}
