"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionIntro from "@/components/ui/SectionIntro";
import { howItWorks } from "@/data/content";
import { waLink, waMessages } from "@/lib/constants";
import { useReveal } from "@/components/ui/ScrollFX";

/**
 * How it works as a photographic spread: jasmine and gold on one side,
 * three quiet steps set on bone paper on the other.
 */
export default function HowItWorks() {
  useReveal();

  return (
    <section className="process" id="how-it-works" aria-label="How it works">
      <figure className="process-photo">
        <Image
          src="/images/atelier/jasmine.jpg"
          alt="Jasmine flowers and gold jewellery resting on silk"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <figcaption>
          The quiet hour before the muhurtham — kept, and handed on.
        </figcaption>
      </figure>

      <div className="process-panel">
        <SectionIntro
          label="How it works"
          title={
            <>
              From first message to first <em>guest</em>.
            </>
          }
          lead="Three unhurried steps. You never touch a design tool, and your guests never download a thing."
        />

        <ol className="process-steps">
          {howItWorks.map((step, i) => (
            <li
              key={step.number}
              className="rv"
              style={{ "--d": `${0.06 + i * 0.07}s` } as React.CSSProperties}
            >
              <span className="process-num" aria-hidden="true">
                0{step.number}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="process-cta">
          <a
            href={waLink(waMessages.inquiry())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn solid"
          >
            Start on WhatsApp
          </a>
          <span className="process-badge">Usually live in 24–48 hours</span>
        </div>

        <p style={{ marginTop: 28 }}>
          <Link href="/templates" className="text-link">
            See the collection <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
}
