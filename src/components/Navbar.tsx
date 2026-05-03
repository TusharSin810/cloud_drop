"use client";
import Link from "next/link";
import { PrimaryButton } from "./Button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "HOME",        href: "/" },
  { label: "FEATURES", href: "#features" },
  { label: "WORK",    href: "#work" },
  { label: "FAQ",         href: "/faq" },
];

export default function Navbar() {
  const session = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = !!session.data?.user;

  const handleAuth = () => {
    if (isLoggedIn) {
      signOut({ callbackUrl: "/" });
    } else {
      router.push("/login");
    }
    setMenuOpen(false);
  };

  return (
    <header className="relative z-50">
      {/* ── Desktop & Tablet bar ── */}
      <div className="flex items-center justify-between px-6 md:px-10 py-3 bg-transparent">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img
            src="/images/logo.png"
            alt="CloudDrop"
            className="h-10 md:h-12 w-auto"
          />
        </Link>

        {/* Nav links — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12 text-sm font-mono">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-high2/70 hover:text-high1 transition-colors duration-200 tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Auth — hidden on mobile */}
        <div className="hidden md:flex items-center gap-4 font-mono">
          <span className="text-high2 font-bold text-sm tracking-wider">
            {isLoggedIn ? "LOG OUT" : "LOG IN"}
          </span>
          <PrimaryButton onClick={handleAuth}>&#x21d7;</PrimaryButton>
        </div>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-secondary text-high2 hover:border-high1 hover:text-high1 transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-primary/95 backdrop-blur-md border-t border-secondary px-6 py-6 flex flex-col gap-5 font-mono shadow-xl">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-high2/70 hover:text-high1 transition-colors text-sm tracking-wider py-1 border-b border-secondary/50"
            >
              {link.label}
            </a>
          ))}

          {/* Auth row in drawer */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-high2 font-bold text-sm tracking-wider">
              {isLoggedIn ? "LOG OUT" : "LOG IN"}
            </span>
            <PrimaryButton onClick={handleAuth}>&#x21d7;</PrimaryButton>
          </div>
        </div>
      )}
    </header>
  );
}