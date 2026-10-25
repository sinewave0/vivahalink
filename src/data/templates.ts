import { Template } from "@/lib/types";

export const templates: Template[] = [
  {
    id: "tpl-001",
    slug: "mangala-isai",
    title: "The Saffron Suite",
    category: "wedding",
    tier: "Premium",
    price: 2499,
    description:
      "A grand temple-inspired design with intricate kolam borders, deep maroon and gold tones, and a majestic nadaswaram-style reveal animation.",
    features: [
      "Temple gopuram silhouette intro",
      "Animated kolam border patterns",
      "Multi-event schedule with map",
      "Background nadaswaram music",
      "WhatsApp RSVP",
      "Add to Calendar",
      "Photo gallery",
    ],
    thumbnail: "/images/templates/mangala-isai.svg",
    demoSlug: "mangala-isai-demo",
    palette: [
      { name: "Temple Maroon", hex: "#7a1636" },
      { name: "Antique Gold", hex: "#e5c02a" },
      { name: "Warm Ivory", hex: "#f5ecd5" },
    ],
  },
  {
    id: "tpl-002",
    slug: "jasmine-garland",
    title: "Jasmine Reverie",
    category: "wedding",
    tier: "Luxury",
    price: 3499,
    description:
      "An elegant, modern design weaving jasmine motifs with contemporary typography. Soft ivory backgrounds with rich green and gold accents.",
    features: [
      "Jasmine garland envelope reveal",
      "Parallax photo sections",
      "Live countdown timer",
      "Multi-ceremony schedule",
      "Google Maps directions",
      "Background veena music",
      "Multi-step RSVP modal",
      "Share & Add to Calendar",
    ],
    thumbnail: "/images/templates/jasmine-garland.svg",
    demoSlug: "jasmine-garland-demo",
    palette: [
      { name: "Night Garden", hex: "#244d3a" },
      { name: "Jasmine Cream", hex: "#fffdf7" },
      { name: "Champagne Gold", hex: "#c49a4d" },
    ],
    theme: {
      main: "#244d3a",
      accent: "#c49a4d",
      surface: "#fffdf7",
      surfaceAlt: "#edf3e8",
      ink: "#244536",
      muted: "#607666",
      petalColors: ["#dbe8d4", "#91b483", "#c49a4d", "#fffdf7", "#587b58"],
    },
  },
  {
    id: "tpl-003",
    slug: "banana-leaf",
    title: "The Marigold Edit",
    category: "wedding",
    tier: "Basic",
    price: 1499,
    description:
      "A vibrant celebration of Tamil Nadu's banana leaf tradition. Warm greens, cheerful yellows, and a clean, joyful layout.",
    features: [
      "Banana leaf unfurl animation",
      "Event schedule with timings",
      "Venue map integration",
      "WhatsApp RSVP",
      "Add to Calendar",
      "Mobile-optimized gallery",
    ],
    thumbnail: "/images/templates/banana-leaf.svg",
    demoSlug: "banana-leaf-demo",
    palette: [
      { name: "Plantain Green", hex: "#225a3b" },
      { name: "Palm Cream", hex: "#fff6df" },
      { name: "Turmeric Gold", hex: "#dfae35" },
    ],
    theme: {
      main: "#225a3b",
      accent: "#dfae35",
      surface: "#fff6df",
      surfaceAlt: "#edf4df",
      ink: "#194a31",
      muted: "#657757",
      petalColors: ["#5ca363", "#dfae35", "#fff0b9", "#2d7749", "#9ac56d"],
    },
  },
  {
    id: "tpl-004",
    slug: "golden-kalyanam",
    title: "Golden Hour",
    category: "anniversary",
    tier: "Premium",
    price: 2499,
    description:
      "Celebrate decades of togetherness with this regal gold-themed design. Perfect for silver and golden wedding anniversaries.",
    features: [
      "Elegant gold foil reveal",
      "Timeline of milestones",
      "Photo memory gallery",
      "Event details with map",
      "WhatsApp RSVP",
      "Add to Calendar",
      "Background music",
    ],
    thumbnail: "/images/templates/golden-kalyanam.svg",
    demoSlug: "golden-kalyanam-demo",
    palette: [
      { name: "Rich Gold", hex: "#a5731a" },
      { name: "Deep Maroon", hex: "#5c1129" },
      { name: "Cream", hex: "#fefdfb" },
    ],
  },
  {
    id: "tpl-005",
    slug: "griha-pravesam",
    title: "Auspicious Beginnings",
    category: "housewarming",
    tier: "Basic",
    price: 1499,
    description:
      "A warm, welcoming design for housewarming ceremonies. Earthy temple stone tones with auspicious kolam motifs at the threshold.",
    features: [
      "Doorway kolam animation",
      "Event details & timings",
      "Venue with Google Maps",
      "WhatsApp RSVP",
      "Add to Calendar",
      "Share functionality",
    ],
    thumbnail: "/images/templates/griha-pravesam.svg",
    demoSlug: "griha-pravesam-demo",
    palette: [
      { name: "Temple Stone", hex: "#b4977c" },
      { name: "Auspicious Red", hex: "#a51d47" },
      { name: "Sandstone", hex: "#f4f0eb" },
    ],
  },
  {
    id: "tpl-006",
    slug: "silk-and-gold",
    title: "Heirloom in Silk",
    category: "wedding",
    tier: "Luxury",
    price: 3499,
    description:
      "Inspired by the luxurious Kanjivaram silk saree. Rich silk textures, intricate zari-gold borders, and an opulent, immersive experience.",
    features: [
      "Silk drape reveal animation",
      "Animated zari border patterns",
      "Full photo story section",
      "Multi-ceremony schedule",
      "Live countdown",
      "Google Maps for each venue",
      "Background classical music",
      "Multi-step RSVP with meal preference",
      "Share & Add to Calendar",
    ],
    thumbnail: "/images/templates/silk-and-gold.svg",
    demoSlug: "silk-and-gold-demo",
    palette: [
      { name: "Silk Maroon", hex: "#7a1636" },
      { name: "Zari Gold", hex: "#e5c02a" },
      { name: "Royal Purple", hex: "#4a1942" },
    ],
  },
  {
    id: "tpl-007",
    slug: "rosewater-palace",
    title: "Rosewater Palace",
    category: "wedding",
    tier: "Luxury",
    price: 3499,
    description:
      "A rose-tinted Udaipur reverie: floating lanterns, soft palace silhouettes, and editorial serif details beneath a lavender dusk sky.",
    features: [
      "Lantern-lit palace artwork",
      "Airy editorial typography",
      "Live wedding countdown",
      "Two-day celebration schedule",
      "Google Maps directions",
      "WhatsApp RSVP & sharing",
      "Add to Calendar",
    ],
    thumbnail: "/images/templates/rosewater-palace.png",
    heroImage: "/images/templates/rosewater-palace.png",
    heroTextTone: "dark",
    demoSlug: "rosewater-palace-demo",
    palette: [
      { name: "Rosewater Blush", hex: "#d69a9e" },
      { name: "Dusk Lavender", hex: "#a995c5" },
      { name: "Antique Champagne", hex: "#c4a46d" },
    ],
    theme: {
      main: "#806071",
      accent: "#c4a46d",
      surface: "#fff8f2",
      surfaceAlt: "#f5e9e7",
      ink: "#543746",
      muted: "#836b78",
      petalColors: ["#e6a5a8", "#f5d6c9", "#c7b0d5", "#fff0db", "#d9bd80"],
    },
  },
  {
    id: "tpl-008",
    slug: "moonlit-jharokha",
    title: "Moonlit Jharokha",
    category: "wedding",
    tier: "Luxury",
    price: 3499,
    description:
      "A moonlit royal invitation framed in fine gold florals, with a quiet palace lake, glowing lanterns, and deep plum skies.",
    features: [
      "Moonlit palace artwork",
      "Gold floral frame details",
      "Live wedding countdown",
      "Ceremony-by-ceremony itinerary",
      "Google Maps directions",
      "WhatsApp RSVP & sharing",
      "Add to Calendar",
    ],
    thumbnail: "/images/templates/moonlit-jharokha.png",
    heroImage: "/images/templates/moonlit-jharokha.png",
    heroTextTone: "light",
    demoSlug: "moonlit-jharokha-demo",
    palette: [
      { name: "Palace Plum", hex: "#4c213b" },
      { name: "Lantern Gold", hex: "#d4a45f" },
      { name: "Moonlit Ivory", hex: "#f3e6d9" },
    ],
    theme: {
      main: "#4c213b",
      accent: "#d4a45f",
      surface: "#fbf3e9",
      surfaceAlt: "#eadbcf",
      ink: "#3a182d",
      muted: "#806578",
      petalColors: ["#d68578", "#edc7a7", "#d5a260", "#ad7c93", "#f2dec5"],
    },
  },
];

export function getTemplateBySlug(slug: string): Template | undefined {
  return templates.find((t) => t.slug === slug);
}

export function getTemplateById(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}

export function getTemplatesByCategory(category: string): Template[] {
  if (category === "all") return templates;
  return templates.filter((t) => t.category === category);
}
