"use client";

import React, { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import html2canvas from "html2canvas";
import {
  Activity,
  BriefcaseBusiness,
  CircleDot,
  Coins,
  Compass,
  Eye,
  Heart,
  Moon,
  Orbit,
  Settings,
  ShieldAlert,
  Sparkles,
  Stars,
  Sun,
  Wand2,
  Waves
} from "lucide-react";
import { createReading } from "./lib/createReading.js";

const modes = [
  {
    id: "daily-card",
    title: "ไพ่ประจำวัน",
    subtitle: "Daily card",
    icon: Wand2,
    prompt: "อ่านพลังรวมของวันนี้อย่างอ่อนโยน"
  },
  {
    id: "daily-guidance",
    title: "ดวงประจำวัน",
    subtitle: "Daily guidance",
    icon: Stars,
    prompt: "มองภาพรวมของวันแบบไม่ตัดสิน"
  },
  {
    id: "love",
    title: "ความรัก",
    subtitle: "Love energy",
    icon: Heart,
    prompt: "ฟังเสียงหัวใจและความสัมพันธ์"
  },
  {
    id: "work",
    title: "การงาน / ภารกิจ",
    subtitle: "Work mission",
    icon: BriefcaseBusiness,
    prompt: "จัดพลังงานสำหรับงานและเป้าหมาย"
  },
  {
    id: "money",
    title: "การเงิน",
    subtitle: "Stability",
    icon: Coins,
    prompt: "สำรวจความมั่นคงและการใช้ทรัพยากร"
  },
  {
    id: "cosmic-message",
    title: "ข้อความจากจักรวาล",
    subtitle: "Soul message",
    icon: Sparkles,
    prompt: "รับข้อความสั้นจากสนามพลังภายใน"
  },
  {
    id: "warning",
    title: "คำเตือนวันนี้",
    subtitle: "Shadow guidance",
    icon: ShieldAlert,
    prompt: "เห็นเงาอย่างมีเมตตา"
  },
  {
    id: "energy-scan",
    title: "พลังงานของฉันตอนนี้",
    subtitle: "Energy scan",
    icon: Waves,
    prompt: "สแกนสภาวะอารมณ์ ณ ปัจจุบัน"
  }
];

const navItems = [
  { label: "Home", thai: "หน้าหลัก", icon: Stars },
  { label: "Daily Draw", thai: "เปิดไพ่", icon: Wand2 },
  { label: "Energy Status", thai: "พลังงาน", icon: Activity },
  { label: "Soul Message", thai: "ข้อความ", icon: Heart },
  { label: "Settings", thai: "ตั้งค่า", icon: Settings }
];

const exportSizes = [
  { id: "portrait-9-16", label: "9:16 Portrait", aspectClass: "aspect-[9/16]", previewClass: "max-w-[390px]" },
  { id: "square-1-1", label: "1:1 Square", aspectClass: "aspect-square", previewClass: "max-w-[520px]" },
  { id: "landscape-16-9", label: "16:9 Landscape", aspectClass: "aspect-[16/9]", previewClass: "max-w-[720px]" },
  { id: "landscape-4-3", label: "4:3 Landscape", aspectClass: "aspect-[4/3]", previewClass: "max-w-[640px]" },
  { id: "portrait-3-4", label: "3:4 Portrait", aspectClass: "aspect-[3/4]", previewClass: "max-w-[440px]" }
];

function useThaiDate() {
  return useMemo(() => {
    const date = new Date();
    return date.toLocaleDateString("th-TH", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }, []);
}

export default function App() {
  const [reading, setReading] = useState(() => createReading());
  const [hasDrawn, setHasDrawn] = useState(false);
  const [drawPhase, setDrawPhase] = useState("idle");
  const [exportSize, setExportSize] = useState(exportSizes[0].id);
  const [isExporting, setIsExporting] = useState(false);
  const socialCardRef = useRef(null);
  const today = useThaiDate();
  const selectedExportSize = exportSizes.find((size) => size.id === exportSize) || exportSizes[0];

  function drawEnergy() {
    const nextReading = createReading();
    setDrawPhase("shuffle");
    window.setTimeout(() => setDrawPhase("rise"), 900);
    window.setTimeout(() => {
      setReading(nextReading);
      setHasDrawn(true);
      setDrawPhase("flip");
    }, 1450);
    window.setTimeout(() => setDrawPhase("revealed"), 2100);
  }

  async function downloadSocialCard() {
    if (!socialCardRef.current || isExporting) return;

    try {
      setIsExporting(true);
      const canvas = await html2canvas(socialCardRef.current, {
        backgroundColor: null,
        scale: Math.min(window.devicePixelRatio || 2, 3),
        useCORS: true
      });
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `soul-of-love-daily-energy-${new Date().toISOString().slice(0, 10)}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05030f] text-white">
      <CosmicBackdrop aura={reading.aura} />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <TopBar />

        <section id="home" className="grid flex-1 gap-5 py-5 lg:grid-cols-[1.03fr_.97fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-slate-200 shadow-[0_0_28px_rgba(255,255,255,.08)] backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5 text-amber-200" />
              Thai cosmic tarot simulator
            </div>

            <div>
              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-normal text-white sm:text-6xl lg:text-7xl">
                Soul of Love
                <span className="block bg-gradient-to-r from-sky-200 via-violet-200 to-amber-100 bg-clip-text text-transparent">
                  พลังงานวันนี้
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                เปิดไพ่หนึ่งใบเพื่อรับข้อความพลังงานประจำวันแบบครบถ้วน อ่อนโยน ชัดเจน และไม่ฟันธงชะตา เหมือนกระจกจักรวาลที่ช่วยให้คุณฟังหัวใจตัวเอง
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <SignalPill label="วันนี้" value={today} icon={Moon} />
              <SignalPill label="ออร่า" value={reading.aura.name} icon={Sun} color={reading.aura.hex} />
            </div>

            <button
              type="button"
              onClick={drawEnergy}
              disabled={drawPhase !== "idle" && drawPhase !== "revealed"}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-amber-200/40 bg-gradient-to-r from-amber-200 via-violet-200 to-sky-200 px-5 py-4 text-sm font-bold uppercase tracking-[0.12em] text-slate-950 shadow-[0_0_42px_rgba(248,199,107,.25)] transition duration-300 hover:scale-[1.01] hover:shadow-[0_0_64px_rgba(168,85,247,.42)] disabled:cursor-wait disabled:opacity-80 sm:w-auto"
            >
              <Wand2 className="h-5 w-5 transition group-hover:rotate-12" />
              {drawPhase === "idle" || drawPhase === "revealed" ? "เปิดไพ่พลังงานวันนี้" : "กำลังสับไพ่พลังงาน"}
            </button>
          </motion.div>

          <DailyDraw reading={reading} drawPhase={drawPhase} hasDrawn={hasDrawn} />
        </section>

        {hasDrawn && drawPhase === "revealed" && (
          <section className="grid gap-4 pb-24 lg:grid-cols-[.9fr_1.1fr] lg:pb-8">
            <DailySummary reading={reading} />
            <DailyInsights reading={reading} />
            <SocialExportPanel
              reading={reading}
              today={today}
              exportSizes={exportSizes}
              selectedExportSize={selectedExportSize}
              exportSize={exportSize}
              onExportSizeChange={setExportSize}
              onDownload={downloadSocialCard}
              isExporting={isExporting}
              cardRef={socialCardRef}
            />
          </section>
        )}
      </div>

      <MobileNav />
    </main>
  );
}

function CosmicBackdrop({ aura }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(110,75,255,.25),transparent_34%),radial-gradient(circle_at_15%_25%,rgba(56,189,248,.14),transparent_24%),radial-gradient(circle_at_84%_22%,rgba(248,199,107,.16),transparent_26%),linear-gradient(180deg,#070514_0%,#05030f_52%,#020108_100%)]" />
      <motion.div
        className="absolute left-1/2 top-24 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full blur-3xl"
        animate={{ opacity: [0.22, 0.42, 0.22], scale: [0.92, 1.08, 0.92] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: aura.glow }}
      />
      <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(255,255,255,.42)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#05030f] to-transparent" />
    </div>
  );
}

function TopBar() {
  return (
    <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.055] px-3 py-3 backdrop-blur-2xl">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl border border-amber-200/30 bg-amber-200/10 shadow-[0_0_24px_rgba(248,199,107,.2)]">
          <Heart className="h-5 w-5 text-amber-100" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-none">Soul of Love</p>
          <p className="mt-1 text-xs text-slate-400">Daily Energy Tarot</p>
        </div>
      </div>
      <nav className="hidden items-center gap-1 rounded-xl border border-white/10 bg-slate-950/35 p-1 lg:flex">
        {navItems.map(({ label, thai, icon: Icon }) => (
          <a
            key={label}
            href={`#${label.toLowerCase().replaceAll(" ", "-")}`}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <Icon className="h-3.5 w-3.5" />
            {thai}
          </a>
        ))}
      </nav>
    </header>
  );
}

