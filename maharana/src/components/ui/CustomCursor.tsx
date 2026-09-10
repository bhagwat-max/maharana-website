"use client";

import { useEffect, useRef, useState } from "react";

function shouldEnableCursor(): boolean {
  if (typeof window === "undefined") return false;
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return isFinePointer && !reduceMotion;
}

/**
 * Subtle custom cursor for desktop pointer devices only.
 * Expands over interactive elements; never rendered on touch devices.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  // Always start disabled so server & first client render match exactly.
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  // Decide the real value only after mount (client-only, post-hydration).
  useEffect(() => {
    setEnabled(shouldEnableCursor());
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
      const target = e.target as HTMLElement;
      const viewEl = target.closest("[data-cursor='view']");
      const interactive = target.closest("a, button");
      if (viewEl) setLabel("VIEW");
      else if (interactive) setLabel("");
      else setLabel(null);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [enabled]);

  if (!enabled) return null;

  const expanded = label !== null;
  const showText = Boolean(label);

  return (
    <div
      ref={dotRef}
      className="cursor-dot flex items-center justify-center"
      style={{
        width: expanded ? (showText ? 56 : 22) : 10,
        height: expanded ? (showText ? 56 : 22) : 10,
        background: showText ? "var(--parchment)" : "transparent",
        color: showText ? "var(--ink)" : "transparent",
      }}
    >
      {showText && <span className="text-[9px] tracking-[0.2em]">{label}</span>}
    </div>
  );
}