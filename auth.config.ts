import type { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";
import EpicGames from "./providers/epicgames";

export default {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    EpicGames({
      clientId: process.env.EPIC_CLIENT_ID as string,
      clientSecret: process.env.EPIC_CLIENT_SECRET as string,
    }),
  ],
} satisfies NextAuthConfig;
