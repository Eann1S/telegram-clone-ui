"use client";

import { AuthFormInput } from "../inputs/authFormInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormInputContainer } from "../inputContainers/authInputContainer";
import { confirmEmail } from "@/lib/fetches";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../buttons/submitButton";

const EmailConfirmationValidationSchema = z.object({
  confirmationCode: z.string().min(1, "Please enter confirmation code"),
});

export type EmailConfirmationFormData = z.infer<
  typeof EmailConfirmationValidationSchema
>;

export default function EmailConfirmationForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EmailConfirmationFormData>({
    resolver: zodResolver(EmailConfirmationValidationSchema),
  });

  const onSubmit: SubmitHandler<EmailConfirmationFormData> = async (data) => {
    const res = await confirmEmail(data.confirmationCode);
    const json = await res.json();
    if (res.ok) {
      router.push("/login");
    } else {
      setError("confirmationCode", { message: json.message || "" });
    }
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full h-full space-y-4"
    >
      <AuthFormInputContainer
        inputName="Confirmation Code"
        errorMessage={errors.confirmationCode?.message}
      >
        <AuthFormInput id="confirmationCode" type="text" register={register} />
      </AuthFormInputContainer>
      <SubmitButton text="Confirm Email" />
    </form>
  );
}
