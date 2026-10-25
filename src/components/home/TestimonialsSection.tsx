"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/content";

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-maroon-900 relative overflow-hidden">
      <div className="absolute inset-0 kolam-pattern" />

      <div className="container-width relative">
        <SectionHeading
          title="Loved by Families"
          subtitle="Hear from couples who made their celebrations unforgettable"
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: i * 0.1 }}
              className="relative bg-maroon-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-maroon-700/30"
            >
              <Quote size={24} className="text-gold-500/40 mb-4" />
              <p className="text-ivory-200/90 text-sm leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center">
                  <span className="text-maroon-900 font-serif text-sm font-bold">
                    {t.name[0]}
                  </span>
                </div>
                <div>
                  <p className="text-ivory-100 font-medium text-sm">{t.name}</p>
                  <p className="text-ivory-400/60 text-xs">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
