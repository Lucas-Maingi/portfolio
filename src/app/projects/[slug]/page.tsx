import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Markdown from "@/components/Markdown";
import SubPageNav from "@/components/SubPageNav";
import Footer from "@/components/Footer";
import { caseStudies, getCaseStudy } from "@/content/caseStudies";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case Study | Lucas Maingi" };
  return {
    title: `${study.name} — Case Study | Lucas Maingi`,
    description: study.tagline,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <SubPageNav />
      <main className="flex-1 bg-[#0a0a0a] pt-16">
        <article className="mx-auto max-w-3xl px-6 py-16">
          <Link
            href="/#projects"
            className="text-xs font-mono uppercase tracking-widest text-neutral-500 transition-colors hover:text-accent"
          >
            ← Back to projects
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <span className="rounded-sm border border-accent/10 bg-accent/5 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-accent">
              {study.category}
            </span>
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">{study.name}</h1>
          <p className="mt-3 text-lg text-neutral-400">{study.tagline}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4 border-y border-neutral-900 py-5">
            <div>
              <div className="font-mono text-2xl font-extrabold tracking-tight text-white">
                {study.metric}
              </div>
              <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                {study.metricLabel}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {study.tech.map((t) => (
                <span
                  key={t}
                  className="border border-neutral-900 bg-neutral-950 px-2 py-0.5 font-mono text-[10px] text-neutral-500"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <Markdown>{study.body}</Markdown>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 border-t border-neutral-900 pt-8">
            {study.liveUrl && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-accent bg-accent px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-transparent hover:text-accent"
              >
                Live Demo
              </a>
            )}
            <a
              href={study.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-neutral-800 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white transition-colors hover:border-neutral-700"
            >
              View Source
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
