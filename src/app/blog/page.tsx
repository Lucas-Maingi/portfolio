import type { Metadata } from "next";
import Link from "next/link";

import SubPageNav from "@/components/SubPageNav";
import Footer from "@/components/Footer";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Writing | Lucas Maingi",
  description:
    "Essays on applied machine learning, honest model evaluation, and production engineering by Lucas Maingi.",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndex() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <SubPageNav />
      <main className="flex-1 bg-[#0a0a0a] pt-16">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">Writing</span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Notes on applied ML & shipping
          </h1>
          <p className="mt-3 max-w-xl text-sm text-neutral-400">
            Short, specific write-ups from building my projects — honest evaluation, real bugs,
            and the engineering that turns a notebook into a product.
          </p>

          <div className="mt-12 flex flex-col divide-y divide-neutral-900 border-t border-neutral-900">
            {sorted.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-2 py-8 transition-colors"
              >
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden>·</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="text-xl font-bold text-white transition-colors group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed text-neutral-400">{post.excerpt}</p>
                <span className="mt-1 font-mono text-[11px] uppercase tracking-wider text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  Read →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
