import { getLayoutProfile } from "../../platform/utils/displayUtils.js";

export function BrandMark({ small = false }) {
  return (
    <div>
      <p className={`${small ? "text-[0.62rem]" : "text-xs"} font-semibold uppercase tracking-[0.28em] text-amber-100`}>Soul of Love</p>
      <p className={`${small ? "mt-1 text-[0.56rem]" : "mt-1 text-[0.65rem]"} uppercase tracking-[0.22em] text-slate-300`}>by Win Soul of Love</p>
    </div>
  );
}

export function ScoreOrb({ reading, size = "normal" }) {
  const orbSize = size === "large" ? "h-24 w-24" : size === "small" ? "h-14 w-14" : "h-16 w-16";
  const scoreSize = size === "large" ? "text-4xl" : size === "small" ? "text-xl" : "text-2xl";

  return (
    <div
      className={`grid ${orbSize} shrink-0 place-items-center rounded-full border bg-white/[0.08] text-center backdrop-blur-xl`}
      style={{ borderColor: `${reading.aura.hex}66`, boxShadow: `0 0 32px ${reading.aura.hex}33` }}
    >
      <span className={`${scoreSize} font-semibold text-white`}>{reading.energyScore}</span>
      <span className="-mt-5 text-[0.52rem] uppercase tracking-[0.18em] text-slate-300">score</span>
    </div>
  );
}

export function CardIdentity({ reading, align = "left", size = "normal" }) {
  const centered = align === "center" ? "text-center" : "";
  const layout = getLayoutProfile(reading);
  const titleSize = size === "large" ? layout.exportTitleClass : size === "small" ? "text-xl" : "text-2xl";

  return (
    <div className={centered}>
      <p className="text-[0.66rem] uppercase tracking-[0.22em] text-slate-400">Daily Energy</p>
      <h4 className={`mt-2 ${titleSize} line-clamp-2 font-semibold text-white`}>{reading.card.thaiName}</h4>
      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-amber-100">{reading.card.englishName}</p>
    </div>
  );
}

export function AdaptiveQuote({ text, maxLength = 140, className = "", align = "left" }) {
  const alignClass = align === "center" ? "text-center" : "";

  return (
    <div className="relative overflow-hidden">
      <blockquote
        className={`${alignClass} ${className}`}
        style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 3, overflow: "hidden" }}
      >
        "{text && text.length > maxLength ? `${text.slice(0, maxLength).trim()}...` : text}"
      </blockquote>
    </div>
  );
}

export function GlassQuoteBox({ quote, className = "", align = "center" }) {
  const alignClass = align === "center" ? "text-center" : "";

  return (
    <div className={`rounded-[1.25rem] border border-white/12 bg-white/[0.08] px-4 py-4 backdrop-blur-xl ${className}`}>
      <blockquote
        className={`${alignClass} text-white`}
        style={{ display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 3, overflow: "hidden" }}
      >
        "{quote}"
      </blockquote>
    </div>
  );
}

export function EnergyMeta({ reading, compact = false }) {
  const badgeClass = `rounded-full border px-3 py-1.5 font-semibold tracking-[0.1em] backdrop-blur-xl ${compact ? "text-[0.58rem]" : "text-[0.64rem]"}`;

  return (
    <div className={`flex flex-col ${compact ? "gap-1.5" : "gap-2"}`}>
      <div className={`flex flex-nowrap ${compact ? "gap-1.5" : "gap-2"}`}>
        <span className={`${badgeClass} min-w-0 whitespace-nowrap bg-amber-100/10 text-amber-100`} style={{ borderColor: "rgba(248,199,107,.34)" }}>
          {reading.orientation === "upright" ? "Upright / พลังเปิด" : "Reversed / พลังทบทวน"}
        </span>
        <span
          className={`${badgeClass} min-w-0 whitespace-nowrap bg-white/[0.055]`}
          style={{ borderColor: `${reading.aura.hex}55`, color: reading.aura.hex, boxShadow: `0 0 18px ${reading.aura.hex}22` }}
        >
          {reading.aura.name}
        </span>
      </div>
      <span className={`${badgeClass} w-fit max-w-full truncate border-white/10 bg-white/[0.045] text-slate-300`}>
        {reading.card.energyTheme}
      </span>
    </div>
  );
}

export function SignalPill({ label, value, icon: Icon, color = "#f8c76b" }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 backdrop-blur-xl">
      <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.06]" style={{ color }}>
        <Icon className="h-4.5 w-4.5" />
      </span>
      <span>
        <span className="block text-[0.68rem] uppercase tracking-[0.18em] text-slate-400">{label}</span>
        <span className="mt-1 block text-sm font-semibold text-white">{value}</span>
      </span>
    </div>
  );
}
