import { getTemplateById } from "./templates";
import type { InvitationData, Template } from "@/lib/types";

/**
 * Demo invitation data — one per template in src/data/templates.ts.
 * Each `slug` matches a template's `demoSlug`, powering /events/[slug] and /invite/[slug].
 *
 * All couples, families and venues below are fictional placeholder content.
 * When real customer invitations are added in a future version, follow the same
 * InvitationData shape and extend the lookup helpers below (keeping any
 * `next/navigation` usage inside the server page, not here).
 */
export const demoEvents: InvitationData[] = [
  {
    slug: "mangala-isai-demo",
    templateId: "tpl-001",
    coupleName1: "Karthik",
    coupleName2: "Meenakshi",
    tagline: "Two souls, one sacred flame",
    weddingDate: "2027-02-14T09:15:00+05:30",
    story:
      "Karthik and Meenakshi first met at the Kapaleeshwarar Temple festival in Mylapore. What began as a chance encounter over filter coffee became a beautiful journey of shared laughter, late-night phone calls, and a love that felt written in the stars. With the blessings of their families, they are ready to begin their forever.",
    photos: [
      "/images/demo/couple-1.svg",
      "/images/demo/couple-2.svg",
      "/images/demo/couple-3.svg",
    ],
    family1: "Son of Mr. Raghunathan & Mrs. Lakshmi, Chennai",
    family2: "Daughter of Mr. Sundaramoorthy & Mrs. Parvathi, Madurai",
    ceremonies: [
      {
        name: "Nichayathartham",
        date: "2027-02-12",
        time: "6:00 PM",
        venue: "Sri Lakshmi Mahal",
        address: "42, East Mada Street, Mylapore, Chennai 600004",
        mapUrl: "https://maps.google.com/?q=Sri+Lakshmi+Mahal+Mylapore+Chennai",
        description: "Engagement ceremony with both families",
      },
      {
        name: "Muhurtham",
        date: "2027-02-14",
        time: "9:15 AM",
        venue: "Arulmigu Kapaleeshwarar Temple Hall",
        address: "Kapaleeshwarar Temple, Mylapore, Chennai 600004",
        mapUrl: "https://maps.google.com/?q=Kapaleeshwarar+Temple+Chennai",
        description: "Sacred wedding ceremony — tying of the Thaali",
      },
      {
        name: "Wedding Reception",
        date: "2027-02-14",
        time: "6:30 PM",
        venue: "The Grand Margazhi Hall",
        address: "15, Cathedral Road, Gopalapuram, Chennai 600086",
        mapUrl: "https://maps.google.com/?q=Cathedral+Road+Gopalapuram+Chennai",
        description: "Dinner reception with music and celebrations",
      },
    ],
  },
  {
    slug: "jasmine-garland-demo",
    templateId: "tpl-002",
    coupleName1: "Ananya",
    coupleName2: "Vikram",
    tagline: "A garland of small moments, tied forever",
    weddingDate: "2027-06-24T10:30:00+05:30",
    story:
      "Ananya and Vikram grew up three streets apart in Madurai, yet met an ocean away at a college Diwali night in Melbourne. Years of shared magazines, milk-tea runs and long flights later, Vikram proposed under the same jasmine vines his grandmother planted in their family garden. They are marrying where it all began — in the city that raised them.",
    photos: [
      "/images/demo/couple-2.svg",
      "/images/demo/couple-3.svg",
      "/images/demo/couple-1.svg",
    ],
    family1: "Son of Dr. Ramesh & Mrs. Kanmani, Madurai",
    family2: "Daughter of Mr. Thirunavukkarasu & Mrs. Selvi, Madurai",
    ceremonies: [
      {
        name: "Janavasam",
        date: "2027-06-23",
        time: "5:30 PM",
        venue: "Alagar Koil East Street",
        address: "Alagar Koil Main Road, Madurai 625301",
        mapUrl: "https://maps.google.com/?q=Alagar+Kovil+Madurai",
        description: "Groom's traditional procession & welcome",
      },
      {
        name: "Muhurtham",
        date: "2027-06-24",
        time: "10:30 AM",
        venue: "Sri Meenakshi Sundareswarar Wedding Hall",
        address: "West Masi Street, Madurai 625001",
        mapUrl: "https://maps.google.com/?q=Meenakshi+Temple+Madurai",
        description: "The sacred wedding ceremony",
      },
      {
        name: "Reception",
        date: "2027-06-24",
        time: "7:00 PM",
        venue: "Heritage Grand Madurai",
        address: "100 Feet Road, Anaiyur, Madurai 625017",
        mapUrl: "https://maps.google.com/?q=Anaiyur+Madurai",
        description: "An evening of blessings, dinner & music",
      },
    ],
  },
  {
    slug: "banana-leaf-demo",
    templateId: "tpl-003",
    coupleName1: "Divya",
    coupleName2: "Gokul",
    tagline: "Simple hearts. Big celebration.",
    weddingDate: "2026-11-27T08:00:00+05:30",
    story:
      "Divya and Gokul met as colleagues in a Coimbatore startup, arguing over the last piece of ghee roast at the office canteen. Five years, one dog named Podi, and countless filter coffees later, Gokul proposed at their favourite roadside tea stall. Their wedding will be exactly like them — warm, joyful, and surrounded by good food.",
    photos: [
      "/images/demo/couple-3.svg",
      "/images/demo/couple-1.svg",
      "/images/demo/couple-2.svg",
    ],
    family1: "Son of Mr. Mohanakrishnan & Mrs. Usha, Coimbatore",
    family2: "Daughter of Mr. Subramani & Mrs. Vasanthi, Tiruppur",
    ceremonies: [
      {
        name: "Muhurtham",
        date: "2026-11-27",
        time: "8:00 AM",
        venue: "Kalyana Sundara Mahal",
        address: "Avinashi Road, Peelamedu, Coimbatore 641004",
        mapUrl: "https://maps.google.com/?q=Avinashi+Road+Coimbatore",
        description: "The wedding ceremony & Thaali Kattu",
      },
      {
        name: "Virundhu Virunthu (Lunch)",
        date: "2026-11-27",
        time: "12:30 PM",
        venue: "Kalyana Sundara Mahal — Dining Hall",
        address: "Avinashi Road, Peelamedu, Coimbatore 641004",
        mapUrl: "https://maps.google.com/?q=Avinashi+Road+Coimbatore",
        description: "Grand feast served on banana leaf",
      },
      {
        name: "Reception",
        date: "2026-11-28",
        time: "6:00 PM",
        venue: "Le Merigot Gardens",
        address: "Race Course, Coimbatore 641018",
        mapUrl: "https://maps.google.com/?q=Race+Course+Coimbatore",
        description: "Evening reception with dinner",
      },
    ],
  },
  {
    slug: "golden-kalyanam-demo",
    templateId: "tpl-004",
    coupleName1: "Meenakshi",
    coupleName2: "Raghavan",
    tagline: "Twenty-five years of togetherness, one golden evening",
    weddingDate: "2026-12-20T18:30:00+05:30",
    story:
      "In 2001, Meenakshi and Raghavan tied the thaali on a rainy December morning in Trichy, with a two-hour muhurtham, a borrowed speaker, and a hall full of cousins. Since then: two children, one pharmacy shop, forty houseplants, and a thousand small kindnesses. This December, their children are hosting the celebration — to renew their vows and honour the love none of us would exist without.",
    photos: [
      "/images/demo/anniversary-1.svg",
      "/images/demo/anniversary-2.svg",
    ],
    family1: "Hosted by Rithika & Harish",
    family2: "Hosted by Aditya & Sneha",
    ceremonies: [
      {
        name: "Renewal of Vows & Blessings",
        date: "2026-12-20",
        time: "6:30 PM",
        venue: "Amma Mandapam Gardens",
        address: "Rockfort Shore, Srirangam, Tiruchirappalli 620006",
        mapUrl: "https://maps.google.com/?q=Srirangam+Trichy",
        description: "Traditional vow renewal with family blessings",
      },
      {
        name: "Golden Jubilee Dinner",
        date: "2026-12-20",
        time: "8:00 PM",
        venue: "Femina Grand Hall",
        address: "Thillai Nagar Main Road, Tiruchirappalli 620018",
        mapUrl: "https://maps.google.com/?q=Thillai+Nagar+Trichy",
        description: "Dinner, music & memory-sharing",
      },
    ],
  },
  {
    slug: "griha-pravesam-demo",
    templateId: "tpl-005",
    coupleName1: "Selvam",
    coupleName2: "Devi",
    tagline: "A new threshold. New beginnings.",
    weddingDate: "2027-01-17T07:30:00+05:30",
    story:
      "After eleven years of renting in Erode, Selvam and Devi are turning the key of their very first home — a sunny little house in Salem that Devi sketched on a bus ticket a decade ago. Built brick by brick with their savings, it carries a tulsi in the courtyard and room enough for everyone. Come begin this new chapter with us.",
    photos: ["/images/demo/home-1.svg", "/images/demo/home-2.svg"],
    family1: "Hosted by the Selvam Family",
    family2: "With the blessings of our elders",
    ceremonies: [
      {
        name: "Griha Pravesam",
        date: "2027-01-17",
        time: "7:30 AM",
        venue: "New Family Residence",
        address: "Plot 14, Vinayaga Nagar, Fairlands, Salem 636016",
        mapUrl: "https://maps.google.com/?q=Fairlands+Salem",
        description: "Auspicious first entry into the new home",
      },
      {
        name: "Welcome Ritual & Prayer",
        date: "2027-01-17",
        time: "9:00 AM",
        venue: "New Family Residence — Courtyard",
        address: "Plot 14, Vinayaga Nagar, Fairlands, Salem 636016",
        mapUrl: "https://maps.google.com/?q=Fairlands+Salem",
        description: "A welcome ritual, blessing ceremony and house prayers",
      },
      {
        name: "Annadhanam (Lunch)",
        date: "2027-01-17",
        time: "12:00 PM",
        venue: "New Family Residence — Lawn",
        address: "Plot 14, Vinayaga Nagar, Fairlands, Salem 636016",
        mapUrl: "https://maps.google.com/?q=Fairlands+Salem",
        description: "Lunch with family, friends & neighbours",
      },
    ],
  },
  {
    slug: "silk-and-gold-demo",
    templateId: "tpl-006",
    coupleName1: "Swetha",
    coupleName2: "Ram",
    tagline: "Woven together, like silk and gold",
    weddingDate: "2027-08-19T09:00:00+05:30",
    story:
      "Swetha is a textile artist; Ram is a photographer who came to document her work and never left. Between colour, craft and camera shutters, they found a partnership as intricate as a hand-finished border. Their wedding is an ode to the creativity that brought them together — every detail woven with love.",
    photos: [
      "/images/demo/couple-1.svg",
      "/images/demo/couple-2.svg",
      "/images/demo/couple-3.svg",
    ],
    family1: "Son of Mr. Ramaswamy & Mrs. Gowri, Chennai",
    family2: "Daughter of Mr. Chinnadurai & Mrs. Meenambal, Kanchipuram",
    ceremonies: [
      {
        name: "Vritham & Nalangu",
        date: "2027-08-18",
        time: "6:00 PM",
        venue: "The Loom Courtyard, Gandhi Road",
        address: "Gandhi Road, Kanchipuram 631502",
        mapUrl: "https://maps.google.com/?q=Gandhi+Road+Kanchipuram",
        description: "Pre-wedding rituals & family celebrations",
      },
      {
        name: "Muhurtham",
        date: "2027-08-19",
        time: "9:00 AM",
        venue: "Sri Kamakshi Amman Wedding Hall",
        address: "Kamakshi Amman Sannadhi Street, Kanchipuram 631502",
        mapUrl: "https://maps.google.com/?q=Kamakshi+Amman+Temple+Kanchipuram",
        description: "Sacred wedding ceremony in the goddess's town",
      },
      {
        name: "Silk & Gold Reception",
        date: "2027-08-21",
        time: "6:30 PM",
        venue: "The Chola Ballroom",
        address: "63, Anna Salai, Guindy, Chennai 600032",
        mapUrl: "https://maps.google.com/?q=Anna+Salai+Guindy+Chennai",
        description: "Grand reception in the city",
      },
    ],
  },
  {
    slug: "rosewater-palace-demo",
    templateId: "tpl-007",
    coupleName1: "Aarav",
    coupleName2: "Meera",
    tagline: "A little Jaipur, a little Udaipur, and a whole lifetime of us.",
    weddingDate: "2027-02-15T12:15:00+05:30",
    story:
      "Aarav and Meera met on a rain-soaked evening in Jaipur, arguing over the last gulab jamun at a friend's dinner. A thousand train rides, voice notes, and shared sunsets later, they are gathering the people they love beside Lake Pichola to begin their next chapter.",
    photos: ["/images/demo/couple-1.svg", "/images/demo/couple-2.svg", "/images/demo/couple-3.svg"],
    family1: "With the blessings of the Rathore family",
    family2: "And the love of the Singhania family",
    ceremonies: [
      { name: "Mehfil by the Lake", date: "2027-02-14", time: "7:00 PM", venue: "The Courtyard at Pichola", address: "Haridasji Ki Magri, Udaipur, Rajasthan", mapUrl: "https://maps.google.com/?q=Lake+Pichola+Udaipur", description: "An evening of music, candlelight and old stories" },
      { name: "Varmala & The Pheras", date: "2027-02-15", time: "12:15 PM", venue: "The Palace Gardens", address: "Lake Pichola, Udaipur, Rajasthan", mapUrl: "https://maps.google.com/?q=Lake+Pichola+Udaipur", description: "A sacred promise beneath the winter sun" },
      { name: "A Moonlit Reception", date: "2027-02-15", time: "7:30 PM", venue: "The Palace Gardens", address: "Lake Pichola, Udaipur, Rajasthan", mapUrl: "https://maps.google.com/?q=Lake+Pichola+Udaipur", description: "Dinner, dancing and one more toast together" },
    ],
  },
  {
    slug: "moonlit-jharokha-demo",
    templateId: "tpl-008",
    coupleName1: "Ishaan",
    coupleName2: "Tara",
    tagline: "Under a thousand stars, one promise shines brightest.",
    weddingDate: "2027-11-21T18:30:00+05:30",
    story:
      "Tara first photographed Ishaan beneath the old jharokhas of Bundi. He returned the next morning with two cups of chai and a question about the light. Four years later, they are bringing their families to Udaipur for a celebration filled with moonlight, music and the same easy wonder.",
    photos: ["/images/demo/couple-3.svg", "/images/demo/couple-2.svg", "/images/demo/couple-1.svg"],
    family1: "The Khanna family warmly invites you",
    family2: "Together with the Iyer family",
    ceremonies: [
      { name: "Welcome & Sangeet", date: "2027-11-20", time: "6:30 PM", venue: "Jharokha Courtyard", address: "Ambamata, Udaipur, Rajasthan", mapUrl: "https://maps.google.com/?q=Ambamata+Udaipur", description: "A moonlit welcome with music and dinner" },
      { name: "Haldi & Blessings", date: "2027-11-21", time: "9:00 AM", venue: "The Garden Pavilion", address: "Lake Pichola, Udaipur, Rajasthan", mapUrl: "https://maps.google.com/?q=Lake+Pichola+Udaipur", description: "A bright morning with blessings from both families" },
      { name: "Wedding & Reception", date: "2027-11-21", time: "6:30 PM", venue: "The Palace Gardens", address: "Lake Pichola, Udaipur, Rajasthan", mapUrl: "https://maps.google.com/?q=Lake+Pichola+Udaipur", description: "The wedding ceremony followed by an evening reception" },
    ],
  },
];

export function getDemoEvent(slug: string): InvitationData | undefined {
  return demoEvents.find((e) => e.slug === slug);
}

/**
 * Resolve the invitation + template pair for a slug, or `null` when unknown.
 * Server pages call `notFound()` when null is returned.
 */
export function getInvitationWithTemplate(
  slug: string
): { invitation: InvitationData; template: Template } | null {
  const invitation = getDemoEvent(slug);
  if (!invitation) return null;
  const template = getTemplateById(invitation.templateId);
  if (!template) return null;
  return { invitation, template };
}
