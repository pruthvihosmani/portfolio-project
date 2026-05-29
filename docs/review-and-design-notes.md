# Portfolio Review And Design Notes

## Current CMS Coverage

- Profile, skills, experience, education, certifications, projects, case studies, timeline, and site settings are modeled in Sanity schemas.
- The Next.js app reads Sanity through GROQ queries when environment variables are configured.
- Local fallback content exists in `src/data/portfolio-content.ts`, so pages remain populated before Sanity is connected.
- The resume PDF is available from `public/pruthvi-hosamani-resume.pdf`.
- The Aloka Enterprises LLP case study is present as a featured CMS-managed case study.

## Review Findings Before Refactor

- The site met the data model requirements, but the first visual pass was dark, dense, and more dashboard-like than the bright terminal reference.
- Several sections were readable but visually similar, with repeated dark cards and limited hierarchy.
- The hero had a systems-map panel but did not yet provide the requested interactive terminal/GUI experience.
- Missing CMS media remain expected placeholders: profile image, project images, case study gallery images, OG image, favicon replacement, exact credential links, and dates not present in the resume.

## Updated Design Direction

- Shifted to a light white/off-white base with near-black body text for readability.
- Added pastel claymorphic cards, soft shadows, rounded square motifs, and larger spacing.
- Added a Three.js pastel data-block scene for a subtle 3D hero element.
- Added an interactive RAG-style terminal that searches the CMS-backed portfolio corpus and returns relevant profile, project, experience, skill, certification, and case study results.
- Added editable theme accent fields and hero graphic direction to Site Settings for future CMS-managed visual tuning.

## Screenshot Review Follow-Up

- Tightened the home hero spacing so it no longer uses the same tall padding as standard sections.
- Contained the Three.js blocks inside a white claymorphic panel and reduced the cube scale so the scene does not wash over the terminal area.
- Reduced terminal screen height and shortened GUI result previews, keeping the RAG terminal visible without overwhelming the first scroll.
- Adjusted stat cards and skill cards to avoid clipped labels, row stretching, and oversized empty card space.
- Rechecked desktop, tablet, and mobile layouts for horizontal overflow, console errors, stat label overflow, and nonblank canvas rendering.
