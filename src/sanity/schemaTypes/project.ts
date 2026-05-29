import { defineField, defineType } from "sanity";

const projectTypeOptions = [
  { title: "Full Stack", value: "Full Stack" },
  { title: "AI/ML", value: "AI/ML" },
  { title: "Web", value: "Web" },
  { title: "Client Work", value: "Client Work" },
  { title: "Academic", value: "Academic" },
  { title: "Automation", value: "Automation" },
];

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Project name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "shortDescription", title: "Short description", type: "text", rows: 3 }),
    defineField({ name: "detailedDescription", title: "Detailed description", type: "portableText" }),
    defineField({ name: "problemSolved", title: "Problem solved", type: "text", rows: 4 }),
    defineField({ name: "myRole", title: "My role", type: "text", rows: 3 }),
    defineField({ name: "techStack", title: "Tech stack", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "keyFeatures", title: "Key features", type: "array", of: [{ type: "text" }] }),
    defineField({ name: "status", title: "Status", type: "string" }),
    defineField({
      name: "projectType",
      title: "Project type",
      type: "string",
      options: { list: projectTypeOptions },
    }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
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
    defineField({ name: "githubLink", title: "GitHub link", type: "url" }),
    defineField({ name: "liveLink", title: "Live link", type: "url" }),
    defineField({ name: "demoLink", title: "Demo link", type: "url" }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number", initialValue: 0 }),
  ],
  preview: {
    select: { title: "name", subtitle: "projectType", media: "coverImage" },
  },
});

export { projectTypeOptions };
