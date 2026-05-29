import { StudioShell } from "@/components/studio-shell";
import { hasSanityConfig } from "@/sanity/env";

export default function StudioPage() {
  if (!hasSanityConfig) {
    return (
      <main className="min-h-screen bg-[#F9F9F9] px-6 py-16 text-slate-950">
        <section className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-clay">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">Sanity Studio</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold">Connect your Sanity project</h1>
          <p className="mt-4 leading-8 text-slate-700">
            The portfolio is using local fallback content right now. Add your Sanity project variables to
            <span className="font-semibold text-slate-950"> .env.local</span>, then restart the dev server to edit CMS content here.
          </p>
          <pre className="mt-6 overflow-x-auto rounded-3xl bg-slate-950 p-5 text-sm leading-7 text-slate-100">
{`NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-05-29
SANITY_API_READ_TOKEN=
SANITY_API_WRITE_TOKEN=`}
          </pre>
        </section>
      </main>
    );
  }

  return <StudioShell />;
}
