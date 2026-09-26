import Link from "next/link";
import { temple } from "@/data/temple";
import { telLink } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="jaali" aria-hidden="true" />
      <div className="container site-footer__grid">
        <div>
          <p className="hi site-footer__jai">{temple.jaikara}</p>
          <p>{temple.address}</p>
        </div>
        <div className="site-footer__links">
          <Link href="/book/">Book a puja</Link>
          <Link href="/vehicle-puja/">Vehicle puja</Link>
          <Link href="/visit/">How to reach</Link>
          <a href={telLink()}>Call {temple.phone}</a>
          {temple.instagram && <a href={temple.instagram}>Instagram</a>}
        </div>
      </div>
    </footer>
  );
}
