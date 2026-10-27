import FolioSpine from "@/components/home/FolioSpine";
import HeroSection from "@/components/home/HeroSection";
import FeaturedTemplates from "@/components/home/FeaturedTemplates";
import InsideInvitation from "@/components/home/InsideInvitation";
import HowItWorks from "@/components/home/HowItWorks";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import { faqs } from "@/data/content";
import { SITE } from "@/lib/constants";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#studio`,
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
      areaServed: "IN",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chennai",
        addressCountry: "IN",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#site`,
      url: SITE.url,
      name: SITE.name,
      publisher: { "@id": `${SITE.url}/#studio` },
      inLanguage: "en-IN",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FolioSpine />
      <HeroSection />
      <FeaturedTemplates />
      <InsideInvitation />
      <HowItWorks />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
