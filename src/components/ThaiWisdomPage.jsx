"use client";

import { ArrowLeft, ArrowUpRight, Mail, MessageCircle, Sparkles } from "lucide-react";
import { contactLinks, externalLinkProps } from "../data/contactLinks.js";
import { EcosystemFooter } from "./ContactAccess.jsx";
import { ThaiWisdomSection } from "./ThaiWisdomSection.jsx";

export function ThaiWisdomPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05030f] text-white">
      <ThaiWisdomBackdrop />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <ThaiWisdomTopNav />
        <ThaiWisdomSection />
        <EcosystemFooter />
      </div>
    </main>
  );
}

function ThaiWisdomTopNav() {
  return (
    <header className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-3 py-3 backdrop-blur-2xl lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl border border-amber-200/30 bg-amber-200/10 shadow-[0_0_24px_rgba(248,199,107,.2)]">
          <Sparkles className="h-5 w-5 text-amber-100" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-none">Soul of Love Thai Wisdom</p>
          <p className="mt-1 text-xs text-slate-400">ฤกษ์ดี · Symbolic Timing Layer</p>
        </div>
      </div>
      <nav className="flex flex-wrap items-center gap-2" aria-label="Thai Wisdom navigation">
        <a
          href={contactLinks.dailyEnergy.localHref}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-300 transition hover:border-amber-200/30 hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-100"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          กลับ Daily Energy
        </a>
        <a
          href={contactLinks.matrix9.url}
          {...externalLinkProps}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-300 transition hover:border-amber-200/30 hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-100"
        >
          Matrix 9
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        <a
          href={contactLinks.portfolioHub.url}
          {...externalLinkProps}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-300 transition hover:border-amber-200/30 hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-100"
        >
          Portfolio Hub
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        <a
          href={contactLinks.lineOA.url}
          {...externalLinkProps}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-emerald-200/35 bg-emerald-200/12 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-100 shadow-[0_0_28px_rgba(52,211,153,.14)] transition hover:bg-emerald-200/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-100"
          aria-label={`เปิด ${contactLinks.lineOA.label} ${contactLinks.lineOA.id}`}
        >
          <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
          LINE OA
        </a>
        <a
          href={contactLinks.email.mailto}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-300 transition hover:border-amber-200/30 hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-100"
        >
          <Mail className="h-3.5 w-3.5" aria-hidden="true" />
          Email
        </a>
      </nav>
    </header>
  );
}

function ThaiWisdomBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(248,199,107,.18),transparent_32%),radial-gradient(circle_at_18%_28%,rgba(34,211,238,.12),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(168,85,247,.14),transparent_28%),linear-gradient(180deg,#070514_0%,#05030f_52%,#020108_100%)]" />
      <div className="absolute left-1/2 top-28 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-amber-200/10 blur-3xl" />
      <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(255,255,255,.38)_1px,transparent_1px)] [background-size:34px_34px]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#05030f] to-transparent" />
    </div>
  );
}
