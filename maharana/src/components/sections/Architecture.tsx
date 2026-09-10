import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import { img, IMAGES } from "@/lib/images";

const details = ["Carved stone.", "Handcrafted wood.", "Sunlit courtyards.", "Quiet corridors."];

export default function Architecture() {
  return (
    <section className="relative flex h-[90vh] min-h-[600px] items-center justify-center overflow-hidden">
      <Image
        src={img(IMAGES.architecture.monochrome, 2000, 75)}
        alt="Architectural detail at The Maharana"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/70" />

      <div className="relative z-10 px-6 text-center">
        <FadeIn>
          <h2 className="font-display text-4xl leading-[1.05] text-parchment sm:text-5xl md:text-7xl">
            Every Wall
            <br />
            Remembers
            <br />
            Something.
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm uppercase tracking-[0.15em] text-parchment/60">
            {details.map((d, i) => (
              <span key={d} className="flex items-center gap-6">
                {d}
                {i < details.length - 1 && <span className="h-1 w-1 rounded-full bg-brass-soft" />}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
