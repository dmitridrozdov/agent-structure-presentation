"use client";
import { useEffect, useState } from "react";

const agentLabels = ["Collect", "Parse", "Enrich", "Validate", "Format", "Review"];

export function SplitBrainVisual({ accent }: { accent: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % agentLabels.length), 700);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center gap-10 px-4">
      {/* Bad: one big agent */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs font-mono text-red-400 tracking-widest uppercase">❌ One agent</p>
        <div
          className="w-28 h-28 rounded-full border-2 border-red-500/40 flex items-center justify-center relative"
          style={{ background: "radial-gradient(circle, #450a0a 0%, #1c0707 100%)" }}
        >
          <span className="text-2xl">🧠</span>
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 animate-pulse" />
        </div>
        <div className="flex flex-col gap-1 mt-1">
          {["Task 1", "Task 2", "Task 3", "...", "Task 40"].map((t, i) => (
            <div key={i} className="text-[10px] font-mono text-red-400/60 bg-red-900/20 px-2 py-0.5 rounded">
              {t}
            </div>
          ))}
        </div>
      </div>

      <div className="text-slate-500 text-2xl">→</div>

      {/* Good: many narrow agents */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs font-mono text-emerald-400 tracking-widest uppercase">✓ Six agents</p>
        <div className="grid grid-cols-3 gap-2">
          {agentLabels.map((label, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1 transition-all duration-300"
              style={{ transform: active === i ? "scale(1.15)" : "scale(1)" }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center border transition-all duration-300"
                style={{
                  borderColor: active === i ? accent : "#1e293b",
                  background: active === i ? accent + "22" : "#0f172a",
                  boxShadow: active === i ? `0 0 16px ${accent}44` : "none",
                }}
              >
                <span className="text-base">
                  {["🔍", "⚙️", "✨", "✅", "📋", "👁️"][i]}
                </span>
              </div>
              <span className="text-[9px] font-mono text-slate-400">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
