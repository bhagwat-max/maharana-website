"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { experiences } from "@/data/experiences";

export default function Experiences() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 900px)").matches;
    if (reduceMotion || !isDesktop || !sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const distance = track.scrollWidth - window.innerWidth;
      if (distance <= 0) return;

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-ink-soft">
      <div className="px-6 pt-24 md:px-10">
        <FadeIn>
          <p className="label mb-6 text-brass-soft">Experience</p>
          <h2 className="max-w-2xl font-display text-4xl leading-[1.05] text-parchment sm:text-5xl md:text-6xl">
            The City, Your Way.
          </h2>
        </FadeIn>
      </div>

      {/* Desktop: GSAP-pinned horizontal track. Mobile: normal vertical stack. */}
      <div
        ref={trackRef}
        className="mt-16 flex flex-col gap-10 px-6 pb-24 md:mt-20 md:flex-row md:gap-8 md:px-10 md:pb-0 md:will-change-transform"
      >
        {experiences.map((exp) => (
          <Link
            key={exp.id}
            href={`/experiences/${exp.slug}`}
            data-cursor="view"
            className="group relative block aspect-[4/5] w-full flex-shrink-0 overflow-hidden md:h-[70vh] md:w-[70vw] md:max-w-[620px]"
          >
            <Image
              src={exp.image}
              alt={exp.title}
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
            <span className="absolute left-7 top-7 font-display text-2xl text-brass-soft">{exp.number}</span>
            <div className="absolute inset-x-0 bottom-0 p-7">
              <h3 className="font-display text-3xl text-parchment">{exp.title}</h3>
              <p className="mt-2 max-w-sm text-sm text-parchment/75">{exp.description}</p>
              <span className="label mt-5 inline-flex items-center gap-2 text-brass-soft">
                Discover
                <ArrowUpRight size={13} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
