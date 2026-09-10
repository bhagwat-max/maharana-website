import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { experiences, getExperienceBySlug } from "@/data/experiences";

export function generateStaticParams() {
  return experiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const exp = getExperienceBySlug(slug);
  if (!exp) return {};
  return { title: `${exp.title} | The Maharana`, description: exp.description };
}

export default async function ExperienceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exp = getExperienceBySlug(slug);
  if (!exp) notFound();

  return (
    <>
      <section className="relative flex h-[70vh] min-h-[480px] items-end overflow-hidden pt-28">
        <Image src={exp.image} alt={exp.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/10" />
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-16 md:px-10">
          <FadeIn>
            <p className="label mb-4 text-brass-soft">Experience {exp.number}</p>
            <h1 className="font-display text-4xl leading-[1.02] text-parchment sm:text-5xl md:text-7xl">
              {exp.title}
            </h1>
          </FadeIn>
        </div>
      </section>

      <section className="bg-ink px-6 py-24 md:px-10">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-[1.4fr_1fr] md:gap-24">
          <FadeIn>
            <p className="max-w-xl text-lg leading-relaxed text-parchment/85 md:text-xl">
              {exp.longDescription}
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="h-fit border border-parchment/10 p-8">
            <p className="label mb-6 text-muted-ink">Duration</p>
            <p className="mb-8 text-parchment">{exp.duration}</p>
            <ul className="space-y-3">
              {exp.details.map((d) => (
                <li key={d} className="flex items-center gap-3 text-sm text-parchment/80">
                  <Check size={14} strokeWidth={1.5} className="text-brass-soft" />
                  {d}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="label mt-10 block border border-parchment px-7 py-4 text-center text-parchment transition-colors duration-500 hover:bg-parchment hover:text-ink"
            >
              Arrange This Experience
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