function ModeSelector({ selectedMode, onSelect }) {
  return (
    <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-3 backdrop-blur-2xl">
      <div className="mb-3 flex items-center justify-between gap-3 px-1">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Reading Function</p>
          <h2 className="mt-1 text-lg font-semibold">เลือกฟังก์ชันการอ่านพลังงาน</h2>
        </div>
        <Sparkles className="h-5 w-5 text-amber-100" />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const active = selectedMode === mode.id;

          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onSelect(mode.id)}
              className={`flex min-h-[74px] items-center gap-3 rounded-2xl border px-3 py-3 text-left transition duration-300 ${
                active
                  ? "border-amber-200/45 bg-amber-200/12 shadow-[0_0_30px_rgba(248,199,107,.16)]"
                  : "border-white/10 bg-slate-950/35 hover:border-sky-200/30 hover:bg-white/[0.065]"
              }`}
            >
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${active ? "border-amber-200/40 bg-amber-200/15 text-amber-100" : "border-white/10 bg-white/[0.04] text-sky-100"}`}>
                <Icon className="h-4.5 w-4.5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-white">{mode.title}</span>
                <span className="mt-1 block text-xs leading-5 text-slate-400">{mode.subtitle} · {mode.prompt}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function DailyDraw({ reading, drawPhase, hasDrawn }) {
  const isRevealed = drawPhase === "revealed";

  return (
    <section id="daily-draw" className="relative">
      <AnimatePresence mode="wait">
        <motion.article
          key={reading.id}
          initial={{ opacity: 0, rotateY: -25, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, rotateY: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, rotateY: 35, y: -20, scale: 0.94 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-md rounded-[2rem] border border-white/12 bg-white/[0.065] p-4 shadow-[0_0_70px_rgba(109,40,217,.28)] backdrop-blur-2xl"
        >
          <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-white/24 via-transparent to-amber-200/20 opacity-70" />
          <div className="relative overflow-hidden rounded-[1.55rem] border border-white/10 bg-[#080617] p-4">
            <TarotSimulation reading={reading} phase={drawPhase} />
            <div className="mt-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">ไพ่ที่เปิดได้</p>
                <h2 className="mt-1 text-2xl font-semibold">
                  {isRevealed && hasDrawn ? `${reading.card.englishName} — ${reading.card.thaiName}` : "รอเปิดไพ่พลังงานวันนี้"}
                </h2>
                <p className="mt-1 text-sm text-slate-300">
                  {isRevealed && hasDrawn ? `${orientationLabel(reading.orientation)} · ${reading.card.archetype}` : "แตะปุ่มเพื่อให้ไพ่หนึ่งใบลอยขึ้นจากสำรับ"}
                </p>
              </div>
              <div className="grid h-20 w-20 place-items-center rounded-2xl border border-white/10 bg-white/[0.06]">
                <span className="text-3xl font-semibold text-amber-100">{hasDrawn ? reading.energyScore : "--"}</span>
                <span className="-mt-5 text-[0.62rem] uppercase tracking-[0.18em] text-slate-400">score</span>
              </div>
            </div>
          </div>
        </motion.article>
      </AnimatePresence>
    </section>
  );
}

function TarotSimulation({ reading, phase }) {
  const showBack = phase === "idle" || phase === "shuffle" || phase === "rise";
  const isFaceVisible = phase === "flip" || phase === "revealed";

  return (
    <motion.div
      className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem] border border-white/12 bg-slate-950 perspective-1000"
      whileHover={{ scale: 1.015 }}
      style={{ boxShadow: `0 0 80px ${reading.aura.glow}` }}
    >
      <div className="absolute inset-0 opacity-80" style={{ background: `radial-gradient(circle at 50% 28%, ${reading.aura.hex}66, transparent 26%), radial-gradient(circle at 50% 70%, rgba(248,199,107,.22), transparent 34%), linear-gradient(160deg, rgba(255,255,255,.08), rgba(255,255,255,0))` }} />
      <ShuffleCards active={phase === "shuffle"} aura={reading.aura} />

      <motion.div
        className="absolute inset-8 rounded-[1.15rem]"
        animate={{
          y: phase === "rise" ? -18 : 0,
          rotateY: isFaceVisible ? 180 : 0,
          scale: phase === "shuffle" ? 0.92 : phase === "rise" ? 1.04 : 1
        }}
        transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <TarotBack aura={reading.aura} />
        <div className="absolute inset-0 overflow-hidden rounded-[1.15rem] border border-white/15 bg-slate-950 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <CardFace reading={reading} />
        </div>
      </motion.div>

      {showBack && (
        <div className="absolute inset-x-0 bottom-5 px-5">
          <div className="rounded-2xl border border-white/10 bg-black/24 px-4 py-3 text-center text-sm text-slate-200 backdrop-blur-xl">
            {phase === "idle" ? "สำรับพร้อมเปิดรับพลังงานของวันนี้" : phase === "shuffle" ? "กำลังสับไพ่ในสนามพลัง" : "ไพ่หนึ่งใบกำลังลอยขึ้นมา"}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function CardFace({ reading }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 24%, ${reading.aura.hex}77, transparent 28%), radial-gradient(circle at 50% 82%, rgba(248,199,107,.2), transparent 34%), linear-gradient(160deg, rgba(255,255,255,.13), rgba(255,255,255,0))` }} />
      <motion.div
        className="absolute -inset-16 rounded-full opacity-60 blur-2xl"
        animate={{ opacity: [0.32, 0.62, 0.32], scale: [0.9, 1.08, 0.9] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: reading.aura.glow }}
      />
      <motion.div className="absolute inset-7 rounded-full border border-white/18" animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} />
      <motion.div className="absolute inset-12 rounded-full border border-amber-100/25" animate={{ rotate: -360 }} transition={{ duration: 26, repeat: Infinity, ease: "linear" }} />
      <div className="absolute inset-x-0 top-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-100">Major Arcana {reading.card.id}</p>
      </div>
      <div className="absolute inset-0 grid place-items-center px-8">
        <CardSymbol cardId={reading.card.id} aura={reading.aura} />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="rounded-2xl border border-white/10 bg-black/28 px-4 py-3 text-center backdrop-blur-xl">
          <p className="text-lg font-semibold leading-6 text-white">{reading.card.thaiName}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-amber-100">{reading.card.englishName}</p>
        </div>
      </div>
    </div>
  );
}

