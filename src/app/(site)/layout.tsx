import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyWhatsAppBar from "@/components/layout/StickyWhatsAppBar";
import ScrollFX from "@/components/ui/ScrollFX";
import MotionProvider from "@/components/ui/MotionProvider";

/**
 * Marketing site chrome — the floating pill navbar, night-court footer
 * and the WhatsApp lantern pill wrap every storefront page (home,
 * templates, about). The hero scenes run full-bleed beneath the floating
 * nav. Invitation microsites live outside this group and skip this chrome.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:inline-flex focus:items-center focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-frost focus:shadow-lg"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
      <StickyWhatsAppBar />
      <ScrollFX />
    </MotionProvider>
  );
}
