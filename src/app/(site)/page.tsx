import HeroSection from "@/components/home/HeroSection";
import FeaturedTemplates from "@/components/home/FeaturedTemplates";
import HowItWorks from "@/components/home/HowItWorks";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedTemplates />
      <HowItWorks />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
