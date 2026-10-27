"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import TemplateArt from "@/components/ui/TemplateArt";
import BrassLamp from "@/components/ui/BrassLamp";
import { templates } from "@/data/templates";
import { formatPrice } from "@/lib/utils";
import { waLink, waMessages } from "@/lib/constants";

const featured = templates.find((t) => t.slug === "rosewater-palace") ?? templates[0];

const LEDGER = [
  { n: "01", text: "One link for the whole celebration" },
  { n: "02", text: "Every ceremony, mapped" },
  { n: "03", text: "RSVP straight to WhatsApp" },
  { n: "04", text: "Live in 24–48 hours" },
];

/**
 * The night court — not a photograph with type laid on top of it.
 * The left leaf is ink and type, set like a printed cover. The right
 * leaf is the dusk plate, framed, with one hanging lamp and the
 * featured design pinned to it like a calling card.
 */
export default function HeroSection() {
  return (
    <section className="court" id="top" aria-label="VivahaLink — digital invitations">
      <div className="court-ink">
        <p className="court-kicker">
          <span>VivahaLink</span>
          <span>Chennai</span>
        </p>
        <p className="court-deva">॥ शुभ विवाह ॥</p>
        <h1>
          The first <em>heirloom</em>
          <br />
          of the wedding.
        </h1>
        <p className="court-lede">
          A living invitation for Indian weddings, anniversaries and
          housewarmings. The countdown, every ceremony, the route to each
          venue, and an RSVP that lands in the family chat.
        </p>

        <div className="court-actions">
          <Link href="/events/rosewater-palace-demo" className="btn light" target="_blank" rel="noopener">
            Open a sample
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <a
            href={waLink(waMessages.inquiry())}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link light"
          >
            Order on WhatsApp
          </a>
        </div>

        <ol className="court-ledger">
          {LEDGER.map((item) => (
            <li key={item.n}>
              <span>{item.n}</span>
              {item.text}
            </li>
          ))}
        </ol>
      </div>

      <div className="court-plate">
        <Image
          src="/images/atelier/dusk.jpg"
          alt="A temple courtyard at dusk, lit by lanterns"
          fill
          priority
          sizes="(min-width: 960px) 46vw, 100vw"
        />
        <div className="court-plate-veil" aria-hidden="true" />
        <BrassLamp className="lamp court-lamp" />
        <p className="court-caption">
          <span>Plate 01</span>
          Temple courtyard, dusk
        </p>

        <Link
          href={`/events/${featured.demoSlug}`}
          target="_blank"
          rel="noopener"
          className="court-card"
          aria-label={`Preview ${featured.title}`}
        >
          <span className="court-card-art">
            <TemplateArt template={featured} />
          </span>
          <span className="court-card-copy">
            <span className="court-card-kicker">In the collection</span>
            <span className="court-card-name">{featured.title}</span>
            <span className="court-card-meta">
              {featured.category} · {formatPrice(featured.price)}
            </span>
          </span>
          <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
