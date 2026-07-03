"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renders a markdown string with Tailwind styling tuned to the dark portfolio
 * theme. Avoids the typography plugin so there is no extra Tailwind config.
 */
export default function Markdown({ children }: { children: string }) {
  return (
    <div className="text-neutral-300 leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="mt-10 mb-4 text-2xl font-bold tracking-tight text-white">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 mb-3 text-lg font-semibold text-white">{children}</h3>
          ),
          p: ({ children }) => <p className="my-4 text-[15px]">{children}</p>,
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-accent underline underline-offset-4 hover:text-white transition-colors"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="my-4 list-disc space-y-2 pl-6 text-[15px] marker:text-neutral-600">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 list-decimal space-y-2 pl-6 text-[15px] marker:text-neutral-500">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-white">{children}</strong>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-5 border-l-2 border-accent/60 bg-white/[0.02] py-1 pl-4 text-neutral-400 italic">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-8 border-neutral-900" />,
          pre: ({ children }) => (
            <pre className="my-5 overflow-x-auto rounded-lg border border-border-subtle bg-[#0d0d0d] p-4 text-[13px] leading-relaxed">
              {children}
            </pre>
          ),
          code: ({ className, children }) => {
            const isBlock = /language-/.test(className || "");
            if (isBlock) {
              return <code className="font-mono text-neutral-200">{children}</code>;
            }
            return (
              <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-accent">
                {children}
              </code>
            );
          },
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-neutral-800 bg-neutral-950 px-3 py-2 text-left font-semibold text-white">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-neutral-900 px-3 py-2 text-neutral-300">{children}</td>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
