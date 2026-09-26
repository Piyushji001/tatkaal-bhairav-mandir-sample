import Link from "next/link";
import { temple } from "@/data/temple";
import { telLink, waLink } from "@/lib/utils";
import { IconChat, IconDiya, IconPhone, IconPin } from "./Icons";

/** Fixed action bar shown only on phones */
export default function MobileBar() {
  return (
    <nav className="mobile-bar" aria-label="Quick actions">
      <a href={telLink()}><IconPhone /><span>Call</span></a>
      <a href={waLink("Jai Baba Bhairavnath 🙏")}><IconChat /><span>WhatsApp</span></a>
      <a href={temple.mapsLink}><IconPin /><span>Directions</span></a>
      <Link href="/book/" className="mobile-bar__main"><IconDiya /><span>Book puja</span></Link>
    </nav>
  );
}
