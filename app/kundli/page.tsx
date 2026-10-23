import type { Metadata } from "next";
import Link from "next/link";
import { temple } from "@/data/temple";
import { waLink, telLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Kundli — Janam Kundali Service",
  description: `Get your Janam Kundli (birth chart) prepared by the experienced pandits of ${temple.nameEn}, Jaipur. Available online via WhatsApp and offline at the temple.`,
};

const onlineSteps = [
  "Send your birth details (date, time, place) on WhatsApp.",
  "Pandit ji prepares your detailed Janam Kundli.",
  "Receive your Kundli PDF and summary on WhatsApp within 24 hours.",
  "Ask follow-up questions about doshas, dashas or muhurat — pandit ji is happy to explain.",
];

const offlineSteps = [
  "Visit the temple during darshan hours (4 AM – 9 PM).",
  "Meet pandit ji and share your birth details.",
  "Your Kundli is prepared on the spot — printed and explained in person.",
  "Get guidance on remedies, gemstones and shanti puja if needed.",
];

const services = [
  {
    title: "Janam Kundli",
    hi: "जन्म कुंडली",
    desc: "Complete birth chart with all 12 houses, planetary positions, dashas and predictions for career, marriage, health and finances.",
  },
  {
    title: "Kundli Milan",
    hi: "कुंडली मिलान",
    desc: "Gun milan (Ashtakoot) for marriage compatibility. Get the full 36-point matching report with manglik check.",
  },
  {
    title: "Dasha Analysis",
    hi: "दशा विश्लेषण",
    desc: "Understand your current and upcoming mahadasha and antardasha periods, with personalised predictions.",
  },
  {
    title: "Remedies & Shanti",
    hi: "उपाय एवं शांति",
    desc: "Pandit ji suggests gemstones, mantras and specific pujas to pacify unfavourable planetary positions.",
  },
  {
    title: "Muhurat",
    hi: "मुहूर्त",
    desc: "Auspicious date and time for weddings, griha pravesh, business launch, vehicle purchase and other events.",
  },
  {
    title: "Prashna Kundli",
    hi: "प्रश्न कुंडली",
    desc: "Have a specific question? Pandit ji casts a Prashna chart based on the moment you ask for quick guidance.",
  },
];

export default function Kundli() {
  const waMessage =
    "🙏 Jai Baba Bhairavnath!\nI would like to get my Kundli prepared.\n\nName: \nDate of birth: \nTime of birth: \nPlace of birth: ";

  return (
    <>
      <div className="container">
        <header className="page-head">
          <p className="kicker">कुंडली सेवा</p>
          <h1>Kundli — Janam Kundali</h1>
          <p>
            Get your birth chart prepared by the temple&apos;s experienced pandits.
            Available online via WhatsApp or in person at the mandir.
          </p>
        </header>
      </div>

      {/* Online & Offline ways */}
      <section className="band" style={{ paddingTop: 16 }}>
        <div className="container">
          <div className="kundli-ways">
            {/* Online */}
            <article className="kundli-card">
              <div className="kundli-card__badge">ऑनलाइन</div>
              <h2>Online Kundli</h2>
              <p className="kundli-card__sub">Get your Kundli on WhatsApp — no visit needed</p>
              <ol className="steps">
                {onlineSteps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <div className="btn-row" style={{ marginTop: "auto" }}>
                <a className="btn" href={waLink(waMessage)}>
                  Send birth details on WhatsApp
                </a>
              </div>
            </article>

            {/* Offline */}
            <article className="kundli-card">
              <div className="kundli-card__badge kundli-card__badge--alt">मंदिर में</div>
              <h2>At the Mandir</h2>
              <p className="kundli-card__sub">Meet pandit ji in person for detailed consultation</p>
              <ol className="steps">
                {offlineSteps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <div className="btn-row" style={{ marginTop: "auto" }}>
                <a className="btn btn--ghost" href={temple.mapsLink}>
                  Get directions
                </a>
                <a className="btn btn--text" href={telLink()}>
                  Call the temple
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="band band--plaster">
        <div className="container">
          <div className="band__head">
            <div>
              <p className="kicker">ज्योतिष सेवाएँ</p>
              <h2>Astrology services</h2>
            </div>
            <p>All consultations are done by our temple&apos;s own pandits who have years of experience in Vedic astrology.</p>
          </div>
          <div className="kundli-services">
            {services.map((s) => (
              <article key={s.title} className="kundli-service">
                <span className="hi">{s.hi}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What you need */}
      <section className="band">
        <div className="container">
          <div className="band__head">
            <h2>What you&apos;ll need</h2>
          </div>
          <div className="guide">
            <div>
              <h3>Date of birth</h3>
              <p>The exact date — day, month and year.</p>
            </div>
            <div>
              <h3>Time of birth</h3>
              <p>As precise as possible. Check your birth certificate if unsure.</p>
            </div>
            <div>
              <h3>Place of birth</h3>
              <p>City or town name is enough. Pandit ji will look up the coordinates.</p>
            </div>
            <div>
              <h3>Your questions</h3>
              <p>Career, marriage, health, finances — come with your questions and pandit ji will guide you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="band band--lac" style={{ textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <p className="kicker">शुरू करें</p>
          <h2>Ready to check your Kundli?</h2>
          <p style={{ color: "#f4dcd3", marginBottom: 24 }}>
            Send your birth details on WhatsApp and receive your Janam Kundli within 24 hours,
            or visit the temple to meet pandit ji in person.
          </p>
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <a className="btn btn--light" href={waLink(waMessage)}>
              WhatsApp pandit ji
            </a>
            <Link className="btn btn--ghost" href="/visit/" style={{ borderColor: "rgba(255,255,255,.4)", color: "#f4dcd3" }}>
              Visit the temple
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
