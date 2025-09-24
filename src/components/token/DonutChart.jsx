// DonutChart.jsx — 기존 레이아웃/동작 그대로
import React, { useMemo, useRef, useState, useLayoutEffect, useEffect } from "react";

export default function DonutChart({
  items = [],
  size = 620,
  thickness,
  thicknessFactor = 0.13,
  normalize = true,
  minSize = 240,
  centerText,
  activeIndex = -1,
  explodeIndex = -1,
  explodePx = 8,
  onHoverChange,
}) {
  const outerRef = useRef(null);
  const [w, setW] = useState(minSize);

  useLayoutEffect(() => {
    if (!outerRef.current) return;
    const el = outerRef.current;
    const ro = new ResizeObserver(() => {
      const raw = el.clientWidth || 0;
      setW(Math.max(minSize, Math.min(raw, size)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [size, minSize]);

  const data = useMemo(() => {
    const tot = items.reduce((s, x) => s + Number(x.value || 0), 0) || 1;
    return items.map((x) => ({
      ...x,
      pct: normalize ? (Number(x.value || 0) / tot) * 100 : Number(x.value || 0),
    }));
  }, [items, normalize]);

  const SZ = w;
  const TH_BASE   = thickness ?? Math.max(12, Math.round(SZ * thicknessFactor));
  const TH_ACTIVE = Math.round(TH_BASE * 1.18);
  const SAFE_PAD  = Math.max(6, Math.ceil(TH_ACTIVE * 0.5));
  const r  = (SZ - TH_ACTIVE - SAFE_PAD * 2) / 2;
  const c  = 2 * Math.PI * r;

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let af; const start = performance.now(); const D = 800;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / D);
      setProgress(p);
      if (p < 1) af = requestAnimationFrame(tick);
    };
    af = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(af);
  }, [c, items]);

  let acc = 0;
  const GAP = Math.min(0.004 * c, 2);
  const arcs = data.map((x, i) => {
    const startPct = acc;
    const rawLen = (x.pct / 100) * c;
    const lenWithGap = Math.max(0, rawLen - GAP);
    const drawLen = lenWithGap * progress;
    const dasharray = `${drawLen} ${c - drawLen}`;
    const dashoffset = -(acc * c) / 100;

    const midRad = ((startPct + x.pct / 2) / 100) * (2 * Math.PI) - Math.PI / 2;
    const isExploded = i === explodeIndex;
    const dx = isExploded ? Math.cos(midRad) * explodePx : 0;
    const dy = isExploded ? Math.sin(midRad) * explodePx : 0;

    acc += x.pct;
    return { ...x, key: i, dasharray, dashoffset, dx, dy };
  });

  const handleEnter = (i) => onHoverChange && onHoverChange(i);
  const handleLeave = () => onHoverChange && onHoverChange(-1);

  return (
    <div ref={outerRef} style={{ width: "100%", minWidth: minSize, position: "relative" }}>
      <div style={{ position: "relative", width: "100%", paddingTop: "100%" }}>
        <svg
          viewBox={`0 0 ${SZ} ${SZ}`}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
          role="img" aria-label="token distribution" preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="sliceShadow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.25" />
            </filter>
          </defs>

          <circle cx={SZ/2} cy={SZ/2} r={r} fill="none"
                  stroke="rgba(255,255,255,0.06)" strokeWidth={TH_BASE} />

          {arcs.map((a, i) => {
            const isActive = i === activeIndex;
            const TH = isActive ? TH_ACTIVE : TH_BASE;
            return (
              <g key={a.key} transform={`translate(${a.dx} ${a.dy})`}>
                <circle
                  cx={SZ/2} cy={SZ/2} r={r}
                  fill="none"
                  stroke={a.color}
                  strokeWidth={TH}
                  strokeDasharray={a.dasharray}
                  strokeDashoffset={a.dashoffset}
                  transform={`rotate(-90 ${SZ/2} ${SZ/2})`}
                  style={{
                    transition: "stroke-width .18s ease, opacity .18s ease, transform .18s ease",
                    opacity: activeIndex === -1 || isActive ? 1 : 0.35,
                    filter: isActive ? "url(#softGlow)" : (i === explodeIndex ? "url(#sliceShadow)" : "none"),
                  }}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={handleLeave}
                />
              </g>
            );
          })}
        </svg>

        {centerText && (
          <div style={{
            position: "absolute", left: "50%", top: "50%",
            transform: "translate(-50%, -50%)", textAlign: "center",
            pointerEvents: "none", color: "#e8eef5"
          }}>
            {centerText}
          </div>
        )}
      </div>
    </div>
  );
}
