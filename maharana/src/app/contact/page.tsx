import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import ContactForm from "@/components/sections/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact | The Maharana",
  description: "Get in touch with The Maharana, a heritage luxury hotel in Ahmedabad.",
};

export default function ContactPage() {
  return (
    <section className="px-6 pb-24 pt-40 md:px-10 md:pt-48">
      <div className="mx-auto max-w-[1600px]">
        <FadeIn>
          <p className="label mb-6 text-brass-soft">Contact</p>
          <h1 className="max-w-2xl font-display text-4xl leading-[1.05] text-parchment sm:text-5xl md:text-6xl">
            Get In Touch.
          </h1>
        </FadeIn>

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-[1fr_1.2fr] md:gap-24">
          <FadeIn delay={0.1}>
            <p className="font-display text-2xl text-parchment">{site.name}</p>
            <div className="mt-10 space-y-6">
              <div className="flex gap-4">
                <MapPin size={18} strokeWidth={1.5} className="mt-1 shrink-0 text-brass-soft" />
                <p className="text-parchment/80">{site.address}</p>
              </div>
              <div className="flex gap-4">
                <Mail size={18} strokeWidth={1.5} className="mt-1 shrink-0 text-brass-soft" />
                <a href={`mailto:${site.email}`} className="link-underline text-parchment/80">
                  {site.email}
                </a>
              </div>
              <div className="flex gap-4">
                <Phone size={18} strokeWidth={1.5} className="mt-1 shrink-0 text-brass-soft" />
                <a href={`tel:${site.phone}`} className="link-underline text-parchment/80">
                  {site.phoneDisplay}
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <ContactForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
