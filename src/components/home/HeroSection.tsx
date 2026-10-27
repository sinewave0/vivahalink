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

const STRIP = [
  "One link for the whole celebration",
  "A live countdown",
  "Every ceremony, mapped",
  "RSVP straight to WhatsApp",
  "Delivered in 24–48 hours",
];

/**
 * The cover — a dusk courtyard, a magazine opening, two hanging lamps
 * and one promise. A featured design floats at the right on wide
 * screens; the running strip below turns the page.
 */
export default function HeroSection() {
  return (
    <>
      <section className="hero" id="top" aria-label="VivahaLink — digital invitations">
        <Image
          className="hero-img"
          src="/images/atelier/dusk.jpg"
          alt="A temple courtyard at dusk, lit by lanterns"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-veil" aria-hidden="true" />

        <BrassLamp
          className="lamp"
          style={{ top: 0, left: "7%", width: 54, animationDelay: "-1.4s" }}
        />
        <BrassLamp
          className="lamp"
          style={{ top: 0, left: "13%", width: 26, animationDelay: "0.8s", opacity: 0.6 }}
        />
        <BrassLamp
          className="lamp"
          style={{ top: 0, right: "4%", width: 34, animationDelay: "-3s", opacity: 0.75 }}
        />

        <div className="wrap hero-inner">
          <div className="hero-copy">
            <p className="hero-eyebrow">VivahaLink · Digital invitations</p>
            <h1>
              The first <em>heirloom</em> of the wedding.
            </h1>
            <p className="hero-lede">
              A living invitation for Indian weddings, anniversaries and
              housewarmings — the countdown, every ceremony, the route to each
              venue, and an RSVP that lands in the family chat. One link, set by
              hand.
            </p>

            <div className="hero-actions">
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

            <ul className="hero-meta">
              <li>Designed in Chennai</li>
              <li>Live in 24–48 hours</li>
              <li>From ₹1,499</li>
            </ul>
          </div>

          <Link
            href={`/events/${featured.demoSlug}`}
            target="_blank"
            rel="noopener"
            className="hero-feature"
            aria-label={`Preview ${featured.title}`}
          >
            <span className="hero-feature-top">
              <span className="hero-feature-art">
                <TemplateArt template={featured} />
              </span>
              <span className="hero-feature-text">
                <span className="hero-feature-kicker">New in the collection</span>
                <span className="hero-feature-name">{featured.title}</span>
                <span className="hero-feature-price">
                  {featured.category} · {formatPrice(featured.price)}
                </span>
              </span>
            </span>
            <span className="hero-feature-link">
              Preview the invitation <ArrowUpRight size={13} aria-hidden="true" />
            </span>
          </Link>
        </div>

        <span className="hero-rail" aria-hidden="true">
          One link · every blessing
        </span>
      </section>

      <div className="strip" aria-hidden="true">
        <div className="strip-track">
          {[0, 1].map((group) => (
            <div className="strip-group" key={group}>
              {STRIP.map((item) => (
                <span className="strip-item" key={`${group}-${item}`}>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
