import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Role/title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "company", title: "Company/organization", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "employmentType", title: "Employment type", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "startDate", title: "Start date", type: "date" }),
    defineField({ name: "endDate", title: "End date", type: "date" }),
    defineField({ name: "displayDate", title: "Display date", type: "string" }),
    defineField({ name: "current", title: "Current role", type: "boolean", initialValue: false }),
    defineField({ name: "shortDescription", title: "Short description", type: "text", rows: 3 }),
    defineField({ name: "responsibilities", title: "Responsibilities", type: "array", of: [{ type: "text" }] }),
    defineField({ name: "technologies", title: "Technologies used", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number", initialValue: 0 }),
  ],
  preview: {
    select: { title: "title", subtitle: "company" },
  },
});
