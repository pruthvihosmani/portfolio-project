"use client";

import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";
import type { Project, ProjectType } from "@/sanity/types";

const filters: Array<"All" | ProjectType> = ["All", "Full Stack", "AI/ML", "Web", "Client Work", "Academic", "Automation"];

export function FilterableProjects({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const filteredProjects = useMemo(
    () => (active === "All" ? projects : projects.filter((project) => project.projectType === active)),
    [active, projects],
  );

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-3">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            className={cn(
              "whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition",
              active === filter
                ? "border-blue-600 bg-blue-600 !text-white shadow-[0_14px_28px_rgba(37,99,235,0.18)]"
                : "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-blue-200 hover:text-slate-950",
            )}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
