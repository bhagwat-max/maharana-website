import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  arrow?: boolean;
}

export default function Button({ href, children, variant = "primary", className, arrow = true }: ButtonProps) {
  const base =
    "group inline-flex items-center gap-3 label px-7 py-4 border transition-colors duration-500";

  const styles = {
    primary: "border-parchment text-parchment hover:bg-parchment hover:text-ink",
    secondary: "border-parchment/40 text-parchment hover:border-parchment",
    ghost: "border-ink text-ink hover:bg-ink hover:text-parchment",
  };

  return (
    <Link href={href} className={clsx(base, styles[variant], className)}>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          size={14}
          strokeWidth={1.5}
          className="transition-transform duration-500 group-hover:translate-x-1"
        />
      )}
    </Link>
  );
}
