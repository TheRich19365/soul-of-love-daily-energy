import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import { AdaptiveQuote } from "./common/SoulUI.jsx";
import { getLayoutProfile, orientationLabel } from "../platform/utils/displayUtils.js";
import { getAuraRendering } from "../visual/auraRendering.js";

export function DailyDraw({ reading, drawPhase, hasDrawn }) {
  const isRevealed = drawPhase === "revealed";
  const layout = getLayoutProfile(reading);

  return (
    <section id="daily-draw" className="relative">
      <AnimatePresence mode="wait">
        <motion.article
          key={reading.id}
          initial={{ opacity: 0, rotateY: -25, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, rotateY: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, rotateY: 35, y: -20, scale: 0.94 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className={`relative mx-auto rounded-[2rem] border border-white/12 bg-white/[0.065] p-4 shadow-[0_0_70px_rgba(109,40,217,.28)] backdrop-blur-2xl max-w-md`}
        >
          <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-white/24 via-transparent to-amber-200/20 opacity-70" />
          <div className="relative overflow-hidden rounded-[1.55rem] border border-white/10 bg-[#080617] p-4">
            <TarotSimulation reading={reading} phase={drawPhase} />
            <div className="mt-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">ไพ่ที่เปิดได้</p>
                <h2 className={`mt-1 line-clamp-2 font-semibold ${layout.pressure === "high" ? "text-lg leading-6" : layout.pressure === "medium" ? "text-xl leading-7" : "text-2xl leading-8"}`}>
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
  const auraRender = getAuraRendering(reading.aura, reading.orientation);

  return (
    <motion.div
      className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem] border border-white/12 bg-slate-950 perspective-1000"
      whileHover={{ scale: 1.015 }}
      style={{
        background: auraRender.frame.innerBase,
        borderColor: auraRender.frame.borderColor,
        boxShadow: auraRender.cardGlow
      }}
    >
      <div className="absolute inset-0 opacity-90" style={{ background: auraRender.fieldBackground }} />
      <div className="absolute inset-0 opacity-50 mix-blend-screen" style={{ background: `linear-gradient(135deg, transparent, ${auraRender.lightReflection} 36%, transparent 52%, ${auraRender.metallicReflection})` }} />
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
  const [heroFailed, setHeroFailed] = useState(false);
  const heroArtwork = reading.card.artwork?.hero;
  const showHeroArtwork = Boolean(heroArtwork && !heroFailed);
  const layout = getLayoutProfile(reading);
  const auraRender = getAuraRendering(reading.aura, reading.orientation);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0" style={{ background: auraRender.fieldBackground }} />
      <div className="absolute inset-0 opacity-55 mix-blend-screen" style={{ background: `linear-gradient(130deg, ${auraRender.lightReflection}, transparent 34%, ${auraRender.glassRefraction} 62%, transparent)` }} />
      <motion.div
        className="absolute -inset-16 rounded-full opacity-60 blur-2xl"
        animate={{ opacity: auraRender.isShadow ? [0.2, 0.38, 0.2] : [0.32, 0.68, 0.32], scale: auraRender.isShadow ? [0.94, 1.03, 0.94] : [0.9, 1.09, 0.9] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: `radial-gradient(circle, ${auraRender.coreGlow}, ${auraRender.outerBloom}, transparent 68%)` }}
      />
      <SoulSignatureField aura={reading.aura} orientation={reading.orientation} density="card" />
      <div className="absolute inset-x-0 top-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-100">Major Arcana {reading.card.id}</p>
      </div>
      <div className="absolute inset-0 grid place-items-center px-5">
        {showHeroArtwork ? (
          <HeroCardArtwork reading={reading} onError={() => setHeroFailed(true)} artworkClass={layout.artworkClass} />
        ) : (
          <CardSymbol cardId={reading.card.id} aura={reading.aura} orientation={reading.orientation} animated={false} sizeClass={layout.symbolClass} />
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4 pb-5">
        <div
          className="rounded-2xl border bg-black/32 px-4 py-3 text-center backdrop-blur-xl"
          style={{
            borderColor: auraRender.frame.rimColor,
            background: auraRender.isShadow ? "rgba(2,1,8,.48)" : "rgba(0,0,0,.28)",
            boxShadow: `0 0 28px ${auraRender.outerBloom}, inset 0 1px 0 ${auraRender.lightReflection}`
          }}
        >
          <p className="mb-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-300">Major Arcana</p>
          <p className={`${layout.titleClass} line-clamp-2 font-semibold text-white`}>{reading.card.thaiName}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-amber-100">{reading.card.englishName}</p>
        </div>
      </div>
    </div>
  );
}

function HeroCardArtwork({ reading, onError, artworkClass = "h-[86%] w-[86%]" }) {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = !reduceMotion;
  const auraRender = getAuraRendering(reading.aura, reading.orientation);

  return (
    <motion.div
      initial={shouldAnimate ? { opacity: 0, scale: 0.95, filter: "blur(10px)" } : false}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${artworkClass} rounded-[1.15rem] border bg-slate-950`}
      style={{
        borderColor: auraRender.frame.borderColor,
        background: auraRender.frame.frameBase,
        boxShadow: auraRender.artworkGlow
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-[1.15rem] opacity-90"
        style={{ background: auraRender.frame.frameBase }}
      />
      <motion.div
        className="pointer-events-none absolute -inset-3 rounded-[1.45rem]"
        animate={shouldAnimate ? { opacity: auraRender.isShadow ? [0.16, 0.3, 0.16] : [0.24, 0.48, 0.24], scale: auraRender.isShadow ? [0.99, 1.01, 0.99] : [0.985, 1.018, 0.985] } : { opacity: 0.24, scale: 1 }}
        transition={shouldAnimate ? { duration: 8.4, repeat: Infinity, ease: "easeInOut" } : undefined}
        style={{ boxShadow: auraRender.artworkGlow }}
      />
      <div className="relative m-[2px] h-[calc(100%-4px)] w-[calc(100%-4px)] overflow-hidden rounded-[1.05rem]">
        <img
          src={reading.card.artwork.hero}
          alt=""
          className={`h-full w-full object-cover ${auraRender.isShadow ? "brightness-[0.88] contrast-[1.08] saturate-[0.92]" : "brightness-[1.06] contrast-[1.04] saturate-[1.08]"}`}
          onError={onError}
          draggable="false"
        />
        <div className="absolute inset-0 mix-blend-screen" style={{ background: auraRender.artworkOverlay }} />
        <div className="absolute inset-0 opacity-70" style={{ background: `radial-gradient(circle at 50% 20%, ${auraRender.volumetricRays}, transparent 34%), linear-gradient(120deg, transparent 8%, ${auraRender.lightReflection} 18%, transparent 32%, ${auraRender.metallicReflection} 80%, transparent)` }} />
        {shouldAnimate && (
          <motion.div
            className="pointer-events-none absolute -inset-y-10 -left-1/2 w-1/3 rotate-12 blur-xl"
            animate={{ x: ["0%", "520%"], opacity: auraRender.isShadow ? [0, 0.12, 0] : [0, 0.24, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 10.5, ease: "easeInOut" }}
            style={{ background: auraRender.lightReflection }}
          />
        )}
        <div className="absolute inset-0 rounded-[1.05rem] ring-1 ring-inset" style={{ boxShadow: `inset 0 0 28px ${auraRender.frame.metalColor}`, borderColor: auraRender.frame.rimColor }} />
      </div>
    </motion.div>
  );
}

export function SoulSignatureField({ aura, orientation = "upright", density = "card" }) {
  const isExport = density === "export";
  const reduceMotion = useReducedMotion();
  const shouldAnimate = !isExport && !reduceMotion;
  const auraRender = getAuraRendering(aura, orientation);
  const ringInset = isExport ? "inset-[16%]" : "inset-[12%]";
  const ringOpacity = isExport ? 0.2 : auraRender.isShadow ? 0.18 : 0.28;
  const axisOpacity = isExport ? 0.18 : auraRender.isShadow ? 0.12 : 0.2;
  const dust = isExport
    ? [
        ["18%", "22%", "0.28"], ["72%", "19%", "0.26"], ["84%", "38%", "0.2"],
        ["39%", "78%", "0.26"], ["82%", "83%", "0.22"]
      ]
    : [
        ["18%", "28%", "0.22"], ["72%", "24%", "0.22"], ["83%", "44%", "0.16"],
        ["45%", "80%", "0.24"], ["70%", "70%", "0.18"]
      ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className={`absolute ${ringInset} rounded-full border`}
        animate={shouldAnimate ? { opacity: [ringOpacity * 0.72, ringOpacity, ringOpacity * 0.72], rotate: [0, 2.5], scale: [0.985, 1.018, 0.985] } : { opacity: ringOpacity, rotate: 0, scale: 1 }}
        transition={shouldAnimate ? { duration: 12, repeat: Infinity, ease: "easeInOut" } : undefined}
        style={{
          borderColor: `${aura.hex}66`,
          boxShadow: auraRender.isShadow
            ? `0 0 28px ${auraRender.outerBloom}, inset 0 0 34px ${auraRender.glassRefraction}`
            : `0 0 42px ${auraRender.outerBloom}, 0 0 72px ${auraRender.coreGlow}, inset 0 0 32px ${auraRender.glassRefraction}`
        }}
      />
      <div className="absolute left-1/2 top-[4%] h-[92%] w-px -translate-x-1/2 overflow-hidden">
        <motion.div
          className="h-full w-full"
          animate={shouldAnimate ? { opacity: [axisOpacity * 0.68, axisOpacity, axisOpacity * 0.68], scaleY: [0.96, 1.04, 0.96] } : { opacity: axisOpacity, scaleY: 1 }}
          transition={shouldAnimate ? { duration: 7.2, repeat: Infinity, ease: "easeInOut" } : undefined}
          style={{
            background: auraRender.isShadow
              ? "linear-gradient(180deg, transparent, rgba(148,163,184,.35) 20%, rgba(255,255,255,.18) 50%, rgba(76,29,149,.26) 82%, transparent)"
              : "linear-gradient(180deg, transparent, rgba(248,199,107,.62) 18%, rgba(255,255,255,.4) 50%, rgba(248,199,107,.56) 82%, transparent)",
            boxShadow: auraRender.isShadow ? "0 0 14px rgba(203,213,225,.24)" : "0 0 18px rgba(248,199,107,.38)",
            transformOrigin: "center"
          }}
        />
        {shouldAnimate && (
          <motion.div
            className="absolute left-0 h-1/4 w-full"
            animate={{ top: ["-24%", "108%"], opacity: [0, 0.55, 0] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
            style={{
            background: `linear-gradient(180deg, transparent, ${auraRender.lightReflection}, transparent)`,
            boxShadow: auraRender.isShadow ? `0 0 14px ${auraRender.outerBloom}` : "0 0 18px rgba(248,199,107,.5)"
          }}
        />
        )}
      </div>
      <motion.div
        className="absolute left-[13%] right-[13%] top-[29%] bottom-[29%] rounded-full border"
        animate={shouldAnimate ? { rotate: 360 } : { rotate: 0 }}
        transition={shouldAnimate ? { duration: 140, repeat: Infinity, ease: "linear" } : undefined}
        style={{ borderColor: auraRender.isShadow ? `${aura.hex}16` : `${aura.hex}24`, transformOrigin: "center" }}
      />
      {dust.map(([left, top, opacity], index) => (
        <motion.span
          key={`${left}-${top}-${index}`}
          className="absolute h-1 w-1 rounded-full blur-[.5px]"
          animate={shouldAnimate
            ? {
                x: [0, index % 2 ? 7 : -6, 0],
                y: [0, index % 3 ? -9 : 8, 0],
                opacity: [Number(opacity) * 0.45, Number(opacity), Number(opacity) * 0.5]
              }
            : { opacity: Number(opacity) * 0.65 }}
          transition={shouldAnimate
            ? {
                duration: 12 + index * 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.38
              }
            : undefined}
          style={{
            left,
            top,
            background: index % 3 === 0 ? auraRender.particle : aura.hex,
            boxShadow: `0 0 12px ${index % 3 === 0 ? auraRender.coreGlow : auraRender.outerBloom}`
          }}
        />
      ))}
    </div>
  );
}

export function CardSymbol({ cardId, aura, orientation = "upright", animated = true, sizeClass = "h-[86%] w-[86%]" }) {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = animated && !reduceMotion;
  const auraRender = getAuraRendering(aura, orientation);
  const stroke = aura.hex;
  const common = {
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  return (
    <motion.svg
      viewBox="0 0 220 220"
      className={`${sizeClass} ${auraRender.isShadow ? "drop-shadow-[0_0_18px_rgba(148,163,184,.18)]" : "drop-shadow-[0_0_24px_rgba(248,199,107,.28)]"}`}
      animate={shouldAnimate ? { y: [0, -6, 0] } : { y: 0 }}
      transition={shouldAnimate ? { duration: 4.2, repeat: Infinity, ease: "easeInOut" } : undefined}
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
  const auraRender = getAuraRendering(aura, "upright");
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[1.15rem] border border-amber-100/25 bg-[#080514] [backface-visibility:hidden]">
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 42%, ${auraRender.coreGlow}, transparent 28%), linear-gradient(160deg, rgba(248,199,107,.22), transparent 42%, ${auraRender.glassRefraction})` }} />
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
  const auraRender = getAuraRendering(aura, "upright");
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
          style={{ boxShadow: `0 0 28px ${auraRender.outerBloom}` }}
        />
      ))}
    </div>
  );
}
