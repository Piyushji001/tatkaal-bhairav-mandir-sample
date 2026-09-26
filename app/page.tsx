import Link from "next/link";
import Photo from "@/components/Photo";
import { IconShare } from "@/components/Icons";
import { OpenStatus, TimingsTable } from "@/components/Timings";
import { festivals, gallery, nearby, photos, pujas, temple, vehicleTypes, whereOptions } from "@/data/temple";
import { shareLink } from "@/lib/utils";

const story = temple.story.filter((line) => !line.trim().toUpperCase().startsWith("TODO"));

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__photo arch">
            <Photo {...photos.hero} />
          </div>
          <div className="hero__text">
            <p className="hero__hi">{temple.jaikara}</p>
            <h1>{temple.nameEn}</h1>
            <p className="hi" style={{ fontSize: 26, color: "var(--muted)" }}>{temple.nameHi}</p>
            <p className="hero__intro">{temple.intro}</p>
            <OpenStatus />
            <div className="btn-row">
              <Link className="btn" href="/book/">Book a puja</Link>
              <a className="btn btn--ghost" href={temple.mapsLink}>Get directions</a>
              <a className="btn btn--text" href={shareLink()}><IconShare size={18} /> Share</a>
            </div>
            <div className="facts">
              <div><strong>4 AM</strong><span>Doors open daily</span></div>
              <div><strong>Free</strong><span>Entry for everyone</span></div>
              <div><strong>{temple.googleRating}</strong><span>Rating on Google</span></div>
            </div>
          </div>
        </div>
      </section>

      <div className="jaali" aria-hidden="true" />

      {/* Story — only shows once the TODOs in data/temple.ts are filled in with the pujari */}
      {story.length > 0 && (
        <section className="band">
          <div className="container story">
            <div className="story__body">
              <p className="kicker">मंदिर की कथा</p>
              <h2>The story of Baba Tatkaal Bhairav</h2>
              {story.map((line) => <p key={line}>{line}</p>)}
            </div>
            <div className="story__quote">
              <p className="hi">{temple.jaikara}</p>
              <p>Devotees come from across Jaipur and beyond for Baba’s tatkaal — quick — blessing before new beginnings.</p>
              <div className="story__quote-rating"><strong>{temple.googleRating}</strong><span>★ on Google, from devotees who’ve visited</span></div>
            </div>
          </div>
        </section>
      )}

      {/* Timings */}
      <section className="band band--plaster" id="timings">
        <div className="container">
          <div className="band__head">
            <div>
              <p className="kicker">दर्शन एवं आरती</p>
              <h2>Darshan and aarti timings</h2>
            </div>
          </div>
          <TimingsTable />
        </div>
      </section>

      {/* Ways to book */}
      <section className="band">
        <div className="container">
          <div className="band__head">
            <div>
              <p className="kicker">पूजा एवं पाठ</p>
              <h2>Book a puja or path</h2>
            </div>
            <p>Performed by the temple’s own pandits. Send your request on WhatsApp and pandit ji confirms the time.</p>
          </div>
          <div className="ways">
            {whereOptions.map((w) => (
              <article key={w.id} className="way">
                <span className="hi">{w.hi}</span>
                <h3>{w.name}</h3>
                <p>{w.desc}</p>
                <ul>
                  {pujas.filter((p) => p.where === w.id).slice(0, 4).map((p) => <li key={p.id}>{p.name}</li>)}
                </ul>
                <Link className="btn btn--ghost" href={`/book/?where=${w.id}`}>Choose a puja</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle puja */}
      <section className="band band--lac">
        <div className={`container vehicle ${!photos.vehicle.src ? "vehicle--no-photo" : ""}`}>
          <div className="vehicle__text">
            <p className="kicker">वाहन पूजा</p>
            <h2>Bought a new vehicle? Take Baba’s blessing first.</h2>
            <p>Bring your scooter, car or truck to the temple on Mirza Ismail Road. Pandit ji does the puja with tilak, mauli and nariyal in about fifteen minutes.</p>
            <div className="vehicle__types">{vehicleTypes.map((v) => <span key={v}>{v}</span>)}</div>
            <div className="btn-row">
              <Link className="btn btn--light" href="/book/?puja=vehicle">Book vehicle puja</Link>
              <Link className="btn btn--text" style={{ color: "#f4dcd3" }} href="/vehicle-puja/">How it works</Link>
            </div>
          </div>
          {photos.vehicle.src && (
            <div className="vehicle__photo arch">
              <Photo {...photos.vehicle} />
            </div>
          )}
        </div>
      </section>

      {/* Festivals */}
      <section className="band band--plaster">
        <div className="container">
          <div className="band__head">
            <div>
              <p className="kicker">पर्व एवं उत्सव</p>
              <h2>Special days</h2>
            </div>
          </div>
          <ul className="fest">
            {festivals.map((f) => (
              <li key={f.name}>
                <div>
                  <h3>{f.name}<span className="hi">{f.hi}</span></h3>
                  <p className="fest__when">{f.when}</p>
                </div>
                <p>{f.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Visit */}
      <section className="band">
        <div className="container visit">
          <iframe className="map" src={temple.mapsEmbed} title={`Map to ${temple.nameEn}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <div className="visit__text">
            <h2>Finding the temple</h2>
            <p>{temple.address}</p>
            <p style={{ color: "var(--muted)" }}>Just outside New Gate of the walled city, across from Ramniwas Bagh.</p>
            <div className="chips">{nearby.map((n) => <span key={n}>{n}</span>)}</div>
            <div className="btn-row">
              <a className="btn" href={temple.mapsLink}>Open in Google Maps</a>
              <Link className="btn btn--ghost" href="/visit/">Visitor guide</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="band band--plaster">
        <div className="container">
          <div className="band__head">
            <h2>Darshan photos</h2>
            <Link href="/gallery/">See all photos</Link>
          </div>
          <div className="gallery-strip">
            {gallery.slice(0, 4).map((g) => (
              <figure key={g.label}><Photo {...g} /></figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
