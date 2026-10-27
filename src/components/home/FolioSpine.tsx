"use client";

import { useEffect, useState } from "react";

const CHAPTERS = [
  { id: "top", n: "01", label: "Cover" },
  { id: "atelier", n: "02", label: "Atelier" },
  { id: "collection", n: "03", label: "Collection" },
  { id: "inside", n: "04", label: "Invitation" },
  { id: "how-it-works", n: "05", label: "Process" },
  { id: "faq", n: "06", label: "Notes" },
] as const;

/**
 * A fixed folio index for the home page. It only appears on wide screens,
 * where the storefront has room to read like a bound invitation rather
 * than a stack of marketing sections.
 */
export default function FolioSpine() {
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    const nodes = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-38% 0px -48% 0px", threshold: [0.1, 0.25, 0.5] },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <nav className="folio-spine" aria-label="Page chapters">
      {CHAPTERS.map((c) => (
        <a
          key={c.id}
          href={`#${c.id}`}
          className={active === c.id ? "is-active" : undefined}
          aria-current={active === c.id ? "true" : undefined}
        >
          <span className="folio-n">{c.n}</span>
          <span className="folio-label">{c.label}</span>
        </a>
      ))}
    </nav>
  );
}
