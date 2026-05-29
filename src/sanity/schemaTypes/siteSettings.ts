import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", title: "Site title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "siteDescription", title: "Site description", type: "text", rows: 3 }),
    defineField({ name: "seoKeywords", title: "SEO keywords", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "openGraphImage",
      title: "Open Graph image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    }),
    defineField({ name: "favicon", title: "Favicon", type: "image" }),
    defineField({ name: "navbarLinks", title: "Navbar links", type: "array", of: [{ type: "navLink" }] }),
    defineField({ name: "footerText", title: "Footer text", type: "text", rows: 2 }),
    defineField({
      name: "themeAccents",
      title: "Theme accent colours",
      type: "array",
      of: [{ type: "string" }],
      description: "Optional hex colors for light claymorphic accents, for example #CAE4F9.",
    }),
    defineField({
      name: "heroGraphic",
      title: "Hero graphic direction",
      type: "string",
      description: "Short editorial note for the homepage 3D/visual direction.",
    }),
  ],
  preview: {
    select: { title: "siteTitle", subtitle: "siteDescription" },
  },
});
