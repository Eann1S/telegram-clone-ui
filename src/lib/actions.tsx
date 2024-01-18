import { SignUpFormData } from "../../types/types";

export async function signInUser(
  credentials?: Record<"email" | "password", string>
) {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: { "Content-Type": "application/json" },
  });
}

export async function confirmUserEmail(confirmationCode: string) {
  return fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/confirm/email/${confirmationCode}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function signUpUser(userData: SignUpFormData) {
  const data = {
    email: userData.email,
    username: userData.username,
    password: userData.password,
  };

  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
}
