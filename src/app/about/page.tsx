import { Award, GraduationCap } from "lucide-react";

import { ExperienceList } from "@/components/experience-list";
import { FadeIn } from "@/components/fade-in";
import { PortableContent } from "@/components/portable-content";
import { SectionHeading } from "@/components/section-heading";
import { SkillGrid } from "@/components/skill-grid";
import { getPortfolioContent } from "@/sanity/queries";

export const metadata = {
  title: "About | Pruthvi Hosamani",
};

export default async function AboutPage() {
  const { profile, education, experiences, skills, timeline, certifications } = await getPortfolioContent();

  return (
    <div className="page-shell">
      <FadeIn>
        <SectionHeading
          eyebrow="About"
          title="A practical engineer for backend systems, AI workflows, and modernization work."
          description={profile.shortBio}
        />
      </FadeIn>

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <FadeIn>
          <div className="surface p-6">
            <PortableContent value={profile.longAbout} />
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="surface p-6">
            <h2 className="font-serif text-3xl font-semibold text-white">Education</h2>
            <div className="mt-6 space-y-5">
              {education.map((item) => (
                <article key={item.degree} className="flex gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-300/10 text-emerald-200">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{item.degree}</h3>
                    <p className="mt-1 text-sm text-emerald-100">{item.institution}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{item.description}</p>
                    {item.highlights?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.highlights.map((highlight) => (
                          <span key={highlight} className="rounded-full bg-white/6 px-3 py-1 text-xs text-slate-300">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      <section className="mt-14">
        <FadeIn>
          <SectionHeading eyebrow="Experience" title="Work history from the resume." />
        </FadeIn>
        <FadeIn delay={0.08} className="mt-8">
          <ExperienceList experiences={experiences} />
        </FadeIn>
      </section>

      <section className="mt-14">
        <FadeIn>
          <SectionHeading eyebrow="Skills" title="CMS-managed skill categories." />
        </FadeIn>
        <FadeIn delay={0.08} className="mt-8">
          <SkillGrid skills={skills} />
        </FadeIn>
      </section>

      <section className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <FadeIn>
          <div>
            <SectionHeading eyebrow="Timeline" title="A compact career path." />
            <div className="mt-8 space-y-4">
              {timeline.map((item) => (
                <article key={`${item.title}-${item.dateYear}`} className="surface p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">{item.type}</p>
                      <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-semibold text-slate-300">{item.dateYear}</span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="surface p-6">
            <h2 className="font-serif text-3xl font-semibold text-white">Certifications & achievements</h2>
            <div className="mt-6 space-y-5">
              {certifications.map((item) => (
                <article key={item.title} className="flex gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-300/10 text-amber-200">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{item.issuer} {item.displayDate ? `- ${item.displayDate}` : ""}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-300">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
