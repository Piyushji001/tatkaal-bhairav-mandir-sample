import type { Metadata } from "next";
import { temple } from "@/data/temple";
import KundliView from "@/components/KundliView";

export const metadata: Metadata = {
  title: "Kundli — Janam Kundali Service",
  description: `Get your Janam Kundli (birth chart) prepared by the experienced pandits of ${temple.nameEn}, Jaipur. Available online via WhatsApp and offline at the temple.`,
};

export default function KundliPage() {
  return <KundliView />;
}
