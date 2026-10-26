export type Ceremony = {
  name: string;
  when: string;
  place: string;
  note: string;
};

export type Invite = {
  slug: string;
  a: string;
  b: string;
  date: string;
  iso: string;
  line: string;
  story: string;
  familyA: string;
  familyB: string;
  ceremonies: Ceremony[];
};

export const invites: Invite[] = [
  {
    slug: "karthik-meenakshi",
    a: "Karthik",
    b: "Meenakshi",
    date: "14 February 2027",
    iso: "2027-02-14T09:15:00+05:30",
    line: "Two souls, one sacred flame",
    story:
      "They met at the Kapaleeshwarar festival over a shared filter coffee. Years of late calls and one quiet yes later, both families gather in Mylapore.",
    familyA: "Son of Raghunathan & Lakshmi, Chennai",
    familyB: "Daughter of Sundaramoorthy & Parvathi, Madurai",
    ceremonies: [
      { name: "Nichayathartham", when: "12 Feb · 6:00 PM", place: "Sri Lakshmi Mahal, Mylapore", note: "Engagement with both families" },
      { name: "Muhurtham", when: "14 Feb · 9:15 AM", place: "Kapaleeshwarar Temple Hall", note: "Tying of the thaali" },
      { name: "Reception", when: "14 Feb · 6:30 PM", place: "The Grand Margazhi Hall", note: "Dinner and music" },
    ],
  },
  {
    slug: "ananya-vikram",
    a: "Ananya",
    b: "Vikram",
    date: "24 June 2027",
    iso: "2027-06-24T10:30:00+05:30",
    line: "A garland of small moments",
    story:
      "Three streets apart in Madurai, they met an ocean away. They are marrying under the jasmine his grandmother planted.",
    familyA: "Son of Dr. Ramesh & Kanmani",
    familyB: "Daughter of Thirunavukkarasu & Selvi",
    ceremonies: [
      { name: "Janavasam", when: "23 Jun · 5:30 PM", place: "Alagar Koil East Street", note: "Groom's procession" },
      { name: "Muhurtham", when: "24 Jun · 10:30 AM", place: "Meenakshi Sundareswarar Hall", note: "The wedding" },
      { name: "Reception", when: "24 Jun · 7:00 PM", place: "Heritage Grand Madurai", note: "Evening of blessings" },
    ],
  },
];

export const templates = [
  { title: "Saffron Hour", tier: "Premium", price: "₹1,899", mood: "Temple maroon and antique gold" },
  { title: "Mogra Note", tier: "Luxury", price: "₹2,499", mood: "Jasmine cream and night garden" },
  { title: "Sunlit Feast", tier: "Basic", price: "₹999", mood: "Banana leaf and turmeric" },
  { title: "Afterglow", tier: "Premium", price: "₹1,599", mood: "Anniversary gold" },
  { title: "New Doorway", tier: "Basic", price: "₹899", mood: "Griha pravesam stone" },
  { title: "Heirloom Silk", tier: "Luxury", price: "₹2,999", mood: "Kanjivaram zari" },
];

export const WA = "https://wa.me/919597886489?text=" + encodeURIComponent("Hi! I'd like a VivahaLink invitation.");
