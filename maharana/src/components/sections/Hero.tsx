"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { img, IMAGES } from "@/lib/images";
import { easeSignature } from "@/lib/motion";
import RevealText from "@/components/ui/RevealText";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease: easeSignature }}
      >
        <Image
          src={img(IMAGES.architecture.archway, 2000, 85)}
          alt="Carved stone archway at The Maharana, Ahmedabad"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.4 }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-20 md:px-10 md:pb-28">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="label mb-6 text-brass-soft"
        >
          Ahmedabad · India
        </motion.p>

        <h1 className="font-display text-[13vw] leading-[0.95] text-parchment sm:text-[9vw] md:text-[7.2vw] lg:text-[6.2vw]">
          <RevealText delay={1.1} triggerOnMount lines={["Where", "History", "Lives", "Beautifully."]} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.9 }}
          className="mt-8 max-w-md text-balance text-base text-parchment/80 md:text-lg"
        >
          A private world of heritage, hospitality and quiet luxury in the heart of Ahmedabad.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.1 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/heritage"
            className="label border border-parchment px-7 py-4 text-center text-parchment transition-colors duration-500 hover:bg-parchment hover:text-ink"
          >
            Discover The Maharana
          </Link>
          <Link
            href="/booking"
            className="label border border-parchment/40 px-7 py-4 text-center text-parchment transition-colors duration-500 hover:border-parchment"
          >
            Book Your Stay
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.4 }}
        className="absolute bottom-10 left-6 z-10 hidden items-center gap-3 md:flex md:left-10"
      >
        <span className="h-10 w-px overflow-hidden bg-parchment/20">
          <motion.span
            className="block h-full w-full origin-top bg-brass-soft"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <span className="label text-parchment/60">Scroll to Explore</span>
      </motion.div>
    </section>
  );
}
