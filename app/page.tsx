"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  BarChart3,
  TrendingUp,
  Target,
  Play,
  ArrowRight,
} from "lucide-react";
import { OUTCOME_MIX, SIGNAL_FEED, SIGNAL_OVERVIEW, VOLUME_TREND } from "@/lib/data";

const STATS = [
  { label: "Tracked Calls", value: SIGNAL_OVERVIEW.trackedCalls.toLocaleString("de-DE"), icon: Phone, trend: "anonymisierte Ground Truth" },
  { label: "Callback Intent", value: `${SIGNAL_OVERVIEW.callbackIntentRate}%`, icon: TrendingUp, trend: "Wiedervorlage + persönliche Follow-ups" },
  { label: "Ø Talk Time", value: `${SIGNAL_OVERVIEW.avgCallSeconds}s`, icon: BarChart3, trend: "über alle anonymisierten Sessions" },
  { label: "Pipeline-Status", value: "Live", icon: Target, trend: "AssemblyAI · HF Inference" },
];

const CAMPAIGNS = [
  {
    name: "Revenue Ops Discovery",
    persona: "Leonie Hartmann",
    guide: "16 Schritte",
    calls: 8484,
    avgScore: 78,
    status: "aktiv",
  },
  {
    name: "Coaching Delta Review",
    persona: "Regional SDR Lead",
    guide: "12 Schritte",
    calls: 0,
    avgScore: null,
    status: "bereit",
  },
  {
    name: "Signal Audit",
    persona: "RevOps Analyst",
    guide: "10 Schritte",
    calls: 0,
    avgScore: null,
    status: "demo",
  },
];

