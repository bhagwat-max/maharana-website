"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { fadeUp, viewportOnce } from "@/lib/motion";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section";
}

export default function FadeIn({ children, delay = 0, className, as = "div" }: FadeInProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}
