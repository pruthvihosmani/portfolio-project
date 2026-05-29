import { defineField, defineType } from "sanity";

export const timelineItem = defineType({
  name: "timelineItem",
  title: "Timeline Item",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Education", value: "Education" },
          { title: "Experience", value: "Experience" },
          { title: "Project", value: "Project" },
          { title: "Client Work", value: "Client Work" },
          { title: "Certification", value: "Certification" },
        ],
      },
    }),
    defineField({ name: "dateYear", title: "Date/year", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({
      name: "relatedProject",
      title: "Related project optional",
      type: "reference",
      to: [{ type: "project" }],
    }),
    defineField({
      name: "relatedExperience",
      title: "Related experience optional",
      type: "reference",
      to: [{ type: "experience" }],
    }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number", initialValue: 0 }),
  ],
  preview: {
    select: { title: "title", subtitle: "dateYear" },
  },
});
