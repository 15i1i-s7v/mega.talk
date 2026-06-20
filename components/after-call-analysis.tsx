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
    text: "Begrüßung mit vollständigem Namen",
    status: "fulfilled" as const,
    score: 0.94,
    evidence: "Guten Morgen Herr Maier, mein Name ist Max Mustermann von der Firma TechSolutions.",
  },
  {
    id: "k02",
    order: 2,
    text: "Empfang um Hilfe bitten",
    status: "fulfilled" as const,
    score: 0.88,
    evidence: "Herr Maier, Sie müssen mir bitte einmal helfen.",
  },
  {
    id: "k03",
    order: 3,
    text: "Nach Ansprechpartner für Bestückung fragen",
    status: "fulfilled" as const,
    score: 0.91,
    evidence: "Wer ist bei Ihnen der richtige Ansprechpartner für Leiterplattenbestückung und Prototypen?",
  },
  {
    id: "k04",
    order: 4,
    text: "Durchwahl erfragen",
    status: "fulfilled" as const,
    score: 0.82,
    evidence: "Welche Durchwahl hat er denn?",
  },
  {
    id: "k05",
    order: 5,
    text: "Bitte um Verbindung",
    status: "fulfilled" as const,
    score: 0.95,
    evidence: "Sind Sie so gut und verbinden Sie mich?",
  },
  {
    id: "k06",
    order: 6,
    text: "Grund erklären bei Nachfrage",
    status: "not_fulfilled" as const,
    score: 0.32,
    evidence: "(Nicht klar adressiert — Empfang fragte nach, wechselte direkt zum Entscheider)",
  },
  {
    id: "k07",
    order: 7,
    text: "Gespräch mit Entscheider bestätigen",
    status: "fulfilled" as const,
    score: 0.87,
    evidence: "Schön dass ich Sie erreiche, Herr Maier. Mein Name ist Max Mustermann.",
  },
  {
    id: "k08",
    order: 8,
    text: "Prüfen ob Thema richtig ist",
    status: "fulfilled" as const,
    score: 0.79,
    evidence: "Bin ich bei Ihnen richtig wenn es um Bestückung und kleine Serien geht?",
  },
  {
    id: "k09",
    order: 9,
    text: "Direkt zum Punkt kommen",
    status: "fulfilled" as const,
    score: 0.85,
    evidence: "Wir unterstützen Unternehmen bei Prototypen und kleinen Serien.",
  },
  {
    id: "k10",
    order: 10,
    text: "Zeitlichen Vorteil nennen",
    status: "partial" as const,
    score: 0.58,
    evidence: "Baugruppen in wenigen Tagen erwähnt, aber nicht \"statt Wochen\" konkretisiert.",
  },
  {
    id: "k11",
    order: 11,
    text: "Ablauf beschreiben",
    status: "fulfilled" as const,
    score: 0.76,
    evidence: "Wir klären gemeinsam Datenlage und besprechen offene Entscheidungen.",
  },
  {
    id: "k12",
    order: 12,
    text: "Kundennutzen benennen",
    status: "fulfilled" as const,
    score: 0.83,
    evidence: "Sie sparen Zeit im Projekt und haben Sicherheit für die nächsten Schritte.",
  },
  {
    id: "k13",
    order: 13,
    text: "Nächsten Schritt vorschlagen",
    status: "fulfilled" as const,
    score: 0.72,
    evidence: "Unser Geschäftsführer zeigt Ihnen das gerne telefonisch oder vor Ort.",
  },
  {
    id: "k14",
    order: 14,
    text: "Zeitpräferenz erfragen",
    status: "not_fulfilled" as const,
    score: 0.21,
    evidence: "Wurde direkt ein Termin genannt ohne vorher die Präferenz zu erfragen.",
  },
  {
    id: "k15",
    order: 15,
    text: "Konkreten Termin vorschlagen",
    status: "fulfilled" as const,
    score: 0.90,
    evidence: "Wie wäre es nächste Woche Donnerstag um 10 Uhr?",
  },
  {
    id: "k16",
    order: 16,
    text: "E-Mail für Terminbestätigung",
    status: "fulfilled" as const,
    score: 0.93,
    evidence: "Dann bräuchte ich bitte Ihre Mailadresse für die Terminbestätigung.",
  },
];

