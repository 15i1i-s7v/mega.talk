import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const ASSISTANT_ID_CACHE_KEY = "vapi_assistant_id_v2";

function getEnv(key: string): string | undefined {
  return process.env[key];
}

function buildAssistantConfig() {
  return {
    name: "Leonie Hartmann",
    voice: {
      provider: "openai",
      voiceId: "alloy",
    },
    model: {
      provider: "openai",
      model: "gpt-4o-mini",
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
- If the rep is stuck, repeats themselves, or the conversation is not productive, say you have to go and end the call politely.

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
      provider: "deepgram",
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
}

async function ensureAssistant(vapiPrivateKey: string): Promise<string> {
  const cached = (globalThis as any)[ASSISTANT_ID_CACHE_KEY];
  if (typeof cached === "string" && cached.length > 0) {
    return cached;
  }

  const response = await fetch("https://api.vapi.ai/assistant", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${vapiPrivateKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buildAssistantConfig()),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Vapi assistant creation failed: ${response.status} ${text}`);
  }

  const data = await response.json();
  const id = data?.id;
  if (typeof id !== "string" || !id) {
    throw new Error("Vapi assistant creation returned no id");
  }

  (globalThis as any)[ASSISTANT_ID_CACHE_KEY] = id;
  return id;
}

export async function GET() {
  const privateKey = getEnv("VAPI_PRIVATE_KEY");
  const publicKey = getEnv("NEXT_PUBLIC_VAPI_PUBLIC_KEY");

  if (!privateKey || !publicKey) {
    return NextResponse.json(
      { error: "Vapi keys are not configured" },
      { status: 500 }
    );
  }

  try {
    const assistantId = await ensureAssistant(privateKey);
    return NextResponse.json({ assistantId, publicKey });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Failed to create Vapi assistant:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
