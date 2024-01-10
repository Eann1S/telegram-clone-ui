import { SignUpFormData } from "@/components/forms/signUpForm";

export const signInAndGetJwt = (
  credentials?: Record<"email" | "password", string>
) => {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: { "Content-Type": "application/json" },
  });
};

export const confirmEmail = async (confirmationCode: string) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/confirm/email/${confirmationCode}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const signUpUser = (userData: SignUpFormData) => {
  const data = {
    email: userData.email,
    username: userData.username,
    password: userData.password
  }

  return fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/register`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }
  )
}
