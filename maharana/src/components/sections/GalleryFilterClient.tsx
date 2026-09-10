"use client";

import { useState } from "react";
import GalleryGrid from "@/components/sections/GalleryGrid";
import type { GalleryImage, GalleryCategory } from "@/data/gallery";

const filters: { label: string; value: GalleryCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Architecture", value: "architecture" },
  { label: "Rooms", value: "rooms" },
  { label: "Dining", value: "dining" },
  { label: "Experiences", value: "experiences" },
];

export default function GalleryFilterClient({ images }: { images: GalleryImage[] }) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const shown = filter === "all" ? images : images.filter((img) => img.category === filter);

  return (
    <section className="bg-ink px-6 py-24 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-wrap gap-x-8 gap-y-3 border-b border-parchment/10 pb-6">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`label transition-colors duration-300 ${
                filter === f.value ? "text-brass-soft" : "text-muted hover:text-parchment"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-14">
          <GalleryGrid images={shown} />
        </div>
      </div>
    </section>
  );
}
