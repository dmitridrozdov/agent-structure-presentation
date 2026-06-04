"use client";
import { useEffect, useState } from "react";

export function QualityVisual({ accent }: { accent: string }) {
  const [phase, setPhase] = useState(0);
  // 0: writing, 1: self-check, 2: reviewer, 3: approved

  useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % 4), 1000);
    return () => clearInterval(t);
  }, []);

  const layers = [
    { label: "Agent", sub: "writes output", icon: "✍️", active: phase === 0 },
    { label: "Self-check", sub: "verifies facts", icon: "🔍", active: phase === 1 },
    { label: "Reviewer", sub: "fresh eyes", icon: "👁️", active: phase === 2 },
    { label: "Approved", sub: "clean output", icon: "✅", active: phase === 3 },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      {layers.map((l, i) => (
        <div key={i} className="flex items-center gap-4 w-64">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center border text-xl transition-all duration-500"
            style={{
              background: l.active ? accent + "22" : "#0f172a",
              borderColor: l.active ? accent : "#1e293b",
              boxShadow: l.active ? `0 0 16px ${accent}55` : "none",
              transform: l.active ? "scale(1.12)" : "scale(1)",
            }}
          >
            {l.icon}
          </div>
          <div>
            <p className="text-sm font-bold transition-colors duration-300" style={{ color: l.active ? accent : "#64748b" }}>
              {l.label}
            </p>
            <p className="text-xs text-slate-500 font-mono">{l.sub}</p>
          </div>
          {i < layers.length - 1 && (
            <div className="ml-auto text-slate-600 text-xs">↓</div>
          )}
        </div>
      ))}
    </div>
  );
}
