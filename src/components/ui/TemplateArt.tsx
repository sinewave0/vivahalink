import type { Template } from "@/lib/types";
import { getInvitationTheme } from "@/lib/invitation-theme";
import { getDemoEvent } from "@/data/demo-events";

/**
 * TemplateArt — a miniature invitation card drawn in each template's own
 * palette. Rendered as inline SVG so it stays crisp inside every arch
 * frame, on every screen, and needs no image file.
 */

const PETALS = Array.from({ length: 16 }, (_, i) => i * 22.5);

export default function TemplateArt({ template }: { template: Template }) {
  const theme = getInvitationTheme(template);
  const demo = getDemoEvent(template.demoSlug);
  const a = demo?.coupleName1 ?? "Your";
  const b = demo?.coupleName2 ?? "Names";
  const date = demo
    ? new Date(demo.weddingDate)
        .toLocaleDateString("en-IN", {
          timeZone: "Asia/Kolkata",
          day: "numeric",
          month: "short",
          year: "numeric",
        })
        .toUpperCase()
    : "YOUR DATE";

  return (
    <svg
      viewBox="0 0 300 380"
      role="img"
      aria-label={`${template.title} invitation preview`}
      style={{ display: "block", width: "100%", height: "100%" }}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`sky-${template.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={theme.surfaceAlt} />
          <stop offset="1" stopColor={theme.surface} />
        </linearGradient>
        <radialGradient id={`halo-${template.id}`} cx="0.5" cy="0.34" r="0.55">
          <stop offset="0" stopColor={theme.accent} stopOpacity="0.42" />
          <stop offset="1" stopColor={theme.accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`arch-${template.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={theme.main} stopOpacity="0.15" />
          <stop offset="1" stopColor={theme.main} stopOpacity="0.5" />
        </linearGradient>
      </defs>

      <rect width="300" height="380" fill={`url(#sky-${template.id})`} />
      <rect width="300" height="380" fill={`url(#halo-${template.id})`} />

      {/* mandala */}
      <g
        transform="translate(150 118) scale(0.52)"
        fill="none"
        stroke={theme.accent}
        strokeWidth="2.2"
        opacity="0.6"
      >
        {PETALS.map((angle) => (
          <ellipse key={angle} cx="0" cy="-58" rx="9" ry="26" transform={`rotate(${angle})`} />
        ))}
        <circle r="30" />
      </g>

      {/* skyline of arches */}
      <g fill={`url(#arch-${template.id})`}>
        <path d="M0 380V300h300v80z" />
        <path d="M20 300V232a40 40 0 0 1 80 0v68z" />
        <path d="M200 300V232a40 40 0 0 1 80 0v68z" />
        <path d="M110 300V214a40 40 0 0 1 80 0v86z" />
      </g>
      <g fill="none" stroke={theme.accent} strokeWidth="1.6" opacity="0.8">
        <path d="M20 300V232a40 40 0 0 1 80 0v68z" />
        <path d="M200 300V232a40 40 0 0 1 80 0v68z" />
        <path d="M110 300V214a40 40 0 0 1 80 0v86z" />
      </g>

      {/* frame */}
      <rect
        x="9"
        y="9"
        width="282"
        height="362"
        rx="140"
        ry="26"
        fill="none"
        stroke={theme.accent}
        strokeWidth="1.4"
        opacity="0.75"
      />

      {/* names */}
      <text
        x="150"
        y="212"
        textAnchor="middle"
        fontSize="31"
        letterSpacing="1.5"
        fill={theme.ink}
        style={{ fontFamily: "var(--font-display)", textTransform: "uppercase" }}
      >
        {a}
      </text>
      <text
        x="150"
        y="238"
        textAnchor="middle"
        fontSize="11"
        letterSpacing="7"
        fill={theme.accent}
        style={{ fontFamily: "var(--font-label)", textTransform: "uppercase" }}
      >
        WEDS
      </text>
      <text
        x="150"
        y="272"
        textAnchor="middle"
        fontSize="31"
        letterSpacing="1.5"
        fill={theme.ink}
        style={{ fontFamily: "var(--font-display)", textTransform: "uppercase" }}
      >
        {b}
      </text>

      <text
        x="150"
        y="330"
        textAnchor="middle"
        fontSize="8"
        letterSpacing="3.4"
        fill={theme.muted}
        style={{ fontFamily: "var(--font-label)" }}
      >
        {date}
      </text>
    </svg>
  );
}
