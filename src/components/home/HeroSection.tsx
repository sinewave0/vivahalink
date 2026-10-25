"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Play, Sparkles } from "lucide-react";
import { waLink, waMessages } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f7f3ec] pt-16">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_35%,#eadfcf_0%,transparent_42%)]" />
      <div aria-hidden="true" className="absolute -left-40 top-20 h-[32rem] w-[32rem] rounded-full border border-[#d8c8b3]/40" />
      <div className="container-width relative grid min-h-[680px] items-center gap-14 py-16 md:grid-cols-[.92fr_1.08fr] md:py-20 lg:min-h-[760px]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} className="relative z-10 max-w-xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d8c7ae] bg-white/70 px-4 py-2 text-[11px] font-semibold uppercase tracking-[.18em] text-[#806543]">
            <Sparkles size={13} /> The invitation, reimagined
          </div>
          <h1 className="font-serif text-[3.4rem] font-medium leading-[.98] tracking-[-.055em] text-[#29221f] sm:text-6xl lg:text-[5.2rem]">
            A first glimpse<br />of your <em className="font-normal text-[#986b49]">forever.</em>
          </h1>
          <p className="mt-7 max-w-lg text-base leading-7 text-[#70665e] md:text-lg md:leading-8">
            A living invitation for the day you’ll remember forever. Made with the soul of South Indian celebrations and the ease of one beautiful link.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/templates" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#39251f] px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#50362b]">
              Explore the collection <ArrowUpRight size={17} />
            </Link>
            <a href={waLink(waMessages.inquiry())} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#cfc0ae] bg-white/60 px-7 py-4 text-sm font-semibold text-[#39251f] transition hover:bg-white">
              Create yours
            </a>
          </div>
          <div className="mt-5 text-sm text-[#82776d]">Bespoke from <span className="font-semibold text-[#39251f]">₹1,499</span> · one-time, no subscriptions</div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#d9cec0] pt-6 text-xs font-medium tracking-wide text-[#6f645a]">
            {["A link guests love opening", "Personalised in 48 hours", "Made for every screen"].map((item) => <span key={item} className="inline-flex items-center gap-2"><Check size={14} className="text-[#98744f]" />{item}</span>)}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: .96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .9, delay: .1 }} className="relative mx-auto w-full max-w-[620px]">
          <div className="absolute -inset-5 rotate-2 rounded-[2rem] border border-white/80 bg-white/25 shadow-[0_30px_80px_rgba(65,42,30,.12)]" />
          <div className="relative aspect-[1.04/1] overflow-hidden rounded-[1.65rem] bg-[#e9daca] shadow-[0_32px_80px_rgba(65,42,30,.2)]">
            <Image src="/images/hero/invitation-editorial.png" alt="A suite of bespoke South Indian wedding invitations in warm silk, floral and gold details" fill priority sizes="(min-width: 768px) 52vw, 100vw" className="object-cover transition-transform duration-[1400ms] hover:scale-[1.035]" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#211610]/65 via-[#211610]/10 to-transparent p-6 pt-28 text-white sm:p-8 sm:pt-36">
              <div className="flex items-end justify-between gap-4">
                <div><div className="text-[10px] uppercase tracking-[.22em] text-white/75">A celebration by VivahaLink</div><div className="mt-1 font-serif text-2xl sm:text-3xl">Ananya & Arjun</div></div>
                <Link href="/events/jasmine-garland-demo" aria-label="Preview the invitation" className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/50 bg-white/20 backdrop-blur-md transition hover:bg-white/35"><Play size={17} fill="currentColor" /></Link>
              </div>
            </div>
          </div>
          <div className="absolute -left-5 top-10 hidden rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-xl backdrop-blur-md sm:block">
            <div className="font-serif text-lg text-[#39251f]">One lovely link</div><div className="text-[11px] text-[#85786c]">Story · schedule · RSVP</div>
          </div>
          <div className="absolute -right-4 bottom-24 hidden rounded-2xl bg-[#39251f] px-4 py-3 text-white shadow-xl sm:block">
            <div className="text-[10px] uppercase tracking-[.16em] text-[#d9bd91]">Thoughtfully made</div><div className="mt-0.5 font-serif text-lg">Just for your day</div>
          </div>
        </motion.div>
      </div>
      <div className="relative border-y border-[#dfd4c6] bg-[#f2ece3]">
        <div className="container-width flex flex-wrap items-center justify-center gap-x-10 gap-y-2 py-4 text-[10px] font-semibold uppercase tracking-[.2em] text-[#817467] sm:justify-between">
          <span>Wedding websites</span><span className="hidden text-[#b9a68f] sm:inline">✳</span><span>Digital invitations</span><span className="hidden text-[#b9a68f] sm:inline">✳</span><span>Made for your people</span><span className="hidden text-[#b9a68f] sm:inline">✳</span><span>From Tamil Nadu, with love</span>
        </div>
      </div>
    </section>
  );
}
