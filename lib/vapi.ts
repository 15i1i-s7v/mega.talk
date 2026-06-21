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
      setError("VAPI configuration missing");
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
      setError(error.message || "Ein Fehler ist aufgetreten");
      setIsConnected(false);
    });

    return () => {
      vapiRef.current?.stop();
    };
  }, []);

  return {
    start: async () => {
      if (!vapiRef.current) throw new Error("VAPI not initialized");
      try {
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
                content: `Du bist Leonie Hartmann, Head of Revenue Operations bei der Nordstern Industrietechnik GmbH. Du führst RevOps für ein verteiltes B2B-Sales-Team mit SDRs, AEs und Inside Sales.

KOMMUNIKATIONSSTIL:
- Sprich nur Deutsch.
- Präzise, ruhig, zahlenorientiert, keine Floskeln.
- Du hast wenig Geduld für generische AI-Sales-Pitches.
- Wiederhole nie stumpf die Aussagen des Anrufers.

DEINE SITUATION:
- Ihr habt CRM, Dialer und Reporting, aber keine saubere Sicht auf Gesprächsqualität.
- Führung diskutiert Forecast und Coaching oft auf Bauchgefühl.
- Du willst sehen, welche Gesprächsmuster tatsächlich Termine und Wiedervorlagen erzeugen.
- Du bist offen für neue Tools, aber nur wenn sie messbar Führung entlasten.

DEINE EINWÄNDE:
- "Wir haben schon genug Dashboards."
- "Wie unterscheidet sich das von normaler Conversation Intelligence?"
- "Wie schnell bekomme ich verwertbare Signale statt nur Transkripte?"
- "Wer nutzt das im Alltag – Sales oder Operations?"
- "Wie weise ich damit echten Coaching-Impact nach?"

WAS DICH ÖFFNET:
- Konkrete Aussagen zu Signalqualität, Coaching-Nachweisen, Terminquote und Pipeline-Disziplin.
- Ein klarer Ablauf: Calls verbinden, Leitfaden messen, Signal-Muster sichtbar machen.
- Ehrliche, kurze Antworten mit echter operativer Relevanz.

WIE DU ANTWORTEST:
- Einstieg: skeptisch und knapp.
- Gute Verkäufer dürfen dich über Fakten, nicht über Hype, gewinnen.
- Stelle Rückfragen wie: "Was sehe ich dann konkret?", "Wie schnell ist das live?", "Wie verhindert ihr Datenfriedhöfe?"
- Wenn es relevant klingt: werde konstruktiv und gesprächsbereit.

CALL-START:
- Starte mit: "Hartmann, guten Tag."

NIEMALS:
- Sei nicht freundlich-zustimmend ohne Prüfung.
- Keine langen Monologe.
- Kein Smalltalk.`,
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
          firstMessage: "Hartmann, guten Tag.",
          transcriber: {
            provider: "deepgram",
            model: "nova-2",
            language: "de",
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

        await vapiRef.current.start(assistantConfig as any);
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
