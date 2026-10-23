"use client";

import { useState } from "react";
import Link from "next/link";
import { temple } from "@/data/temple";
import { waLink, telLink } from "@/lib/utils";
import {
  IconChat,
  IconPin,
  IconPhone,
  IconCalendar,
  IconClock,
  IconCheck,
  IconCopy,
} from "@/components/Icons";

const onlineSteps = [
  { num: "01", text: "Send your birth details (date, time, place) on WhatsApp." },
  { num: "02", text: "Temple pandit ji calculates and prepares your detailed Janam Kundli." },
  { num: "03", text: "Receive your Kundli PDF and audio/text summary within 24 hours." },
  { num: "04", text: "Ask questions on dosha, mahadasha, career or marriage — pandit ji explains everything." },
];

const offlineSteps = [
  { num: "01", text: "Visit Shri Tatkaal Bhairav Mandir during darshan hours (4 AM – 9:30 PM)." },
  { num: "02", text: "Meet pandit ji in person and share your birth details." },
  { num: "03", text: "Your Kundli is cast on the spot, printed, and explained face-to-face." },
  { num: "04", text: "Get personalized guidance on Vedic remedies, shanti path and gemstones." },
];

const services = [
  {
    title: "Janam Kundli",
    hi: "जन्म कुंडली निर्माण",
    icon: "📜",
    desc: "Complete 12-house Vedic birth chart with planetary positions, lagna, dashas, and predictions for career, marriage and health.",
  },
  {
    title: "Kundli Milan",
    hi: "कुंडली मिलान (गुण मिलान)",
    icon: "💍",
    desc: "36-point Ashtakoot matching for marriage compatibility, Manglik dosha analysis and relationship longevity.",
  },
  {
    title: "Dasha Analysis",
    hi: "दशा एवं गोचर विश्लेषण",
    icon: "🪐",
    desc: "Understand your current Mahadasha, Antardasha and Sade Sati effects with clear timeline-based insights.",
  },
  {
    title: "Remedies & Shanti",
    hi: "दोष निवारण एवं उपाय",
    icon: "🪔",
    desc: "Vedic remedies, specific Bhairav and Navgrah pujas, mantras and gemstone suggestions to pacify afflicted planets.",
  },
  {
    title: "Shubh Muhurat",
    hi: "शुभ मुहूर्त विचार",
    icon: "✨",
    desc: "Auspicious timing for weddings, griha pravesh, new vehicle purchase, business start, or property registry.",
  },
  {
    title: "Prashna Kundli",
    hi: "प्रश्न कुंडली विचार",
    icon: "❓",
    desc: "Don't know your exact birth time? Pandit ji casts an instant Prashna chart based on the exact moment you ask.",
  },
];

const checklist = [
  {
    icon: <IconCalendar size={22} />,
    title: "Date of Birth",
    hi: "जन्म तिथि",
    desc: "Exact day, month, and year of birth (e.g., 14 August 1995).",
  },
  {
    icon: <IconClock size={22} />,
    title: "Time of Birth",
    hi: "जन्म समय",
    desc: "Exact time with AM/PM (e.g., 06:45 AM). Accurate to minutes is best.",
  },
  {
    icon: <IconPin size={22} />,
    title: "Place of Birth",
    hi: "जन्म स्थान",
    desc: "City, town, or village name (with district/state if small town).",
  },
  {
    icon: <IconChat size={22} />,
    title: "Your Questions",
    hi: "आपके प्रश्न",
    desc: "Career, marriage, health, family, business or specific doshas.",
  },
];

