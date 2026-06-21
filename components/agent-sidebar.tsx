"use client";

import { PERSONA } from "@/lib/data";
import { Lock } from "lucide-react";

const PLACEHOLDER_PERSONAS = [
  {
    name: "Mira Seidel",
    role: "VP Inside Sales",
    company: "Aurelia Commerce Group",
    location: "Köln, Deutschland",
    category: "RevOps",
    callType: "Discovery",
    difficulty: 4,
    languages: [
      { flag: "🇩🇪", name: "Deutsch", level: "Muttersprache" },
      { flag: "🇬🇧", name: "Englisch", level: "Fließend" },
    ],
    locked: true,
  },
  {
    name: "Jonas Eckert",
    role: "Sales Director DACH",
    company: "Helion Systems",
    location: "Stuttgart, Deutschland",
    category: "Pipeline QA",
    callType: "Erstkontakt",
    difficulty: 3,
    languages: [{ flag: "🇩🇪", name: "Deutsch", level: "Muttersprache" }],
    locked: true,
  },
  {
    name: "Sara Blum",
    role: "Head of Revenue Excellence",
    company: "Helvetic Cloud Works",
    location: "Zürich, Schweiz",
    category: "Coaching",
    callType: "Erstkontakt",
    difficulty: 5,
    languages: [
      { flag: "🇩🇪", name: "Deutsch", level: "Muttersprache" },
      { flag: "🇬🇧", name: "Englisch", level: "Fließend" },
    ],
    locked: true,
  },
];

export function AgentSidebar() {
  return (
    <div className="space-y-3">
      <div className="mb-4">
        <h3 className="font-display text-base font-semibold text-foreground">
          Personas
        </h3>
        <p className="text-xs text-muted mt-0.5">
          Wähle eine Kampagne zum Üben
        </p>
      </div>

      {/* Active Persona */}
      <div className="mega-panel mega-hover-lift rounded-2xl border-2 border-accent/40 p-4 cursor-default animate-float-soft">
        <div className="flex items-center gap-2 mb-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success"></span>
          </span>
          <span className="text-xs font-medium text-success">Aktiv</span>
        </div>
        <p className="font-semibold text-foreground text-sm">{PERSONA.name}</p>
        <p className="text-xs text-muted">{PERSONA.role}</p>
        <p className="text-xs text-muted mt-0.5">{PERSONA.company}</p>
        <div className="flex gap-1.5 mt-2">
          <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full border border-accent/20 uppercase tracking-[0.14em] font-semibold">
            {PERSONA.category}
          </span>
          <span className="text-xs bg-white/5 text-muted px-2 py-0.5 rounded-full border border-border uppercase tracking-[0.14em] font-semibold">
            {PERSONA.callType}
          </span>
        </div>
      </div>

      {/* Locked Personas */}
      {PLACEHOLDER_PERSONAS.map((persona, idx) => (
        <div
          key={persona.name}
          className="mega-panel mega-hover-lift rounded-2xl p-4 opacity-60 relative overflow-hidden"
        >
          <div className="absolute top-2 right-2">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow">
              <Lock className="w-3 h-3" />
              <span className="text-[10px] font-bold">PRO</span>
            </div>
          </div>
          <p className="font-semibold text-foreground text-sm pr-16">
            {persona.name}
          </p>
          <p className="text-xs text-muted">{persona.role}</p>
          <p className="text-xs text-muted mt-0.5">{persona.company}</p>
          <div className="flex items-center gap-1 text-xs text-muted mt-2">
            {persona.languages.map((l) => l.flag).join(" ")}
            <span className="ml-1">
              {"★".repeat(persona.difficulty)}
              {"☆".repeat(5 - persona.difficulty)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
