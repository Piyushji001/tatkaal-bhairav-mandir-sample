import type { Metadata } from "next";
import { Suspense } from "react";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Book a puja or path",
  description: "Book chola, bhog, vehicle puja, Sundarkand path, Satyanarayan katha and more — at the mandir, at your home in Jaipur, or in your name.",
};

export default function BookPage() {
  return (
    <div className="container">
      <header className="page-head">
        <p className="kicker">पूजा एवं पाठ बुकिंग</p>
        <h1>Book a puja or path</h1>
        <p>Fill in the details below. Your request opens in WhatsApp, and pandit ji replies to confirm the time and dakshina.</p>
      </header>
      <Suspense fallback={<p>Loading booking form…</p>}>
        <BookingForm />
      </Suspense>
    </div>
  );
}
