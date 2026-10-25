"use client";

import { useEffect, useState } from "react";
import { getCountdown } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The lantern clock — four gold-rimmed pills counting to the moment,
 * in the shape of the reference invitation's countdown.
 */
export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [countdown, setCountdown] = useState(() => getCountdown(targetDate));

  useEffect(() => {
    const timer = setInterval(() => setCountdown(getCountdown(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

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
