import nextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = nextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  events: {
    async linkAccount({ account, user }) {
      // console.log("LINK ACCOUNT", account, user);
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // console.log("SIGN IN", user, account, profile);
      return true;
    },
    async session({ token, session }) {
      // console.log("SESSION", token, session);
      return session;
    },
    async jwt({ token, user, account, profile }) {
      // console.log("JWT", token, user, account, profile);
      return token;
    },
  },
});
