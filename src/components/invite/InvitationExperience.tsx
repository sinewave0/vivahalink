"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Heart, Share2 } from "lucide-react";
import type { InvitationData, Template } from "@/lib/types";
import { GATE_LABELS } from "@/lib/constants";
import { getInvitationTheme } from "@/lib/invitation-theme";
import { formatDate } from "@/lib/utils";
import IntroGate from "./IntroGate";
import CountdownTimer from "./CountdownTimer";
import StorySection from "./StorySection";
import CeremoniesSection from "./CeremoniesSection";
import RSVPModal from "./RSVPModal";
import ShareMenu from "./ShareMenu";
import InvitationMusic from "./InvitationMusic";
import Ornament from "./Ornament";
import RosePetals from "./RosePetals";

interface InvitationExperienceProps {
  invitation: InvitationData;
  template: Template;
  /** Absolute URL of this invitation, used for sharing. */
  shareUrl: string;
}

/**
 * The complete invitation microsite: intro gate → hero with live
 * countdown → story & photos → ceremony timeline → RSVP via WhatsApp,
 * with floating music / share controls.
 */
export default function InvitationExperience({
  invitation,
  template,
  shareUrl,
}: InvitationExperienceProps) {
  const [gateOpen, setGateOpen] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const coupleNames = `${invitation.coupleName1} & ${invitation.coupleName2}`;
  const theme = getInvitationTheme(template);
  const { main, accent } = theme;

  return (
    <div className="relative min-h-screen bg-ivory-50">
      {/* Intro gate */}
      <AnimatePresence>
        {!gateOpen && (
          <IntroGate invitation={invitation} template={template} onOpen={() => setGateOpen(true)} />
        )}
      </AnimatePresence>

      {gateOpen && (
        <>
          {/* ── Hero ── */}
          <section
            className="relative flex min-h-[92dvh] flex-col items-center justify-center overflow-hidden text-center"
            style={{
              backgroundColor: main,
              ...(template.heroImage
                ? {
                    backgroundImage: `linear-gradient(180deg, ${template.heroTextTone === "dark" ? "rgba(255,247,241,.08)" : "rgba(29,10,25,.22)"} 0%, ${template.heroTextTone === "dark" ? "rgba(255,247,241,.46)" : "rgba(29,10,25,.68)"} 100%), url("${template.heroImage}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center 58%",
                  }
                : {}),
            }}
          >
            {!template.heroImage && <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/45" />}
            {!template.heroImage && <div className="absolute inset-0 kolam-pattern opacity-20" />}
            {/* floating rose petals */}
            <RosePetals count={12} colors={theme.petalColors} />
            {/* soft radial accent glow */}
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 50% 30%, ${accent}22 0%, transparent 55%)`,
              }}
            />

            <div className="relative z-10 mx-auto max-w-2xl px-6 py-16">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="text-[11px] sm:text-xs uppercase tracking-[0.4em]"
                style={{ color: template.heroTextTone === "dark" ? theme.ink : `${accent}cc` }}
              >
                {GATE_LABELS[template.category]}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.7 }}
                className={`mt-6 font-serif font-medium leading-[1.05] ${template.heroImage ? "text-5xl tracking-[0.04em] uppercase sm:text-6xl md:text-7xl" : "text-5xl sm:text-6xl md:text-7xl"}`}
                style={{ color: template.heroTextTone === "dark" ? theme.ink : theme.surface, textShadow: template.heroTextTone === "dark" ? "0 1px 18px rgba(255,248,242,.45)" : undefined }}
              >
                {invitation.coupleName1}{" "}
                <span className="mx-3 inline-block italic" style={{ color: accent }}>
                  &amp;
                </span>{" "}
                {invitation.coupleName2}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.75, duration: 0.6 }}
              >
                <p className="mt-6 text-sm md:text-base italic" style={{ color: template.heroTextTone === "dark" ? `${theme.ink}dd` : `${theme.surface}d9` }}>
                  {invitation.tagline}
                </p>
                <Ornament className="mt-8" tone={accent} />
                <p
                  className="mt-8 text-xs sm:text-sm uppercase tracking-[0.3em]"
                  style={{ color: template.heroTextTone === "dark" ? `${theme.ink}e6` : `${theme.surface}e6` }}
                >
                  {formatDate(invitation.weddingDate)}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.7 }}
                className="mt-10"
              >
                <CountdownTimer
                  targetDate={invitation.weddingDate}
                  accent={accent}
                  panel={theme.main}
                  lightText={theme.surface}
                />
              </motion.div>

              {(invitation.family1 || invitation.family2) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3, duration: 0.8 }}
                  className="mt-10 space-y-1"
                >
                  {invitation.family1 && (
                    <p className="text-xs" style={{ color: template.heroTextTone === "dark" ? `${theme.ink}c8` : `${theme.surface}b3` }}>{invitation.family1}</p>
                  )}
                  {invitation.family2 && (
                    <p className="text-xs" style={{ color: template.heroTextTone === "dark" ? `${theme.ink}c8` : `${theme.surface}b3` }}>{invitation.family2}</p>
                  )}
                </motion.div>
              )}
            </div>

            {/* Scroll cue */}
            <motion.a
              href="#story"
              aria-label="Scroll to read the story"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 transition-opacity hover:opacity-80"
              style={{ color: template.heroTextTone === "dark" ? `${theme.ink}b3` : `${theme.surface}b3` }}
            >
              <ChevronDown size={26} className="animate-bounce" />
            </motion.a>
          </section>

          {/* ── Story & photos ── */}
          <StorySection invitation={invitation} />

          {/* ── Ceremonies ── */}
          <CeremoniesSection invitation={invitation} />

          {/* ── RSVP band ── */}
          <section className="relative overflow-hidden" style={{ backgroundColor: main }}>
            <div className="absolute inset-0 kolam-pattern opacity-10" />
            <RosePetals count={8} colors={theme.petalColors} />
            <div className="container-width relative py-16 md:py-20 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Ornament tone={accent} />
                <h2 className="mt-5 font-serif text-3xl md:text-4xl" style={{ color: theme.surface }}>
                  {template.category === "housewarming"
                    ? "Come bless the new beginning"
                    : "We would love to celebrate with you"}
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm" style={{ color: `${theme.surface}cc` }}>
                  Let {coupleNames} know you&apos;re coming — responses go straight to their
                  WhatsApp.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setRsvpOpen(true)}
                  className="mt-8 inline-flex items-center gap-2.5 rounded-full px-9 py-4 text-sm font-semibold shadow-lg"
                  style={{ backgroundColor: accent, color: "#3a0617" }}
                >
                  RSVP Now
                </motion.button>
              </motion.div>
            </div>
          </section>

          {/* ── Credit footer ── */}
          <footer className="py-8 text-center" style={{ backgroundColor: theme.ink }}>
            <p className="flex items-center justify-center gap-1.5 text-xs" style={{ color: `${theme.surface}99` }}>
              Made with <Heart size={12} className="fill-current" style={{ color: accent }} /> for{" "}
              {coupleNames}
            </p>
            <Link
              href="/"
              className="mt-2 inline-flex items-center gap-1.5 text-xs transition-opacity hover:opacity-80"
              style={{ color: `${accent}d9` }}
            >
              Crafted on <span className="font-serif font-semibold">VivahaLink</span> — make yours →
            </Link>
          </footer>

          {/* ── Floating action rail ── */}
          <div className="fixed bottom-5 right-4 z-40 flex flex-col items-center gap-3 sm:gap-3.5">
            <InvitationMusic
              invitation={invitation}
              accent={accent}
              main={main}
              surface={theme.surface}
            />
            <div className="relative">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShareOpen(true)}
                aria-label="Share invitation"
                title="Share"
                className="flex h-12 w-12 items-center justify-center rounded-full border bg-white/90 shadow-lg backdrop-blur transition-opacity hover:opacity-100"
                style={{ borderColor: `${accent}80`, color: theme.ink }}
              >
                <Share2 size={18} />
              </motion.button>
            </div>
            <div className="flex flex-col items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setRsvpOpen(true)}
                className="rounded-full px-5 py-3 text-xs font-semibold shadow-lg sm:text-sm"
                style={{ backgroundColor: accent, color: "#3a0617" }}
              >
                RSVP <span className="ml-0.5 hidden sm:inline font-normal">on WhatsApp</span>
              </motion.button>
            </div>
          </div>

          {/* ── Modals ── */}
          <RSVPModal open={rsvpOpen} onClose={() => setRsvpOpen(false)} invitation={invitation} />
          <ShareMenu open={shareOpen} onClose={() => setShareOpen(false)} shareUrl={shareUrl} title={coupleNames} />
        </>
      )}
    </div>
  );
}
