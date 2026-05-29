/* eslint-disable @next/next/no-img-element */
import { BrainCircuit, BriefcaseBusiness, Code2, Layers3 } from "lucide-react";

import type { Profile } from "@/sanity/types";

const signals = [
  { label: "RAG Systems", value: "LLM evaluation", icon: BrainCircuit },
  { label: "Backend", value: "Python APIs", icon: Code2 },
  { label: "Client Work", value: "Aloka + RGUHS", icon: BriefcaseBusiness },
];

export function HeroVisual({ profile }: { profile: Profile }) {
  const image = profile.profileImage;
  const backgroundImageUrl = image?.url === "/pruthvi-hero-portrait.png" ? "/pruthvi-hero-portrait-blur.webp" : image?.url;
  const initials = profile.fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 p-4 shadow-clay sm:rounded-[2.25rem] sm:p-6 lg:p-7"
      aria-label="Hero portrait visual"
    >
      <div className="absolute -right-12 -top-10 h-40 w-40 rounded-[2rem] bg-[var(--accent-lavender)] opacity-70 blur-sm" />
      <div className="absolute -bottom-16 left-1/3 h-44 w-44 rounded-[2rem] bg-[var(--accent-mint)] opacity-60 blur-sm" />
      <div className="absolute left-8 top-10 h-16 w-16 rotate-12 rounded-[1.35rem] bg-[var(--accent-blue)] shadow-clay" />
      <div className="absolute bottom-16 right-12 h-20 w-20 -rotate-12 rounded-[1.5rem] bg-[var(--accent-butter)] shadow-clay" />

      <div className="relative grid grid-cols-[0.86fr_1.14fr] items-stretch gap-3 sm:gap-5">
        <div className="flex flex-col justify-between gap-4">
          <div>
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-blue)] text-slate-950 shadow-clay sm:h-11 sm:w-11">
              <Layers3 className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <p className="mt-4 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-blue-700 sm:mt-5 sm:text-xs sm:tracking-[0.24em]">
              Portfolio signal
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold leading-none text-slate-950 sm:text-3xl">
              Developer systems, made visible.
            </h2>
            <p className="mt-4 hidden text-sm leading-7 text-slate-600 sm:block">
              A CMS-backed profile surface for work, case studies, and an interactive RAG terminal.
            </p>
          </div>

          <div className="hidden gap-3 sm:grid">
            {signals.map((signal) => {
              const Icon = signal.icon;
              return (
                <div key={signal.label} className="flex items-center gap-3 rounded-[1.25rem] border border-slate-200/90 bg-white/75 p-3 shadow-[0_12px_28px_rgba(17,24,39,0.06)]">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--accent-mint)] text-slate-950">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-slate-950">{signal.label}</span>
                    <span className="block text-xs font-medium text-slate-500">{signal.value}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[260px] overflow-hidden rounded-[1.6rem] border border-slate-200 bg-[linear-gradient(145deg,#ffffff,#f6fbff)] p-3 shadow-[0_22px_54px_rgba(17,24,39,0.12)] sm:min-h-[420px] sm:rounded-[2rem] sm:p-4">
          <div className="absolute left-6 top-6 z-0 h-14 w-14 rotate-12 rounded-[1.2rem] bg-[var(--accent-peach)] opacity-90 shadow-clay" />
          <div className="absolute right-8 top-12 z-0 h-12 w-12 -rotate-12 rounded-[1rem] bg-[var(--accent-lavender)] opacity-90 shadow-clay" />
          <div className="absolute bottom-8 left-8 z-0 h-16 w-16 -rotate-6 rounded-[1.35rem] bg-[var(--accent-mint)] opacity-90 shadow-clay" />

          <div className="relative z-10 mx-auto aspect-[4/5] h-full max-h-[234px] overflow-hidden rounded-[1.3rem] bg-[radial-gradient(circle_at_50%_22%,rgba(202,228,249,0.82),transparent_34%),linear-gradient(180deg,#fff,#f8fafc)] sm:max-h-[388px] sm:rounded-[1.55rem]">
            {image?.url ? (
              <>
                {backgroundImageUrl ? (
                  <img
                    src={backgroundImageUrl}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full scale-110 object-cover opacity-20 blur-xl saturate-75"
                  />
                ) : null}
                <div className="absolute inset-x-6 bottom-0 h-24 rounded-t-[999px] bg-white/70 blur-2xl" />
                <img
                  src={image.url}
                  alt={image.alt || `${profile.fullName} portrait`}
                  className="relative z-10 h-full w-full origin-top scale-[1.08] object-cover object-[50%_18%] drop-shadow-[0_22px_30px_rgba(17,24,39,0.18)] sm:scale-[1.1]"
                />
              </>
            ) : (
              <div className="mb-5 grid h-32 w-32 place-items-center rounded-[1.75rem] border border-white bg-white/80 font-serif text-5xl font-semibold text-slate-950 shadow-clay sm:mb-7 sm:h-64 sm:w-64 sm:rounded-[2.25rem] sm:text-7xl">
                {initials}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative mt-5 grid gap-3 sm:grid-cols-3">
        <MiniMetric label="Mode" value="CMS-driven" />
        <MiniMetric label="Focus" value="RAG + APIs" />
        <MiniMetric label="Visual" value={image?.url ? "Portrait live" : "Portrait ready"} />
      </div>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.2rem] border border-slate-200/90 bg-white/75 p-3">
      <p className="text-[0.64rem] font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-950">{value}</p>
    </div>
  );
}
