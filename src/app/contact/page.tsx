import { ContactPanel } from "@/components/contact-panel";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { getPortfolioContent } from "@/sanity/queries";

export const metadata = {
  title: "Contact | Pruthvi Hosamani",
};

export default async function ContactPage() {
  const { profile } = await getPortfolioContent();

  return (
    <div className="page-shell">
      <FadeIn>
        <SectionHeading
          eyebrow="Contact"
          title="Hiring, freelance, AI systems, backend builds, and CMS-ready websites."
          description="Reach out for software engineering roles, productized backend work, AI/ML systems, modernization projects, and polished client websites."
        />
      </FadeIn>
      <FadeIn delay={0.08} className="mt-10">
        <ContactPanel profile={profile} />
      </FadeIn>
    </div>
  );
}
