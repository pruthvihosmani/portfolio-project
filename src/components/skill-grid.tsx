import {
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  MonitorSmartphone,
  Network,
  Server,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import type { SkillCategory } from "@/sanity/types";

const iconMap: Record<string, LucideIcon> = {
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  MonitorSmartphone,
  Network,
  Server,
  Wrench,
};

export function SkillGrid({ skills }: { skills: SkillCategory[] }) {
  return (
    <div className="grid items-start gap-4 md:grid-cols-2 xl:grid-cols-4">
      {skills.map((category) => {
        const Icon = category.icon ? iconMap[category.icon] || Code2 : Code2;
        return (
          <article key={category.name} className="clay-card p-4 sm:p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--accent-lavender)] text-slate-950 shadow-clay">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-950">{category.name}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span key={skill} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                  {skill}
                </span>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}
