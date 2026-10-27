import type { CSSProperties, ReactNode } from "react";

/**
 * SectionIntro — the shared editorial opening for every storefront
 * section: a hairline label, a display headline that can carry one
 * italic thought, and a measured lede below.
 */
export default function SectionIntro({
  label,
  title,
  lead,
  align = "left",
  tone = "dark",
  className = "",
  id,
  delay = 0.06,
}: {
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  id?: string;
  delay?: number;
}) {
  return (
    <div
      id={id}
      className={`section-intro rv ${align === "center" ? "center" : ""} ${
        tone === "light" ? "light" : ""
      } ${className}`.trim()}
    >
      <p className="label">{label}</p>
      <h2>{title}</h2>
      {lead ? (
        <p className="lead" style={{ "--d": `${delay}s` } as CSSProperties}>
          {lead}
        </p>
      ) : null}
    </div>
  );
}
