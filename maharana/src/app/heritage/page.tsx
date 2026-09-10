import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import FadeIn from "@/components/ui/FadeIn";
import ImageReveal from "@/components/ui/ImageReveal";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { img, IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Heritage | The Maharana",
  description: "The story of The Maharana, a heritage luxury hotel in Ahmedabad since 1928.",
};

const timeline = [
  {
    year: "1928",
    title: "The Beginning",
    text: "A merchant family of the old city commissions a private haveli near Bhadra Fort — carved sandstone, teak lattice screens, three interlinked courtyards.",
  },
  {
    year: "1956",
    title: "A New Chapter",
    text: "The house passes to a second generation, who open its courtyards to travelling relatives and, occasionally, to guests of the city — the first informal steps toward hospitality.",
  },
  {
    year: "1987",
    title: "The House Expands",
    text: "A sympathetic restoration adds a west wing without disturbing the original structure, doubling the number of rooms while keeping every original archway intact.",
  },
  {
    year: "2026",
    title: "The Maharana",
    text: "Reopened as The Maharana — a heritage luxury hotel built on the same stones, guided by the same instinct: preserve first, add quietly.",
  },
];

export default function HeritagePage() {
  return (
    <>
      <PageHero
        eyebrow="Heritage"
        title="A House With A History."
        subtitle="Born from Ahmedabad's rich architectural legacy, preserved for a new generation."
        image={img(IMAGES.architecture.aerial, 2000, 78)}
      />

      <section className="bg-ink px-6 py-24 md:px-10">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <p className="text-lg leading-relaxed text-parchment/85 md:text-xl">
              Every heritage hotel makes a promise it rarely keeps: that the past is still alive in
              the walls. At The Maharana, that promise is structural. The three original courtyards,
              the hand-carved teak brackets, the sandstone quarried from the same hills that built
              the old city — none of it is a reproduction. It survived, and we have simply given it
              a new rhythm.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-ink-soft px-6 py-24 md:px-10">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <p className="label mb-16 text-brass-soft">A Timeline</p>
          </FadeIn>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <FadeIn key={item.year} delay={i * 0.05}>
                <div className="grid grid-cols-[auto_1fr] gap-6 border-t border-parchment/10 py-10 md:grid-cols-[140px_1fr] md:gap-12">
                  <span className="font-display text-3xl text-brass-soft md:text-4xl">{item.year}</span>
                  <div>
                    <h3 className="font-display text-2xl text-parchment md:text-3xl">{item.title}</h3>
                    <p className="mt-3 max-w-xl text-parchment/75">{item.text}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink px-6 py-24 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <ParallaxImage
            src={img(IMAGES.architecture.facade2, 1800)}
            alt="Restored facade of The Maharana"
            className="aspect-[16/9] w-full"
          />
        </div>
      </section>

      <section className="bg-ink px-6 pb-24 md:px-10">
        <div className="mx-auto grid max-w-[1600px] gap-4 md:grid-cols-3">
          <ImageReveal src={img(IMAGES.architecture.carvedDoor)} alt="Carved door detail" className="aspect-[3/4]" />
          <ImageReveal src={img(IMAGES.architecture.windows)} alt="Window detail" className="aspect-[3/4]" />
          <ImageReveal src={img(IMAGES.architecture.skylight)} alt="Courtyard skylight" className="aspect-[3/4]" />
        </div>
      </section>
    </>
  );
}
