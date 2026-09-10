import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import FadeIn from "@/components/ui/FadeIn";
import { experiences } from "@/data/experiences";
import { img, IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Experiences | The Maharana",
  description: "Curated experiences in and around Ahmedabad, arranged by The Maharana.",
};

export default function ExperiencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Experience"
        title="The City, Your Way."
        subtitle="Private, curated journeys through Ahmedabad and beyond, arranged around your pace."
        image={img(IMAGES.textile.weaverHands, 2000, 78)}
      />

      <section className="bg-ink px-6 py-24 md:px-10">
        <div className="mx-auto grid max-w-[1600px] gap-6 md:grid-cols-2 md:gap-8">
          {experiences.map((exp, i) => (
            <FadeIn key={exp.id} delay={i * 0.05}>
              <Link href={`/experiences/${exp.slug}`} data-cursor="view" className="group relative block aspect-[4/5] overflow-hidden">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
                <span className="absolute left-7 top-7 font-display text-2xl text-brass-soft">{exp.number}</span>
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h2 className="font-display text-3xl text-parchment">{exp.title}</h2>
                  <p className="mt-2 max-w-sm text-sm text-parchment/75">{exp.description}</p>
                  <span className="label mt-5 inline-flex items-center gap-2 text-brass-soft">
                    Discover
                    <ArrowUpRight size={13} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
