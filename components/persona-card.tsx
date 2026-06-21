"use client";

import { PERSONA } from "@/lib/data";
import { useCallState } from "@/lib/call-state-context";
import { Phone, PhoneOff, Loader2 } from "lucide-react";

export function PersonaCard({
  onShowAnalysis,
}: {
  onShowAnalysis?: () => void;
}) {
  const { callState, startCall, endCall } = useCallState();

  const handleCallToggle = async () => {
    if (callState === "active" || callState === "connecting") {
      endCall();
    } else {
      await startCall();
    }
  };

  const isCallActive = callState === "active" || callState === "connecting";
  const isConnecting = callState === "connecting";

  return (
    <div className="mega-panel rounded-[24px] overflow-hidden sticky top-20 mega-shimmer">
      <div className="p-5">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-amber-300/10 flex items-center justify-center border-2 border-border animate-glow-pulse">
              <span className="text-2xl font-display font-semibold text-accent">
                TM
              </span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-success rounded-full border-2 border-card" />
          </div>
        </div>

        <h3 className="text-xl font-display font-semibold text-foreground text-center">
          {PERSONA.name}
        </h3>
        <p className="text-sm text-muted text-center">{PERSONA.role}</p>
        <p className="text-xs text-muted text-center">{PERSONA.company}</p>

        <div className="flex justify-center mt-3 gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-sm ${
                i < PERSONA.difficulty ? "text-warning" : "text-border-dark"
              }`}
            >
              ★
            </span>
          ))}
          <span className="text-xs text-muted ml-1">
            ({PERSONA.difficulty}/5)
          </span>
        </div>

        <div className="my-4 border-t border-border" />

        <div className="space-y-3 mb-4">
          <h4 className="text-xs font-semibold text-muted uppercase tracking-wider">
            Background
          </h4>
          <ul className="space-y-2">
            {PERSONA.background.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-foreground"
              >
                <span className="text-accent mt-1 flex-shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 mb-4">
          <h4 className="text-xs font-semibold text-muted uppercase tracking-wider">
            Team and operating model
          </h4>
          <ul className="space-y-2">
            {PERSONA.currentTeam.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-foreground"
              >
                <span className="text-accent mt-1 flex-shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2 mb-5">
          {PERSONA.languages.map((lang, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-sm text-muted"
            >
              <span>{lang.flag}</span>
              <span className="font-medium text-foreground">{lang.name}</span>
              <span>({lang.level})</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 pt-0">
        <button
          onClick={handleCallToggle}
          disabled={isConnecting}
          className={`w-full py-3 rounded-xl font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 mega-hover-lift ${
            isCallActive
              ? "bg-error text-white hover:bg-[#B03030]"
              : "mega-button text-[#2a1c08]"
          } disabled:opacity-60 disabled:cursor-not-allowed`}
        >
          {isConnecting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Connecting...
            </>
          ) : isCallActive ? (
            <>
              <PhoneOff className="w-4 h-4" />
              End call
            </>
          ) : (
            <>
              <Phone className="w-4 h-4" />
              Start call
            </>
          )}
        </button>

        <p className="mt-2 text-xs text-muted text-center">
          {PERSONA.difficultyReason}
        </p>
      </div>
    </div>
  );
}
