import Link from "next/link";

import type { Profile, SiteSettings } from "@/sanity/types";

export function SiteFooter({ settings, profile }: { settings: SiteSettings; profile: Profile }) {
  return (
    <footer className="border-t border-slate-200 bg-white/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <p className="font-serif text-2xl font-semibold text-slate-950">{profile.fullName}</p>
          <p className="mt-2 max-w-xl text-sm leading-7 text-slate-600">{settings.footerText}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
          {(settings.navbarLinks || []).map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-slate-950">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
