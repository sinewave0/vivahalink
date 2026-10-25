"use client";

import Link from "next/link";
import CandlelitFinale from "@/components/ui/CandlelitFinale";
import { waLink, waMessages, WHATSAPP_DISPLAY } from "@/lib/constants";

/**
 * The storefront closes on the candle-lit mandap — the same scene an
 * invitation ends with, carrying the conversion ask.
 */
export default function CTASection() {
  return (
    <CandlelitFinale
      overline="With love and blessings"
      title="Make yours in a day"
      subtitle={
        <>
          Tell us your story over WhatsApp — we&apos;ll set the date, light the
          lanterns and send your link.
        </>
      }
      actions={
        <>
          <a
            href={waLink(waMessages.inquiry())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn on-gold"
          >
            Chat on WhatsApp
          </a>
          <Link href="/templates" className="btn ghost-light">
            Browse the collection
          </Link>
        </>
      }
      credit={
        <>
          VivahaLink · {WHATSAPP_DISPLAY} · made for celebrations everywhere
        </>
      }
    />
  );
}
