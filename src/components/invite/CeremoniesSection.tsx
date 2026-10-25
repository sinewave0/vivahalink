"use client";

import type { InvitationData } from "@/lib/types";
import { generateCalendarLink } from "@/lib/utils";
import { ceremonyIcon, ARCH_TINTS } from "./ceremony-art";

interface Day {
  key: string;
  date: string;
  label: string;
  weekday: string;
  items: InvitationData["ceremonies"];
}

function groupByDay(ceremonies: InvitationData["ceremonies"]): Day[] {
  const days: Day[] = [];
  for (const c of ceremonies) {
    const weekday = new Date(`${c.date}T00:00:00+05:30`).toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "long",
    });
    const label = new Date(`${c.date}T00:00:00+05:30`).toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    let day = days.find((d) => d.date === c.date);
    if (!day) {
      day = { key: c.date, date: c.date, label, weekday, items: [] };
      days.push(day);
    }
    day.items.push(c);
  }
  return days;
}

/** "9:15 AM" → big "9:15" + small-caps "AM" */
function splitTime(time: string): [string, string] {
  const m = time.match(/^(\d{1,2}:\d{2})\s*(.*)$/);
  if (!m) return [time, ""];
  return [m[1], m[2]];
}

/**
 * The celebrations — every ceremony an arch panel hung on a gold
 * thread, grouped under sticky day banners, exactly like the reference
 * invitation's event journey.
 */
export default function CeremoniesSection({ invitation }: { invitation: InvitationData }) {
  const days = groupByDay(invitation.ceremonies);
  const couple = `${invitation.coupleName1} & ${invitation.coupleName2}`;
  let tintIndex = 0;

  return (
    <section className="gthread" id="events">
      <div className="wrap head-block">
        <h2 className="rv">
          <span className="tamil">மாங்கலிக நிகழ்ச்சிகள்</span>
          The Celebrations
        </h2>
        <p className="small rv" style={{ "--d": ".06s" } as React.CSSProperties}>
          Every ceremony, every venue — so you never miss a moment.
        </p>
      </div>

      {days.map((day) => (
        <div className="day" key={day.key}>
          <div className="day-banner">
            {day.weekday} <b>·</b> {day.label}
          </div>

          {day.items.map((c) => {
            const tint = ARCH_TINTS[tintIndex++ % ARCH_TINTS.length];
            const [big, meridiem] = splitTime(c.time);
            const cal = generateCalendarLink({
              title: `${c.name} | ${couple}`,
              date: c.date,
              time: c.time,
              venue: c.venue,
              address: c.address,
              description: c.description,
            });

            return (
              <article className="panel" key={`${day.key}-${c.name}`}>
                <div className="when rv">
                  <div className="big">
                    {big}
                    {meridiem && <em>{meridiem}</em>}
                  </div>
                  <div className="sm">
                    {day.weekday} · {day.label.replace(/ \d{4}$/, "")}
                  </div>
                  {c.description && <p className="note">{c.description}</p>}
                </div>

                <div className="arch" style={{ "--tint": tint } as React.CSSProperties}>
                  <div className="arch-in">
                    <div className="ic">{ceremonyIcon(c.name)}</div>
                    <h3>{c.name}</h3>
                    <p className="dd">
                      {day.weekday} · {day.label.replace(/ \d{4}$/, "")}
                    </p>
                    <p className="tm">{c.time}</p>
                    <p className="vn">{c.venue}</p>
                    <div className="btns">
                      <a
                        className="btn solid"
                        href={c.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        See the route
                      </a>
                      <a className="btn" href={cal} target="_blank" rel="noopener noreferrer">
                        Add to calendar
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ))}
    </section>
  );
}