function CardSymbol({ cardId, aura }) {
  const stroke = aura.hex;
  const common = {
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  return (
    <motion.svg
      viewBox="0 0 220 220"
      className="h-[76%] w-[76%] drop-shadow-[0_0_22px_rgba(248,199,107,.25)]"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`glow-${cardId}`}>
          <stop offset="0%" stopColor={aura.hex} stopOpacity="0.8" />
          <stop offset="100%" stopColor={aura.hex} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="110" cy="110" r="86" fill={`url(#glow-${cardId})`} opacity="0.28" />
      <circle cx="110" cy="110" r="82" {...common} stroke="rgba(255,255,255,.28)" strokeWidth="1.2" />
      <path d="M110 28 L181 151 L39 151 Z" {...common} stroke="rgba(248,199,107,.34)" strokeWidth="1" />
      {renderCardSymbol(cardId, stroke)}
    </motion.svg>
  );
}

function renderCardSymbol(cardId, stroke) {
  const props = { fill: "none", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 5 };
  const gold = "#f8c76b";

  switch (cardId) {
    case 0:
      return <g><path d="M62 150 C86 106 112 96 156 72" {...props} stroke={stroke} /><path d="M138 72 L158 70 L154 91" {...props} stroke={gold} /><circle cx="64" cy="154" r="8" fill={gold} /><path d="M92 146 L110 128 L128 146" {...props} stroke="rgba(255,255,255,.75)" /></g>;
    case 1:
      return <g><path d="M70 110 C70 82 102 82 110 110 C118 138 150 138 150 110 C150 82 118 82 110 110 C102 138 70 138 70 110Z" {...props} stroke={gold} /><path d="M110 54 L110 166" {...props} stroke={stroke} /><circle cx="110" cy="54" r="9" fill={stroke} /></g>;
    case 2:
      return <g><path d="M70 158 C86 106 134 106 150 158" {...props} stroke={stroke} /><path d="M82 70 C102 92 126 92 146 70" {...props} stroke={gold} /><ellipse cx="110" cy="116" rx="34" ry="18" {...props} stroke="rgba(255,255,255,.78)" /><circle cx="110" cy="116" r="6" fill={gold} /></g>;
    case 3:
      return <g><path d="M110 72 C142 92 142 134 110 154 C78 134 78 92 110 72Z" {...props} stroke={stroke} /><path d="M72 116 C92 86 128 86 148 116 C128 146 92 146 72 116Z" {...props} stroke={gold} /><circle cx="110" cy="116" r="13" fill="rgba(248,199,107,.75)" /></g>;
    case 4:
      return <g><path d="M68 152 L152 152 L152 88 L68 88 Z" {...props} stroke={gold} /><path d="M82 88 L110 58 L138 88" {...props} stroke={stroke} /><path d="M76 152 L144 84" {...props} stroke="rgba(255,255,255,.55)" /></g>;
    case 5:
      return <g><path d="M76 160 L76 84 M144 160 L144 84" {...props} stroke={stroke} /><path d="M68 84 L152 84" {...props} stroke={gold} /><path d="M110 62 L110 160" {...props} stroke={gold} /><path d="M94 118 C94 102 126 102 126 118 C126 134 94 134 94 118Z" {...props} stroke="rgba(255,255,255,.75)" /></g>;
    case 6:
      return <g><path d="M72 98 C90 70 110 96 110 116 C110 96 130 70 148 98 C166 128 126 152 110 164 C94 152 54 128 72 98Z" {...props} stroke={gold} /><path d="M72 72 L148 148 M148 72 L72 148" {...props} stroke={stroke} strokeWidth="3" /></g>;
    case 7:
      return <g><path d="M66 142 L154 142 L140 92 L80 92 Z" {...props} stroke={gold} /><path d="M90 142 L78 166 M130 142 L142 166" {...props} stroke={stroke} /><path d="M80 78 L110 54 L140 78" {...props} stroke={stroke} /><path d="M92 116 L128 116 M128 116 L114 102 M128 116 L114 130" {...props} stroke="rgba(255,255,255,.75)" /></g>;
    case 8:
      return <g><path d="M76 126 C80 82 140 82 144 126 C130 110 90 110 76 126Z" {...props} stroke={gold} /><path d="M86 130 C100 160 120 160 134 130" {...props} stroke={stroke} /><path d="M110 72 C124 96 124 124 110 150 C96 124 96 96 110 72Z" {...props} stroke="rgba(255,255,255,.72)" /></g>;
    case 9:
      return <g><path d="M84 158 L110 58 L136 158" {...props} stroke={stroke} /><path d="M92 112 L128 112 L122 146 L98 146 Z" {...props} stroke={gold} /><circle cx="110" cy="126" r="10" fill={gold} /><path d="M70 164 C96 146 124 146 150 164" {...props} stroke="rgba(255,255,255,.55)" /></g>;
    case 10:
      return <g><circle cx="110" cy="112" r="52" {...props} stroke={gold} /><circle cx="110" cy="112" r="18" {...props} stroke={stroke} /><path d="M110 60 L110 164 M58 112 L162 112 M74 76 L146 148 M146 76 L74 148" {...props} stroke={stroke} strokeWidth="3" /></g>;
    case 11:
      return <g><path d="M110 58 L110 166" {...props} stroke={gold} /><path d="M76 88 L144 88" {...props} stroke={stroke} /><path d="M82 88 L64 128 L100 128 Z M138 88 L120 128 L156 128 Z" {...props} stroke="rgba(255,255,255,.76)" /><path d="M110 58 L124 74 L110 90 L96 74 Z" fill={gold} /></g>;
    case 12:
      return <g><path d="M76 62 L144 62" {...props} stroke={gold} /><path d="M110 62 L110 142" {...props} stroke={stroke} /><circle cx="110" cy="158" r="22" {...props} stroke="rgba(255,255,255,.72)" /><path d="M88 114 L132 114 M96 142 L124 142" {...props} stroke={gold} /></g>;
    case 13:
      return <g><path d="M78 152 C86 104 134 104 142 152 C120 132 100 132 78 152Z" {...props} stroke={stroke} /><path d="M110 70 C132 90 132 120 110 140 C88 120 88 90 110 70Z" {...props} stroke={gold} /><path d="M72 78 L148 154" {...props} stroke="rgba(255,255,255,.62)" /></g>;
    case 14:
      return <g><path d="M78 82 L118 82 L110 124 L86 124 Z M102 142 L142 142 L134 176 L110 176 Z" {...props} stroke={gold} /><path d="M116 104 C136 112 94 132 114 148" {...props} stroke={stroke} /><path d="M70 154 C92 134 128 134 150 154" {...props} stroke="rgba(255,255,255,.56)" /></g>;
    case 15:
      return <g><path d="M72 128 C86 104 104 104 110 128 C116 104 134 104 148 128" {...props} stroke={stroke} /><path d="M78 148 L100 126 M120 126 L142 148" {...props} stroke={gold} /><path d="M80 82 L98 108 M140 82 L122 108" {...props} stroke="rgba(255,255,255,.7)" /><path d="M86 164 C104 144 116 144 134 164" {...props} stroke={gold} /></g>;
    case 16:
      return <g><path d="M86 164 L96 76 L134 76 L146 164 Z" {...props} stroke={gold} /><path d="M126 48 L100 104 L126 104 L96 164" {...props} stroke={stroke} /><path d="M70 128 L92 138 M150 118 L132 132" {...props} stroke="rgba(255,255,255,.65)" /></g>;
    case 17:
      return <g><path d="M110 54 L124 94 L166 94 L132 118 L146 160 L110 134 L74 160 L88 118 L54 94 L96 94 Z" {...props} stroke={gold} /><path d="M86 168 C110 140 134 140 158 168" {...props} stroke={stroke} /><path d="M76 132 C96 142 124 142 144 132" {...props} stroke="rgba(255,255,255,.62)" /></g>;
    case 18:
      return <g><path d="M130 58 C98 70 88 116 112 146 C86 134 72 100 86 74 C96 56 116 50 130 58Z" fill={gold} opacity=".82" /><path d="M64 152 C88 134 132 134 156 152 M74 166 C96 154 124 154 146 166" {...props} stroke={stroke} /><circle cx="118" cy="104" r="8" fill="rgba(255,255,255,.78)" /></g>;
    case 19:
      return <g><circle cx="110" cy="110" r="34" fill={gold} opacity=".9" /><path d="M110 52 L110 78 M110 142 L110 168 M52 110 L78 110 M142 110 L168 110 M70 70 L88 88 M132 132 L150 150 M150 70 L132 88 M88 132 L70 150" {...props} stroke={stroke} /><circle cx="110" cy="110" r="52" {...props} stroke="rgba(255,255,255,.45)" /></g>;
    case 20:
      return <g><path d="M80 72 L140 54 L140 104 L80 86 Z" {...props} stroke={gold} /><path d="M80 72 L80 150" {...props} stroke={stroke} /><path d="M78 166 C92 136 128 136 142 166" {...props} stroke="rgba(255,255,255,.7)" /><path d="M98 128 L110 104 L122 128" {...props} stroke={gold} /></g>;
    case 21:
      return <g><circle cx="110" cy="110" r="58" {...props} stroke={gold} /><circle cx="110" cy="110" r="34" {...props} stroke={stroke} /><path d="M110 52 C138 78 138 142 110 168 C82 142 82 78 110 52Z" {...props} stroke="rgba(255,255,255,.7)" /><path d="M52 110 C78 82 142 82 168 110 C142 138 78 138 52 110Z" {...props} stroke={stroke} strokeWidth="3" /></g>;
    default:
      return <circle cx="110" cy="110" r="34" {...props} stroke={gold} />;
  }
}

