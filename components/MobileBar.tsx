"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { temple } from "@/data/temple";
import { telLink, waLink } from "@/lib/utils";
import { IconChat, IconDiya, IconHome, IconPhone, IconPin } from "./Icons";

/** Fixed action bar shown only on phones */
export default function MobileBar() {
  const path = usePathname();

  return (
    <nav className="mobile-bar" aria-label="Quick actions">
      <a href={telLink()}>
        <IconPhone />
        <span>Call</span>
      </a>
      <a href={waLink("Jai Baba Bhairavnath 🙏")}>
        <IconChat />
        <span>WhatsApp</span>
      </a>
      <Link href="/" className={path === "/" ? "mobile-bar__item is-active" : "mobile-bar__item"}>
        <IconHome />
        <span>Home</span>
      </Link>
      <a href={temple.mapsLink}>
        <IconPin />
        <span>Directions</span>
      </a>
      <Link href="/book/" className={`mobile-bar__main ${path === "/book/" ? "is-active" : ""}`}>
        <IconDiya />
        <span>Book puja</span>
      </Link>
    </nav>
  );
}
