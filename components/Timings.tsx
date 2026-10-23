"use client";
import { useEffect, useState } from "react";
import { seasons } from "@/data/temple";
import { currentSeason, fmt, nextAarti, nowInIndia, templeStatus, type Status } from "@/lib/utils";

export function OpenStatus() {
  const [status, setStatus] = useState<Status | null>(null);
  useEffect(() => {
    const tick = () => {
      const { month, minutes } = nowInIndia();
      setStatus(templeStatus(currentSeason(month), minutes));
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  if (!status) return <span className="status">Opens daily at 4:00 AM</span>;
  return (
    <span className={status.open ? "status status--open" : "status"}>
      <span className="status__dot" aria-hidden="true" />
      {status.text}
    </span>
  );
}

export function TimingsTable() {
  const [minutes, setMinutes] = useState<number | null>(null);

  useEffect(() => {
    const { minutes } = nowInIndia();
    setMinutes(minutes);
  }, []);

  const season = seasons[0];
  const upcoming = minutes !== null ? nextAarti(season, minutes) : null;

  return (
    <div className="timings">
      <dl className="timings__hours">
        <div><dt>Temple opens</dt><dd>{fmt(season.open)}</dd></div>
        {season.breakFrom && season.breakTo && (
          <div><dt>Afternoon break</dt><dd>{fmt(season.breakFrom)} to {fmt(season.breakTo)}</dd></div>
        )}
        <div><dt>Temple closes</dt><dd>{fmt(season.close)}</dd></div>
      </dl>
      <ol className="aarti-list">
        {season.aartis.map((a) => (
          <li key={a.name} className={upcoming?.name === a.name ? "is-next" : ""}>
            <span className="aarti-list__time">{fmt(a.time)}</span>
            <span className="aarti-list__name">{a.name} <span className="hi">{a.hi}</span></span>
            {upcoming?.name === a.name && <span className="aarti-list__tag">Next</span>}
          </li>
        ))}
      </ol>
      <p className="note">Timings change on festival days.</p>
    </div>
  );
}
