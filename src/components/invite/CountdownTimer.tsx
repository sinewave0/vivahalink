"use client";

import { useEffect, useState } from "react";
import { getCountdown } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The lantern clock — four gold-rimmed pills counting to the moment,
 * in the shape of the reference invitation's countdown.
 */
export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  /* The clock runs only on the client. Rendering live seconds into the
     prerendered HTML (Cache Components serves that HTML for a week)
     guarantees a hydration mismatch — React aborts hydration and every
     client behaviour on the invitation (seal gate, RSVP, share, music)
     dies with it. Start empty, fill in after mount. */
  const [countdown, setCountdown] = useState<ReturnType<typeof getCountdown> | null>(null);

  useEffect(() => {
    /* Kick off on the next task instead of synchronously inside the effect:
       the first paint stays empty (hydration-safe) and the clock takes over
       immediately after mount. */
    const tick = () => setCountdown(getCountdown(targetDate));
    const kickoff = window.setTimeout(tick, 0);
    const timer = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(kickoff);
      window.clearInterval(timer);
    };
  }, [targetDate]);

  if (!countdown) {
    return (
      <div className="clock rv" role="timer" aria-live="off" aria-label="Countdown to the wedding">
        {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
          <div key={label}>
            <b>—</b>
            <span>{label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (countdown.isOver) {
    return (
      <p className="to" style={{ fontSize: "1.6rem", margin: 0 }}>
        Today is the day — welcome, and thank you for being here. 💛
      </p>
    );
  }

  const units: { label: string; value: string }[] = [
    { label: "Days", value: pad(countdown.days) },
    { label: "Hours", value: pad(countdown.hours) },
    { label: "Minutes", value: pad(countdown.minutes) },
    { label: "Seconds", value: pad(countdown.seconds) },
  ];

  return (
    <div className="clock rv" role="timer" aria-live="off" aria-label="Countdown to the wedding">
      {units.map((u) => (
        <div key={u.label}>
          <b>{u.value}</b>
          <span>{u.label}</span>
        </div>
      ))}
    </div>
  );
}
