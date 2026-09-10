import type { Metadata } from "next";
import FadeIn from "@/components/ui/FadeIn";
import BookingForm from "@/components/sections/BookingForm";

export const metadata: Metadata = {
  title: "Book Your Stay | The Maharana",
  description: "Check availability and book your stay at The Maharana, Ahmedabad.",
};

export default function BookingPage() {
  return (
    <section className="px-6 pb-24 pt-40 md:px-10 md:pt-48">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <p className="label mb-6 text-brass-soft">Book Your Stay</p>
          <h1 className="font-display text-4xl leading-[1.05] text-parchment sm:text-5xl md:text-6xl">
            Your Room Is Waiting.
          </h1>
          <p className="mt-6 text-parchment/70">
            Select your dates below to check availability at The Maharana.
          </p>
        </FadeIn>
      </div>

      <FadeIn delay={0.15} className="mx-auto mt-16 max-w-4xl">
        <BookingForm />
      </FadeIn>
    </section>
  );
}
