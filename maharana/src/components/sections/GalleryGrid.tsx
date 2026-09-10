"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/data/gallery";

const spanFor = (orientation: GalleryImage["orientation"], index: number) => {
  if (orientation === "portrait") return "row-span-2";
  if (orientation === "landscape" && index % 5 === 0) return "md:col-span-2";
  return "";
};

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(() => setActiveIndex((i) => (i === null ? null : (i + 1) % images.length)), [images.length]);
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, next, prev]);

  return (
    <>
      <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:grid-cols-4 md:gap-4 lg:auto-rows-[260px]">
        {images.map((image, i) => (
          <button
            key={image.id}
            type="button"
            data-cursor="view"
            onClick={() => setActiveIndex(i)}
            className={`group relative overflow-hidden text-left ${spanFor(image.orientation, i)}`}
            aria-label={`Open image: ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="label p-4 text-parchment">{image.alt}</span>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/97 p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <button
              aria-label="Close gallery"
              onClick={close}
              className="absolute right-5 top-5 text-parchment/80 transition-colors hover:text-parchment"
            >
              <X size={26} strokeWidth={1.5} />
            </button>

            <button
              aria-label="Previous image"
              onClick={prev}
              className="absolute left-3 text-parchment/70 transition-colors hover:text-parchment md:left-8"
            >
              <ChevronLeft size={32} strokeWidth={1.2} />
            </button>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative h-[70vh] w-full max-w-4xl"
            >
              <Image
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>

            <button
              aria-label="Next image"
              onClick={next}
              className="absolute right-3 text-parchment/70 transition-colors hover:text-parchment md:right-8"
            >
              <ChevronRight size={32} strokeWidth={1.2} />
            </button>

            <div className="absolute bottom-6 label text-parchment/60">
              {activeIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
