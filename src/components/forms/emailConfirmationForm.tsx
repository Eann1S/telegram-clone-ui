"use client";

import { AuthFormInput } from "../inputs/authFormInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormInputContainer } from "../inputContainers/authInputContainer";
import { confirmUserEmail } from "@/lib/actions";
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
    const res = await confirmUserEmail(data.confirmationCode);
    if (res.ok) {
      router.push("/login");
    } else {
      const json = await res.json();
      setError("confirmationCode", { message: json.message || "" });
    }
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
