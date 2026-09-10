import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ParallaxImage from "@/components/ui/ParallaxImage";
import FadeIn from "@/components/ui/FadeIn";
import { img, IMAGES } from "@/lib/images";

export default function Heritage() {
  return (
    <section className="relative bg-ink-soft px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <FadeIn>
          <p className="label mb-6 text-brass-soft">Heritage</p>
          <h2 className="max-w-2xl font-display text-4xl leading-[1.05] text-parchment sm:text-5xl md:text-6xl">
            A House With A History.
          </h2>
        </FadeIn>

        <div className="relative mt-16 md:mt-20">
          <ParallaxImage
            src={img(IMAGES.architecture.facade1, 1800)}
            alt="Heritage facade of The Maharana"
            className="aspect-[16/10] w-full md:aspect-[21/9]"
          />

          <FadeIn
            delay={0.1}
            className="relative z-10 mx-auto -mt-16 max-w-lg bg-ink p-8 md:-mt-24 md:ml-16 md:p-12"
          >
            <p className="text-lg leading-relaxed text-parchment/85 md:text-xl">
              Born from Ahmedabad&apos;s rich architectural legacy, The Maharana preserves the
              character of another era while giving it a new rhythm.
            </p>
            <Link
              href="/heritage"
              className="group label mt-8 inline-flex items-center gap-3 text-brass-soft"
            >
              Discover Our Story
              <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
