import Link from "next/link";
import { SITE, NAV_LINKS, waLink, waMessages, WHATSAPP_DISPLAY } from "@/lib/constants";
import Copyright from "./Copyright";

/**
 * Night court footer — deep dusk with lantern-gold threads, closing the
 * page the way the mandap scene closes an invitation.
 */
export default function Footer() {
  return (
    <footer className="court-footer">
      <div className="threads" aria-hidden="true" style={{ position: "absolute", inset: 0 }} />

      <div className="relative z-[2] mx-auto grid max-w-[1100px] gap-10 px-4 pb-0 pt-[clamp(48px,8vh,80px)] md:grid-cols-[1.5fr_1fr_1fr] md:gap-12">
        {/* Brand */}
        <div className="grid content-start gap-6">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid h-10 w-10 place-items-center rounded-full border border-brass-lite font-display text-xl italic text-brass-lite"
            >
              v
            </span>
            <div>
              <p className="m-0 font-display text-2xl text-frost">VivahaLink</p>
              <p className="clabel mt-0.5">One link · every blessing</p>
            </div>
          </div>
          <p className="m-0 max-w-[36ch] text-sm text-frost/70">
            {SITE.tagline} — designed with the soul of South Indian celebrations
            and delivered over WhatsApp.
          </p>
        </div>

        {/* Wander */}
        <div className="grid content-start gap-5">
          <p className="clabel">Wander</p>
          <nav className="grid gap-2.5">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="plain text-sm">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Reach us */}
        <div className="grid content-start gap-5">
          <p className="clabel">Reach us</p>
          <p className="m-0 text-sm text-frost/70">
            Questions, timelines, custom dreams — we reply on WhatsApp, usually
            within the hour.
          </p>
          <a
            href={waLink(waMessages.inquiry())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn on-gold justify-self-start"
          >
            {WHATSAPP_DISPLAY}
          </a>
        </div>
      </div>

      <div className="relative z-[2] mt-[clamp(40px,7vh,70px)] border-t border-brass-lite/20 py-[clamp(18px,3vh,26px)] text-center">
        <p className="clabel opacity-80">
          <Copyright />
        </p>
      </div>
    </footer>
  );
}
