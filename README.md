# MEGA.TALK — Observability Layer für Outbound-Engines

**GDPR-native Call Intelligence. One-Sided Recording. AI-Powered Script Adherence.**

Built at Megathon 2026.

## The Product

MEGA.TALK is the intelligence layer for 100% legal voice tracking — finally built for Europe.

- **GDPR-Native:** Records only the sales rep's voice. No prospect audio is ever captured, stored, or processed. Legal in all 27 EU member states.
- **Script Adherence Scoring:** Every sentence mapped to the approved script via HuggingFace NLI. Deviations flagged instantly.
- **Pipeline:** SoftBCom SCC → AssemblyAI (transcription) → HuggingFace NLI (scoring) → Database.

## Demo

This demo simulates the **end-to-end pipeline** for a cold-calling training scenario:

1. **Dashboard** — Campaign overview, live pipeline status, recent scored calls
2. **Training** — Practice cold calls with a VAPI-powered AI persona (Thomas Maier, PCB manufacturer CEO)
3. **Analysis** — Post-call Script Adherence Score with 16 criterion-level NLI scores, evidence quotes, and coaching hints

The demo mirrors what the production pipeline delivers:

```
SoftBCom ──cron──▶ Ingestion ──▶ AssemblyAI ──▶ HuggingFace NLI ──▶ Score Dashboard
                         ▲                         ▲
                Real calls pipeline       Real NLI scoring engine
```

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Voice AI:** VAPI Web SDK
- **Styling:** Tailwind CSS + Custom Design System
- **Fonts:** Cormorant Garamond + IBM Plex Sans
- **Icons:** Lucide React

## Getting Started

```bash
npm install --legacy-peer-deps

# Required for live voice calls
cp .env.example .env.local
# Edit .env.local with your VAPI public key

npm run dev
```

## Structure

```
mega.talk/
├── app/
│   ├── page.tsx          ← Dashboard (campaigns, stats, pipeline)
│   ├── training/         ← Voice training interface + post-call analysis
│   ├── analysis/         ← Full analysis dashboard with mock data
│   ├── terms/            ← Terms & privacy
│   └── globals.css       ← Design system
├── components/
│   ├── after-call-analysis.tsx  ← Mock scoring with 16 criteria
│   ├── agent-sidebar.tsx       ← Persona selection
│   ├── persona-card.tsx        ← Current persona with call button
│   ├── playbook-viewer.tsx     ← Markdown playbook renderer
│   └── call-controls.tsx       ← Call lifecycle + pipeline animation
└── lib/
    ├── data.ts           ← Persona data + 16-step playbook
    ├── vapi.ts           ← VAPI integration
    └── call-state-context.tsx
```

## Pipeline Visualization

The demo shows:

1. **Live Pipeline Status** — Animated processing steps after each call
2. **Script Adherence Score** — Overall score + per-criterion breakdown
3. **NLI Evidence** — Every criterion shows the matching transcript quote + NLI confidence score
4. **Coaching Hints** — Automated suggestions based on missed criteria

## Contact

ScriptAuditor.ai · hello@MEGA.TALK

Built for Europe. Legal by design.