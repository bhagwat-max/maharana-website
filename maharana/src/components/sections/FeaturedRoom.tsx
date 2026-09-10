"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { viewportOnce, easeSignature } from "@/lib/motion";
import { rooms } from "@/data/rooms";

export default function FeaturedRoom() {
  const room = rooms[0];

  return (
    <section className="relative h-[85vh] min-h-[560px] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1.8, ease: easeSignature }}
      >
        <Image src={room.images[1]} alt={room.name} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-ink/45" />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: easeSignature }}
          className="mx-auto w-full max-w-[1600px]"
        >
          <p className="label mb-4 text-brass-soft">Featured Residence</p>
          <h2 className="font-display text-4xl text-parchment sm:text-5xl md:text-6xl">{room.name}</h2>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-parchment/80">
            <span>{room.size}</span>
            <span>{room.guests} Guests</span>
            <span>{room.bed}</span>
          </div>
          <Link
            href={`/rooms/${room.slug}`}
            className="label mt-10 inline-block border border-parchment px-7 py-4 text-parchment transition-colors duration-500 hover:bg-parchment hover:text-ink"
          >
            Explore Suite
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
