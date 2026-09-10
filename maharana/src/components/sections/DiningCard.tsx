"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { viewportOnce } from "@/lib/motion";
import type { Restaurant } from "@/data/restaurants";

export default function DiningCard({ restaurant, index }: { restaurant: Restaurant; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/dining#${restaurant.slug}`} data-cursor="view" className="group relative block aspect-[3/4] overflow-hidden">
        <Image
          src={restaurant.images[0]}
          alt={restaurant.name}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent transition-opacity duration-500 group-hover:from-ink/95" />
        <div className="absolute inset-x-0 bottom-0 p-7 transition-transform duration-500 group-hover:-translate-y-2">
          <h3 className="font-display text-3xl text-parchment">{restaurant.name}</h3>
          <p className="mt-2 max-w-[85%] text-sm text-parchment/75">{restaurant.description}</p>
          <span className="label mt-5 inline-flex items-center gap-2 text-brass-soft opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            View Menu
            <ArrowUpRight size={13} strokeWidth={1.5} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
