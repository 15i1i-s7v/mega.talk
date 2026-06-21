"use client";

import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

export interface TranscriptMessage {
  role: "assistant" | "user";
  text: string;
  timestamp: number;
}

let globalVapiInstance: Vapi | null = null;
let globalVapiKey: string | null = null;
let isStarting = false;

function getOrCreateVapi(publicKey: string): Vapi {
  if (globalVapiInstance && globalVapiKey === publicKey) {
    return globalVapiInstance;
  }
  destroyVapi();
  // startAudioOff: true delays microphone initialization until we explicitly
  // unmute. This avoids the Krisp/WASM crash / ejection when Daily cold-starts
  // the audio processor.
  globalVapiInstance = new Vapi(publicKey, undefined, undefined, {
    startAudioOff: true,
  });
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
      if (isStarting) {
        throw new Error("Call is already starting");
      }
      isStarting = true;
      setError(null);

      const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
      if (!publicKey) {
        const msg = "NEXT_PUBLIC_VAPI_PUBLIC_KEY is not configured";
        setError(msg);
        isStarting = false;
        throw new Error(msg);
      }

      // Singleton: reuse or create one Vapi instance per public key.
      const vapi = getOrCreateVapi(publicKey);
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
        // After the call object exists, explicitly enable microphone input.
        setTimeout(() => {
          try {
            vapi.setMuted(false);
          } catch {
            // ignore
          }
        }, 300);
      };
      const onCallEnd = () => {
        setIsConnected(false);
        setIsSpeaking(false);
        isStarting = false;
      };
      const onSpeechStart = () => setIsSpeaking(true);
      const onSpeechEnd = () => setIsSpeaking(false);
      const onMessage = (message: any) => {
        if (message.type === "transcript") {
          const text = message.transcript || "";
          const role = message.role === "assistant" ? "assistant" : "user";
          pushTranscript(role, text);
        }
        if (
          message.type === "conversation-update" &&
          Array.isArray(message.conversation)
        ) {
          const normalized: TranscriptMessage[] = message.conversation
            .filter(
              (entry: any) =>
                typeof entry?.role === "string" &&
                typeof entry?.content === "string",
            )
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
        isStarting = false;
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

      // Inline assistant configuration — no backend API call needed.
      const assistantConfig = {
        name: "Leonie Hartmann",
        voice: {
          provider: "openai" as const,
          voiceId: "alloy",
        },
        model: {
          provider: "openai" as const,
          model: "gpt-4o-mini",
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
- If the rep is stuck, repeats themselves, or the conversation is not productive, say you have to go and end the call politely.

ENDING THE CALL:
- When the conversation reaches a natural conclusion, say a brief goodbye and use the endCall function to hang up.
- If the caller is stuck, repetitive, or the conversation is no longer productive, end the call politely.
- Do NOT continue a call that is going in circles.

OPENING:
- Start with: "Hartmann speaking."

NEVER:
- Be instantly agreeable.
- Give long monologues.
- Make small talk.
- Continue a call that is going in circles.`,
            },
          ],
        },
        transcriber: {
          provider: "deepgram" as const,
          model: "nova-2",
          language: "en",
        },
        firstMessage: "Hartmann speaking.",
        maxDurationSeconds: 120,
        recordingEnabled: false,
        clientMessages: [
          "transcript",
          "hang",
          "function-call",
          "speech-update",
          "metadata",
          "conversation-update",
        ],
        functions: [
          {
            name: "endCall",
            description:
              "End the call when the conversation is no longer productive or Leonie needs to leave. Only use after saying a brief, polite goodbye.",
            parameters: {
              type: "object",
              properties: {},
            },
          },
        ],
      };

      try {
        await vapi.start(assistantConfig as any);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to start call";
        setError(errorMessage);
        isStarting = false;
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
