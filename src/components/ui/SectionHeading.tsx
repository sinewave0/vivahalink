"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mb-10 md:mb-14 ${centered ? "text-center" : ""}`}
    >
      <h2
        className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold ${
          light ? "text-ivory-100" : "text-maroon-800"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-base md:text-lg max-w-2xl ${centered ? "mx-auto" : ""} ${
            light ? "text-ivory-300/80" : "text-temple-600"
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-0.5 w-16 rounded-full ${centered ? "mx-auto" : ""} ${
          light ? "bg-gold-500" : "bg-gold-500"
        }`}
      />
    </motion.div>
  );
}
