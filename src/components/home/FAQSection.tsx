"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { faqs } from "@/data/content";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-ivory-50">
      <div className="container-width">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about VivahaLink"
        />

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: i * 0.05 }}
              className="bg-white rounded-xl border border-gold-200/30 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-ivory-50/50 transition-colors duration-300 ease-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-600 focus-visible:ring-inset"
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
                    <p className="px-5 pb-5 text-sm text-temple-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
