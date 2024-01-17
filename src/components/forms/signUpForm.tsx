"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseAuthValidationSchema } from "../../lib/baseAuthValidationSchema";
import { useRouter } from "next/navigation";
import { AlternativeAuthMethodLink } from "../links/alternativeAuthMethodLink";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpError, useSignUp } from "@/lib/hooks";
import classNames from "classnames";
import { FormErrorMessage } from "../messages/formErrorMessage";

const SignUpValidationSchema = BaseAuthValidationSchema.extend({
  username: z
    .string()
    .min(6, "Username length should be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SignUpFormData = z.infer<typeof SignUpValidationSchema>;

export default function SignUpForm() {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpValidationSchema),
    defaultValues: {
      username: localStorage.getItem("username") || "",
      email: localStorage.getItem("userEmail") || "",
      password: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();
  const signUpMutation = useSignUp(onSignUpSuccess, onSignUpError);

  function onSignUpSuccess() {
    router.push("/email-confirmation");
  }
  function onSignUpError(error: SignUpError) {
    form.setError("email", { message: error.email });
    form.setError("username", { message: error.username });
    form.setError("password", { message: error.password });
    form.setError("root", { message: error.message });
  }

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("username", data.username);
    signUpMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full h-full space-y-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="default"
          className={classNames(
            "text-md text-primary-foreground font-semibold",
            { "text-muted-foreground": signUpMutation.isPending }
          )}
        >
          {signUpMutation.isPending ? "Loading..." : "Sign up"}
        </Button>
        {form.formState.errors.root && (
          <div className="ml-2">
            <FormErrorMessage
              errorMessage={form.formState.errors.root.message}
            />
          </div>
        )}
        <AlternativeAuthMethodLink
          description="Already have an account?"
          href={"/signin"}
        >
          Sign in!
        </AlternativeAuthMethodLink>
      </form>
    </Form>
  );
}
