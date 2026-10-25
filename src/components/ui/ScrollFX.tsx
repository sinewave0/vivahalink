"use client";

/**
 * ScrollFX — the reveal engine for the rose-court design language.
 *
 * Elements tagged `.rv` (gentle rise) or `.arch` (panel float-in) start
 * hidden and gain `.in` when they enter the viewport. This mirrors the
 * reference invitation's IntersectionObserver, adapted for React:
 *
 *  - <ScrollFX /> mounts once per route and observes whatever exists.
 *  - useReveal(deps) re-runs observation when its deps change, for
 *    client-filtered lists (e.g. the template gallery) that mint new
 *    `.arch` cards after mount.
 */

import { useEffect } from "react";

const observePage = () => {
  const nodes = document.querySelectorAll<HTMLElement>(".rv:not(.in),.arch:not(.in)");
  if (!("IntersectionObserver" in window) || nodes.length === 0) {
    nodes.forEach((n) => n.classList.add("in"));
    return () => undefined;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -6% 0px" }
  );

  nodes.forEach((n) => io.observe(n));
  return () => io.disconnect();
};

export function useReveal(deps: unknown[] = []) {
  useEffect(() => observePage(), deps);
}

export default function ScrollFX() {
  useReveal();
  return null;
}
