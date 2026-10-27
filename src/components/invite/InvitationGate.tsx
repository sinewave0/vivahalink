"use client";

/**
 * InvitationGate — the wax-seal reveal from the dusk pass: the whole
 * invitation waits behind a night cover carrying the couple's monogram.
 * Tapping the seal lifts the cover, starts the page's entrance
 * (html.go) and hands the view to the dusk cover beneath.
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface InvitationGateProps {
  /** couple monogram, e.g. "K&M" */
  initials: string;
  /** small label above the seal */
  label?: string;
}

export default function InvitationGate({
  initials,
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
          aria-label="Open the invitation"
          className="seal-gate"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] } }}
        >
          <p className="label seal-label">{label}</p>
          <motion.span
            aria-hidden="true"
            className="seal-ring"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 0.8, 0.28, 1] }}
          >
            {initials}
          </motion.span>
          <motion.p
            aria-hidden="true"
            className="seal-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.8 }}
          >
            Tap the seal
          </motion.p>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
