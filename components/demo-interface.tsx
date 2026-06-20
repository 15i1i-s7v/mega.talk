"use client";

import { PersonaCard } from "./persona-card";
import { PlaybookViewer } from "./playbook-viewer";
import { CallControls } from "./call-controls";
import { CallStateProvider } from "@/lib/call-state-context";

export function DemoInterface() {
  return (
    <CallStateProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
              </div>
              <span className="font-display text-lg font-semibold text-foreground tracking-tight">
                re:train
              </span>
            </div>
          </div>
        </header>

        {/* Main Grid */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28 lg:pb-32">
          <div className="lg:grid lg:grid-cols-[280px_1fr_340px] gap-6">
            {/* Left — Campaign / Persona info */}
            <div className="mb-6 lg:mb-0">
              <div className="sticky top-20">
                <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-xs font-medium text-muted">
                      Kampagne: Leiterplatten
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                    Kaltakquise-Training
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    Trainiere das Gespräch mit Thomas Maier anhand des
                    Leitfadens. Die KI bewertet, wie gut du die einzelnen
                    Schritte einhältst.
                  </p>
                </div>
                <div className="mt-4 bg-card rounded-xl border border-border p-5 shadow-sm">
                  <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">
                    Deine Coaching-Daten
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted">Gespräche heute</span>
                        <span className="font-semibold text-foreground">0</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted">Bester Score</span>
                        <span className="font-semibold text-foreground">—</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-border">
                      <a
                        href="/analysis"
                        className="text-sm text-accent hover:text-accent-hover font-medium transition-colors"
                      >
                        Zur Auswertung →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center — Playbook */}
            <div className="mb-6 lg:mb-0">
              <PlaybookViewer />
            </div>

            {/* Right — Persona */}
            <div>
              <PersonaCard />
            </div>
          </div>
        </main>

        {/* Bottom Call Controls */}
        <CallControls />
      </div>
    </CallStateProvider>
  );
}
