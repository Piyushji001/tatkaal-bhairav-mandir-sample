import type { Metadata } from "next";
import { TimingsTable } from "@/components/Timings";
import { nearby, temple } from "@/data/temple";
import { telLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Visit the temple",
  description: "How to reach Shri Tatkaal Bhairav Mandir near New Gate, Jaipur, darshan timings and what to know before you visit.",
};

export default function Visit() {
  return (
    <>
      <div className="container">
        <header className="page-head">
          <p className="kicker">दर्शन हेतु</p>
          <h1>Visiting the temple</h1>
          <p>{temple.address}</p>
        </header>
      </div>

      <section className="band" style={{ paddingTop: 8 }}>
        <div className="container visit">
          <iframe className="map" src={temple.mapsEmbed} title={`Map to ${temple.nameEn}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <div className="visit__text">
            <h2>Getting here</h2>
            <p>The temple is on Mirza Ismail Road just outside New Gate of the old walled city, opposite Ramniwas Bagh.</p>
            <p style={{ color: "var(--muted)" }}>TODO: parking tips, nearest metro / bus stop, auto fare from Jaipur Junction.</p>
            <div className="chips">{nearby.map((n) => <span key={n}>{n}</span>)}</div>
            <div className="btn-row">
              <a className="btn" href={temple.mapsLink}>Open in Google Maps</a>
              <a className="btn btn--ghost" href={telLink()}>Call the temple</a>
            </div>
          </div>
        </div>
      </section>

      <section className="band band--plaster">
        <div className="container">
          <div className="band__head"><h2>Before you come</h2></div>
          <div className="guide">
            <div><h3>Footwear</h3><p>Remove footwear before entering. TODO: where the footwear stand is.</p></div>
            <div><h3>Dress</h3><p>Modest clothing is appreciated.</p></div>
            <div><h3>Photography</h3><p>TODO: confirm whether photos of the sanctum are allowed.</p></div>
            <div><h3>Offerings</h3><p>TODO: what devotees usually offer, and whether it is available near the temple.</p></div>
            <div><h3>Quietest time</h3><p>Early morning after the temple opens at 4 AM is usually calm. Festival evenings are busiest.</p></div>
            <div><h3>Prasad and bhog</h3><p>Want to offer bhog? You can book it in advance so it is ready when you arrive.</p></div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container">
          <div className="band__head"><h2>Timings</h2></div>
          <TimingsTable />
        </div>
      </section>
    </>
  );
}
