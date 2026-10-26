"use client";

import { Layout, MessageCircle, Share2 } from "lucide-react";
import { howItWorks } from "@/data/content";
import { useReveal } from "@/components/ui/ScrollFX";

const iconMap: Record<string, React.ReactNode> = {
  Layout: <Layout size={26} strokeWidth={1.4} />,
  MessageCircle: <MessageCircle size={26} strokeWidth={1.4} />,
  Share2: <Share2 size={26} strokeWidth={1.4} />,
};

const TINTS = ["#f7dce4", "#fbe3cf", "#e3dbf3"];

/**
 * Three steps, told as arch panels along the gold thread — the same
 * shape language as the invitation's ceremony cards.
 */
export default function HowItWorks() {
  useReveal();

  return (
    <section className="gthread gthread-plain" id="how-it-works" aria-label="How it works">
      <div className="wrap head-block">
        <h2 className="rv">
          How It Works
        </h2>
        <p className="small rv" style={{ "--d": ".06s" } as React.CSSProperties}>
          From &ldquo;we&apos;re getting married&rdquo; to a link your whole family loves — in a day or two.
        </p>
      </div>

      <div className="wrap" style={{ position: "relative", zIndex: 2, paddingBottom: "clamp(30px,6vh,60px)" }}>
        <div className="day">
          {howItWorks.map((step, i) => (
            <article
              key={step.number}
              className="panel"
              style={{ minHeight: 0, paddingBlock: "clamp(26px,5vh,48px)" }}
            >
              <div
                className="arch"
                style={{ "--tint": TINTS[i % TINTS.length] } as React.CSSProperties}
              >
                <div className="arch-in">
                  <div className="ic">{iconMap[step.icon]}</div>
                  <h3>{step.title}</h3>
                  <p className="dd">Step {String(step.number).padStart(2, "0")}</p>
                  <p className="vn" style={{ marginTop: 14 }}>{step.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
