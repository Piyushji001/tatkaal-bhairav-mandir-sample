import type { Metadata } from "next";
import Photo from "@/components/Photo";
import { gallery } from "@/data/temple";

export const metadata: Metadata = { title: "Photo gallery", description: "Darshan, shringar, aarti and festival photos from Shri Tatkaal Bhairav Mandir, Jaipur." };

export default function Gallery() {
  return (
    <div className="container" style={{ paddingBottom: 96 }}>
      <header className="page-head">
        <p className="kicker">दर्शन</p>
        <h1>Photo gallery</h1>
        <p>Shringar, aarti and festival moments from the mandir.</p>
      </header>
      <div className="gallery">
        {gallery.map((g) => (
          <figure key={g.label} className={g.tall ? "tall" : ""}><Photo {...g} /></figure>
        ))}
      </div>
    </div>
  );
}
