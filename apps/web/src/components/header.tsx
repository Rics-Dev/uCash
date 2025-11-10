"use client";

import { useState, useEffect } from "react";
import { Menu, X, Wallet } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-slate-200 border-b bg-white/80 shadow-md backdrop-blur-lg dark:border-slate-800 dark:bg-slate-900/80"
          : "bg-transparent shadow-sm"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between sm:h-20">
          {/* Logo */}
          <a className="group flex items-center gap-2" href="/">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-linear-to-br from-green-500 to-emerald-600 opacity-50 blur-sm transition-opacity group-hover:opacity-75" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-green-600 to-emerald-600 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                <Wallet className="h-6 w-6 text-white" />
              </div>
            </div>
            <span className="bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text font-bold text-2xl text-transparent dark:from-green-400 dark:to-emerald-400">
              uCash
            </span>
          </a>

          {/* Desktop Navigation */}
          {/* <div className="hidden items-center gap-8 md:flex"> */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                className="group relative font-medium text-slate-700 transition-colors duration-200 hover:text-green-600 dark:text-slate-300 dark:hover:text-green-400"
                href={link.href}
                key={link.href}
              >
                {link.label}
                <span className="-bottom-1 absolute left-0 h-0.5 w-0 bg-linear-to-r from-green-600 to-emerald-600 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <ModeToggle />

            {/* Desktop CTA Buttons */}
            <div className="hidden items-center gap-3 md:flex">
              <button className="px-4 py-2 font-medium text-slate-700 transition-colors duration-200 hover:text-green-600 dark:text-slate-300 dark:hover:text-green-400">
                Sign In
              </button>
              <button className="hover:-translate-y-0.5 transform rounded-lg bg-linear-to-r from-green-600 to-emerald-600 px-6 py-2.5 font-semibold text-white shadow-green-500/30 shadow-md transition-all duration-300 hover:from-green-700 hover:to-emerald-700 hover:shadow-green-500/40 hover:shadow-lg">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              aria-label="Toggle menu"
              className="rounded-lg bg-slate-100 p-2 transition-colors duration-200 hover:bg-slate-200 md:hidden dark:bg-slate-800 dark:hover:bg-slate-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-slate-700 dark:text-slate-300" />
              ) : (
                <Menu className="h-6 w-6 text-slate-700 dark:text-slate-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-3 border-slate-200 border-t py-4 dark:border-slate-800">
            {navLinks.map((link) => (
              <a
                className="block rounded-lg px-4 py-2 font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:text-green-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-green-400"
                href={link.href}
                key={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="space-y-2 border-slate-200 border-t px-4 pt-3 dark:border-slate-800">
              <button className="w-full rounded-lg border border-slate-300 px-4 py-2.5 font-medium text-slate-700 transition-all duration-200 hover:border-green-500 hover:text-green-600 dark:border-slate-700 dark:text-slate-300 dark:hover:text-green-400">
                Sign In
              </button>
              <button className="w-full rounded-lg bg-linear-to-r from-green-600 to-emerald-600 px-4 py-2.5 font-semibold text-white shadow-green-500/30 shadow-md transition-all duration-300 hover:from-green-700 hover:to-emerald-700 hover:shadow-green-500/40 hover:shadow-lg">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
