"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/data/content";
import { useReveal } from "@/components/ui/ScrollFX";

/**
 * Questions answered on card paper — one engraved accordion, no clutter.
 */
export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  useReveal([open]);

  return (
    <section className="gthread gthread-plain" id="faq" aria-label="Frequently asked questions">
      <div className="wrap head-block">
        <h2 className="rv">
          Good Questions
        </h2>
        <p className="small rv" style={{ "--d": ".06s" } as React.CSSProperties}>
          Everything couples usually ask before they order.
        </p>
      </div>

      <div
        className="wrap"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 760,
          display: "grid",
          gap: 12,
          paddingBottom: "clamp(50px,9vh,90px)",
        }}
      >
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.question} className={`faq-item rv${isOpen ? " open" : ""}`} style={{ "--d": `${i * 0.03}s` } as React.CSSProperties}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
              >
                <span>{f.question}</span>
                <Plus size={18} className="kob" aria-hidden="true" />
              </button>
              {isOpen && (
                <p className="ans" id={`faq-answer-${i}`}>
                  {f.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
