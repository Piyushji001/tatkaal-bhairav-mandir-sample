/**
 * ALL WEBSITE CONTENT LIVES HERE.
 * There is no backend — to change timings, pujas, festivals or photos,
 * edit this file and redeploy.
 *
 * Anything marked TODO must be confirmed with the pujari / temple committee
 * before the site goes live.
 */

export const temple = {
  nameEn: "Shri Tatkaal Bhairav Mandir",
  nameHi: "श्री तत्काल भैरव मंदिर",
  jaikara: "॥ जय बाबा भैरवनाथ ॥",
  city: "Jaipur",
  address: "Mirza Ismail Rd, New Gate, Jaipur, Rajasthan 302003",
  addressShort: "Mirza Ismail Road, outside New Gate, Jaipur",
  mapsLink: "https://maps.app.goo.gl/7CoubkZdtqXLPgXU9",
  mapsEmbed:
    "https://www.google.com/maps?q=Shri+Tatkaal+Bhairav+Mandir,+Mirza+Ismail+Rd,+Jaipur&output=embed",

  // TODO: the real domain once the site is deployed — used for the WhatsApp/Instagram share preview card.
  siteUrl: "https://tatkaalbhairavmandir.example",

  // TODO: temple's WhatsApp number with country code, digits only (e.g. "919876543210")
  whatsapp: "910000000000",
  // TODO: phone number as it should be dialled / shown
  phone: "+91 00000 00000",
  instagram: "", // TODO: e.g. "https://instagram.com/tatkaalbhairav"

  // TODO: 1–2 lines on the temple's story, written with the pujari
  intro:
    "A much-loved Bhairav shrine just outside the walls of the old Pink City, where devotees come for Baba’s blessing before new beginnings.",
  story: [
    "TODO: When and how the temple was established.",
    "TODO: Why devotees call Baba “Tatkaal” — the belief that prayers here are answered quickly.",
    "TODO: The family or committee that looks after daily seva.",
  ],
};

/* ---------- Timings ---------- */

export type Aarti = { name: string; hi: string; time: string };
export type Season = {
  label?: string;
  months?: number[]; // 1 = January
  open: string; // "HH:MM" 24h
  close: string;
  breakFrom?: string;
  breakTo?: string;
  aartis: Aarti[];
};

export const seasons: Season[] = [
  {
    label: "Daily timings",
    open: "04:00",
    close: "21:00",
    breakFrom: "12:00",
    breakTo: "14:30",
    aartis: [
      { name: "Mangla aarti", hi: "मंगला आरती", time: "04:00" },
      { name: "Shringar aarti", hi: "श्रृंगार आरती", time: "05:00" },
      { name: "Bhog aarti", hi: "भोग आरती", time: "11:30" },
      { name: "Sandhya aarti", hi: "संध्या आरती", time: "20:00" },
      { name: "Shayan aarti", hi: "शयन आरती", time: "21:00" },
    ],
  },
];

/* ---------- Pujas & booking ---------- */

export type Where = "mandir" | "home" | "name";

export const whereOptions: { id: Where; name: string; hi: string; desc: string }[] = [
  { id: "mandir", name: "At the mandir", hi: "मंदिर में", desc: "Come and sit for the puja with pandit ji." },
  { id: "home", name: "At your home or shop", hi: "आपके घर पर", desc: "Pandit ji comes to you, anywhere in Jaipur." },
  { id: "name", name: "In your name", hi: "आपके नाम से", desc: "Can’t come? Puja is done with your sankalp; photos sent on WhatsApp." },
];

export type Puja = {
  id: string;
  where: Where;
  name: string;
  hi: string;
  desc: string;
  duration: string;
  dakshina: string; // shown as text only — no online payment
  slots: string[];
};

const MANDIR_SLOTS = ["After mangla aarti", "Late morning", "Before sandhya aarti"];
const HOME_SLOTS = ["Morning (7–10 am)", "Afternoon (12–3 pm)", "Evening (5–8 pm)"];
const NAME_SLOTS = ["Morning puja", "Sandhya aarti"];

