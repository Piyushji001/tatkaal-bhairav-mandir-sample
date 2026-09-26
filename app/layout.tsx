import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBar from "@/components/MobileBar";
import { photos, temple } from "@/data/temple";
import "./globals.css";

const description = `${temple.nameEn} on Mirza Ismail Road, New Gate, Jaipur. Darshan and aarti timings, puja and path booking, vehicle puja, festivals and directions.`;

export const metadata: Metadata = {
  metadataBase: new URL(temple.siteUrl),
  title: { default: `${temple.nameEn}, Jaipur | ${temple.nameHi}`, template: `%s | ${temple.nameEn}` },
  description,
  // Shown as the preview card when this link is shared on WhatsApp, Instagram, Facebook, etc. —
  // the single biggest lever for getting more people to actually open the site.
  openGraph: {
    title: `${temple.nameEn}, Jaipur`,
    description,
    url: temple.siteUrl,
    siteName: temple.nameEn,
    images: photos.hero.src ? [{ url: photos.hero.src, width: 900, height: 1600, alt: photos.hero.alt }] : [],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${temple.nameEn}, Jaipur`,
    description,
    images: photos.hero.src ? [photos.hero.src] : [],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#9E3B31",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,700;1,500&family=Hind:wght@400;500;600&family=Tiro+Devanagari+Hindi&display=swap"
        />
      </head>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
