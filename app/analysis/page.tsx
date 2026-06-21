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

const STATS = [
  { label: "Calls gescored", value: "27", icon: Target, trend: "+12 diese Woche" },
  { label: "Ø Script Adherence", value: "74%", icon: TrendingUp, trend: "+8% vs. letzte Woche" },
  { label: "Aktive Agents", value: "12", icon: BarChart3, trend: "3 im Coaching" },
  { label: "GDPR-Status", value: "Compliant", icon: Shield, trend: "One-Sided Recording" },
];

const RECENT_CALLS = [
  { agent: "Max Mustermann", campaign: "Leiterplatten Kaltakquise", score: 78, duration: "4:23", outcome: "Positiv", date: "vor 15 Min" },
  { agent: "Julia Schmidt", campaign: "Leiterplatten Kaltakquise", score: 65, duration: "6:01", outcome: "Wiedervorlage", date: "vor 2 Std" },
  { agent: "Anna Weber", campaign: "Leiterplatten Kaltakquise", score: 91, duration: "5:12", outcome: "Positiv", date: "vor 3 Std" },
  { agent: "Tim Lorenz", campaign: "Leiterplatten Kaltakquise", score: 43, duration: "3:45", outcome: "Negativ", date: "vor 4 Std" },
  { agent: "Sarah Klein", campaign: "Leiterplatten Kaltakquise", score: 82, duration: "5:55", outcome: "Positiv", date: "vor 5 Std" },
];

const PIPELINE_STEPS = ["SoftBCom SCC", "Ingestion", "AssemblyAI", "HuggingFace NLI", "Score"];

export default function AnalysisPage() {
  const scoreColor = (s: number) =>
    s >= 80 ? "text-success" : s >= 60 ? "text-warning" : "text-error";

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
                Review script adherence, evidence snippets, pipeline status, and coaching opportunities in a MEGATHON-grade dark scoreboard.
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

        {/* Recent Calls */}
        <div className="mega-panel rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">
              Letzte Auswertungen
            </h2>
            <span className="text-xs text-muted">27 Calls gesamt</span>
          </div>
          <div className="divide-y divide-border">
            {RECENT_CALLS.map((call, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3.5 text-sm hover:bg-accent/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs font-medium text-accent">
                    {call.agent.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{call.agent}</p>
                    <p className="text-xs text-muted">{call.campaign}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className="font-mono text-muted">{call.duration}</span>
                  <span className={`font-semibold ${scoreColor(call.score)}`}>
                    {call.score}%
                  </span>
                  <span className={`px-2 py-0.5 rounded-full font-medium ${
                    call.outcome === "Positiv"
                      ? "bg-success/10 text-success"
                      : call.outcome === "Wiedervorlage"
                        ? "bg-warning/10 text-warning"
                        : "bg-error/10 text-error"
                  }`}>
                    {call.outcome}
                  </span>
                  <span className="text-muted">{call.date}</span>
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
            Trainiere Kaltakquise mit Thomas Maier — live gescort gegen den Leitfaden.
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
