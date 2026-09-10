import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import { img, IMAGES } from "@/lib/images";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy | The Maharana",
  description: "How The Maharana handles personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" image={img(IMAGES.architecture.monochrome, 1600, 60)} />
      <section className="bg-ink px-6 py-24 md:px-10">
        <div className="mx-auto max-w-2xl space-y-6 text-parchment/80">
          <p>
            This placeholder outlines how The Maharana intends to handle personal information collected
            through this website — enquiry forms, booking searches and newsletter sign-ups. A complete,
            legally reviewed policy will replace this page before the site goes live with a connected
            backend and booking system.
          </p>
          <p>
            In the meantime, no personal data submitted through this site is stored or transmitted
            anywhere; forms are frontend-only previews. For any privacy questions, please contact us
            directly at{" "}
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
