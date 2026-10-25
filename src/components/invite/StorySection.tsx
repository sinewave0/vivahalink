"use client";

import type { InvitationData } from "@/lib/types";
import { Monogram, PeacockStrip } from "@/components/ui/decor";

/**
 * The blessing spread — the couple's story set in card paper with
 * photos framed in arches, closing with a peacock procession.
 */
export default function StorySection({ invitation }: { invitation: InvitationData }) {
  const initials = `${invitation.coupleName1[0]}&${invitation.coupleName2[0]}`;
  const photos = invitation.photos.slice(0, 3);

  return (
    <section className="paper blessing" id="story">
      <div className="wrap">
        <Monogram letter={initials} sub={invitation.coupleName1.toUpperCase()} />

        {invitation.story && (
          <p
            className="rv note"
            style={
              {
                "--d": ".08s",
                maxWidth: "52ch",
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
              } as React.CSSProperties
            }
          >
            {invitation.story}
          </p>
        )}

        {photos.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "clamp(12px,2vw,20px)",
              marginTop: "clamp(30px,6vh,54px)",
            }}
          >
            {photos.map((src, i) => (
              <figure
                key={src}
                className="rv"
                style={
                  {
                    "--d": `${0.12 + i * 0.08}s`,
                    position: "relative",
                    width: "clamp(150px, 26vw, 210px)",
                    margin: 0,
                  } as React.CSSProperties
                }
              >
                <div
                  style={{
                    aspectRatio: "0.86",
                    borderRadius: "999px 999px 18px 18px",
                    overflow: "hidden",
                    border: "1px solid var(--gold-lite)",
                    boxShadow: "0 22px 44px -22px rgba(110,70,110,.5)",
                    background: "var(--ivory)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${invitation.coupleName1} & ${invitation.coupleName2} — photo ${i + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    loading="lazy"
                  />
                </div>
              </figure>
            ))}
          </div>
        )}

        <p className="small rv" style={{ "--d": ".16s", marginTop: "clamp(30px,6vh,54px)" } as React.CSSProperties}>
          Your presence and blessings are our greatest gift.
        </p>
      </div>

      <PeacockStrip />
    </section>
  );
}
