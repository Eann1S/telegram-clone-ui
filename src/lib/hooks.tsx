import { useEffect, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { SignUpFormData, SignUpUserData } from "../../types/types";
import { SignUpError, BaseError } from "../../types/types";

const defaultRequestConfig = {
  headers: { "Content-Type": "application/json" },
};

export function useUserEmail() {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setUserEmail(userEmail);
    }
  }, []);

  return { userEmail };
}

export function useSignUp(
  onSuccess?: () => any,
  onError?: (error: SignUpError) => any
) {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: (userData: SignUpUserData) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/register`,
        userData,
        defaultRequestConfig
      );
    },
    onSuccess,
    onError,
  });
}

export function useConfirmEmail(
  onSuccess?: () => any,
  onError?: (error: BaseError) => any
) {
  return useMutation({
    mutationKey: ["confirmEmail"],
    mutationFn: (confirmationCode: string) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/confirm/email/${confirmationCode}`,
        {},
        defaultRequestConfig
      );
    },
    onSuccess,
    onError,
  });
}
