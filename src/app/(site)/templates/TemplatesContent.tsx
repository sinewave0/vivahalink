"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, MessageCircle, Filter } from "lucide-react";
import { templates } from "@/data/templates";
import { getInvitationTheme } from "@/lib/invitation-theme";
import { formatPrice } from "@/lib/utils";
import { waLink, waMessages } from "@/lib/constants";

const categories = [
  { value: "all", label: "All" },
  { value: "wedding", label: "Wedding" },
  { value: "anniversary", label: "Anniversary" },
  { value: "housewarming", label: "Housewarming" },
];

const tierColors: Record<string, string> = {
  Basic: "bg-temple-100 text-temple-700 border-temple-200",
  Premium: "bg-gold-100 text-gold-800 border-gold-200",
  Luxury: "bg-maroon-100 text-maroon-800 border-maroon-200",
};

export default function TemplatesContent() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  return (
    <section className="section-padding bg-ivory-50">
      <div className="container-width">
        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-2 mb-12 flex-wrap"
        >
          <Filter size={16} className="text-temple-500 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.value
                  ? "bg-maroon-800 text-ivory-100 shadow-lg shadow-maroon-800/20"
                  : "bg-white text-temple-700 border border-gold-200/50 hover:bg-ivory-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Template Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((template, i) => (
              (() => {
                const theme = getInvitationTheme(template);

                return (
                  <motion.div
                    key={template.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gold-200/30 hover:shadow-xl hover:shadow-maroon-800/5 transition-all duration-300 h-full flex flex-col">
                      {/* Keep the artwork unobstructed; its own colour story does the selling. */}
                      <div className="relative h-52 md:h-60 overflow-hidden">
                        <Image
                          src={template.thumbnail}
                          alt={`${template.title} invitation template preview`}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          loading={i === 0 ? "eager" : undefined}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div
                          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
                          style={{
                            background: `linear-gradient(to top, ${theme.main}20, transparent)`,
                          }}
                        />

                        {/* Tier badge */}
                        <span
                          className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full border ${
                            tierColors[template.tier]
                          }`}
                          style={
                            template.theme
                              ? {
                                  backgroundColor: `${theme.accent}e8`,
                                  borderColor: `${theme.accent}cc`,
                                  color: theme.ink,
                                }
                              : undefined
                          }
                        >
                          {template.tier}
                        </span>

                        {/* Category badge */}
                        <span className="absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded-full bg-white/85 text-temple-700 backdrop-blur-sm">
                          {template.category.charAt(0).toUpperCase() +
                            template.category.slice(1)}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-5 md:p-6 flex flex-col flex-1">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-serif text-xl font-bold" style={{ color: theme.ink }}>
                            {template.title}
                          </h3>
                          <span className="text-xl font-bold whitespace-nowrap" style={{ color: theme.accent }}>
                            {formatPrice(template.price)}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: theme.muted }}>
                          {template.description}
                        </p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {template.features.slice(0, 4).map((f) => (
                            <span
                              key={f}
                              className="text-xs bg-ivory-200/70 text-temple-700 px-2.5 py-1 rounded-full"
                            >
                              {f}
                            </span>
                          ))}
                          {template.features.length > 4 && (
                            <span className="text-xs text-temple-500 px-2 py-1">
                              +{template.features.length - 4} more
                            </span>
                          )}
                        </div>

                        {/* Color palette */}
                        <div className="flex items-center gap-2 mb-5">
                          {template.palette.map((color) => (
                            <div
                              key={color.hex}
                              className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: color.hex }}
                              title={color.name}
                            />
                          ))}
                        </div>

                        {/* Actions — pushed to bottom */}
                        <div className="flex gap-3 mt-auto">
                          <Link
                            href={`/events/${template.demoSlug}`}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-opacity hover:opacity-90"
                            style={{ backgroundColor: theme.main, color: theme.surface }}
                          >
                            <ExternalLink size={14} />
                            Live Demo
                          </Link>
                          <a
                            href={waLink(waMessages.order(template.title))}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-green-500 transition-colors"
                          >
                            <MessageCircle size={14} />
                            Order
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-temple-500 py-12"
          >
            No templates found in this category. More designs coming soon!
          </motion.p>
        )}
      </div>
    </section>
  );
}