function TarotBack({ aura }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[1.15rem] border border-amber-100/25 bg-[#080514] [backface-visibility:hidden]">
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 42%, ${aura.hex}44, transparent 28%), linear-gradient(160deg, rgba(248,199,107,.2), transparent 42%, rgba(56,189,248,.14))` }} />
      <div className="absolute inset-5 rounded-[1rem] border border-amber-100/30" />
      <div className="absolute inset-10 rounded-full border border-amber-100/30" />
      <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-amber-100/50" />
      <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/[0.045]">
        <Heart className="h-9 w-9 text-amber-100" />
      </div>
      <p className="absolute inset-x-0 bottom-7 text-center text-xs font-semibold uppercase tracking-[0.28em] text-amber-100">Soul of Love</p>
    </div>
  );
}

function ShuffleCards({ active, aura }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className="absolute h-[62%] w-[48%] rounded-[1rem] border border-amber-100/20 bg-[#090617] shadow-[0_0_30px_rgba(248,199,107,.14)]"
          animate={
            active
              ? {
                  x: [0, (index - 2) * 20, (2 - index) * 18, 0],
                  y: [0, index % 2 ? -12 : 12, 0],
                  rotate: [index * 4 - 8, index * -7 + 10, index * 4 - 8],
                  opacity: [0.22, 0.72, 0.22]
                }
              : { opacity: 0, scale: 0.9 }
          }
          transition={{ duration: 0.8, repeat: active ? Infinity : 0, ease: "easeInOut", delay: index * 0.04 }}
          style={{ boxShadow: `0 0 28px ${aura.glow}` }}
        />
      ))}
    </div>
  );
}

function DailySummary({ reading }) {
  return (
    <section id="energy-status" className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4 backdrop-blur-2xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Daily Energy</p>
          <h2 className="mt-1 text-xl font-semibold">สรุปพลังงานประจำวัน</h2>
        </div>
        <Activity className="h-5 w-5 text-sky-200" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <SummaryMetric label="คะแนนพลังงานวันนี้" value={`${reading.energyScore}/100`} />
        <SummaryMetric label="สถานะไพ่" value={orientationLabel(reading.orientation)} />
        <SummaryMetric label="สีออร่าประจำวัน" value={`${reading.aura.name} · ${reading.aura.english}`} color={reading.aura.hex} />
        <SummaryMetric label="สภาวะอารมณ์" value={reading.emotionalState} />
      </div>
      <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/45 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">พลังงานหลัก</p>
        <p className="mt-2 text-lg font-semibold text-white">{reading.card.energyTheme}</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">{orientationMeaning(reading)}</p>
      </div>
    </section>
  );
}

function SummaryMetric({ label, value, color = "#f8c76b" }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-slate-950/45 p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-semibold leading-7 text-white" style={{ textShadow: `0 0 18px ${color}55` }}>{value}</p>
    </article>
  );
}

function SocialExportPanel({
  reading,
  today,
  exportSizes,
  selectedExportSize,
  exportSize,
  onExportSizeChange,
  onDownload,
  isExporting,
  cardRef
}) {
  return (
    <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4 backdrop-blur-2xl lg:col-span-2">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Social Export</p>
          <h2 className="mt-1 text-xl font-semibold">การ์ดพลังงานสำหรับแชร์</h2>
        </div>
        <div className="flex flex-col gap-2 sm:min-w-[18rem] sm:flex-row">
          <select
            value={exportSize}
            onChange={(event) => onExportSizeChange(event.target.value)}
            className="rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-sm font-medium text-white outline-none transition focus:border-amber-200/50"
            aria-label="เลือกขนาดการ์ดสำหรับดาวน์โหลด"
          >
            {exportSizes.map((size) => (
              <option key={size.id} value={size.id} className="bg-slate-950 text-white">
                {size.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={onDownload}
            disabled={isExporting}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-200/35 bg-amber-200/12 px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-amber-100 transition hover:bg-amber-200/18 disabled:cursor-wait disabled:opacity-70"
          >
            <Sparkles className="h-4 w-4" />
            {isExporting ? "กำลังสร้าง PNG" : "Download PNG"}
          </button>
        </div>
      </div>
      <SocialCardPreview ref={cardRef} reading={reading} today={today} selectedExportSize={selectedExportSize} />
    </section>
  );
}

const SocialCardPreview = React.forwardRef(function SocialCardPreview({ reading, today, selectedExportSize }, ref) {
  const compact = selectedExportSize.id === "landscape-16-9" || selectedExportSize.id === "landscape-4-3";

  return (
    <article
      ref={ref}
      className={`relative mx-auto w-full overflow-hidden rounded-[2rem] border border-white/12 bg-[#070412] shadow-[0_0_70px_rgba(109,40,217,.24)] ${selectedExportSize.aspectClass} ${selectedExportSize.previewClass}`}
    >
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 24% 18%, ${reading.aura.hex}66, transparent 28%), radial-gradient(circle at 80% 12%, rgba(248,199,107,.24), transparent 28%), linear-gradient(145deg, #080617 0%, #130a28 48%, #03020a 100%)` }} />
      <div className="absolute inset-0 opacity-45 [background-image:radial-gradient(rgba(255,255,255,.42)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full blur-3xl" style={{ background: reading.aura.glow }} />
      <div className="absolute -bottom-24 left-8 h-56 w-56 rounded-full bg-amber-200/20 blur-3xl" />

      <div className={`relative flex h-full flex-col ${compact ? "p-6" : "p-6 sm:p-8"}`}>
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-100">Soul of Love</p>
            <h3 className={`${compact ? "mt-2 text-2xl" : "mt-3 text-3xl sm:text-4xl"} font-semibold leading-tight text-white`}>
              Daily Energy
            </h3>
            <p className="mt-2 text-xs leading-5 text-slate-300">{today}</p>
          </div>
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.08] text-center">
            <span className="text-2xl font-semibold text-amber-100">{reading.energyScore}</span>
            <span className="-mt-4 text-[0.55rem] uppercase tracking-[0.18em] text-slate-400">score</span>
          </div>
        </header>

        <div className={`grid flex-1 gap-4 ${compact ? "mt-5 grid-cols-[.86fr_1.14fr] items-center" : "mt-7 content-center"}`}>
          <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Card</p>
            <h4 className={`${compact ? "mt-2 text-xl" : "mt-3 text-2xl"} font-semibold leading-tight text-white`}>
              {reading.card.thaiName}
            </h4>
            <p className="mt-1 text-sm uppercase tracking-[0.14em] text-amber-100">{reading.card.englishName}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-slate-200">{orientationLabel(reading.orientation)}</span>
              <span className="rounded-full border border-white/10 bg-white/[0.07] px-3 py-1 text-slate-200">{reading.aura.name}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-[1.35rem] border border-white/10 bg-slate-950/42 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Main Energy</p>
              <p className="mt-2 text-lg font-semibold leading-7 text-white">{reading.card.energyTheme}</p>
            </div>
            <blockquote className={`${compact ? "text-lg leading-7" : "text-xl leading-8 sm:text-2xl sm:leading-9"} font-medium text-white`}>
              "{shortenText(reading.universeMessage, compact ? 92 : 130)}"
            </blockquote>
          </div>
        </div>

        <div className={`${compact ? "mt-4 grid grid-cols-2 gap-3" : "mt-5 space-y-3"}`}>
          <SocialMiniText label="Guidance" text={shortenText(reading.guidance, compact ? 86 : 118)} />
          <SocialMiniText label="Affirmation" text={shortenText(reading.affirmation, compact ? 76 : 104)} accent />
        </div>

        <footer className="mt-auto flex items-center justify-between pt-4 text-xs uppercase tracking-[0.22em] text-slate-400">
          <span>Soul of Love</span>
          <span style={{ color: reading.aura.hex }}>{reading.aura.english}</span>
        </footer>
      </div>
    </article>
  );
});

