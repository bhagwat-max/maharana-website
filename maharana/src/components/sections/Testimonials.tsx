"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const advance = useCallback(() => setIndex((i) => (i + 1) % testimonials.length), []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const t = setInterval(advance, 6500);
    return () => clearInterval(t);
  }, [advance]);

  const current = testimonials[index];

  return (
    <section className="bg-ink-soft px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-3xl text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-display text-2xl leading-snug text-parchment sm:text-3xl md:text-4xl">
              &ldquo;{current.quote}&rdquo;
            </p>
            <p className="label mt-10 text-brass-soft">
              {current.author}
              <span className="text-muted"> — {current.location}</span>
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex justify-center gap-3">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 w-8 transition-colors duration-500 ${
                i === index ? "bg-brass-soft" : "bg-parchment/15"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
