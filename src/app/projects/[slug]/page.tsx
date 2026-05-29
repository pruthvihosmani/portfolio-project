import { notFound } from "next/navigation";
import { ArrowLeft, Code2, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { ButtonLink } from "@/components/button-link";
import { FadeIn } from "@/components/fade-in";
import { PortableContent } from "@/components/portable-content";
import { getPortfolioContent, getProjectBySlug } from "@/sanity/queries";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { projects } = await getPortfolioContent();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  return {
    title: project ? `${project.name} | Pruthvi Hosamani` : "Project | Pruthvi Hosamani",
    description: project?.shortDescription,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="page-shell">
      <Link href="/projects" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 transition hover:text-emerald-100">
        <ArrowLeft className="h-4 w-4" /> Projects
      </Link>
      <FadeIn>
        <div className="surface overflow-hidden">
          <div className="relative min-h-64 border-b border-white/10 bg-slate-900 p-6 md:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(52,211,153,0.22),transparent_34%),linear-gradient(135deg,rgba(15,23,42,0.35),rgba(2,6,23,0.95))]" />
            <div className="relative max-w-4xl">
              <div className="flex flex-wrap gap-3">
                {project.projectType ? <span className="rounded-full bg-emerald-300 px-3 py-1 text-xs font-bold text-slate-950">{project.projectType}</span> : null}
                {project.status ? <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-semibold text-slate-200">{project.status}</span> : null}
              </div>
              <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-white md:text-6xl">{project.name}</h1>
              {project.shortDescription ? <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">{project.shortDescription}</p> : null}
              <div className="mt-8 flex flex-wrap gap-3">
                {project.githubLink ? (
                  <ButtonLink href={project.githubLink} variant="secondary">
                    <Code2 className="h-4 w-4" /> GitHub
                  </ButtonLink>
                ) : null}
                {project.liveLink ? (
                  <ButtonLink href={project.liveLink} variant="primary">
                    <ExternalLink className="h-4 w-4" /> Live link
                  </ButtonLink>
                ) : null}
                {project.demoLink ? (
                  <ButtonLink href={project.demoLink} variant="secondary">
                    Demo
                  </ButtonLink>
                ) : null}
              </div>
            </div>
          </div>
          <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[0.72fr_0.28fr]">
            <div className="space-y-8">
              <Section title="Detailed description">
                <PortableContent value={project.detailedDescription} />
              </Section>
              <Section title="Problem solved">
                <p>{project.problemSolved}</p>
              </Section>
              <Section title="My role">
                <p>{project.myRole}</p>
              </Section>
              {project.keyFeatures?.length ? (
                <Section title="Key features">
                  <ul className="grid gap-3">
                    {project.keyFeatures.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Section>
              ) : null}
            </div>
            <aside className="h-fit rounded-3xl border border-white/10 bg-slate-950/60 p-5">
              <h2 className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-200">Tech stack</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {(project.techStack || []).map((tech) => (
                  <span key={tech} className="rounded-full bg-white/8 px-3 py-1 text-xs font-medium text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </FadeIn>
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
