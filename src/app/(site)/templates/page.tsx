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
      <section className="bg-maroon-900 relative overflow-hidden">
        <div className="absolute inset-0 kolam-pattern" />
        <div className="container-width py-16 md:py-24 relative">
          <div className="text-center">
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-ivory-100">
              Our template collection
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-balance text-ivory-300/80 text-lg">
              Each template is a complete invitation experience — designed with Tamil cultural aesthetics and modern luxury.
            </p>
          </div>
        </div>
      </section>

      <TemplatesContent />
    </>
  );
}
