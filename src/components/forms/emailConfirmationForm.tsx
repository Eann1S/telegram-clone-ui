"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import classNames from "classnames";
import { Input } from "../ui/input";
import { FormErrorMessage } from "../messages/formErrorMessage";
import { useConfirmEmail } from "@/lib/hooks";
import { BaseError } from "../../../types/types";
import { EmailConfirmationValidationSchema } from "@/lib/validationSchemas";
import { EmailConfirmationFormData } from "../../../types/types";

export default function EmailConfirmationForm() {
  const form = useForm<EmailConfirmationFormData>({
    resolver: zodResolver(EmailConfirmationValidationSchema),
    defaultValues: {
      confirmationCode: "",
    },
  });
  const router = useRouter();
  const mutation = useConfirmEmail(onSuccess, onError);

  function onSuccess() {
    router.push("/signin");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("username");
  }
  function onError(error: BaseError) {
    form.setError("root", { message: error.message || "" });
  }

  const onSubmit: SubmitHandler<EmailConfirmationFormData> = async (data) => {
    mutation.mutate(data.confirmationCode);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full h-full space-y-4"
      >
        <FormField
          control={form.control}
          name="confirmationCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmation code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <div className="ml-2">
            <FormErrorMessage
              errorMessage={form.formState.errors.root.message}
            />
          </div>
        )}
        <Button
          type="submit"
          variant="default"
          className={classNames(
            "text-base text-primary-foreground font-semibold",
            {
              "text-muted-foreground": mutation.isPending,
            }
          )}
        >
          {mutation.isPending ? "Loading..." : "Confirm Email"}
        </Button>
      </form>
    </Form>
  );
}
