import Image from "next/image";
import { CalendarDays, Clock, MapPin } from "lucide-react";

/**
 * PhonePreview — a living invitation shrunk to palm size. Purely
 * illustrative, so the whole device is hidden from assistive tech; the
 * real sample link sits beside it.
 */
export default function PhonePreview() {
  return (
    <div className="phone-stage" aria-hidden="true">
      <span className="phone-note note-1">
        <span className="dot">
          <Clock size={12} />
        </span>
        <span>
          <b>Live countdown</b>
          Every second, until the muhurtham
        </span>
      </span>

      <span className="phone-note note-2">
        <span className="dot">
          <MapPin size={12} />
        </span>
        <span>
          <b>Maps &amp; calendar</b>
          The route, in one tap
        </span>
      </span>

      <div className="phone">
        <div className="phone-screen">
          <div className="phone-hero">
            <Image
              src="/images/atelier/mandap.jpg"
              alt=""
              fill
              sizes="292px"
              style={{ objectPosition: "center 55%" }}
            />
            <div className="phone-hero-copy">
              <span className="phone-eyebrow">The wedding of</span>
              <span className="phone-names">
                Karthik <em>&amp;</em> Meenakshi
              </span>
              <span className="phone-date">14 February 2027 · Chennai</span>
            </div>
          </div>

          <div className="phone-body">
            <div className="phone-count">
              <span>
                <b>208</b>Days
              </span>
              <span>
                <b>09</b>Hrs
              </span>
              <span>
                <b>41</b>Min
              </span>
              <span>
                <b>02</b>Sec
              </span>
            </div>

            <div className="phone-event">
              <span>Muhurtham</span>
              <b>9:15 AM</b>
            </div>
            <div className="phone-event">
              <span>Reception</span>
              <b>6:30 PM</b>
            </div>
            <div className="phone-event">
              <span>
                <CalendarDays size={9} style={{ display: "inline", marginRight: 4 }} />
                Add to calendar
              </span>
              <b>Feb 14</b>
            </div>

            <div className="phone-rsvp">RSVP on WhatsApp</div>
          </div>
        </div>
      </div>
    </div>
  );
}
