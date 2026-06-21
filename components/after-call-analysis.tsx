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
    text: "Open with clear name and company",
    status: "fulfilled" as const,
    score: 0.94,
    evidence: "Good afternoon Ms. Hartmann, this is Max Winter from MEGA.TALK.",
  },
  {
    id: "k02",
    order: 2,
    text: "Verify ownership of revenue operations",
    status: "fulfilled" as const,
    score: 0.88,
    evidence: "Am I right that you own conversation quality, coaching, and pipeline discipline?",
  },
  {
    id: "k03",
    order: 3,
    text: "Lead with operating pain, not the tool",
    status: "fulfilled" as const,
    score: 0.91,
    evidence: "Many teams can see activity, but they still cannot see which conversations actually create meetings.",
  },
  {
    id: "k04",
    order: 4,
    text: "Name a measurable upside",
    status: "fulfilled" as const,
    score: 0.82,
    evidence: "Leadership can see within days which talk tracks create callbacks and real next steps.",
  },
  {
    id: "k05",
    order: 5,
    text: "Explain the workflow in clear steps",
    status: "fulfilled" as const,
    score: 0.95,
    evidence: "We connect calls, map the guide as a review grid, and then expose coaching gaps by motion.",
  },
  {
    id: "k06",
    order: 6,
    text: "Differentiate from standard dashboards",
    status: "not_fulfilled" as const,
    score: 0.32,
    evidence: "The answer to the conversation-intelligence comparison was still not sharp enough.",
  },
  {
    id: "k07",
    order: 7,
    text: "State the leadership value",
    status: "fulfilled" as const,
    score: 0.87,
    evidence: "That way leadership and RevOps stop reviewing on gut feel and start reviewing on visible conversation signals.",
  },
  {
    id: "k08",
    order: 8,
    text: "Answer time-to-value clearly",
    status: "fulfilled" as const,
    score: 0.79,
    evidence: "Teams typically see the first usable patterns in the first week.",
  },
  {
    id: "k09",
    order: 9,
    text: "Name the daily users clearly",
    status: "fulfilled" as const,
    score: 0.85,
    evidence: "Sales leads coach with it, ops keeps the review grid clean, and management sees the pipeline impact.",
  },
  {
    id: "k10",
    order: 10,
    text: "Offer a concrete discovery step",
    status: "partial" as const,
    score: 0.58,
    evidence: "The next step was offered, but the duration and review agenda could have been sharper.",
  },
  {
    id: "k11",
    order: 11,
    text: "Ask for time preference before the slot",
    status: "fulfilled" as const,
    score: 0.76,
    evidence: "Would early next week work better for that review, or later in the week?",
  },
  {
    id: "k12",
    order: 12,
    text: "Lock a concrete calendar slot",
    status: "fulfilled" as const,
    score: 0.83,
    evidence: "Then let us walk through an anonymized review flow on Wednesday at 10.",
  },
  {
    id: "k13",
    order: 13,
    text: "Secure the follow-up channel",
    status: "fulfilled" as const,
    score: 0.72,
    evidence: "I will send the agenda and sample dashboard right after the call.",
  },
  {
    id: "k14",
    order: 14,
    text: "Handle ROI pushback cleanly",
    status: "not_fulfilled" as const,
    score: 0.21,
    evidence: "The question about how quickly coaching impact becomes measurable was only partly backed with numbers.",
  },
  {
    id: "k15",
    order: 15,
    text: "Handle competitor comparison calmly",
    status: "fulfilled" as const,
    score: 0.90,
    evidence: "The comparison to existing QA tools stayed respectful and focused on signal quality instead of feature lists.",
  },
  {
    id: "k16",
    order: 16,
    text: "Close the admin next step",
    status: "fulfilled" as const,
    score: 0.93,
    evidence: "Perfect, I will note your email for the invite and the anonymized sample dashboard.",
  },
];

