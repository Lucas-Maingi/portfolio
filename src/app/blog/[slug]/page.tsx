import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Markdown from "@/components/Markdown";
import SubPageNav from "@/components/SubPageNav";
import Footer from "@/components/Footer";
import { posts, getPost } from "@/content/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Writing | Lucas Maingi" };
  return {
    title: `${post.title} | Lucas Maingi`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <SubPageNav />
      <main className="flex-1 bg-[#0a0a0a] pt-16">
        <article className="mx-auto max-w-3xl px-6 py-16">
          <Link
            href="/blog"
            className="font-mono text-xs uppercase tracking-widest text-neutral-500 transition-colors hover:text-accent"
          >
            ← All writing
          </Link>

          <div className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-neutral-500">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
            {post.title}
          </h1>

          <div className="mt-8 border-t border-neutral-900 pt-8">
            <Markdown>{post.body}</Markdown>
          </div>

          <div className="mt-12 border-t border-neutral-900 pt-8">
            <Link
              href="/blog"
              className="font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:text-white"
            >
              ← Back to all writing
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
