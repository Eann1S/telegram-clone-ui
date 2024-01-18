"use client";

import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useUserEmail } from "@/lib/hooks";

export function EditEmailLink() {
  const { userEmail } = useUserEmail();

  return (
    <div className="flex flex-row items-center justify-center mb-7">
      <p className="text-center font-bold text-lg">{userEmail} </p>
      <Link href={"/signup"}>
        <PencilIcon className="ml-1 w-[18px] h-[18px] text-primary-foreground hover:text-muted-foreground" />
      </Link>
    </div>
  );
}
