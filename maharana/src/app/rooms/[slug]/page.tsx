import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import ImageReveal from "@/components/ui/ImageReveal";
import { rooms, getRoomBySlug } from "@/data/rooms";

export function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) return {};
  return {
    title: `${room.name} | The Maharana`,
    description: room.description,
  };
}

export default async function RoomDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) notFound();

  return (
    <>
      <section className="relative flex h-[75vh] min-h-[520px] items-end overflow-hidden pt-28">
        <Image src={room.images[0]} alt={room.name} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/10" />
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-16 md:px-10">
          <FadeIn>
            <p className="label mb-4 text-brass-soft">{room.category === "suite" ? "Suite" : "Room"}</p>
            <h1 className="font-display text-4xl leading-[1.02] text-parchment sm:text-5xl md:text-7xl">
              {room.name}
            </h1>
          </FadeIn>
        </div>
      </section>

      <section className="bg-ink px-6 py-24 md:px-10">
        <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-[1.4fr_1fr] md:gap-24">
          <div>
            <FadeIn>
              <p className="max-w-xl text-lg leading-relaxed text-parchment/85 md:text-xl">
                {room.longDescription}
              </p>
            </FadeIn>

            <div className="mt-16 grid gap-4 md:grid-cols-2">
              {room.images.slice(1).map((src, i) => (
                <ImageReveal
                  key={i}
                  src={src}
                  alt={`${room.name} detail ${i + 1}`}
                  className="aspect-[4/3]"
                  sizes="(min-width: 768px) 40vw, 100vw"
                />
              ))}
            </div>
          </div>

          <FadeIn delay={0.1} className="h-fit border border-parchment/10 p-8 md:sticky md:top-32">
            <dl className="space-y-5 text-sm">
              <div className="flex justify-between border-b border-parchment/10 pb-4">
                <dt className="label text-muted-ink">Size</dt>
                <dd className="text-parchment">{room.size}</dd>
              </div>
              <div className="flex justify-between border-b border-parchment/10 pb-4">
                <dt className="label text-muted-ink">Guests</dt>
                <dd className="text-parchment">{room.guests}</dd>
              </div>
              <div className="flex justify-between border-b border-parchment/10 pb-4">
                <dt className="label text-muted-ink">Bed</dt>
                <dd className="text-parchment">{room.bed}</dd>
              </div>
              <div className="flex justify-between pb-2">
                <dt className="label text-muted-ink">From</dt>
                <dd className="font-display text-2xl text-parchment">
                  ₹{room.price.toLocaleString("en-IN")}
                  <span className="ml-1 text-xs text-muted">/ night</span>
                </dd>
              </div>
            </dl>

            <ul className="mt-8 space-y-3">
              {room.amenities.map((a) => (
                <li key={a} className="flex items-center gap-3 text-sm text-parchment/80">
                  <Check size={14} strokeWidth={1.5} className="text-brass-soft" />
                  {a}
                </li>
              ))}
            </ul>

            <Link
              href="/booking"
              className="label mt-10 block border border-parchment px-7 py-4 text-center text-parchment transition-colors duration-500 hover:bg-parchment hover:text-ink"
            >
              Book This Room
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
