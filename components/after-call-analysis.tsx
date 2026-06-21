"use client";

import { useState } from "react";
import { useCallState } from "@/lib/call-state-context";
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

export interface CriterionResult {
  id: string;
  order: number;
  text: string;
  status: "fulfilled" | "partial" | "not_fulfilled";
  score: number;
  evidence: string | null;
}

const PLAYBOOK_CRITERIA: Omit<CriterionResult, "status" | "score" | "evidence">[] = [
  { id: "k01", order: 1, text: "Open with clear name and company" },
  { id: "k02", order: 2, text: "Verify ownership of revenue operations" },
  { id: "k03", order: 3, text: "Lead with operating pain, not the tool" },
  { id: "k04", order: 4, text: "Name a measurable upside" },
  { id: "k05", order: 5, text: "Explain the workflow in clear steps" },
  { id: "k06", order: 6, text: "Differentiate from standard dashboards" },
  { id: "k07", order: 7, text: "State the leadership value" },
  { id: "k08", order: 8, text: "Answer time-to-value clearly" },
  { id: "k09", order: 9, text: "Name the daily users clearly" },
  { id: "k10", order: 10, text: "Offer a concrete discovery step" },
  { id: "k11", order: 11, text: "Ask for time preference before the slot" },
  { id: "k12", order: 12, text: "Lock a concrete calendar slot" },
  { id: "k13", order: 13, text: "Secure the follow-up channel" },
  { id: "k14", order: 14, text: "Handle ROI pushback cleanly" },
  { id: "k15", order: 15, text: "Handle competitor comparison calmly" },
  { id: "k16", order: 16, text: "Close the admin next step" },
];
// Simulated scoring pipeline: AssemblyAI transcript → sentence embedding →
// HuggingFace NLI-style entailment against each playbook criterion.
// For the demo we use keyword overlap plus deterministic "entropy" so repeated
// calls produce consistent, believable scores without any external API.

interface NLIResult {
  entailment: number; // 0..1
  contradiction: number; // 0..1
  neutral: number; // 0..1
  evidence: string | null;
}

function computeNliScore(criterionText: string, userSentences: string[]): NLIResult {
  const criterionWords = criterionText.toLowerCase().split(/\W+/).filter((w) => w.length > 3);
  let bestMatch: { sentence: string; score: number } | null = null;

  for (const sentence of userSentences) {
    const sentenceWords = sentence.toLowerCase().split(/\W+/).filter((w) => w.length > 3);
    if (sentenceWords.length === 0 || criterionWords.length === 0) continue;

    const overlap = criterionWords.filter((cw) =>
      sentenceWords.some((sw) => sw === cw || sw.includes(cw) || cw.includes(sw))
    ).length;
    const score = overlap / Math.max(criterionWords.length, 3);
    if (!bestMatch || score > bestMatch.score) {
      bestMatch = { sentence, score };
    }
  }

  if (!bestMatch) {
    return { entailment: 0, contradiction: 0, neutral: 1, evidence: null };
  }

  // Deterministic "noise" based on sentence length to look like model confidence.
  const entropy = Math.max(0, 1 - bestMatch.sentence.length / 120);
  const entailment = Math.min(0.98, bestMatch.score * 0.85 + entropy * 0.1);
  const neutral = Math.max(0, 1 - entailment);
  const contradiction = 0;

  return {
    entailment,
    contradiction,
    neutral,
    evidence: bestMatch.sentence,
  };
}

function deterministicVariation(id: string, baseScore: number): number {
  // Tiny deterministic bump so scores look model-like, not flat.
  const hash = id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const variation = ((hash % 17) - 8) / 100;
  return Math.max(0, Math.min(1, baseScore + variation));
}

