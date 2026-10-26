"use client";

import { testimonials } from "@/data/content";
import { useReveal } from "@/components/ui/ScrollFX";

const TINTS = ["#f7dce4", "#e3dbf3", "#fbe3cf"];

/**
 * Guest words in soft arches — floating over card paper like the
 * blessing spread of an invitation.
 */
export default function TestimonialsSection() {
  useReveal();

  return (
    <section className="paper" style={{ paddingBlock: "clamp(60px,10vh,110px) clamp(40px,8vh,80px)" }} aria-label="Loved by families">
      <div className="wrap head-block">
        <h2 className="rv" style={{ fontSize: "clamp(2.2rem,7vw,4rem)" }}>
          Loved By Families
        </h2>
        <p className="small rv" style={{ "--d": ".06s" } as React.CSSProperties}>
          The nicest things couples &amp; parents have said after the big day.
        </p>
      </div>

      <div className="quote-arches">
        {testimonials.map((t, i) => (
          <figure
            key={t.name}
            className="arch rv"
            style={{ "--tint": TINTS[i % TINTS.length], "--d": `${i * 0.08}s` } as React.CSSProperties}
          >
            <div style={{ padding: "clamp(30px,4vw,40px) 24px 30px", position: "relative" }}>
              <p>&ldquo;{t.quote}&rdquo;</p>
              <figcaption className="who">
                {t.name} · {t.location}
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
