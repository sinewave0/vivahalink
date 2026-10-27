"use client";

/**
 * InvitationGate — the wax-seal reveal from the dusk pass: the whole
 * invitation waits behind a photographic night cover carrying the
 * couple's names, date and monogram. Tapping the seal lifts the cover,
 * starts the page's entrance (html.go) and hands the view to the dusk
 * cover beneath.
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import BrandMark from "@/components/ui/BrandMark";

export interface InvitationGateProps {
  /** couple monogram, e.g. "K&M" */
  initials: string;
  /** small label above the names, e.g. "The wedding of" */
  eyebrow?: string;
  name1: string;
  name2: string;
  /** already formatted, e.g. "14 FEBRUARY 2027" */
  date?: string;
  city?: string;
  /** photographic backdrop */
  cover?: string;
  /** small line above the seal */
  label?: string;
}

export default function InvitationGate({
  initials,
  eyebrow = "Together with their families",
  name1,
  name2,
  date,
  city,
  cover = "/images/atelier/dusk.jpg",
  label = "A VivahaLink invitation",
}: InvitationGateProps) {
  const [open, setOpen] = useState(true);

  /* hold the page still while the seal is down */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const lift = () => {
    document.documentElement.classList.add("go");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.button
          type="button"
          onClick={lift}
          aria-label={`Open the invitation for ${name1} and ${name2}`}
          className="seal-gate"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] } }}
        >
          <Image className="seal-cover" src={cover} alt="" fill priority sizes="100vw" />
          <span className="seal-veil" aria-hidden="true" />

          <span className="seal-inner">
            <span className="seal-top">
              <BrandMark className="seal-mark" />
              <span className="seal-label">{label}</span>
            </span>

            <span className="seal-copy">
              <span className="seal-eyebrow">{eyebrow}</span>
              <span className="seal-names">
                {name1}
                <em>&amp;</em>
                {name2}
              </span>
              {(date || city) && (
                <span className="seal-date">
                  {date}
                  {city ? ` · ${city}` : ""}
                </span>
              )}
            </span>

            <span className="seal-bottom">
              <motion.span
                aria-hidden="true"
                className="seal-ring"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 0.8, 0.28, 1] }}
              >
                {initials}
              </motion.span>
              <motion.span
                aria-hidden="true"
                className="seal-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.05, duration: 0.8 }}
              >
                Tap the seal to open
              </motion.span>
            </span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
