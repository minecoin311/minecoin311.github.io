// Token.jsx — 기본 네온색은 파랑/시안, 호버 시에만 슬라이스 색으로 반응
import React, { useState } from "react";
import DonutChart from "./DonutChart";
import "./styles.scss";

// 안전한 HEX → Hue 변환 (3/6자리 HEX 지원, 실패 시 시안 190도)
function hexToHueSafe(color) {
  try {
    if (!color || color[0] !== "#") return 190;
    const hex = color.slice(1);
    const split = hex.length === 3
      ? [hex[0] + hex[0], hex[1] + hex[1], hex[2] + hex[2]]
      : [hex.slice(0, 2), hex.slice(2, 4), hex.slice(4, 6)];
    const [r, g, b] = split.map((s) => parseInt(s, 16) / 255);

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    if (max === min) return 0;
    const d = max - min;
    let h;
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4;
    }
    return Math.round(h * 60) % 360;
  } catch {
    return 190;
  }
}

function Token({ data, defaultColor = "#00ccff" }) {
  const [hoverIdx, setHoverIdx] = useState(-1);

  // ✅ 호버 전에는 항상 기본 파랑/시안, 호버 중에는 해당 아이템 색
  const baseHue = hexToHueSafe(defaultColor);
  const hue = hoverIdx >= 0 ? hexToHueSafe(data.items[hoverIdx]?.color) : baseHue;

  return (
    <section
      className={`token-section grid-bg grid-bg--neon ${hoverIdx >= 0 ? "is-hot" : ""}`}
      style={{
        // 섹션 전역 네온 변수 (배경 오라·텍스트 글로우·하이라이트가 이 색으로 반응)
        "--neon-hue": hue,
        "--neon-color": `hsl(${hue} 100% 55%)`,
        "--neon-weak": `hsl(${hue} 100% 55% / 0.18)`,
        "--neon-weak2": `hsl(${hue} 100% 55% / 0.10)`,
      }}
      onMouseLeave={() => setHoverIdx(-1)}
    >
      <div className="tf-container">
        <div className="token-grid">
          <header className="token-header">
            <h2 className="token-title">Tokenomics</h2>
            <p className="token-note">
              This allocation is a preliminary outline. Detailed figures and plans will be
              finalized and published after token issuance and market stabilization.
            </p>
            <p className="token-supply">
              <strong>Total Supply:</strong>{" "}
              <span className="hl">{data.totalSupply}</span>
            </p>
          </header>

          <aside className="token-legend-wrap">
            <ul className="token-legend">
              {data.items.map((it, i) => (
                <li
                  key={i}
                  className={hoverIdx === i ? "is-active" : ""}
                  onMouseEnter={() => setHoverIdx(i)}
                  onMouseLeave={() => setHoverIdx(-1)}
                >
                  <span className="dot" style={{ background: it.color }} />
                  <span className="label">{it.label}</span>
                  <span className="sep"> — </span>
                  <span className="value">{it.value}%</span>
                </li>
              ))}
            </ul>
          </aside>

          <div className="token-chart">
            <DonutChart
              items={data.items}
              size={560}
              thicknessFactor={0.14}
              activeIndex={hoverIdx}
              explodeIndex={hoverIdx}
              explodePx={8}
              onHoverChange={setHoverIdx}
              centerText={
                <>
                  <div className="center-top">Total Supply</div>
                  <div className="center-strong">{data.totalSupply}</div>
                </>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Token;
