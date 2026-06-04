"use client";
import { useEffect, useState } from "react";

export function HumanVisual({ accent }: { accent: string }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % 4), 900);
    return () => clearInterval(t);
  }, []);

  const steps = [
    { label: "Agent pipeline", icon: "🤖", auto: true },
    { label: "⚑ Human checkpoint", icon: "👤", auto: false },
    { label: "Agent pipeline", icon: "🤖", auto: true },
    { label: "⚑ Human checkpoint", icon: "👤", auto: false },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      {steps.map((s, i) => (
        <div
          key={i}
          className="flex items-center gap-3 px-4 py-2 rounded-xl border w-60 transition-all duration-500"
          style={{
            background: i === phase ? (s.auto ? "#0f172a" : accent + "11") : "#080f1a",
            borderColor: i === phase ? (s.auto ? "#334155" : accent) : "#0f172a",
            boxShadow: i === phase && !s.auto ? `0 0 20px ${accent}33` : "none",
            transform: i === phase ? "scale(1.04)" : "scale(1)",
          }}
        >
          <span className="text-xl">{s.icon}</span>
          <div>
            <p
              className="text-xs font-bold transition-colors duration-300"
              style={{ color: i === phase ? (s.auto ? "#94a3b8" : accent) : "#334155" }}
            >
              {s.label}
            </p>
            <p className="text-[9px] font-mono text-slate-600">
              {s.auto ? "fully automated" : "review & confirm"}
            </p>
          </div>
          {!s.auto && i === phase && (
            <span className="ml-auto text-xs animate-pulse" style={{ color: accent }}>●</span>
          )}
        </div>
      ))}
    </div>
  );
}

export function OutroVisual({ accent }: { accent: string }) {
  const rules = ["Roles", "Truth", "Chains", "QA", "Originals", "Memory", "Map", "Humans"];
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRevealed((r) => Math.min(r + 1, 8)), 300);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-4 gap-2">
        {rules.map((r, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl border transition-all duration-500"
            style={{
              opacity: revealed > i ? 1 : 0,
              transform: revealed > i ? "scale(1)" : "scale(0.8)",
              background: accent + "11",
              borderColor: accent + "33",
            }}
          >
            <span className="text-lg font-bold font-mono" style={{ color: accent }}>{i + 1}</span>
            <span className="text-[9px] font-mono text-slate-400">{r}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
