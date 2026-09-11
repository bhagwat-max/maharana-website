"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { easeSignature } from "@/lib/motion";
import RevealText from "@/components/ui/RevealText";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink">
      <motion.div
  className="absolute -inset-[2%]"
  initial={{ opacity: 0, scale: 1.03 }}
  animate={{
    opacity: 1,
    scale: [1.03, 1.09, 1.03],
    x: ["0%", "-1.2%", "0%"],
    y: ["0%", "-0.5%", "0%"],
  }}
  transition={{
    opacity: {
      duration: 1.8,
      ease: easeSignature,
    },
    scale: {
      duration: 20,
      repeat: Infinity,
      ease: "easeInOut",
    },
    x: {
      duration: 20,
      repeat: Infinity,
      ease: "easeInOut",
    },
    y: {
      duration: 20,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
>
  <Image
    src="/images/hero-night.png"
    alt="The Maharana heritage courtyard illuminated at night"
    fill
    priority
    sizes="100vw"
    className="object-cover"
  />
</motion.div>

<motion.div
  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_67%_56%,rgba(198,147,73,0.20),transparent_36%)] mix-blend-screen"
  animate={{
    opacity: [0.3, 0.65, 0.3],
    scale: [1, 1.06, 1],
  }}
  transition={{
    duration: 7,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.4 }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-ink/10" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-20 pt-32 md:px-10 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-20 lg:pt-0">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="label mb-6 text-brass-soft"
          >
            Ahmedabad &middot; India
          </motion.p>

          <h1 className="max-w-5xl font-display text-[clamp(4rem,6.6vw,7rem)] leading-[0.9] tracking-[-0.025em] text-parchment">
            <RevealText
              delay={1.1}
              triggerOnMount
              lines={["Where History", "Lives Beautifully."]}
            />
          </h1>
        </div>

        <div className="mt-10 lg:mt-0 lg:pb-2">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.9 }}
            className="max-w-md text-balance text-base text-parchment/80 md:text-lg"
          >
            A private world of heritage, hospitality and quiet luxury in the
            heart of Ahmedabad.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.1 }}
            className="mt-8 flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row"
          >
            <Link
              href="/heritage"
              className="label border border-parchment px-6 py-4 text-center text-parchment transition-colors duration-500 hover:bg-parchment hover:text-ink"
            >
              Discover The Maharana
            </Link>

            <Link
              href="/booking"
              className="label border border-parchment/40 px-6 py-4 text-center text-parchment transition-colors duration-500 hover:border-parchment"
            >
              Book Your Stay
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.4 }}
        className="absolute bottom-5 left-6 z-10 hidden items-center gap-3 md:left-10 md:flex"
      >
        <span className="h-8 w-px overflow-hidden bg-parchment/20">
          <motion.span
            className="block h-full w-full origin-top bg-brass-soft"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </span>

        <span className="label text-parchment/60">
          Scroll to Explore
        </span>
      </motion.div>
    </section>
  );
}