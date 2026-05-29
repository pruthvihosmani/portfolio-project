import { BriefcaseBusiness } from "lucide-react";

import type { Experience } from "@/sanity/types";

export function ExperienceList({ experiences, limit }: { experiences: Experience[]; limit?: number }) {
  const items = limit ? experiences.slice(0, limit) : experiences;

  return (
    <div className="space-y-4">
      {items.map((experience) => (
        <article key={`${experience.company}-${experience.title}`} className="clay-card p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex gap-4">
              <div className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[var(--accent-mint)] text-slate-950 shadow-clay">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-950">{experience.title}</h3>
                <p className="mt-1 text-sm font-medium text-blue-700">{experience.company}</p>
                {experience.shortDescription ? <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700">{experience.shortDescription}</p> : null}
              </div>
            </div>
            <div className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
              {experience.displayDate}
            </div>
          </div>
          {experience.responsibilities?.length ? (
            <ul className="mt-5 grid gap-3 text-sm leading-7 text-slate-700 md:grid-cols-2">
              {experience.responsibilities.slice(0, limit ? 3 : undefined).map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {experience.technologies?.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
                <span key={tech} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800">
                  {tech}
                </span>
              ))}
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}
