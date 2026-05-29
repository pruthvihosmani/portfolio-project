import { defineField, defineType } from "sanity";

export const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({
      name: "fullName",
      title: "Full name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Professional headline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortBio",
      title: "Short bio",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "longAbout",
      title: "Long about text",
      type: "portableText",
    }),
    defineField({
      name: "profileImage",
      title: "Profile image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    }),
    defineField({ name: "email", title: "Email", type: "email" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "github", title: "GitHub", type: "url" }),
    defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
    defineField({ name: "website", title: "Website", type: "url" }),
    defineField({
      name: "resumeFile",
      title: "Resume PDF/file",
      type: "file",
      options: { accept: ".pdf" },
    }),
    defineField({
      name: "resumeUrl",
      title: "Resume URL or public path",
      type: "string",
      description: "Use this if the resume PDF is stored in the public folder.",
    }),
    defineField({
      name: "ctaButtons",
      title: "CTA text/buttons",
      type: "array",
      of: [{ type: "ctaButton" }],
    }),
  ],
  preview: {
    select: {
      title: "fullName",
      subtitle: "headline",
      media: "profileImage",
    },
  },
});
