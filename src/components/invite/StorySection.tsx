"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { InvitationData } from "@/lib/types";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Couple story + photo placeholder gallery.
 * Photos come from `invitation.photos` — currently elegant generated
 * SVG placeholders; real hosts supply their own photos at order time.
 */
export default function StorySection({ invitation }: { invitation: InvitationData }) {
  const photos = invitation.photos;

  return (
    <section id="story" className="relative section-padding bg-ivory-50 overflow-hidden">
      <div className="absolute inset-0 kolam-pattern opacity-30" />
      <div className="container-width relative">
        <SectionHeading
          title="Our Story"
          subtitle="A few little things worth knowing before the big day."
        />

        {invitation.story && (
          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="font-serif text-lg md:text-xl leading-relaxed text-temple-700 italic">
              {invitation.story}
            </p>
          </motion.blockquote>
        )}

        {photos.length > 0 && (
          <div
            className={`mt-12 grid gap-5 md:gap-8 ${
              photos.length === 1
                ? "max-w-md mx-auto"
                : photos.length === 2
                  ? "max-w-3xl mx-auto grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto"
            }`}
          >
            {photos.slice(0, 3).map((src, i) => (
              <motion.figure
                key={src}
                initial={{ opacity: 0, y: 28, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1.2 : 1.2 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ rotate: 0, scale: 1.02 }}
                className="rounded-2xl border-2 border-gold-500/50 bg-white p-2 shadow-lg shadow-maroon-800/10 cursor-pointer"
              >
                <Image
                  src={src}
                  alt={`${invitation.coupleName1} & ${invitation.coupleName2} — photo ${i + 1}`}
                  width={720}
                  height={540}
                  loading="lazy"
                  sizes="(min-width: 768px) 33vw, 92vw"
                  className="h-48 md:h-56 w-full rounded-xl object-cover"
                />
              </motion.figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
