import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { ButtonLink } from "@/components/button-link";
import { FadeIn } from "@/components/fade-in";
import { PortableContent } from "@/components/portable-content";
import { getCaseStudyBySlug, getPortfolioContent } from "@/sanity/queries";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { caseStudies } = await getPortfolioContent();
  return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  return {
    title: caseStudy ? `${caseStudy.title} | Case Study` : "Case Study | Pruthvi Hosamani",
    description: caseStudy?.businessProblem,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const isAloka = caseStudy.slug === "aloka-enterprises-llp";

  return (
    <div>
      <div className="page-shell">
        <Link href="/case-studies" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 transition hover:text-emerald-100">
          <ArrowLeft className="h-4 w-4" /> Case studies
        </Link>
        <FadeIn>
          <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-2xl shadow-black/25">
            <div className="relative min-h-72 p-6 md:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,238,220,0.18),transparent_30%),linear-gradient(135deg,#0B5A3A,#6B2F3F_60%,#17120E)]" />
              <div className="relative max-w-4xl">
                <div className="flex flex-wrap gap-3">
                  {caseStudy.clientName ? <span className="rounded-full bg-[#F4EEDC] px-3 py-1 text-xs font-bold text-[#17120E]">{caseStudy.clientName}</span> : null}
                  {caseStudy.currentStatus ? <span className="rounded-full border border-[#F4EEDC]/25 bg-[#F4EEDC]/10 px-3 py-1 text-xs font-semibold text-[#F4EEDC]">{caseStudy.currentStatus}</span> : null}
                </div>
                <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-[#F4EEDC] md:text-6xl">{caseStudy.title}</h1>
                {caseStudy.projectType ? <p className="mt-5 text-lg font-medium text-[#F4EEDC]/82">{caseStudy.projectType}</p> : null}
                {caseStudy.websiteLink ? (
                  <div className="mt-8">
                    <ButtonLink href={caseStudy.websiteLink} variant="secondary">
                      <ExternalLink className="h-4 w-4" /> Domain reference
                    </ButtonLink>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[0.68fr_0.32fr]">
              <div className="space-y-8">
                <Section title="Overview">
                  <PortableContent value={caseStudy.overview} />
                </Section>
                <Section title="Business problem">
                  <p>{caseStudy.businessProblem}</p>
                </Section>
                <Section title="Proposed solution">
                  <p>{caseStudy.proposedSolution}</p>
                </Section>
                <ListSection title="Key features" items={caseStudy.keyFeatures} />
                <ListSection title="Tech architecture" items={caseStudy.techArchitecture} />
                <Section title="Branding direction">
                  <p>{caseStudy.brandingDirection}</p>
                  {isAloka ? (
                    <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {[
                        ["#0B5A3A", "Estate Green"],
                        ["#F4EEDC", "Warm Ivory"],
                        ["#6B2F3F", "Coffee Cherry"],
                        ["#C85A2A", "Terracotta"],
                        ["#17120E", "Espresso"],
                        ["#B89A5E", "Muted Gold"],
                      ].map(([color, label]) => (
                        <div key={color} className="rounded-2xl border border-white/10 bg-white/6 p-2">
                          <div className="h-10 rounded-xl" style={{ backgroundColor: color }} />
                          <p className="mt-2 text-xs text-slate-300">{label}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </Section>
                <ListSection title="Ecommerce flow" items={caseStudy.ecommerceFlow} />
                <ListSection title="My contribution" items={caseStudy.myContribution} />
                <ListSection title="Future enhancements" items={caseStudy.futureEnhancements} />
              </div>
              <aside className="h-fit rounded-3xl border border-white/10 bg-white/6 p-5">
                <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-[#B89A5E]">Tech stack</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(caseStudy.techStack || []).map((tech) => (
                    <span key={tech} className="rounded-full bg-black/25 px-3 py-1 text-xs font-medium text-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </aside>
            </div>
          </article>
        </FadeIn>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="text-base leading-8 text-slate-300">
      <h2 className="mb-3 font-serif text-3xl font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}

function ListSection({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) {
    return null;
  }

  return (
    <Section title={title}>
      <ul className="grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B89A5E]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
