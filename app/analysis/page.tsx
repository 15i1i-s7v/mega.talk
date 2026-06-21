"use client";

import Link from "next/link";
import {
  Phone,
  BarChart3,
  TrendingUp,
  Target,
  ArrowRight,
  Shield,
} from "lucide-react";
import { OUTCOME_MIX, SIGNAL_OVERVIEW, VOLUME_TREND } from "@/lib/data";

const STATS = [
  { label: "Tracked Calls", value: SIGNAL_OVERVIEW.trackedCalls.toLocaleString("de-DE"), icon: Target, trend: "CSV-ground truth · anonymisiert" },
  { label: "Callback Intent", value: `${SIGNAL_OVERVIEW.callbackIntentRate}%`, icon: TrendingUp, trend: "stärkstes Signal vor Pipeline-Weitergabe" },
  { label: "Ø Gesprächsdauer", value: `${SIGNAL_OVERVIEW.avgCallSeconds}s`, icon: BarChart3, trend: "lange positive Gespräche liegen deutlich höher" },
  { label: "GDPR-Status", value: "Compliant", icon: Shield, trend: "One-Sided Recording" },
];

const PIPELINE_STEPS = ["SoftBCom SCC", "Ingestion", "AssemblyAI", "HuggingFace NLI", "Score"];

export default function AnalysisPage() {
  return (
    <div className="min-h-screen bg-background mega-grid-glow">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <section className="mega-panel rounded-[28px] p-5 sm:p-6">
          <p className="mega-kicker mb-3">Post-Call Scoring</p>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl text-foreground">Analysis Control Room</h1>
              <p className="mt-2 text-sm text-muted max-w-2xl">
                Review anonymized outcome mix, conversation velocity, and coaching signals derived from real tracked call history.
              </p>
            </div>
            <div className="mega-pill">AssemblyAI · HF NLI · Live Scoring</div>
          </div>
        </section>
        {/* Pipeline Status */}
        <div className="mega-panel rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Target className="w-4 h-4 text-accent" />
              Pipeline-Status
            </h2>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
              </span>
              <span className="text-xs text-success font-medium">Live</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs flex-wrap">
            {PIPELINE_STEPS.map((step, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="px-2.5 py-1 rounded-full bg-success/10 text-success border border-success/20 font-medium">
                  {step}
                </div>
                {i < PIPELINE_STEPS.length - 1 && (
                  <div className="w-6 h-px bg-border" />
                )}
              </div>
            ))}
            <span className="text-xs text-muted ml-3">
              Letzter Durchlauf: vor 12 Min
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="mega-panel rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted uppercase tracking-wider font-medium">
                  {stat.label}
                </span>
                <stat.icon className="w-4 h-4 text-accent" />
              </div>
              <p className="text-2xl font-display font-semibold text-foreground">
                {stat.value}
              </p>
              <p className="text-xs text-muted mt-1">{stat.trend}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="mega-panel rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Outcome Mix</h2>
              <span className="text-xs text-muted">PII-free aggregation</span>
            </div>
            <div className="space-y-4">
              {OUTCOME_MIX.map((row) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-foreground">{row.label}</span>
                    <span className={`${row.tone} font-semibold`}>{row.share}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className={`${row.bar} h-full rounded-full`} style={{ width: `${row.share}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mega-panel rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-foreground">Volume Cadence</h2>
              <span className="text-xs text-muted">last observed active days</span>
            </div>
            <div className="flex items-end gap-3 h-44">
              {VOLUME_TREND.map((point) => (
                <div key={point.date} className="flex-1 flex flex-col items-center gap-2">
                  <div className="text-[10px] text-muted">{point.count}</div>
                  <div className="w-full rounded-t-xl bg-gradient-to-t from-accent to-mega-gold-bright/80" style={{ height: `${Math.max(10, (point.count / 218) * 120)}px` }} />
                  <div className="text-[10px] uppercase tracking-[0.14em] text-muted">{point.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Signal Board */}
        <div className="mega-panel rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">
              Signal Board
            </h2>
            <span className="text-xs text-muted">enablement narrative from ground truth</span>
          </div>
          <div className="divide-y divide-border">
            {[
              ["Callback intent dominates", "58%", "Reps create follow-up momentum far more often than hard positive closes."],
              ["Positive calls are long", "448s avg", "Closed-positive conversations are materially longer than neutral or negative outcomes."],
              ["Tag hygiene still leaks signal", "17% unknown", "Outcome discipline is a product opportunity: MEGA.TALK can force cleaner review workflows."],
            ].map(([title, metric, note]) => (
              <div key={title} className="flex items-center justify-between px-5 py-3.5 text-sm hover:bg-accent/5 transition-colors mega-hover-lift">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs font-medium text-accent">
                    MT
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{title}</p>
                    <p className="text-xs text-muted">{note}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="font-semibold text-accent">{metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mega-panel rounded-2xl p-6 text-center">
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">
            Bereit für dein Training?
          </h2>
          <p className="text-sm text-muted mb-4">
            Trainiere Discovery Calls mit Leonie Hartmann — live gescort gegen den Enablement-Leitfaden.
          </p>
          <Link
            href="/training"
            className="mega-button inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-transform hover:scale-[1.02]"
          >
            <Phone className="w-4 h-4" />
            Training starten
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-xl border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl mega-button flex items-center justify-center shadow-sm">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
          </div>
          <span className="font-display text-lg text-foreground tracking-[0.08em]">
            MEGA.TALK
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="text-muted hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link href="/analysis" className="text-accent font-semibold uppercase tracking-[0.14em] text-xs">
            Analysen
          </Link>
          <Link
            href="/training"
            className="mega-button inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold transition-transform hover:scale-[1.02]"
          >
            <Phone className="w-3.5 h-3.5" />
            Training
          </Link>
        </nav>
      </div>
    </header>
  );
}
