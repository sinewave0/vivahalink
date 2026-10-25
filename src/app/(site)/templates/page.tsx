import type { Metadata } from "next";
import TemplatesContent from "./TemplatesContent";

export const metadata: Metadata = {
  title: "Templates & Pricing",
  description:
    "Browse VivahaLink's invitation microsite templates for Tamil weddings, anniversaries and housewarmings — one-time pricing, live demos, and ordering over WhatsApp.",
  alternates: { canonical: "/templates" },
};

export default function TemplatesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#dfd4c6] bg-[#f2ece3]">
        <div className="absolute -right-28 -top-32 h-[28rem] w-[28rem] rounded-full border border-[#c9b89f]/40" />
        <div className="container-width relative py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[.22em] text-[#98744f]">The VivahaLink collection</p>
            <h1 className="font-serif text-4xl font-medium tracking-[-.04em] text-[#30241f] md:text-6xl">
              Find the feeling.
              <br /><em className="font-normal text-[#986b49]">We’ll make it yours.</em>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-balance text-[#71665d] text-base leading-7 md:text-lg">
              Thoughtful invitation websites for the moments that bring everyone together. Explore a style, preview it live, then let us personalise every detail.
            </p>
            <div className="mt-6 text-xs font-medium tracking-wide text-[#817467]">One-time pricing · from ₹1,499 · unlimited guests</div>
          </div>
        </div>
      </section>

      <TemplatesContent />
    </>
  );
}
