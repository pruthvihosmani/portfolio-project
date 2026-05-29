import Link from "next/link";
import { ArrowUpRight, Coffee } from "lucide-react";

import type { CaseStudy } from "@/sanity/types";

export function CaseStudyCard({ caseStudy, featured = false }: { caseStudy: CaseStudy; featured?: boolean }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-[#B89A5E]/25 bg-[#F4EEDC] text-[#17120E] shadow-clay">
      <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-72 bg-[#0B5A3A] p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,238,220,0.32),transparent_28%),linear-gradient(135deg,rgba(11,90,58,0.96),rgba(107,47,63,0.72))]" />
          <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-center justify-between gap-4">
              <span className="rounded-full border border-[#F4EEDC]/40 bg-[#F4EEDC]/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-[#F4EEDC]">
                {caseStudy.clientName}
              </span>
              <Coffee className="h-6 w-6 text-[#F4EEDC]" />
            </div>
            <div>
              <p className="font-serif text-5xl font-semibold leading-none text-[#F4EEDC]">Aloka</p>
              <p className="mt-3 max-w-sm text-sm leading-7 text-[#F4EEDC]/78">
                Karnataka origin, Chikmagalur coffee, export trust, and ecommerce-ready product discovery.
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-3">
            {featured ? <span className="rounded-full bg-[#B89A5E]/18 px-3 py-1 text-xs font-bold text-[#17120E]">Featured case study</span> : null}
            {caseStudy.currentStatus ? <span className="rounded-full border border-[#17120E]/10 bg-white/45 px-3 py-1 text-xs font-semibold text-[#17120E]/78">{caseStudy.currentStatus}</span> : null}
          </div>
          <h3 className="mt-5 font-serif text-3xl font-semibold leading-tight">{caseStudy.title}</h3>
          {caseStudy.businessProblem ? <p className="mt-4 text-sm leading-7 text-[#17120E]/76">{caseStudy.businessProblem}</p> : null}
          {caseStudy.techStack?.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {caseStudy.techStack.slice(0, 6).map((tech) => (
                <span key={tech} className="rounded-full bg-white/55 px-3 py-1 text-xs font-medium text-[#17120E]/82">
                  {tech}
                </span>
              ))}
            </div>
          ) : null}
          <Link href={`/case-studies/${caseStudy.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0B5A3A] transition hover:text-[#6B2F3F]">
            View case study <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
