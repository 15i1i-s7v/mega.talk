"use client";

import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

export interface TranscriptMessage {
  role: "user" | "assistant" | "system";
  text: string;
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
    start: async (setTranscript?: React.Dispatch<React.SetStateAction<TranscriptMessage[]>>) => {
      setError(null);

      const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
      if (!publicKey) {
        const msg = "VAPI public key not configured";
        setError(msg);
        throw new Error(msg);
      }

      // Pre-warm microphone to avoid Krisp/WASM init failures.
      let audioTrack: MediaStreamTrack | undefined;
      try {
        const warmupStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        [audioTrack] = warmupStream.getAudioTracks();
      } catch (micErr) {
        console.warn(
          "Microphone warm-up failed, falling back to default:",
          micErr,
        );
      }

      try {
        const vapi = audioTrack
          ? new Vapi(publicKey, undefined, undefined, {
              audioSource: audioTrack,
            })
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
        vapi.on("message", (message: any) => {
          if (message.type === "transcript") {
            console.log("💬", message.transcript);
            if (setTranscript) {
              setTranscript((prev) => [
                ...prev,
                {
                  role: message.role || "assistant",
                  text: message.transcript || "",
                },
              ]);
            }
          }
        });
        vapi.on("error", (err) => {
          console.error("VAPI Error:", err);
          const message = err?.message || "Vapi failed to start.";
          if (
            /permission denied|notallowederror|microphone/i.test(message)
          ) {
            setError(
              "Microphone permission is blocked. Allow microphone access in the browser and try again.",
            );
          } else if (
            /krisp|mic processor|audio processor|noise.?cancellation/i.test(
              message,
            )
          ) {
            setError(
              "Browser audio processor failed to initialize. Try Chrome/Edge or refresh the page.",
            );
          } else {
            setError(message);
          }
          setIsConnected(false);
        });

        // Inline assistant configuration — no backend API call needed.
        // The assistant can end the call itself via the endCall tool.
        const assistantConfig = {
          name: "Leonie Hartmann",
          voice: {
            provider: "11labs" as const,
            voiceId: "N2lSxRHaA58vqI0NIV3R",
            model: "eleven_turbo_v2_5",
            stability: 0.5,
            similarityBoost: 0.75,
          },
          model: {
            provider: "openai" as const,
            model: "gpt-4",
            temperature: 0.7,
            messages: [
              {
                role: "system" as const,
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

ENDING THE CALL (MANDATORY):
- When the conversation reaches a natural conclusion, you MUST say a short goodbye and use the endCall tool to hang up immediately.
- Do NOT wait for the caller to end the call.
- If the caller has nothing more to ask, says goodbye, or becomes repetitive, end the call within 5 seconds.
- If the caller is abusive or aggressive, end the call immediately.
- Use phrases like 'goodbye', 'have a good day', or 'hartmann out' right before using the endCall tool.

OPENING:
- Start with: "Hartmann speaking."

NEVER:
- Be instantly agreeable.
- Give long monologues.
- Make small talk.`,
              },
            ],
            // Give the assistant the ability to end the call itself
            tools: [
              {
                type: "endCall" as const,
              },
            ],
          },
          transcriber: {
            provider: "deepgram" as const,
            model: "nova-2",
            language: "en",
          },
          firstMessage: "Hartmann speaking.",
          maxDurationSeconds: 90,
          silenceTimeoutSeconds: 20,
          endCallMessage: "Goodbye.",
          endCallPhrases: [
            "goodbye",
            "have a good day",
            "thank you",
            "hartmann out",
            "talk soon",
            "i'll let you go",
          ],
          recordingEnabled: false,
          clientMessages: [
            "transcript",
            "hang",
            "function-call",
            "speech-update",
            "metadata",
            "conversation-update",
            "tool-calls",
          ],
        };

        await vapi.start(assistantConfig as any);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to start call";
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