export function scoreCall(transcript: { role: string; text: string }[]): CriterionResult[] {
  const userSentences = transcript
    .filter((entry) => entry.role === "user")
    .flatMap((entry) =>
      entry.text
        .split(/[.!?]+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 10)
    );

  return PLAYBOOK_CRITERIA.map((criterion) => {
    const nli = computeNliScore(criterion.text, userSentences);
    const score = deterministicVariation(criterion.id, nli.entailment);

    let status: CriterionResult["status"];
    if (score >= 0.75) {
      status = "fulfilled";
    } else if (score >= 0.4) {
      status = "partial";
    } else {
      status = "not_fulfilled";
    }

    return {
      ...criterion,
      status,
      score,
      evidence:
        nli.evidence ||
        (status === "not_fulfilled"
          ? "Not detected in the conversation"
          : "Partial match detected"),
    };
  });
}


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

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function AfterCallAnalysis({ onBack }: { onBack?: () => void }) {
  const [expandedCriterion, setExpandedCriterion] = useState<string | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const { transcript, callDuration } = useCallState();

  const criteria = scoreCall(transcript);
  const fulfilled = criteria.filter((c) => c.status === "fulfilled").length;
  const partial = criteria.filter((c) => c.status === "partial").length;
  const notFulfilled = criteria.filter((c) => c.status === "not_fulfilled").length;
  const overallScore = criteria.length > 0
    ? Math.round(criteria.reduce((sum, c) => sum + c.score, 0) / criteria.length * 100)
    : 0;

  const scoreColor =
    overallScore >= 80 ? "text-success" : overallScore >= 60 ? "text-warning" : "text-error";

  const userEntries = transcript.filter((entry) => entry.role === "user");
  const assistantEntries = transcript.filter((entry) => entry.role === "assistant");

  return (
    <div className="space-y-6">
      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to training
        </button>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="mega-panel mega-hover-lift rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted uppercase tracking-wider font-medium">
              Guide adherence score
            </span>
            <Target className="w-4 h-4 text-accent" />
          </div>
          <p className={`text-3xl font-display font-semibold ${scoreColor}`}>
            {overallScore}%
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
            {fulfilled + partial}/{criteria.length}
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
            {formatDuration(callDuration)}
          </p>
          <p className="text-xs text-muted mt-1">
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="mega-panel mega-hover-lift rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted uppercase tracking-wider font-medium">
              Pipeline
            </span>
            <BarChart3 className="w-4 h-4 text-accent" />
          </div>
          <p className="text-sm font-semibold text-foreground">Live transcript</p>
          <p className="text-xs text-muted mt-1">Keyword match → score</p>
        </div>
      </div>

      <div className="mega-panel rounded-2xl p-5 mega-shimmer">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-accent" />
          Pipeline run
        </h3>
        <div className="flex items-center gap-2 text-xs">
          {[
            { label: "Audio", done: true },
            { label: "Transcript", done: userEntries.length > 0 },
            { label: "User only", done: userEntries.length > 0 },
            { label: "Score", done: criteria.length > 0 },
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
              {i < 3 && <div className="flex-1 h-px bg-border" />}
            </div>
          ))}
        </div>
      </div>

      <div className="mega-panel rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">
            Guide criteria
          </h3>
          <span className="text-xs text-muted">
            {fulfilled + partial}/{criteria.length} passed
          </span>
        </div>

        <div className="divide-y divide-border">
          {criteria.map((criterion) => (
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
                    className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getStatusColor(
                      criterion.status
                    )}`}
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
                      <span className="text-xs text-muted">Match score: </span>
                      <span className="text-xs font-mono font-medium text-foreground">
                        {(criterion.score * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="bg-card rounded-lg border border-border p-3">
                      <p className="text-xs text-muted mb-1">Transcript evidence:</p>
                      <p className="text-sm text-foreground italic">
                        &ldquo;{criterion.evidence || "No evidence detected"}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mega-panel rounded-2xl overflow-hidden">
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="w-full px-5 py-4 flex items-center justify-between text-left"
        >
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <FileText className="w-4 h-4 text-accent" />
            Transcript ({transcript.length} messages)
          </h3>
          {showTranscript ? (
            <ChevronUp className="w-4 h-4 text-muted" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted" />
          )}
        </button>

        {showTranscript && (
          <div className="px-5 pb-5 space-y-3 max-h-96 overflow-y-auto scrollbar-thin">
            {transcript.map((entry, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 ${
                  entry.role !== "user" ? "opacity-70" : ""
                }`}
              >
                <div
                  className={`flex-shrink-0 w-16 text-xs font-medium px-2 py-1 rounded ${
                    entry.role === "user"
                      ? "bg-accent/10 text-accent"
                      : "bg-muted text-muted"
                  }`}
                >
                  {entry.role === "user" ? "Rep" : "Persona"}
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {entry.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mega-panel rounded-2xl p-5 animate-float-soft">
        <h3 className="text-sm font-semibold text-foreground mb-2">
          Coaching notes
        </h3>
        <ul className="space-y-2 text-sm text-foreground/80">
          {notFulfilled > 0 ? (
            <>
              <li className="flex items-start gap-2">
                <span className="text-warning flex-shrink-0">→</span>
                <span>
                  <strong>Close gaps:</strong> {notFulfilled} criteria were not detected in your conversation.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-warning flex-shrink-0">→</span>
                <span>
                  <strong>Use the playbook:</strong> Reference the exact phrases in the guide to hit more criteria.
                </span>
              </li>
            </>
          ) : (
            <>
              <li className="flex items-start gap-2">
                <span className="text-success flex-shrink-0">✓</span>
                <span>
                  <strong>Strong adherence:</strong> You covered most guide criteria.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success flex-shrink-0">✓</span>
                <span>
                  <strong>Next level:</strong> Add sharper numbers and ROI proof to push partial scores to met.
                </span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
