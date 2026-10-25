import { Template } from "@/lib/types";

export const templates: Template[] = [
  {
    id: "tpl-001",
    slug: "mangala-isai",
    title: "Saffron Hour",
    category: "wedding",
    tier: "Premium",
    price: 1899,
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
    title: "Mogra Note",
    category: "wedding",
    tier: "Luxury",
    price: 2499,
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
    title: "Sunlit Feast",
    category: "wedding",
    tier: "Basic",
    price: 999,
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
    title: "Afterglow",
    category: "anniversary",
    tier: "Premium",
    price: 1599,
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
    title: "New Doorway",
    category: "housewarming",
    tier: "Basic",
    price: 899,
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
    title: "Heirloom Silk",
    category: "wedding",
    tier: "Luxury",
    price: 2999,
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
