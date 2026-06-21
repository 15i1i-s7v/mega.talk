export const PERSONA = {
  name: "Leonie Hartmann",
  role: "Head of Revenue Operations",
  company: "Nordstern Industrietechnik GmbH",
  industry: "Technical distribution / B2B sales",
  companySize: "68 employees across 3 DACH sales locations",
  location: "Kassel, Germany",
  category: "Outbound Enablement",
  callType: "First touch",

  background: [
    "Owns forecast hygiene, SDR management, and pipeline reviews",
    "Leads inbound, outbound, and sales-ops workflows across three regions",
    "Works with CRM, dialer, and BI, but still lacks one clean conversation view",
    "Skeptical of tools that feel like just another dashboard",
  ],

  currentTeam: [
    "9 SDRs and 4 AEs with inconsistent conversation quality",
    "Coaching happens too late, often only after deals are already lost",
    "Reporting is limited to CRM fields rather than conversation signals",
    "Leadership wants proof of which talk tracks actually create meetings",
  ],

  recentActivity: [
    "Q3 initiative: lift SQL conversion in the mid-market segment",
    "Actively comparing AI assistants with classic QA call reviews",
    "Needs hard coaching proof for the next leadership review",
  ],

  languages: [
    { flag: "🇩🇪", name: "German", level: "Native" },
    { flag: "🇬🇧", name: "English", level: "Business fluent" },
  ],

  difficulty: 5,
  difficultyReason:
    "Data-heavy ops leader who rejects weak ROI claims and demands clear signal and coaching proof",

  firstMessage: "Hartmann speaking.",
};

export const PLAYBOOK = `# Guide: Outbound Enablement for Revenue Teams

Audience: revenue operations leaders, inside-sales managers, and commercial leaders across distributed B2B teams.
Goal: book a discovery meeting around a measurable coaching and pipeline review with MEGA.TALK.

---

## 1. Open with context and identity

**Step:** Start calmly and identify yourself with your full name.

> "Good morning, this is [First Name Last Name] from [Company]."

**Why:** The first sentence should feel precise and credible. No performance, no pitch too early.

---

## 2. Ask for orientation first

**Step:** Ask for help first. It creates cooperation and keeps the tone respectful.

> "Could you help me for a second?"

---

## 3. Ask for ownership, not job title

**Step:** Ask for the person who owns the problem, not just a function label.

> "Who owns conversation quality, meeting conversion, and pipeline discipline in outbound?"

---

## 4. Secure the direct line

**Step:** Ask for the direct extension or handoff path.

> "Great — what is the best direct line or extension for them?"

---

## 5. Ask to be connected

**Step:** Clearly ask to be connected.

> "Would you connect me, please?"

---

## 6. Explain the reason only if pushed

**Step:** If asked, explain the topic briefly and hand control back with a question.

> "Sure. We help teams see which conversations actually create meetings, callbacks, and pipeline momentum — with coaching proof leadership can use. Who owns that on your side?"

---

## 7. Confirm the reach positively

**Step:** Confirm that you reached the right person and re-state your name and company.

> "Glad I caught you. This is [First Name Last Name] from [Company]."

---

## 8. Verify ownership cleanly

**Step:** Check that you are speaking with the actual owner of the problem.

> "Am I right that you look after conversation quality, coaching proof, and the question of which talk tracks really create pipeline?"

---

## 9. Go straight to the operating pain

**Step:** Name the operational bottleneck, not the product first.

> "Most revenue teams can see activity, but they still cannot see which conversations turn into valid next steps. That is where MEGA.TALK fits."

---

## 10. Name the measurable lever

**Step:** Give the measurable upside: faster coaching, cleaner meetings, more reliable pipeline insight.

> "Leadership can see within days which talk patterns drive meetings, where objections stall, and which reps are creating repeatable signals."

---

## 11. Explain the workflow in three moves

**Step:** Explain exactly how the workflow operates.

> "We connect calls, map your guide into observable behaviors, and then show which signals actually lead to meetings by rep, motion, and outcome."

> "That gives sales leadership visible coaching gaps, conversion jumps, and review material they can actually use."

---

## 12. State the leadership value

**Step:** State the specific business value for leadership.

> "That means less blind coaching, cleaner forecast conversations, and clearer proof of which conversation quality actually prepares revenue."

---

## 13. Offer the next step on equal footing

**Step:** Offer a concrete next step without sounding performative.

> "Instead of keeping this theoretical, I would rather show you a 20-minute anonymized review flow with real coaching gaps and signal distribution."

---

## 14. Ask for time preference

**Step:** Ask for a broad time preference before naming a slot.

> "Is earlier in the week better for you, or later in the week?"

---

## 15. Suggest a concrete slot

**Step:** Once a time band is given, propose a specific slot.

> "Great — how does Wednesday at 10 work?"

---

## 16. Confirm the follow-up address

**Step:** Ask for the email address to send the invite and recap.

> "Perfect. What email should I use for the invite and the sample dashboard?"
`;

