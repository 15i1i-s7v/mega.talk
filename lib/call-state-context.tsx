"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useVapi, TranscriptMessage } from "@/lib/vapi";

type CallState = "idle" | "connecting" | "active" | "ended";

interface CallStateContextType {
  callState: CallState;
  startCall: () => Promise<void>;
  endCall: () => void;
  resetCall: () => void;
  transcript: TranscriptMessage[];
  callDuration: number;
}

const CallStateContext = createContext<CallStateContextType | undefined>(
  undefined
);

export function CallStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { start, stop, isConnected, error } = useVapi();
  const [callState, setCallState] = useState<CallState>("idle");
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const [callDuration, setCallDuration] = useState(0);
  const durationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isConnected && callState === "connecting") {
      setCallState("active");
    }
  }, [isConnected, callState]);

  useEffect(() => {
    if (error) {
      setCallState("idle");
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = null;
      }
    }
  }, [error]);

  useEffect(() => {
    if (callState === "active") {
      durationIntervalRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else if (callState === "idle") {
      setCallDuration(0);
    }
    return () => {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = null;
      }
    };
  }, [callState]);

  const startCall = async () => {
    setCallState("connecting");
    setTranscript([]);
    setCallDuration(0);
    try {
      await start(setTranscript);
    } catch (err) {
      console.error("Failed to start call:", err);
      setCallState("idle");
    }
  };

  const endCall = () => {
    stop();
    setCallState("ended");
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }
  };

  const resetCall = () => {
    setCallState("idle");
    setTranscript([]);
    setCallDuration(0);
  };

  return (
    <CallStateContext.Provider
      value={{ callState, startCall, endCall, resetCall, transcript, callDuration }}
    >
      {children}
    </CallStateContext.Provider>
  );
}

export function useCallState() {
  const context = useContext(CallStateContext);
  if (context === undefined) {
    throw new Error("useCallState must be used within a CallStateProvider");
  }
  return context;
}
