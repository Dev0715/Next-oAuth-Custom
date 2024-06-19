"use client";

import { signIn } from "next-auth/react";

export default function Home() {
  const onGithubAuth = () => {
    signIn("github", {
      redirectTo: "/home",
    });
  };

  const onEpicAuth = () => {
    signIn("epicgames", {
      redirectTo: "/home",
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <button
          className="p-4 bg-blue-500 text-white rounded-lg"
          onClick={onGithubAuth}
        >
          Sign in with GitHub
        </button>
        <button
          className="p-4 bg-blue-500 text-white rounded-lg"
          onClick={onEpicAuth}
        >
          Sign in with Epic
        </button>
      </div>
    </main>
  );
}
