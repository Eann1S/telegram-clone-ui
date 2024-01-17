"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseAuthValidationSchema } from "../../lib/baseAuthValidationSchema";
import { signIn } from "next-auth/react";
import { AlternativeAuthMethodLink } from "@/components/links/alternativeAuthMethodLink";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import classNames from "classnames";
import { FormErrorMessage } from "../messages/formErrorMessage";

const SignInValidationSchema = BaseAuthValidationSchema.extend({
  keepSignedIn: z.boolean().default(false),
});

export type SignInFormData = z.infer<typeof SignInValidationSchema>;

export default function SignInForm() {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(SignInValidationSchema),
    defaultValues: {
      email: "",
      password: "",
      keepSignedIn: false,
    },
  });

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (res?.error) {
      form.setError("root", { message: res.error });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full h-full space-y-4"
      >
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
          name="keepSignedIn"
          render={({ field }) => (
            <FormItem className="ml-2 flex flex-row items-center space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  className="transition delay-50"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="font-normal">Keep me signed in</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="default"
          className={classNames(
            "text-md text-primary-foreground font-semibold",
            {
              "text-muted-foreground": form.formState.isSubmitting,
            }
          )}
        >
          {form.formState.isSubmitting ? "Loading..." : "Sign in"}
        </Button>
        {form.formState.errors.root && (
          <div className="ml-2">
            <FormErrorMessage
              errorMessage={form.formState.errors.root.message}
            />
          </div>
        )}
        <AlternativeAuthMethodLink
          description="Haven't account yet?"
          href={"/signup"}
        >
          Sign Up Now!
        </AlternativeAuthMethodLink>
      </form>
    </Form>
  );
}
