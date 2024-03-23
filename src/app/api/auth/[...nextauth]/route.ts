import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/login`,
          credentials,
          { headers: { "Content-Type": "application/json" } }
        );

        if (res.status === 200) {
          return res.data;
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
