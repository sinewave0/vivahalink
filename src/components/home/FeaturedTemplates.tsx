"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { templates } from "@/data/templates";
import { getInvitationTheme } from "@/lib/invitation-theme";
import { formatPrice } from "@/lib/utils";

const featured = templates.slice(0, 3);

export default function FeaturedTemplates() {
  return (
    <section className="overflow-hidden bg-ivory-50 py-20 md:py-28">
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-gold-700">
              Fresh from the studio
            </p>
            <h2 className="text-balance font-serif text-4xl font-semibold leading-none tracking-[-.03em] text-maroon-900 md:text-6xl">
              Pick a mood.
              <br />
              Make it yours.
            </h2>
          </div>
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 self-start rounded-full border border-maroon-800/15 bg-white px-5 py-3 text-sm font-bold text-maroon-800 transition-all duration-300 ease-brand hover:bg-maroon-800 hover:text-ivory-100 active:scale-[0.98] md:self-auto"
          >
            See all designs <ArrowRight size={16} />
          </Link>
        </motion.div>
        <div className="mt-12 grid gap-5 md:grid-cols-3 md:gap-7">
          {featured.map((template, i) => {
            const theme = getInvitationTheme(template);

            return (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: i * 0.12 }}
                className="group"
              >
                <Link
                  href={`/events/${template.demoSlug}`}
                  className="block overflow-hidden rounded-3xl border border-gold-200/50 bg-white p-3 shadow-[0_14px_35px_rgba(58,6,23,.08)] transition-all duration-700 ease-brand hover:-translate-y-2 hover:shadow-[0_22px_45px_rgba(58,6,23,.14)] active:scale-[0.99]"
                >
                  <div
                    className="relative aspect-[4/4.6] overflow-hidden rounded-2xl"
                    style={{ backgroundColor: theme.surface }}
                  >
                    <Image
                      src={template.thumbnail}
                      alt={`${template.title} digital invitation`}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      loading={i === 0 ? "eager" : undefined}
                      className="object-cover transition-transform duration-700 ease-brand group-hover:scale-105"
                    />
                    <span
                      className="absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm"
                      style={{ backgroundColor: `${theme.main}e8`, color: theme.surface }}
                    >
                      {template.category}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-3 px-2 pb-2 pt-5">
                    <div>
                      <h3 className="font-serif text-2xl font-semibold" style={{ color: theme.ink }}>
                        {template.title}
                      </h3>
                      <p className="mt-1 text-sm" style={{ color: theme.muted }}>
                        {template.tier} website invite
                      </p>
                    </div>
                    <span
                      className="rounded-full px-3 py-1.5 text-sm font-bold"
                      style={{ backgroundColor: `${theme.accent}24`, color: theme.accent }}
                    >
                      {formatPrice(template.price)}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
