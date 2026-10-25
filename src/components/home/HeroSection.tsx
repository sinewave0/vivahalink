"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#fff8e7] pt-8 sm:pt-12">
      <div className="absolute -left-16 top-20 h-56 w-56 rounded-full bg-[#f8c5d7] blur-3xl opacity-60" />
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#f7de7f] blur-3xl opacity-50" />
      <div className="container-width relative grid min-h-[650px] items-center gap-8 py-16 md:grid-cols-[1.05fr_.95fr] md:py-20 lg:min-h-[730px]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="relative z-10 max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2d2448]/10 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#5c315f] shadow-sm"><Sparkles size={14} className="text-[#d66d91]" />Invites that feel like you</div>
          <h1 className="font-serif text-[3.25rem] font-semibold leading-[.93] tracking-[-0.055em] text-[#2d2448] sm:text-6xl md:text-7xl lg:text-[5.6rem]">Big love deserves a <span className="text-[#c95c82]">beautiful</span> hello.</h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#625a70] md:text-xl">Personalised digital invitations for the whole celebration — made with heart, delivered as a link, and completely yours.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"><Link href="/templates" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2d2448] px-7 py-4 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-[#44365f]">Find your invitation <ArrowUpRight size={18} /></Link><span className="px-2 text-sm font-medium text-[#766d7e]">Starting at ₹999 · made for sharing</span></div>
          <div className="mt-12 flex items-center gap-5 text-sm text-[#625a70]"><div className="flex -space-x-2">{["#f3a4ba", "#7a9f83", "#f2c56f", "#a7a0d9"].map((color) => <span key={color} className="h-8 w-8 rounded-full border-2 border-[#fff8e7]" style={{ backgroundColor: color }} />)}</div><span><b className="text-[#2d2448]">1,200+</b> celebrations brought to life</span></div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.94, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, delay: 0.12 }} className="relative mx-auto w-full max-w-[530px]">
          <div className="absolute -inset-3 rounded-[2.5rem] bg-white/55 -rotate-3" /><div className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] border-8 border-white bg-[#f5e0bc] shadow-[0_28px_65px_rgba(84,58,87,.22)]"><Image src="/images/hero/invitation-editorial.png" alt="A styled collection of original digital wedding invitation cards" fill priority sizes="(min-width: 768px) 45vw, 92vw" className="object-cover" /></div>
          <div className="absolute -bottom-5 -left-5 rounded-2xl bg-[#c95c82] px-5 py-4 text-white shadow-lg sm:-left-10"><p className="text-[11px] font-semibold uppercase tracking-wider text-white/75">Made just for you</p><p className="font-serif text-xl">Your story, in every detail</p></div><div className="absolute -right-4 top-12 rounded-full bg-[#f6db72] px-4 py-2 text-xs font-bold text-[#40364e] shadow-md">100% mobile friendly</div>
        </motion.div>
      </div>
    </section>
  );
}