function SocialMiniText({ label, text, accent = false }) {
  return (
    <div className={`rounded-[1.15rem] border p-3 ${accent ? "border-amber-200/20 bg-amber-200/10" : "border-white/10 bg-white/[0.055]"}`}>
      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-sm leading-6 text-white">{text}</p>
    </div>
  );
}

function DailyInsights({ reading }) {
  return (
    <section id="soul-message" className="grid gap-4 sm:grid-cols-2">
      <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-2xl sm:col-span-2">
        <div className="mb-4 flex items-center gap-2 text-amber-100">
          <Orbit className="h-5 w-5" />
          <h2 className="text-xl font-semibold">ข้อความจากจักรวาล</h2>
        </div>
        <blockquote className="text-2xl font-medium leading-10 text-white sm:text-3xl">
          "{reading.universeMessage}"
        </blockquote>
      </article>

      <GuidanceCard title="คำแนะนำสำหรับวันนี้" icon={Wand2} text={reading.guidance} tone="violet" />
      <GuidanceCard title="ภารกิจวันนี้" icon={CircleDot} text={reading.mission} tone="cyan" />
      <GuidanceCard title="ข้อความจากจิตวิญญาณ" icon={Waves} text={reading.soulMessage} tone="gold" />
      <GuidanceCard title="ความรักวันนี้" icon={Heart} text={reading.love} tone="rose" />
      <GuidanceCard title="งาน / เส้นทางวันนี้" icon={BriefcaseBusiness} text={reading.work} tone="cyan" />
      <GuidanceCard title="เงิน / คุณค่า / ทรัพยากร" icon={Coins} text={reading.money} tone="emerald" />
      <GuidanceCard title="จุดโฟกัสวันนี้" icon={Compass} text={reading.focus || reading.focusPoint} tone="cyan" />
      <GuidanceCard title="คำเตือนจากจักรวาล" icon={ShieldAlert} text={reading.warning} tone="gold" />
      <GuidanceCard title="คำยืนยันพลังงาน" icon={Sparkles} text={reading.affirmation} tone="violet" />
    </section>
  );
}

