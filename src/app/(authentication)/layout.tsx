import Image from "next/image";
import { telegram_logo } from "@/lib/links";

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-full min-w-full flex">
      <div className="h-full w-full max-w-md mx-auto pb-8 px-8 pt-16 md:pt-28">
        <div className="mb-10 flex justify-center items-center">
          <Image
            src={telegram_logo}
            alt=""
            width={512}
            height={512}
            className="w-[175px] h-[175px]"
          />
        </div>
        <div className="w-full">
          <h1 className="text-center text-4xl font-bold">Telegram</h1>
        </div>
        <div className="mt-10 w-full h-full">{children}</div>
      </div>
    </main>
  );
}