const MOCK_TRANSCRIPT = [
  { speaker: "Mitarbeiter", text: "Guten Morgen Herr Maier, mein Name ist Max Mustermann von der Firma TechSolutions." },
  { speaker: "Thomas Maier", text: "Maier, Guten Morgen. Was kann ich für Sie tun?" },
  { speaker: "Mitarbeiter", text: "Herr Maier, Sie müssen mir bitte einmal helfen. Wer ist bei Ihnen der richtige Ansprechpartner für Leiterplattenbestückung und Prototypen?" },
  { speaker: "Thomas Maier", text: "Also Prototypen und Kleinserien — das bin ich selbst, da bin ich noch in der Entwicklung dabei." },
  { speaker: "Mitarbeiter", text: "Welche Durchwahl haben Sie denn?" },
  { speaker: "Thomas Maier", text: "Durchwahl 42. Sind Sie so gut und verbinden Sie mich? Äh, warten Sie, Sie sind ja schon bei mir dran." },
  { speaker: "Mitarbeiter", text: "Schön dass ich Sie erreiche. Bin ich bei Ihnen richtig wenn es um Bestückung und kleine Serien geht?" },
  { speaker: "Thomas Maier", text: "Ja, da sind Sie richtig. Prototypen und Kleinserien, das ist unser tägliches Geschäft." },
  { speaker: "Mitarbeiter", text: "Wir unterstützen Unternehmen bei Prototypen und kleinen Serien. Baugruppen in wenigen Tagen — das ist unser Versprechen." },
  { speaker: "Thomas Maier", text: "In wenigen Tagen? Das klingt interessant. Wir warten manchmal wochenlang auf Muster." },
  { speaker: "Mitarbeiter", text: "Genau darum geht es. Wir klären gemeinsam die Datenlage und was realistisch umsetzbar ist. Sie sparen Zeit im Projekt und haben Sicherheit." },
  { speaker: "Thomas Maier", text: "Klingt gut. Aber was kostet mich der Spaß? Wir sind kein Großkonzern." },
  { speaker: "Mitarbeiter", text: "Das besprechen wir im Detail. Unser Geschäftsführer zeigt Ihnen das gerne telefonisch oder vor Ort." },
  { speaker: "Thomas Maier", text: "Na gut, reden wir mal. Schaden kann's ja nicht." },
  { speaker: "Mitarbeiter", text: "Passt es Ihnen grundsätzlich besser vormittags oder nachmittags?" },
  { speaker: "Thomas Maier", text: "Eher vormittags, so zwischen 9 und 11." },
  { speaker: "Mitarbeiter", text: "Wie wäre es nächste Woche Donnerstag um 10 Uhr?" },
  { speaker: "Thomas Maier", text: "Passt. Tragen Sie's ein." },
  { speaker: "Mitarbeiter", text: "Dann bräuchte ich bitte Ihre Mailadresse für die Terminbestätigung." },
  { speaker: "Thomas Maier", text: "maier@leiterplatten.de. Freu mich auf das Gespräch." },
];

const OVERALL_SCORE = 78;
const DURATION = "4:23";
const DATE = "20. Juni 2026 · 14:30 Uhr";
const EMPLOYEE = "Max Mustermann";

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
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
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

        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
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

        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
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

        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
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
      <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
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
      <div className="bg-card rounded-xl border border-border shadow-sm">
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
                className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-accent/5 transition-colors"
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
      <div className="bg-card rounded-xl border border-border shadow-sm">
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
                  entry.speaker === "Thomas Maier" ? "opacity-70" : ""
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
      <div className="bg-accent/5 border border-accent/20 rounded-xl p-5">
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