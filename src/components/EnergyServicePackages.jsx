import React, { useState } from "react";
import { ArrowUpRight, CheckCircle2, Copy, MessageCircle, Sparkles } from "lucide-react";
import { contactLinks, externalLinkProps } from "../data/contactLinks.js";
import { energyMethodItems, energyServicePackages } from "../data/energyServicePackages.js";

function PackageCTA({ item, copiedPackage, onCopy }) {
  return (
    <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
      <a
        href={contactLinks.lineOA.url}
        {...externalLinkProps}
        aria-label={`${item.ctaLabel} ผ่าน LINE OA`}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-emerald-200/35 bg-emerald-200/12 px-4 py-2.5 text-sm font-black text-emerald-100 shadow-[0_0_30px_rgba(52,211,153,.12)] transition hover:bg-emerald-200/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-100"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        {item.ctaLabel}
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
      <button
        type="button"
        onClick={() => onCopy(item)}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-cyan-200/30 hover:bg-cyan-200/10 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-100"
        aria-live="polite"
      >
        <Copy className="h-4 w-4" aria-hidden="true" />
        {copiedPackage === item.id ? "คัดลอกข้อความแล้ว" : "คัดลอกข้อความทัก"}
      </button>
    </div>
  );
}

function ServicePackageCard({ item, copiedPackage, onCopy }) {
  return (
    <article
      className={`relative overflow-hidden rounded-[1.5rem] border p-5 backdrop-blur-2xl ${
        item.featured
          ? "border-amber-200/35 bg-amber-200/[0.075] shadow-[0_0_48px_rgba(248,199,107,.16)]"
          : "border-white/10 bg-white/[0.045] shadow-[0_0_34px_rgba(109,40,217,.1)]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(248,199,107,.16),transparent_32%),radial-gradient(circle_at_88%_18%,rgba(125,211,252,.11),transparent_28%)]" />
      <div className="relative">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            {item.badge ? (
              <span className="mb-3 inline-flex rounded-full border border-amber-200/30 bg-amber-200/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-amber-100">
                {item.badge}
              </span>
            ) : null}
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">{item.titleEn}</p>
            <h3 className="mt-2 text-xl font-black text-white">{item.titleTh}</h3>
          </div>
          <div className="rounded-2xl border border-amber-200/25 bg-slate-950/55 px-3 py-2 text-right">
            <p className="text-2xl font-black text-amber-100">{item.price}</p>
            <p className="mt-1 text-xs text-slate-400">{item.duration}</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
        <ul className="mt-4 space-y-2">
          {item.includes.map((include) => (
            <li key={include} className="flex gap-2 text-sm leading-6 text-slate-300">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-100" aria-hidden="true" />
              <span>{include}</span>
            </li>
          ))}
        </ul>
        <PackageCTA item={item} copiedPackage={copiedPackage} onCopy={onCopy} />
      </div>
    </article>
  );
}

function EnergyMethodCard() {
  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-5 shadow-[0_0_34px_rgba(14,165,233,.08)] backdrop-blur-2xl">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-2xl border border-cyan-200/25 bg-cyan-200/10 text-cyan-100">
          <Sparkles className="h-4.5 w-4.5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Energy Reflection Index</p>
          <h3 className="mt-1 text-xl font-black text-white">เราอ่านพลังงานจากอะไร?</h3>
        </div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-5">
        {energyMethodItems.map((item, index) => (
          <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <span className="text-xs font-black text-amber-100">{String(index + 1).padStart(2, "0")}</span>
            <h4 className="mt-2 text-sm font-bold text-white">{item.title}</h4>
            <p className="mt-2 text-xs leading-5 text-slate-400">{item.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 rounded-2xl border border-amber-200/20 bg-amber-200/[0.06] px-4 py-3 text-xs leading-6 text-amber-50/85">
        ระบบนี้เป็นการประเมินเชิงสัญลักษณ์เพื่อการสะท้อนตนเอง ไม่ใช่เครื่องมือวัดทางวิทยาศาสตร์
        ไม่ใช่คำแนะนำทางการแพทย์ และไม่ใช่คำทำนายตายตัว
      </p>
    </article>
  );
}

export function EnergyServicePackages() {
  const [copiedPackage, setCopiedPackage] = useState("");

  async function copyInquiry(item) {
    await navigator.clipboard.writeText(`${item.inquiryMessage}\nLINE Official: ${contactLinks.lineOA.id}`);
    setCopiedPackage(item.id);
    window.setTimeout(() => setCopiedPackage(""), 1600);
  }

  return (
    <section className="space-y-5 pb-8" aria-labelledby="energy-service-title">
      <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_0_42px_rgba(109,40,217,.12)] backdrop-blur-2xl sm:p-6">
        <div className="max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-100">Soul of Love Service</p>
          <h2 id="energy-service-title" className="mt-3 text-2xl font-black leading-tight text-white sm:text-4xl">
            จากผลพลังงานเบื้องต้น สู่การอ่านที่ตรงกับชีวิตจริง
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
            ผลฟรีช่วยให้เห็นภาพรวมของพลังงานในวันนี้ แต่การอ่านให้ตรงกับชีวิตจริงต้องเชื่อมคะแนนพลังงาน ไพ่ ออร่า
            ความสัมพันธ์ งาน การเงิน และบริบทที่คุณกำลังเผชิญอยู่ ผ่านการพูดคุยกับ Win Soul of Love
          </p>
        </div>
      </div>

      <EnergyMethodCard />

      <div className="grid gap-4 xl:grid-cols-3">
        {energyServicePackages.map((item) => (
          <ServicePackageCard key={item.id} item={item} copiedPackage={copiedPackage} onCopy={copyInquiry} />
        ))}
      </div>
    </section>
  );
}
