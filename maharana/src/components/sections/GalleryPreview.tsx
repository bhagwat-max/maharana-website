import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import GalleryGrid from "@/components/sections/GalleryGrid";
import { galleryImages } from "@/data/gallery";

export default function GalleryPreview() {
  return (
    <section className="bg-ink px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <FadeIn>
            <p className="label mb-6 text-brass-soft">Gallery</p>
            <h2 className="max-w-xl font-display text-4xl leading-[1.05] text-parchment sm:text-5xl md:text-6xl">
              A Closer Look.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link href="/gallery" className="label link-underline text-brass-soft">
              View Full Gallery
            </Link>
          </FadeIn>
        </div>

        <div className="mt-16 md:mt-20">
          <GalleryGrid images={galleryImages.slice(0, 8)} />
        </div>
      </div>
    </section>
  );
}
