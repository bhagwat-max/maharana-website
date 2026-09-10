import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import DiningListClient from "@/components/sections/DiningListClient";
import { restaurants } from "@/data/restaurants";
import { img, IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Dine | The Maharana",
  description: "Darbar, Mehfil and The Courtyard — dining at The Maharana, Ahmedabad.",
};

export default function DiningPage() {
  return (
    <>
      <PageHero
        eyebrow="Dine"
        title="The Table Is Part Of The Journey."
        subtitle="Three distinct rooms, one philosophy: unhurried, seasonal, deeply of this city."
        image={img(IMAGES.dining.thaliSilver, 2000, 78)}
      />
      <DiningListClient restaurants={restaurants} />
    </>
  );
}
