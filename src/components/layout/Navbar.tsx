"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gold-300/40 bg-ivory-50/85 backdrop-blur-md">
      <div className="container-width">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-50"
          >
            <div className="w-8 h-8 rounded-full bg-maroon-800 flex items-center justify-center shadow-sm">
              <span className="text-gold-300 font-serif text-sm font-bold">V</span>
            </div>
            <span className="font-serif text-xl md:text-2xl font-bold text-maroon-900 group-hover:text-gold-700 transition-colors duration-300 ease-brand">
              VivahaLink
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`text-sm font-medium transition-colors duration-300 ease-brand relative rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-50 ${
                  pathname === link.href
                    ? "text-maroon-900"
                    : "text-temple-600 hover:text-maroon-800"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-500 rounded-full"
                  />
                )}
              </Link>
            ))}
            <Link
              href="/templates"
              className="bg-maroon-800 text-ivory-100 px-5 py-2 rounded-full text-sm font-medium hover:bg-maroon-700 active:scale-[0.98] transition-all duration-300 ease-brand shadow-lg shadow-maroon-800/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-50"
            >
              View Templates
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-maroon-800 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-50"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="md:hidden bg-ivory-50/95 backdrop-blur-md border-b border-gold-300/40 overflow-hidden"
          >
            <div id="mobile-menu" className="px-4 py-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={`block py-2 px-3 rounded-lg text-base font-medium transition-colors duration-300 ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-50 ${
                    pathname === link.href
                      ? "bg-maroon-800/10 text-maroon-800"
                      : "text-temple-700 hover:bg-gold-100/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            <Link
              href="/templates"
              onClick={() => setIsOpen(false)}
              className="block text-center bg-maroon-800 text-ivory-100 px-5 py-3 rounded-full text-sm font-medium hover:bg-maroon-700 active:scale-[0.98] transition-all duration-300 ease-brand mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-50"
            >
                View Templates
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
