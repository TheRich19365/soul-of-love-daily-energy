import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  Clock3,
  Compass,
  LockKeyhole,
  MessageCircle,
  ScrollText,
  Sparkles
} from "lucide-react";
import { contactLinks, externalLinkProps } from "../data/contactLinks.js";
import {
  auspiciousLevels,
  futureEngineRoadmap,
  knowledgeAccordions,
  lockedDeepWisdomCards,
  personalPreviewPools,
  sourceTraceDefinitions,
  timingWindows,
  weekdayGuidance
} from "../data/thaiWisdomData.js";

function reduceNumber(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (!digits) return 0;
  let total = [...digits].reduce((sum, digit) => sum + Number(digit), 0);
  while (total > 9) {
    total = String(total).split("").reduce((sum, digit) => sum + Number(digit), 0);
  }
  return total || 9;
}

function normalizeYear(year, yearType) {
  const numericYear = Number(year);
  if (!numericYear) return 0;
  return yearType === "BE" ? numericYear - 543 : numericYear;
}

function isValidBirthDate(day, month, year, yearType) {
  const numericDay = Number(day);
  const numericMonth = Number(month);
  const adYear = normalizeYear(year, yearType);

  if (!numericDay || !numericMonth || !adYear) return false;
  const date = new Date(adYear, numericMonth - 1, numericDay);
  return date.getFullYear() === adYear && date.getMonth() === numericMonth - 1 && date.getDate() === numericDay;
}

