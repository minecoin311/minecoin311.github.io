import React, { useEffect, useMemo, useRef, useState } from "react";

/** ======================= 기본 설정 ======================= */
const ROWS = 10;
const COLS = 17;
const DEFAULT_TIME = 120; // seconds
const BOARD_PAD = 50;     // 보드 안쪽 여백(px): 양옆/위아래 빈 공간

// 간단 다국어(영/한) — 필요하면 더 추가 가능
const T = {
  en: {
    title: "Coin Game",
    start: "Start",
    settings: "Settings",
    help: "?",
    reset: "Reset",
    home: "Home",
    score: "Score",
    left: "Left",
    final: "Final Score",
    rulesTitle: "How to Play",
    rules1: "Drag with your mouse to create a rectangle.",
    rules2: "When you release, if the sum inside is exactly 10, those coins disappear.",
    rules3: "+1 point per removed coin.",
    sound: "SFX Volume",
    music: "BGM Volume",
    language: "Language",
    close: "Close",
  },
  ko: {
    title: "코인 게임",
    start: "시작",
    settings: "설정",
    help: "?",
    reset: "리셋",
    home: "홈",
    score: "점수",
    left: "남은",
    final: "최종 점수",
    rulesTitle: "게임 방법",
    rules1: "마우스를 드래그하면 네모 상자가 생깁니다.",
    rules2: "마우스를 뗄 때 상자 안 합이 정확히 10이면 해당 코인이 사라집니다.",
    rules3: "사라진 코인 1개당 1점.",
    sound: "효과음 볼륨",
    music: "배경음 볼륨",
    language: "언어",
    close: "닫기",
  },
  ja: {
    title: "コインゲーム",
    start: "開始",
    settings: "設定",
    help: "?",
    reset: "リセット",
    home: "ホーム",
    score: "スコア",
    left: "残り",
    final: "最終スコア",
    rulesTitle: "遊び方",
    rules1: "マウスでドラッグして四角を作ります。",
    rules2: "離したとき、中の合計が10ならコインが消えます。",
    rules3: "消えたコイン1つにつき+1点。",
    sound: "効果音 音量",
    music: "BGM 音量",
    language: "言語",
    close: "閉じる",
  },
  zh: {
    title: "硬币游戏",
    start: "开始",
    settings: "设置",
    help: "?",
    reset: "重置",
    home: "主页",
    score: "得分",
    left: "剩余",
    final: "最终得分",
    rulesTitle: "玩法说明",
    rules1: "用鼠标拖拽创建一个矩形。",
    rules2: "松开时若内部之和等于10，硬币会消失。",
    rules3: "每个消除的硬币 +1 分。",
    sound: "音效音量",
    music: "背景音乐音量",
    language: "语言",
    close: "关闭",
  },
  zhtw: {
    title: "硬幣遊戲",
    start: "開始",
    settings: "設定",
    help: "?",
    reset: "重設",
    home: "主頁",
    score: "分數",
    left: "剩餘",
    final: "最終分數",
    rulesTitle: "遊戲說明",
    rules1: "用滑鼠拖曳建立矩形。",
    rules2: "放開時若內部總和為10，硬幣會消失。",
    rules3: "每個消除的硬幣 +1 分。",
    sound: "音效音量",
    music: "背景音樂音量",
    language: "語言",
    close: "關閉",
  },
  fr: { title: "Jeu de Pièces", start: "Démarrer", settings: "Paramètres", help: "?", reset: "Réinitialiser", home: "Accueil", score: "Score", left: "Restant", final: "Score Final", rulesTitle: "Comment Jouer", rules1: "Faites glisser la souris pour créer un rectangle.", rules2: "Au relâchement, si la somme vaut 10, les pièces disparaissent.", rules3: "+1 point par pièce.", sound: "Volume Effets", music: "Volume Musique", language: "Langue", close: "Fermer" },
  es: { title: "Juego de Monedas", start: "Comenzar", settings: "Configuración", help: "?", reset: "Reiniciar", home: "Inicio", score: "Puntuación", left: "Restante", final: "Puntuación Final", rulesTitle: "Cómo Jugar", rules1: "Arrastra con el ratón para crear un rectángulo.", rules2: "Al soltar, si la suma es 10, las monedas desaparecen.", rules3: "+1 punto por moneda.", sound: "Volumen Efectos", music: "Volumen Música", language: "Idioma", close: "Cerrar" },
  de: { title: "Münzspiel", start: "Starten", settings: "Einstellungen", help: "?", reset: "Zurücksetzen", home: "Startseite", score: "Punkte", left: "Übrig", final: "Endstand", rulesTitle: "So spielst du", rules1: "Mit der Maus ziehen, um ein Rechteck zu erstellen.", rules2: "Beim Loslassen: Summe 10 → Münzen weg.", rules3: "+1 Punkt je Münze.", sound: "Effektlautstärke", music: "Musiklautstärke", language: "Sprache", close: "Schließen" },
  pt: { title: "Jogo da Moeda", start: "Iniciar", settings: "Configurações", help: "?", reset: "Redefinir", home: "Início", score: "Pontuação", left: "Restante", final: "Pontuação Final", rulesTitle: "Como Jogar", rules1: "Arraste o mouse para criar um retângulo.", rules2: "Ao soltar, se a soma for 10, as moedas somem.", rules3: "+1 ponto por moeda.", sound: "Volume de Efeitos", music: "Volume de Música", language: "Idioma", close: "Fechar" },
  it: { title: "Gioco delle Monete", start: "Avvia", settings: "Impostazioni", help: "?", reset: "Ripristina", home: "Home", score: "Punteggio", left: "Rimanente", final: "Punteggio Finale", rulesTitle: "Come si gioca", rules1: "Trascina con il mouse per creare un riquadro.", rules2: "Al rilascio, se la somma è 10, le monete scompaiono.", rules3: "+1 punto per moneta.", sound: "Volume Effetti", music: "Volume Musica", language: "Lingua", close: "Chiudi" },
  ru: { title: "Игра с монетами", start: "Старт", settings: "Настройки", help: "?", reset: "Сброс", home: "Домой", score: "Счёт", left: "Осталось", final: "Итоговый счёт", rulesTitle: "Как играть", rules1: "Перетащите мышью, чтобы создать прямоугольник.", rules2: "Отпустите: если сумма 10, монеты исчезают.", rules3: "+1 очко за монету.", sound: "Громкость эффектов", music: "Громкость музыки", language: "Язык", close: "Закрыть" },
  vi: { title: "Trò chơi Đồng xu", start: "Bắt đầu", settings: "Cài đặt", help: "?", reset: "Đặt lại", home: "Trang chủ", score: "Điểm", left: "Còn", final: "Điểm cuối", rulesTitle: "Cách chơi", rules1: "Kéo chuột để tạo một khung.", rules2: "Thả ra: nếu tổng = 10, đồng xu biến mất.", rules3: "+1 điểm mỗi đồng xu.", sound: "Âm lượng hiệu ứng", music: "Âm lượng nhạc", language: "Ngôn ngữ", close: "Đóng" },
  tr: { title: "Para Oyunu", start: "Başlat", settings: "Ayarlar", help: "?", reset: "Sıfırla", home: "Ana Sayfa", score: "Puan", left: "Kaldı", final: "Final Puanı", rulesTitle: "Nasıl Oynanır", rules1: "Fareyle sürükleyip bir kutu oluşturun.", rules2: "Bırakınca toplam 10 ise paralar kaybolur.", rules3: "Her para +1 puan.", sound: "Efekt Sesi", music: "Müzik Sesi", language: "Dil", close: "Kapat" },
  id: { title: "Permainan Koin", start: "Mulai", settings: "Pengaturan", help: "?", reset: "Atur Ulang", home: "Beranda", score: "Skor", left: "Sisa", final: "Skor Akhir", rulesTitle: "Cara Bermain", rules1: "Seret dengan mouse untuk membuat kotak.", rules2: "Lepas: jika jumlah = 10, koin hilang.", rules3: "+1 poin per koin.", sound: "Volume Efek", music: "Volume Musik", language: "Bahasa", close: "Tutup" },
  th: { title: "เกมเหรียญ", start: "เริ่ม", settings: "การตั้งค่า", help: "?", reset: "รีเซ็ต", home: "หน้าหลัก", score: "คะแนน", left: "เหลือ", final: "คะแนนสุดท้าย", rulesTitle: "วิธีเล่น", rules1: "ลากเมาส์เพื่อสร้างกรอบ.", rules2: "ปล่อยเมาส์: ถ้าผลรวม = 10 เหรียญจะหายไป.", rules3: "+1 คะแนนต่อเหรียญ.", sound: "เสียงเอฟเฟกต์", music: "เสียงเพลง", language: "ภาษา", close: "ปิด" },
  hi: { title: "कॉइन गेम", start: "शुरू", settings: "सेटिंग्स", help: "?", reset: "रीसेट", home: "होम", score: "स्कोर", left: "बाकी", final: "अंतिम स्कोर", rulesTitle: "कैसे खेलें", rules1: "माउस से ड्रैग कर बॉक्स बनाएं।", rules2: "छोड़ते ही यदि योग 10 है तो कॉइन गायब।", rules3: "हर कॉइन +1 अंक।", sound: "इफ़ेक्ट वॉल्यूम", music: "म्यूजिक वॉल्यूम", language: "भाषा", close: "बंद करें" },
};
const LANGS = ["en", "ko", "ja", "zh", "zhtw", "fr", "es", "de", "pt", "it", "ru", "vi", "tr", "id", "th", "hi"];

