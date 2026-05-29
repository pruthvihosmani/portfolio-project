import { createClient } from "@sanity/client";

import { initialContent } from "../src/data/portfolio-content";
import { apiVersion, dataset, projectId } from "../src/sanity/env";

type SeedDoc = Record<string, unknown> & {
  _id: string;
  _type: string;
};

const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

function slug(value: string) {
  return { _type: "slug", current: value };
}

function keyedObjects<T extends Record<string, unknown>>(items: T[] = []) {
  return items.map((item, index) => ({ _key: `${index}-${item.label || item.name || item.title || "item"}`, ...item }));
}

function projectDoc(project: (typeof initialContent.projects)[number]): SeedDoc {
  return {
    ...project,
    _id: `project-${project.slug}`,
    _type: "project",
    slug: slug(project.slug),
  };
}

function caseStudyDoc(caseStudy: (typeof initialContent.caseStudies)[number]): SeedDoc {
  return {
    ...caseStudy,
    _id: `caseStudy-${caseStudy.slug}`,
    _type: "caseStudy",
    slug: slug(caseStudy.slug),
  };
}

const docs: SeedDoc[] = [
  {
    ...initialContent.profile,
    _id: "profile",
    _type: "profile",
    ctaButtons: keyedObjects(initialContent.profile.ctaButtons),
  },
  {
    ...initialContent.siteSettings,
    _id: "siteSettings",
    _type: "siteSettings",
    navbarLinks: keyedObjects(initialContent.siteSettings.navbarLinks),
  },
  ...initialContent.skills.map((item, index) => ({
    ...item,
    _id: `skillCategory-${index + 1}`,
    _type: "skillCategory",
  })),
  ...initialContent.experiences.map((item, index) => ({
    ...item,
    _id: `experience-${index + 1}`,
    _type: "experience",
  })),
  ...initialContent.education.map((item, index) => ({
    ...item,
    _id: `education-${index + 1}`,
    _type: "education",
  })),
  ...initialContent.projects.map(projectDoc),
  ...initialContent.caseStudies.map(caseStudyDoc),
  ...initialContent.certifications.map((item, index) => ({
    ...item,
    _id: `certification-${index + 1}`,
    _type: "certification",
  })),
  ...initialContent.timeline.map((item, index) => ({
    ...item,
    _id: `timelineItem-${index + 1}`,
    _type: "timelineItem",
  })),
];

async function main() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
    throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET before seeding.");
  }

  if (!token) {
    throw new Error("Set SANITY_API_WRITE_TOKEN with create/update permissions before seeding.");
  }

  const transaction = client.transaction();
  docs.forEach((doc) => transaction.createOrReplace(doc));
  await transaction.commit();
  console.log(`Seeded ${docs.length} Sanity documents into dataset "${dataset}".`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
