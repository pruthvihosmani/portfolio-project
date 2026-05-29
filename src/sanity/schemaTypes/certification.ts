import { defineField, defineType } from "sanity";

export const certification = defineType({
  name: "certification",
  title: "Certification / Achievement",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "issuer", title: "Issuer/organization", type: "string" }),
    defineField({ name: "date", title: "Date", type: "date" }),
    defineField({ name: "displayDate", title: "Display date", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "credentialLink", title: "Credential link", type: "url" }),
    defineField({ name: "sortOrder", title: "Sort order", type: "number", initialValue: 0 }),
  ],
  preview: {
    select: { title: "title", subtitle: "issuer" },
  },
});