/** ======================= 유틸 ======================= */
function makeGrid(r, c) {
  const g = [];
  for (let i = 0; i < r; i++) {
    const row = [];
    for (let j = 0; j < c; j++) {
      row.push({
        id: `${i}-${j}-${Math.random().toString(36).slice(2, 7)}`,
        value: 1 + Math.floor(Math.random() * 9),
      });
    }
    g.push(row);
  }
  return g;
}
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const isIn = (rect, r, c) => rect && r >= rect.r1 && r <= rect.r2 && c >= rect.c1 && c <= rect.c2;
function removeCellsById(grid, ids) {
  const next = grid.map((row) => row.slice());
  for (let r = 0; r < next.length; r++) {
    for (let c = 0; c < next[0].length; c++) {
      const cell = next[r][c];
      if (cell && ids.has(cell.id)) next[r][c] = null;
    }
  }
  return next;
}

/** ======================= 메인 컴포넌트 ======================= */
export default function CoinGame() {
  // 언어
  const [lang, setLang] = useState(() => localStorage.getItem("coinGameLang") || "en");
  const t = (k) => (T[lang] && T[lang][k]) || T.en[k] || k;
  useEffect(() => localStorage.setItem("coinGameLang", lang), [lang]);

  // 페이즈: lobby(시작/설정) → playing(인게임)
  const [phase, setPhase] = useState("lobby");

  // 설정 모달
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [sfxVol, setSfxVol] = useState(0.7);
  const [bgmVol, setBgmVol] = useState(0.4);

  // 게임 상태
  const [grid, setGrid] = useState(() => makeGrid(ROWS, COLS));
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);

  // 드래그 상태
  const contentRef = useRef(null); // 여백이 포함된 "실제 인터랙션 박스"
  const [dragStart, setDragStart] = useState(null); // {x,y} | null
  const [dragEnd, setDragEnd] = useState(null);     // {x,y} | null
  const [isDragging, setIsDragging] = useState(false);

  // 피드백
  const [flashGood, setFlashGood] = useState(false);
  const [flashBad, setFlashBad] = useState(false);

  // 타이머
  useEffect(() => {
    if (phase !== "playing" || !running) return;
    if (timeLeft <= 0) { setRunning(false); return; }
    const id = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [phase, running, timeLeft]);

  const startGame = () => {
    setGrid(makeGrid(ROWS, COLS));
    setScore(0);
    setTimeLeft(DEFAULT_TIME);
    setRunning(true);
    setPhase("playing");
  };
  const home = () => { setRunning(false); setPhase("lobby"); };
  const reset = () => { setGrid(makeGrid(ROWS, COLS)); setScore(0); setTimeLeft(DEFAULT_TIME); setRunning(true); };

  // 좌표(마우스/터치) → contentRef 로컬 좌표
  const toLocal = (cx, cy) => {
    const r = contentRef.current.getBoundingClientRect();
    return { x: cx - r.left, y: cy - r.top };
  };

  // 선택 사각형 (contentRef 크기 기준)
  const activeRect = useMemo(() => {
    if (!dragStart || !dragEnd || !contentRef.current) return null;
    const rect = contentRef.current.getBoundingClientRect();
    const cellW = rect.width / COLS; const cellH = rect.height / ROWS;
    const x1 = clamp(Math.min(dragStart.x, dragEnd.x), 0, rect.width - 0.1);
    const y1 = clamp(Math.min(dragStart.y, dragEnd.y), 0, rect.height - 0.1);
    const x2 = clamp(Math.max(dragStart.x, dragEnd.x), 0, rect.width - 0.1);
    const y2 = clamp(Math.max(dragStart.y, dragEnd.y), 0, rect.height - 0.1);
    return {
      c1: Math.floor(x1 / cellW), c2: Math.floor(x2 / cellW),
      r1: Math.floor(y1 / cellH), r2: Math.floor(y2 / cellH),
    };
  }, [dragStart, dragEnd]);

  // 현재 선택 합/개수
  const { selSum, selCount } = useMemo(() => {
    if (!activeRect) return { selSum: 0, selCount: 0 };
    let sum = 0, cnt = 0;
    for (let r = activeRect.r1; r <= activeRect.r2; r++) {
      for (let c = activeRect.c1; c <= activeRect.c2; c++) {
        const cell = grid[r]?.[c];
        if (cell) { sum += cell.value; cnt++; }
      }
    }
    return { selSum: sum, selCount: cnt };
  }, [activeRect, grid]);

  // 선택 적용
  const applySelection = () => {
    if (!activeRect) return;
    let sum = 0; const ids = [];
    for (let r = activeRect.r1; r <= activeRect.r2; r++) {
      for (let c = activeRect.c1; c <= activeRect.c2; c++) {
        const cell = grid[r]?.[c];
        if (cell) { sum += cell.value; ids.push(cell.id); }
      }
    }
    if (!ids.length) return;
    if (sum === 10) {
      setGrid((old) => removeCellsById(old, new Set(ids)));
      setScore((s) => s + ids.length);
      setFlashGood(true); setTimeout(() => setFlashGood(false), 160);
    } else {
      setFlashBad(true); setTimeout(() => setFlashBad(false), 160);
    }
  };

  // 드래그 핸들러
  const onDown = (x, y) => { const p = toLocal(x, y); setDragStart(p); setDragEnd(p); setIsDragging(true); };
  const onMove = (x, y) => { if (!isDragging) return; setDragEnd(toLocal(x, y)); };
  const onUp = () => { if (!isDragging) return; applySelection(); setIsDragging(false); setDragStart(null); setDragEnd(null); };

  const finished = !running && timeLeft <= 0;
  const timePct = Math.max(0, Math.min(100, (timeLeft / Math.max(1, DEFAULT_TIME)) * 100));

  /** ======================= 뷰 ======================= */
  // 로비
  if (phase === "lobby") {
    return (
      <div style={{minHeight:"80vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff"}}>
        <div
          style={{
            textAlign:"center",
            padding:24,
            border:"1px solid #333",
            borderRadius:16,
            background:"rgba(255,255,255,.04)",
            width: "min(90vw, 1024px)"
          }}
        >
          <div
            style={{
              fontSize:"clamp(28px, 6vw, 48px)",
              lineHeight:1.15,
              fontWeight:900,
              marginBottom:8,
              background:"linear-gradient(90deg,#f6d365,#fda085)",
              WebkitBackgroundClip:"text",
              color:"transparent",
              overflowWrap:"anywhere"
            }}
          >
            {t("title")}
          </div>

          <div style={{opacity:.85, marginBottom:16, fontSize:16, lineHeight:1.5, overflowWrap:"anywhere"}}>
            {t("rules1")} {t("rules2")}
          </div>

          <div style={{display:"flex",gap:10,justifyContent:"center"}}>
            <button
              onClick={startGame}
              style={{padding:"12px 20px",borderRadius:14,background:"#f7b500",color:"#111",fontWeight:800,border:"none",cursor:"pointer"}}
            >
              {t("start")}
            </button>
            <button
              onClick={()=>setSettingsOpen(true)}
              style={{padding:"12px 20px",borderRadius:14,background:"transparent",color:"#fff",border:"1px solid #444",cursor:"pointer"}}
            >
              {t("settings")}
            </button>
          </div>

          {settingsOpen && (
            <div
              style={{
                position:"fixed",
                inset:0,
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                background:"rgba(0,0,0,.6)",
                zIndex:50
              }}
            >
              <div
                style={{
                  width:"min(92vw,680px)",
                  background:"#111",
                  border:"1px solid #333",
                  borderRadius:16,
                  padding:16,
                  color:"#fff",
                  userSelect:"text"
                }}
              >
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                  <div style={{fontWeight:800}}>{t("settings")}</div>
                  <button
                    onClick={()=>setSettingsOpen(false)}
                    style={{background:"#333",border:"none",borderRadius:8,padding:"2px 8px",cursor:"pointer",color:"#fff"}}
                  >
                    ✕
                  </button>
                </div>

                <div style={{display:"grid",gap:14}}>
                  <div>
                    <div style={{fontSize:12,opacity:.8,marginBottom:4}}>{t("sound")}: {(sfxVol*100).toFixed(0)}%</div>
                    <input type="range" min={0} max={1} step={0.01} value={sfxVol} onChange={(e)=>setSfxVol(Number(e.target.value))} style={{width:"100%"}} />
                  </div>
                  <div>
                    <div style={{fontSize:12,opacity:.8,marginBottom:4}}>{t("music")}: {(bgmVol*100).toFixed(0)}%</div>
                    <input type="range" min={0} max={1} step={0.01} value={bgmVol} onChange={(e)=>setBgmVol(Number(e.target.value))} style={{width:"100%"}} />
                  </div>
                  <div>
                    <div style={{fontSize:12,opacity:.8,marginBottom:6}}>{t("language")}</div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                      {LANGS.map((code) => (
                        <button
                          key={code}
                          onClick={()=>setLang(code)}
                          style={{
                            padding:"8px 12px",
                            borderRadius:12,
                            border:"1px solid #444",
                            background: lang===code ? "#f7b500" : "transparent",
                            color: lang===code ? "#111" : "#fff",
                            cursor:"pointer"
                          }}
                        >
                          {code.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div style={{display:"flex",justifyContent:"flex-end"}}>
                    <button
                      onClick={()=>setSettingsOpen(false)}
                      style={{padding:"8px 14px",borderRadius:10,background:"#333",border:"none",color:"#fff",cursor:"pointer"}}
                    >
                      {t("close")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 인게임
  return (
    <div style={{color:"#fff",padding:"8px 12px"}}>
      {/* 헤더 */}
      <div style={{maxWidth:1024,margin:"0 auto",position:"relative",textAlign:"center",padding:"6px 0 10px"}}>
        <button onClick={home}
          style={{position:"absolute",left:0,top:0,padding:"6px 10px",borderRadius:8,background:"#444",
                  border:"none",color:"#fff",cursor:"pointer"}}>
          {t("home")}
        </button>
        <div style={{fontWeight:900,fontSize:20}}>
          {t("score")}: <span style={{color:"#ffd166",fontSize:24}}>{score}</span>
          <span style={{opacity:.7,fontSize:12,marginLeft:8}}>{t("left")}: {timeLeft}s</span>
        </div>
        <button onClick={reset}
          style={{position:"absolute",right:0,top:0,padding:"6px 10px",borderRadius:8,background:"#f7b500",
                  border:"none",color:"#111",fontWeight:800,cursor:"pointer"}}>
          {t("reset")}
        </button>
      </div>

      {/* 타임바 */}
      <div style={{maxWidth:1024,margin:"0 auto 10px"}}>
        <div style={{height:6,background:"#222",borderRadius:4,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${timePct}%`,background:"#f7b500"}} />
        </div>
      </div>

      {/* 보드 래퍼 */}
      <div style={{maxWidth:1024,margin:"0 auto",position:"relative"}}>
        {/* 비율 박스: 전체 보드 프레임 (여기엔 이벤트/좌표 계산 안 붙임) */}
        <div style={{ position:"relative", userSelect:"none" }}>
          <div style={{width:"100%",paddingTop:`${(ROWS / COLS) * 100}%`}} />

          {/* === 실제 인터랙션 영역(여백 포함) === */}
          <div
            ref={contentRef}
            onMouseDown={(e) => onDown(e.clientX, e.clientY)}
            onMouseMove={(e) => onMove(e.clientX, e.clientY)}
            onMouseUp={onUp}
            onMouseLeave={onUp}
            onTouchStart={(e) => onDown(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchMove={(e) => onMove(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchEnd={onUp}
            onDragStart={(e) => e.preventDefault()}
            style={{
              position:"absolute",
              // 보드 안쪽 여백: 드래그 좌표는 이 박스 기준이므로 정확함
              left: BOARD_PAD, right: BOARD_PAD, top: BOARD_PAD, bottom: BOARD_PAD,
              background:"#0b0b0b",
              border:"1px solid #333",
              boxShadow: flashGood ? "0 0 0 2px #ffd166 inset" : flashBad ? "0 0 0 2px #ff4d4f inset" : "none",
              transition:"box-shadow .15s ease",
              filter: (!running && timeLeft <= 0) ? "blur(2px) opacity(.7)" : "none",
              // 그리드는 이 안쪽 박스의 가상 레이어로 깔아줌
              display:"grid",
              gridTemplateColumns:`repeat(${COLS}, 1fr)`,
              gridTemplateRows:`repeat(${ROWS}, 1fr)`,
              gap: 0
            }}
          >
            {/* 그리드 셀 */}
            {grid.map((row, r) =>
              row.map((cell, c) => {
                if (!cell) return <div key={`e-${r}-${c}`} />;
                const selected = isIn(activeRect, r, c);
                return (
                  <div key={cell.id} style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <div
                      draggable={false}
                      style={{
                        width:30,height:30,borderRadius:999,display:"flex",alignItems:"center",justifyContent:"center",
                        fontSize:12,fontWeight:900,color:"#111",
                        background:"linear-gradient(135deg,#ffd166,#f7b500)",
                        outline: selected ? "2px solid #ffe08a" : "none"
                      }}
                    >
                      {cell.value}
                    </div>
                  </div>
                );
              })
            )}

            {/* 드래그 박스 (contentRef 기준 좌표) */}
            {isDragging && dragStart && dragEnd && (
              <div
                style={{
                  position:"absolute",
                  left:Math.min(dragStart.x, dragEnd.x),
                  top:Math.min(dragStart.y, dragEnd.y),
                  width:Math.abs(dragEnd.x - dragStart.x),
                  height:Math.abs(dragEnd.y - dragStart.y),
                  border:"2px solid rgba(255,214,102,.9)",
                  background:"rgba(255,214,102,.12)",
                  borderRadius:6,
                  pointerEvents:"none"
                }}
              />
            )}

            {/* 합계 뱃지 */}
            {isDragging && (
              <div style={{
                position:"absolute",right:8,top:8,zIndex:5,background:"rgba(0,0,0,.6)",
                backdropFilter:"blur(2px)",borderRadius:8,padding:"2px 6px",fontSize:11,fontWeight:800
              }}>
                Σ {selSum} · +{selCount}
              </div>
            )}

            {/* 종료 오버레이 */}
            {(!running && timeLeft <= 0) && (
              <div style={{
                position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",
                background:"rgba(0,0,0,.6)",backdropFilter:"blur(2px)"
              }}>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:36,fontWeight:900,marginBottom:8}}>{t("final")}</div>
                  <div style={{fontSize:64,fontWeight:900,color:"#ffd166"}}>{score}</div>
                </div>
              </div>
            )}
          </div>
          {/* === /contentRef === */}
        </div>
      </div>
    </div>
  );
}