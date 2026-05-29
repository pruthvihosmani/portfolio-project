export type PortableTextValue = Array<{ _type: string; _key?: string; [key: string]: unknown }>;

export type CtaButton = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
};

export type NavLink = {
  label: string;
  href: string;
};

export type SanityImageValue = {
  url?: string;
  alt?: string;
};

export type Profile = {
  fullName: string;
  headline: string;
  shortBio?: string;
  longAbout?: PortableTextValue;
  profileImage?: SanityImageValue;
  email?: string;
  phone?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  website?: string;
  resumeUrl?: string;
  resumeFileUrl?: string;
  ctaButtons?: CtaButton[];
};

export type SkillCategory = {
  name: string;
  skills: string[];
  icon?: string;
  sortOrder?: number;
};

export type Experience = {
  title: string;
  company: string;
  employmentType?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  displayDate?: string;
  current?: boolean;
  shortDescription?: string;
  responsibilities?: string[];
  technologies?: string[];
  featured?: boolean;
  sortOrder?: number;
};

export type Education = {
  degree: string;
  institution: string;
  location?: string;
  startYear?: number;
  endYear?: number;
  description?: string;
  highlights?: string[];
  sortOrder?: number;
};

export type ProjectType =
  | "Full Stack"
  | "AI/ML"
  | "Web"
  | "Client Work"
  | "Academic"
  | "Automation";

export type Project = {
  name: string;
  slug: string;
  category?: string;
  shortDescription?: string;
  detailedDescription?: PortableTextValue;
  problemSolved?: string;
  myRole?: string;
  techStack?: string[];
  keyFeatures?: string[];
  status?: string;
  projectType?: ProjectType;
  featured?: boolean;
  coverImage?: SanityImageValue;
  galleryImages?: SanityImageValue[];
  githubLink?: string;
  liveLink?: string;
  demoLink?: string;
  sortOrder?: number;
};

export type CaseStudy = {
  title: string;
  slug: string;
  clientName?: string;
  projectType?: string;
  overview?: PortableTextValue;
  businessProblem?: string;
  proposedSolution?: string;
  keyFeatures?: string[];
  techArchitecture?: string[];
  brandingDirection?: string;
  ecommerceFlow?: string[];
  myContribution?: string[];
  currentStatus?: string;
  futureEnhancements?: string[];
  techStack?: string[];
  coverImage?: SanityImageValue;
  galleryImages?: SanityImageValue[];
  websiteLink?: string;
  featured?: boolean;
  sortOrder?: number;
};

export type Certification = {
  title: string;
  issuer?: string;
  date?: string;
  displayDate?: string;
  description?: string;
  credentialLink?: string;
  sortOrder?: number;
};

export type TimelineItem = {
  title: string;
  type?: "Education" | "Experience" | "Project" | "Client Work" | "Certification";
  dateYear?: string;
  description?: string;
  sortOrder?: number;
};

export type SiteSettings = {
  siteTitle: string;
  siteDescription?: string;
  seoKeywords?: string[];
  openGraphImage?: SanityImageValue;
  favicon?: SanityImageValue;
  navbarLinks?: NavLink[];
  footerText?: string;
  themeAccents?: string[];
  heroGraphic?: string;
};

export type PortfolioContent = {
  profile: Profile;
  skills: SkillCategory[];
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  caseStudies: CaseStudy[];
  certifications: Certification[];
  timeline: TimelineItem[];
  siteSettings: SiteSettings;
};
