"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center relative overflow-hidden px-4">

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(#0092CA 1px, transparent 1px),
            linear-gradient(90deg, #0092CA 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-high1/5 blur-3xl pointer-events-none" />

      {/* Card */}
      <div className="relative w-full max-w-sm">

        {/* Top accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-high1 to-transparent" />

        <div className="bg-primary/90 backdrop-blur-sm border border-secondary border-t-0 rounded-b-2xl p-8 sm:p-10">

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link href="/">
              <img
                src="/images/logo.png"
                alt="CloudDrop"
                className="h-9 sm:h-10 object-contain"
              />
            </Link>
          </div>

          {/* Title */}
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-high2 font-mono tracking-widest mb-2">
              WELCOME BACK
            </h1>
            <p className="text-high2/35 font-mono text-xs tracking-widest">
              SIGN IN TO ACCESS CLOUD DROP
            </p>
          </div>

          {/* Google button */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full cursor-pointer flex items-center justify-center gap-3 px-6 py-3.5 bg-high2 text-primary font-mono font-bold rounded-xl hover:bg-white active:bg-high2/90 transition-all duration-200 tracking-wider text-sm"
          >
            {/* Google SVG */}
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            CONTINUE WITH GOOGLE
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-secondary" />
            <span className="text-high2/20 font-mono text-xs">OR</span>
            <div className="flex-1 h-px bg-secondary" />
          </div>

          {/* Back to home */}
          <div className="text-center">
            <Link
              href="/"
              className="text-high2/30 font-mono text-xs hover:text-high1 transition-colors tracking-widest"
            >
              ← BACK TO HOME
            </Link>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="h-px w-1/2 mx-auto bg-gradient-to-r from-transparent via-high1/40 to-transparent" />
      </div>
    </div>
  );
}