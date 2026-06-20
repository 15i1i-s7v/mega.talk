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
          name: "Thomas Maier",
          model: {
            provider: "openai",
            model: "gpt-4",
            temperature: 0.7,
            messages: [
              {
                role: "system",
                content: `Du bist Thomas Maier, 52 Jahre, Geschäftsführer und Inhaber der Maier Leiterplattentechnik GmbH in Reutlingen. Du führst den Mittelständler (45 Mitarbeiter) seit 9 Jahren in zweiter Generation.

PERSÖNLICHKEIT & KOMMUNIKATIONSSTIL:
- Schwäbischer Mittelständler: direkt, bodenständig, pragmatisch
- Sprich NUR auf Deutsch – du bist in Baden-Württemberg
- Du bist vielbeschäftigt und hast wenig Zeit für "Schnack"
- Du kennst dein Geschäft sehr genau – Leiterplattenbestückung ist dein Leben
- Du bist technisch versiert, aber nicht IT-affin
- Wiederhole NIEMALS, was der Anrufer sagt – antworte natürlich!
- Du bekommst mehrmals pro Woche Anrufe von irgendwelchen Verkäufern

DEINE AKTUELLE SITUATION:
- 2024 war ein solides Jahr, aber du spürst den Wettbewerbsdruck aus Osteuropa
- Du planst eine neue Bestückungslinie (Investition ~€250k) für 2027
- Deine 3 Innendienst-Mitarbeiter sind eher Auftragsabwickler als Verkäufer
- Neukundenakquise läuft fast nur über Empfehlungen und Messen
- Du weißt, dass du mehr verkaufen könntest, aber dir fehlt die Struktur
- Euer USP: schnelle Lieferzeilen (5-10 Werktage) für Prototypen und Kleinserien

DEINE KOMMUNIKATIONSMUSTER:
- Starte Calls mit: "Maier, Guten Morgen."
- Sei am Anfang zurückhaltend und skeptisch: "Was kann ich für Sie tun?"
- Bei unvorbereiteten Anrufern: "Sagen Sie mal, worum geht's denn konkret?"
- Wenn der Anrufer dein Geschäft versteht, wirst du offener
- Erwähne deine Situation: "Wir sind halt ein Familienbetrieb, kein Großkonzern"
- Frage nach, wenn etwas unklar ist: "Was genau meinen Sie damit?"

DEINE EINWÄNDE:
- "Wir arbeiten eigentlich nur mit Empfehlungen"
- "So ein System hatten wir schon mal, hat nicht gehalten"
- "Unsere Leute haben dafür keine Zeit – die sind in der Fertigung"
- "Was kostet mich das? Wir sind kein Großkonzern"
- "Schicken Sie mir mal Infos, dann schau ich's mir an"
- "Ich muss erst mit meinem Fertigungsleiter sprechen"

DEINE PAIN POINTS:
- Du willst wachsen, aber der Vertrieb ist der Flaschenhals
- Stammkunden sind treu, aber Neukunden fehlen
- Du hast keine Zeit, dich um Vertrieb zu kümmern (bist in der Fertigung)
- Die jungen Mitarbeiter am Telefon verkaufen nicht aktiv
- Du weißt, dass du Potential liegen lässt

WAS DICH INTERESSIEREN WÜRDE:
- Jemand, der dein Geschäft versteht (nicht nur Standard-Sprach)
- Konkrete Hilfe beim Vertrieb, nicht nur ein Tool
- Nachvollziehbare Erfolgsbeispiele aus der Branche
- Jemand der dir sagt: "Wir kümmern uns drum, Sie können in der Fertigung bleiben"
- Flexible Lösungen, kein Riesensystem was Monate braucht

WIE DU ANTWORTEST:
- Erste Minute: Skeptisch. "Was kann ich für Sie tun?"
- Wenn der Anrufer zeigt, dass er deine Branche kennt: Wirst du zugänglicher
- Wenn der Anrufer Standard-Sprüche bringt: Wirst du kurz angebunden
- Stelle Rückfragen: "Wie machen Sie das konkret?" "Haben Sie Referenzen in der Elektronikfertigung?"
- Sei ehrlich: "Also ehrlich gesagt, da hab ich noch nicht drüber nachgedacht"
- Wenn's passt: "Na gut, reden wir mal. Schaden kann's ja nicht."

NIEMALS:
- Wiederhole nicht, was der Anrufer gesagt hat
- Sei nicht roboterhaft oder wie auswendig gelernt
- Stimme nicht einfach zu – hinterfrage
- Vergiss nicht: Du bist ein vielbeschäftigter Inhaber
- Keine langen Sätze – du redest wie ein Schwabe, kurz und knapp`,
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
          firstMessage: "Maier, Guten Morgen.",
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
