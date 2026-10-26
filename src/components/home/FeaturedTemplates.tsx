"use client";

import Link from "next/link";
import TemplateArt from "@/components/ui/TemplateArt";
import { templates } from "@/data/templates";
import { formatPrice } from "@/lib/utils";
import { waLink, waMessages } from "@/lib/constants";
import { useReveal } from "@/components/ui/ScrollFX";

const featured = templates.slice(0, 3);
const TINTS = ["#f7dce4", "#fbe3cf", "#dfe8d6"];

/** Card-paper introduction, echoing the invitation's opening spread. */
function PaperIntro() {
  return (
    <section className="paper invocation" aria-label="What is VivahaLink">
      <div className="wrap">
        <svg className="mandala rv" viewBox="0 0 200 200" aria-hidden="true">
          <g className="spin" fill="none" stroke="currentColor" strokeWidth={1.1}>
            {Array.from({ length: 16 }, (_, i) => i * 22.5).map((a) => (
              <g key={a} transform={`rotate(${a} 100 100)`}>
                <ellipse cx={100} cy={34} rx={7} ry={20} />
                <circle cx={100} cy={10} r={2.2} fill="currentColor" stroke="none" />
              </g>
            ))}
          </g>
          <circle cx={100} cy={100} r={46} fill="none" stroke="currentColor" strokeWidth={1.2} />
          <circle cx={100} cy={100} r={40} fill="none" stroke="currentColor" strokeWidth={0.6} />
          <text
            x={100}
            y={120}
            textAnchor="middle"
            fontSize={54}
            fill="#a3242f"
            style={{ fontFamily: "var(--font-deva)" }}
          >
            शुभ
          </text>
        </svg>

        <p className="small rv" style={{ "--d": ".04s" } as React.CSSProperties}>
          With the blessings of family, tradition &amp; a little technology
        </p>
        <p className="hostline rv" style={{ "--d": ".08s" } as React.CSSProperties}>
          VivahaLink presents
        </p>
        <p className="small rv" style={{ "--d": ".1s" } as React.CSSProperties}>
          living digital invitations for
        </p>

        <div className="person rv" style={{ "--d": ".12s" } as React.CSSProperties}>
          <h2>Your Celebration</h2>
          <p className="rel">
            Every ceremony, map, countdown and RSVP — woven into one scroll your
            guests will actually want to open.
          </p>
        </div>
        <div className="amp rv" style={{ "--d": ".14s" } as React.CSSProperties}>
          &amp;
        </div>
        <div className="person rv" style={{ "--d": ".16s" } as React.CSSProperties}>
          <h2>Your People</h2>
          <p className="rel">
            No app to install, no login to forget. One link that opens
            beautifully on every phone, everywhere.
          </p>
        </div>

        <p className="small following rv" style={{ "--d": ".18s" } as React.CSSProperties}>
          Begin with a design from the collection
        </p>
      </div>
    </section>
  );
}

/** Featured templates presented as arch panels along a gold thread. */
export default function FeaturedTemplates() {
  useReveal();

  return (
    <>
      <PaperIntro />

      <section className="gthread" id="collection" aria-label="Featured templates">
        <div className="wrap head-block">
          <h2 className="rv">
            The Collection
          </h2>
          <p className="small rv" style={{ "--d": ".06s" } as React.CSSProperties}>
            Three of our most-loved designs — each one a complete little world.
          </p>
        </div>

        <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
          <div className="day" style={{ paddingBottom: "clamp(30px,6vh,60px)" }}>
            {featured.map((template, i) => {
              return (
                <article
                  key={template.id}
                  className="panel compact"
                  style={{ minHeight: 0, paddingBlock: "clamp(26px,5vh,48px)" }}
                >
                  <div
                    className="arch"
                    style={{ "--tint": TINTS[i % TINTS.length] } as React.CSSProperties}
                  >
                    <div className="arch-in">
                      <Link
                        href={`/events/${template.demoSlug}`}
                        aria-label={`Preview the ${template.title} invitation`}
                        className="arch_media"
                        style={{ display: "block" }}
                      >
                        <TemplateArt template={template} />
                      </Link>
                      <h3>{template.title}</h3>
                      <p className="dd">
                        {template.category} · {template.tier}
                      </p>
                      <p className="tm">{formatPrice(template.price)}</p>
                      <p className="vn">{template.description.split(".")[0]}.</p>
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
                          Order this design
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="btns" style={{ justifyContent: "center", paddingBottom: "clamp(20px,4vh,40px)" }}>
            <Link href="/templates" className="btn">
              See all {templates.length} designs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
