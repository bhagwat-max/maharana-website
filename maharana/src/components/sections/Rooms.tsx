import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ImageReveal from "@/components/ui/ImageReveal";
import FadeIn from "@/components/ui/FadeIn";
import { rooms } from "@/data/rooms";

export default function Rooms() {
  const shown = rooms.slice(0, 3);

  return (
    <section className="bg-ink px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <FadeIn>
            <p className="label mb-6 text-brass-soft">Stay</p>
            <h2 className="max-w-xl font-display text-4xl leading-[1.05] text-parchment sm:text-5xl md:text-6xl">
              Your Private Corner Of Ahmedabad.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="max-w-sm">
            <p className="text-parchment/70">
              Every room is designed as a quiet retreat — where original character meets
              contemporary comfort.
            </p>
          </FadeIn>
        </div>

        <div className="mt-20 space-y-24 md:mt-28 md:space-y-32">
          {shown.map((room, i) => (
            <FadeIn key={room.id}>
              <Link
                href={`/rooms/${room.slug}`}
                data-cursor="view"
                className={`group flex flex-col gap-8 md:gap-16 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                } md:items-center`}
              >
                <ImageReveal
                  src={room.images[0]}
                  alt={room.name}
                  className="aspect-[4/3] w-full md:w-3/5"
                  sizes="(min-width: 768px) 60vw, 100vw"
                />
                <div className="md:w-2/5">
                  <span className="label text-muted-ink">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 font-display text-3xl text-parchment sm:text-4xl">{room.name}</h3>
                  <p className="mt-5 max-w-sm text-parchment/70">{room.description}</p>
                  <dl className="mt-8 flex gap-8 text-sm text-muted">
                    <div>
                      <dt className="label mb-1 text-muted-ink">Size</dt>
                      <dd className="text-parchment">{room.size}</dd>
                    </div>
                    <div>
                      <dt className="label mb-1 text-muted-ink">Guests</dt>
                      <dd className="text-parchment">{room.guests}</dd>
                    </div>
                    <div>
                      <dt className="label mb-1 text-muted-ink">From</dt>
                      <dd className="text-parchment">₹{room.price.toLocaleString("en-IN")}</dd>
                    </div>
                  </dl>
                  <span className="label mt-8 inline-flex items-center gap-3 text-brass-soft">
                    View Room
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.5}
                      className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
