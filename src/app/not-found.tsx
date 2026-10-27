import Image from "next/image";
import Link from "next/link";
import BrandMark from "@/components/ui/BrandMark";

export default function NotFound() {
  return (
    <div className="notfound">
      <Image
        className="notfound-bg"
        src="/images/atelier/dusk.jpg"
        alt=""
        fill
        sizes="100vw"
        priority
      />
      <div className="notfound-inner">
        <BrandMark className="brandmark" />
        <span className="code" aria-hidden="true">
          404
        </span>
        <h1>This page left with the procession.</h1>
        <p>
          The link may be mistyped, or the invitation has been taken down.
          Let&apos;s walk you back to the courtyard.
        </p>
        <div className="notfound-actions">
          <Link href="/" className="btn on-gold">
            Back home
          </Link>
          <Link href="/templates" className="btn ghost-light">
            Browse the collection
          </Link>
        </div>
      </div>
    </div>
  );
}
