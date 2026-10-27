"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import BrandMark from "@/components/ui/BrandMark";
import { NAV_LINKS, waLink, waMessages } from "@/lib/constants";

const EASE = [0.32, 0.72, 0, 1] as const;

/**
 * The storefront nav — a floating brass-threaded island over the cover,
 * settling into frosted bone once you scroll. On small screens it opens
 * a full night-court menu with the links set as large engraved lines.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled((window.scrollY || 0) > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    /* Close the overlay after the route settles; deferring keeps this
       out of the synchronous effect body (React compiler rule). */
    const close = window.setTimeout(() => setOpen(false), 0);
    return () => window.clearTimeout(close);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <nav
        className={`site-nav${overHero ? " is-over-hero" : ""}${scrolled ? " is-scrolled" : ""}`}
        aria-label="Main navigation"
      >
        <div className="nav-inner">
          <Link href="/" className="nav-brand" aria-label="VivahaLink home">
            <BrandMark className="brandmark" />
            <span className="brandname">VivahaLink</span>
          </Link>

          <div className="nav-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/#inside">The invitation</Link>
          </div>

          <div className="nav-actions">
            <a
              href={waLink(waMessages.inquiry())}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-cta"
            >
              Order a design <ArrowUpRight size={12} aria-hidden="true" />
            </a>
            <button
              type="button"
              className="nav-burger"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="site-menu"
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            className="nav-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="nav-overlay-top">
              <Link href="/" className="nav-brand" onClick={() => setOpen(false)}>
                <BrandMark className="brandmark" />
                <span className="brandname">VivahaLink</span>
              </Link>
              <button
                type="button"
                className="nav-overlay-close"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                autoFocus
              >
                <span />
                <span />
              </button>
            </div>

            <div className="nav-overlay-links">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: EASE }}
                >
                  <Link href={link.href} className="nav-overlay-link">
                    <span className="n">0{i + 1}</span>
                    <span className="t">{link.label}</span>
                    <span className="a" aria-hidden="true">
                      <ArrowUpRight size={18} />
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
              >
                <a
                  href={waLink(waMessages.inquiry())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-overlay-link"
                >
                  <span className="n">04</span>
                  <span className="t">Order</span>
                  <span className="a" aria-hidden="true">
                    <ArrowUpRight size={18} />
                  </span>
                </a>
              </motion.div>
            </div>

            <div className="nav-overlay-foot">
              <span>Chennai, India · replies within the hour</span>
              <a href={waLink(waMessages.inquiry())} target="_blank" rel="noopener noreferrer">
                WhatsApp the studio
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
