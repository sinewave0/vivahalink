import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How VivahaLink handles the details and photographs you share when ordering an invitation, and what guests' RSVPs do.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="legal">
      <div className="wrap legal-inner">
        <p className="label">The fine print</p>
        <h1>Privacy, kept simple.</h1>
        <p className="updated">Last updated · October 2026</p>

        <p>
          VivahaLink makes invitation websites for celebrations. To do that we
          need some details from you, and your guests need to share a few with
          you. This page explains what happens to them.
        </p>

        <h2>What you share with us</h2>
        <p>
          When you order, you send us the details that appear on the
          invitation: names, family names, dates, ceremony times, venues, maps
          and photographs. You may also send a WhatsApp number for RSVPs. We
          use these only to design, build and deliver your invitation, and to
          speak with you about the order.
        </p>

        <h2>What guests share</h2>
        <p>
          Guests do not create an account and we do not store RSVPs on a
          database. When a guest taps RSVP, their phone opens WhatsApp with a
          pre-filled message addressed to the number you chose. The message
          goes directly to you or your family, not to us.
        </p>

        <h2>Where your invitation lives</h2>
        <p>
          Your invitation is a page on {SITE.url}. It is public to anyone who
          has the link, so please treat the link as you would a printed card.
          Search engines are not invited to index individual invitation pages.
        </p>

        <h2>Photographs</h2>
        <p>
          Photographs you send remain yours. We use them only inside your
          invitation and never sell them or use them in our portfolio without
          asking you first.
        </p>

        <h2>Third parties</h2>
        <p>
          We use WhatsApp for ordering and RSVP, and standard web hosting for
          the site. Maps and calendar links open Google services in a new tab.
          Those services have their own privacy policies.
        </p>

        <h2>Keeping and removing</h2>
        <p>
          We keep the working files for your invitation while it is live. Ask
          us at any time and we will take the invitation down and delete the
          details we hold. You can reach us on{" "}
          <a href="https://wa.me/919597886489" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          .
        </p>

        <h2>Questions</h2>
        <p>
          If anything here is unclear, message the studio before you order.
          We would rather answer a question than surprise you later.
        </p>

        <p style={{ marginTop: 36 }}>
          <Link href="/" className="text-link">
            Back to VivahaLink
          </Link>
        </p>
      </div>
    </section>
  );
}
