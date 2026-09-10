import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import GalleryFilterClient from "@/components/sections/GalleryFilterClient";
import { galleryImages } from "@/data/gallery";
import { img, IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "Gallery | The Maharana",
  description: "A visual tour of The Maharana — architecture, rooms, dining and experiences.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A Closer Look."
        image={img(IMAGES.architecture.skylight, 2000, 78)}
      />
      <GalleryFilterClient images={galleryImages} />
    </>
  );
}
