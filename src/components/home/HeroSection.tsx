"use client";

import Link from "next/link";
import PalaceJourney from "@/components/ui/PalaceJourney";
import { waLink, waMessages } from "@/lib/constants";

/**
 * Storefront cover — the same dusk-palace journey as the invitations,
 * carrying the brand instead of a couple's names.
 */
export default function HeroSection() {
  return (
    <PalaceJourney cueLabel="Scroll">
      <p className="label" style={{ color: "var(--ink-soft)" }}>
        Wedding invitations, reimagined
      </p>
      <h1 className="journey-title" style={{ marginTop: 12 }}>
        Vivaha<span className="weds">Link</span>Weddings
      </h1>
      <p className="journey-sub">
        One lovely link that carries your story, schedule, maps &amp; blessings.
      </p>
      <div className="hero-date">
        TAMIL WEDDINGS · ANNIVERSARIES · HOUSEWARMINGS
      </div>
      <div className="journey-actions">
        <Link href="/templates" className="btn solid">
          Explore the collection
        </Link>
        <a
          href={waLink(waMessages.inquiry())}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          Create yours
        </a>
      </div>
    </PalaceJourney>
  );
}