export const PLACEHOLDER_PERSONAS = [
  {
    name: "Mira Seidel",
    role: "VP Inside Sales",
    company: "Aurelia Commerce Group",
    location: "Cologne, Germany",
    category: "RevOps",
    callType: "Discovery",
    difficulty: 4,
    languages: [
      { flag: "🇩🇪", name: "German", level: "Native" },
      { flag: "🇬🇧", name: "English", level: "Fluent" },
    ],
    locked: true,
  },
  {
    name: "Jonas Eckert",
    role: "Sales Director DACH",
    company: "Helion Systems",
    location: "Stuttgart, Germany",
    category: "Pipeline QA",
    callType: "First touch",
    difficulty: 3,
    languages: [{ flag: "🇩🇪", name: "German", level: "Native" }],
    locked: true,
  },
  {
    name: "Sara Blum",
    role: "Head of Revenue Excellence",
    company: "Helvetic Cloud Works",
    location: "Zurich, Switzerland",
    category: "Coaching",
    callType: "First touch",
    difficulty: 5,
    languages: [
      { flag: "🇩🇪", name: "German", level: "Native" },
      { flag: "🇬🇧", name: "English", level: "Fluent" },
    ],
    locked: true,
  },
  {
    name: "Priya Malhotra",
    role: "Commercial Operations Lead",
    company: "Northline Systems",
    location: "Berlin, Germany",
    category: "Signal Audit",
    callType: "Review",
    difficulty: 3,
    languages: [{ flag: "🇬🇧", name: "English", level: "Native" }],
    locked: true,
  },
  {
    name: "Noah Fischer",
    role: "Chief Revenue Officer",
    company: "Vector Ridge",
    location: "Munich, Germany",
    category: "Forecast Review",
    callType: "Executive follow-up",
    difficulty: 4,
    languages: [{ flag: "🇬🇧", name: "English", level: "Fluent" }],
    locked: true,
  },
];

export const SIGNAL_OVERVIEW = {
  trackedCalls: 8484,
  activeMotions: 2,
  avgCallSeconds: 78,
  callbackIntentRate: 58,
  positiveRate: 3,
  negativeRate: 18,
};

export const OUTCOME_MIX = [
  { label: "Callback intent", value: 4880, share: 58, tone: "text-accent", bar: "bg-accent" },
  { label: "Negative", value: 1529, share: 18, tone: "text-error", bar: "bg-error" },
  { label: "Unknown / no tag", value: 1483, share: 17, tone: "text-warning", bar: "bg-warning" },
  { label: "Positive", value: 244, share: 3, tone: "text-success", bar: "bg-success" },
  { label: "No answer", value: 202, share: 2, tone: "text-muted", bar: "bg-white/30" },
  { label: "Mailbox / busy", value: 130, share: 2, tone: "text-muted", bar: "bg-white/20" },
];

export const VOLUME_TREND = [
  { date: "21 Apr", count: 70 },
  { date: "28 Apr", count: 136 },
  { date: "29 Apr", count: 28 },
  { date: "30 Apr", count: 21 },
  { date: "05 May", count: 218 },
  { date: "06 May", count: 100 },
  { date: "12 May", count: 146 },
  { date: "13 May", count: 13 },
];

export const SIGNAL_FEED = [
  { lane: "Timing", note: "Morning call blocks produce the strongest callback momentum in the current sample.", metric: "08:00–12:00" },
  { lane: "Coaching", note: "Unknown-tag and negative calls should be coached before anything else because they hide signal and drain review quality.", metric: "17% + 18%" },
  { lane: "Scale", note: "Long-form positive discovery patterns should be rolled into every rep workflow as the team playbook baseline.", metric: "448s avg" },
];
