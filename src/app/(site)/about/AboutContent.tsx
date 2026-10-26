"use client";

import Link from "next/link";
import { Clock, MapPin, MessageCircle, ScrollText, Sparkles } from "lucide-react";
import { waLink, waMessages, WHATSAPP_DISPLAY } from "@/lib/constants";
import { Mandala, PeacockStrip, Divider } from "@/components/ui/decor";
import { useReveal } from "@/components/ui/ScrollFX";

const values = [
  {
    icon: ScrollText,
    title: "Rooted in tradition",
    text: "Kolams, jasmine, temple silhouettes, kanjivaram textures — our designs begin with South Indian craft, never a generic template.",
  },
  {
    icon: Sparkles,
    title: "Crafted like couture",
    text: "Hand-tuned animation, engraved typography and a calm, premium feel. Your invitation should be the first gift of the wedding.",
  },
  {
    icon: MessageCircle,
    title: "Ordering without friction",
    text: "No accounts, no uploads, no design tools. Choose a design, send your details on WhatsApp, receive a link.",
  },
  {
    icon: MapPin,
    title: "Made for the diaspora",
    text: "A link works everywhere — Chennai, Singapore, London, Toronto. Directions, RSVP and calendars travel with it.",
  },
];

const TINTS = ["#f7dce4", "#fbe3cf", "#dfe8d6", "#e3dbf3"];

export default function AboutPage() {
  useReveal();

  return (
    <>
      {/* Card-paper introduction */}
      <section
        className="paper invocation"
        style={{ paddingTop: "clamp(110px,16vh,170px)", paddingBottom: "clamp(50px,9vh,90px)" }}
      >
        <div className="wrap">
          <Mandala glyph="ॐ" />
          <p className="namo tamil rv">॥ விவாக இணைப்பு ॥</p>
          <p className="small rv" style={{ "--d": ".05s" } as React.CSSProperties}>
            The invitation is the first experience of the wedding — not just a card
          </p>
          <div className="person rv" style={{ "--d": ".1s" } as React.CSSProperties}>
            <h2 style={{ fontSize: "clamp(2.6rem,9vw,5rem)" }}>About VivahaLink</h2>
            <p className="rel">
              Beautiful digital invitation websites for Tamil celebrations and
              the families who gather for them.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section
        className="paper"
        style={{ paddingBottom: "clamp(40px,7vh,70px)", paddingTop: "clamp(10px,2vh,20px)" }}
      >
        <div className="wrap" style={{ maxWidth: 720 }}>
          <Divider className="rv" style={{ display: "block", width: 160, margin: "0 auto 30px" }} />
          {[
            "VivahaLink began with a simple frustration. Weddings in Tamil Nadu deserve invitations that carry the warmth of the occasion — yet most digital options were lifeless PDFs or print-shop scans with a thousand-watt gold filter.",
            "We thought: what if the invitation itself felt like an event? A link your family opens eagerly. A soft reveal, the couple's story, a countdown your grandmother actually taps, an RSVP that lands directly in your WhatsApp.",
            "That's VivahaLink. Every microsite is designed by hand with South Indian craft — kolam patterns, kanjivaram palettes, banana-leaf greens — and delivered as a single beautiful link within 24–48 hours of receiving your details.",
          ].map((para, i) => (
            <p
              key={i}
              className="rv"
              style={
                {
                  "--d": `${i * 0.06}s`,
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.12rem,2.4vw,1.35rem)",
                  lineHeight: 1.6,
                  color: i === 1 ? "var(--ink)" : "var(--ink-soft)",
                  marginTop: i === 0 ? 0 : "1.1em",
                  textAlign: "center",
                } as React.CSSProperties
              }
            >
              {i === 1 ? (
                <em style={{ fontStyle: "italic" }}>{para}</em>
              ) : (
                para
              )}
            </p>
          ))}
        </div>
      </section>

      {/* Values as arches */}
      <section className="gthread gthread-plain" aria-label="What we care about">
        <div className="wrap head-block">
          <h2 className="rv">
            <span className="tamil">நமது நம்பிக்கைகள்</span>
            What We Care About
          </h2>
          <p className="small rv" style={{ "--d": ".06s" } as React.CSSProperties}>
            Four promises behind every invitation we craft.
          </p>
        </div>

        <div
          className="wrap"
          style={{
            position: "relative",
            zIndex: 2,
            display: "grid",
            gap: "clamp(16px,3vw,26px)",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 230px), 1fr))",
            paddingBottom: "clamp(40px,7vh,70px)",
            alignItems: "start",
          }}
        >
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <article
                key={v.title}
                className="arch"
                style={
                  {
                    "--tint": TINTS[i % TINTS.length],
                    "--aw": "100%",
                    "--d": `${i * 0.06}s`,
                  } as React.CSSProperties
                }
              >
                <div className="arch-in" style={{ padding: "clamp(30px,4vw,38px) 22px 30px" }}>
                  <div className="ic">
                    <Icon size={34} strokeWidth={1.3} />
                  </div>
                  <h3 style={{ fontSize: "clamp(1.5rem,3.4vw,1.85rem)" }}>{v.title}</h3>
                  <p className="vn" style={{ marginTop: 12 }}>{v.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Contact arch */}
      <section className="gthread" aria-label="Contact">
        <div className="wrap head-block">
          <h2 className="rv">
            <span className="tamil">தொடர்பு</span>
            Talk To Us
          </h2>
          <p className="small rv" style={{ "--d": ".06s" } as React.CSSProperties}>
            One WhatsApp message is all it takes.
          </p>
        </div>

        <div
          className="wrap"
          style={{ position: "relative", zIndex: 2, paddingBottom: "clamp(50px,9vh,90px)" }}
        >
          <article
            className="arch"
            style={
              {
                "--tint": "#e3dbf3",
                "--aw": "min(92vw, 460px)",
                margin: "0 auto",
              } as React.CSSProperties
            }
          >
            <div className="arch-in" style={{ padding: "clamp(60px,10vw,84px) 30px 34px" }}>
              <div className="ic">
                <MessageCircle size={34} strokeWidth={1.3} />
              </div>
              <h3 style={{ fontSize: "clamp(1.7rem,5vw,2.2rem)" }}>VivahaLink Concierge</h3>
              <p className="dd">Order · customize · just ask</p>

              <div
                className="vn"
                style={{
                  display: "grid",
                  gap: 10,
                  textAlign: "left",
                  marginTop: 18,
                  fontSize: "0.86rem",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <Clock size={15} style={{ color: "var(--gold)", flexShrink: 0 }} />
                  Mon–Sun, 9 AM – 9 PM IST
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <MessageCircle size={15} style={{ color: "var(--gold)", flexShrink: 0 }} />
                  {WHATSAPP_DISPLAY}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <MapPin size={15} style={{ color: "var(--gold)", flexShrink: 0 }} />
                  Tamil Nadu &amp; the global Tamil diaspora
                </span>
              </div>

              <div className="btns" style={{ marginTop: 24 }}>
                <a
                  href={waLink(waMessages.inquiry())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn solid"
                >
                  Chat on WhatsApp
                </a>
                <Link href="/templates" className="btn">
                  See the collection
                </Link>
              </div>
            </div>
          </article>
        </div>

        <PeacockStrip />
      </section>
    </>
  );
}
