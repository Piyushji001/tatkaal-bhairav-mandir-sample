import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import { photos, temple, vehicleDakshina } from "@/data/temple";

export const metadata: Metadata = {
  title: "Vehicle puja in Jaipur",
  description: "Vahan puja for new and old vehicles at Shri Tatkaal Bhairav Mandir, Mirza Ismail Road, Jaipur. Two-wheelers, cars, autos and commercial vehicles.",
};


export default function VehiclePuja() {
  return (
    <>
      <div className="container">
        <header className="page-head">
          <p className="kicker">वाहन पूजा</p>
          <h1>Vehicle puja</h1>
          <p>Before the first ride, many families bring their new vehicle to Baba for protection on the road. It takes about fifteen minutes.</p>
        </header>
      </div>
      <section className="band" style={{ paddingTop: 16 }}>
        <div className={`container vehicle ${!photos.vehicle.src ? "vehicle--no-photo" : ""}`}>
          <div className="vehicle__text">
            <h2>How it works</h2>
            <ol className="steps">
              <li>Book a date and time below, or simply come during temple hours.</li>
              <li>Bring your vehicle to the temple gate for the puja ceremony.</li>
              <li>Pandit ji does the puja with tilak, mauli and nariyal, and takes the sankalp in your name.</li>
              <li>Receive prasad and Baba’s blessing before your first ride.</li>
            </ol>
            <h3 style={{ marginTop: 12 }}>Vehicles and dakshina</h3>
            <dl className="timings__hours">
              {Object.entries(vehicleDakshina).map(([type, amount]) => (
                <div key={type}><dt>{type}</dt><dd>{amount}</dd></div>
              ))}
            </dl>
            <div className="btn-row">
              <Link className="btn" href="/book/?puja=vehicle">Book vehicle puja</Link>
              <a className="btn btn--ghost" href={temple.mapsLink}>Get directions</a>
            </div>
          </div>
          {photos.vehicle.src && (
            <div className="vehicle__photo arch">
              <Photo {...photos.vehicle} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
