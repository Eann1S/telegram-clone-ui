"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useSignUp } from "@/lib/hooks";
import { SignUpError } from "../../../types/types";
import classNames from "classnames";
import { FormErrorMessage } from "../messages/formErrorMessage";
import { SignUpValidationSchema } from "@/lib/validationSchemas";
import { SignUpFormData } from "../../../types/types";

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
  const signUpMutation = useSignUp(onSuccess, onError);

  function onSuccess() {
    router.push("/email-confirmation");
  }
  function onError(error: SignUpError) {
    form.setError("email", { message: error.email || "" });
    form.setError("username", { message: error.username || "" });
    form.setError("password", { message: error.password || "" });
    form.setError("root", { message: error.message || "" });
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
            "text-base text-primary-foreground font-semibold",
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
