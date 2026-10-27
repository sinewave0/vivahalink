"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionIntro from "@/components/ui/SectionIntro";
import PhonePreview from "./PhonePreview";
import { useReveal } from "@/components/ui/ScrollFX";

const INSIDE = [
  {
    n: "01",
    title: "The opening",
    text: "A photographic cover with your names, your date, and one quiet invitation to step inside.",
  },
  {
    n: "02",
    title: "The days",
    text: "Every ceremony on its own card — the hour, the venue, the route, and a calendar link for the family group.",
  },
  {
    n: "03",
    title: "The answer",
    text: "Guests RSVP in two taps. The reply arrives in your WhatsApp, addressed and counted — no dashboard.",
  },
  {
    n: "04",
    title: "The keepsake",
    text: "Your story, a gallery, a countdown and a closing scene that guests can return to long after the last lamp is out.",
  },
];

/**
 * The product shown as an object: a dark gallery wall, an editorial
 * list of what lives inside, and a phone carrying the real invitation.
 */
export default function InsideInvitation() {
  useReveal();

  return (
    <section className="inside" id="inside" aria-label="Inside a VivahaLink invitation">
      <div className="wrap inside-grid">
        <div>
          <SectionIntro
            label="Inside the invitation"
            tone="light"
            title={
              <>
                One link. The whole <em>celebration</em>.
              </>
            }
            lead="What arrives is not a PDF and not a photograph of a card. It is a small, living website your guests can move through at their own pace."
          />

          <ol className="inside-list">
            {INSIDE.map((item, i) => (
              <li
                key={item.n}
                className="rv"
                style={{ "--d": `${0.05 + i * 0.06}s` } as React.CSSProperties}
              >
                <span className="n">{item.n}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="inside-foot">
            <Link
              href="/events/rosewater-palace-demo"
              target="_blank"
              rel="noopener"
              className="btn on-gold"
            >
              Step inside a sample
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
            <span className="label">No app · no login · every phone</span>
          </div>
        </div>

        <PhonePreview />
      </div>
    </section>
  );
}
