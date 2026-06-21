"use client";

import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

interface AssistantCredentials {
  assistantId: string;
  publicKey: string;
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
    start: async () => {
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

      // Pre-warm microphone to avoid Krisp/WASM init failures.
      let audioTrack: MediaStreamTrack | undefined;
      try {
        const warmupStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        [audioTrack] = warmupStream.getAudioTracks();
      } catch (micErr) {
        console.warn("Microphone warm-up failed, falling back to default:", micErr);
      }

      try {
        const vapi = audioTrack
          ? new Vapi(credentials.publicKey, undefined, undefined, { audioSource: audioTrack })
          : new Vapi(credentials.publicKey);
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
            console.log("💬", message.transcript);
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
