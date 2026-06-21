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

let globalVapiInstance: Vapi | null = null;
let globalVapiKey: string | null = null;

function getOrCreateVapi(publicKey: string): Vapi {
  if (globalVapiInstance && globalVapiKey === publicKey) {
    return globalVapiInstance;
  }
  destroyVapi();
  globalVapiInstance = new Vapi(publicKey);
  globalVapiKey = publicKey;
  return globalVapiInstance;
}

function destroyVapi() {
  try {
    globalVapiInstance?.stop?.();
  } catch {
    // ignore
  }
  globalVapiInstance = null;
  globalVapiKey = null;
}

export function useVapi() {
  const vapiRef = useRef<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      vapiRef.current?.stop?.();
      vapiRef.current = null;
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

      // Singleton: reuse or create one Vapi instance per public key.
      const vapi = getOrCreateVapi(credentials.publicKey);
      vapiRef.current = vapi;

      // Collect transcript messages during the call.
      const transcript: TranscriptMessage[] = [];
      const pushTranscript = (role: "assistant" | "user", text: string) => {
        transcript.push({ role, text, timestamp: Date.now() });
        onTranscript?.([...transcript]);
      };

      const onCallStart = () => {
        setIsConnected(true);
        setError(null);
      };
      const onCallEnd = () => {
        setIsConnected(false);
        setIsSpeaking(false);
      };
      const onSpeechStart = () => setIsSpeaking(true);
      const onSpeechEnd = () => setIsSpeaking(false);
      const onMessage = (message: any) => {
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
      };
      const onError = (err: any) => {
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
      };

      // Remove old listeners to avoid duplicates.
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);

      vapi.on("call-start", onCallStart);
      vapi.on("call-end", onCallEnd);
      vapi.on("speech-start", onSpeechStart);
      vapi.on("speech-end", onSpeechEnd);
      vapi.on("message", onMessage);
      vapi.on("error", onError);

      try {
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
      try {
        vapiRef.current?.stop?.();
      } catch {
        // ignore
      }
    },
    setMuted: (muted: boolean) => {
      try {
        vapiRef.current?.setMuted(muted);
      } catch {
        // ignore
      }
    },
    isConnected,
    isSpeaking,
    error,
  };
}

// Expose destroy for tests / hot reload cleanup.
if (typeof window !== "undefined") {
  (window as any).__destroyVapi = destroyVapi;
}
