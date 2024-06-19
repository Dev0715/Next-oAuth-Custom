import nextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = nextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  events: {
    async linkAccount({ account, user }) {},
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    },
    async session({ token, session }) {
      return session;
    },
    async jwt({ token, user, account, profile }) {
      return token;
    },
  },
});