const MOCK_TRANSCRIPT = [
  { speaker: "Rep", text: "Good afternoon Ms. Hartmann, this is Max Winter from MEGA.TALK." },
  { speaker: "Leonie Hartmann", text: "Hartmann speaking. What exactly is this about?" },
  { speaker: "Rep", text: "Most sales teams can see activity, but they still cannot see which conversations actually create meetings and callbacks." },
  { speaker: "Leonie Hartmann", text: "We already have dashboards. What would be different here?" },
  { speaker: "Rep", text: "You would not just see transcripts. You would see which talk tracks, objections, and guide moments actually create pipeline momentum." },
  { speaker: "Leonie Hartmann", text: "Who uses it every day?" },
  { speaker: "Rep", text: "Sales leads use it to coach, operations keeps the review logic clean, and leadership gets proof instead of gut feel." },
  { speaker: "Leonie Hartmann", text: "How quickly would that become useful?" },
  { speaker: "Rep", text: "Teams usually see the first usable patterns in the first week because we connect calls, map the guide, and cluster outcomes fast." },
  { speaker: "Leonie Hartmann", text: "That is more concrete than most of what I hear." },
  { speaker: "Rep", text: "Then let me show you a 20-minute anonymized review flow with real coaching gaps and signal distribution." },
  { speaker: "Leonie Hartmann", text: "Early next week works better than later in the week." },
  { speaker: "Rep", text: "Great. Let us lock Wednesday at 10. I will send the agenda and sample dashboard right after this." },
  { speaker: "Leonie Hartmann", text: "That works. Send it to l.hartmann@nordstern-industrie.de." },
];

const OVERALL_SCORE = 78;
const DURATION = "4:23";
const DATE = "June 20, 2026 · 2:30 PM";
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
      return "Met";
    case "partial":
      return "Partial";
    case "not_fulfilled":
      return "Missed";
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
          Back to training
        </button>
      )}

      {/* Header Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="mega-panel mega-hover-lift rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted uppercase tracking-wider font-medium">
              Guide adherence score
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
              Criteria
            </span>
            <FileText className="w-4 h-4 text-accent" />
          </div>
          <p className="text-3xl font-display font-semibold text-foreground">
            {fulfilled + partial}/{MOCK_CRITERIA.length}
          </p>
          <div className="mt-2 flex gap-2 text-xs">
            <span className="text-success">{fulfilled} met</span>
            <span className="text-warning">{partial} partial</span>
            <span className="text-error">{notFulfilled} missed</span>
          </div>
        </div>

        <div className="mega-panel mega-hover-lift rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted uppercase tracking-wider font-medium">
              Duration
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
          Pipeline run
        </h3>
        <div className="flex items-center gap-2 text-xs">
          {[
            { label: "Audio", done: true },
            { label: "AssemblyAI", done: true },
            { label: "Transcript", done: true },
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
            Guide criteria
          </h3>
          <span className="text-xs text-muted">
            {fulfilled + partial}/{MOCK_CRITERIA.length} passed
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
                      <span className="text-xs text-muted">NLI score: </span>
                      <span className="text-xs font-mono font-medium text-foreground">
                        {(criterion.score * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="bg-card rounded-lg border border-border p-3">
                      <p className="text-xs text-muted mb-1">Transcript evidence:</p>
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
            Transcript
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
                  entry.speaker !== "Rep" ? "opacity-70" : ""
                }`}
              >
                <div
                  className={`flex-shrink-0 w-16 text-xs font-medium px-2 py-1 rounded ${
                    entry.speaker === "Rep"
                      ? "bg-accent/10 text-accent"
                      : "bg-muted text-muted"
                  }`}
                >
                  {entry.speaker === "Rep" ? "Rep" : "Persona"}
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
          Coaching notes
        </h3>
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex items-start gap-2">
            <span className="text-warning flex-shrink-0">→</span>
            <span>
              <strong>Differentiate faster:</strong> Answer the dashboard objection with a sharper before-vs-after contrast.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning flex-shrink-0">→</span>
            <span>
              <strong>Quantify impact:</strong> Put time-to-value and coaching proof into numbers earlier in the conversation.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-warning flex-shrink-0">→</span>
            <span>
              <strong>Protect the close:</strong> Keep the two-step close — preference first, slot second — because it preserves control without pressure.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
