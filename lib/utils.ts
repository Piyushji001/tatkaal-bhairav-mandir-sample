import { seasons, temple, type Season } from "@/data/temple";

export function waLink(message: string) {
  return `https://wa.me/${temple.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** No phone number — opens WhatsApp's own contact/share picker so a devotee can send the link to anyone. */
export function shareLink() {
  const message = `${temple.jaikara}\n${temple.nameEn}, ${temple.city} — darshan and aarti timings, puja booking and directions:\n${temple.siteUrl}`;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export function telLink() {
  return `tel:${temple.phone.replace(/\s/g, "")}`;
}

/** "16:30" -> "4:30 PM" */
export function fmt(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

const mins = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** Current time in India, independent of the visitor's device timezone */
export function nowInIndia(d = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    month: "numeric",
    hour12: false,
  }).formatToParts(d);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return { month: get("month"), minutes: (get("hour") % 24) * 60 + get("minute") };
}

export function currentSeason(month: number): Season {
  return seasons.find((s) => s.months.includes(month)) ?? seasons[0];
}

export type Status = { open: boolean; text: string };

export function templeStatus(season: Season, minutes: number): Status {
  const open = mins(season.open);
  const close = mins(season.close);
  const bFrom = season.breakFrom ? mins(season.breakFrom) : null;
  const bTo = season.breakTo ? mins(season.breakTo) : null;

  if (minutes < open) return { open: false, text: `Closed now, opens at ${fmt(season.open)}` };
  if (minutes >= close) return { open: false, text: `Closed now, opens at ${fmt(season.open)}` };
  if (bFrom !== null && bTo !== null && minutes >= bFrom && minutes < bTo)
    return { open: false, text: `Afternoon break, reopens at ${fmt(season.breakTo!)}` };
  if (bFrom !== null && minutes < bFrom) return { open: true, text: `Open now until ${fmt(season.breakFrom!)}` };
  return { open: true, text: `Open now until ${fmt(season.close)}` };
}

export function nextAarti(season: Season, minutes: number) {
  return season.aartis.find((a) => mins(a.time) > minutes) ?? null;
}
