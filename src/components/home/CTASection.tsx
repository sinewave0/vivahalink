"use client";

import Link from "next/link";
import CandlelitFinale from "@/components/ui/CandlelitFinale";
import { waLink, waMessages, WHATSAPP_DISPLAY } from "@/lib/constants";

/**
 * The storefront closes on the candle-lit mandap — the same scene an
 * invitation ends with, carrying the final ask.
 */
export default function CTASection() {
  return (
    <CandlelitFinale
      overline="The next invitation could be yours"
      title="Your day, beautifully told"
      subtitle={
        <>
          Tell us the date and the feeling. We&apos;ll set the type, light the
          lanterns and send back a link.
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
            Begin on WhatsApp
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
