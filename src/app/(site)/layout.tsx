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
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
      <StickyWhatsAppBar />
    </MotionProvider>
  );
}
