"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, MessageCircle, Filter } from "lucide-react";
import { templates } from "@/data/templates";
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

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-maroon-900 to-maroon-800 relative overflow-hidden">
        <div className="absolute inset-0 kolam-pattern opacity-5" />
        <div className="container-width py-16 md:py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-ivory-100">
              Our Template Collection
            </h1>
            <p className="mt-4 text-ivory-300/80 text-lg max-w-xl mx-auto">
              Each template is a complete invitation experience — designed with Tamil cultural aesthetics and modern luxury.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
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
                    {/* Thumbnail area */}
                    <div className="relative h-52 md:h-60 overflow-hidden">
                      <Image
                        src={template.thumbnail}
                        alt={`${template.title} invitation template preview`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 mix-blend-multiply"
                        style={{
                          background: `linear-gradient(135deg, ${template.palette[0]?.hex}25, ${template.palette[1]?.hex}35, ${template.palette[2]?.hex}20)`,
                        }}
                      />
                      <div className="absolute inset-0 kolam-pattern-dense opacity-20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div
                            className="w-20 h-20 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg"
                            style={{
                              backgroundColor: template.palette[0]?.hex + "30",
                              borderColor: template.palette[0]?.hex + "50",
                              borderWidth: "1px",
                            }}
                          >
                            <span
                              className="font-serif text-3xl font-bold"
                              style={{ color: template.palette[0]?.hex }}
                            >
                              {template.title.split(" ").map((w) => w[0]).join("")}
                            </span>
                          </div>
                          <p className="font-serif text-lg font-semibold text-temple-800">
                            {template.title}
                          </p>
                        </div>
                      </div>

                      {/* Tier badge */}
                      <span
                        className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full border ${
                          tierColors[template.tier]
                        }`}
                      >
                        {template.tier}
                      </span>

                      {/* Category badge */}
                      <span className="absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded-full bg-white/80 text-temple-700 backdrop-blur-sm">
                        {template.category.charAt(0).toUpperCase() +
                          template.category.slice(1)}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 md:p-6 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-serif text-xl font-bold text-maroon-800">
                          {template.title}
                        </h3>
                        <span className="text-xl font-bold text-gold-700 whitespace-nowrap">
                          {formatPrice(template.price)}
                        </span>
                      </div>
                      <p className="text-sm text-temple-600 leading-relaxed mb-4">
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
                          className="flex-1 flex items-center justify-center gap-2 bg-maroon-800 text-ivory-100 py-3 rounded-xl text-sm font-medium hover:bg-maroon-700 transition-colors"
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
    </>
  );
}
