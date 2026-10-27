"use client";

import SectionIntro from "@/components/ui/SectionIntro";
import { testimonials } from "@/data/content";
import { useReveal } from "@/components/ui/ScrollFX";

const [main, ...rest] = testimonials;

/**
 * Guest voices — one large quotation carrying the section, two smaller
 * notes beneath it, and a single measured fact instead of a wall of
 * five-star badges.
 */
export default function TestimonialsSection() {
  useReveal();

  return (
    <section className="voices" id="voices" aria-label="Words from families">
      <div className="wrap voices-grid">
        <div>
          <SectionIntro
            label="In their words"
            title={
              <>
                What the <em>family</em> remembers.
              </>
            }
            lead="The couple sees the design. The parents see the countdown, the map and the RSVP. These are the notes that come back afterwards."
          />
          <div className="voices-stat rv">
            <b>48h</b>
            <span>From your details to a link you can send.</span>
          </div>
        </div>

        <div className="voices-list">
          <figure className="voice voice-main rv">
            <blockquote>&ldquo;{main.quote}&rdquo;</blockquote>
            <figcaption>
              <span className="voice-badge" aria-hidden="true">
                {main.name.charAt(0)}
              </span>
              {main.name} · {main.location}
            </figcaption>
          </figure>

          {rest.map((t, i) => (
            <figure
              key={t.name}
              className="voice rv"
              style={{ "--d": `${0.06 + i * 0.07}s` } as React.CSSProperties}
            >
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption>
                <span className="voice-badge" aria-hidden="true">
                  {t.name.charAt(0)}
                </span>
                {t.name} · {t.location}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
