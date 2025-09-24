// Typewriter.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

/** 가운데 정렬/줄바꿈 유지 + start 신호가 true일 때만 타이핑 */
export default function Typewriter({
  text,
  start = true,       // ← 화면에 들어오면 true로 바뀌게 할 것
  speed = 22,         // 글자당 ms
  startDelay = 120,   // 시작 지연(ms)
  once = true,        // true면 한 번만 실행
}) {
  const [visible, setVisible] = useState("");
  const timers = useRef({ delay: null, loop: null });
  const ranOnceRef = useRef(false);

  const safeText = useMemo(() => (text ?? "").toString(), [text]);

  useEffect(() => {
    // 아직 시작 신호가 안 왔으면 기다린다.
    if (!start) {
      setVisible("");
      if (!once) ranOnceRef.current = false;
      return () => {};
    }
    // once=true면 이미 실행했다면 더 이상 실행 안 함
    if (once && ranOnceRef.current) return;

    ranOnceRef.current = true;
    setVisible("");
    timers.current.delay = setTimeout(() => {
      let i = 0;
      timers.current.loop = setInterval(() => {
        i += 1;
        setVisible(safeText.slice(0, i));
        if (i >= safeText.length) {
          clearInterval(timers.current.loop);
          timers.current.loop = null;
        }
      }, Math.max(8, speed));
    }, Math.max(0, startDelay));

    return () => {
      if (timers.current.delay) clearTimeout(timers.current.delay);
      if (timers.current.loop) clearInterval(timers.current.loop);
    };
  }, [start, safeText, speed, startDelay, once]);

  return (
    <span className="tw">
      {/* 고스트 레이어: 실제 줄바꿈/폭을 선점 (보이지 않음) */}
      <span className="tw-ghost">{safeText}</span>

      {/* 화면에 보이는 레이어 */}
      <span className="tw-text" aria-hidden="true">
        {visible}
        <span className="tw-caret" />
      </span>
    </span>
  );
}
