"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionIntro from "@/components/ui/SectionIntro";
import { waLink, waMessages, WHATSAPP_DISPLAY } from "@/lib/constants";
import { useReveal } from "@/components/ui/ScrollFX";

const values = [
  {
    title: "Rooted in tradition",
    text: "From bold colour stories to quiet, classic elegance, every design begins with your celebration — never a generic template.",
  },
  {
    title: "Crafted like couture",
    text: "Hand-tuned motion, engraved typography and a calm, premium feel. Your invitation should be the first gift of the wedding.",
  },
  {
    title: "Ordering without friction",
    text: "No accounts, no uploads, no design tools. Choose a design, send your details on WhatsApp, receive a link.",
  },
  {
    title: "Made for the diaspora",
    text: "A link works everywhere — Chennai, Singapore, London, Toronto. Directions, RSVP and calendars travel with it.",
  },
];

export default function AboutPage() {
  useReveal();

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="label">The studio · Chennai</p>
          <h1>
            Invitations made the <em>slow way</em>.
          </h1>
          <p className="lead">
            A small design studio for Indian celebrations — making one link
            that carries the first feeling of the wedding to every guest,
            wherever they are.
          </p>
          <div className="page-hero-meta">
            <span>Founded on a frustration</span>
            <span>Set by hand</span>
            <span>Sent across the world</span>
          </div>
        </div>
      </section>

      <section className="about-story" aria-label="Our story">
        <div className="wrap about-story-grid">
          <figure className="about-photo rv">
            <Image
              src="/images/atelier/jasmine.jpg"
              alt="Jasmine flowers and gold jewellery resting on silk"
              fill
              sizes="(min-width: 1024px) 42vw, 90vw"
            />
            <figcaption>The quiet hour · jasmine, gold, and a borrowed veil</figcaption>
          </figure>

          <div className="about-copy">
            <SectionIntro
              label="How we began"
              title={
                <>
                  A card is a promise. A link can <em>keep</em> it.
                </>
              }
            />
            <p style={{ marginTop: 24 }}>
              VivahaLink began with a simple frustration. Indian celebrations
              deserve invitations that carry the warmth of the occasion — yet
              most digital options were lifeless PDFs or print-shop scans with a
              thousand-watt gold filter.
            </p>
            <p>
              We thought: what if the invitation itself felt like an event? A
              link your family opens eagerly. A soft reveal, the couple&apos;s
              story, a countdown your grandmother actually taps, an RSVP that
              lands directly in your WhatsApp.
            </p>
            <blockquote className="about-quote">
              &ldquo;An invitation is the first gift of a wedding. It should
              feel like one.&rdquo;
            </blockquote>
            <p>
              That is VivahaLink. Every microsite is set by hand with a sense of
              place, colour and celebration — then delivered as a single
              beautiful link within 24–48 hours of receiving your details.
            </p>
            <p style={{ marginTop: 26 }}>
              <Link href="/templates" className="text-link">
                See what we make <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="principles" aria-label="What we care about">
        <div className="wrap">
          <SectionIntro
            label="What we hold to"
            title={
              <>
                Four quiet <em>promises</em>.
              </>
            }
            lead="The things that do not change from one celebration to the next."
          />

          <div className="principles-grid">
            {values.map((v, i) => (
              <article
                key={v.title}
                className="principle rv"
                style={{ "--d": `${i * 0.05}s` } as React.CSSProperties}
              >
                <span className="n" aria-hidden="true">
                  0{i + 1}
                </span>
                <div>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-band" aria-label="Contact the studio">
        <div className="wrap contact-grid">
          <div>
            <p className="label">The concierge</p>
            <h2>
              Tell us the date. We&apos;ll bring the <em>paper</em>.
            </h2>
            <p className="foot-note" style={{ color: "rgba(251,247,240,0.58)", maxWidth: "38ch", marginTop: 20, lineHeight: 1.7 }}>
              One WhatsApp message is all it takes. We answer as people, not a
              ticketing system.
            </p>
            <div className="contact-actions">
              <a
                href={waLink(waMessages.inquiry())}
                target="_blank"
                rel="noopener noreferrer"
                className="btn on-gold"
              >
                Chat on WhatsApp
              </a>
              <Link href="/templates" className="text-link light">
                See the collection <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <dl className="contact-details">
            <div className="contact-detail">
              <dt>WhatsApp</dt>
              <dd>
                <a
                  href={waLink(waMessages.inquiry())}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </dd>
            </div>
            <div className="contact-detail">
              <dt>Hours</dt>
              <dd>Monday–Sunday, 9am–9pm IST</dd>
            </div>
            <div className="contact-detail">
              <dt>Where</dt>
              <dd>Chennai, India — and families celebrating around the world</dd>
            </div>
            <div className="contact-detail">
              <dt>Reply</dt>
              <dd>Usually within the hour</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
