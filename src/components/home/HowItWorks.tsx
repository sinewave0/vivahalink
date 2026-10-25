"use client";

import { motion } from "framer-motion";
import { Layout, MessageCircle, Share2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { howItWorks } from "@/data/content";

const iconMap: Record<string, React.ReactNode> = {
  Layout: <Layout size={28} />,
  MessageCircle: <MessageCircle size={28} />,
  Share2: <Share2 size={28} />,
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding bg-ivory-50">
      <div className="container-width">
        <SectionHeading
          title="How It Works"
          subtitle="Three simple steps to your perfect digital invitation"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {howItWorks.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1], delay: i * 0.15 }}
              className="relative text-center group"
            >
              {/* Connector line (desktop only) */}
              {i < howItWorks.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-gold-400/50 to-transparent" />
              )}

              {/* Step number + icon */}
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-maroon-800 to-maroon-700 text-gold-400 mb-6 shadow-lg shadow-maroon-800/20 group-hover:shadow-xl group-hover:shadow-maroon-800/30 transition-shadow duration-500 ease-brand">
                {iconMap[step.icon]}
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold-500 text-maroon-900 text-xs font-bold flex items-center justify-center shadow-md">
                  {step.number}
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-maroon-800 mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-temple-600 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
