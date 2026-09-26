"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { pujas, temple, vehicleDakshina, vehicleTypes, whereOptions, type Where } from "@/data/temple";
import { telLink, waLink } from "@/lib/utils";
import { IconCheck } from "./Icons";

type Errors = Partial<Record<"name" | "phone" | "date" | "address" | "vehicleNo", string>>;

function todayISO() {
  const d = new Date();
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10);
}

function prettyDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

export default function BookingForm() {
  const params = useSearchParams();
  const initialPuja = pujas.find((p) => p.id === params.get("puja"));
  const initialWhere = (initialPuja?.where ?? (params.get("where") as Where | null) ?? "mandir") as Where;

  const [where, setWhere] = useState<Where>(whereOptions.some((w) => w.id === initialWhere) ? initialWhere : "mandir");
  const [pujaId, setPujaId] = useState<string>(initialPuja?.id ?? pujas.find((p) => p.where === initialWhere)?.id ?? pujas[0].id);
  const [slot, setSlot] = useState(0);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gotra, setGotra] = useState("");
  const [others, setOthers] = useState("");
  const [address, setAddress] = useState("");
  const [samagri, setSamagri] = useState(true);
  const [vehicleType, setVehicleType] = useState(vehicleTypes[0]);
  const [vehicleNo, setVehicleNo] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const list = useMemo(() => pujas.filter((p) => p.where === where), [where]);
  const puja = list.find((p) => p.id === pujaId) ?? list[0];
  const slotLabel = puja.slots[Math.min(slot, puja.slots.length - 1)];
  const whereLabel = whereOptions.find((w) => w.id === where)!.name;
  const isVehicle = puja.id === "vehicle";

  function chooseWhere(w: Where) {
    setWhere(w);
    setPujaId(pujas.find((p) => p.where === w)!.id);
    setSlot(0);
  }

  function validate(): Errors {
    const e: Errors = {};
    if (!name.trim()) e.name = "Enter your name so pandit ji can take the sankalp.";
    if (!/^[6-9]\d{9}$/.test(phone.replace(/\D/g, "").slice(-10))) e.phone = "Enter a 10-digit mobile number.";
    if (!date) e.date = "Pick a date for the puja.";
    if (where === "home" && !address.trim()) e.address = "Enter the address where pandit ji should come.";
    if (isVehicle && !vehicleNo.trim()) e.vehicleNo = "Enter the vehicle number, e.g. RJ14 AB 1234.";
    return e;
  }

  function buildMessage() {
    const lines = [
      "Jai Baba Bhairavnath 🙏",
      "New puja booking request",
      "",
      `Puja: ${puja.name} (${puja.hi})`,
      `Where: ${whereLabel}`,
      `Date: ${prettyDate(date)}`,
      `Time: ${slotLabel}`,
      isVehicle ? `Vehicle: ${vehicleType}, ${vehicleNo.toUpperCase()}` : "",
      "",
      `Name: ${name}`,
      `Mobile: ${phone}`,
      gotra ? `Gotra: ${gotra}` : "",
      others ? `Other names for sankalp: ${others}` : "",
      where === "home" ? `Address: ${address}` : "",
      where === "home" ? `Samagri from temple: ${samagri ? "Yes" : "No, we will arrange"}` : "",
      note ? `Note: ${note}` : "",
    ];
    return lines.filter((l, i, a) => l !== "" || (a[i - 1] ?? "") !== "").join("\n");
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) {
      const first = document.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    window.open(waLink(buildMessage()), "_blank", "noopener");
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (sent) {
    return (
      <section className="booked" aria-live="polite">
        <div className="booked__icon"><IconCheck /></div>
        <h2>Booking request sent on WhatsApp</h2>
        <p>
          Your request for <strong>{puja.name}</strong> on <strong>{prettyDate(date)}</strong> ({slotLabel}) has been
          opened in WhatsApp. Press send there if you haven’t already.
        </p>
        <h3>What happens next</h3>
        <ol className="steps">
          <li>Pandit ji replies on WhatsApp to confirm the date, time and dakshina.</li>
          <li>{where === "home" ? "Pandit ji arrives at your address at the confirmed time." : where === "name" ? "The puja is done in your name and photos are sent to you." : "Come to the mandir 10 minutes early and meet pandit ji at the counter."}</li>
        </ol>
        <div className="btn-row">
          <a className="btn" href={waLink(buildMessage())} target="_blank" rel="noopener">Open WhatsApp again</a>
          <a className="btn btn--ghost" href={telLink()}>Call {temple.phone}</a>
          <button className="btn btn--text" onClick={() => setSent(false)}>Make another booking</button>
        </div>
      </section>
    );
  }

  return (
    <form className="booking" onSubmit={submit} noValidate>
      <div className="booking__main">
        <fieldset className="field-group">
          <legend>Where should the puja happen?</legend>
          <div className="choice-grid choice-grid--3">
            {whereOptions.map((w) => (
              <label key={w.id} className={`choice ${where === w.id ? "is-selected" : ""}`}>
                <input type="radio" name="where" value={w.id} checked={where === w.id} onChange={() => chooseWhere(w.id)} />
                <span className="choice__title">{w.name}</span>
                <span className="choice__hi hi">{w.hi}</span>
                <span className="choice__desc">{w.desc}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="field-group">
          <legend>Choose the puja or path</legend>
          <div className="choice-grid">
            {list.map((p) => (
              <label key={p.id} className={`choice ${puja.id === p.id ? "is-selected" : ""}`}>
                <input type="radio" name="puja" value={p.id} checked={puja.id === p.id} onChange={() => { setPujaId(p.id); setSlot(0); }} />
                <span className="choice__title">{p.name}</span>
                <span className="choice__hi hi">{p.hi}</span>
                <span className="choice__desc">{p.desc}</span>
                <span className="choice__meta">{p.duration}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {isVehicle && (
          <fieldset className="field-group">
            <legend>Your vehicle</legend>
            <div className="pill-row">
              {vehicleTypes.map((v) => (
                <label key={v} className={`pill ${vehicleType === v ? "is-selected" : ""}`}>
                  <input type="radio" name="vehicleType" value={v} checked={vehicleType === v} onChange={() => setVehicleType(v)} />
                  {v}
                </label>
              ))}
            </div>
            <div className="field">
              <label htmlFor="vehicleNo">Vehicle number</label>
              <input id="vehicleNo" value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} placeholder="RJ14 AB 1234" autoCapitalize="characters" aria-invalid={!!errors.vehicleNo} aria-describedby="vehicleNo-err" />
              {errors.vehicleNo && <p className="error" id="vehicleNo-err">{errors.vehicleNo}</p>}
              <p className="hint">New vehicle without a number yet? Write “New”.</p>
            </div>
          </fieldset>
        )}

        <fieldset className="field-group">
          <legend>Date and time</legend>
          <div className="field field--narrow">
            <label htmlFor="date">Date</label>
            <input id="date" type="date" min={todayISO()} value={date} onChange={(e) => setDate(e.target.value)} aria-invalid={!!errors.date} aria-describedby="date-err" />
            {errors.date && <p className="error" id="date-err">{errors.date}</p>}
          </div>
          <div className="pill-row" role="radiogroup" aria-label="Time">
            {puja.slots.map((s, i) => (
              <label key={s} className={`pill ${slot === i ? "is-selected" : ""}`}>
                <input type="radio" name="slot" checked={slot === i} onChange={() => setSlot(i)} />
                {s}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="field-group">
          <legend>Your details</legend>
          <div className="field-grid">
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input id="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} aria-describedby="name-err" />
              {errors.name && <p className="error" id="name-err">{errors.name}</p>}
            </div>
            <div className="field">
              <label htmlFor="phone">WhatsApp number</label>
              <input id="phone" type="tel" inputMode="numeric" autoComplete="tel" placeholder="10-digit mobile" value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={!!errors.phone} aria-describedby="phone-err" />
              {errors.phone && <p className="error" id="phone-err">{errors.phone}</p>}
            </div>
            <div className="field">
              <label htmlFor="gotra">Gotra <span className="optional">optional</span></label>
              <input id="gotra" value={gotra} onChange={(e) => setGotra(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="others">Other names for sankalp <span className="optional">optional</span></label>
              <input id="others" value={others} onChange={(e) => setOthers(e.target.value)} placeholder="Family members" />
            </div>
          </div>
          {where === "home" && (
            <>
              <div className="field">
                <label htmlFor="address">Address in Jaipur</label>
                <textarea id="address" rows={3} autoComplete="street-address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House no., colony, landmark" aria-invalid={!!errors.address} aria-describedby="address-err" />
                {errors.address && <p className="error" id="address-err">{errors.address}</p>}
              </div>
              <label className="check">
                <input type="checkbox" checked={samagri} onChange={(e) => setSamagri(e.target.checked)} />
                Pandit ji should bring the puja samagri
              </label>
            </>
          )}
          <div className="field">
            <label htmlFor="note">Anything pandit ji should know <span className="optional">optional</span></label>
            <textarea id="note" rows={2} value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
        </fieldset>
      </div>

      <aside className="summary" aria-label="Booking summary">
        <h2 className="summary__title">{puja.name}</h2>
        <p className="summary__hi hi">{puja.hi}</p>
        <dl>
          <div><dt>Where</dt><dd>{whereLabel}</dd></div>
          <div><dt>Date</dt><dd>{date ? prettyDate(date) : "Not chosen yet"}</dd></div>
          <div><dt>Time</dt><dd>{slotLabel}</dd></div>
          {isVehicle && <div><dt>Vehicle</dt><dd>{vehicleType}</dd></div>}
          <div><dt>Dakshina</dt><dd>{isVehicle ? vehicleDakshina[vehicleType] : puja.dakshina}</dd></div>
        </dl>
        <button type="submit" className="btn btn--block">Send booking on WhatsApp</button>
        <p className="summary__note">No payment now. Pandit ji confirms on WhatsApp and dakshina is given at the puja.</p>
      </aside>
    </form>
  );
}
