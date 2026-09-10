import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import { img, IMAGES } from "@/lib/images";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms & Conditions | The Maharana",
  description: "Terms and conditions for use of The Maharana website.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" image={img(IMAGES.architecture.monochrome, 1600, 60)} />
      <section className="bg-ink px-6 py-24 md:px-10">
        <div className="mx-auto max-w-2xl space-y-6 text-parchment/80">
          <p>
            This placeholder page will hold the full terms and conditions governing use of this
            website and, once connected, its booking engine. Rates, availability and cancellation
            terms shown anywhere on this site are illustrative until a live reservations system is
            in place.
          </p>
          <p>
            For questions in the meantime, please contact{" "}
            <a href={`mailto:${site.email}`} className="link-underline text-parchment">
              {site.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
