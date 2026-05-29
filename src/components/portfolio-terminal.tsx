"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { ArrowUpRight, BrainCircuit, Command, Download, Sparkles } from "lucide-react";

import { resumeHref } from "@/lib/utils";
import type { PortfolioContent } from "@/sanity/types";

type CorpusItem = {
  title: string;
  type: string;
  body: string;
  href?: string;
};

type TerminalLine = {
  id: number;
  kind: "system" | "input" | "output" | "result";
  text: string;
  href?: string;
};

const commands = ["help", "about", "experience", "projects", "skills", "certifications", "aloka", "resume", "contact", "clear"];

export function PortfolioTerminal({ content }: { content: PortfolioContent }) {
  const firstName = content.profile.fullName.split(" ")[0] || "this portfolio";
  const terminalUser = firstName.toLowerCase();
  const starterPrompts = [
    `Why should I hire ${firstName}?`,
    `Show ${firstName}'s backend/API experience`,
    "Show RAG and LLM work",
    "Show client delivery work",
    "Explain the Aloka project",
    "What is strongest in this portfolio?",
  ];
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<CorpusItem | null>(null);
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: 1, kind: "system", text: `Initializing ${firstName}OS v1.0...` },
    { id: 2, kind: "system", text: "Loading Sanity-backed profile, projects, skills, experience, case studies... OK." },
    { id: 3, kind: "system", text: "CMS index ready. Ask about hiring fit, backend/API work, RAG systems, client delivery, or Aloka." },
  ]);
  const counter = useRef(4);

  const corpus = useMemo(() => buildCorpus(content), [content]);
  const featured = selected || corpus.find((item) => item.title.includes("Arogya AI")) || corpus[0];
  const featuredPreview =
    featured.body.length > 380 ? `${featured.body.slice(0, 380).trim().replace(/[.,;:]+$/, "")}...` : featured.body;

  function push(kind: TerminalLine["kind"], text: string, href?: string) {
    counter.current += 1;
    const id = counter.current;
    setLines((current) => [...current.slice(-12), { id, kind, text, href }]);
  }

  function runCommand(rawValue: string) {
    const value = rawValue.trim();
    if (!value) {
      return;
    }

    push("input", `${terminalUser}@portfolio ~ % ${value}`);
    const normalized = value.toLowerCase();

    if (normalized === "clear") {
      setLines([{ id: counter.current + 1, kind: "system", text: "Terminal cleared. RAG index still warm." }]);
      counter.current += 1;
      return;
    }

    if (normalized === "help") {
      push("output", `Available commands: ${commands.join(", ")}.`);
      push("output", `You can also ask: "Why should I hire ${firstName}?" or "Show RAG and LLM work".`);
      return;
    }

    if (normalized === "resume") {
      push("result", "Resume PDF is ready. Open or download it from the Resume page.", resumeHref(content.profile));
      return;
    }

    if (normalized === "contact") {
      push("result", `${content.profile.email || "Email placeholder missing"} | ${content.profile.linkedin || "LinkedIn placeholder missing"}`, "/contact");
      return;
    }

    const commandMap: Record<string, string[]> = {
      about: ["profile"],
      experience: ["experience"],
      projects: ["project"],
      skills: ["skill"],
      certifications: ["achievement"],
      aloka: ["aloka"],
    };

    const commandTypes = commandMap[normalized];
    if (commandTypes) {
      const matches = corpus.filter((item) =>
        commandTypes.some((type) => item.type.toLowerCase().includes(type) || item.title.toLowerCase().includes(type)),
      );
      respondWithMatches(matches.slice(0, 3), normalized);
      return;
    }

    const intentMatches = getIntentMatches(corpus, normalized);
    if (intentMatches.length) {
      respondWithMatches(intentMatches, "Portfolio answer");
      return;
    }

    const matches = retrieve(corpus, normalized);
    respondWithMatches(matches, "CMS answer");
  }

  function respondWithMatches(matches: CorpusItem[], label: string) {
    if (!matches.length) {
      push("output", "No strong match found. Try projects, skills, experience, aloka, or a more specific question.");
      return;
    }

    setSelected(matches[0]);
    push("output", `${label}: ${summarizeMatches(matches)}.`);
    matches.forEach((match, index) => {
      push("result", `${index + 1}. [${match.type}] ${match.title} - ${match.body.slice(0, 130)}${match.body.length > 130 ? "..." : ""}`, match.href);
    });
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runCommand(input);
    setInput("");
  }

  return (
    <section className="terminal-grid" aria-label="Interactive RAG-powered terminal and GUI portfolio">
      <div className="terminal-paper">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--accent-blue)] text-slate-950 shadow-clay">
              <Command className="h-5 w-5" />
            </span>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-500">Interactive portfolio terminal</p>
              <h2 className="font-serif text-2xl font-semibold text-slate-950 sm:text-3xl">Ask the CMS index</h2>
            </div>
          </div>
          <a className="soft-button" href={resumeHref(content.profile)} download>
            <Download className="h-4 w-4" /> Resume
          </a>
        </div>
        <div className="terminal-screen" role="log" aria-live="polite">
          {lines.map((line) => (
            <p key={line.id} className={line.kind === "input" ? "text-slate-950" : line.kind === "result" ? "text-blue-800" : "text-slate-600"}>
              {line.href ? (
                <a href={line.href} className="underline decoration-blue-300 underline-offset-4">
                  {line.text}
                </a>
              ) : (
                line.text
              )}
            </p>
          ))}
        </div>
        <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="portfolio-terminal-input">
            Ask the portfolio terminal
          </label>
          <input
            id="portfolio-terminal-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="terminal-input"
            placeholder={`Ask: Why should I hire ${firstName}?`}
          />
          <button className="primary-button" type="submit">
            Ask <Sparkles className="h-4 w-4" />
          </button>
        </form>
        <div className="mt-4 flex flex-wrap gap-2">
          {starterPrompts.map((prompt) => (
            <button key={prompt} type="button" className="command-chip" onClick={() => runCommand(prompt)}>
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <aside className="gui-panel">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--accent-mint)] text-slate-950 shadow-clay">
            <BrainCircuit className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">GUI result</p>
            <h3 className="text-xl font-bold text-slate-950">{featured.title}</h3>
          </div>
        </div>
        <p className="mt-5 text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">{featuredPreview}</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Metric label="Source" value={featured.type} />
          <Metric label="CMS docs" value={String(corpus.length)} />
        </div>
        {featured.href ? (
          <a href={featured.href} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-700">
            Open source page <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : null}
      </aside>
    </section>
  );
}

