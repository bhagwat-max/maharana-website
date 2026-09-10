import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import { img, IMAGES } from "@/lib/images";

export default function BookingCTA() {
  return (
    <section className="relative flex h-[90vh] min-h-[600px] items-center justify-center overflow-hidden">
      <Image
        src={img(IMAGES.architecture.skylight, 2000, 78)}
        alt="Courtyard at The Maharana at dusk"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink/60" />

      <div className="relative z-10 px-6 text-center">
        <FadeIn>
          <h2 className="font-display text-5xl leading-[1.02] text-parchment sm:text-6xl md:text-8xl">
            Your Room
            <br />
            Is Waiting.
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mt-8 text-lg text-parchment/80">
            Come for the history.
            <br />
            Stay for the feeling.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <Link
            href="/booking"
            className="label mt-12 inline-block border border-parchment px-9 py-5 text-parchment transition-colors duration-500 hover:bg-parchment hover:text-ink"
          >
            Book Your Stay
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
