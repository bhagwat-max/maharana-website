"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-ink/90 backdrop-blur-md py-4" : "bg-transparent py-7"
        }`}
      >
       <nav className="mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-6 md:px-10">
          <Link href="/" className="font-display text-lg tracking-[0.08em] text-parchment md:text-xl">
            THE MAHARANA
          </Link>

          <ul className="hidden items-center gap-10 md:flex">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="label link-underline text-parchment/90">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

        <div className="col-start-3 row-start-1 flex items-center gap-5 justify-self-end">
            <ThemeToggle />

            <Link
              href="/booking"
              className="label hidden border border-parchment/60 px-6 py-3 text-parchment transition-colors duration-500 hover:bg-parchment hover:text-ink md:inline-block"
            >
              Book a Stay
            </Link>

            <button
              aria-label="Open menu"
              className="text-parchment md:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col bg-ink px-6 py-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg tracking-[0.08em] text-parchment">THE MAHARANA</span>
              <button aria-label="Close menu" className="text-parchment" onClick={() => setMenuOpen(false)}>
                <X size={26} strokeWidth={1.5} />
              </button>
            </div>

            <ul className="mt-16 flex flex-1 flex-col justify-center gap-2">
              {site.navMobile.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-4xl text-parchment"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Link
                href="/booking"
                onClick={() => setMenuOpen(false)}
                className="label inline-block border border-parchment/60 px-7 py-4 text-parchment"
              >
                Book Your Stay
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}