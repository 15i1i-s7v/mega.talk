"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PLAYBOOK } from "@/lib/data";

export function PlaybookViewer() {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-6 max-h-[calc(100vh-220px)] overflow-y-auto scrollbar-thin">
      {/* Header */}
      <div className="sticky top-0 -mx-6 px-6 pb-4 mb-5 border-b border-border bg-card z-10">
        <div className="flex items-center gap-3">
          <div className="w-1 h-7 bg-accent rounded-full" />
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Leitfaden
            </h2>
            <p className="text-xs text-muted">
              Kaltakquise — Leiterplattenbestückung
            </p>
          </div>
        </div>
      </div>

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children, ...props }) => (
            <h1
              className="text-xl font-display font-semibold text-foreground mb-4 mt-6 pb-3 border-b border-border"
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2
              className="text-lg font-display font-semibold text-foreground mb-3 mt-6 flex items-center gap-2"
              {...props}
            >
              <span className="text-accent">▸</span>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3
              className="text-base font-semibold text-foreground mb-2.5 mt-5"
              {...props}
            >
              {children}
            </h3>
          ),
          p: ({ children, ...props }) => (
            <p
              className="text-sm text-foreground/80 mb-4 leading-relaxed"
              {...props}
            >
              {children}
            </p>
          ),
          ul: ({ children, ...props }) => (
            <ul
              className="mb-4 space-y-1.5 text-sm text-foreground/80 ml-5"
              style={{ listStyleType: "none" }}
              {...props}
            >
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol
              className="list-decimal mb-4 space-y-1.5 text-sm text-foreground/80 ml-5"
              {...props}
            >
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li
              className="relative pl-5 before:content-['•'] before:absolute before:left-0 before:text-accent"
              {...props}
            >
              {children}
            </li>
          ),
          strong: ({ children, ...props }) => (
            <strong
              className="font-semibold text-foreground"
              {...props}
            >
              {children}
            </strong>
          ),
          em: ({ children, ...props }) => (
            <em className="italic text-muted" {...props}>
              {children}
            </em>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote
              className="relative border-l-2 border-accent/40 pl-4 pr-4 py-3 my-4 bg-accent/5 rounded-r text-sm text-foreground/80 italic"
              {...props}
            >
              {children}
            </blockquote>
          ),
          hr: () => (
            <div className="my-6 border-t border-border" />
          ),
        }}
      >
        {PLAYBOOK}
      </ReactMarkdown>
    </div>
  );
}
