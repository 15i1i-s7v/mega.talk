"use client";

import { useState } from "react";
import { AgentSidebar } from "@/components/agent-sidebar";
import { PersonaCard } from "@/components/persona-card";
import { PlaybookViewer } from "@/components/playbook-viewer";
import { CallControls } from "@/components/call-controls";
import { CallStateProvider } from "@/lib/call-state-context";
import { AfterCallAnalysis } from "@/components/after-call-analysis";

export default function TrainingPage() {
  const [showAnalysis, setShowAnalysis] = useState(false);

  return (
    <CallStateProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-sm">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
              </div>
              <span className="font-display text-lg font-semibold text-foreground tracking-tight">
                MEGA.TALK
              </span>
            </div>
            <a
              href="/"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              ← Dashboard
            </a>
          </div>
        </header>

        {/* Main Grid */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 lg:pb-32">
          {showAnalysis ? (
            <AfterCallAnalysis onBack={() => setShowAnalysis(false)} />
          ) : (
            <div className="lg:grid lg:grid-cols-[220px_1fr_320px] gap-6">
              <div className="mb-6 lg:mb-0">
                <AgentSidebar />
              </div>
              <div className="mb-6 lg:mb-0">
                <PlaybookViewer />
              </div>
              <div>
                <PersonaCard onShowAnalysis={() => setShowAnalysis(true)} />
              </div>
            </div>
          )}
        </main>

        <CallControls onShowAnalysis={() => setShowAnalysis(true)} />
      </div>
    </CallStateProvider>
  );
}