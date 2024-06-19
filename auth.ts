import nextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = nextAuth({
  ...authConfig,
});
