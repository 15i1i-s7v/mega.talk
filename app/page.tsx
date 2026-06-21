"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  BarChart3,
  Users,
  TrendingUp,
  Target,
  Play,
  ArrowRight,
} from "lucide-react";

const STATS = [
  { label: "Trainings heute", value: "3", icon: Phone, trend: "+2 heute" },
  { label: "Durchschnitts-Score", value: "74%", icon: TrendingUp, trend: "+8% diese Woche" },
  { label: "Aktive Mitarbeiter", value: "12", icon: Users, trend: "3 im Training" },
  { label: "Pipeline-Status", value: "Live", icon: Target, trend: "AssemblyAI · HF Inference" },
];

const CAMPAIGNS = [
  {
    name: "Leiterplatten Kaltakquise",
    persona: "Thomas Maier",
    guide: "16 Schritte",
    calls: 7,
    avgScore: 72,
    status: "aktiv",
  },
  {
    name: "Elektronik-Entwicklung",
    persona: "Dr. Andrea Fuchs",
    guide: "12 Schritte",
    calls: 0,
    avgScore: null,
    status: "bereit",
  },
  {
    name: "Fertigungs-Optimierung",
    persona: "Klaus Werner",
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
        <div className="min-h-screen bg-background animate-fade-in">
          <Header />
          <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card rounded-xl border border-border p-5 shadow-sm"
                >
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

            {/* Pipeline Banner */}
            <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 mb-8 flex items-center justify-between">
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
                className="text-xs text-accent hover:text-accent-hover font-medium flex items-center gap-1"
              >
                Details <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Campaigns */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Kampagnen
              </h2>
              <span className="text-xs text-muted">3 Kampagnen</span>
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
                  className={`bg-card rounded-xl border p-5 shadow-sm transition-all hover:shadow-md ${
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
                            : "bg-muted text-muted"
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
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                Letzte Aktivität
              </h2>
              <div className="bg-card rounded-xl border border-border shadow-sm divide-y divide-border">
                {[
                  {
                    employee: "Max Mustermann",
                    campaign: "Leiterplatten Kaltakquise",
                    score: 78,
                    duration: "4:23",
                    date: "vor 15 Min",
                  },
                  {
                    employee: "Julia Schmidt",
                    campaign: "Leiterplatten Kaltakquise",
                    score: 65,
                    duration: "6:01",
                    date: "vor 2 Std",
                  },
                  {
                    employee: "Anna Weber",
                    campaign: "Leiterplatten Kaltakquise",
                    score: 91,
                    duration: "5:12",
                    date: "vor 3 Std",
                  },
                ].map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-5 py-3.5 text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-xs font-medium text-accent">
                        {activity.employee
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {activity.employee}
                        </p>
                        <p className="text-xs text-muted">
                          {activity.campaign}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted">
                      <span className="font-mono">{activity.duration}</span>
                      <span
                        className={`font-semibold ${
                          activity.score >= 80
                            ? "text-success"
                            : activity.score >= 60
                              ? "text-warning"
                              : "text-error"
                        }`}
                      >
                        {activity.score}%
                      </span>
                      <span>{activity.date}</span>
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
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
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
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/"
            className="text-accent font-medium"
          >
            Dashboard
          </Link>
          <Link
            href="/analysis"
            className="text-muted hover:text-foreground transition-colors"
          >
            Analysen
          </Link>
          <Link
            href="/training"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-colors"
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
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent text-white mb-5 shadow-lg shadow-orange-200">
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
          <h1 className="text-4xl font-display font-semibold text-foreground tracking-tight">
            MEGA.TALK
          </h1>
          <p className="mt-2 text-sm text-muted font-body">
            Observability Layer für Outbound-Engines
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background border border-border mb-5 text-xs text-muted">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Call-Intelligence Plattform
          </div>

          <p className="text-sm text-muted mb-6 leading-relaxed">
            Trainiere deine Vertriebsmitarbeiter mit KI-gestützten Personas.
            Der Leitfaden wird live gescort — basierend auf echten
            Kaltakquise-Kriterien.
          </p>

          <div className="mb-4">
            <input
              type="email"
              placeholder="deine@email.de (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
            />
          </div>

          <label className="flex items-start gap-3 mb-6 p-3 rounded-xl bg-background border border-border cursor-pointer">
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
            className="w-full py-3 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-hover disabled:bg-border disabled:text-muted disabled:cursor-not-allowed transition-colors shadow-sm"
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
