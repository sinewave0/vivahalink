// VivahaLink — TypeScript Types

export type TemplateCategory = "wedding" | "anniversary" | "housewarming";
export type TemplateTier = "Basic" | "Premium" | "Luxury";

export interface PaletteColor {
  name: string;
  hex: string;
}

export interface Template {
  id: string;
  slug: string;
  title: string;
  category: TemplateCategory;
  tier: TemplateTier;
  price: number;
  description: string;
  features: string[];
  thumbnail: string;
  demoSlug: string;
  palette: PaletteColor[];
}

export interface EventCeremony {
  name: string;
  date: string;        // ISO date string
  time: string;        // Display time e.g. "10:00 AM"
  venue: string;
  address: string;
  mapUrl: string;
  description?: string;
}

export interface InvitationData {
  slug: string;
  templateId: string;
  coupleName1: string;
  coupleName2: string;
  tagline: string;
  weddingDate: string; // ISO date string
  story: string;
  photos: string[];    // URLs or paths
  ceremonies: EventCeremony[];
  musicUrl?: string;
  /** WhatsApp number (country code + digits) that receives this invitation's RSVPs. */
  rsvpWhatsAppNumber?: string;
  family1?: string;
  family2?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
}
