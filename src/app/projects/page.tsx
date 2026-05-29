import { FadeIn } from "@/components/fade-in";
import { FilterableProjects } from "@/components/filterable-projects";
import { SectionHeading } from "@/components/section-heading";
import { getPortfolioContent } from "@/sanity/queries";

export const metadata = {
  title: "Projects | Pruthvi Hosamani",
};

export default async function ProjectsPage() {
  const { projects } = await getPortfolioContent();

  return (
    <div className="page-shell">
      <FadeIn>
        <SectionHeading
          eyebrow="Projects"
          title="Resume projects, client builds, academic ML, and automation."
          description="A focused catalogue of AI systems, backend-heavy builds, full-stack applications, academic ML work, and client platforms."
        />
      </FadeIn>
      <FadeIn delay={0.08} className="mt-10">
        <FilterableProjects projects={projects} />
      </FadeIn>
    </div>
  );
}
