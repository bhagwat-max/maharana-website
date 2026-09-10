import FadeIn from "@/components/ui/FadeIn";
import { site } from "@/data/site";

export default function Intro() {
  return (
    <section className="grain bg-ink px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-14 md:grid-cols-2 md:gap-24">
        <FadeIn>
          <p className="label mb-8 text-brass-soft">A Stay Beyond</p>
          <h2 className="font-display text-4xl leading-[1.05] text-parchment sm:text-5xl md:text-6xl">
            A Stay
            <br />
            Beyond
            <br />
            The Ordinary.
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} className="flex flex-col justify-between">
          <p className="max-w-md text-lg leading-relaxed text-parchment/80 md:text-xl">
            Behind its historic walls, The Maharana brings together the soul of Ahmedabad and the
            rituals of modern luxury.
          </p>

          <div className="mt-16">
            <div className="hairline mb-6 max-w-md" />
            <dl className="grid grid-cols-3 gap-4 text-sm text-muted">
              <div>
                <dt className="label mb-1 text-muted-ink">Est.</dt>
                <dd className="text-parchment">{site.founded}</dd>
              </div>
              <div>
                <dt className="label mb-1 text-muted-ink">City</dt>
                <dd className="text-parchment">{site.city}</dd>
              </div>
              <div>
                <dt className="label mb-1 text-muted-ink">Region</dt>
                <dd className="text-parchment">{site.state}, India</dd>
              </div>
            </dl>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
