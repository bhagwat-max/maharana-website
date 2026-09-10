import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import { restaurants } from "@/data/restaurants";
import DiningCard from "@/components/sections/DiningCard";

export default function Dining() {
  return (
    <section className="bg-ink px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <FadeIn>
            <p className="label mb-6 text-brass-soft">Dine</p>
            <h2 className="max-w-xl font-display text-4xl leading-[1.05] text-parchment sm:text-5xl md:text-6xl">
              The Table Is Part Of The Journey.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link href="/dining" className="label link-underline text-brass-soft">
              Explore Dining
            </Link>
          </FadeIn>
        </div>

        <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-3 md:gap-6">
          {restaurants.map((restaurant, i) => (
            <DiningCard key={restaurant.id} restaurant={restaurant} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
