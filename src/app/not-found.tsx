import Link from "next/link";
import { Mandala, Divider } from "@/components/ui/decor";

export default function NotFound() {
  return (
    <div className="paper" style={{ minHeight: "100dvh", display: "grid", placeItems: "center", padding: "48px 16px" }}>
      <div className="wrap" style={{ textAlign: "center", maxWidth: 620 }}>
        <Mandala glyph="ॐ" />
        <p className="label" style={{ marginBottom: 8 }}>
          404 · the thread leads nowhere
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.2rem,7vw,3.6rem)",
            color: "var(--ink)",
            lineHeight: 1.08,
          }}
        >
          This page wandered off with the procession
        </h1>
        <Divider style={{ display: "block", width: 160, margin: "26px auto" }} />
        <p className="small" style={{ maxWidth: "36ch", marginInline: "auto" }}>
          The link may be mistyped, or the invitation has been taken down.
          Let&apos;s walk you back to the mandap.
        </p>
        <div className="btns" style={{ marginTop: 32 }}>
          <Link href="/" className="btn solid">
            Back home
          </Link>
          <Link href="/templates" className="btn">
            Browse designs
          </Link>
        </div>
      </div>
    </div>
  );
}
