// VivahaLink — Design System Constants

/**
 * Public configuration is baked into the static site at build time. Copy
 * `.env.example` to `.env.local` before deploying and set the real values.
 */
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919597886489";
export const WHATSAPP_DISPLAY = process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? "+91 95978 86489";

export const SITE = {
  name: "VivahaLink",
  tagline: "Beautiful digital invitation websites for Tamil weddings & celebrations",
  description:
    "Premium, culturally rooted digital invitation microsites for Tamil weddings, anniversaries, and housewarmings.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vivahalink.com").replace(/\/$/, ""),
} as const;

// WhatsApp deep-link helper
export function waLink(message: string, phoneNumber = WHATSAPP_NUMBER): string {
  const recipient = phoneNumber.replace(/\D/g, "");
  return `https://wa.me/${recipient}?text=${encodeURIComponent(message)}`;
}

// Pre-filled message builders
export const waMessages = {
  order: (templateTitle: string) =>
    `Hi! I'd like to order the "${templateTitle}" invitation template from VivahaLink. Could you share the next steps?`,
  inquiry: () =>
    `Hi! I'm interested in VivahaLink digital invitations. Could you tell me more?`,
  rsvp: (guestName: string, attending: boolean, guests: number, event: string) =>
    `RSVP via VivahaLink\n\nName: ${guestName}\nAttending: ${attending ? "Yes ✅" : "No ❌"}\nGuests: ${guests}\nEvent: ${event}`,
  share: (inviteLink: string, coupleNames: string) =>
    `✨ You're invited! ${coupleNames}'s wedding invitation:\n${inviteLink}\n\nView the invitation, RSVP and get directions — all from the link.`,
} as const;

// Color palette tokens (used in Tailwind config + inline)
export const palette = {
  maroon: {
    50: "#fdf2f4",
    100: "#fce7eb",
    200: "#f9d0d9",
    300: "#f4a8ba",
    400: "#ec7696",
    500: "#df4a74",
    600: "#cb2a5b",
    700: "#a51d47",
    800: "#7a1636",   // Deep temple maroon
    900: "#5c1129",
    950: "#3a0617",
  },
  gold: {
    50: "#fefdf4",
    100: "#fdfae3",
    200: "#faf2c1",
    300: "#f5e68f",
    400: "#eed556",
    500: "#e5c02a",   // Antique gold
    600: "#c99a1d",
    700: "#a5731a",
    800: "#885b1c",
    900: "#714b1c",
    950: "#42280b",
  },
  ivory: {
    50: "#fefdfb",
    100: "#fdfaf4",
    200: "#faf5e8",
    300: "#f5ecd5",   // Warm ivory
    400: "#eddebb",
    500: "#e2cc9a",
    600: "#d4b377",
    700: "#c2955b",
    800: "#a07745",
    900: "#83623b",
    950: "#46311d",
  },
  temple: {
    50: "#faf8f6",
    100: "#f4f0eb",
    200: "#e8dfd5",
    300: "#d8cab8",
    400: "#c4ae96",
    500: "#b4977c",   // Temple stone
    600: "#a78268",
    700: "#8c6a55",
    800: "#745849",
    900: "#60493e",
    950: "#332520",
  },
  green: {
    50: "#f0f9f1",
    100: "#dbf0dd",
    200: "#b9e1be",
    300: "#8bca93",
    400: "#5aad65",
    500: "#389244",   // Rich banana-leaf green
    600: "#287534",
    700: "#215d2b",
    800: "#1d4a25",
    900: "#193d20",
    950: "#0a2110",
  },
} as const;

// Navigation links
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Templates", href: "/templates" },
  { label: "About", href: "/about" },
] as const;

// Intro-gate / hero label per invitation category
export const GATE_LABELS = {
  wedding: "The wedding of",
  anniversary: "Celebrating",
  housewarming: "Blessings on the new home of",
} as const;
