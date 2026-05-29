import { Download, FileText } from "lucide-react";

import { ButtonLink } from "@/components/button-link";
import { ExperienceList } from "@/components/experience-list";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { resumeHref } from "@/lib/utils";
import { getPortfolioContent } from "@/sanity/queries";

export const metadata = {
  title: "Resume | Pruthvi Hosamani",
};

export default async function ResumePage() {
  const { profile, experiences, projects, education, certifications } = await getPortfolioContent();
  const href = resumeHref(profile);

  return (
    <div className="page-shell">
      <FadeIn>
        <div className="surface grid gap-8 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-300/10 text-emerald-200">
              <FileText className="h-6 w-6" />
            </div>
            <SectionHeading eyebrow="Resume" title="Resume summary and source PDF." description={profile.shortBio} />
          </div>
          <ButtonLink href={href} variant="primary" download>
            <Download className="h-4 w-4" /> Download PDF
          </ButtonLink>
        </div>
      </FadeIn>

      <section className="mt-12 grid gap-5 md:grid-cols-4">
        <Metric label="Experience entries" value={String(experiences.length)} />
        <Metric label="Projects" value={String(projects.length)} />
        <Metric label="Education" value={`${education[0]?.startYear || ""}-${education[0]?.endYear || ""}`} />
        <Metric label="Achievements" value={String(certifications.length)} />
      </section>

      <section className="mt-12">
        <FadeIn>
          <SectionHeading eyebrow="Experience" title="Work history." />
        </FadeIn>
        <FadeIn delay={0.08} className="mt-8">
          <ExperienceList experiences={experiences} />
        </FadeIn>
      </section>

      <section className="mt-12 surface p-6">
        <h2 className="font-serif text-3xl font-semibold text-white">Resume PDF</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          The current PDF includes the Python and LLM systems profile, RGUHS contract work, Arogya AI, internships, selected projects, education, awards, and leadership highlights.
        </p>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <FadeIn>
      <div className="surface p-5">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">{label}</p>
        <p className="mt-3 font-serif text-3xl font-semibold text-white">{value}</p>
      </div>
    </FadeIn>
  );
}
