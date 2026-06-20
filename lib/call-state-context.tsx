"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useVapi } from "@/lib/vapi";

type CallState = "idle" | "connecting" | "active" | "ended";

interface CallStateContextType {
  callState: CallState;
  startCall: () => Promise<void>;
  endCall: () => void;
  resetCall: () => void;
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

  useEffect(() => {
    if (isConnected && callState === "connecting") {
      setCallState("active");
    }
  }, [isConnected, callState]);

  useEffect(() => {
    if (error) {
      setCallState("idle");
    }
  }, [error]);

  const startCall = async () => {
    setCallState("connecting");
    try {
      await start();
    } catch (err) {
      console.error("Failed to start call:", err);
      setCallState("idle");
    }
  };

  const endCall = () => {
    stop();
    setCallState("ended");
  };

  const resetCall = () => {
    setCallState("idle");
  };

  return (
    <CallStateContext.Provider
      value={{ callState, startCall, endCall, resetCall }}
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
