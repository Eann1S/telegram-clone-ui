"use client";

import {BaseFormInput} from "../formInputs";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormInputContainer } from "../formInputContainers";

const EmailConfirmationValidationSchema = z.object({
  confirmationCode: z.string().min(1, "Please enter confirmation code"),
});

type EmailConfirmationFormData = z.infer<typeof EmailConfirmationValidationSchema>;

export default function EmailConfirmationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailConfirmationFormData>({ resolver: zodResolver(EmailConfirmationValidationSchema) });

  const onSubmit: SubmitHandler<EmailConfirmationFormData> = (data) => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full h-full space-y-4">
      <AuthFormInputContainer inputName="Confirmation Code" errorMessage={errors.confirmationCode?.message}>
        <BaseFormInput id="confirmationCode" type="text" register={register} />
      </AuthFormInputContainer>
      <button type="submit" className="text-purple-700 text-md font-semibold p-2 ring-1 ring-slate-100 rounded-lg hover:bg-indigo-100 focus:bg-indigo-200">
        Confirm Email
      </button>
    </form>
  );
}
