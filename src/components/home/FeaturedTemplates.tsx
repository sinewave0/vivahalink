"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { templates } from "@/data/templates";
import { formatPrice } from "@/lib/utils";

const featured = templates.slice(0, 3);

export default function FeaturedTemplates() {
  return (
    <section className="overflow-hidden bg-[#f7f2ff] py-20 md:py-28">
      <div className="container-width">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-[#a25a87]">Fresh from the studio</p>
            <h2 className="font-serif text-4xl font-semibold leading-none tracking-[-.04em] text-[#2d2448] md:text-6xl">Pick a mood.<br />Make it yours.</h2>
          </div>
          <Link href="/templates" className="inline-flex items-center gap-2 self-start rounded-full border border-[#2d2448]/15 bg-white px-5 py-3 text-sm font-bold text-[#2d2448] transition-colors hover:bg-[#2d2448] hover:text-white md:self-auto">See all designs <ArrowRight size={16} /></Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3 md:gap-7">
          {featured.map((template, i) => (
            <motion.div key={template.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group">
              <Link href={`/events/${template.demoSlug}`} className="block overflow-hidden rounded-[1.75rem] bg-white p-3 shadow-[0_14px_35px_rgba(73,54,92,.10)] transition-transform duration-300 hover:-translate-y-2">
                <div className="relative aspect-[4/4.6] overflow-hidden rounded-[1.2rem]" style={{ backgroundColor: template.palette[2]?.hex }}>
                  <Image src={template.thumbnail} alt={`${template.title} digital invitation`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#54475f]">{template.category}</span>
                </div>
                <div className="flex items-start justify-between gap-3 px-2 pb-2 pt-5"><div><h3 className="font-serif text-2xl font-semibold text-[#2d2448]">{template.title}</h3><p className="mt-1 text-sm text-[#766d7e]">{template.tier} website invite</p></div><span className="rounded-full bg-[#fff0b7] px-3 py-1.5 text-sm font-bold text-[#665228]">{formatPrice(template.price)}</span></div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
