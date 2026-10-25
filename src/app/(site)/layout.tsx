import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyWhatsAppBar from "@/components/layout/StickyWhatsAppBar";
import MotionProvider from "@/components/ui/MotionProvider";

/**
 * Marketing site chrome — Navbar, Footer and the sticky WhatsApp
 * conversion bar wrap every storefront page (home, templates, about).
 * Invitation microsites live outside this group and skip this chrome.
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
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:inline-flex focus:items-center focus:rounded-full focus:bg-maroon-800 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ivory-100 focus:shadow-lg"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
      <StickyWhatsAppBar />
    </MotionProvider>
  );
}
