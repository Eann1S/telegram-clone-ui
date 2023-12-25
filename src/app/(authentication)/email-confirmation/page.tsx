"use client";

import { useEffect, useState } from "react";
import EmailConfirmationForm from "@/components/forms/authentication/emailConfirmationForm";
import { PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function EmailConfirmationPage() {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setUserEmail(userEmail);
    }
  }, []);

  return (
    <>
      <div className="flex flex-row items-center justify-center mb-7">
        <p className="text-center font-bold text-lg">{userEmail} </p>
        <Link href={"/register"}>
          <PencilIcon className="ml-1 w-[18px] h-[18px] text-slate-600 hover:text-slate-800" />
        </Link>
      </div>
      <EmailConfirmationForm />
    </>
  );
}
