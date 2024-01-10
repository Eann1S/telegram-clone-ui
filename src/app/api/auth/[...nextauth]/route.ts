import { signInAndGetJwt } from "@/lib/fetches";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "text" },
      },
      async authorize(credentials) {
        const res = await signInAndGetJwt(credentials);
        const json = await res.json();

        if (res.ok && json) {
          return json;
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signIn",
    signOut: "/signOut",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.id = user.id;
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      return session;
    },
  },
} satisfies NextAuthOptions);

export { handler as GET, handler as POST };
