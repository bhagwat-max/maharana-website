import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import type { Restaurant } from "@/data/restaurants";

export default function DiningListClient({ restaurants }: { restaurants: Restaurant[] }) {
  return (
    <section className="bg-ink px-6 py-24 md:px-10">
      <div className="mx-auto max-w-[1600px] space-y-24 md:space-y-32">
        {restaurants.map((restaurant, i) => (
          <FadeIn key={restaurant.id}>
            <div
              id={restaurant.slug}
              className={`scroll-mt-32 flex flex-col gap-10 md:gap-16 ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} md:items-center`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden md:w-3/5">
                <Image
                  src={restaurant.images[0]}
                  alt={restaurant.name}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="md:w-2/5">
                <span className="label text-muted-ink">{restaurant.cuisine}</span>
                <h2 className="mt-4 font-display text-4xl text-parchment">{restaurant.name}</h2>
                <p className="mt-5 max-w-sm text-parchment/75">{restaurant.longDescription}</p>

                <div className="mt-8 space-y-2">
                  {restaurant.openingHours.map((h) => (
                    <div key={h.label} className="flex justify-between border-b border-parchment/10 py-2 text-sm">
                      <span className="text-muted">{h.label}</span>
                      <span className="text-parchment">{h.hours}</span>
                    </div>
                  ))}
                </div>

                <ul className="mt-8 space-y-4">
                  {restaurant.menuHighlights.map((m) => (
                    <li key={m.name}>
                      <p className="text-parchment">{m.name}</p>
                      <p className="text-sm text-muted">{m.description}</p>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="label mt-10 inline-block border border-parchment px-7 py-4 text-parchment transition-colors duration-500 hover:bg-parchment hover:text-ink"
                >
                  Reserve a Table
                </Link>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
