"use client";
import { useEffect, useState } from "react";

const stages = [
  { label: "Audience\nAnalysis", icon: "🎯" },
  { label: "Strategy\nBuild", icon: "🗺️" },
  { label: "Content\nCreate", icon: "✍️" },
  { label: "QA\nCheck", icon: "✅" },
];

export function ChainVisual({ accent }: { accent: string }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % (stages.length + 1)), 900);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex items-center gap-0">
        {stages.map((s, i) => {
          const done = i < step;
          const current = i === step;
          return (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-center border transition-all duration-500"
                  style={{
                    background: done ? accent + "22" : current ? accent + "11" : "#0f172a",
                    borderColor: done || current ? accent : "#1e293b",
                    boxShadow: current ? `0 0 20px ${accent}44` : "none",
                    transform: current ? "scale(1.08)" : "scale(1)",
                  }}
                >
                  <span className="text-xl">{s.icon}</span>
                  {done && <span className="text-[8px] text-emerald-400 font-mono">✓ done</span>}
                  {current && <span className="text-[8px] font-mono animate-pulse" style={{ color: accent }}>running…</span>}
                  {!done && !current && <span className="text-[8px] text-slate-600 font-mono">waiting</span>}
                </div>
                <p className="text-[9px] text-slate-400 font-mono text-center whitespace-pre-line leading-tight">
                  {s.label}
                </p>
              </div>
              {i < stages.length - 1 && (
                <div className="relative w-10 flex items-center justify-center -mt-5">
                  <div
                    className="h-px w-full transition-all duration-500"
                    style={{ background: i < step ? accent : "#1e293b" }}
                  />
                  <div
                    className="absolute right-0 text-[10px] transition-all duration-500"
                    style={{ color: i < step ? accent : "#1e293b" }}
                  >▶</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
