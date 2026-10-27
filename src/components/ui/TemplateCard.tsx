import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Template } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { waLink, waMessages } from "@/lib/constants";
import TemplateArt from "./TemplateArt";

/**
 * TemplateCard — the collection's repeating unit. The artwork keeps its
 * arch, but sits in a flat editorial frame: kicker, name, one line of
 * description, price and two clear moves.
 */
export default function TemplateCard({
  template,
  feature = false,
  badge,
  index = 0,
  className = "",
}: {
  template: Template;
  feature?: boolean;
  badge?: string;
  index?: number;
  className?: string;
}) {
  return (
    <article
      className={`tcard rv ${feature ? "tcard-feature" : ""} ${className}`.trim()}
      style={{ "--d": `${(index % 3) * 0.07}s` } as React.CSSProperties}
    >
      <Link
        href={`/events/${template.demoSlug}`}
        target="_blank"
        rel="noopener"
        aria-label={`Open the live ${template.title} invitation`}
        className="tcard-art"
        style={{ "--tint": template.palette[1]?.hex ?? "var(--paper)" } as React.CSSProperties}
      >
        {badge ? <span className="tcard-badge">{badge}</span> : null}
        <TemplateArt template={template} />
        <span className="tcard-view" aria-hidden="true">
          Live preview <ArrowUpRight size={13} />
        </span>
      </Link>

      <div className="tcard-body">
        <p className="tcard-kicker">
          <span>
            {template.category} · {template.tier}
          </span>
          <span className="pdots" aria-label="Palette">
            {template.palette.map((c) => (
              <span key={c.hex} title={c.name} style={{ backgroundColor: c.hex }} />
            ))}
          </span>
        </p>

        <h3>{template.title}</h3>
        <p className="tcard-desc">{template.description}</p>

        <div className="tcard-foot">
          <p className="tcard-price">{formatPrice(template.price)}</p>
          <div className="tcard-actions">
            <Link
              href={`/events/${template.demoSlug}`}
              target="_blank"
              rel="noopener"
              className="text-link"
            >
              Preview
            </Link>
            <a
              href={waLink(waMessages.order(template.title))}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Order
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