export default function KundliView() {
  const [filter, setFilter] = useState<"all" | "online" | "offline">("all");
  const [copied, setCopied] = useState(false);

  const defaultWaText =
    "🙏 जय श्री काल भैरव\nमुझे अपनी जन्म कुंडली बनवानी है।\n\nनाम (Name): \nजन्म तिथि (DOB): \nजन्म समय (Time): \nजन्म स्थान (Place): \nपरामर्श / प्रश्न (Questions): ";

  const handleCopy = () => {
    navigator.clipboard.writeText(defaultWaText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="kundli-page">
      {/* Mobile-optimized Header */}
      <div className="container">
        <header className="page-head kundli-head">
          <p className="kicker">॥ श्री गणेशाय नमः ॥ कुंडली सेवा</p>
          <h1>Kundli — Janam Kundali</h1>
          <p className="kundli-head__desc">
            Vedic birth chart preparation and astrology consultation by experienced pandits of{" "}
            <strong>{temple.nameEn}</strong>, Jaipur. Get it on WhatsApp or meet in person at the temple.
          </p>

          {/* Quick trust highlights on phones */}
          <div className="kundli-trust">
            <span className="kundli-trust__item">
              <span className="dot dot--green"></span> 24h WhatsApp Delivery
            </span>
            <span className="kundli-trust__item">
              <span>🪔</span> Vedic Astrologers
            </span>
            <span className="kundli-trust__item">
              <span>🏛️</span> In-Person Darshan
            </span>
          </div>

          {/* Mobile switcher tab */}
          <div className="kundli-filter" role="tablist" aria-label="Consultation mode">
            <button
              type="button"
              role="tab"
              aria-selected={filter === "all"}
              className={`kundli-filter__btn ${filter === "all" ? "is-active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All Options
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === "online"}
              className={`kundli-filter__btn ${filter === "online" ? "is-active" : ""}`}
              onClick={() => setFilter("online")}
            >
              🟢 Online (WhatsApp)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === "offline"}
              className={`kundli-filter__btn ${filter === "offline" ? "is-active" : ""}`}
              onClick={() => setFilter("offline")}
            >
              🏛️ Offline (At Mandir)
            </button>
          </div>
        </header>
      </div>

      {/* Online & Offline Cards */}
      <section className="band kundli-ways-band">
        <div className="container">
          <div className="kundli-ways">
            {/* Online Option */}
            {(filter === "all" || filter === "online") && (
              <article className="kundli-card kundli-card--online">
                <div className="kundli-card__header">
                  <span className="kundli-card__badge kundli-card__badge--online">
                    <span className="dot dot--green"></span> ऑनलाइन सेवा • 24 घंटे में
                  </span>
                  <span className="kundli-card__tag">Most Popular</span>
                </div>
                <h2>Online Kundli on WhatsApp</h2>
                <p className="kundli-card__sub">
                  No travel needed. Send your birth details on WhatsApp and get your complete Janam Kundli PDF &amp; pandit ji&apos;s guidance.
                </p>

                <div className="kundli-steps">
                  {onlineSteps.map((s) => (
                    <div key={s.num} className="kundli-step">
                      <span className="kundli-step__num">{s.num}</span>
                      <p className="kundli-step__text">{s.text}</p>
                    </div>
                  ))}
                </div>

                <div className="kundli-card__action">
                  <a className="btn btn--block btn--whatsapp" href={waLink(defaultWaText)}>
                    <IconChat size={20} />
                    <span>Send details on WhatsApp</span>
                  </a>
                  <p className="kundli-card__hint">
                    ⚡ Instant WhatsApp link • Free preliminary consultation
                  </p>
                </div>
              </article>
            )}

            {/* Offline Option */}
            {(filter === "all" || filter === "offline") && (
              <article className="kundli-card kundli-card--offline">
                <div className="kundli-card__header">
                  <span className="kundli-card__badge kundli-card__badge--offline">
                    मंदिर में • आमने-सामने
                  </span>
                  <span className="kundli-card__tag">4 AM – 9:30 PM</span>
                </div>
                <h2>At the Mandir</h2>
                <p className="kundli-card__sub">
                  Visit the temple on Mirza Ismail Road, New Gate, Jaipur. Meet pandit ji in person for face-to-face Kundli reading.
                </p>

                <div className="kundli-steps">
                  {offlineSteps.map((s) => (
                    <div key={s.num} className="kundli-step">
                      <span className="kundli-step__num">{s.num}</span>
                      <p className="kundli-step__text">{s.text}</p>
                    </div>
                  ))}
                </div>

                <div className="kundli-card__action">
                  <div className="btn-row btn-row--phone-stack">
                    <a className="btn btn--ghost" href={temple.mapsLink}>
                      <IconPin size={18} />
                      <span>Get Mandir directions</span>
                    </a>
                    <a className="btn btn--light" href={telLink()}>
                      <IconPhone size={18} />
                      <span>Call temple pandit ji</span>
                    </a>
                  </div>
                  <p className="kundli-card__hint">
                    📍 {temple.address}
                  </p>
                </div>
              </article>
            )}
          </div>
        </div>
      </section>

      {/* WhatsApp Message Template helper (Super helpful on mobile!) */}
      <section className="band band--plaster kundli-template-band">
        <div className="container">
          <div className="kundli-template-box">
            <div className="kundli-template-box__head">
              <div>
                <p className="kicker">सुविधाजनक प्रारूप</p>
                <h2>WhatsApp Message Format</h2>
              </div>
              <button
                type="button"
                className="btn btn--ghost btn--copy"
                onClick={handleCopy}
                aria-label="Copy message format"
              >
                {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
                <span>{copied ? "Copied to clipboard!" : "Copy format"}</span>
              </button>
            </div>
            <p className="kundli-template-box__desc">
              Copy or tap below to open WhatsApp with this pre-filled message format:
            </p>
            <pre className="kundli-template-code">
{`🙏 जय श्री काल भैरव
मुझे अपनी जन्म कुंडली बनवानी है।

• नाम (Name): 
• जन्म तिथि (Date of Birth): 
• जन्म समय (Time of Birth): 
• जन्म स्थान (Place of Birth): 
• प्रश्न (Questions / Concerns): `}
            </pre>
            <div className="kundli-template-box__footer">
              <a className="btn btn--whatsapp btn--block" href={waLink(defaultWaText)}>
                <IconChat size={20} />
                <span>Open WhatsApp with this format</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="band kundli-services-band">
        <div className="container">
          <div className="band__head">
            <div>
              <p className="kicker">ज्योतिष सेवाएँ</p>
              <h2>Astrology services</h2>
            </div>
            <p>
              All consultations and calculations follow authentic Vedic astrology (Parashari &amp; Jaimini systems) conducted by learned temple pandits.
            </p>
          </div>
          <div className="kundli-services">
            {services.map((s) => (
              <article key={s.title} className="kundli-service">
                <div className="kundli-service__head">
                  <span className="kundli-service__icon" aria-hidden="true">{s.icon}</span>
                  <div>
                    <span className="kundli-service__hi">{s.hi}</span>
                    <h3>{s.title}</h3>
                  </div>
                </div>
                <p className="kundli-service__desc">{s.desc}</p>
                <a
                  className="kundli-service__link"
                  href={waLink(`🙏 जय श्री काल भैरव\nमुझे ${s.title} (${s.hi}) के बारे में जानकारी और परामर्श चाहिए।`)}
                >
                  <IconChat size={16} />
                  <span>Inquire on WhatsApp →</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What you need checklist */}
      <section className="band band--plaster kundli-reqs-band">
        <div className="container">
          <div className="band__head">
            <div>
              <p className="kicker">आवश्यक जानकारी</p>
              <h2>What you&apos;ll need</h2>
            </div>
            <p>Keep these four simple details ready for an accurate birth chart casting.</p>
          </div>
          <div className="kundli-reqs">
            {checklist.map((item, idx) => (
              <div key={item.title} className="kundli-req-card">
                <div className="kundli-req-card__icon">{item.icon}</div>
                <div className="kundli-req-card__body">
                  <span className="kundli-req-card__idx">0{idx + 1}</span>
                  <span className="kundli-req-card__hi">{item.hi}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA on phone */}
      <section className="band band--lac kundli-cta-band" style={{ textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <p className="kicker">शुरू करें</p>
          <h2>Ready to check your Kundli?</h2>
          <p style={{ color: "#f4dcd3", marginBottom: 24, fontSize: 17 }}>
            Send your birth details on WhatsApp to receive your Janam Kundli in 24 hours, or visit the mandir for a personalized reading.
          </p>
          <div className="btn-row btn-row--phone-stack" style={{ justifyContent: "center" }}>
            <a className="btn btn--light btn--whatsapp-light" href={waLink(defaultWaText)}>
              <IconChat size={20} />
              <span>WhatsApp Pandit Ji</span>
            </a>
            <Link className="btn btn--ghost" href="/visit/" style={{ borderColor: "rgba(255,255,255,.4)", color: "#f4dcd3" }}>
              <IconPin size={18} />
              <span>Visit the Temple</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
