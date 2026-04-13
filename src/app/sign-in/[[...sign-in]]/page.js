// src/app/sign-in/[[...sign-in]]/page.js

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="mb-6 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
            ThinkZaar
          </p>

          <h1 className="mt-3 text-3xl font-bold text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-slate-400">
            Sign in to continue your innovation journey.
          </p>
        </div>

        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          appearance={{
            variables: {
              colorPrimary: "#06b6d4",
              colorBackground: "#0f172a",
              colorText: "#ffffff",
              colorInputText: "#ffffff",
              colorInputBackground: "#020617",
            },
            elements: {
              card: "bg-transparent shadow-none",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton:
                "border border-slate-700 hover:border-cyan-400",
              formButtonPrimary:
                "bg-cyan-500 hover:bg-cyan-400 text-slate-950",
              footerActionLink: "text-cyan-400 hover:text-cyan-300",
            },
          }}
        />
      </div>
    </main>
  );
}