# Pruthvi Hosamani Portfolio

Premium personal portfolio built with Next.js App Router, TypeScript, Tailwind CSS, Sanity CMS, next-sanity, Portable Text, Framer Motion, and Lucide React.

The initial content was extracted from `/Users/pruthvihosmani/Downloads/Pruthvi_Resume.pdf` and modeled as CMS documents. The site reads from Sanity when environment variables are configured, and falls back to the local seed content so the portfolio still runs before a Sanity project is connected.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Sanity Studio

The Studio is embedded in the Next.js app at:

```bash
http://localhost:3000/studio
```

You can also run the Sanity CLI:

```bash
npm run studio
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-29
SANITY_API_READ_TOKEN=
SANITY_API_WRITE_TOKEN=
```

`SANITY_API_READ_TOKEN` is optional for public datasets. `SANITY_API_WRITE_TOKEN` is only needed for the seed script.

## Seed Sanity content

After creating a Sanity project and adding a write token:

```bash
npm run seed:sanity
```

The seed script creates or replaces:

- `profile`
- `siteSettings`
- skill categories
- experience entries
- education entries
- projects
- case studies
- certifications / achievements
- timeline items

The local seed source is `src/data/portfolio-content.ts`.

## Where to edit content

- Profile, contact links, resume path/file, CTA buttons: Sanity Studio -> Profile
- Projects: Sanity Studio -> Project
- Experience: Sanity Studio -> Experience
- Education: Sanity Studio -> Education
- Skills: Sanity Studio -> Skill Category
- Certifications and achievements: Sanity Studio -> Certification / Achievement
- Timeline: Sanity Studio -> Timeline Item
- Aloka Enterprises LLP case study: Sanity Studio -> Case Study -> `Aloka Enterprises LLP Website / Ecommerce Platform`
- Navigation, SEO, footer: Sanity Studio -> Site Settings

## Resume PDF

The fallback resume file is copied to:

```bash
public/pruthvi-hosamani-resume.pdf
```

In Sanity, you can either upload a resume PDF in the Profile document or keep using the public `resumeUrl` path.

## Validation

```bash
npm run lint
npm run typecheck
npm run build
```

## Notes

Some resume fields did not include explicit dates, images, websites, or credential URLs. Those are modeled as editable CMS fields instead of invented content. Aloka Enterprises LLP is included as a featured client case study using the project context and visual direction supplied in the request.
