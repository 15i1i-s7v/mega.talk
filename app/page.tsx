"use client";

import { useState } from "react";
import { DemoInterface } from "@/components/demo-interface";

export default function Home() {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [showInterface, setShowInterface] = useState(false);

  const handleAccept = () => {
    setHasAccepted(true);
    setTimeout(() => setShowInterface(true), 300);
  };

  return (
    <>
      {!hasAccepted && <WelcomeScreen onAccept={handleAccept} />}
      {showInterface && (
        <div className="animate-fade-in">
          <DemoInterface />
        </div>
      )}
    </>
  );
}

function WelcomeScreen({ onAccept }: { onAccept: () => void }) {
  const [agreed, setAgreed] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <>
      <div className="fixed inset-0 z-50 bg-[#FAF8F5] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo area */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#D4603C] text-white mb-5 shadow-lg shadow-orange-200">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
              </svg>
            </div>
            <h1 className="text-4xl font-display font-semibold text-[#2D2D2D] tracking-tight">
              re:train
            </h1>
            <p className="mt-2 text-sm text-[#6B6B6B] font-body">
              KI-Coaching für dein Vertriebsteam
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl border border-[#E5E2DC] p-8 shadow-sm">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E5E2DC] mb-5 text-xs text-[#6B6B6B]">
              <span className="w-2 h-2 rounded-full bg-[#D4603C]" />
              Leitfaden-gestütztes Rollenspiel
            </div>

            <p className="text-sm text-[#6B6B6B] mb-6 leading-relaxed">
              Trainiere Kaltakquise-Gespräche mit <span className="font-semibold text-[#2D2D2D]">Thomas Maier</span>, 
              Inhaber eines mittelständischen Leiterplattenfertigers. Der Leitfaden zeigt dir Schritt für Schritt,
              wie du ihn überzeugst.
            </p>

            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="deine@email.de (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E5E2DC] bg-[#FAF8F5] text-sm text-[#2D2D2D] placeholder:text-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#D4603C]/30 focus:border-[#D4603C] transition-colors"
              />
              <p className="mt-1.5 text-xs text-[#6B6B6B]">
                Optional — erhalte eine KI-Analyse deines Gesprächs per E-Mail
              </p>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 mb-6 p-3 rounded-xl bg-[#FAF8F5] border border-[#E5E2DC] cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-[#D4D1CA] text-[#D4603C] focus:ring-[#D4603C]/30"
              />
              <span className="text-xs text-[#6B6B6B] leading-relaxed">
                Ich stimme den{" "}
                <a href="/terms" target="_blank" className="text-[#D4603C] underline underline-offset-2 hover:text-[#C14F2D]">
                  Nutzungsbedingungen
                </a>{" "}
                und der{" "}
                <a href="/privacy" target="_blank" className="text-[#D4603C] underline underline-offset-2 hover:text-[#C14F2D]">
                  Datenschutzerklärung
                </a>{" "}
                zu.
              </span>
            </label>

            {/* Start */}
            <button
              onClick={onAccept}
              disabled={!agreed}
              className="w-full py-3 rounded-xl bg-[#D4603C] text-white font-semibold text-sm hover:bg-[#C14F2D] disabled:bg-[#E5E2DC] disabled:text-[#6B6B6B] disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              Training starten
            </button>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-center gap-3 text-xs text-[#6B6B6B]">
              <span>Made in Berlin</span>
              <span className="text-[#E5E2DC]">·</span>
              <span>Hackathon 2026</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
