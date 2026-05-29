import Link from "next/link";
import { ArrowUpRight, Cpu } from "lucide-react";

import type { Project } from "@/sanity/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="clay-card group flex h-full flex-col overflow-hidden">
      <div className="relative min-h-40 border-b border-slate-100 bg-[var(--accent-blue)] p-5">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.72),transparent_42%),radial-gradient(circle_at_80%_20%,rgba(233,213,255,0.78),transparent_28%)]" />
        <div className="relative flex items-start justify-between gap-4">
          <span className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700">
            {project.projectType || project.category}
          </span>
          <Cpu className="h-5 w-5 text-blue-700" />
        </div>
        <div className="relative mt-12 h-1.5 overflow-hidden rounded-full bg-white/70">
          <span className="block h-full w-2/3 rounded-full bg-blue-600 transition duration-500 group-hover:w-full" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold leading-snug text-slate-950">{project.name}</h3>
          {project.featured ? <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">Featured</span> : null}
        </div>
        {project.shortDescription ? <p className="mt-3 text-sm leading-7 text-slate-700">{project.shortDescription}</p> : null}
        {project.problemSolved ? (
          <div className="mt-4 rounded-[1.15rem] border border-slate-200 bg-slate-50/80 p-3">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-slate-500">Why it matters</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {project.problemSolved.length > 150 ? `${project.problemSolved.slice(0, 150).trim().replace(/[.,;:]+$/, "")}...` : project.problemSolved}
            </p>
          </div>
        ) : null}
        {project.techStack?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.slice(0, 5).map((tech) => (
              <span key={tech} className="rounded-full bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                {tech}
              </span>
            ))}
          </div>
        ) : null}
        <Link href={`/projects/${project.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-blue-900">
          View project <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
