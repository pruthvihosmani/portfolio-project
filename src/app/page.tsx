import { ArrowRight, Award, BriefcaseBusiness, Code2, FileText, MapPin } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { ButtonLink } from "@/components/button-link";
import { CaseStudyCard } from "@/components/case-study-card";
import { ExperienceList } from "@/components/experience-list";
import { FadeIn } from "@/components/fade-in";
import { HeroVisual } from "@/components/hero-visual";
import { PortfolioTerminal } from "@/components/portfolio-terminal";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { SkillGrid } from "@/components/skill-grid";
import { resumeHref } from "@/lib/utils";
import { getPortfolioContent } from "@/sanity/queries";
import type { SkillCategory } from "@/sanity/types";

const homepageSkillSignals = new Set([
  "Python",
  "FastAPI",
  "Django",
  "React 19",
  "React",
  "TypeScript",
  "PostgreSQL",
  "SQL Server",
  "Docker",
  "LangChain",
  "LangGraph",
  "ChromaDB",
  "RAG architecture",
  "MedGemma",
  "Groq Llama 3",
  "Groq",
  "REST API design",
  "JWT auth",
  "Tailwind CSS",
  "GitHub Actions",
]);

export default async function Home() {
  const content = await getPortfolioContent();
  const { profile, skills, experiences, projects, caseStudies } = content;
  const homepageSkills = getHomepageSkills(skills);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
  const featuredExperience = experiences.filter((experience) => experience.featured).slice(0, 3);
  const aloka = caseStudies.find((caseStudy) => caseStudy.slug === "aloka-enterprises-llp") || caseStudies[0];

  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200/80">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.92),rgba(249,249,249,0.76)),radial-gradient(circle_at_14%_18%,rgba(202,228,249,0.72),transparent_34%),radial-gradient(circle_at_88%_14%,rgba(233,213,255,0.58),transparent_30%),radial-gradient(circle_at_72%_72%,rgba(213,245,227,0.62),transparent_34%)]" />
        <div className="hero-shell relative">
          <div className="grid items-start gap-8 lg:grid-cols-[45fr_55fr] xl:gap-10">
            <FadeIn>
              <div className="pt-1">
                <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-slate-700">
                  <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1 font-semibold text-blue-700 shadow-sm">
                    <Code2 className="h-4 w-4" /> Python + LLM Systems
                  </span>
                  {profile.location ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 shadow-sm">
                      <MapPin className="h-4 w-4" /> {profile.location}
                    </span>
                  ) : null}
                </div>
                <h1 className="max-w-[34rem] font-serif text-5xl font-semibold leading-[0.94] text-slate-950 sm:text-6xl lg:text-[4.25rem]">
                  {profile.fullName}
                </h1>
                <p className="mt-4 max-w-[34rem] text-lg font-semibold leading-8 text-blue-800 sm:text-xl">{profile.headline}</p>
                {profile.shortBio ? <p className="mt-4 max-w-[33rem] text-base leading-7 text-slate-700">{profile.shortBio}</p> : null}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {(profile.ctaButtons || []).map((button) => (
                    <ButtonLink
                      key={button.href}
                      href={button.href}
                      variant={button.label.toLowerCase().includes("start") ? "secondary" : button.variant}
                      download={button.href.endsWith(".pdf")}
                      className="min-w-[152px]"
                    >
                      {button.label}
                    </ButtonLink>
                  ))}
                </div>
                <div className="mt-7 grid grid-cols-3 gap-2.5 sm:gap-3">
                  <Stat icon={<BriefcaseBusiness className="h-4 w-4" />} label="Current client work" value="RGUHS + Aloka" />
                  <Stat icon={<Award className="h-4 w-4" />} label="Academic record" value="CGPA 8.8/10" />
                  <Stat icon={<FileText className="h-4 w-4" />} label="Resume" value="Resume ready" />
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.12} className="lg:pt-1">
              <HeroVisual profile={profile} />
            </FadeIn>
          </div>
          <FadeIn delay={0.16} className="mt-8">
            <PortfolioTerminal content={content} />
          </FadeIn>
        </div>
      </section>

      <section className="page-shell pt-0">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <FadeIn>
            <SectionHeading
              eyebrow="Profile"
              title="Backend, ML, and full-stack delivery with source-of-truth discipline."
              description="I like systems where the evidence is clear: benchmarks, source HTML, stack traces, data models, and code paths that explain themselves under pressure."
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="surface p-6 text-base leading-8 text-slate-700">
              <p>
                I work across Python systems, LLM evaluation, RAG architecture, production APIs, and modern frontend delivery. The resume shows a pattern of building from messy ground truth: medical guideline documents, legacy HTML, inherited stack traces, and production data paths.
              </p>
              <Link href="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:text-blue-900">
                More about me <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="page-shell pt-0">
        <FadeIn>
          <SectionHeading eyebrow="Skills" title="Core tools for backend, RAG, and client delivery." />
        </FadeIn>
        <FadeIn delay={0.1} className="mt-8">
          <SkillGrid skills={homepageSkills} />
        </FadeIn>
      </section>

      <section className="page-shell pt-0">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <FadeIn>
            <SectionHeading eyebrow="Experience" title="Recent work with real delivery pressure." />
          </FadeIn>
          <Link href="/about" className="text-sm font-semibold text-blue-700 transition hover:text-blue-900">
            View timeline
          </Link>
        </div>
        <FadeIn delay={0.1}>
          <ExperienceList experiences={featuredExperience} limit={3} />
        </FadeIn>
      </section>

      <section className="page-shell pt-0">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <FadeIn>
            <SectionHeading eyebrow="Projects" title="Resume projects, client work, and AI systems." />
          </FadeIn>
          <Link href="/projects" className="text-sm font-semibold text-blue-700 transition hover:text-blue-900">
            All projects
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <FadeIn key={project.slug} delay={index * 0.06}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </section>

      {aloka ? (
        <section className="page-shell pt-0">
          <FadeIn>
            <SectionHeading eyebrow="Featured client case study" title="Aloka Enterprises LLP." />
          </FadeIn>
          <FadeIn delay={0.1} className="mt-8">
            <CaseStudyCard caseStudy={aloka} featured />
          </FadeIn>
        </section>
      ) : null}

      <section className="page-shell pt-0">
        <div className="surface grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <p className="font-serif text-3xl font-semibold text-slate-950">Resume and contact</p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-700">
              Download the resume PDF, review the experience, or send a direct project enquiry.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={resumeHref(profile)} variant="secondary" download>
              Download Resume
            </ButtonLink>
            <ButtonLink href="/contact" variant="primary">
              Contact
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex min-h-[108px] flex-col justify-between rounded-[1.35rem] border border-slate-200 bg-white p-3 shadow-clay sm:min-h-[118px] sm:rounded-[1.45rem] sm:p-5">
      <div className="flex items-start gap-2 sm:gap-2.5">
        <span className="mt-0.5 shrink-0 text-blue-700">{icon}</span>
        <p className="text-[0.58rem] font-bold uppercase leading-4 tracking-[0.14em] text-slate-500 sm:text-[0.66rem] sm:tracking-[0.16em]">{label}</p>
      </div>
      <p className="mt-3 text-sm font-bold leading-5 text-slate-950 sm:mt-4 sm:text-base sm:leading-6">{value}</p>
    </div>
  );
}

function getHomepageSkills(skills: SkillCategory[]) {
  return skills
    .map((category) => ({
      ...category,
      skills: category.skills.filter((skill) => homepageSkillSignals.has(skill)),
    }))
    .filter((category) => category.skills.length > 0);
}
