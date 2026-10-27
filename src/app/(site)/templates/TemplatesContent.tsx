"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { templates } from "@/data/templates";
import { waLink, waMessages } from "@/lib/constants";
import TemplateCard from "@/components/ui/TemplateCard";
import { useReveal } from "@/components/ui/ScrollFX";

const categories = [
  { value: "all", label: "All designs" },
  { value: "wedding", label: "Weddings" },
  { value: "anniversary", label: "Anniversaries" },
  { value: "housewarming", label: "Housewarmings" },
] as const;

/**
 * The gallery — a sticky brass filter rail above a staggered grid of
 * editorial cards. Filtering re-runs the reveal observer for the new
 * cards so nothing arrives already faded.
 */
export default function TemplatesContent() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  useReveal([activeCategory]);

  const filtered =
    activeCategory === "all"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  return (
    <>
      <div className="filter-bar">
        <div className="wrap filter-inner" role="group" aria-label="Filter designs by celebration">
          {categories.map((cat) => {
            const count =
              cat.value === "all"
                ? templates.length
                : templates.filter((t) => t.category === cat.value).length;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActiveCategory(cat.value)}
                aria-pressed={activeCategory === cat.value}
                className="filter-btn"
              >
                {cat.label}
                <span className="tally">{String(count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>
      </div>

      <section className="gallery" aria-label="Invitation designs">
        <div className="wrap">
          <div className="gallery-grid">
            {filtered.map((template, i) => (
              <TemplateCard key={template.id} template={template} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="gallery-empty">
              Nothing here yet — more designs are on the loom. Ask us for a
              custom one and we&apos;ll draw it around your celebration.
            </p>
          )}

          <div className="gallery-note">
            <span>
              Showing {String(filtered.length).padStart(2, "0")} of{" "}
              {String(templates.length).padStart(2, "0")} · every design includes the
              countdown, maps, calendar and WhatsApp RSVP
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 22 }}>
              <a
                href={waLink(waMessages.inquiry())}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                <MessageCircle size={13} aria-hidden="true" />
                Ask a question
              </a>
              <Link href="/#how-it-works" className="text-link">
                How ordering works
                <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
