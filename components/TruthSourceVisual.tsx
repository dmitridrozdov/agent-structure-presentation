"use client";
import { useEffect, useState } from "react";

const agents = ["Agent A", "Agent B", "Agent C", "Agent D", "Agent E"];

export function TruthSourceVisual({ accent }: { accent: string }) {
  const [pulse, setPulse] = useState(-1);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setPulse(i % agents.length);
      i++;
    }, 600);
    return () => clearInterval(t);
  }, []);

  const cx = 50;
  const cy = 50;
  const radius = 35;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-72 h-72">
        {agents.map((label, i) => {
          const angle = (i / agents.length) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius;
          const active = pulse === i;
          return (
            <g key={i}>
              <line
                x1={cx} y1={cy} x2={x} y2={y}
                stroke={active ? accent : "#334155"}
                strokeWidth={active ? 0.8 : 0.4}
                strokeDasharray={active ? "2 1" : "1 2"}
                style={{ transition: "stroke 0.3s" }}
              />
              <circle
                cx={x} cy={y} r={6}
                fill={active ? accent + "33" : "#1e293b"}
                stroke={active ? accent : "#475569"}
                strokeWidth={0.5}
                style={{ transition: "all 0.3s" }}
              />
              <text
                x={x + (Math.cos(angle) * 9)}
                y={y + (Math.sin(angle) * 9) + 1}
                textAnchor="middle"
                fontSize="3.5"
                fill={active ? accent : "#94a3b8"}
                fontFamily="monospace"
              >
                {label}
              </text>
            </g>
          );
        })}
        {/* Center hub */}
        <circle cx={cx} cy={cy} r={10} fill="#0f172a" stroke={accent} strokeWidth={0.8} />
        <text x={cx} y={cy - 1} textAnchor="middle" fontSize="3" fill={accent} fontFamily="monospace" fontWeight="bold">
          facts
        </text>
        <text x={cx} y={cy + 3.5} textAnchor="middle" fontSize="2.5" fill={accent + "99"} fontFamily="monospace">
          .json
        </text>
      </svg>
    </div>
  );
}
