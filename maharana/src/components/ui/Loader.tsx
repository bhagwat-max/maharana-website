"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function Loader() {
  const [reduceMotion] = useState(prefersReducedMotion);
  const [visible, setVisible] = useState(!reduceMotion);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 4));
    }, 30);
    const timeout = setTimeout(() => setVisible(false), 1400);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        >
          <motion.p
            className="font-display text-3xl tracking-[0.15em] text-parchment"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            THE MAHARANA
          </motion.p>
          <div className="mt-8 h-px w-40 bg-parchment/15">
            <motion.div
              className="h-full bg-brass"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
