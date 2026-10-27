"use client";

import Image from "next/image";
import { howItWorks } from "@/data/content";
import { useReveal } from "@/components/ui/ScrollFX";

/**
 * How it works, told as a photographic split from the dusk pass:
 * a still of jasmine and gold jewellery beside the three steps,
 * numbered in engraved serif on ivory.
 */
export default function HowItWorks() {
  useReveal();

  return (
    <section className="howit-split" id="how-it-works" aria-label="How it works">
      <div className="howit-photo">
        <Image
          src="/images/atelier/jasmine.jpg"
          alt="Jasmine flowers and gold jewellery resting on silk"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>

      <div className="howit-panel">
        <p className="label rv">How it works</p>
        <ol className="howit-steps">
          {howItWorks.map((step, i) => (
            <li
              key={step.number}
              className="rv"
              style={{ "--d": `${0.06 + i * 0.08}s` } as React.CSSProperties}
            >
              <span className="howit-num" aria-hidden="true">
                {step.number}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="howit-note rv" style={{ "--d": ".3s" } as React.CSSProperties}>
          Guests get a dusk cover, a live countdown, maps, calendar, and an RSVP
          that lands in your chat. No app to install.
        </p>
      </div>
    </section>
  );
}
