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

const KEYWORD_RULES: { criterionId: string; patterns: string[]; weight: number }[] = [
  { criterionId: "k01", patterns: ["this is", "from mega.talk", "from megathon", "mega talk"], weight: 1.0 },
  { criterionId: "k02", patterns: ["you own", "conversation quality", "pipeline discipline", "revenue operations", "revops"], weight: 1.0 },
  { criterionId: "k03", patterns: ["conversations create meetings", "pipeline momentum", "signal", "quality", "coaching proof"], weight: 0.9 },
  { criterionId: "k04", patterns: ["conversion", "callback", "time-to-value", "week", "measurable", "lift", "percent", "%"], weight: 0.8 },
  { criterionId: "k05", patterns: ["connect calls", "review grid", "three steps", "workflow", "first", "then", "finally"], weight: 0.9 },
  { criterionId: "k06", patterns: ["not just dashboards", "different from", "signal quality", "not another", "compared to"], weight: 0.8 },
  { criterionId: "k07", patterns: ["leadership", "gut feel", "proof", "decision", "ops", "management"], weight: 0.9 },
  { criterionId: "k08", patterns: ["first week", "within days", "quickly", "fast", "first usable"], weight: 0.8 },
  { criterionId: "k09", patterns: ["sales lead", "operations", "management", "ops keeps", "coaches"], weight: 0.8 },
  { criterionId: "k10", patterns: ["20-minute", "review flow", "discovery", "show you", "walk through", "demo"], weight: 0.9 },
  { criterionId: "k11", patterns: ["time preference", "early next week", "later in the week", "works better"], weight: 0.9 },
  { criterionId: "k12", patterns: ["wednesday", "lock", "slot", "calendar", "10 am", "10:00", "next tuesday", "next thursday"], weight: 0.9 },
  { criterionId: "k13", patterns: ["send", "email", "agenda", "dashboard", "follow-up", "right after"], weight: 0.9 },
  { criterionId: "k14", patterns: ["roi", "impact", "coaching impact", "measurable impact", "numbers"], weight: 0.8 },
  { criterionId: "k15", patterns: ["qa tools", "conversation intelligence", "different", "focused on"], weight: 0.8 },
  { criterionId: "k16", patterns: ["note your email", "invite", "calendar invite", "sample dashboard"], weight: 0.9 },
];

export function scoreCall(transcript: { role: string; text: string }[]): CriterionResult[] {
  const userText = transcript
    .filter((entry) => entry.role === "user")
    .map((entry) => entry.text)
    .join(" ")
    .toLowerCase();

  const sentences = transcript
    .filter((entry) => entry.role === "user")
    .flatMap((entry) => entry.text.split(/[.!?]+/).map((s) => s.trim().toLowerCase()).filter(Boolean));

  return PLAYBOOK_CRITERIA.map((criterion) => {
    const rules = KEYWORD_RULES.filter((rule) => rule.criterionId === criterion.id);
    let bestScore = 0;
    let bestEvidence: string | null = null;

    for (const rule of rules) {
      for (const pattern of rule.patterns) {
        if (userText.includes(pattern.toLowerCase())) {
          const score = rule.weight;
          if (score > bestScore) {
            bestScore = score;
            // Find a short sentence containing the matched pattern for evidence.
            bestEvidence =
              sentences.find((sentence) => sentence.includes(pattern.toLowerCase())) ||
              `Mentioned: "${pattern}"`;
          }
        }
      }
    }

    let status: CriterionResult["status"];
    if (bestScore >= 0.8) {
      status = "fulfilled";
    } else if (bestScore >= 0.4) {
      status = "partial";
    } else {
      status = "not_fulfilled";
      bestEvidence = "Not detected in the conversation";
    }

    return {
      ...criterion,
      status,
      score: bestScore,
      evidence: bestEvidence,
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