// TODO: confirm every puja, duration and dakshina with the temple
export const pujas: Puja[] = [
  { id: "vehicle", where: "mandir", name: "Vehicle puja", hi: "वाहन पूजा", desc: "Blessing for a new or old vehicle — tilak, mauli and nariyal at the temple gate.", duration: "About 15 min", dakshina: "Depends on vehicle", slots: MANDIR_SLOTS },
  { id: "chola", where: "mandir", name: "Chola & shringar", hi: "चोला एवं श्रृंगार", desc: "Sindoor chola and flower shringar for Baba on your chosen day.", duration: "About 45 min", dakshina: "₹— (confirm with pandit ji)", slots: MANDIR_SLOTS },
  { id: "bhog", where: "mandir", name: "Bhog prasad", hi: "भोग प्रसाद", desc: "Offer bhog on a birthday, anniversary or when a mannat is fulfilled.", duration: "About 20 min", dakshina: "₹—", slots: MANDIR_SLOTS },
  { id: "ashtakam", where: "mandir", name: "Bhairav Ashtakam path", hi: "भैरव अष्टकम पाठ", desc: "Path recited by the temple pandit with your family’s sankalp.", duration: "About 30 min", dakshina: "₹—", slots: MANDIR_SLOTS },
  { id: "kalashtami", where: "mandir", name: "Kalashtami vishesh puja", hi: "कालाष्टमी विशेष पूजा", desc: "Special puja on the monthly Kalashtami in your family’s name.", duration: "About 1 hr", dakshina: "₹—", slots: ["Kalashtami evening"] },
  { id: "sundarkand", where: "home", name: "Sundarkand path", hi: "सुंदरकांड पाठ", desc: "Full Sundarkand path with bhajan at your home.", duration: "About 3 hrs", dakshina: "₹—", slots: HOME_SLOTS },
  { id: "satyanarayan", where: "home", name: "Satyanarayan katha", hi: "सत्यनारायण कथा", desc: "Katha, aarti and prasad for a family occasion or new start.", duration: "About 2 hrs", dakshina: "₹—", slots: HOME_SLOTS },
  { id: "grihapravesh", where: "home", name: "Griha pravesh puja", hi: "गृह प्रवेश पूजा", desc: "Vastu puja and havan before moving into a new home.", duration: "About 3 hrs", dakshina: "₹—", slots: HOME_SLOTS },
  { id: "dukan", where: "home", name: "Shop or office opening", hi: "दुकान / ऑफिस मुहूर्त", desc: "Puja for a new shop, office or business on a shubh muhurat.", duration: "About 1.5 hrs", dakshina: "₹—", slots: HOME_SLOTS },
  { id: "bhairavhavan", where: "home", name: "Bhairav puja & havan", hi: "भैरव पूजा एवं हवन", desc: "Bhairav puja with havan for protection and removing obstacles.", duration: "About 2 hrs", dakshina: "₹—", slots: HOME_SLOTS },
  { id: "cholaname", where: "name", name: "Chola in your name", hi: "आपके नाम से चोला", desc: "Pandit ji offers the chola with your sankalp and sends photos.", duration: "Photos + short video", dakshina: "₹—", slots: NAME_SLOTS },
  { id: "deepdaan", where: "name", name: "Deep daan", hi: "दीप दान", desc: "11, 51 or 108 diyas lit before Baba in your name at sandhya aarti.", duration: "Photo sent on WhatsApp", dakshina: "₹—", slots: ["Sandhya aarti"] },
  { id: "kalname", where: "name", name: "Kalashtami sankalp", hi: "कालाष्टमी संकल्प", desc: "Your name and gotra read during the Kalashtami puja.", duration: "Video sent on WhatsApp", dakshina: "₹—", slots: ["Kalashtami evening"] },
];

// TODO: set dakshina for each vehicle type (shown as text only, no online payment)
export const vehicleDakshina: Record<string, string> = {
  "Two-wheeler": "₹— (confirm)",
  "Car / SUV": "₹— (confirm)",
  "Auto / e-rickshaw": "₹— (confirm)",
  "Truck / bus / tractor": "₹— (confirm)",
};
export const vehicleTypes = Object.keys(vehicleDakshina);

/* ---------- Festivals ---------- */

// TODO: fill real dates each year
export const festivals = [
  { name: "Kalashtami", hi: "कालाष्टमी", when: "Every month, on Krishna Paksha Ashtami", detail: "Monthly Bhairav puja. Next date: TODO" },
  { name: "Bhairav Ashtami", hi: "भैरव अष्टमी", when: "Margashirsha Krishna Ashtami (Nov/Dec)", detail: "Baba’s prakatya divas — TODO: bhajan sandhya and bhandara details" },
  { name: "Weekly special darshan", hi: "साप्ताहिक", when: "TODO: which day", detail: "TODO: special shringar or evening bhajan" },
];

/* ---------- Photos ----------
 * Put image files in /public/images and set `src` to "/images/filename.webp".
 * While `src` is empty, a labelled placeholder is shown.
 */
export const photos = {
  hero: { src: "/images/hero.webp", alt: "Baba’s shringar darshan", label: "Portrait photo: Baba’s shringar, straight-on, no flash" },
  // TODO: no landscape photo of the temple frontage yet — add one and set src.
  front: { src: "", alt: "Temple front on Mirza Ismail Road", label: "Landscape photo: temple front at dusk with lamps lit" },
  // TODO: no vehicle puja photo yet — add one and set src.
  vehicle: { src: "", alt: "Vehicle puja at the temple", label: "Portrait photo: pandit ji doing a vehicle puja" },
  // TODO: no pandit ji photo yet — add one and set src.
  pandit: { src: "", alt: "Pandit ji of the temple", label: "Portrait photo: pandit ji" },
};

export const gallery = [
  { src: "/images/gallery-1.webp", alt: "Baba in blue vastra with jasmine garlands", label: "Blue shringar darshan", tall: true },
  { src: "/images/gallery-2.webp", alt: "Sanctum decorated with garlands for aarti", label: "Sanctum decorated for aarti" },
  { src: "/images/gallery-3.webp", alt: "Baba in red and gold festive decoration", label: "Festive red & gold shringar", tall: true },
  { src: "/images/gallery-4.webp", alt: "Baba in green vastra under coloured temple light", label: "Green shringar darshan" },
  { src: "/images/gallery-5.webp", alt: "Baba in pink and magenta floral shringar", label: "Pink floral shringar", tall: true },
  { src: "/images/gallery-6.webp", alt: "Baba in orange and yellow marigold shringar", label: "Marigold shringar" },
  { src: "/images/gallery-7.webp", alt: "Baba in emerald green striped vastra with silver crown", label: "Emerald shringar darshan" },
];

export const nearby = ["New Gate", "Ramniwas Bagh", "Albert Hall", "Bapu Bazaar", "Ajmeri Gate"];
