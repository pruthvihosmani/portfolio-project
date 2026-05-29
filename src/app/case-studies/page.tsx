import { CaseStudyCard } from "@/components/case-study-card";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { getPortfolioContent } from "@/sanity/queries";

export const metadata = {
  title: "Case Studies | Pruthvi Hosamani",
};

export default async function CaseStudiesPage() {
  const { caseStudies } = await getPortfolioContent();

  return (
    <div className="page-shell">
      <FadeIn>
        <SectionHeading
          eyebrow="Case studies"
          title="Client-facing work with business context."
          description="Business problem, proposed solution, architecture, contribution, current status, and future direction in one place."
        />
      </FadeIn>
      <div className="mt-10 grid gap-6">
        {caseStudies.map((caseStudy, index) => (
          <FadeIn key={caseStudy.slug} delay={index * 0.06}>
            <CaseStudyCard caseStudy={caseStudy} featured={caseStudy.featured} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
