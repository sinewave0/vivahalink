"use client";

import Link from "next/link";
import DuskCover from "@/components/ui/DuskCover";
import { waLink, waMessages } from "@/lib/constants";

/**
 * Storefront cover — the dusk courtyard photograph carrying the brand
 * instead of a couple's names: engraved display caps, a quiet italic
 * promise, and the two moves that matter — see a sample, order on
 * WhatsApp.
 */
export default function HeroSection() {
  return (
    <DuskCover align="bottom" cueLabel="Scroll">
      <p className="label">Indian weddings &amp; celebrations</p>
      <h1 className="dusk-title" style={{ marginTop: 12 }}>
        Vivaha<span className="dusk-brand">Link</span>
      </h1>
      <p className="dusk-sub">
        A shareable invitation your guests actually want to open.
      </p>
      <div className="hero-date">
        WEDDINGS · ANNIVERSARIES · HOUSEWARMINGS
      </div>
      <div className="dusk-actions">
        <Link href="/events/mangala-isai-demo" className="btn solid">
          Open a sample
        </Link>
        <a
          href={waLink(waMessages.inquiry())}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          Order on WhatsApp
        </a>
      </div>
    </DuskCover>
  );
}
