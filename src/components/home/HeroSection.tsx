"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-ivory-50">
      {/* Subtle kolam background pattern */}
      <div className="absolute inset-0 kolam-pattern opacity-40" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ivory-50 via-transparent to-ivory-100" />

      <div className="relative container-width section-padding">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-maroon-800/5 border border-maroon-200/50 rounded-full px-4 py-1.5 mb-8"
          >
            <Sparkles size={14} className="text-gold-600" />
            <span className="text-xs font-medium text-maroon-700 tracking-wide uppercase">
              Digital Invitations for Tamil Celebrations
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-maroon-800 leading-[1.1] tracking-tight"
          >
            Your Wedding Invitation,{" "}
            <span className="gold-shimmer">Reimagined</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg md:text-xl text-temple-600 max-w-2xl mx-auto leading-relaxed"
          >
            Beautiful, culturally rich invitation websites for Tamil weddings and celebrations. 
            Not just a card — the first experience of your wedding.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/templates"
              className="group flex items-center gap-2 bg-maroon-800 text-ivory-100 px-8 py-4 rounded-full text-base font-semibold hover:bg-maroon-700 transition-all shadow-xl shadow-maroon-800/20 hover:shadow-maroon-800/30"
            >
              Explore Templates
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 text-maroon-700 px-8 py-4 rounded-full text-base font-medium border border-maroon-200 hover:bg-maroon-50 transition-colors"
            >
              How It Works
            </a>
          </motion.div>

          {/* Trust signal */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 text-sm text-temple-500"
          >
            Trusted by 500+ Tamil families across India and the diaspora
          </motion.p>
        </div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-gold-400 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-maroon-400 blur-3xl"
        />
      </div>
    </section>
  );
}
