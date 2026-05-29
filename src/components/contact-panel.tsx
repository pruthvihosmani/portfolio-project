import { Code2, Mail, MapPin, Network, Phone } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import type { Profile } from "@/sanity/types";

export function ContactPanel({ profile }: { profile: Profile }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="surface p-6">
        <h2 className="font-serif text-3xl font-semibold text-slate-950">Let us build something practical.</h2>
        <p className="mt-4 text-sm leading-7 text-slate-700">
          Open to software engineering roles, backend and ML systems work, freelance builds, modernization projects, and CMS-ready client platforms.
        </p>
        <div className="mt-6 space-y-3 text-sm text-slate-700">
          {profile.email ? (
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 transition hover:text-slate-950">
              <Mail className="h-4 w-4 text-blue-700" /> {profile.email}
            </a>
          ) : null}
          {profile.phone ? (
            <a href={`tel:${profile.phone}`} className="flex items-center gap-3 transition hover:text-slate-950">
              <Phone className="h-4 w-4 text-blue-700" /> {profile.phone}
            </a>
          ) : null}
          {profile.location ? (
            <p className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-blue-700" /> {profile.location}
            </p>
          ) : null}
          {profile.linkedin ? (
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-slate-950">
              <Network className="h-4 w-4 text-blue-700" /> LinkedIn
            </a>
          ) : null}
          {profile.github ? (
            <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition hover:text-slate-950">
              <Code2 className="h-4 w-4 text-blue-700" /> GitHub
            </a>
          ) : null}
        </div>
      </div>
      <form className="surface grid gap-4 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-slate-800">
            Name
            <input className="field" name="name" placeholder="Your name" />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-slate-800">
            Email
            <input className="field" name="email" type="email" placeholder="you@example.com" />
          </label>
        </div>
        <label className="grid gap-2 text-sm font-semibold text-slate-800">
          Project type
          <select className="field" name="projectType" defaultValue="Hiring / role">
            <option>Hiring / role</option>
            <option>Freelance project</option>
            <option>Backend / API build</option>
            <option>AI / ML system</option>
            <option>Website / CMS</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-800">
          Message
          <textarea className="field min-h-36 resize-y" name="message" placeholder="Tell me what you are building or hiring for." />
        </label>
        <ButtonLink href={profile.email ? `mailto:${profile.email}` : "/contact"} variant="primary" className="w-fit">
          Send enquiry
        </ButtonLink>
      </form>
    </div>
  );
}
