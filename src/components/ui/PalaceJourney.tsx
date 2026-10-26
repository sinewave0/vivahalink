"use client";

/**
 * PalaceJourney — the cover experience from the "rose court" design
 * language: a dusk sky, floating lanterns, and a layered Rajput-style
 * palace that parallaxes over a long scroll distance while the couple
 * (or brand) names rise to the top of the page.
 *
 * Ported from the reference invitation aesthetic and rebuilt as React:
 *  - deterministic (seeded) detail generation, so SSR markup == client
 *  - layout + lantern field are built imperatively on mount/resize
 *  - scroll parallax runs inside a single rAF-callback scroll handler
 */

import { useEffect, useRef, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* helpers                                                              */
/* ------------------------------------------------------------------ */

/** mulberry32 — tiny deterministic PRNG so markup is stable for hydration */
function makeRng(seed: number) {
  let a = seed | 0;
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

function archPath(x: number, b: number, w: number, h: number) {
  const r = w / 2;
  return `M${x} ${b}V${b - h + r}A${r} ${r} 0 0 1 ${x + w} ${b - h + r}V${b}Z`;
}

/* ------------------------------------------------------------------ */
/* generated palace details (deterministic, module scope)               */
/* ------------------------------------------------------------------ */

const CREST = Array.from({ length: 20 }, (_, i) => ({
  d: `M${300 + i * 42} 1790q21 -34 42 0z`,
}));

const CHHATRIS: Array<[number, number]> = [
  [170, 1840],
  [1270, 1840],
  [520, 1790],
  [920, 1790],
];

const UPPER_MAIN = [480, 600, 720, 840, 960].map((c) => ({
  arch: archPath(c - 52, 2250, 104, 260),
  inner: archPath(c - 38, 2180, 76, 150),
  balc: { x: c - 52, y: 2190 },
  rail: { x: c - 56, y: 2182 },
}));

const UPPER_SIDE = [150, 230, 310, 1130, 1210, 1290];
const UPPER_PILLARS = [540, 660, 780, 900];

const LOWER_MAIN = [480, 600, 720, 840, 960].map((c) => ({
  arch: archPath(c - 56, 3150, 112, 600),
  inner: archPath(c - 38, 3150, 76, 470),
  door: { x: c - 30, y: 2860 },
}));

const LOWER_SIDE = [120, 230, 340, 1100, 1210, 1320];
const LOWER_PILLARS = [540, 660, 780, 900];

const SHRUB_POTS: Array<[number, number]> = [
  [400, 2990],
  [1040, 2990],
];

const CORBELS = [420, 550, 680, 810, 940];

const RIPPLES = (() => {
  const rng = makeRng(3);
  return Array.from({ length: 14 }, () => ({
    x: 380 + rng() * 680,
    y: 3120 + rng() * 360,
    rx: 40 + rng() * 90,
    ry: 3 + rng() * 3,
    delay: (-rng() * 5).toFixed(1),
  }));
})();

const BUSH_SPOTS: Array<[number, number]> = [
  [60, 2930],
  [190, 2946],
  [1380, 2930],
  [1250, 2946],
];

/* ------------------------------------------------------------------ */
/* lantern field (built imperatively; markup mirrors the reference)     */
/* ------------------------------------------------------------------ */

function lanternSVG(k: number) {
  const g = `lg${k % 3}`;
  return (
    `<svg viewBox="-50 -40 200 215" aria-hidden="true"><circle cx="50" cy="70" r="100" fill="url(#lglow)"/>` +
    `<path d="M16 24h68l8 84c-14 12-30 18-42 18S22 120 8 108z" fill="url(#${g})"/>` +
    `<path d="M16 24h68l8 84c-14 12-30 18-42 18S22 120 8 108z" fill="url(#linner)"/>` +
    `<path d="M34 26l-8 100M50 26v102M66 26l8 100" stroke="#c9733f" stroke-opacity=".28" stroke-width="1.2" fill="none"/>` +
    `<ellipse cx="50" cy="24" rx="34" ry="8" fill="#ffe7b0"/><ellipse cx="50" cy="24" rx="28" ry="5.5" fill="#ffd27a"/>` +
    `<ellipse cx="50" cy="112" rx="40" ry="10" fill="#ff9a62" opacity=".35"/></svg>`
  );
}

/* ------------------------------------------------------------------ */
/* component                                                            */
/* ------------------------------------------------------------------ */

export interface PalaceJourneyProps {
  /** rendered inside .hero-names — the rising headline block */
  children: ReactNode;
  /** scroll cue label (default SCROLL) */
  cueLabel?: string;
  /** section id (default top) */
  id?: string;
  /** compact mode: reduces journey scroll distance by ~25% */
  compact?: boolean;
}

type LanternMeta = { el: HTMLDivElement; k: number };

export default function PalaceJourney({
  children,
  cueLabel = "Scroll",
  id = "top",
  compact = false,
}: PalaceJourneyProps) {
  const journeyRef = useRef<HTMLElement | null>(null);
  const palwrapRef = useRef<HTMLDivElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);
  const gFarRef = useRef<SVGGElement | null>(null);
  const gMidRef = useRef<SVGGElement | null>(null);
  const lanternsRef = useRef<LanternMeta[]>([]);
  const tickingRef = useRef(false);

  /* entrance gate: reveal as soon as the page is visible */
  useEffect(() => {
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
  }, []);

  /* layout, lantern field, scroll + resize wiring */
  useEffect(() => {
    const journey = journeyRef.current;
    const palwrap = palwrapRef.current;
    const layer = layerRef.current;
    const cue = cueRef.current;
    const gFar = gFarRef.current;
    const gMid = gMidRef.current;
    if (!journey || !palwrap || !layer || !cue) return;

    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let S = 1;
    let H = 3000;

    const layout = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      S = Math.max(vw / 1440, 0.56);
      const topOff = Math.round(0.76 * vh - 922 * S);
      const sw = 1440 * S;
      const sh = 3500 * S;
      palwrap.style.width = `${sw}px`;
      palwrap.style.height = `${sh}px`;
      palwrap.style.left = `${(vw - sw) / 2}px`;
      palwrap.style.top = `${topOff}px`;
      // Keep the cinematic reveal, but avoid an overly stretched cover.
      if (compact) {
        H = Math.max(Math.round(topOff + sh * 0.56), Math.round(vh * 1.15));
        journey.style.height = `${H}px`;
        layer.style.height = `${H + vh * 0.4}px`;
      } else {
        H = Math.max(topOff + sh * 0.75, vh * 1.25);
        journey.style.height = `${H}px`;
        layer.style.height = `${H + vh * 0.55}px`;
      }
      cue.style.top = `${vh - 84}px`;
    };

    const buildLanterns = () => {
      layer.innerHTML = "";
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rng = makeRng(11);
      const total = H + vh * (compact ? 0.7 : 0.95);
      const base = clamp(vw * 0.13, 84, 200);
      const n = Math.round((total / vh) * (vw < 700 ? 8 : (compact ? 13 : 17)));
      lanternsRef.current = [];
      for (let i = 0; i < n; i++) {
        const d = Math.pow(rng(), 1.3);
        const w = base * (0.26 + 0.95 * d);
        const x = rng() * 96;
        const y = rng() * (total - vh * 0.2);

        const lp = document.createElement("div");
        lp.className = "lp";
        lp.style.left = `${x}%`;
        lp.style.top = `${y}px`;
        lp.style.width = `${w}px`;

        const lr = document.createElement("div");
        lr.className = "lr";
        lr.style.setProperty("--delay", `${(0.1 + rng() * 2.2).toFixed(2)}s`);

        const ls = document.createElement("div");
        ls.className = "ls";
        ls.style.setProperty("--r", `${((rng() - 0.5) * 16).toFixed(1)}deg`);
        ls.style.setProperty("--dur", `${(5.5 + rng() * 5).toFixed(1)}s`);
        ls.style.setProperty("--sd", `${(-rng() * 6).toFixed(1)}s`);
        ls.innerHTML = lanternSVG(i);

        lr.appendChild(ls);
        lp.appendChild(lr);
        layer.appendChild(lp);
        lanternsRef.current.push({ el: lp, k: 0.34 * (1 - d) });
      }
    };

    const onScroll = () => {
      const y = window.scrollY || 0;
      const vh = window.innerHeight;
      if (!reduce) {
        const farRate = compact ? 0.46 : 0.36;
        const midRate = compact ? 0.10 : 0.08;
        if (gFar) gFar.style.transform = `translateY(${((y * farRate) / S).toFixed(1)}px)`;
        if (gMid) gMid.style.transform = `translateY(${((y * midRate) / S).toFixed(1)}px)`;
        for (const lan of lanternsRef.current) {
          lan.el.style.transform = `translate3d(0,${(y * lan.k).toFixed(1)}px,0)`;
        }
      }
      const fadeStart = compact ? H - vh * 0.95 : H - 1.25 * vh;
      const fadeSpan = compact ? vh * 1.0 : vh * 1.4;
      const f = clamp((y - fadeStart) / fadeSpan, 0, 1);
      layer.style.opacity = (1 - f * f).toFixed(3);
      layer.style.visibility = f >= 1 ? "hidden" : "visible";
      cue.style.opacity = `${(1 - clamp(y / (vh * 0.35), 0, 1)) * 0.8}`;
      tickingRef.current = false;
    };

    const onResize = () => {
      layout();
      buildLanterns();
      onScroll();
    };

    layout();
    buildLanterns();
    onScroll();

    const onScrollTick = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(onScroll);
      }
    };

    window.addEventListener("scroll", onScrollTick, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScrollTick);
      window.removeEventListener("resize", onResize);
    };
  }, [compact]);

  return (
    <header className={`journey ${compact ? "journey-compact" : ""}`} id={id} ref={journeyRef}>
      <div className="palwrap" ref={palwrapRef}>
        <svg id="palace" viewBox="0 0 1440 3500" preserveAspectRatio="xMidYMin meet" aria-hidden="true">
          <defs>
            <linearGradient id="fac" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f8e3cd" />
              <stop offset="1" stopColor="#efcdb2" />
            </linearGradient>
            <linearGradient id="fac2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f2d6bd" />
              <stop offset="1" stopColor="#e5bfa4" />
            </linearGradient>
            <linearGradient id="archIn" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8c7192" />
              <stop offset="0.6" stopColor="#b88b9b" />
              <stop offset="1" stopColor="#d6ada8" />
            </linearGradient>
            <linearGradient id="domeG" x1="0" x2="1">
              <stop offset="0" stopColor="#e6c6ac" />
              <stop offset="0.45" stopColor="#fdf0dd" />
              <stop offset="1" stopColor="#ddb79c" />
            </linearGradient>
            <linearGradient id="pavG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fae6d2" />
              <stop offset="1" stopColor="#eec7b3" />
            </linearGradient>
            <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f2dabf" />
              <stop offset="1" stopColor="#e3c0a1" />
            </linearGradient>
            <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#d4ebe4" />
              <stop offset="1" stopColor="#9ccfc6" />
            </linearGradient>
            <radialGradient id="cloudG" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <g id="miniProto">
              <rect x="-46" y="-62" width="92" height="62" fill="url(#pavG)" />
              <path d="M-30 0V-34a30 30 0 0 1 60 0V0z" fill="#b98593" opacity="0.6" />
              <rect x="-56" y="-74" width="112" height="14" rx="3" fill="#d49b84" />
              <path d="M-46 -74C-46 -112 -22 -134 0 -150 22 -134 46 -112 46 -74z" fill="url(#domeG)" />
              <ellipse cx="0" cy="-152" rx="7" ry="5" fill="#c98a72" />
              <path d="M0 -156V-176" stroke="#c98a72" strokeWidth="3.5" strokeLinecap="round" />
            </g>
            <pattern id="baluP" width="28" height="74" patternUnits="userSpaceOnUse">
              <path d="M14 2c5 0 6 6 3 9 4 3 7 6 7 14 0 6-4 9-5 15 3 3 5 6 5 12 0 4-1 8-1 10H5c0-2-1-6-1-10 0-6 2-9 5-12-1-6-5-9-5-15 0-8 3-11 7-14-3-3-2-9 3-9z" fill="#edd0bd" />
            </pattern>
            <pattern id="diaP" width="26" height="22" patternUnits="userSpaceOnUse">
              <path d="M13 2l10 9-10 9-10-9z" fill="#c98a72" opacity="0.75" />
            </pattern>
            <pattern id="dentP" width="22" height="16" patternUnits="userSpaceOnUse">
              <rect x="3" y="0" width="12" height="12" fill="#d49b84" opacity="0.7" />
            </pattern>
            <linearGradient id="lg0" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff0c4" />
              <stop offset="0.45" stopColor="#ffc77a" />
              <stop offset="1" stopColor="#ff9a62" />
            </linearGradient>
            <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff6d6" />
              <stop offset="0.5" stopColor="#ffdc8a" />
              <stop offset="1" stopColor="#ffb56a" />
            </linearGradient>
            <linearGradient id="lg2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffe9dc" />
              <stop offset="0.5" stopColor="#ffb99c" />
              <stop offset="1" stopColor="#f58f84" />
            </linearGradient>
            <radialGradient id="lglow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#fff4c8" stopOpacity="0.9" />
              <stop offset="0.5" stopColor="#ffd48a" stopOpacity="0.3" />
              <stop offset="1" stopColor="#ffd48a" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="linner" cx="0.5" cy="0.55" r="0.5">
              <stop offset="0" stopColor="#fffbe6" stopOpacity="0.95" />
              <stop offset="1" stopColor="#fffbe6" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* FAR: clouds and hills (slowest) */}
          <g ref={gFarRef}>
            <ellipse cx="260" cy="700" rx="360" ry="70" fill="url(#cloudG)" />
            <ellipse cx="1180" cy="520" rx="420" ry="80" fill="url(#cloudG)" />
            <ellipse cx="760" cy="1150" rx="460" ry="80" fill="url(#cloudG)" />
            <ellipse cx="200" cy="1500" rx="340" ry="64" fill="url(#cloudG)" />
            <ellipse cx="1280" cy="1350" rx="380" ry="70" fill="url(#cloudG)" />
            <path d="M-40 1940C160 1840 320 1900 520 1870S860 1800 1080 1860 1360 1830 1500 1880V2300H-40Z" fill="#b7a6d3" opacity="0.55" />
            <path d="M-40 2010C220 1930 400 1990 640 1960S1000 1920 1220 1980 1400 1960 1500 1990V2300H-40Z" fill="#c9afcc" opacity="0.7" />
          </g>

          {/* MID: facade */}
          <g ref={gMidRef}>
            <g>
              {CHHATRIS.map(([x, y], i) => (
                <use key={i} href="#miniProto" transform={`translate(${x} ${y}) scale(.9)`} />
              ))}
            </g>
            {CREST.map((c, i) => (
              <path key={i} d={c.d} fill="#e8c0a6" />
            ))}
            <rect x="0" y="1850" width="1440" height="1750" fill="url(#fac)" />
            <rect x="300" y="1790" width="840" height="70" fill="#f1d3b9" />
            <rect x="0" y="1840" width="1440" height="22" fill="#d9a78b" />
            <rect x="300" y="1784" width="840" height="10" fill="#d9a78b" />
            <rect x="0" y="2330" width="1440" height="34" fill="#d9a78b" />
            <rect x="0" y="2364" width="1440" height="22" fill="url(#dentP)" />
            <rect x="0" y="2386" width="1440" height="1100" fill="url(#fac2)" />
            {/* upper storey */}
            <g>
              {UPPER_MAIN.map((u, i) => (
                <g key={i}>
                  <path d={u.arch} fill="url(#archIn)" />
                  <path d={u.arch} fill="none" stroke="#d9a78b" strokeWidth={8} />
                  <path d={u.inner} fill="#d9b4ae" opacity={0.35} />
                  <rect {...u.balc} width={104} height={60} fill="url(#baluP)" />
                  <rect {...u.rail} width={112} height={8} fill="#e3b9a3" />
                </g>
              ))}
              {UPPER_SIDE.map((c) => (
                <g key={c}>
                  <path d={archPath(c - 30, 2160, 60, 150)} fill="#9a84a4" />
                  <path d={archPath(c - 30, 2160, 60, 150)} fill="none" stroke="#d9a78b" strokeWidth={6} />
                  {[1, 2, 3].map((j) => (
                    <line key={j} x1={c - 30 + j * 15} y1={2020} x2={c - 30 + j * 15} y2={2160} stroke="#d9a78b" strokeWidth={2} opacity={0.7} />
                  ))}
                  <line x1={c - 30} y1={2100} x2={c + 30} y2={2100} stroke="#d9a78b" strokeWidth={2} opacity={0.7} />
                </g>
              ))}
              {UPPER_PILLARS.map((x) => (
                <rect key={x} x={x - 8} y={1990} width={16} height={260} fill="#ecc9b0" />
              ))}
            </g>
            {/* lower storey */}
            <g>
              {LOWER_MAIN.map((u, i) => (
                <g key={i}>
                  <path d={u.arch} fill="url(#archIn)" />
                  <path d={u.arch} fill="none" stroke="#d9a78b" strokeWidth={9} />
                  <path d={u.inner} fill="#e0b9b4" opacity={0.28} />
                  <rect {...u.door} width={60} height={290} fill="#4a3752" opacity={0.5} />
                </g>
              ))}
              {LOWER_SIDE.map((c) => (
                <g key={c}>
                  <path d={archPath(c - 42, 3150, 84, 520)} fill="url(#archIn)" />
                  <path d={archPath(c - 42, 3150, 84, 520)} fill="none" stroke="#d9a78b" strokeWidth={7} />
                  <rect x={c - 22} y={2900} width={44} height={250} fill="#4a3752" opacity={0.45} />
                </g>
              ))}
              {LOWER_PILLARS.map((x) => (
                <rect key={x} x={x - 9} y={2540} width={18} height={610} fill="#ecc9b0" />
              ))}
            </g>
            {/* shrubs in pots */}
            {SHRUB_POTS.map(([px, py], i) => (
              <g key={i}>
                <rect x={px - 26} y={py - 30} width={52} height={34} rx={6} fill="#d49b84" />
                {[
                  [0, -60, 44],
                  [-26, -44, 32],
                  [26, -44, 32],
                  [0, -86, 28],
                ].map(([dx, dy, r], j) => (
                  <circle key={j} cx={px + dx} cy={py + dy} r={r} fill="#a9c2a2" />
                ))}
              </g>
            ))}
          </g>

          {/* FRONT: pavilion, balcony, courtyard (fastest) */}
          <g>
            {/* balcony wall below pavilion */}
            <rect x="360" y="1790" width="720" height="160" fill="url(#fac)" />
            <rect x="340" y="1770" width="760" height="30" rx="4" fill="#d9a78b" />
            <g>
              {CORBELS.map((x) => (
                <g key={x}>
                  <path d={archPath(x, 1938, 100, 128)} fill="url(#archIn)" opacity={0.9} />
                  <path d={archPath(x, 1938, 100, 128)} fill="none" stroke="#d9a78b" strokeWidth={6} />
                </g>
              ))}
            </g>
            <rect x="360" y="1938" width="720" height="26" rx="3" fill="#d9a78b" />
            {/* balustrade */}
            <rect x="380" y="1686" width="680" height="10" fill="#e3b9a3" />
            <rect x="380" y="1696" width="680" height="74" fill="url(#baluP)" />
            <rect x="380" y="1760" width="680" height="12" fill="#e3b9a3" />
            {/* pavilion body */}
            <rect x="440" y="1330" width="560" height="360" fill="url(#pavG)" />
            <g fill="#ebc7b0">
              <rect x="440" y="1330" width="34" height="360" />
              <rect x="966" y="1330" width="34" height="360" />
              <rect x="576" y="1330" width="44" height="360" />
              <rect x="820" y="1330" width="44" height="360" />
            </g>
            <path d="M490 1690V1480a42 42 0 0 1 84 0V1690z" fill="url(#archIn)" />
            <path d="M866 1690V1480a42 42 0 0 1 84 0V1690z" fill="url(#archIn)" />
            <path d="M620 1690V1440a100 100 0 0 1 200 0V1690z" fill="url(#archIn)" />
            <path d="M632 1690V1442a88 88 0 0 1 176 0V1690z" fill="none" stroke="#e8c9b4" strokeWidth={3} opacity={0.8} />
            <path d="M620 1440a100 100 0 0 1 200 0" fill="none" stroke="#d9a78b" strokeWidth={8} />
            <path d="M490 1480a42 42 0 0 1 84 0M866 1480a42 42 0 0 1 84 0" fill="none" stroke="#d9a78b" strokeWidth={6} />
            {/* eave */}
            <path d="M396 1334H1044L1012 1292H428Z" fill="#d49b84" />
            <rect x="396" y="1334" width="648" height="8" fill="#b97d70" />
            <rect x="440" y="1342" width="560" height="14" fill="url(#dentP)" />
            {/* drum and dome */}
            <rect x="470" y="1214" width="500" height="80" fill="#f6ddc8" />
            <rect x="470" y="1238" width="500" height="26" fill="url(#diaP)" />
            <path d="M456 1216C456 1118 566 1050 720 1004c154 46 264 114 264 212z" fill="url(#domeG)" />
            <g fill="none" stroke="#d8b79b" strokeWidth={2.5} opacity={0.85}>
              <path d="M720 1004C690 1070 676 1150 676 1216" />
              <path d="M720 1004C750 1070 764 1150 764 1216" />
              <path d="M720 1004C640 1050 590 1130 580 1216" />
              <path d="M720 1004C800 1050 850 1130 860 1216" />
              <path d="M720 1004C610 1040 530 1120 508 1216" />
              <path d="M720 1004C830 1040 910 1120 932 1216" />
            </g>
            <ellipse cx="720" cy="1002" rx="22" ry="11" fill="#c98a72" />
            <ellipse cx="720" cy="982" rx="12" ry="15" fill="#d9a07f" />
            <path d="M720 968V926" stroke="#c98a72" strokeWidth={5} strokeLinecap="round" />
            <circle cx="720" cy="922" r={7} fill="#e3b58b" />
            <use href="#miniProto" transform="translate(446 1294) scale(.62)" />
            <use href="#miniProto" transform="translate(994 1294) scale(.62)" />

            {/* courtyard */}
            <rect x="0" y="3010" width="1440" height="520" fill="url(#ground)" />
            <rect x="0" y="3006" width="1440" height="10" fill="#e7c6a8" />
            <path d="M300 3080H1140L1380 3500H60Z" fill="#efd3a9" />
            <path d="M312 3094H1128L1346 3500H94Z" fill="url(#water)" />
            <g>
              {RIPPLES.map((r, i) => (
                <ellipse key={i} className="shim" style={{ "--sd": `${r.delay}s` } as React.CSSProperties} cx={r.x} cy={r.y} rx={r.rx} ry={r.ry} fill="#fff" />
              ))}
            </g>
            <g transform="translate(0 190)">
              <ellipse cx="720" cy="3150" rx="150" ry="34" fill="#e1b995" />
              <ellipse cx="720" cy="3142" rx="132" ry="28" fill="#bfe3dc" />
              <rect x="702" y="3040" width="36" height="102" fill="#e3bd9a" />
              <ellipse cx="720" cy="3064" rx="76" ry="18" fill="#e8c6a4" />
              <ellipse cx="720" cy="3060" rx="64" ry="13" fill="#cdeae4" />
              <path d="M708 3042h24l-4-30h-16z" fill="#e3bd9a" />
              <g fill="none" stroke="#fff" strokeWidth={3.5} strokeLinecap="round">
                <path className="jet" style={{ "--jd": "0s" } as React.CSSProperties} d="M720 3012C720 2980 720 2960 720 2950" />
                <path className="jet" style={{ "--jd": ".3s" } as React.CSSProperties} d="M720 3014C700 2960 664 2960 650 3050" />
                <path className="jet" style={{ "--jd": ".6s" } as React.CSSProperties} d="M720 3014C740 2960 776 2960 790 3050" />
                <path className="jet" style={{ "--jd": ".9s" } as React.CSSProperties} d="M720 3014C690 2975 630 2985 612 3062" />
                <path className="jet" style={{ "--jd": "1.2s" } as React.CSSProperties} d="M720 3014C750 2975 810 2985 828 3062" />
              </g>
            </g>
            <g transform="translate(0 120)">
              <rect x="0" y="2900" width="250" height="74" fill="url(#baluP)" />
              <rect x="0" y="2892" width="250" height="10" fill="#e3b9a3" />
              <rect x="0" y="2970" width="250" height="10" fill="#e3b9a3" />
              <rect x="1190" y="2900" width="250" height="74" fill="url(#baluP)" />
              <rect x="1190" y="2892" width="250" height="10" fill="#e3b9a3" />
              <rect x="1190" y="2970" width="250" height="10" fill="#e3b9a3" />
              {BUSH_SPOTS.map(([px, py], i) => (
                <g key={i}>
                  {[
                    [0, 0, 60],
                    [-40, 12, 44],
                    [44, 12, 44],
                  ].map(([dx, dy, r], j) => (
                    <circle key={j} cx={px + dx} cy={py + dy} r={r} fill="#9fba98" />
                  ))}
                  <circle cx={px + 8} cy={py - 8} r={33} fill="#b6ceae" />
                </g>
              ))}
            </g>
          </g>
        </svg>
      </div>

      {/* lantern field (populated imperatively) */}
      <div className="lantern-layer" aria-hidden="true" ref={layerRef} />

      {/* rising names + caller content */}
      <div className="hero-names rise">
        {children}
      </div>

      {/* scroll cue */}
      <div className="scrollcue" ref={cueRef}>
        <div className="cue-in">
          {cueLabel}
          <i />
        </div>
      </div>
    </header>
  );
}
