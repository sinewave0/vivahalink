// Simple classname merge (no dependency needed)
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}

// Format price in INR
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Calculate countdown
export function getCountdown(targetDate: string) {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    isOver: false,
  };
}

// Generate Google Calendar link
export function generateCalendarLink(params: {
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  description?: string;
}): string {
  const timezone = "Asia/Kolkata";
  const startDate = new Date(`${params.date}T${convertTo24h(params.time)}+05:30`);
  const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // +3 hours

  const fmt = (date: Date) => {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    }).formatToParts(date);
    const value = (type: Intl.DateTimeFormatPartTypes) =>
      parts.find((part) => part.type === type)?.value ?? "00";
    return `${value("year")}${value("month")}${value("day")}T${value("hour")}${value("minute")}${value("second")}`;
  };

  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", params.title);
  url.searchParams.set("dates", `${fmt(startDate)}/${fmt(endDate)}`);
  url.searchParams.set("ctz", timezone);
  url.searchParams.set("location", `${params.venue}, ${params.address}`);
  url.searchParams.set("details", params.description || "");

  return url.toString();
}

function convertTo24h(time12h: string): string {
  const [time, modifier] = time12h.split(" ");
  const [parsedHours, minutes] = time.split(":").map(Number);
  let hours = parsedHours;

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00`;
}
