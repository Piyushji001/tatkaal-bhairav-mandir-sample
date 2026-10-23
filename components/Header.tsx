"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { temple } from "@/data/temple";
import ThemeToggle from "./ThemeToggle";
import { IconClose, IconMenu } from "./Icons";

const links = [
  { href: "/", label: "Home" },
  { href: "/book/", label: "Book a puja" },
  { href: "/vehicle-puja/", label: "Vehicle puja" },
  { href: "/kundli/", label: "Kundli" },
  { href: "/visit/", label: "Visit" },
  { href: "/gallery/", label: "Gallery" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);

  return (
    <header className="site-header">
      <div className="container site-header__row">
        <Link href="/" className="wordmark">
          <span className="wordmark__hi">{temple.nameHi}</span>
          <span className="wordmark__en">{temple.nameEn}, {temple.city}</span>
        </Link>
        <nav className="nav" aria-label="Main">
          {links.slice(1).map((l) => (
            <Link key={l.href} href={l.href} className={path === l.href ? "nav__link is-active" : "nav__link"}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="site-header__tools">
        <ThemeToggle />
        <button
          className="menu-btn"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={path === l.href ? "is-active" : ""}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
