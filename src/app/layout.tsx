import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Aboreto,
  Manrope,
  Tiro_Devanagari_Hindi,
  Tiro_Tamil,
} from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/constants";

/**
 * The type stack mirrors a hand-set wedding card:
 *  - Cormorant Garamond  → display serif (names, headlines)
 *  - Aboreto             → engraved small-cap labels
 *  - Manrope             → quiet body text
 *  - Tiro Devanagari     → shloka flourishes
 *  - Tiro Tamil          → Tamil flourishes
 */
const display = Cormorant_Garamond({
  variable: "--font-cormorant",
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

const tamil = Tiro_Tamil({
  variable: "--font-tiro-tamil",
  subsets: ["tamil", "latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "VivahaLink — Beautiful Digital Invitation Websites for Tamil Weddings",
    template: "%s | VivahaLink",
  },
  description:
    "Premium, culturally rooted digital invitation microsites for Tamil weddings, anniversaries, and housewarmings. Choose a template, customize via WhatsApp, and share your invitation link.",
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
    images: ["/images/hero/invitation-editorial.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "VivahaLink — Digital Invitation Websites for Tamil Weddings",
    description:
      "Premium invitation microsites with countdown, maps, and WhatsApp RSVP. One link, every guest.",
    images: ["/images/hero/invitation-editorial.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f6e4dc",
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
      className={`${display.variable} ${label.variable} ${body.variable} ${deva.variable} ${tamil.variable} h-full antialiased`}
    >
      <body className="font-body">{children}</body>
    </html>
  );
}
