"use client";

/**
 * DuskCover — the photographic cover from the "dusk" design pass:
 * a misty temple courtyard at dusk, a veil that melts into the paper
 * below, and hand-hung lanterns swaying in the evening air.
 *
 * Replaces the rose-court palace parallax as the cover experience:
 *  - photograph + veil are static; only the lanterns sway
 *  - content fades up once the page is ready (html.go), or when an
 *    invitation's seal gate lifts (waitForGate)
 *
 * `tone` follows a template's heroTextTone: "dark" sets ink type over
 * the photo's bright mist band; "light" sets ivory type behind a
 * deeper dusk scrim for image-led templates with darker artwork.
 */

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";

export interface DuskCoverProps {
  /** rendered inside .dusk-content — the headline block */
  children: ReactNode;
  /** section id (default top) */
  id?: string;
  /** vertical placement of the content block (default bottom) */
  align?: "center" | "bottom";
  /** photograph to cover with (defaults to the dusk courtyard) */
  src?: string;
  /** text tone over the photo — ink or ivory */
  tone?: "dark" | "light";
  /** invitation covers sit behind the seal gate: let it add html.go */
  waitForGate?: boolean;
  /** small scroll cue pinned to the bottom edge (omit to hide) */
  cueLabel?: string;
}

export default function DuskCover({
  children,
  id = "top",
  align = "bottom",
  src = "/images/atelier/dusk.jpg",
  tone = "dark",
  waitForGate = false,
  cueLabel,
}: DuskCoverProps) {
  const cueRef = useRef<HTMLDivElement | null>(null);

  /* entrance gate: reveal as soon as the page is visible — unless a
     seal gate owns the reveal moment */
  useEffect(() => {
    if (waitForGate) return;

    const go = () => document.documentElement.classList.add("go");
    let timer: number | undefined;
    const start = () => {
      timer = window.setTimeout(go, 500);
    };
    if (document.visibilityState === "visible") start();
    else {
      const onVis = () => {
        if (document.visibilityState === "visible") {
          document.removeEventListener("visibilitychange", onVis);
          start();
        }
      };
      document.addEventListener("visibilitychange", onVis);
    }
    const fallback = window.setTimeout(go, 6000);
    return () => {
      if (timer) window.clearTimeout(timer);
      window.clearTimeout(fallback);
    };
  }, [waitForGate]);

  /* the scroll cue fades out as soon as the guest moves */
  useEffect(() => {
    const cue = cueRef.current;
    if (!cue || !cueLabel) return;

    const onScroll = () => {
      const vh = window.innerHeight;
      cue.style.opacity = `${(1 - Math.min(1, (window.scrollY || 0) / (vh * 0.35))) * 0.8}`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [cueLabel]);

  return (
    <header
      className={`dusk dusk-${align}${tone === "light" ? " tone-light" : ""}`}
      id={id}
    >
      <Image
        className="sky"
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center 42%" }}
      />
      <div className="veil" aria-hidden="true" />

      {/* hand-hung lanterns */}
      <span className="lantern" aria-hidden="true" style={{ left: "12%", top: "18%", animationDelay: "0s" }} />
      <span className="lantern" aria-hidden="true" style={{ left: "78%", top: "12%", animationDelay: ".4s", width: 22, height: 34 } as CSSProperties} />
      <span className="lantern" aria-hidden="true" style={{ left: "88%", top: "28%", animationDelay: "1s" } as CSSProperties} />

      <div className="dusk-content">{children}</div>

      {cueLabel && (
        <div className="scrollcue" ref={cueRef} aria-hidden="true">
          <div className="cue-in">
            {cueLabel}
            <i />
          </div>
        </div>
      )}
    </header>
  );
}
