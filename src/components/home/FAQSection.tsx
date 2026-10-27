"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import SectionIntro from "@/components/ui/SectionIntro";
import { faqs } from "@/data/content";
import { waLink, waMessages } from "@/lib/constants";
import { useReveal } from "@/components/ui/ScrollFX";

/**
 * Good questions, answered beside a sticky note to us. The plus is drawn
 * in hairlines; the answer opens with a CSS grid transition, so it never
 * jumps or clips mid-way.
 */
export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  useReveal([open]);

  return (
    <section className="faq-section" id="faq" aria-label="Frequently asked questions">
      <div className="wrap faq-grid">
        <div className="faq-aside">
          <SectionIntro
            label="Good questions"
            title={
              <>
                Before you <em>begin</em>.
              </>
            }
            lead="If yours is not here, one message gets a real answer from a person — usually within the hour."
          />
          <a
            href={waLink(waMessages.inquiry())}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Ask us on WhatsApp
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>

        <div className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.question}
                className={`faq-row rv${isOpen ? " is-open" : ""}`}
                style={{ "--d": `${i * 0.025}s` } as React.CSSProperties}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span className="idx" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="q">{f.question}</span>
                    <span className="faq-sign" aria-hidden="true" />
                  </button>
                </h3>
                <div className="faq-panel" id={`faq-answer-${i}`} role="region">
                  <div>
                    <p>{f.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
