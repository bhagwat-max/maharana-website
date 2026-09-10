import Link from "next/link";
import { site } from "@/data/site";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h3l1-3h-4V9c0-.6.4-1 1-1z" />
    </svg>
  );
}

const footerNav = [
  { label: "Stay", href: "/rooms" },
  { label: "Dine", href: "/dining" },
  { label: "Experience", href: "/experiences" },
  { label: "Heritage", href: "/heritage" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-parchment/10 bg-ink px-6 pb-8 pt-20 md:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl text-parchment">THE MAHARANA</p>
            <p className="label mt-4 max-w-xs text-muted">Where history lives beautifully.</p>
            <div className="mt-8 flex gap-5">
              <a href={site.social.instagram} aria-label="Instagram" className="text-parchment/70 transition-colors hover:text-parchment">
                <InstagramIcon />
              </a>
              <a href={site.social.facebook} aria-label="Facebook" className="text-parchment/70 transition-colors hover:text-parchment">
                <FacebookIcon />
              </a>
            </div>
          </div>

          <div>
            <p className="label mb-5 text-muted">Explore</p>
            <ul className="space-y-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-parchment/90">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label mb-5 text-muted">Contact</p>
            <p className="text-parchment/90">{site.address}</p>
            <a href={`mailto:${site.email}`} className="link-underline mt-3 block text-parchment/90">
              {site.email}
            </a>
            <a href={`tel:${site.phone}`} className="link-underline mt-1 block text-parchment/90">
              {site.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="mt-20 flex flex-col-reverse items-start justify-between gap-4 border-t border-parchment/10 pt-8 text-xs text-muted md:flex-row md:items-center">
          <p>© 2026 The Maharana</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="link-underline">
              Privacy
            </Link>
            <Link href="/terms" className="link-underline">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