function getLocalDateInputValue(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseSelectedDate(selectedDate) {
  if (!selectedDate) return new Date();
  const date = new Date(`${selectedDate}T12:00:00`);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function getTodaySnapshot(selectedDate) {
  const now = parseSelectedDate(selectedDate);
  const dayIndex = now.getDay();
  const guidance = weekdayGuidance[dayIndex];
  const level = auspiciousLevels[(now.getDate() + dayIndex) % auspiciousLevels.length];
  const dateLabel = now.toLocaleDateString("th-TH", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return { dateLabel, dayName: guidance.dayName, guidance, level };
}

function createPersonalPreview(form, selectedDate) {
  const adYear = normalizeYear(form.year, form.yearType);
  const targetDate = parseSelectedDate(selectedDate);
  const seed = reduceNumber(`${getLocalDateInputValue(targetDate)}${form.day}${form.month}${adYear}${form.question.length}`);
  const preview = personalPreviewPools[seed % personalPreviewPools.length];
  const questionTone = form.question.trim()
    ? `คำถามของคุณพาโฟกัสไปที่ “${form.question.trim()}” จึงเหมาะกับการดูจังหวะอย่างใจเย็นก่อนตอบสนอง`
    : "วันนี้เหมาะกับการเลือกคำถามหลักเพียงหนึ่งเรื่อง เพื่อให้พลังไม่กระจายเกินไป";

  return {
    seed,
    questionTone,
    ...preview
  };
}

export function ThaiWisdomSection() {
  const [selectedDate, setSelectedDate] = useState(() => getLocalDateInputValue());
  const snapshot = useMemo(() => getTodaySnapshot(selectedDate), [selectedDate]);
  const [openNote, setOpenNote] = useState(0);
  const [form, setForm] = useState({
    name: "",
    day: "",
    month: "",
    year: "",
    yearType: "BE",
    question: ""
  });
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!isValidBirthDate(form.day, form.month, form.year, form.yearType)) {
      setPreview(null);
      setError("กรุณากรอกวันเดือนปีเกิดให้ถูกต้องก่อนสร้าง Personal Snapshot");
      return;
    }

    setPreview(createPersonalPreview(form, selectedDate));
  }

  return (
    <section id="thai-wisdom" className="space-y-5 py-8" aria-labelledby="thai-wisdom-title">
      <ThaiWisdomHero />
      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <TodaySnapshot snapshot={snapshot} selectedDate={selectedDate} onDateChange={setSelectedDate} />
        <TimingWindows />
      </div>
      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <PersonalSnapshotForm form={form} error={error} preview={preview} onChange={updateField} onSubmit={handleSubmit} />
        <LockedWisdomLayer />
      </div>
      <KnowledgeNotes openNote={openNote} onToggle={setOpenNote} />
      <SourceTrace />
      <FutureEngineRoadmap />
      <DeepTalkCta />
      <p className="rounded-[1.25rem] border border-white/10 bg-slate-950/35 p-4 text-sm leading-6 text-slate-400">
        เนื้อหานี้เป็นการเรียบเรียงเชิงสัญลักษณ์เพื่อการสะท้อนตนเอง ไม่ใช่การคัดลอกตำรา และไม่ใช่คำทำนายตายตัว
      </p>
    </section>
  );
}

function ThaiWisdomHero() {
  return (
    <article className="relative overflow-hidden rounded-[1.75rem] border border-amber-200/20 bg-white/[0.055] p-5 shadow-[0_0_54px_rgba(248,199,107,.12)] backdrop-blur-2xl sm:p-6">
      <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-amber-200/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-10 h-44 w-44 rounded-full bg-cyan-200/10 blur-3xl" />
      <div className="relative grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-amber-200/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-100">
            <ScrollText className="h-3.5 w-3.5" aria-hidden="true" />
            MVP 0.1 · Symbolic Thai Wisdom Layer
          </div>
          <h2 id="thai-wisdom-title" className="text-2xl font-semibold leading-tight text-white sm:text-4xl">
            ฤกษ์ดี · Soul of Love Thai Wisdom
          </h2>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-200">
            ดูฤกษ์งามยามดีแบบเข้าใจง่าย เชื่อมภูมิปัญญาไทยเข้ากับการใช้ชีวิตจริง
          </p>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">
            พื้นที่นี้ออกแบบให้เป็นแนวทางเบื้องต้นสำหรับดูจังหวะของวัน เหมาะกับการเริ่มต้น วางแผน ทบทวน
            และเลือกเวลาที่สอดคล้องกับพลังของตัวเอง โดยไม่ฟันธงชะตาชีวิต
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">Positioning</p>
          <p className="mt-2 leading-6">ฤกษ์ดีแบบเข้าใจง่าย · ใช้ได้จริงในชีวิตประจำวัน · ใช้เป็นแนวทางประกอบการตัดสินใจ</p>
        </div>
      </div>
    </article>
  );
}

function TodaySnapshot({ snapshot, selectedDate, onDateChange }) {
  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-2xl">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Today's Auspicious Snapshot</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{snapshot.dateLabel}</h3>
          <p className="mt-1 text-sm text-amber-100">{snapshot.dayName} · ระดับพลัง {snapshot.level.label}</p>
        </div>
        <div className="rounded-2xl border border-amber-200/25 bg-amber-200/10 px-3 py-2 text-right">
          <p className="text-lg font-semibold text-white">{snapshot.level.score}/100</p>
          <p className="text-xs text-amber-100">{snapshot.level.stars}</p>
        </div>
      </div>
      <label className="mb-4 block rounded-2xl border border-white/10 bg-slate-950/35 p-3">
        <span className="block text-xs uppercase tracking-[0.18em] text-slate-400">เลือกวันที่</span>
        <input
          type="date"
          value={selectedDate}
          onChange={(event) => onDateChange(event.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none transition focus:border-cyan-200/45 focus:ring-2 focus:ring-cyan-200/20"
        />
        <span className="mt-2 block text-xs leading-5 text-slate-500">
          ระบบนี้เป็น symbolic date-based preview และสามารถต่อยอดเป็นการคำนวณล่วงหน้า 10 ปีหรือ 100 ปีได้ในอนาคต
        </span>
      </label>
      <p className="rounded-2xl border border-white/10 bg-slate-950/35 p-4 text-sm leading-7 text-slate-200">
        {snapshot.guidance.message}
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <ListCard title="วันนี้เหมาะกับ" items={snapshot.guidance.suitable} tone="cyan" />
        <ListCard title="วันนี้ควรระวัง" items={snapshot.guidance.caution} tone="gold" />
      </div>
    </article>
  );
}

function ListCard({ title, items, tone }) {
  const toneClass = tone === "cyan" ? "border-cyan-200/20 bg-cyan-200/10 text-cyan-100" : "border-amber-200/20 bg-amber-200/10 text-amber-100";

  return (
    <div className={`rounded-2xl border p-4 ${toneClass}`}>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-100">
        {items.map((item) => <li key={item}>• {item}</li>)}
      </ul>
    </div>
  );
}

function TimingWindows() {
  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-2xl">
      <div className="mb-4 flex items-center gap-2 text-amber-100">
        <Clock3 className="h-4 w-4" aria-hidden="true" />
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Simple Daily Timing Windows</p>
          <h3 className="mt-1 text-xl font-semibold text-white">จังหวะเวลาเชิงสัญลักษณ์</h3>
        </div>
      </div>
      <div className="grid gap-3">
        {timingWindows.map((window) => (
          <div key={window.label} className="grid gap-3 rounded-2xl border border-white/10 bg-slate-950/35 p-4 sm:grid-cols-[0.8fr_1.5fr_auto] sm:items-center">
            <div>
              <p className="font-semibold text-white">{window.label}</p>
              <p className="mt-1 text-sm text-slate-400">{window.time}</p>
            </div>
            <p className="text-sm leading-6 text-slate-200">เหมาะกับ: {window.suitable}</p>
            <span className="w-fit rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-1 text-xs font-semibold text-amber-100">
              {window.badge}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-5 text-slate-400">
        ตารางนี้เป็นจังหวะเชิงสัญลักษณ์สำหรับใช้งานทั่วไป ไม่ใช่ฤกษ์ชั้นสูงเฉพาะบุคคล
      </p>
    </article>
  );
}

function PersonalSnapshotForm({ form, error, preview, onChange, onSubmit }) {
  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-2xl">
      <div className="mb-4 flex items-center gap-2 text-cyan-100">
        <CalendarDays className="h-4 w-4" aria-hidden="true" />
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Personal Snapshot Form</p>
          <h3 className="mt-1 text-xl font-semibold text-white">พรีวิวส่วนตัวแบบเบื้องต้น</h3>
        </div>
      </div>
      <form className="grid gap-3" onSubmit={onSubmit}>
        <input className="wisdom-input" value={form.name} onChange={(event) => onChange("name", event.target.value)} placeholder="ชื่อเล่น" />
        <div className="grid gap-3 sm:grid-cols-4">
          <input className="wisdom-input" value={form.day} onChange={(event) => onChange("day", event.target.value)} inputMode="numeric" placeholder="วันเกิด" />
          <input className="wisdom-input" value={form.month} onChange={(event) => onChange("month", event.target.value)} inputMode="numeric" placeholder="เดือนเกิด" />
          <input className="wisdom-input sm:col-span-1" value={form.year} onChange={(event) => onChange("year", event.target.value)} inputMode="numeric" placeholder="ปีเกิด" />
          <select className="wisdom-input" value={form.yearType} onChange={(event) => onChange("yearType", event.target.value)}>
            <option value="BE">พ.ศ.</option>
            <option value="AD">ค.ศ.</option>
          </select>
        </div>
        <textarea
          className="wisdom-input min-h-24 resize-y"
          value={form.question}
          onChange={(event) => onChange("question", event.target.value)}
          placeholder="คำถามหลักของวันนี้"
        />
        {error ? <p className="rounded-xl border border-rose-200/20 bg-rose-200/10 px-3 py-2 text-sm text-rose-100">{error}</p> : null}
        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-cyan-200/30 bg-cyan-200/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-cyan-100 transition hover:bg-cyan-200/16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-100"
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          สร้าง Free Personalized Preview
        </button>
      </form>
      {preview ? <PersonalPreview preview={preview} name={form.name} /> : null}
      <p className="mt-3 text-xs leading-5 text-slate-500">ข้อมูลนี้ประมวลผลในเบราว์เซอร์เท่านั้น ไม่มี backend และไม่ส่งออกไปเก็บบน server</p>
    </article>
  );
}

function PersonalPreview({ preview, name }) {
  const rows = [
    ["พลังที่เปิดในวันนี้", preview.open],
    ["จุดที่ควรระวัง", preview.caution],
    ["คำแนะนำสั้น ๆ", preview.advice],
    ["คำถามสะท้อนตัวเอง", preview.question]
  ];

  return (
    <div className="mt-5 rounded-[1.25rem] border border-cyan-200/20 bg-cyan-200/10 p-4">
      <p className="text-sm font-semibold text-cyan-100">{name ? `Personal Preview · ${name}` : "Personal Preview"}</p>
      <p className="mt-2 text-sm leading-6 text-slate-200">{preview.questionTone}</p>
      <div className="mt-4 grid gap-3">
        {rows.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/35 p-3">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{label}</p>
            <p className="mt-2 text-sm leading-6 text-white">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LockedWisdomLayer() {
  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-2xl">
      <div className="mb-4 flex items-center gap-2 text-amber-100">
        <LockKeyhole className="h-4 w-4" aria-hidden="true" />
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Locked Deep Wisdom Layer</p>
          <h3 className="mt-1 text-xl font-semibold text-white">ชั้นลึกต้องใช้บริบทจริงของชีวิต</h3>
        </div>
      </div>
      <p className="mb-4 text-sm leading-6 text-slate-300">
        ชั้นลึกต้องใช้บริบทจริงของชีวิต ไม่ใช่แค่วันเกิดอย่างเดียว จึงแสดงเป็น preview แบบล็อกไว้สำหรับ Deep Talk
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {lockedDeepWisdomCards.map((card) => (
          <div key={card.title} className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
            <div className="mb-2 flex items-center gap-2 text-amber-100">
              <LockKeyhole className="h-4 w-4" aria-hidden="true" />
              <p className="font-semibold text-white">{card.title}</p>
            </div>
            <p className="text-sm leading-6 text-slate-300">{card.teaser}</p>
            <p className="mt-3 text-xs font-semibold text-amber-100">ปลดล็อกผ่านการพูดคุย</p>
          </div>
        ))}
      </div>
    </article>
  );
}

function KnowledgeNotes({ openNote, onToggle }) {
  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-2xl">
      <div className="mb-4 flex items-center gap-2 text-amber-100">
        <ScrollText className="h-4 w-4" aria-hidden="true" />
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Knowledge Notes</p>
          <h3 className="mt-1 text-xl font-semibold text-white">อ่านแบบเข้าใจง่าย ไม่งมงาย</h3>
        </div>
      </div>
      <div className="space-y-2">
        {knowledgeAccordions.map((item, index) => {
          const isOpen = openNote === index;
          return (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-950/35">
              <button
                type="button"
                onClick={() => onToggle(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-100"
                aria-expanded={isOpen}
              >
                {item.title}
                <ChevronDown className={`h-4 w-4 shrink-0 transition ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {isOpen ? <p className="px-4 pb-4 text-sm leading-6 text-slate-300">{item.content}</p> : null}
            </div>
          );
        })}
      </div>
    </article>
  );
}

function SourceTrace() {
  const traceRows = [
    ["โหมดการคำนวณ", sourceTraceDefinitions.mode],
    ["หลักที่ใช้", sourceTraceDefinitions.calculationType],
    ["ข้อมูลที่ใช้", sourceTraceDefinitions.inputs.join(", ")],
    ["ระดับความละเอียด", sourceTraceDefinitions.sourceLevel],
    ["สิ่งที่ยังไม่เปิดในผลฟรี", sourceTraceDefinitions.lockedReason]
  ];

  return (
    <article className="rounded-[1.5rem] border border-cyan-200/20 bg-cyan-200/10 p-5 backdrop-blur-2xl">
      <div className="mb-4 flex items-center gap-2 text-cyan-100">
        <ScrollText className="h-4 w-4" aria-hidden="true" />
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Source Trace</p>
          <h3 className="mt-1 text-xl font-semibold text-white">ที่มาของผลลัพธ์</h3>
        </div>
      </div>
      <p className="mb-4 rounded-2xl border border-white/10 bg-slate-950/35 p-4 text-sm leading-7 text-slate-200">
        {sourceTraceDefinitions.thaiSummary}
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {traceRows.map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/35 p-3">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{label}</p>
            <p className="mt-2 text-sm leading-6 text-white">{value}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-5 text-slate-400">{sourceTraceDefinitions.accuracyNote}</p>
    </article>
  );
}

function FutureEngineRoadmap() {
  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-2xl">
      <div className="mb-4 flex items-center gap-2 text-amber-100">
        <Sparkles className="h-4 w-4" aria-hidden="true" />
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Future Classical Engine</p>
          <h3 className="mt-1 text-xl font-semibold text-white">ต่อยอดสู่ engine ฤกษ์ละเอียดในอนาคต</h3>
        </div>
      </div>
      <p className="mb-4 text-sm leading-6 text-slate-300">
        ระบบนี้สามารถต่อยอดให้คำนวณล่วงหน้าเป็นช่วง 10 ปีหรือ 100 ปีได้ในอนาคต เมื่อเพิ่ม engine ดาราศาสตร์/ปฏิทินไทยที่ตรวจสอบแหล่งอ้างอิงแล้ว
      </p>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {futureEngineRoadmap.map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/35 px-3 py-2 text-sm leading-6 text-slate-200">
            {item}
          </div>
        ))}
      </div>
    </article>
  );
}

function DeepTalkCta() {
  return (
    <article className="rounded-[1.5rem] border border-emerald-200/20 bg-emerald-200/10 p-5 backdrop-blur-2xl">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2 text-emerald-100">
            <Compass className="h-4 w-4" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-100">Deep Talk CTA</p>
          </div>
          <h3 className="text-2xl font-semibold text-white">อยากอ่านชั้นลึกกว่านี้?</h3>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-200">
            ผลเบื้องต้นช่วยให้เห็นจังหวะของวัน แต่การอ่านให้ตรงชีวิตจริงต้องดูบริบท ความสัมพันธ์ การงาน การตัดสินใจ
            และสิ่งที่กำลังเผชิญอยู่ตอนนี้
          </p>
          <p className="mt-2 text-sm text-slate-300">LINE Official: {contactLinks.lineOa.id}</p>
        </div>
        <a
          href={contactLinks.lineOa.url}
          {...externalLinkProps}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-emerald-200/35 bg-emerald-200/14 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-emerald-100 transition hover:bg-emerald-200/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-100"
          aria-label={`ทัก ${contactLinks.lineOa.label} ${contactLinks.lineOa.id}`}
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          ทัก LINE OA เพื่อคุยต่อ
        </a>
      </div>
    </article>
  );
}
