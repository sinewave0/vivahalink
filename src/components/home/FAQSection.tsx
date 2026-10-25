"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { faqs } from "@/data/content";

/**
 * Two side-by-side columns of inline-disclosure rows (the pattern the
 * redesign skill recommends over the stack-of-chevrons accordion).
 * Each column animates independently, so opening one answer never
 * shifts the other column.
 */
export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const columns = [faqs.filter((_, i) => i % 2 === 0), faqs.filter((_, i) => i % 2 === 1)];

  return (
    <section className="section-padding bg-ivory-50">
      <div className="container-width">
        <SectionHeading
          title="Frequently asked questions"
          subtitle="Everything you need to know about VivahaLink"
        />

        <div className="mx-auto grid max-w-4xl gap-x-16 md:grid-cols-2">
          {columns.map((column, col) => (
            <div key={col}>
              {column.map((faq, idx) => {
                const i = col * 2 + idx; // stable id matching the original faqs order

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: idx * 0.05 }}
                    className="border-b border-gold-200/40"
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      aria-expanded={openIndex === i}
                      aria-controls={`faq-answer-${i}`}
                      id={`faq-question-${i}`}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold-600"
                    >
                      <span className="font-medium text-maroon-800 text-sm md:text-base">
                        {faq.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-temple-500 flex-shrink-0 transition-transform duration-300 ease-brand ${
                          openIndex === i ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {openIndex === i && (
                        <motion.div
                          id={`faq-answer-${i}`}
                          role="region"
                          aria-labelledby={`faq-question-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-5 text-sm text-temple-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
