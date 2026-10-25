"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, MessageCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCard from "@/components/ui/AnimatedCard";
import { templates } from "@/data/templates";
import { formatPrice } from "@/lib/utils";
import { waLink, waMessages } from "@/lib/constants";

const featured = templates.slice(0, 3);

const tierColors: Record<string, string> = {
  Basic: "bg-temple-100 text-temple-700",
  Premium: "bg-gold-100 text-gold-800",
  Luxury: "bg-maroon-100 text-maroon-800",
};

export default function FeaturedTemplates() {
  return (
    <section className="section-padding bg-ivory-100/50">
      <div className="container-width">
        <SectionHeading
          title="Crafted with Culture & Care"
          subtitle="Every template is designed to honour Tamil traditions while embracing modern elegance. Preview a few of our favourites."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featured.map((template, i) => (
            <AnimatedCard
              key={template.id}
              delay={i * 0.1}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gold-200/30 hover:shadow-xl hover:shadow-maroon-800/5 transition-all duration-300">
                <div className="relative h-48 md:h-56 overflow-hidden">
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
                      background: `linear-gradient(135deg, ${template.palette[0]?.hex}20, ${template.palette[1]?.hex}30, ${template.palette[2]?.hex}20)`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-ivory-50/25">
                    <div className="text-center">
                      <div
                        className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
                        style={{ backgroundColor: template.palette[0]?.hex + "30" }}
                      >
                        <span
                          className="font-serif text-2xl font-bold"
                          style={{ color: template.palette[0]?.hex }}
                        >
                          {template.title[0]}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-temple-600">
                        {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                      </p>
                    </div>
                  </div>
                  {/* Tier badge */}
                  <span
                    className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${
                      tierColors[template.tier]
                    }`}
                  >
                    {template.tier}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 md:p-6">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-serif text-xl font-bold text-maroon-800">
                      {template.title}
                    </h3>
                    <span className="text-lg font-bold text-gold-700 whitespace-nowrap">
                      {formatPrice(template.price)}
                    </span>
                  </div>
                  <p className="text-sm text-temple-600 leading-relaxed mb-4 line-clamp-2">
                    {template.description}
                  </p>

                  {/* Color palette preview */}
                  <div className="flex items-center gap-2 mb-5">
                    {template.palette.map((color) => (
                      <div
                        key={color.hex}
                        className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                    <span className="text-xs text-temple-500 ml-1">
                      {template.palette.map((c) => c.name).join(" · ")}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link
                      href={`/events/${template.demoSlug}`}
                      className="flex-1 flex items-center justify-center gap-2 bg-maroon-800 text-ivory-100 py-2.5 rounded-xl text-sm font-medium hover:bg-maroon-700 transition-colors"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </Link>
                    <a
                      href={waLink(waMessages.order(template.title))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-green-500 transition-colors"
                    >
                      <MessageCircle size={14} />
                      Order
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 text-maroon-700 font-medium border border-maroon-200 px-6 py-3 rounded-full hover:bg-maroon-50 transition-colors"
          >
            View All Templates
            <ExternalLink size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
