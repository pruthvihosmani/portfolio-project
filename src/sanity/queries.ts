import { client } from "./client";
import { hasSanityConfig } from "./env";
import type {
  CaseStudy,
  Certification,
  Education,
  Experience,
  PortfolioContent,
  Profile,
  Project,
  SiteSettings,
  SkillCategory,
  TimelineItem,
} from "./types";
import { initialContent } from "@/data/portfolio-content";

const imageFields = `{
  "url": asset->url,
  alt
}`;

export const profileQuery = `*[_type == "profile"][0]{
  fullName,
  headline,
  shortBio,
  longAbout,
  profileImage ${imageFields},
  email,
  phone,
  location,
  github,
  linkedin,
  website,
  resumeUrl,
  "resumeFileUrl": resumeFile.asset->url,
  ctaButtons
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  siteTitle,
  siteDescription,
  seoKeywords,
  openGraphImage ${imageFields},
  favicon ${imageFields},
  navbarLinks,
  footerText,
  themeAccents,
  heroGraphic
}`;

export const skillsQuery = `*[_type == "skillCategory"] | order(sortOrder asc, name asc){
  name,
  skills,
  icon,
  sortOrder
}`;

export const experiencesQuery = `*[_type == "experience"] | order(sortOrder asc, startDate desc){
  title,
  company,
  employmentType,
  location,
  startDate,
  endDate,
  displayDate,
  current,
  shortDescription,
  responsibilities,
  technologies,
  featured,
  sortOrder
}`;

export const educationQuery = `*[_type == "education"] | order(sortOrder asc, endYear desc){
  degree,
  institution,
  location,
  startYear,
  endYear,
  description,
  highlights,
  sortOrder
}`;

export const projectsQuery = `*[_type == "project"] | order(sortOrder asc, name asc){
  name,
  "slug": slug.current,
  category,
  shortDescription,
  detailedDescription,
  problemSolved,
  myRole,
  techStack,
  keyFeatures,
  status,
  projectType,
  featured,
  coverImage ${imageFields},
  galleryImages[] ${imageFields},
  githubLink,
  liveLink,
  demoLink,
  sortOrder
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{
  name,
  "slug": slug.current,
  category,
  shortDescription,
  detailedDescription,
  problemSolved,
  myRole,
  techStack,
  keyFeatures,
  status,
  projectType,
  featured,
  coverImage ${imageFields},
  galleryImages[] ${imageFields},
  githubLink,
  liveLink,
  demoLink,
  sortOrder
}`;

export const caseStudiesQuery = `*[_type == "caseStudy"] | order(sortOrder asc, title asc){
  title,
  "slug": slug.current,
  clientName,
  projectType,
  overview,
  businessProblem,
  proposedSolution,
  keyFeatures,
  techArchitecture,
  brandingDirection,
  ecommerceFlow,
  myContribution,
  currentStatus,
  futureEnhancements,
  techStack,
  coverImage ${imageFields},
  galleryImages[] ${imageFields},
  websiteLink,
  featured,
  sortOrder
}`;

export const caseStudyBySlugQuery = `*[_type == "caseStudy" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  clientName,
  projectType,
  overview,
  businessProblem,
  proposedSolution,
  keyFeatures,
  techArchitecture,
  brandingDirection,
  ecommerceFlow,
  myContribution,
  currentStatus,
  futureEnhancements,
  techStack,
  coverImage ${imageFields},
  galleryImages[] ${imageFields},
  websiteLink,
  featured,
  sortOrder
}`;

export const certificationsQuery = `*[_type == "certification"] | order(sortOrder asc, date desc){
  title,
  issuer,
  date,
  displayDate,
  description,
  credentialLink,
  sortOrder
}`;

export const timelineQuery = `*[_type == "timelineItem"] | order(sortOrder asc){
  title,
  type,
  dateYear,
  description,
  sortOrder
}`;

async function fetchOrFallback<T>(query: string, fallback: T, params: Record<string, unknown> = {}) {
  if (!hasSanityConfig) {
    return fallback;
  }

  try {
    const data = await client.fetch<T>(query, params, { next: { revalidate: 60 } });
    if (Array.isArray(data) && data.length === 0) {
      return fallback;
    }
    return data || fallback;
  } catch {
    return fallback;
  }
}

function bySortOrder<T extends { sortOrder?: number }>(items: T[]) {
  return [...items].sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
  const [profile, skills, experiences, education, projects, caseStudies, certifications, timeline, siteSettings] =
    await Promise.all([
      fetchOrFallback<Profile>(profileQuery, initialContent.profile),
      fetchOrFallback<SkillCategory[]>(skillsQuery, initialContent.skills),
      fetchOrFallback<Experience[]>(experiencesQuery, initialContent.experiences),
      fetchOrFallback<Education[]>(educationQuery, initialContent.education),
      fetchOrFallback<Project[]>(projectsQuery, initialContent.projects),
      fetchOrFallback<CaseStudy[]>(caseStudiesQuery, initialContent.caseStudies),
      fetchOrFallback<Certification[]>(certificationsQuery, initialContent.certifications),
      fetchOrFallback<TimelineItem[]>(timelineQuery, initialContent.timeline),
      fetchOrFallback<SiteSettings>(siteSettingsQuery, initialContent.siteSettings),
    ]);

  return {
    profile,
    skills: bySortOrder(skills),
    experiences: bySortOrder(experiences),
    education: bySortOrder(education),
    projects: bySortOrder(projects),
    caseStudies: bySortOrder(caseStudies),
    certifications: bySortOrder(certifications),
    timeline: bySortOrder(timeline),
    siteSettings,
  };
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const fallback = initialContent.projects.find((project) => project.slug === slug) || null;
  return fetchOrFallback<Project | null>(projectBySlugQuery, fallback, { slug });
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const fallback = initialContent.caseStudies.find((study) => study.slug === slug) || null;
  return fetchOrFallback<CaseStudy | null>(caseStudyBySlugQuery, fallback, { slug });
}
