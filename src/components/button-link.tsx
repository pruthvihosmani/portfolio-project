import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";

import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  download?: boolean;
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", download, className }: ButtonLinkProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const classes = cn(
    "group inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300",
    variant === "primary" && "bg-blue-600 !text-white shadow-[0_16px_32px_rgba(37,99,235,0.20)] hover:bg-blue-700",
    variant === "secondary" && "border border-slate-200 bg-white text-slate-950 shadow-clay hover:border-blue-200 hover:bg-blue-50",
    variant === "ghost" && "text-slate-700 hover:text-blue-700",
    className,
  );
  const icon = download ? <Download className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />;

  if (isExternal) {
    return (
      <a className={classes} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" download={download}>
        {children}
        {icon}
      </a>
    );
  }

  return (
    <Link className={classes} href={href} download={download}>
      {children}
      {icon}
    </Link>
  );
}
