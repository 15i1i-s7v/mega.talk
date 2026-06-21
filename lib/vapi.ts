"use client";

import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

export function useVapi() {
  const vapiRef = useRef<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
    if (!publicKey) {
      console.error("VAPI_PUBLIC_KEY not found");
      setError("Vapi configuration is missing.");
      return;
    }

    vapiRef.current = new Vapi(publicKey);

    vapiRef.current.on("call-start", () => {
      setIsConnected(true);
      setError(null);
    });

    vapiRef.current.on("call-end", () => {
      setIsConnected(false);
      setIsSpeaking(false);
    });

    vapiRef.current.on("speech-start", () => {
      setIsSpeaking(true);
    });

    vapiRef.current.on("speech-end", () => {
      setIsSpeaking(false);
    });

    vapiRef.current.on("message", (message) => {
      if (message.type === "transcript") {
        console.log("💬", message.transcript);
      }
    });

    vapiRef.current.on("error", (error) => {
      console.error("VAPI Error:", error);
      const message = error?.message || "Vapi failed to start.";
      if (/permission denied|notallowederror|microphone/i.test(message)) {
        setError("Microphone permission is blocked. Allow microphone access in the browser and try again.");
      } else if (/krisp|mic processor|audio processor|noise.?cancellation/i.test(message)) {
        setError("Browser audio processor failed to initialize. Try Chrome/Edge or refresh the page.");
      } else {
        setError(message);
      }
      setIsConnected(false);
    });

    return () => {
      vapiRef.current?.stop();
    };
  }, []);

  return {
    start: async () => {
      const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
      if (!publicKey) {
        const msg = "Vapi configuration is missing.";
        setError(msg);
        throw new Error(msg);
      }

      setError(null);

      const assistantConfig = {
        name: "Leonie Hartmann",
        model: {
          provider: "openai",
          model: "gpt-4",
          temperature: 0.7,
          messages: [
            {
              role: "system",
              content: `You are Leonie Hartmann, Head of Revenue Operations at Nordstern Industrietechnik. You run RevOps for a distributed B2B sales team with SDRs, AEs, and inside sales.

COMMUNICATION STYLE:
- Speak only in English.
- Be precise, calm, data-driven, and direct.
- You have no patience for generic AI-sales hype.
- Never parrot the caller's wording back to them.

CURRENT REALITY:
- Your team has CRM, dialer, and reporting, but no clean view of conversation quality.
- Leadership still debates forecast and coaching on gut feel.
- You want to know which conversation patterns actually produce meetings and callbacks.
- You are open to new tools only if they clearly reduce leadership overhead.

OBJECTIONS:
- "We already have enough dashboards."
- "How is this different from normal conversation intelligence?"
- "How quickly do I get usable signals instead of just transcripts?"
- "Who actually uses this every day: sales or operations?"
- "How do I prove real coaching impact with it?"

WHAT GETS YOUR ATTENTION:
- Specific claims about signal quality, coaching proof, meeting conversion, and pipeline discipline.
- A clear workflow: connect calls, measure the guide, surface winning talk patterns.
- Honest, short answers with operational relevance.

HOW YOU RESPOND:
- Start skeptical and concise.
- Strong sellers win you with specifics, not hype.
- Ask follow-ups like: "What would I actually see?", "How fast can this go live?", "How do you avoid another data graveyard?"
- If it sounds relevant, become constructive and engaged.

OPENING:
- Start with: "Hartmann speaking."

NEVER:
- Be instantly agreeable.
- Give long monologues.
- Make small talk.`,
            },
          ],
        },
        voice: {
          model: "eleven_turbo_v2_5",
          voiceId: "N2lSxRHaA58vqI0NIV3R",
          provider: "11labs",
          stability: 0.5,
          similarityBoost: 0.75,
        },
        firstMessage: "Hartmann speaking.",
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en",
        },
        maxDurationSeconds: 275,
        recordingEnabled: false,
        clientMessages: [
          "transcript",
          "hang",
          "function-call",
          "speech-update",
          "metadata",
          "conversation-update",
        ],
      };

      // Pre-warm microphone to avoid Krisp/WASM init failures in Firefox/Chrome
      let audioTrack: MediaStreamTrack | undefined;
      try {
        const warmupStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        [audioTrack] = warmupStream.getAudioTracks();
        // Stop the original track's stream context; we only need the track handle
        // for Vapi to use as the audioSource. The browser keeps the mic permission warm.
        if (audioTrack && typeof audioTrack.stop === "function") {
          try { audioTrack.stop(); } catch { /* ignore */ }
        }
      } catch (micErr) {
        console.warn("Microphone warm-up failed, falling back to default:", micErr);
      }

      try {
        // Recreate Vapi with the pre-warmed audio source so Daily does not
        // re-initialize the Krisp noise-cancellation processor from a cold state.
        const vapi = audioTrack
          ? new Vapi(publicKey, undefined, undefined, { audioSource: audioTrack })
          : new Vapi(publicKey);
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

        await vapi.start(assistantConfig as any);
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
