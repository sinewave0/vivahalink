"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MailOpen } from "lucide-react";
import type { InvitationData, Template } from "@/lib/types";
import { GATE_LABELS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import Ornament from "./Ornament";
import RosePetals from "./RosePetals";

interface IntroGateProps {
  invitation: InvitationData;
  template: Template;
  onOpen: () => void;
}

type Phase = "sealed" | "opening" | "ready";

const GOLD = "#e5c02a";
const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_FLAP: [number, number, number, number] = [0.65, 0, 0.35, 1];

/**
 * Full-screen traditional reveal gate.
 *
 * The guest is shown a sealed envelope stamped with the couple's wax
 * monogram. Tapping the seal cracks it open, the flap rotates away in 3D,
 * and the invitation card rises out of the pocket — unlocking scrolling
 * once the card's "Open Invitation" button is tapped.
 */
export default function IntroGate({ invitation, template, onOpen }: IntroGateProps) {
  const reduced = !!useReducedMotion();
  const [phase, setPhase] = useState<Phase>("sealed");

  const main = template.palette[0]?.hex ?? "#7a1636";
  const gold = GOLD;
  const initials = `${invitation.coupleName1[0]}&${invitation.coupleName2[0]}`;
  const names = `${invitation.coupleName1} & ${invitation.coupleName2}`;

  // Lock body scroll while the gate is visible
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Advance the choreography: seal → flap/card animations → settled card
  useEffect(() => {
    if (phase !== "opening") return;
    const t = window.setTimeout(() => setPhase("ready"), reduced ? 140 : 2100);
    return () => clearTimeout(t);
  }, [phase, reduced]);

  // Honour reduced motion by collapsing every duration
  const dur = (d: number) => (reduced ? 0 : d);
  const del = (d: number) => (reduced ? 0.01 * d : d);

  const breakSeal = () => {
    setPhase((p) => (p === "sealed" ? "opening" : p));
  };

  const openInvitation = () => {
    if (phase !== "ready") return;
    onOpen();
  };

  const isOpening = phase !== "sealed";

  return (
    <motion.div
      key="intro-gate"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: main }}
      exit={{ opacity: 0, y: "-12%", scale: 1.03 }}
      transition={{ duration: dur(0.7), ease: EASE_OUT_EXPO }}
    >
      {/* Soft vignette + kolam texture + drifting petals */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/55" />
      <div className="absolute inset-0 kolam-pattern opacity-15" />
      <RosePetals count={11} />

      {/* Brand ribbon */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: del(0.3), duration: dur(0.6) }}
        className="absolute inset-x-0 top-8 z-10 text-center text-[10px] uppercase tracking-[0.35em] sm:text-xs"
        style={{ color: `${gold}cc` }}
      >
        A VivahaLink Invitation
      </motion.p>

      {/* Slowly rotating gold ring behind the envelope */}
      <motion.div
        aria-hidden="true"
        className="absolute rounded-full border border-dashed"
        style={{
          borderColor: `${gold}55`,
          width: "min(92vw, 34rem)",
          height: "min(92vw, 34rem)",
        }}
        animate={{ rotate: 360, opacity: phase === "ready" ? 0.35 : 1 }}
        transition={{
          rotate: { duration: 50, repeat: Infinity, ease: "linear" },
          opacity: { duration: dur(1.2), delay: del(2.1) },
        }}
      />

      {/* ── Envelope scene ── */}
      <div
        className="relative z-10"
        style={{ perspective: 1300, width: "min(84vw, 19rem, 40dvh)" }}
      >
        <div className="relative aspect-[100/132]">
          {/* Everything that sinks away once the card is out */}
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={
              phase === "ready"
                ? { opacity: 0, y: "7%", scale: 0.96 }
                : { opacity: 1, y: "0%", scale: 1 }
            }
            transition={{
              duration: dur(0.75),
              delay: del(phase === "ready" ? 1.9 : 0),
              ease: "easeOut",
            }}
            style={{ pointerEvents: phase === "ready" ? "none" : "auto" }}
          >
            {/* Envelope back panel */}
            <div className="absolute inset-0 z-10 rounded-2xl bg-[#f3e7d0] shadow-[0_30px_80px_rgba(16,2,8,0.55)]" />
            <div className="absolute inset-[6px] z-10 rounded-[0.9rem] border border-gold-600/25" />

            {/* Envelope front pocket (covers the resting card) */}
            <div className="absolute inset-0 z-30 overflow-hidden rounded-2xl bg-gradient-to-b from-[#fcf4e4] to-[#f1e3c8]">
              <div className="absolute inset-x-[6px] top-[6px] bottom-[6px] rounded-[0.9rem] border border-gold-600/20" />
              <div className="absolute inset-0 kolam-pattern-dense opacity-[0.08]" />
              {/* Slot shadow at the top edge the card emerges from */}
              <div className="absolute inset-x-3 top-0 h-8 rounded-b-3xl bg-gradient-to-b from-black/10 to-transparent" />
            </div>

            {/* Flap — rotates open around its top edge in 3D */}
            <motion.svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute left-0 top-0 h-[52%] w-full"
              style={{ transformOrigin: "top center", zIndex: 40 }}
              initial={false}
              animate={{
                rotateX: isOpening ? -178 : 0,
                zIndex: isOpening ? [40, 40, 5] : 40,
              }}
              transition={{
                rotateX: { duration: dur(0.85), delay: del(0.3), ease: EASE_FLAP },
                zIndex: {
                  duration: dur(0.85),
                  delay: del(0.3),
                  times: [0, 0.46, 0.52],
                },
              }}
            >
              <defs>
                <linearGradient id="gateFlapFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fbf2df" />
                  <stop offset="100%" stopColor="#eeddbd" />
                </linearGradient>
              </defs>
              <path
                d="M0 0 L100 0 Q98.5 34 50 100 Q1.5 34 0 0 Z"
                fill="url(#gateFlapFill)"
                stroke="#c99a1d"
                strokeWidth="0.8"
              />
            </motion.svg>
          </motion.div>

          {/* ── The invitation card (hidden inside until the seal breaks) ── */}
          <motion.div
            aria-hidden={phase === "sealed"}
            className="absolute left-1/2 top-1/2 z-20 flex aspect-[3/4] w-[76%] flex-col items-center rounded-xl border border-gold-500/50 bg-gradient-to-b from-ivory-50 via-ivory-50 to-ivory-200 px-[7%] py-[7%] text-center shadow-[0_24px_60px_rgba(30,4,12,0.45)]"
            initial={false}
            animate={{
              x: "-50%",
              // Sealed: hidden inside the pocket. Opening: slides up and
              // settles clear of the envelope so it can read the card.
              y: isOpening ? "-105%" : "-50%",
              zIndex: isOpening ? [20, 20, 45] : 20,
            }}
            transition={{
              y: { duration: dur(1.0), delay: del(0.95), ease: EASE_OUT_EXPO },
              x: { duration: 0 },
              zIndex: {
                duration: dur(1.0),
                delay: del(0.95),
                times: [0, 0.6, 0.68],
              },
            }}
          >
            <p className="text-[8px] uppercase tracking-[0.32em] text-gold-700 sm:text-[10px]">
              {GATE_LABELS[template.category]}
            </p>
            <h2 className="mt-[4%] font-serif text-[clamp(1.3rem,5.4vw,1.9rem)] font-semibold leading-[1.18] text-maroon-900">
              {invitation.coupleName1}
              <span className="block text-[0.72em] italic leading-none" style={{ color: "#a5731a" }}>
                &amp;
              </span>
              {invitation.coupleName2}
            </h2>
            <Ornament className="mt-[5%] scale-90" tone={gold} />
            <p className="mt-[4%] text-[10px] italic leading-relaxed text-temple-600 sm:text-xs">
              {invitation.tagline}
            </p>
            <p className="mt-[3.5%] text-[8px] uppercase tracking-[0.22em] text-temple-500 sm:text-[10px]">
              {formatDate(invitation.weddingDate)}
            </p>

            {/* Open action — appears once the card has settled */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{
                opacity: phase === "ready" ? 1 : 0,
                scale: phase === "ready" ? 1 : 0.92,
              }}
              transition={{ duration: dur(0.5), delay: del(2.3), ease: "easeOut" }}
              className="mt-[8%]"
              style={{ pointerEvents: phase === "ready" ? "auto" : "none" }}
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={openInvitation}
                disabled={phase !== "ready"}
                className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide shadow-lg outline-none disabled:cursor-default"
                style={{ backgroundColor: gold, color: "#3a0617" }}
              >
                <MailOpen size={16} />
                Open Invitation
              </motion.button>
            </motion.div>
          </motion.div>

          {/* ── Wax seal (the tap target that starts it all) ── */}
          <motion.div
            className="absolute z-50"
            style={{ left: "50%", top: "52%", marginLeft: "-2.5rem", marginTop: "-2.5rem" }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={
              phase === "sealed"
                ? { opacity: 1, scale: 1, y: [0, -5, 0], rotate: 0, transition: {
                    opacity: { delay: del(0.55), duration: dur(0.6) },
                    scale: { delay: del(0.55), duration: dur(0.6), ease: "backOut" },
                    y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
                  } }
                : { opacity: 0, scale: 0.62, y: 0, rotate: -8, transition: {
                    duration: dur(0.55), delay: del(0.08), ease: "easeIn",
                  } }
            }
          >
            <motion.button
              type="button"
              onClick={breakSeal}
              whileHover={phase === "sealed" ? { scale: 1.06 } : undefined}
              whileTap={phase === "sealed" ? { scale: 0.94 } : undefined}
              disabled={phase !== "sealed"}
              className="flex h-20 w-20 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
              style={{
                background:
                  "radial-gradient(circle at 32% 26%, #a3304f 0%, #7a1636 52%, #4c0c22 100%)",
                border: "1px solid rgba(229,192,42,0.5)",
                boxShadow:
                  "0 12px 28px rgba(16,2,8,0.55), inset 0 2px 6px rgba(255,236,200,0.22), inset 0 -8px 16px rgba(0,0,0,0.38)",
                cursor: phase === "sealed" ? "pointer" : "default",
              }}
              aria-label={`Break the wax seal and open ${names}'s invitation`}
              title="Tap the wax seal to open"
            >
              <span
                className="flex h-[76%] w-[76%] items-center justify-center rounded-full border border-[#e5c02a]/45"
                style={{ boxShadow: "inset 0 3px 10px rgba(0,0,0,0.4)" }}
              >
                <span className="font-serif text-lg italic tracking-wide text-gold-300 sm:text-xl">
                  {initials}
                </span>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Tap hint — anchored to the gate so it never clips on short screens */}
      <motion.p
        animate={{ opacity: phase === "sealed" ? [0.45, 1, 0.45] : 0 }}
        transition={{
          duration: 2.6,
          repeat: phase === "sealed" ? Infinity : 0,
          delay: del(0.4),
        }}
        className="absolute inset-x-0 bottom-6 z-10 text-center text-[11px] uppercase tracking-[0.3em] text-ivory-300/75"
      >
        Tap the seal to open
      </motion.p>

      {/* Footnote once the card is out */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "ready" ? 1 : 0 }}
        transition={{ delay: del(2.5), duration: dur(0.6) }}
        className="absolute inset-x-0 bottom-7 z-10 text-center text-[11px] tracking-wide text-ivory-300/60"
      >
        Best experienced with sound on
      </motion.p>
    </motion.div>
  );
}
