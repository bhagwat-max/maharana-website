import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import RoomsListClient from "@/components/sections/RoomsListClient";
import { rooms } from "@/data/rooms";
import { img, IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Stay | The Maharana",
  description: "Rooms and suites at The Maharana, a heritage luxury hotel in Ahmedabad.",
};

export default function RoomsPage() {
  return (
    <>
      <PageHero
        eyebrow="Stay"
        title="Rooms & Suites"
        subtitle="Every room is designed as a quiet retreat — where original character meets contemporary comfort."
        image={img(IMAGES.rooms.lobbyArch, 2000, 78)}
      />
      <RoomsListClient rooms={rooms} />
    </>
  );
}
