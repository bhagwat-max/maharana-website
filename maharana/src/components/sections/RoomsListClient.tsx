"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ImageReveal from "@/components/ui/ImageReveal";
import FadeIn from "@/components/ui/FadeIn";
import type { Room, RoomCategory } from "@/data/rooms";

const filters: { label: string; value: RoomCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Suites", value: "suite" },
  { label: "Rooms", value: "room" },
];

export default function RoomsListClient({ rooms }: { rooms: Room[] }) {
  const [filter, setFilter] = useState<RoomCategory | "all">("all");
  const shown = filter === "all" ? rooms : rooms.filter((r) => r.category === filter);

  return (
    <section className="bg-ink px-6 py-24 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex gap-8 border-b border-parchment/10 pb-6">
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

        <div className="mt-20 space-y-24 md:space-y-32">
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
                  <span className="label text-muted-ink">{room.category === "suite" ? "Suite" : "Room"}</span>
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
