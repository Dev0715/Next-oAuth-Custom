import type { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";

export default {
  secret: process.env.SECRET,
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
} satisfies NextAuthConfig;
