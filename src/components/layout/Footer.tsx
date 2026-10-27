import Link from "next/link";
import BrandMark from "@/components/ui/BrandMark";
import { NAV_LINKS, WHATSAPP_DISPLAY, waLink, waMessages } from "@/lib/constants";
import Copyright from "./Copyright";

/**
 * The night court at the end of the page: one large invitation to
 * begin, two quiet columns of doorways, and the house wordmark laid
 * across the floor as a watermark.
 */
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap foot-inner">
        <div className="foot-top">
          <div className="foot-cta">
            <BrandMark className="brandmark" />
            <p className="label" style={{ marginTop: 18 }}>
              Begin the celebration
            </p>
            <h2>
              Let&apos;s make something <em>worth keeping</em>.
            </h2>
            <a
              href={waLink(waMessages.inquiry())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn on-gold"
            >
              Chat on WhatsApp
            </a>
            <p className="foot-note">
              Tell us the date. We will reply with a design, a price and a
              timeline — usually within the hour.
            </p>
          </div>

          <div className="foot-cols">
            <div className="foot-col">
              <p className="clabel">Wander</p>
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
              <Link href="/#faq">Good questions</Link>
            </div>

            <div className="foot-col">
              <p className="clabel">The studio</p>
              <a href={waLink(waMessages.inquiry())} target="_blank" rel="noopener noreferrer">
                {WHATSAPP_DISPLAY}
              </a>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <span style={{ display: "block", padding: "5px 0", color: "rgba(251,247,240,0.45)", fontSize: "0.82rem" }}>
                Chennai · Mon–Sun, 9am–9pm IST
              </span>
            </div>
          </div>
        </div>

        <div className="foot-bottom">
          <span>
            <Copyright />
          </span>
          <nav aria-label="Legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <a href={waLink(waMessages.inquiry())} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </nav>
        </div>
      </div>

      <p className="foot-wordmark" aria-hidden="true">
        VivahaLink
      </p>
    </footer>
  );
}
