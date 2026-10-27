import type { Metadata } from "next";
import Link from "next/link";
import TemplatesContent from "./TemplatesContent";
import { templates } from "@/data/templates";
import { waLink, waMessages } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Templates & Pricing",
  description:
    "Browse VivahaLink's invitation microsite templates for Indian weddings, anniversaries and housewarmings — one-time pricing, live demos, and ordering over WhatsApp.",
  alternates: { canonical: "/templates" },
};

export default function TemplatesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="label">The collection · {templates.length} designs</p>
          <h1>
            Find the feeling. We&apos;ll <em>make it yours</em>.
          </h1>
          <p className="lead">
            Every design is a complete invitation website — not a picture of a
            card. Open any one live, then send us the names, dates and places;
            we set the rest by hand.
          </p>
          <div className="page-hero-meta">
            <span>One-time pricing</span>
            <span>Unlimited guests</span>
            <span>Live in 24–48 hours</span>
          </div>
          <p style={{ marginTop: 30 }}>
            <a
              href={waLink(waMessages.inquiry())}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Not sure which? Ask the studio
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </p>
        </div>
      </section>

      <TemplatesContent />

      <section className="contact-band" aria-label="Commission a design">
        <div className="wrap contact-grid">
          <div>
            <p className="label">A design of your own</p>
            <h2>
              Nothing here fits? We&apos;ll draw it <em>from scratch</em>.
            </h2>
            <div className="contact-actions">
              <a
                href={waLink(waMessages.inquiry())}
                target="_blank"
                rel="noopener noreferrer"
                className="btn on-gold"
              >
                Start a custom design
              </a>
              <Link href="/about" className="text-link light">
                Meet the studio <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <dl className="contact-details">
            <div className="contact-detail">
              <dt>Made in</dt>
              <dd>Chennai, India — for celebrations anywhere</dd>
            </div>
            <div className="contact-detail">
              <dt>Turnaround</dt>
              <dd>24–48 hours from the final details</dd>
            </div>
            <div className="contact-detail">
              <dt>Includes</dt>
              <dd>Countdown, ceremonies, maps, calendar, RSVP, revisions</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
