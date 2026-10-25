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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ivory-50/80 backdrop-blur-md border-b border-gold-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-maroon-800 to-maroon-600 flex items-center justify-center">
              <span className="text-gold-400 font-serif text-sm font-bold">V</span>
            </div>
            <span className="font-serif text-xl md:text-2xl font-bold text-maroon-800 group-hover:text-maroon-600 transition-colors">
              VivahaLink
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors relative ${
                  pathname === link.href
                    ? "text-maroon-800"
                    : "text-temple-700 hover:text-maroon-700"
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
              className="bg-maroon-800 text-ivory-100 px-5 py-2 rounded-full text-sm font-medium hover:bg-maroon-700 transition-colors shadow-lg shadow-maroon-800/20"
            >
              View Templates
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-maroon-800"
            aria-label="Toggle menu"
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-ivory-50/95 backdrop-blur-md border-b border-gold-200/50 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 px-3 rounded-lg text-base font-medium transition-colors ${
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
                className="block text-center bg-maroon-800 text-ivory-100 px-5 py-3 rounded-full text-sm font-medium hover:bg-maroon-700 transition-colors mt-2"
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
