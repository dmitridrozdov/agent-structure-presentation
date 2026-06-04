"use client";

import { useState, useEffect, useCallback } from "react";
import { slides } from "@/data/slides";
import { IntroVisual } from "@/components/IntroVisual";
import { SplitBrainVisual } from "@/components/SplitBrainVisual";
import { TruthSourceVisual } from "@/components/TruthSourceVisual";
import { ChainVisual } from "@/components/ChainVisual";
import { QualityVisual } from "@/components/QualityVisual";
import { OriginalsVisual } from "@/components/OriginalsVisual";
import { MemoryVisual } from "@/components/MemoryVisual";
import { MapVisual } from "@/components/MapVisual";
import { HumanVisual, OutroVisual } from "@/components/HumanOutroVisuals";

type VisualType = "intro" | "split-brain" | "truth-source" | "chain" | "quality" | "originals" | "memory" | "map" | "human" | "outro";

function Visual({ type, accent }: { type: VisualType; accent: string }) {
  switch (type) {
    case "intro": return <IntroVisual accent={accent} />;
    case "split-brain": return <SplitBrainVisual accent={accent} />;
    case "truth-source": return <TruthSourceVisual accent={accent} />;
    case "chain": return <ChainVisual accent={accent} />;
    case "quality": return <QualityVisual accent={accent} />;
    case "originals": return <OriginalsVisual accent={accent} />;
    case "memory": return <MemoryVisual accent={accent} />;
    case "map": return <MapVisual accent={accent} />;
    case "human": return <HumanVisual accent={accent} />;
    case "outro": return <OutroVisual accent={accent} />;
    default: return null;
  }
}

export default function Presentation() {
  const [current, setCurrent] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [visible, setVisible] = useState(true);

  const slide = slides[current];

  const goTo = useCallback(
    (index: number) => {
      if (animating || index < 0 || index >= slides.length) return;
      setDirection(index > current ? "forward" : "back");
      setAnimating(true);
      setVisible(false);
      setTimeout(() => {
        setCurrent(index);
        setVisible(true);
        setAnimating(false);
      }, 350);
    },
    [animating, current]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") goTo(current + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goTo(current - 1);
      if (e.key === "n" || e.key === "N") setShowNotes((s) => !s);
      if (e.key === "Escape") setShowNotes(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, goTo]);

  const progress = ((current) / (slides.length - 1)) * 100;

  return (
    <div
      className="min-h-screen flex flex-col select-none"
      style={{ background: "#0d1117", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
    >
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 border-b border-slate-800/60 backdrop-blur-sm"
        style={{ background: "#0d1117cc" }}>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: slide.accent }} />
          <span className="text-xs text-slate-500 font-mono tracking-widest uppercase">
            Agent Architecture
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowNotes((s) => !s)}
            className="text-xs font-mono px-3 py-1 rounded-lg border transition-all duration-200"
            style={{
              borderColor: showNotes ? slide.accent : "#1e293b",
              color: showNotes ? slide.accent : "#475569",
              background: showNotes ? slide.accent + "11" : "transparent",
            }}
          >
            [N] notes
          </button>
          <span className="text-xs text-slate-600 font-mono">
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="fixed top-[49px] left-0 right-0 h-px z-50">
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${progress}%`, background: slide.accent }}
        />
      </div>

      {/* Main */}
      <div className="flex flex-1 pt-[50px]">
        {/* Slide content */}
        <div
          className="flex-1 flex flex-col lg:flex-row"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateX(0)"
              : direction === "forward"
              ? "translateX(20px)"
              : "translateX(-20px)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          {/* Text panel */}
          <div className="flex-1 flex flex-col justify-center px-10 py-10 lg:pr-8 max-w-2xl">
            <div className="mb-2">
              <span
                className="text-xs font-mono tracking-widest uppercase"
                style={{ color: slide.accent }}
              >
                principle {current > 0 && current < slides.length - 1 ? `${current}` : ""}
              </span>
            </div>
            <h1
              className="text-3xl lg:text-4xl font-black leading-tight mb-3"
              style={{ color: "#f1f5f9", letterSpacing: "-0.02em" }}
            >
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p
                className="text-base font-mono mb-5 -mt-1"
                style={{ color: slide.accent + "cc" }}
              >
                {slide.subtitle}
              </p>
            )}
            <p className="text-slate-400 text-sm lg:text-base leading-relaxed max-w-lg">
              {slide.body}
            </p>

            {/* Nav dots */}
            <div className="flex gap-2 mt-10">
              {slides.map((s, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === current ? "20px" : "6px",
                    height: "6px",
                    background: i === current ? slide.accent : i < current ? slide.accent + "55" : "#1e293b",
                  }}
                />
              ))}
            </div>

            {/* Arrow nav */}
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => goTo(current - 1)}
                disabled={current === 0}
                className="px-4 py-2 rounded-lg border text-xs font-mono transition-all duration-200 disabled:opacity-20"
                style={{ borderColor: "#1e293b", color: "#64748b" }}
              >
                ← prev
              </button>
              <button
                onClick={() => goTo(current + 1)}
                disabled={current === slides.length - 1}
                className="px-4 py-2 rounded-lg border text-xs font-mono transition-all duration-200"
                style={{
                  borderColor: slide.accent + "44",
                  color: slide.accent,
                  background: slide.accent + "11",
                }}
              >
                next →
              </button>
            </div>
          </div>

          {/* Visual panel */}
          <div
            className="w-full lg:w-96 xl:w-[440px] border-l border-slate-800/50 flex items-center justify-center relative overflow-hidden"
            style={{ minHeight: "320px" }}
          >
            {/* Ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, ${slide.accent}08 0%, transparent 70%)`,
              }}
            />
            <Visual type={slide.visual} accent={slide.accent} />
          </div>
        </div>

        {/* Speaker notes drawer */}
        <div
          className="fixed bottom-0 left-0 right-0 border-t border-slate-800 z-40 transition-all duration-400"
          style={{
            height: showNotes ? "220px" : "0px",
            background: "#0d1117",
            overflow: "hidden",
          }}
        >
          <div className="p-5 h-full overflow-y-auto">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-xs font-mono tracking-widest uppercase"
                style={{ color: slide.accent }}
              >
                🎤 Speaker Notes
              </span>
              <div className="flex-1 h-px bg-slate-800" />
              <button
                onClick={() => setShowNotes(false)}
                className="text-xs text-slate-600 hover:text-slate-400 font-mono"
              >
                [esc] close
              </button>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-4xl">
              {slide.speakerNotes}
            </p>
          </div>
        </div>
      </div>

      {/* Keyboard hint */}
      <div className="fixed bottom-4 right-6 text-[10px] text-slate-700 font-mono z-30">
        ← → navigate · N notes
      </div>
    </div>
  );
}
