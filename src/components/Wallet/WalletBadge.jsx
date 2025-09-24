import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import "./wallet.scss";

gsap.registerPlugin(ScrambleTextPlugin);

export default function EncryptBox({
  address = "7Wf...yourSolanaAddress...9Qa",
  height = "56px",
  pad = "12px",
  maxWidth = "720px",
  marginTop = "70px",
}) {
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [hasDecryptedOnce, setHasDecryptedOnce] = useState(false);
  const [copyState, setCopyState] = useState("idle"); // idle | copied
  const textRef = useRef(null);
  const cardRef = useRef(null);
  const btnRef = useRef(null);

  // 버튼 실제 너비를 CSS 변수(--btnw)에 반영 → 텍스트와 겹침 방지
  const updateBtnWidthVar = () => {
    if (!cardRef.current || !btnRef.current) return;
    cardRef.current.style.setProperty("--btnw", `${btnRef.current.offsetWidth}px`);
  };

  useLayoutEffect(() => {
    updateBtnWidthVar();
    const onResize = () => updateBtnWidthVar();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    updateBtnWidthVar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEncrypted, hasDecryptedOnce, copyState]);

  useEffect(() => {
    if (!textRef.current) return;
    gsap.to(textRef.current, {
      duration: 1.0,
      scrambleText: {
        text: isEncrypted ? "∗&@#$#@#$_*&$(^)&@#$#@#$∗&$(^)" : address,
        chars: "symbols",
      },
      ease: "power2.inOut",
    });
  }, [isEncrypted, address]);

  const stopDrag = (e) => { e.preventDefault(); e.stopPropagation(); };

  const handleClick = async () => {
    if (isEncrypted) {
      setIsEncrypted(false);
      setHasDecryptedOnce(true);
      setCopyState("idle");
      return;
    }
    if (hasDecryptedOnce) {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(address);
        } else {
          const ta = document.createElement("textarea");
          ta.value = address;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        }
        setCopyState("copied");
        gsap.fromTo(textRef.current, { scale: 1 }, { scale: 1.03, duration: 0.18, yoyo: true, repeat: 1 });
        setTimeout(() => setCopyState("idle"), 1200);
      } catch {
        gsap.fromTo(textRef.current, { x: 0 }, { x: 6, yoyo: true, repeat: 5, duration: 0.05 });
      }
    }
  };

  return (
    <div
      ref={cardRef}
      className={`s-card ${!isEncrypted ? "decrypted" : ""}`}
      style={{ "--h": height, "--pad": pad, "--w": maxWidth, "--mt": marginTop }}
    >
      <div ref={textRef} className="s-code" aria-live="polite" />
      <button
        ref={btnRef}
        className={`s-toggle ${!isEncrypted ? "is-open" : ""}`}
        onClick={handleClick}
        onPointerDown={stopDrag}
        onMouseDown={stopDrag}
        onTouchStart={stopDrag}
        onDragStart={stopDrag}
        draggable={false}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(); } }}
      >
        {isEncrypted
          ? "Decrypt"
          : hasDecryptedOnce
          ? (copyState === "copied" ? "Copied!" : "Copy")
          : "Encrypt"}
      </button>
    </div>
  );
}
