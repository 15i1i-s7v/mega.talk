"use client";

import { useState, useEffect } from "react";
import { useVapi } from "@/lib/vapi";
import { useCallState } from "@/lib/call-state-context";
import {
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Loader2,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export function CallControls({
  onShowAnalysis,
}: {
  onShowAnalysis?: () => void;
}) {
  const { setMuted, isConnected, error } = useVapi();
  const { callState, startCall, endCall, resetCall } = useCallState();
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (callState === "active") {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callState]);

  useEffect(() => {
    if (isConnected && callState === "connecting") {
      toast.success("Connected to Leonie Hartmann");
    }
  }, [isConnected, callState]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      resetCall();
    }
  }, [error, resetCall]);

  const handleStartCall = () => startCall();

  const handleEndCall = () => {
    endCall();
    setIsMuted(false);
    setIsProcessing(true);
      toast.info("Analyzing call...");

    // Simulate pipeline processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Analysis complete");
      if (onShowAnalysis) onShowAnalysis();
    }, 2500);
  };

  const handleTryAgain = () => resetCall();

  const toggleMute = () => {
    const newMuted = !isMuted;
    setMuted(newMuted);
    setIsMuted(newMuted);
    toast.info(newMuted ? "Microphone muted" : "Microphone live");
  };

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-xl border-t border-border shadow-[0_-12px_40px_rgba(0,0,0,0.38)] z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {callState === "idle" && (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleStartCall}
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl mega-button text-[#2a1c08] font-semibold text-sm transition-all shadow-sm mega-hover-lift"
            >
              <Sparkles className="w-4 h-4" />
              Start training
            </button>
          </div>
        )}

        {callState === "connecting" && (
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-accent/10 border border-accent/20 animate-glow-pulse">
              <Loader2 className="w-4 h-4 animate-spin text-accent" />
              <span className="text-sm font-medium text-foreground">
                Connecting to Leonie Hartmann...
              </span>
            </div>
          </div>
        )}

        {callState === "active" && (
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border">
              <span className="font-mono font-bold text-foreground tabular-nums text-sm">
                {formatDuration(callDuration)}
              </span>
            </div>

            <button
              onClick={toggleMute}
              className={`p-3 rounded-xl border transition-colors ${
                isMuted
                  ? "bg-error/10 border-error/30 text-error"
                  : "bg-background border-border text-muted hover:text-foreground"
              }`}
              title={isMuted ? "Unmute microphone" : "Mute microphone"}
            >
              {isMuted ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={handleEndCall}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-error text-white font-semibold text-sm hover:bg-[#B03030] transition-colors mega-hover-lift"
            >
              <PhoneOff className="w-4 h-4" />
              End call
            </button>
          </div>
        )}

        {(callState === "ended" || isProcessing) && (
          <div className="flex items-center justify-center gap-3">
            {isProcessing ? (
              <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-background border border-border mega-shimmer">
                <Loader2 className="w-4 h-4 animate-spin text-accent" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Analyzing conversation
                  </p>
                  <p className="text-xs text-muted">
                    AssemblyAI → HuggingFace NLI → Score
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border">
                  <span className="text-sm text-muted">Analysis ready</span>
                </div>
                {onShowAnalysis && (
                  <button
                    onClick={onShowAnalysis}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl mega-button text-[#2a1c08] font-semibold text-sm transition-colors shadow-sm mega-hover-lift"
                  >
                    <BarChart3 className="w-4 h-4" />
                    View analysis
                  </button>
                )}
                <button
                  onClick={handleTryAgain}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-background border border-border text-foreground font-semibold text-sm hover:bg-accent/5 transition-colors mega-hover-lift"
                >
                  <Phone className="w-4 h-4" />
                  Try again
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
