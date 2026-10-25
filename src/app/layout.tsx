import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/constants";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "VivahaLink — Beautiful Digital Invitation Websites for Tamil Weddings",
    template: "%s | VivahaLink",
  },
  description:
    "Premium, culturally rooted digital invitation websites for Tamil weddings, anniversaries, and housewarmings. Choose a template, customize via WhatsApp, and share your invitation link.",
  keywords: [
    "Tamil wedding invitation",
    "digital invitation",
    "wedding website",
    "Tamil Nadu wedding",
    "online invitation",
    "VivahaLink",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "VivahaLink",
    title: "VivahaLink — Beautiful Digital Invitation Websites for Tamil Weddings",
    description:
      "Choose a template, customise it over WhatsApp, and share one elegant link — schedules, maps, live countdown and RSVP included. No app needed.",
  },
  twitter: {
    card: "summary",
    title: "VivahaLink — Digital Invitation Websites for Tamil Weddings",
    description:
      "Premium invitation microsites with countdown, maps, and WhatsApp RSVP. One link, every guest.",
  },
};

export const viewport: Viewport = {
  themeColor: "#7a1636",
};

/**
 * Root layout — deliberately minimal (fonts + global styles only).
 *
 * Marketing pages live inside the (site) route group and get the Navbar /
 * Footer / WhatsApp bar from (site)/layout.tsx. Invitation microsites
 * (/events/*, /invite/*) are rendered full-bleed: guests arrive through
 * shared links and should experience the invitation, not the storefront.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-ivory-50 text-temple-950">
        {children}
      </body>
    </html>
  );
}
