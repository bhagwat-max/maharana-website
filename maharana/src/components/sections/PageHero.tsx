import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
}

export default function PageHero({ eyebrow, title, subtitle, image }: PageHeroProps) {
  return (
    <section className="relative flex h-[60vh] min-h-[420px] items-end overflow-hidden pt-28">
      <Image src={image} alt={title} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-16 md:px-10">
        <FadeIn>
          <p className="label mb-4 text-brass-soft">{eyebrow}</p>
          <h1 className="font-display text-4xl leading-[1.02] text-parchment sm:text-5xl md:text-7xl">
            {title}
          </h1>
          {subtitle && <p className="mt-6 max-w-lg text-parchment/75">{subtitle}</p>}
        </FadeIn>
      </div>
    </section>
  );
}
