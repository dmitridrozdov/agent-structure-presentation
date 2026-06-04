"use client";
import { useEffect, useState } from "react";

export function MemoryVisual({ accent }: { accent: string }) {
  const [show, setShow] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setShow((s) => Math.min(s + 1, 5)), 600);
    return () => clearInterval(t);
  }, []);

  const insights = ["Audience: 35-45yo founders", "Pain: scaling ops", "Channel: LinkedIn > email"];
  const decisions = ["→ Remove price anchoring", "→ Lead with ROI story"];

  return (
    <div className="w-full h-full flex items-center justify-center gap-6 px-4">
      {/* Insights memory */}
      <div className="flex flex-col gap-2 w-44">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">🧠</span>
          <p className="text-xs font-bold text-purple-300">Analytical Memory</p>
        </div>
        <p className="text-[9px] text-slate-500 font-mono mb-1">insights from analysis</p>
        {insights.map((item, i) => (
          <div
            key={i}
            className="text-[10px] font-mono px-2 py-1.5 rounded border transition-all duration-500"
            style={{
              opacity: show > i ? 1 : 0,
              transform: show > i ? "translateX(0)" : "translateX(-8px)",
              background: "#2e1065",
              borderColor: "#7c3aed44",
              color: "#c4b5fd",
            }}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="w-px h-24 bg-slate-700" />

      {/* Decision log */}
      <div className="flex flex-col gap-2 w-44">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">📋</span>
          <p className="text-xs font-bold" style={{ color: accent }}>Decision Log</p>
        </div>
        <p className="text-[9px] text-slate-500 font-mono mb-1">human directives</p>
        {decisions.map((item, i) => (
          <div
            key={i}
            className="text-[10px] font-mono px-2 py-1.5 rounded border transition-all duration-500"
            style={{
              opacity: show > insights.length + i ? 1 : 0,
              transform: show > insights.length + i ? "translateX(0)" : "translateX(-8px)",
              background: accent + "11",
              borderColor: accent + "33",
              color: accent,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