function GuidanceCard({ title, icon: Icon, text, tone }) {
  const tones = {
    cyan: "border-sky-200/20 bg-sky-200/10 text-sky-100",
    gold: "border-amber-200/20 bg-amber-200/10 text-amber-100",
    violet: "border-violet-200/20 bg-violet-200/10 text-violet-100",
    rose: "border-rose-200/20 bg-rose-200/10 text-rose-100",
    emerald: "border-emerald-200/20 bg-emerald-200/10 text-emerald-100"
  };

  return (
    <article className={`rounded-[1.35rem] border p-4 backdrop-blur-xl ${tones[tone]}`}>
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4" />
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">{title}</h3>
      </div>
      <p className="text-base leading-7 text-white">{text}</p>
    </article>
  );
}

function SignalPill({ label, value, icon: Icon, color = "#f8c76b" }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-3 backdrop-blur-xl">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
        <Icon className="h-3.5 w-3.5" style={{ color }} />
        {label}
      </div>
      <p className="mt-2 text-sm font-semibold leading-6 text-white">{value}</p>
    </div>
  );
}

function MobileNav() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-5 rounded-2xl border border-white/10 bg-[#080617]/85 p-2 shadow-[0_0_36px_rgba(0,0,0,.45)] backdrop-blur-2xl lg:hidden">
      {navItems.map(({ label, thai, icon: Icon }) => (
        <a
          key={label}
          href={`#${label.toLowerCase().replaceAll(" ", "-")}`}
          className="grid place-items-center gap-1 rounded-xl px-1 py-2 text-[0.64rem] text-slate-300 transition hover:bg-white/10 hover:text-white"
          aria-label={thai}
        >
          <Icon className="h-4 w-4" />
          <span className="max-w-full truncate">{thai}</span>
        </a>
      ))}
    </nav>
  );
}

function orientationLabel(orientation) {
  return orientation === "upright" ? "พลังเปิดตรง" : "พลังเงา / พลังย้อนกลับ";
}

function orientationMeaning(reading) {
  return reading.orientation === "upright" ? reading.card.uprightMeaningThai : reading.card.reversedMeaningThai;
}

function shortenText(text, maxLength) {
  if (!text || text.length <= maxLength) return text || "";
  return `${text.slice(0, maxLength).trim()}...`;
}