export default function Home() {
  const [hasAccepted, setHasAccepted] = useState(false);

  return (
    <>
      {!hasAccepted && <WelcomeScreen onAccept={() => setHasAccepted(true)} />}
      {hasAccepted && (
        <div className="min-h-screen bg-background animate-fade-in mega-grid-glow">
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
            <section className="mega-panel rounded-[28px] overflow-hidden p-6 sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <p className="mega-kicker mb-4">Megathon Demo · Voice Revenue Engine</p>
                  <h1 className="text-4xl sm:text-6xl text-foreground mb-4">Train. Score. Launch.</h1>
                  <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
                    MEGA.TALK turns raw call activity into coaching proof: live persona simulation,
                    observable guide scoring, and anonymized outcome signals that show which talk tracks actually move pipeline.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/training" className="mega-button rounded-xl px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02]">
                    Start Training
                  </Link>
                  <Link href="/analysis" className="mega-button-secondary rounded-xl px-5 py-3 text-sm font-semibold transition-colors hover:bg-white/5">
                    View Analysis
                  </Link>
                </div>
              </div>
            </section>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="mega-panel mega-hover-lift rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-muted uppercase tracking-[0.2em] font-semibold">
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

            <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="mega-panel rounded-[28px] p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="mega-kicker mb-2">Revenue Signal Snapshot</p>
                    <h2 className="font-display text-2xl text-foreground">What the data actually says</h2>
                  </div>
                  <div className="mega-pill">PII removed · ground truth aggregated</div>
                </div>
                <div className="space-y-4">
                  {OUTCOME_MIX.map((outcome) => (
                    <div key={outcome.label}>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-foreground font-medium">{outcome.label}</span>
                        <span className={`${outcome.tone} font-semibold`}>
                          {outcome.share}% · {outcome.value.toLocaleString("de-DE")}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <div className={`${outcome.bar} h-full rounded-full transition-all duration-700`} style={{ width: `${outcome.share}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mega-panel rounded-[28px] p-6">
                <p className="mega-kicker mb-2">Call Volume Cadence</p>
                <h2 className="font-display text-2xl text-foreground mb-5">Recent spikes</h2>
                <div className="flex items-end gap-3 h-44">
                  {VOLUME_TREND.map((point) => (
                    <div key={point.date} className="flex-1 flex flex-col items-center gap-2">
                      <div className="text-[10px] text-muted">{point.count}</div>
                      <div className="w-full rounded-t-xl bg-gradient-to-t from-accent to-mega-gold-bright/80 animate-fade-in" style={{ height: `${Math.max(10, (point.count / 218) * 120)}px` }} />
                      <div className="text-[10px] uppercase tracking-[0.14em] text-muted">{point.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Pipeline Banner */}
            <div className="mega-panel rounded-2xl p-4 mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Pipeline aktiv
                  </p>
                  <p className="text-xs text-muted">
                    SoftBCom SCC → AssemblyAI → HuggingFace NLI → Score
                  </p>
                </div>
              </div>
              <Link
                href="/analysis"
                className="text-xs text-accent hover:text-accent-hover font-semibold uppercase tracking-[0.18em] flex items-center gap-1"
              >
                Details <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Campaigns */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl text-foreground">
                Motions
              </h2>
              <span className="text-xs text-muted uppercase tracking-[0.18em]">3 Demo-Motions</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CAMPAIGNS.map((campaign) => (
                <Link
                  key={campaign.name}
                  href={
                    campaign.status === "aktiv"
                      ? "/training"
                      : "#"
                  }
                  className={`mega-panel mega-hover-lift rounded-2xl p-5 transition-all ${
                    campaign.status === "aktiv"
                      ? "border-accent/40 hover:border-accent"
                      : campaign.status === "bereit"
                        ? "border-border hover:border-border-dark"
                        : "border-border opacity-60 hover:opacity-80"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        campaign.status === "aktiv"
                          ? "bg-success/10 text-success"
                          : campaign.status === "bereit"
                            ? "bg-accent/10 text-accent"
                            : "bg-white/5 text-muted border-border"
                      }`}
                    >
                      {campaign.status === "aktiv"
                        ? "Aktiv"
                        : campaign.status === "bereit"
                          ? "Bereit"
                          : "Demo"}
                    </span>
                    {campaign.status === "aktiv" && (
                      <span className="flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-success opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-base font-semibold text-foreground mb-1">
                    {campaign.name}
                  </h3>
                  <p className="text-sm text-muted mb-3">
                    Persona: {campaign.persona}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-muted mb-4">
                    <span>{campaign.guide}</span>
                    <span className="text-border-dark">·</span>
                    <span>{campaign.calls} Calls gescored</span>
                    {campaign.avgScore !== null && (
                      <>
                        <span className="text-border-dark">·</span>
                        <span className="text-success font-medium">
                          Ø {campaign.avgScore}%
                        </span>
                      </>
                    )}
                  </div>

                  {campaign.status === "aktiv" && (
                    <div className="flex items-center gap-2 text-accent text-sm font-medium">
                      <Play className="w-3.5 h-3.5" />
                      Training starten
                    </div>
                  )}
                </Link>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="mt-10">
              <h2 className="font-display text-xl text-foreground mb-4">
                Sales Enablement Feed
              </h2>
              <div className="mega-panel rounded-2xl divide-y divide-border overflow-hidden mega-shimmer">
                {SIGNAL_FEED.map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-5 py-3.5 text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs font-medium text-accent">
                        {activity.lane
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {activity.lane}
                        </p>
                        <p className="text-xs text-muted">
                          {activity.note}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted">
                      <span className="font-semibold text-accent">{activity.metric}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-xl border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl mega-button flex items-center justify-center shadow-sm">
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
          <span className="font-display text-lg text-foreground tracking-[0.08em]">
            MEGA.TALK
          </span>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/"
            className="text-accent font-medium"
          >
            Dashboard
          </Link>
          <Link
            href="/analysis"
            className="text-muted hover:text-foreground transition-colors uppercase tracking-[0.14em] text-xs font-semibold"
          >
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

function WelcomeScreen({ onAccept }: { onAccept: () => void }) {
  const [agreed, setAgreed] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="fixed inset-0 z-50 bg-background mega-grid-glow flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mega-button mb-5 shadow-lg">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-display text-foreground tracking-[0.08em]">
            MEGA.TALK
          </h1>
          <p className="mt-2 text-sm text-muted font-body uppercase tracking-[0.18em]">
            Megathon Voice Revenue Demo
          </p>
        </div>

        <div className="mega-panel rounded-[28px] p-8">
          <div className="mega-pill mb-5">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Call-Intelligence Plattform
          </div>

          <p className="text-sm text-muted mb-6 leading-relaxed">
            Trainiere deine Vertriebsmitarbeiter mit KI-gestützten Personas.
            Der Leitfaden wird live gescort — basierend auf beobachtbaren
            Revenue-Ops-Kriterien.
          </p>

          <div className="mb-4">
            <input
              type="email"
              placeholder="deine@email.de (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background/80 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
            />
          </div>

          <label className="flex items-start gap-3 mb-6 p-3 rounded-xl bg-background/70 border border-border cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-border-dark text-accent focus:ring-accent/30"
            />
            <span className="text-xs text-muted leading-relaxed">
              Ich stimme den{" "}
              <a
                href="/terms"
                target="_blank"
                className="text-accent underline underline-offset-2 hover:text-accent-hover"
              >
                Nutzungsbedingungen
              </a>{" "}
              und der{" "}
              <a
                href="/privacy"
                target="_blank"
                className="text-accent underline underline-offset-2 hover:text-accent-hover"
              >
                Datenschutzerklärung
              </a>{" "}
              zu.
            </span>
          </label>

          <button
            onClick={onAccept}
            disabled={!agreed}
            className="w-full py-3 rounded-xl mega-button font-semibold text-sm disabled:bg-border disabled:text-muted disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            Zum Dashboard
          </button>

          <div className="mt-6 flex items-center justify-center gap-3 text-xs text-muted">
            <span>Made in Berlin</span>
            <span className="text-border-dark">·</span>
            <span>Megathon 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
