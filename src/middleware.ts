import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/signIn",
    signOut: "/signOut",
  },
});

export const config = {
  // api|_next/static|_next/image|favicon.ico|signUp|email-confirmation
  matcher: ["/((?!).*)"],
};
