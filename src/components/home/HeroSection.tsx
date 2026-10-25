"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, MessageCircle, Smartphone, Sparkles } from "lucide-react";
import { waLink, waMessages } from "@/lib/constants";
import RosePetals from "@/components/invite/RosePetals";

const trustChips = [
  {
    icon: MessageCircle,
    label: "Ordered & customised on WhatsApp",
  },
  {
    icon: BadgeCheck,
    label: "One-time payment · unlimited guests",
  },
  {
    icon: Smartphone,
    label: "Opens on any phone — no app",
  },
] as const;

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-ivory-100">
      {/* Kolam texture + drifting petals */}
      <div className="absolute inset-0 kolam-pattern" />
      <RosePetals count={9} />

      <div className="container-width relative grid min-h-[640px] items-center gap-14 py-16 md:grid-cols-[1.05fr_.95fr] md:py-24 lg:min-h-[720px]">
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="relative z-10 max-w-2xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-100/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-maroon-800 shadow-sm">
            <Sparkles size={14} className="text-gold-700" />
            Invites that feel like you
          </div>

          <h1 className="text-balance font-serif text-[3.25rem] font-semibold leading-[.95] tracking-[-0.04em] text-maroon-950 sm:text-6xl md:text-7xl lg:text-[5.2rem]">
            Big love deserves a{" "}
            <span className="gold-shimmer">beautiful</span> hello.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-temple-600 md:text-xl">
            Personalised digital invitation websites for weddings, anniversaries
            and housewarmings — your story, schedules, maps, RSVP and music in
            one elegant link.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/templates"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-maroon-800 px-7 py-4 text-sm font-bold text-ivory-100 shadow-lg shadow-maroon-800/25 transition-all duration-300 ease-brand hover:-translate-y-0.5 hover:bg-maroon-700 active:translate-y-0 active:scale-[0.98]"
            >
              Find your invitation <ArrowUpRight size={18} />
            </Link>
            <a
              href={waLink(waMessages.inquiry())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-gold-500/50 bg-white/70 px-7 py-4 text-sm font-semibold text-maroon-800 transition-colors duration-300 ease-brand hover:bg-gold-100/70 active:scale-[0.98]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-green-600">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order on WhatsApp
            </a>
          </div>

          <p className="mt-4 px-1 text-sm font-medium text-temple-500">
            Starting at ₹899 · one-time payment
          </p>

          {/* Trust chips — no fabricated stats, honest promises */}
          <div className="mt-10 flex flex-wrap gap-2.5">
            {trustChips.map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-2 rounded-full border border-gold-300/50 bg-white/80 px-3.5 py-2 text-xs font-medium text-temple-700 shadow-sm"
              >
                <chip.icon size={14} className="text-gold-700" />
                {chip.label}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: 3, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.32, 0.72, 0, 1] }}
          className="relative mx-auto w-full max-w-[530px]"
        >
          {/* Slow golden halo behind the frame */}
          <motion.div
            aria-hidden="true"
            className="absolute -inset-10 rounded-full border border-dashed border-gold-500/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute -inset-3 -rotate-3 rounded-[2.5rem] bg-white/60" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] border-8 border-white bg-ivory-300 shadow-[0_28px_65px_rgba(58,6,23,.25)]">
            <Image
              src="/images/hero/invitation-editorial.png"
              alt="A styled collection of original digital wedding invitation cards"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 768px) 45vw, 92vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-2xl bg-maroon-800 px-5 py-4 text-ivory-100 shadow-lg sm:-left-10">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gold-400/90">
              Made just for you
            </p>
            <p className="font-serif text-xl">Your story, in every detail</p>
          </div>
          <div className="absolute -right-4 top-12 rounded-full bg-gold-400 px-4 py-2 text-xs font-bold text-maroon-950 shadow-md">
            100% mobile friendly
          </div>
        </motion.div>
      </div>
    </section>
  );
}
