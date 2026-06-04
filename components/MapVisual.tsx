"use client";
import { useEffect, useState } from "react";

export function MapVisual({ accent }: { accent: string }) {
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setHighlight((h) => !h), 1200);
    return () => clearInterval(t);
  }, []);

  // Simple tree: root → 2 children → grandchildren
  const nodes = [
    { id: 0, x: 50, y: 10, label: "Data\nCollect", changed: true },
    { id: 1, x: 25, y: 40, label: "Parse\nA", changed: true },
    { id: 2, x: 75, y: 40, label: "Parse\nB", changed: false },
    { id: 3, x: 10, y: 70, label: "Enrich", changed: true },
    { id: 4, x: 40, y: 70, label: "Strategy", changed: true },
    { id: 5, x: 62, y: 70, label: "Format", changed: false },
    { id: 6, x: 88, y: 70, label: "Deliver", changed: false },
    { id: 7, x: 25, y: 90, label: "Report\n★", changed: true },
  ];

  const edges = [
    [0, 1], [0, 2],
    [1, 3], [1, 4],
    [2, 5], [2, 6],
    [3, 7], [4, 7],
  ];

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <p className="text-[10px] font-mono text-slate-500 text-center mb-2 tracking-wider">
          {highlight ? "⚡ change detected at root → re-run 5 agents" : "click any node to see blast radius"}
        </p>
        <svg viewBox="0 0 100 100" className="w-64 h-64">
          {edges.map(([a, b], i) => {
            const na = nodes[a], nb = nodes[b];
            const active = highlight && na.changed && nb.changed;
            return (
              <line key={i}
                x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                stroke={active ? accent : "#1e293b"}
                strokeWidth={active ? 0.8 : 0.5}
                style={{ transition: "stroke 0.5s" }}
              />
            );
          })}
          {nodes.map((n) => {
            const active = highlight && n.changed;
            return (
              <g key={n.id}>
                <circle
                  cx={n.x} cy={n.y} r={7}
                  fill={active ? accent + "22" : "#0f172a"}
                  stroke={active ? accent : "#334155"}
                  strokeWidth={active ? 0.8 : 0.4}
                  style={{ transition: "all 0.5s" }}
                />
                <text
                  x={n.x} y={n.y + 1}
                  textAnchor="middle"
                  fontSize="2.5"
                  fill={active ? accent : "#64748b"}
                  fontFamily="monospace"
                  style={{ transition: "fill 0.5s" }}
                >
                  {n.label.replace("\n", " ")}
                </text>
              </g>
            );
          })}
        </svg>
        <p className="text-[9px] font-mono text-center mt-1" style={{ color: accent + "99" }}>
          {highlight ? "🔴 5 re-run  🟢 20 untouched" : ""}
        </p>
      </div>
    </div>
  );
}
