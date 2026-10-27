"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import SectionIntro from "@/components/ui/SectionIntro";
import TemplateCard from "@/components/ui/TemplateCard";
import { templates } from "@/data/templates";
import { waLink, waMessages } from "@/lib/constants";
import { useReveal } from "@/components/ui/ScrollFX";

const feature = templates.find((t) => t.slug === "jasmine-garland") ?? templates[0];
const companions = [
  templates.find((t) => t.slug === "rosewater-palace") ?? templates[1],
  templates.find((t) => t.slug === "mangala-isai") ?? templates[2],
];

/**
 * The editorial heart of the storefront: a manifesto set between two
 * photographs, then the collection as one featured design, two
 * companions, and an invitation to commission something of your own.
 */
export default function FeaturedTemplates() {
  useReveal();

  return (
    <>
      <section className="manifesto" id="atelier" aria-label="The VivahaLink studio">
        <div className="wrap manifesto-grid">
          <div className="manifesto-copy">
            <span className="deva">॥ शुभ विवाह ॥</span>
            <SectionIntro
              label="The atelier"
              title={
                <>
                  Not a card. A place where the celebration{" "}
                  <em>begins</em>.
                </>
              }
              lead="VivahaLink is a small studio making invitation websites for Indian weddings and the families who gather for them. Every design is set by hand — the type, the colour, the way the page opens — so the first thing your guests receive already feels like the wedding."
            />
            <p className="manifesto-sign">Designed in Chennai · opened around the world</p>
          </div>

          <div className="manifesto-art" aria-hidden="true">
            <figure className="manifesto-photo a rv">
              <Image
                src="/images/atelier/jasmine.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 38vw, 80vw"
              />
            </figure>
            <figure
              className="manifesto-photo b rv"
              style={{ "--d": ".12s" } as React.CSSProperties}
            >
              <Image
                src="/images/atelier/mandap.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 26vw, 56vw"
              />
            </figure>
            <div className="manifesto-badge rv" style={{ "--d": ".2s" } as React.CSSProperties}>
              <b>24–48</b>
              <span>Hours from your details to a live link</span>
            </div>
          </div>
        </div>
      </section>

      <section className="collection" id="collection" aria-label="Featured designs">
        <div className="wrap">
          <div className="collection-head">
            <SectionIntro
              label="The collection"
              title={
                <>
                  Three ways to <em>begin</em>.
                </>
              }
              lead="Each design is a complete world — a cover, a countdown, every ceremony, maps, a story, and an RSVP that arrives in your chat."
            />
            <Link href="/templates" className="text-link">
              All {templates.length} designs <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </div>

          <div className="collection-grid">
            <TemplateCard template={feature} feature badge="Most loved" />
            {companions.map((template, i) => (
              <TemplateCard key={template.id} template={template} index={i + 1} />
            ))}

            <aside className="collection-note rv" style={{ "--d": ".1s" } as React.CSSProperties}>
              <span className="label">Nothing quite it?</span>
              <h3>
                We&apos;ll draw one <em>around you</em>.
              </h3>
              <p>
                Tell us the colour of the mandap, the city, the grandmother whose
                taste must be honoured. We&apos;ll set a design from scratch.
              </p>
              <a
                href={waLink(waMessages.inquiry())}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link light"
              >
                <MessageCircle size={13} aria-hidden="true" />
                Start a custom
              </a>
            </aside>
          </div>

          <div className="collection-foot">
            <span>One-time pricing · unlimited guests · no app for your guests</span>
            <Link href="/templates" className="text-link">
              Compare the collection <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
