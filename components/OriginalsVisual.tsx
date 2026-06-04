"use client";
import { useEffect, useState } from "react";

export function OriginalsVisual({ accent }: { accent: string }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 800);
    return () => clearInterval(t);
  }, []);

  const badMessages = [
    "Revenue: $2.4M Q3",
    "Revenue around 2M last quarter",
    "Made some money recently",
    "Profitable, I think?",
    "??",
  ];

  const goodMessages = [
    "Revenue: $2.4M Q3",
    "Revenue: $2.4M Q3 [src: report.csv]",
    "Revenue: $2.4M Q3 [src: report.csv]",
    "Revenue: $2.4M Q3 [src: report.csv]",
  ];

  const step = tick % 5;

  return (
    <div className="w-full h-full flex items-center justify-around px-4">
      {/* Bad: telephone */}
      <div className="flex flex-col gap-2 items-center">
        <p className="text-[10px] font-mono text-red-400 tracking-widest uppercase mb-1">❌ Paraphrase chain</p>
        {badMessages.slice(0, Math.min(step + 1, 5)).map((msg, i) => (
          <div
            key={i}
            className="text-[10px] font-mono px-2 py-1 rounded border max-w-[130px] text-center transition-all duration-300"
            style={{
              background: "#450a0a",
              borderColor: "#7f1d1d",
              color: `hsl(0,60%,${70 - i * 10}%)`,
              opacity: 1,
            }}
          >
            {msg}
          </div>
        ))}
      </div>

      {/* Good: source passing */}
      <div className="flex flex-col gap-2 items-center">
        <p className="text-[10px] font-mono tracking-widest uppercase mb-1" style={{ color: accent }}>✓ Source passing</p>
        {goodMessages.slice(0, Math.min(step + 1, 4)).map((msg, i) => (
          <div
            key={i}
            className="text-[10px] font-mono px-2 py-1 rounded border max-w-[150px] text-center transition-all duration-300"
            style={{
              background: accent + "11",
              borderColor: accent + "44",
              color: accent,
            }}
          >
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
}
