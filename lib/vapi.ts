"use client";

import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

export interface TranscriptMessage {
  role: "assistant" | "user";
  text: string;
  timestamp: number;
}

interface AssistantCredentials {
  assistantId: string;
  publicKey: string;
}

export interface ConversationSummary {
  transcript: TranscriptMessage[];
  durationSeconds: number;
  callId?: string;
}

export function useVapi() {
  const vapiRef = useRef<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      vapiRef.current?.stop();
    };
  }, []);

  return {
    start: async (onTranscript?: (messages: TranscriptMessage[]) => void) => {
      setError(null);

      let credentials: AssistantCredentials;
      try {
        const res = await fetch("/api/vapi-assistant");
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Failed to load assistant credentials");
        }
        credentials = await res.json();
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load assistant";
        setError(message);
        throw err;
      }

      // Collect transcript messages during the call.
      const transcript: TranscriptMessage[] = [];
      const pushTranscript = (role: "assistant" | "user", text: string) => {
        transcript.push({ role, text, timestamp: Date.now() });
        onTranscript?.([...transcript]);
      };

      try {
        const vapi = new Vapi(credentials.publicKey);
        vapiRef.current = vapi;

        vapi.on("call-start", () => {
          setIsConnected(true);
          setError(null);
        });
        vapi.on("call-end", () => {
          setIsConnected(false);
          setIsSpeaking(false);
        });
        vapi.on("speech-start", () => setIsSpeaking(true));
        vapi.on("speech-end", () => setIsSpeaking(false));
        vapi.on("message", (message) => {
          if (message.type === "transcript") {
            const text = message.transcript || "";
            const role = message.role === "assistant" ? "assistant" : "user";
            pushTranscript(role, text);
          }
          if (message.type === "conversation-update" && Array.isArray(message.conversation)) {
            const normalized: TranscriptMessage[] = message.conversation
              .filter((entry: any) => typeof entry?.role === "string" && typeof entry?.content === "string")
              .map((entry: any) => ({
                role: entry.role === "assistant" ? "assistant" : "user",
                text: entry.content,
                timestamp: Date.now(),
              }));
            transcript.length = 0;
            transcript.push(...normalized);
            onTranscript?.([...transcript]);
          }
        });
        vapi.on("error", (err) => {
          console.error("VAPI Error:", err);
          const message = err?.message || "Vapi failed to start.";
          if (/permission denied|notallowederror|microphone/i.test(message)) {
            setError("Microphone permission is blocked. Allow microphone access in the browser and try again.");
          } else if (/krisp|mic processor|audio processor|noise.?cancellation/i.test(message)) {
            setError("Browser audio processor failed to initialize. Try Chrome/Edge or refresh the page.");
          } else {
            setError(message);
          }
          setIsConnected(false);
        });

        await vapi.start(credentials.assistantId);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to start call";
        setError(errorMessage);
        throw err;
      }

      return {
        getTranscript: () => [...transcript],
      };
    },
    stop: () => {
      vapiRef.current?.stop();
    },
    setMuted: (muted: boolean) => {
      vapiRef.current?.setMuted(muted);
    },
    isConnected,
    isSpeaking,
    error,
  };
}
