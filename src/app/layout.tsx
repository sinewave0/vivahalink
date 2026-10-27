import type { Metadata, Viewport } from "next";
import {
  Bodoni_Moda,
  Aboreto,
  Manrope,
  Tiro_Devanagari_Hindi,
} from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/constants";

/**
 * The type stack mirrors a hand-set wedding card:
 *  - Bodoni Moda         → high-contrast display serif (names, headlines)
 *  - Aboreto             → engraved small-cap labels
 *  - Manrope             → quiet body text
 *  - Tiro Devanagari     → shloka flourishes
 */
const display = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const label = Aboreto({
  variable: "--font-aboreto",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const body = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const deva = Tiro_Devanagari_Hindi({
  variable: "--font-devanagari",
  subsets: ["devanagari", "latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "VivahaLink — Digital Invitations for Indian Weddings & Celebrations",
    template: "%s | VivahaLink",
  },
  description:
    "A considered digital invitation for Indian weddings, anniversaries and housewarmings. Choose a design, send the details over WhatsApp, and share one link carrying the countdown, ceremonies, maps and RSVP.",
  keywords: [
    "Indian wedding invitation",
    "digital invitation",
    "wedding website",
    "Indian wedding website",
    "online invitation",
    "WhatsApp RSVP",
    "VivahaLink",
  ],
  applicationName: "VivahaLink",
  authors: [{ name: "VivahaLink" }],
  creator: "VivahaLink",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "VivahaLink",
    title: "VivahaLink — The invitation is the first experience.",
    description:
      "One link for the countdown, every ceremony, the route to each venue, and an RSVP that lands in the family chat. Designed in Chennai, delivered in 24–48 hours.",
    images: [
      {
        url: "/images/atelier/dusk.jpg",
        width: 1200,
        height: 800,
        alt: "A temple courtyard at dusk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VivahaLink — Digital invitations for Indian celebrations",
    description:
      "One link for the countdown, ceremonies, maps and WhatsApp RSVP. From ₹1,499.",
    images: ["/images/atelier/dusk.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#16101e",
  viewportFit: "cover",
};

/**
 * Root layout — deliberately minimal (fonts + global styles only).
 *
 * Marketing pages live inside the (site) route group and get the floating
 * pill navbar, court footer and WhatsApp pill from (site)/layout.tsx.
 * Invitation microsites (/events/*, /invite/*) are rendered full-bleed:
 * guests arrive through shared links and should experience the invitation,
 * not the storefront.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${label.variable} ${body.variable} ${deva.variable} h-full antialiased`}
    >
      <body className="font-body">{children}</body>
    </html>
  );
}
