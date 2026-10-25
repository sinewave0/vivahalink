"use client";

import { motion } from "framer-motion";
import { CalendarPlus, MapPin, Navigation } from "lucide-react";
import type { InvitationData } from "@/lib/types";
import SectionHeading from "@/components/ui/SectionHeading";
import { formatDate, generateCalendarLink } from "@/lib/utils";

/**
 * Multi-event schedule as a vertical timeline with per-event
 * Google Maps directions and Add-to-Calendar actions.
 */
export default function CeremoniesSection({ invitation }: { invitation: InvitationData }) {
  const { ceremonies, coupleName1, coupleName2 } = invitation;

  return (
    <section id="events" className="section-padding bg-ivory-100/70">
      <div className="container-width">
        <SectionHeading
          title="The Celebrations"
          subtitle="Every ceremony, every venue — so you never miss a moment."
        />

        <div className="relative mx-auto max-w-2xl">
          {/* Timeline rail */}
          <div className="absolute left-[7px] top-4 bottom-4 w-px bg-gradient-to-b from-gold-500/70 via-gold-500/30 to-transparent md:left-[9px]" />

          <div className="space-y-6">
            {ceremonies.map((ceremony, i) => (
              <motion.article
                key={ceremony.name}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="relative pl-8 md:pl-10"
              >
                {/* Timeline knot */}
                <span className="absolute left-0 top-7 flex items-center justify-center md:left-0.5">
                  <span className="block h-3.5 w-3.5 rounded-full border-2 border-gold-600 bg-gold-400 shadow-[0_0_0_5px_rgba(229,192,42,0.25)] md:h-4 md:w-4" />
                </span>

                <div className="rounded-2xl border border-gold-200/40 bg-white p-5 md:p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-maroon-800/10">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-serif text-xl font-semibold text-maroon-800">
                      {ceremony.name}
                    </h3>
                    <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-medium text-gold-800 border border-gold-200/60">
                      {formatDate(ceremony.date)}
                    </span>
                  </div>

                  {ceremony.description && (
                    <p className="mt-1.5 text-sm text-temple-600 italic">{ceremony.description}</p>
                  )}

                  <div className="mt-4 grid gap-1.5 text-sm text-temple-700">
                    <p className="font-medium">
                      <span className="text-gold-700 mr-1.5">⏰</span>
                      {ceremony.time}
                    </p>
                    <p>
                      <MapPin size={13} className="mr-1.5 inline-block text-maroon-600" />
                      <span className="font-medium">{ceremony.venue}</span>
                      <span className="text-temple-500"> — {ceremony.address}</span>
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2.5">
                    <a
                      href={ceremony.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-maroon-800 px-4 py-2.5 text-xs font-medium text-ivory-100 transition-colors hover:bg-maroon-700"
                    >
                      <Navigation size={14} />
                      Get Directions
                    </a>
                    <a
                      href={generateCalendarLink({
                        title: `${coupleName1} & ${coupleName2} — ${ceremony.name}`,
                        date: ceremony.date,
                        time: ceremony.time,
                        venue: ceremony.venue,
                        address: ceremony.address,
                        description: ceremony.description,
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-gold-300/60 bg-gold-50/60 px-4 py-2.5 text-xs font-medium text-gold-800 transition-colors hover:bg-gold-100/80"
                    >
                      <CalendarPlus size={14} />
                      Add to Calendar
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
