"use client";

import { useState } from "react";
import Link from "next/link";
import { templates } from "@/data/templates";
import { getInvitationTheme } from "@/lib/invitation-theme";
import { formatPrice } from "@/lib/utils";
import { waLink, waMessages } from "@/lib/constants";
import TemplateArt from "@/components/ui/TemplateArt";
import { useReveal } from "@/components/ui/ScrollFX";

const categories = [
  { value: "all", label: "All designs" },
  { value: "wedding", label: "Weddings" },
  { value: "anniversary", label: "Anniversaries" },
  { value: "housewarming", label: "Housewarmings" },
];

const TINTS = ["#f7dce4", "#fbe3cf", "#dfe8d6", "#e3dbf3", "#d9d3f1", "#f7d9de"];

/**
 * The collection — every design as an arch panel with its own palette,
 * hung in a grid. Filtering re-runs the reveal observer for new cards.
 */
export default function TemplatesContent() {
  const [activeCategory, setActiveCategory] = useState("all");
  useReveal([activeCategory]);

  const filtered =
    activeCategory === "all"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  return (
    <section className="gthread" style={{ paddingTop: "clamp(10px,2vh,24px)" }}>
      <div className="wrap head-block">
        <h2 className="rv" style={{ fontSize: "clamp(2rem,5.5vw,3.4rem)" }}>
          Pick the feeling
        </h2>
        <p className="small rv" style={{ "--d": ".06s" } as React.CSSProperties}>
          Each design is a complete little world — preview it live, then we make it yours.
        </p>

        <div
          className="rv"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 8,
            marginTop: 22,
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setActiveCategory(cat.value)}
              aria-pressed={activeCategory === cat.value}
              className={`chip${activeCategory === cat.value ? " active" : ""}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="wrap"
        style={{ position: "relative", zIndex: 2, paddingBottom: "clamp(50px,9vh,90px)" }}
      >
        <div
          style={{
            display: "grid",
            gap: "clamp(18px,3vw,30px)",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
            alignItems: "start",
          }}
        >
          {filtered.map((template, i) => {
            const theme = getInvitationTheme(template);
            return (
              <article
                key={template.id}
                className="arch"
                style={
                  {
                    "--tint": TINTS[i % TINTS.length],
                    "--aw": "100%",
                    "--d": `${(i % 3) * 0.06}s`,
                  } as React.CSSProperties
                }
              >
                <div className="arch-in" style={{ padding: "clamp(26px,4vw,34px) 22px 26px" }}>
                  <Link
                    href={`/events/${template.demoSlug}`}
                    target="_blank"
                    rel="noopener"
                    aria-label={`Preview the ${template.title} invitation`}
                    className="arch_media"
                  >
                    <TemplateArt template={template} />
                  </Link>

                  <h3 style={{ fontSize: "clamp(1.6rem,4vw,2rem)" }}>{template.title}</h3>
                  <p className="dd">
                    {template.category} · {template.tier}
                  </p>
                  <p className="tm">{formatPrice(template.price)}</p>

                  <p
                    className="vn"
                    style={{ marginTop: 10, marginBottom: 18, minHeight: "5.2em" }}
                  >
                    {template.description}
                  </p>

                  <div className="pdots" style={{ justifyContent: "center", marginBottom: 16 }}>
                    {template.palette.map((c) => (
                      <span
                        key={c.hex}
                        title={c.name}
                        style={{ backgroundColor: c.hex, borderColor: theme.surface }}
                      />
                    ))}
                  </div>

                  <div className="btns">
                    <Link
                      href={`/events/${template.demoSlug}`}
                      target="_blank"
                      rel="noopener"
                      className="btn solid"
                    >
                      Live preview
                    </Link>
                    <a
                      href={waLink(waMessages.order(template.title))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn"
                    >
                      Order
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="small" style={{ textAlign: "center", paddingBlock: 40 }}>
            Nothing here yet — more designs are on the loom. Ask us for a custom one.
          </p>
        )}

        <p
          className="small"
          style={{ textAlign: "center", marginTop: "clamp(30px,5vh,50px)", color: "var(--ink-soft)" }}
        >
          Every design includes countdown, maps, calendar &amp; WhatsApp RSVP.
        </p>
      </div>
    </section>
  );
}
