"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

/**
 * Floating glass pill navigation — a lantern-hung signpost that floats
 * over the palace scenes instead of a solid bar.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="float-nav" aria-label="Main navigation">
        <Link href="/" className="brand" aria-label="VivahaLink home">
          <span className="brandmark" aria-hidden="true">
            v
          </span>
          <span className="brandname">VivahaLink</span>
        </Link>

        <div className="links">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link href="/templates" className="cta">
          View designs
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="nav-burger"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={15} /> : <Menu size={15} />}
          Menu
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="nav-sheet"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
