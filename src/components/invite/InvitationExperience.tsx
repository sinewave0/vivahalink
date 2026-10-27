"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Share2 } from "lucide-react";
import type { InvitationData, Template } from "@/lib/types";
import { getInvitationTheme } from "@/lib/invitation-theme";
import { GATE_LABELS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import DuskCover from "@/components/ui/DuskCover";
import CandlelitFinale from "@/components/ui/CandlelitFinale";
import ScrollFX from "@/components/ui/ScrollFX";
import InvitationGate from "./InvitationGate";
import CountdownTimer from "./CountdownTimer";
import StorySection from "./StorySection";
import CeremoniesSection from "./CeremoniesSection";
import RSVPModal from "./RSVPModal";
import ShareMenu from "./ShareMenu";
import InvitationMusic from "./InvitationMusic";

interface InvitationExperienceProps {
  invitation: InvitationData;
  template: Template;
  /** Absolute URL of this invitation, used for sharing. */
  shareUrl: string;
}

/** Category-specific phrasing for the invitation spread. */
const PHRASING = {
  wedding: { invite: "invite you to the wedding of", countdown: "Until the Celebration" },
  anniversary: { invite: "invite you to the celebration of", countdown: "Until the Toast" },
  housewarming: { invite: "invite you to the housewarming of", countdown: "Until the Pravesam" },
} as const;

/** "42, East Mada Street, Mylapore, Chennai 600004" → "CHENNAI" */
function cityFrom(address?: string): string {
  if (!address) return "";
  const last = address.split(",").pop() ?? "";
  return last.replace(/[^A-Za-z ]/g, "").trim().toUpperCase();
}

/** "Sunday, 14 February 2027" → "14 FEBRUARY 2027" */
function heroDate(iso: string): string {
  const d = new Date(iso);
  return d
    .toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .toUpperCase();
}

/**
 * The complete invitation microsite in the dusk language: a wax-seal
 * gate, a photographic dusk cover, a card-paper invitation spread,
 * ceremonies hung on a gold thread, a blessing spread, the lantern
 * clock, a photographic interlude, and a candle-lit mandap finale —
 * with floating music / share / RSVP pills.
 */
export default function InvitationExperience({
  invitation,
  template,
  shareUrl,
}: InvitationExperienceProps) {
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const theme = getInvitationTheme(template);
  const coupleNames = `${invitation.coupleName1} & ${invitation.coupleName2}`;
  const initials = `${invitation.coupleName1[0]}&${invitation.coupleName2[0]}`;
  const city = cityFrom(invitation.ceremonies[0]?.address);
  const phrasing = PHRASING[template.category];
  const tone = template.heroTextTone ?? "dark";

  /* Each template tints the shared artwork with its own palette. */
  const paletteVars = {
    "--ink": theme.ink,
    "--ink-soft": theme.muted,
    "--gold": theme.accent,
    "--gold-lite": theme.accent,
    "--paper": theme.surfaceAlt,
    "--blush": theme.surface,
    "--ivory": theme.surface,
  } as CSSProperties;

  const firstMap = invitation.ceremonies[0]?.mapUrl;

  return (
    <div className="invitation-microsite" style={paletteVars}>
      {/* ── Wax seal: the invitation waits behind the couple's monogram ── */}
      <InvitationGate initials={initials} />

      {/* ── Dusk cover: names over the temple courtyard photograph ── */}
      <DuskCover
        align="center"
        waitForGate
        tone={tone}
        src={template.heroImage ?? "/images/atelier/dusk.jpg"}
      >
        <p className="label">{GATE_LABELS[template.category]}</p>
        <h1 className="dusk-title" style={{ marginTop: 12 }}>
          {invitation.coupleName1}
          <span className="weds">{template.category === "wedding" ? "Weds" : "And"}</span>
          {invitation.coupleName2}
        </h1>
        <p className="dusk-sub">{invitation.tagline}</p>
        <div className="hero-date">
          {heroDate(invitation.weddingDate)}
          {city ? ` · ${city}` : ""}
        </div>
      </DuskCover>

      {/* ── Card-paper invitation ── */}
      <section className="paper invocation" id="invite">
        <div className="wrap">
          <figure className="kolam rv" aria-hidden="true">
            <Image
              src="/images/atelier/kolam.jpg"
              alt=""
              width={220}
              height={220}
              sizes="(min-width: 640px) 148px, 40vw"
            />
          </figure>

          <p className="namo deva rv">॥ शुभ विवाह ॥</p>
          {invitation.family1 && (
            <p className="small rv" style={{ "--d": ".04s" } as CSSProperties}>
              {invitation.family1}
            </p>
          )}
          {invitation.family2 && (
            <p className="hostline rv" style={{ "--d": ".08s" } as CSSProperties}>
              {invitation.family2}
            </p>
          )}
          <p className="small rv" style={{ "--d": ".1s" } as CSSProperties}>
            {phrasing.invite}
          </p>

          <div className="person rv" style={{ "--d": ".12s" } as CSSProperties}>
            <h2>{invitation.coupleName1}</h2>
          </div>
          <div className="amp rv" style={{ "--d": ".14s" } as CSSProperties}>
            &amp;
          </div>
          <div className="person rv" style={{ "--d": ".16s" } as CSSProperties}>
            <h2>{invitation.coupleName2}</h2>
          </div>

          <p className="small following rv" style={{ "--d": ".18s" } as CSSProperties}>
            on the following events
          </p>
        </div>
      </section>

      {/* ── Celebrations on the gold thread ── */}
      <CeremoniesSection invitation={invitation} />

      {/* ── Blessing: story, photos & peacock procession ── */}
      <StorySection invitation={invitation} />

      {/* ── Photographic interlude: jasmine & the lamp-lit mandap ── */}
      <section className="dusk-duo" aria-hidden="true">
        <Image
          src="/images/atelier/jasmine.jpg"
          alt=""
          width={1200}
          height={800}
          sizes="(min-width: 640px) 50vw, 100vw"
          loading="lazy"
        />
        <Image
          src="/images/atelier/mandap.jpg"
          alt=""
          width={1200}
          height={800}
          sizes="(min-width: 640px) 50vw, 100vw"
          loading="lazy"
        />
      </section>

      {/* ── Lantern clock ── */}
      <section className="count" id="countdown">
        <div className="wrap">
          <p className="label rv">The countdown begins</p>
          <h2 className="rv" style={{ "--d": ".04s" } as CSSProperties}>
            {phrasing.countdown}
          </h2>
          <CountdownTimer targetDate={invitation.weddingDate} />
          <p className="to rv" style={{ "--d": ".08s" } as CSSProperties}>
            {formatDate(invitation.weddingDate)}
            {city ? ` · ${city.charAt(0)}${city.slice(1).toLowerCase()}` : ""}
          </p>
        </div>
      </section>

      {/* ── Candle-lit finale ── */}
      <CandlelitFinale
        compact
        overline="With love and blessings"
        title={coupleNames}
        subtitle={
          <>
            {formatDate(invitation.weddingDate)}
            {city ? ` · ${city.charAt(0)}${city.slice(1).toLowerCase()}` : ""}
          </>
        }
        actions={
          <>
            <button type="button" className="btn on-gold" onClick={() => setRsvpOpen(true)}>
              RSVP on WhatsApp
            </button>
            {firstMap && (
              <a className="btn ghost-light" href={firstMap} target="_blank" rel="noopener noreferrer">
                Get directions
              </a>
            )}
          </>
        }
        credit={
          <>
            Crafted on{" "}
            <Link href="/" target="_blank" rel="noopener">
              VivahaLink
            </Link>{" "}
            — make yours →
          </>
        }
      />

      {/* ── Floating pills: share above the music pill, RSVP on the left ── */}
      <InvitationMusic invitation={invitation} />

      <button
        type="button"
        className="rail-extra"
        style={{ bottom: "calc(14px + env(safe-area-inset-bottom, 0px) + 60px)" }}
        onClick={() => setShareOpen(true)}
        aria-label="Share invitation"
      >
        <Share2 size={15} />
        <span>Share</span>
      </button>

      <button
        type="button"
        className="rail-extra"
        style={{
          right: "auto",
          left: "max(14px, env(safe-area-inset-left, 0px))",
          bottom: "calc(14px + env(safe-area-inset-bottom, 0px))",
        }}
        onClick={() => setRsvpOpen(true)}
      >
        RSVP
      </button>

      {/* ── Modals ── */}
      <RSVPModal open={rsvpOpen} onClose={() => setRsvpOpen(false)} invitation={invitation} />
      <ShareMenu open={shareOpen} onClose={() => setShareOpen(false)} shareUrl={shareUrl} title={coupleNames} />

      <ScrollFX />
    </div>
  );
}
