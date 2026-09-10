import { ArrowUpRight } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const distances = [
  { place: "Sabarmati Ashram", time: "15 min" },
  { place: "Old City", time: "8 min" },
  { place: "Manek Chowk", time: "10 min" },
  { place: "Sardar Vallabhbhai Patel Airport", time: "25 min" },
];

export default function Location() {
  return (
    <section className="bg-ink px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-16 md:grid-cols-2 md:gap-24">
        <FadeIn>
          <p className="label mb-6 text-brass-soft">Location</p>
          <h2 className="font-display text-4xl leading-[1.05] text-parchment sm:text-5xl md:text-6xl">
            Ahmedabad,
            <br />
            At Your Doorstep.
          </h2>

          <ul className="mt-12 space-y-5">
            {distances.map((d) => (
              <li key={d.place} className="flex items-center justify-between border-b border-parchment/10 pb-5">
                <span className="text-parchment/85">{d.place}</span>
                <span className="label text-muted-ink">{d.time}</span>
              </li>
            ))}
          </ul>

          <a
            href="https://maps.google.com/?q=Bhadra+Fort+Ahmedabad"
            target="_blank"
            rel="noopener noreferrer"
            className="group label mt-10 inline-flex items-center gap-3 text-brass-soft"
          >
            Get Directions
            <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </FadeIn>

        <FadeIn delay={0.15}>
          {/* Stylized, illustrative map — not a live embed */}
          <div className="relative aspect-square w-full border border-parchment/10 bg-ink-soft">
            <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
              <g stroke="var(--line)" strokeWidth="1" fill="none">
                <path d="M0 80 H400 M0 160 H400 M0 240 H400 M0 320 H400" />
                <path d="M80 0 V400 M160 0 V400 M240 0 V400 M320 0 V400" />
              </g>
              <path
                d="M40 340 C 120 260, 140 180, 90 100 C 70 60, 120 20, 200 40 C 280 60, 260 140, 320 160 C 370 176, 360 260, 300 300"
                stroke="var(--brass)"
                strokeWidth="1.5"
                fill="none"
                opacity="0.6"
              />
              <circle cx="200" cy="200" r="7" fill="var(--brass)" />
              <circle cx="200" cy="200" r="16" stroke="var(--brass)" strokeWidth="1" fill="none" opacity="0.5" />
              <text x="212" y="196" fill="var(--parchment)" fontSize="11" letterSpacing="0.05em">
                THE MAHARANA
              </text>
              <circle cx="130" cy="140" r="3" fill="var(--stone)" />
              <circle cx="290" cy="150" r="3" fill="var(--stone)" />
              <circle cx="260" cy="280" r="3" fill="var(--stone)" />
              <circle cx="340" cy="90" r="3" fill="var(--stone)" />
            </svg>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
