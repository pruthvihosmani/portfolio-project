import { defineField, defineType } from "sanity";

export const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    defineField({ name: "degree", title: "Degree/course", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "institution", title: "Institution", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "startYear", title: "Start year", type: "number" }),
    defineField({ name: "endYear", title: "End year", type: "number" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "highlights", title: "Relevant highlights", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number", initialValue: 0 }),
  ],
  preview: {
    select: { title: "degree", subtitle: "institution" },
  },
});
