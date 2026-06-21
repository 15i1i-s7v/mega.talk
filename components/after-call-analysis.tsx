"use client";

import { useState } from "react";
import {
  BarChart3,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowLeft,
  TrendingUp,
  Target,
  Clock,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const MOCK_CRITERIA = [
  {
    id: "k01",
    order: 1,
    text: "Präziser Einstieg mit Name und Firma",
    status: "fulfilled" as const,
    score: 0.94,
    evidence: "Guten Tag Frau Hartmann, mein Name ist Max Winter von MEGA.TALK.",
  },
  {
    id: "k02",
    order: 2,
    text: "Zuständigkeit für Revenue Ops verifizieren",
    status: "fulfilled" as const,
    score: 0.88,
    evidence: "Bin ich bei Ihnen richtig, wenn es um Gesprächsqualität, Coaching und Pipeline-Disziplin geht?",
  },
  {
    id: "k03",
    order: 3,
    text: "Operativen Schmerz statt Tool nennen",
    status: "fulfilled" as const,
    score: 0.91,
    evidence: "Viele Teams sehen Aktivität, aber nicht, welche Gespräche wirklich Meetings erzeugen.",
  },
  {
    id: "k04",
    order: 4,
    text: "Messbaren Hebel nennen",
    status: "fulfilled" as const,
    score: 0.82,
    evidence: "Führung sieht innerhalb von Tagen, welche Talk-Tracks Wiedervorlagen und echte nächste Schritte treiben.",
  },
  {
    id: "k05",
    order: 5,
    text: "Ablauf in klaren Schritten beschreiben",
    status: "fulfilled" as const,
    score: 0.95,
    evidence: "Wir verbinden Calls, legen euren Leitfaden als Raster an und machen dann Coaching-Lücken pro Motion sichtbar.",
  },
  {
    id: "k06",
    order: 6,
    text: "Abgrenzung zu Standard-Dashboards",
    status: "not_fulfilled" as const,
    score: 0.32,
    evidence: "Auf die Frage nach bestehender Conversation-Intelligence kam keine scharfe Differenzierung.",
  },
  {
    id: "k07",
    order: 7,
    text: "Führungsvorteil benennen",
    status: "fulfilled" as const,
    score: 0.87,
    evidence: "Dann besprechen Führung und RevOps nicht mehr aus dem Bauch heraus, sondern mit sichtbaren Gesprächssignalen.",
  },
  {
    id: "k08",
    order: 8,
    text: "Zeit bis Value beantworten",
    status: "fulfilled" as const,
    score: 0.79,
    evidence: "Erste verwertbare Muster sehen Teams typischerweise schon in der ersten Woche.",
  },
  {
    id: "k09",
    order: 9,
    text: "Alltagsnutzer klar verorten",
    status: "fulfilled" as const,
    score: 0.85,
    evidence: "Sales Leads coachen damit, Ops hält das Review-Raster sauber und Management sieht die Auswirkung auf die Pipeline.",
  },
  {
    id: "k10",
    order: 10,
    text: "Konkreten Discovery-Schritt vorschlagen",
    status: "partial" as const,
    score: 0.58,
    evidence: "Der nächste Schritt wurde angeboten, aber Dauer und Agenda des Reviews hätten schärfer sein können.",
  },
  {
    id: "k11",
    order: 11,
    text: "Zeitpräferenz vor Slot erfragen",
    status: "fulfilled" as const,
    score: 0.76,
    evidence: "Passt Ihnen für so einen Review eher Anfang der Woche oder Ende der Woche?",
  },
  {
    id: "k12",
    order: 12,
    text: "Konkreten Termin setzen",
    status: "fulfilled" as const,
    score: 0.83,
    evidence: "Dann lassen Sie uns Mittwoch um 10 Uhr einen anonymisierten Review-Flow durchgehen.",
  },
  {
    id: "k13",
    order: 13,
    text: "Follow-up Kanal sichern",
    status: "fulfilled" as const,
    score: 0.72,
    evidence: "Ich schicke Ihnen direkt im Anschluss die Agenda und das Sample-Dashboard per Mail.",
  },
  {
    id: "k14",
    order: 14,
    text: "ROI-Rückfrage souverän aufnehmen",
    status: "not_fulfilled" as const,
    score: 0.21,
    evidence: "Die Rückfrage, wie schnell Coaching-Effekte messbar werden, wurde nur teilweise mit Zahlen hinterlegt.",
  },
  {
    id: "k15",
    order: 15,
    text: "Wettbewerbsfrage neutral halten",
    status: "fulfilled" as const,
    score: 0.90,
    evidence: "Der Vergleich zu bestehenden QA-Tools blieb respektvoll und wurde auf Signalqualität statt Feature-Listen gelenkt.",
  },
  {
    id: "k16",
    order: 16,
    text: "Nächsten administrativen Schritt abschließen",
    status: "fulfilled" as const,
    score: 0.93,
    evidence: "Perfekt, dann notiere ich Ihre Mailadresse für die Einladung und das anonymisierte Sample.",
  },
];

const MOCK_TRANSCRIPT = [
  { speaker: "Mitarbeiter", text: "Guten Tag Frau Hartmann, mein Name ist Max Winter von MEGA.TALK." },
  { speaker: "Leonie Hartmann", text: "Hartmann, guten Tag. Worum geht es konkret?" },
  { speaker: "Mitarbeiter", text: "Ich melde mich, weil viele Teams zwar Aktivität sehen, aber nicht, welche Gespräche wirklich Meetings und Wiedervorlagen erzeugen." },
  { speaker: "Leonie Hartmann", text: "Dashboards haben wir genug. Was sehen wir bei Ihnen anders?" },
  { speaker: "Mitarbeiter", text: "Sie sehen nicht nur Transkripte, sondern welche Talk-Tracks, Einwände und Leitfaden-Schritte tatsächlich Pipeline-Momentum auslösen." },
  { speaker: "Leonie Hartmann", text: "Und wer nutzt das dann im Alltag?" },
  { speaker: "Mitarbeiter", text: "Sales Leads coachen damit, Ops hält die Review-Logik sauber, und Führung bekommt belegbare Signal-Muster statt Bauchgefühl." },
  { speaker: "Leonie Hartmann", text: "Wie schnell ist so etwas verwertbar?" },
  { speaker: "Mitarbeiter", text: "Erste Muster sehen Teams oft in der ersten Woche, weil wir Calls anbinden, den Leitfaden als Raster anlegen und Outcomes sauber clustern." },
  { speaker: "Leonie Hartmann", text: "Okay, das ist zumindest konkreter als das meiste, was ich höre." },
  { speaker: "Mitarbeiter", text: "Dann würde ich Ihnen gern in 20 Minuten einen anonymisierten Review-Flow zeigen — mit echten Coaching-Lücken und Signalverteilungen." },
  { speaker: "Leonie Hartmann", text: "Anfang der Woche wäre besser als Ende der Woche." },
  { speaker: "Mitarbeiter", text: "Dann lassen Sie uns Mittwoch um 10 Uhr gehen. Ich schicke Ihnen direkt danach Agenda und Sample-Dashboard." },
  { speaker: "Leonie Hartmann", text: "Passt. Schicken Sie es an l.hartmann@nordstern-industrie.de." },
];

const OVERALL_SCORE = 78;
const DURATION = "4:23";
const DATE = "20. Juni 2026 · 14:30 Uhr";
const EMPLOYEE = "Rep-01";

function getStatusIcon(status: string) {
  switch (status) {
    case "fulfilled":
      return <CheckCircle2 className="w-4 h-4 text-success" />;
    case "partial":
      return <AlertCircle className="w-4 h-4 text-warning" />;
    case "not_fulfilled":
      return <XCircle className="w-4 h-4 text-error" />;
    default:
      return null;
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "fulfilled":
      return "Erfüllt";
    case "partial":
      return "Teilweise";
    case "not_fulfilled":
      return "Nicht erfüllt";
    default:
      return "";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "fulfilled":
      return "text-success border-success/30 bg-success/5";
    case "partial":
      return "text-warning border-warning/30 bg-warning/5";
    case "not_fulfilled":
      return "text-error border-error/30 bg-error/5";
    default:
      return "text-muted border-border bg-background";
  }
}

export function AfterCallAnalysis({ onBack }: { onBack?: () => void }) {
  const [expandedCriterion, setExpandedCriterion] = useState<string | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);

  const fulfilled = MOCK_CRITERIA.filter((c) => c.status === "fulfilled").length;
  const partial = MOCK_CRITERIA.filter((c) => c.status === "partial").length;
  const notFulfilled = MOCK_CRITERIA.filter((c) => c.status === "not_fulfilled").length;

  const scoreColor =
    OVERALL_SCORE >= 80
      ? "text-success"
      : OVERALL_SCORE >= 60
        ? "text-warning"
        : "text-error";

  return (
    <div className="space-y-6">
      {/* Back */}
      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zum Training
        </button>
      )}

      {/* Header Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="mega-panel mega-hover-lift rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted uppercase tracking-wider font-medium">
              Script Adherence Score
            </span>
            <Target className="w-4 h-4 text-accent" />
          </div>
          <p className={`text-3xl font-display font-semibold ${scoreColor}`}>
            {OVERALL_SCORE}%
          </p>
        </div>

        <div className="mega-panel mega-hover-lift rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted uppercase tracking-wider font-medium">
              Kriterien
            </span>
            <FileText className="w-4 h-4 text-accent" />
          </div>
          <p className="text-3xl font-display font-semibold text-foreground">
            {fulfilled + partial}/{MOCK_CRITERIA.length}
          </p>
          <div className="mt-2 flex gap-2 text-xs">
            <span className="text-success">{fulfilled} erfüllt</span>
            <span className="text-warning">{partial} teilweise</span>
            <span className="text-error">{notFulfilled} verfehlt</span>
          </div>
        </div>

        <div className="mega-panel mega-hover-lift rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted uppercase tracking-wider font-medium">
              Dauer
            </span>
            <Clock className="w-4 h-4 text-accent" />
          </div>
          <p className="text-3xl font-display font-semibold text-foreground">
            {DURATION}
          </p>
          <p className="text-xs text-muted mt-1">{DATE}</p>
        </div>

        <div className="mega-panel mega-hover-lift rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted uppercase tracking-wider font-medium">
              Pipeline
            </span>
            <BarChart3 className="w-4 h-4 text-accent" />
          </div>
          <p className="text-sm font-semibold text-foreground">{EMPLOYEE}</p>
          <p className="text-xs text-muted mt-1">AssemblyAI → HF NLI</p>
        </div>
      </div>

      {/* Pipeline Steps */}
      <div className="mega-panel rounded-2xl p-5 mega-shimmer">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-accent" />
          Pipeline-Durchlauf
        </h3>
        <div className="flex items-center gap-2 text-xs">
          {[
            { label: "Audio", done: true },
            { label: "AssemblyAI", done: true },
            { label: "Transkript", done: true },
            { label: "HF NLI", done: true },
            { label: "Score", done: true },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
                  step.done
                    ? "bg-success/10 text-success border border-success/20"
                    : "bg-muted text-muted border border-border"
                }`}
              >
                <CheckCircle2 className="w-3 h-3" />
                <span className="font-medium">{step.label}</span>
              </div>
              {i < 4 && (
                <div className="flex-1 h-px bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Criteria breakdown */}
      <div className="mega-panel rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">
            Leitfaden-Kriterien
          </h3>
          <span className="text-xs text-muted">
            {fulfilled + partial}/{MOCK_CRITERIA.length} bestanden
          </span>
        </div>

        <div className="divide-y divide-border">
          {MOCK_CRITERIA.map((criterion) => (
            <div key={criterion.id}>
              <button
                onClick={() =>
                  setExpandedCriterion(
                    expandedCriterion === criterion.id ? null : criterion.id
                  )
                }
                className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-accent/5 transition-colors mega-hover-lift"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-semibold flex items-center justify-center">
                    {criterion.order}
                  </div>
                  <span className="text-sm text-foreground truncate">
                    {criterion.text}
                  </span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getStatusColor(criterion.status)}`}
                  >
                    {getStatusIcon(criterion.status)}
                    <span className="ml-1">{getStatusLabel(criterion.status)}</span>
                  </span>
                  {expandedCriterion === criterion.id ? (
                    <ChevronUp className="w-4 h-4 text-muted" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted" />
                  )}
                </div>
              </button>

              {expandedCriterion === criterion.id && (
                <div className="px-5 pb-4 pt-0 bg-accent/5">
                  <div className="ml-9 space-y-2">
                    <div>
                      <span className="text-xs text-muted">NLI-Score: </span>
                      <span className="text-xs font-mono font-medium text-foreground">
                        {(criterion.score * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="bg-card rounded-lg border border-border p-3">
                      <p className="text-xs text-muted mb-1">Evidenz aus Transkript:</p>
                      <p className="text-sm text-foreground italic">
                        &ldquo;{criterion.evidence}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Transcript */}
      <div className="mega-panel rounded-2xl overflow-hidden">
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="w-full px-5 py-4 flex items-center justify-between text-left"
        >
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent" />
            Transkript
          </h3>
          {showTranscript ? (
            <ChevronUp className="w-4 h-4 text-muted" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted" />
          )}
        </button>

        {showTranscript && (
          <div className="px-5 pb-5 space-y-3 max-h-96 overflow-y-auto scrollbar-thin">
            {MOCK_TRANSCRIPT.map((entry, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 ${
                  entry.speaker !== "Mitarbeiter" ? "opacity-70" : ""
                }`}
              >
                <div
                  className={`flex-shrink-0 w-16 text-xs font-medium px-2 py-1 rounded ${
                    entry.speaker === "Mitarbeiter"
                      ? "bg-accent/10 text-accent"
                      : "bg-muted text-muted"
                  }`}
                >
                  {entry.speaker === "Mitarbeiter" ? "Agentin" : "Persona"}
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {entry.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Coaching Note */}
      <div className="mega-panel rounded-2xl p-5 animate-float-soft">
        <h3 className="text-sm font-semibold text-foreground mb-2">
          Coaching-Hinweise
        </h3>
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <span className="text-warning flex-shrink-0">→</span>
            <span>
              <strong>Grund erklären:</strong> Wenn der Empfang nachfragt, kurz erklären
              und mit einer Frage zurückführen.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning flex-shrink-0">→</span>
            <span>
              <strong>Zeitlicher Vorteil:</strong> "Statt Wochen" als konkreten
              Vergleich nennen — das ist der stärkste USP.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning flex-shrink-0">→</span>
            <span>
              <strong>Zeitpräferenz:</strong> Erst Präferenz erfragen (vormittags/
              nachmittags), dann konkreten Termin nennen.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
