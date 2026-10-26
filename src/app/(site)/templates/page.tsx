import type { Metadata } from "next";
import TemplatesContent from "./TemplatesContent";
import { Mandala, Garland } from "@/components/ui/decor";

export const metadata: Metadata = {
  title: "Templates & Pricing",
  description:
    "Browse VivahaLink's invitation microsite templates for Indian weddings, anniversaries and housewarmings — one-time pricing, live demos, and ordering over WhatsApp.",
  alternates: { canonical: "/templates" },
};

export default function TemplatesPage() {
  return (
    <>
      {/* Card-paper header, echoing the invitation's opening spread */}
      <section
        className="paper invocation"
        style={{ paddingTop: "clamp(96px,14vh,150px)", paddingBottom: "clamp(40px,7vh,70px)" }}
      >
        <Garland side="l" />
        <Garland side="r" />
        <div className="wrap">
          <Mandala glyph="✦" />
          <p className="small rv">One-time pricing · unlimited guests · delivered in 48 hours</p>
          <p className="hostline rv" style={{ "--d": ".06s" } as React.CSSProperties}>
            The VivahaLink collection
          </p>
          <div className="person rv" style={{ "--d": ".1s" } as React.CSSProperties}>
            <h2 style={{ fontSize: "clamp(2.6rem,9vw,5rem)" }}>Find the Feeling</h2>
            <p className="rel">We&apos;ll make it yours — every name, date and ritual.</p>
          </div>
        </div>
      </section>

      <TemplatesContent />
    </>
  );
}
