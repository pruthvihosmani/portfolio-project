import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "clientName", title: "Client name", type: "string" }),
    defineField({ name: "projectType", title: "Project type", type: "string" }),
    defineField({ name: "overview", title: "Overview", type: "portableText" }),
    defineField({ name: "businessProblem", title: "Business problem", type: "text", rows: 4 }),
    defineField({ name: "proposedSolution", title: "Proposed solution", type: "text", rows: 4 }),
    defineField({ name: "keyFeatures", title: "Key features", type: "array", of: [{ type: "text" }] }),
    defineField({ name: "techArchitecture", title: "Tech architecture", type: "array", of: [{ type: "text" }] }),
    defineField({ name: "brandingDirection", title: "Branding direction", type: "text", rows: 4 }),
    defineField({ name: "ecommerceFlow", title: "Ecommerce flow", type: "array", of: [{ type: "text" }] }),
    defineField({ name: "myContribution", title: "My contribution", type: "array", of: [{ type: "text" }] }),
    defineField({ name: "currentStatus", title: "Current status", type: "string" }),
    defineField({ name: "futureEnhancements", title: "Future enhancements", type: "array", of: [{ type: "text" }] }),
    defineField({ name: "techStack", title: "Tech stack", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery images optional",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt text", type: "string" }],
        },
      ],
    }),
    defineField({ name: "websiteLink", title: "Website/domain link", type: "url" }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number", initialValue: 0 }),
  ],
  preview: {
    select: { title: "title", subtitle: "clientName", media: "coverImage" },
  },
});
