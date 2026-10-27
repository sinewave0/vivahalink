/**
 * Ceremony icons — fine-line 48×48 glyphs in the engraved style of the
 * rose-court design language, plus a keyword matcher that picks the
 * right motif for a ceremony name.
 */

import type { ReactNode } from "react";

const wrap = (paths: ReactNode) => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    {paths}
  </svg>
);

export const CEREMONY_ICONS: Record<string, ReactNode> = {
  flame: wrap(
    <>
      <path d="M9 40h30M13 40v-6h22v6" />
      <path d="M24 6c-6 7-9 11-9 16a9 9 0 0 0 18 0c0-5-3-9-9-16z" />
      <path d="M24 19c-3 3-4 5-4 7a4 4 0 0 0 8 0c0-2-1-4-4-7z" />
    </>
  ),
  rings: wrap(
    <>
      <circle cx="19" cy="26" r="10" />
      <circle cx="30" cy="26" r="10" />
      <path d="M24 8l4 6h-8z" />
      <path d="M22 14h4l3 5h-10z" />
    </>
  ),
  music: wrap(
    <>
      <path d="M18 36V12l19-4v24" />
      <circle cx="13.5" cy="36" r="4.5" />
      <circle cx="32.5" cy="32" r="4.5" />
      <path d="M18 19l19-4" />
    </>
  ),
  oil: wrap(
    <>
      <path d="M24 5c7 9 11 14 11 19a11 11 0 0 1-22 0c0-5 4-10 11-19z" />
      <path d="M19 27a5 5 0 0 0 5 5" />
      <path d="M10 42h28" />
    </>
  ),
  feast: wrap(
    <>
      <path d="M15 6v13M11 6v9a4 4 0 0 0 8 0V6M15 19v23" />
      <path d="M33 6c-4 4-5 10-5 16h5v20" />
      <path d="M33 6v16" />
    </>
  ),
  kalash: wrap(
    <>
      <path d="M14 22c0 11 4 19 10 19s10-8 10-19z" />
      <path d="M15 22h18M18 41h12" />
      <circle cx="24" cy="14.5" r="5" />
      <path d="M18 16c-4-2-7-6-7-10 4 1 7 3 8 7M30 16c4-2 7-6 7-10-4 1-7 3-8 7" />
    </>
  ),
  turban: wrap(
    <>
      <path d="M9 30c0-11 6-18 15-18s15 7 15 18z" />
      <path d="M9 30h30v6H9z" />
      <path d="M14 20c8-2 14 2 21 8M16 14c7 0 13 3 18 9" />
      <path d="M24 12V6M24 6c4-1 6 1 6 3" />
    </>
  ),
  bunting: wrap(
    <>
      <path d="M3 11q21 12 42 0" />
      <path d="M9 15l4 11 4-8M20 19l4 11 4-11M31 18l4 11 4-14" />
      <circle cx="10" cy="38" r="2" />
      <circle cx="24" cy="41" r="2" />
      <circle cx="38" cy="37" r="2" />
    </>
  ),
  chakra: wrap(
    <>
      <circle cx="24" cy="24" r="15" />
      <circle cx="24" cy="24" r="3.5" />
      <path d="M24 9v11M24 28v11M9 24h11M28 24h11M13.4 13.4l7.8 7.8M26.8 26.8l7.8 7.8M34.6 13.4l-7.8 7.8M21.2 26.8l-7.8 7.8" />
    </>
  ),
};

type IconKey = keyof typeof CEREMONY_ICONS;

const MATCHERS: Array<[RegExp, IconKey]> = [
  [/muhurtham|panigrahan|phere|pheras|varmala|wedding|vivaha|thaali|thaali kattu|nikah/i, "flame"],
  [/sangeet|music|mehfil|reception|concert|dance/i, "music"],
  [/haldi|telbaan|oil|nalangu|vritham/i, "oil"],
  [/nichayathartham|engagement|betrothal|ring|varmala/i, "rings"],
  [/lunch|feast|virundhu|bhoj|dinner|annadhanam|banquet|swaruchi/i, "feast"],
  [/griha|pravesam|housewarm|threshold|sthapana|vinayak/i, "kalash"],
  [/janavasam|procession|nikasi|samela|baraat|mahera|carnival|chakbhat|welcome/i, "bunting"],
  [/renewal|vow|anniversary|golden|silver/i, "rings"],
  [/story|memory|photo|gallery/i, "chakra"],
];

export function ceremonyIcon(name: string): ReactNode {
  for (const [re, key] of MATCHERS) {
    if (re.test(name)) return CEREMONY_ICONS[key];
  }
  return CEREMONY_ICONS.kalash;
}

/** Rotating arch tints so a long schedule never feels repetitive. */
export const ARCH_TINTS = ["#f2ddd2", "#f5e6ce", "#e4e7d5", "#efe0d6", "#eadcc9", "#f4e0d6"];
