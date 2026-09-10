"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { viewportOnce, easeSignature } from "@/lib/motion";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}

/**
 * Signature image treatment: the image starts masked and scaled up (1.08),
 * then unmasks and settles to scale 1 as it enters the viewport.
 */
export default function ImageReveal({ src, alt, className, sizes, priority, fill = true }: ImageRevealProps) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className ?? ""}`}
      initial={{ clipPath: "inset(6% 6% 6% 6%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={viewportOnce}
      transition={{ duration: 1.2, ease: easeSignature }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1.4, ease: easeSignature }}
      >
        {fill ? (
          <Image src={src} alt={alt} fill sizes={sizes ?? "100vw"} priority={priority} className="object-cover" />
        ) : (
          <Image src={src} alt={alt} width={1600} height={1200} priority={priority} className="h-full w-full object-cover" />
        )}
      </motion.div>
    </motion.div>
  );
}
