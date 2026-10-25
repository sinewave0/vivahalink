"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { MailOpen } from "lucide-react";
import type { InvitationData, Template } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import Ornament from "./Ornament";

interface IntroGateProps {
  invitation: InvitationData;
  template: Template;
  onOpen: () => void;
}

/**
 * Full-screen traditional reveal gate. Locks scrolling until the guest
 * taps "Open Invitation", then slides away to reveal the microsite.
 */
export default function IntroGate({ invitation, template, onOpen }: IntroGateProps) {
  const main = template.palette[0]?.hex ?? "#7a1636";
  const gold = "#e5c02a";
  const initials = `${invitation.coupleName1[0]}&${invitation.coupleName2[0]}`;

  // Lock body scroll while the gate is visible
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const open = () => onOpen();

  return (
    <motion.div
      key="intro-gate"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: main }}
      exit={{ opacity: 0, y: "-15%", scale: 1.04 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Soft vignette + kolam texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      <div className="absolute inset-0 kolam-pattern opacity-15" />

      {/* Slowly rotating gold ring */}
      <motion.div
        aria-hidden="true"
        className="absolute rounded-full border border-dashed"
        style={{ borderColor: `${gold}55`, width: "min(82vw, 30rem)", height: "min(82vw, 30rem)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-[11px] sm:text-xs uppercase tracking-[0.35em]"
          style={{ color: `${gold}cc` }}
        >
          A VivahaLink Invitation
        </motion.p>

        {/* Monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55, duration: 0.7, ease: "easeOut" }}
          className="mx-auto mt-8 mb-8 flex items-center justify-center"
        >
          <div
            className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full border-2 shadow-lg"
            style={{ borderColor: gold, backgroundColor: `${gold}14` }}
          >
            <span className="font-serif text-3xl sm:text-4xl font-medium" style={{ color: gold }}>
              {initials}
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-ivory-100 leading-tight"
        >
          {invitation.coupleName1}
          <span className="mx-3 italic" style={{ color: gold }}>
            &amp;
          </span>
          {invitation.coupleName2}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.7 }}
        >
          <Ornament className="mt-7" tone={gold} />
          <p className="mt-6 text-sm sm:text-base text-ivory-300/85 italic max-w-sm mx-auto">
            {invitation.tagline}
          </p>
          <p className="mt-4 text-xs sm:text-sm uppercase tracking-[0.25em] text-ivory-300/70">
            {formatDate(invitation.weddingDate)}
          </p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={open}
            className="group mt-10 inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-medium tracking-wide shadow-lg transition-transform"
            style={{ backgroundColor: gold, color: "#3a0617" }}
          >
            <MailOpen size={18} />
            Open Invitation
          </motion.button>

          <p className="mt-5 text-[11px] text-ivory-400/70 tracking-wide">
            Best experienced with sound on
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
