"use client";

import { motion } from "framer-motion";
import { lineReveal, staggerContainer, viewportOnce } from "@/lib/motion";

interface RevealTextProps {
  lines: string[];
  className?: string;
  delay?: number;
  triggerOnMount?: boolean;
}

/**
 * Reveals each line from a clipped container, sliding up from below.
 * Signature text treatment used across hero and section headlines.
 */
export default function RevealText({ lines, className, delay = 0, triggerOnMount = false }: RevealTextProps) {
  return (
    <motion.span
      className={className}
      style={{ display: "block" }}
      initial="hidden"
      animate={triggerOnMount ? "visible" : undefined}
      whileInView={triggerOnMount ? undefined : "visible"}
      viewport={triggerOnMount ? undefined : viewportOnce}
      variants={staggerContainer(0.12, delay)}
    >
      {lines.map((line, i) => (
        <span key={i} style={{ display: "block", overflow: "hidden" }}>
          <motion.span style={{ display: "block" }} variants={lineReveal}>
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
