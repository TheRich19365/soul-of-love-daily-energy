import { motion } from "framer-motion";
import { Activity, BriefcaseBusiness, CircleDot, Coins, Compass, Heart, Orbit, ShieldAlert, Sparkles, Wand2, Waves } from "lucide-react";
import { AdaptiveQuote } from "./common/SoulUI.jsx";
import { orientationLabel, orientationMeaning } from "../platform/utils/displayUtils.js";
import { revealContainer, revealItem } from "../platform/config/uiConstants.js";

export function ReadingSectionHeader({ onDraw, disabled }) {
  return (
    <motion.header variants={revealItem} className="lg:col-span-2">
      <div className="flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-2xl sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-amber-100">Today's Reading</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">รายละเอียดพลังงานประจำวันนี้</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
            ข้อมูลเชิงลึกทั้งหมดถูกย้ายมาไว้ส่วนนี้ เพื่อให้โปสเตอร์ด้านบนเป็นประสบการณ์หลักที่สะอาดและพรีเมียม
          </p>
        </div>
        <button
          type="button"
          onClick={onDraw}
          disabled={disabled}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-200/35 bg-amber-200/12 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-amber-100 transition hover:bg-amber-200/18 disabled:cursor-wait disabled:opacity-70"
        >
          <Wand2 className="h-4 w-4" />
          Draw Again
        </button>
      </div>
    </motion.header>
  );
}

export function DailySummary({ reading }) {
  return (
    <motion.section
      id="energy-status"
      variants={revealItem}
      className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4 backdrop-blur-2xl"
    >
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
    </motion.section>
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


export function DailyInsights({ reading }) {
  return (
    <motion.section id="soul-message" variants={revealContainer} className="grid gap-5 sm:grid-cols-2">
      <motion.article variants={revealItem} className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4 backdrop-blur-2xl sm:col-span-2">
        <div className="mb-2 flex items-center gap-2 text-amber-100">
          <Orbit className="h-4 w-4" />
          <h2 className="text-base font-semibold">ข้อความจากจักรวาล</h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <AdaptiveQuote text={reading.universeMessage} maxLength={140} className="text-lg font-medium leading-7 text-white sm:text-xl sm:leading-8" />
        </motion.div>
      </motion.article>

      <GuidanceCard title="คำแนะนำสำหรับวันนี้" icon={Wand2} text={reading.guidance} tone="violet" />
      <GuidanceCard title="ภารกิจวันนี้" icon={CircleDot} text={reading.mission} tone="cyan" />
      <GuidanceCard title="ข้อความจากจิตวิญญาณ" icon={Waves} text={reading.soulMessage} tone="gold" />
      <GuidanceCard title="ความรักวันนี้" icon={Heart} text={reading.love} tone="rose" />
      <GuidanceCard title="งาน / เส้นทางวันนี้" icon={BriefcaseBusiness} text={reading.work} tone="cyan" />
      <GuidanceCard title="เงิน / คุณค่า / ทรัพยากร" icon={Coins} text={reading.money} tone="emerald" />
      <GuidanceCard title="จุดโฟกัสวันนี้" icon={Compass} text={reading.focus || reading.focusPoint} tone="cyan" />
      <GuidanceCard title="คำเตือนจากจักรวาล" icon={ShieldAlert} text={reading.warning} tone="gold" />
      <GuidanceCard title="คำยืนยันพลังงาน" icon={Sparkles} text={reading.affirmation} tone="violet" />
    </motion.section>
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
    <motion.article variants={revealItem} className={`rounded-[1.35rem] border p-4 backdrop-blur-xl ${tones[tone]}`}>
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4" />
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em]">{title}</h3>
      </div>
      <p className="text-base leading-7 text-white">{text}</p>
    </motion.article>
  );
}

export function ProductInfoPanel() {
  const details = [
    ["Version", "1.0.0-rc1"],
    ["Design Bible", "v1.0"],
    ["Hero Artwork Progress", "3 / 22 test assets"],
    ["Reading Engine", "Layered Narrative v2"],
    ["Last Updated", "2026-06-27"]
  ];

  return (
    <motion.footer
      variants={revealItem}
      className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-4 text-slate-300 shadow-[0_0_42px_rgba(109,40,217,.14)] backdrop-blur-2xl lg:col-span-2"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-100">Soul of Love Daily Energy</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">Copyright Win Soul of Love</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {details.map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/35 px-3 py-2">
              <p className="text-[0.62rem] uppercase tracking-[0.18em] text-slate-500">{label}</p>
              <p className="mt-1 text-xs font-semibold leading-5 text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}


