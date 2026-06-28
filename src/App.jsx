"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Moon,
  Sparkles,
  Sun,
  Wand2
} from "lucide-react";
import { createReading } from "./lib/createReading.js";
import { getReadingAnalyticsPayload, trackEvent, trackPageView } from "./lib/analytics.js";
import { buildPrompt } from "./promptEngine/buildPrompt.js";
import { DailyDraw } from "./components/HeroCard.jsx";
import { DailySummary, DailyInsights, ProductInfoPanel, ReadingSectionHeader } from "./components/ReadingSection.jsx";
import { PromptPanel } from "./components/PromptPanel.jsx";
import { SignalPill } from "./components/common/SoulUI.jsx";
import { modes, navItems, revealContainer } from "./platform/config/uiConstants.js";

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
  const [copiedPrompt, setCopiedPrompt] = useState("");
  const trackedReadingOpenRef = useRef("");
  const today = useThaiDate();

  useEffect(() => {
    trackPageView({ module: "daily_energy" });
  }, []);

  useEffect(() => {
    if (!hasDrawn || drawPhase !== "revealed" || trackedReadingOpenRef.current === reading.id) return;

    trackedReadingOpenRef.current = reading.id;
    trackEvent("open_today_reading", getReadingAnalyticsPayload(reading));
  }, [drawPhase, hasDrawn, reading]);

  function drawEnergy(source = "draw_card") {
    const nextReading = createReading();
    if (source === "draw_again") {
      trackEvent("draw_again", {
        previous_card_id: reading.card?.id,
        timestamp: new Date().toISOString()
      });
    }

    setDrawPhase("shuffle");
    window.setTimeout(() => setDrawPhase("rise"), 900);
    window.setTimeout(() => {
      setReading(nextReading);
      setHasDrawn(true);
      setDrawPhase("flip");
      trackEvent("draw_card", getReadingAnalyticsPayload(nextReading));
    }, 1450);
    window.setTimeout(() => setDrawPhase("revealed"), 2100);
  }

  async function copyArtworkPrompt(platform) {
    const prompt = buildPrompt({ reading, platform, compositionType: "Social Poster" });
    await navigator.clipboard.writeText(prompt);
    trackEvent("copy_ai_poster_prompt", {
      platform_name: platform,
      card_id: reading.card?.id,
      aura: reading.aura?.name,
      orientation: reading.orientation,
      timestamp: new Date().toISOString()
    });
    setCopiedPrompt(platform);
    window.setTimeout(() => setCopiedPrompt(""), 1600);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05030f] text-white">
      <CosmicBackdrop aura={reading.aura} />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <TopBar />

        <section
          id="home"
          className="grid flex-1 gap-5 py-5 lg:grid-cols-[1.03fr_.97fr] lg:items-center"
        >
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
              onClick={() => drawEnergy("draw_card")}
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
          <motion.section
            variants={revealContainer}
            initial="hidden"
            animate="show"
            className="grid gap-6 pb-24 lg:grid-cols-[.9fr_1.1fr] lg:pb-10"
          >
            <ReadingSectionHeader onDraw={() => drawEnergy("draw_again")} disabled={drawPhase !== "idle" && drawPhase !== "revealed"} />
            <DailySummary reading={reading} />
            <DailyInsights reading={reading} />
            <div className="lg:col-span-2">
              <PromptPanel copiedPrompt={copiedPrompt} onCopyPrompt={copyArtworkPrompt} />
            </div>
            <ProductInfoPanel />
          </motion.section>
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
        {navItems.map(({ href, label, icon: Icon }) => (
          <a
            key={label}
            href={href}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
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

function MobileNav() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-5 rounded-2xl border border-white/10 bg-[#080617]/85 p-2 shadow-[0_0_36px_rgba(0,0,0,.45)] backdrop-blur-2xl lg:hidden">
      {navItems.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          className="grid place-items-center gap-1 rounded-xl px-1 py-2 text-[0.64rem] text-slate-300 transition hover:bg-white/10 hover:text-white"
          aria-label={label}
        >
          <Icon className="h-4 w-4" />
          <span className="max-w-full truncate">{label}</span>
        </a>
      ))}
    </nav>
  );
}
