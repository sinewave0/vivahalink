import type { Metadata } from "next";
import Link from "next/link";
import { WHATSAPP_DISPLAY, waLink, waMessages } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The terms of ordering a VivahaLink invitation: what is included, timelines, revisions, payment and use of the live link.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="legal">
      <div className="wrap legal-inner">
        <p className="label">The fine print</p>
        <h1>Terms of the atelier.</h1>
        <p className="updated">Last updated · October 2026</p>

        <p>
          These are the working terms for commissioning a VivahaLink
          invitation. They are intentionally short and written to be read
          before you order, not afterwards.
        </p>

        <h2>What you receive</h2>
        <p>
          A live invitation website at a private link, carrying the details you
          supply: couple names, family lines, ceremony schedule, venue maps,
          countdown, story, photographs, calendar links and WhatsApp RSVP. The
          invitation is designed for phones first and works on modern browsers.
        </p>

        <h2>Ordering and details</h2>
        <p>
          Orders are placed over WhatsApp. We begin once we have your design
          choice, the final text, and any photographs. Please check names,
          dates and venue spellings before you send them; the invitation is
          built from the details you provide.
        </p>

        <h2>Timeline</h2>
        <p>
          Most invitations are ready within 24–48 hours of receiving complete
          details. Dates around the wedding season can take longer; we will
          tell you before you pay. Rush delivery is available when the studio
          has space.
        </p>

        <h2>Revisions</h2>
        <p>
          One round of revisions is included. Further changes are welcome and
          can be quoted separately, depending on scope. Typographical
          corrections are always free while the invitation is live.
        </p>

        <h2>Payment</h2>
        <p>
          We accept UPI and bank transfer. Payment details are shared on
          WhatsApp after you confirm the design and timeline. Work begins once
          payment is received.
        </p>

        <h2>Use of the link</h2>
        <p>
          The invitation is for your private celebration. Please do not resell
          it or present it as your own design. We may show the finished
          invitation in our portfolio only with your permission.
        </p>

        <h2>Cancellations</h2>
        <p>
          If you cancel before design work begins, we refund the amount paid
          less any payment fees. Once design work has begun, the fee covers the
          time reserved for your celebration and is not refundable. If we
          cannot deliver, you receive a full refund.
        </p>

        <h2>Taking it down</h2>
        <p>
          Invitations stay live for at least twelve months. Ask us whenever you
          would like yours removed, and we will take it down.
        </p>

        <h2>Talk to us</h2>
        <p>
          Questions about these terms? Message{" "}
          <a href={waLink(waMessages.inquiry())} target="_blank" rel="noopener noreferrer">
            {WHATSAPP_DISPLAY}
          </a>
          . A person will answer.
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
