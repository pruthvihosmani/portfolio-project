import Link from "next/link";
import { Code2, Mail, Network } from "lucide-react";

import type { Profile, SiteSettings } from "@/sanity/types";

export function SiteHeader({ settings, profile }: { settings: SiteSettings; profile: Profile }) {
  const links = settings.navbarLinks || [];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/82 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-[var(--accent-blue)] font-serif text-lg font-bold text-slate-950 shadow-clay">
            PH
          </span>
          <span className="hidden text-sm font-semibold text-slate-950 sm:block">{profile.fullName}</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {profile.github ? (
            <a className="icon-button" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Code2 className="h-4 w-4" />
            </a>
          ) : null}
          {profile.linkedin ? (
            <a className="icon-button" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Network className="h-4 w-4" />
            </a>
          ) : null}
          {profile.email ? (
            <a className="icon-button" href={`mailto:${profile.email}`} aria-label="Email">
              <Mail className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>
      <nav className="flex gap-4 overflow-x-auto border-t border-slate-200/80 bg-white/80 px-4 py-3 text-sm md:hidden">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="whitespace-nowrap text-slate-700">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
