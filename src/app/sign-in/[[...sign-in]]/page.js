"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  // ✅ Smooth redirect after login
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/dashboard"); // replace > push (better UX)
    }
  }, [isSignedIn, isLoaded, router]);

  // ✅ Prevent UI flash before Clerk loads
  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-6 py-10">
      
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-8 shadow-[0_0_40px_rgba(0,255,255,0.08)]">
        
        {/* 🔥 Header */}
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-400">
            ThinkZaar
          </p>

          <h1 className="mt-3 text-3xl font-bold text-white">
            Welcome Back 👋
          </h1>

          <p className="mt-2 text-slate-400 text-sm">
            Sign in to continue your innovation journey.
          </p>
        </div>

        {/* 🔥 Clerk SignIn */}
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          afterSignInUrl="/dashboard"
          appearance={{
            variables: {
              colorPrimary: "#06b6d4",
              colorBackground: "transparent",
              colorText: "#ffffff",
              colorInputText: "#ffffff",
              colorInputBackground: "#020617",
            },
            elements: {
              card: "bg-transparent shadow-none p-0",
              rootBox: "w-full",

              headerTitle: "hidden",
              headerSubtitle: "hidden",

              formFieldInput:
                "bg-slate-950 border border-slate-700 focus:border-cyan-400 text-white rounded-xl",

              formButtonPrimary:
                "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-xl",

              socialButtonsBlockButton:
                "bg-white text-black border border-gray-300 hover:bg-gray-100 rounded-xl",

              footerActionLink:
                "text-cyan-400 hover:text-cyan-300",
            },
          }}
        />

      </div>
    </main>
  );
}