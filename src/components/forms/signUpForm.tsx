"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseAuthValidationSchema } from "../../lib/baseAuthValidationSchema";
import { useRouter } from "next/navigation";
import { signUpUser } from "@/lib/actions";
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

const SignUpSchema = BaseAuthValidationSchema.extend({
  username: z
    .string()
    .min(6, "Username length should be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SignUpFormData = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: localStorage.getItem("username") || "",
      email: localStorage.getItem("userEmail") || "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("username", data.username);

    const res = await signUpUser(data);
    if (res.ok) {
      router.push("/email-confirmation");
    } else {
      const json = await res.json();
      form.setError("email", { message: json.email || "" });
      form.setError("username", { message: json.username || "" });
      form.setError("password", { message: json.password || "" });
      form.setError("root", { message: json.message || "" });
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
          className="text-md text-primary-foreground font-semibold"
        >
          Sign up
        </Button>
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