function getIntentMatches(corpus: CorpusItem[], query: string) {
  const pick = (predicate: (item: CorpusItem) => boolean) => corpus.filter(predicate).slice(0, 3);

  if (query.includes("hire") || query.includes("strongest")) {
    return pick((item) => /RGUHS|Rexroth|Arogya|Profile/i.test(`${item.title} ${item.type}`));
  }

  if (query.includes("backend") || query.includes("api")) {
    return pick((item) => /backend|api|fastapi|django|flask|\.net|rest|jwt/i.test(`${item.title} ${item.body}`));
  }

  if (query.includes("rag") || query.includes("llm")) {
    return pick((item) => /rag|llm|langchain|langgraph|chroma|medgemma|groq/i.test(`${item.title} ${item.body}`));
  }

  if (query.includes("client") || query.includes("delivery")) {
    return pick((item) => /RGUHS|Aloka|Rexroth|client|contract|production/i.test(`${item.title} ${item.body}`));
  }

  if (query.includes("aloka") || query.includes("coffee") || query.includes("commerce")) {
    return pick((item) => /Aloka|coffee|catalogue|ecommerce|commerce/i.test(`${item.title} ${item.body}`));
  }

  return [];
}

function summarizeMatches(matches: CorpusItem[]) {
  const sourceTypes = Array.from(new Set(matches.map((match) => match.type.split("/")[0].trim()))).slice(0, 3);
  return `${matches.length} source card${matches.length > 1 ? "s" : ""} from ${sourceTypes.join(", ")}`;
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-clay">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-bold text-slate-950">{value}</p>
    </div>
  );
}

function buildCorpus(content: PortfolioContent): CorpusItem[] {
  return [
    {
      title: content.profile.fullName,
      type: "Profile",
      body: `${content.profile.headline}. ${content.profile.shortBio || ""}`,
      href: "/about",
    },
    ...content.experiences.map((item) => ({
      title: `${item.title} - ${item.company}`,
      type: "Experience",
      body: `${item.displayDate || ""}. ${item.shortDescription || ""} ${(item.responsibilities || []).join(" ")}`,
      href: "/about",
    })),
    ...content.projects.map((item) => ({
      title: item.name,
      type: `Project / ${item.projectType || item.category || "Portfolio"}`,
      body: `${item.shortDescription || ""} ${item.problemSolved || ""} ${(item.keyFeatures || []).join(" ")} ${(item.techStack || []).join(", ")}`,
      href: `/projects/${item.slug}`,
    })),
    ...content.skills.map((item) => ({
      title: item.name,
      type: "Skill Category",
      body: item.skills.join(", "),
      href: "/about",
    })),
    ...content.caseStudies.map((item) => ({
      title: item.title,
      type: "Case Study",
      body: `${item.clientName || ""}. ${item.businessProblem || ""} ${item.proposedSolution || ""} ${(item.keyFeatures || []).join(" ")}`,
      href: `/case-studies/${item.slug}`,
    })),
    ...content.certifications.map((item) => ({
      title: item.title,
      type: "Achievement",
      body: `${item.issuer || ""}. ${item.displayDate || ""}. ${item.description || ""}`,
      href: "/about",
    })),
  ];
}

function retrieve(corpus: CorpusItem[], query: string) {
  const tokens = query
    .toLowerCase()
    .split(/[^a-z0-9.+#]+/)
    .filter((token) => token.length > 2);

  return corpus
    .map((item) => {
      const haystack = `${item.title} ${item.type} ${item.body}`.toLowerCase();
      const score = tokens.reduce((total, token) => total + (haystack.includes(token) ? 1 : 0), 0);
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ item }) => item);
}
