"use client";

import { useEffect, useMemo, useState } from "react";
import TarotDeckStage from "./TarotDeckStage.jsx";
import TarotHeader from "./TarotHeader.jsx";
import TarotReadingResult from "./TarotReadingResult.jsx";
import ReadingHistory from "./ReadingHistory.jsx";
import { tarotDeck } from "../data/tarotDeck.js";
import { spreadDefinitions } from "../data/tarotSpreadDefinitions.js";
import { drawCards } from "../lib/tarotRandom.js";
import { buildCopySummary, compactHistoryItem, createReading, restoreReadingFromHistory } from "../lib/tarotReading.js";
import { validateTarotDeck } from "../lib/tarotValidation.js";

const STORAGE_KEY = "soul-of-love-tarot-compass-history-v1";

function safeLoadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function safeSaveHistory(history) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 10)));
  } catch {
    // Local history is optional; the app remains usable if storage is unavailable.
  }
}

export default function TarotApp() {
  const [spreadId, setSpreadId] = useState("one");
  const [allowReversed, setAllowReversed] = useState(false);
  const [phase, setPhase] = useState("idle");
  const [reading, setReading] = useState(null);
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);

  useMemo(() => validateTarotDeck(tarotDeck), []);

  useEffect(() => {
    setHistory(safeLoadHistory());
  }, []);

  function storeReading(nextReading) {
    const item = compactHistoryItem(nextReading);
    setHistory((current) => {
      const next = [item, ...current.filter((entry) => entry.id !== item.id)].slice(0, 10);
      safeSaveHistory(next);
      return next;
    });
  }

  function handleDraw() {
    if (phase === "shuffling" || phase === "revealing") return;
    const spread = spreadDefinitions[spreadId];
    setCopied(false);
    setPhase("shuffling");
    window.setTimeout(() => {
      const drawn = drawCards(tarotDeck, spread.positions.length, allowReversed);
      setPhase("revealing");
      window.setTimeout(() => {
        const nextReading = createReading({ spreadId, drawnCards: drawn, allowReversed });
        setReading(nextReading);
        storeReading(nextReading);
        setPhase("revealed");
      }, 360);
    }, 520);
  }

  function handleClear() {
    setReading(null);
    setCopied(false);
    setPhase("idle");
  }

  async function handleCopy() {
    if (!reading) return;
    const text = buildCopySummary(reading);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function handleRestore(item) {
    const restored = restoreReadingFromHistory(item, tarotDeck);
    setSpreadId(item.spreadId);
    setReading(restored);
    setCopied(false);
    setPhase("revealed");
  }

  function handleDeleteHistory(id) {
    setHistory((current) => {
      const next = current.filter((item) => item.id !== id);
      safeSaveHistory(next);
      return next;
    });
  }

  function handleClearHistory() {
    setHistory([]);
    safeSaveHistory([]);
  }

  return (
    <main className="app-shell">
      <TarotHeader />
      <TarotDeckStage
        spreadId={spreadId}
        setSpreadId={setSpreadId}
        allowReversed={allowReversed}
        setAllowReversed={setAllowReversed}
        phase={phase}
        hasReading={Boolean(reading)}
        onDraw={handleDraw}
        onClear={handleClear}
      />
      <TarotReadingResult reading={reading} onCopy={handleCopy} copied={copied} />
      <section className="method-note">
        <details>
          <summary>ระบบนี้อ้างอิงอะไร?</summary>
          <p>
            โครงสร้างสำหรับใช้ไพ่ทาโร่ 78 ใบในแนว Rider-Waite-Smith ส่วนธาตุและทิศทาง แอปเลือกใช้ระบบ
            เหนือ-ดิน ตะวันออก-ลม ใต้-ไฟ ตะวันตก-น้ำ อย่างสม่ำเสมอ
          </p>
          <p>
            Major Arcana แสดงทั้ง correspondence หลัก และธาตุที่ใช้ในระบบ เพื่อไม่ทำให้เข้าใจว่าทุกสำนักจัดธาตุเหมือนกันทั้งหมด
            ความหมายภาษาไทยในแอปเป็นการเรียบเรียงใหม่เพื่อการสะท้อนตนเอง ไม่ใช่การคัดลอกคู่มือสมัยใหม่
          </p>
        </details>
      </section>
      <ReadingHistory history={history} onRestore={handleRestore} onDelete={handleDeleteHistory} onClear={handleClearHistory} />
      <footer className="footer-note">
        <strong>Soul of Love Tarot Compass</strong>
        <span>Symbolic self-reflection · no backend · no personal data collection</span>
      </footer>
    </main>
  );
}
