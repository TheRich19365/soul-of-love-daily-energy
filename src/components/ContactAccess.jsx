import {
  ArrowUpRight,
  CalendarDays,
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  Music2,
  Send,
  Sparkles
} from "lucide-react";
import { contactLinks, externalLinkProps } from "../data/contactLinks.js";

const headerLinks = [
  { key: "portfolioHub", label: "Portfolio Hub", icon: ArrowUpRight, style: "secondary" },
  { key: "matrix9", label: "Matrix 9", icon: Sparkles, style: "secondary" },
  { key: "thaiWisdom", label: "ฤกษ์ดี", icon: CalendarDays, style: "secondary", useLocalHref: true },
  { key: "lineOA", label: "LINE OA", icon: MessageCircle, style: "primary" }
];

const footerLinks = [
  { key: "portfolioHub", icon: ArrowUpRight },
  { key: "dailyEnergy", icon: Sparkles, useLocalHref: true },
  { key: "thaiWisdom", label: "Thai Wisdom / ฤกษ์ดี", icon: CalendarDays, useLocalHref: true },
  { key: "matrix9", icon: Sparkles },
  { key: "lineOA", icon: MessageCircle, value: contactLinks.lineOA.id, primary: true },
  { key: "email", icon: Mail, useMailto: true, value: contactLinks.email.address },
  { key: "facebook", icon: Facebook },
  { key: "instagram", icon: Instagram, value: contactLinks.instagram.handle },
  { key: "youtube", icon: Music2 },
  { key: "suno", icon: Send }
];

function getHref(link, config) {
  if (link.useLocalHref) return config.localHref || config.url;
  return link.useMailto ? config.mailto : config.url;
}

function linkSafetyProps(link) {
  if (link.useLocalHref) return {};
  return link.useMailto ? {} : externalLinkProps;
}

export function HeaderContactNav() {
  return (
    <nav className="flex w-full flex-wrap items-center justify-start gap-2 sm:w-auto sm:justify-end" aria-label="Soul of Love contact navigation">
      {headerLinks.map((link) => {
        const config = contactLinks[link.key];
        if (!config?.enabled) return null;

        const Icon = link.icon;
        const isPrimary = link.style === "primary";

        return (
          <a
            key={link.key}
            href={getHref(link, config)}
            {...linkSafetyProps(link)}
            aria-label={link.key === "lineOA" ? `เปิด ${config.label} ${config.id}` : config.label}
            className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-100 ${
              isPrimary
                ? "border-emerald-200/35 bg-emerald-200/12 text-emerald-100 shadow-[0_0_28px_rgba(52,211,153,.14)] hover:bg-emerald-200/18"
                : "border-white/10 bg-white/[0.045] text-slate-300 hover:border-amber-200/30 hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{link.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

export function EcosystemFooter() {
  return (
    <footer className="mb-24 mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-4 text-slate-300 shadow-[0_0_42px_rgba(109,40,217,.14)] backdrop-blur-2xl lg:mb-8">
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-100">Soul of Love Ecosystem</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
            ติดตามผลงาน พูดคุย หรือกลับไปดูโปรเจกต์ทั้งหมดของ Win Soul of Love
          </p>
          {contactLinks.email.enabled ? (
            <a
              className="mt-3 inline-flex max-w-full items-center gap-2 text-xs font-semibold text-slate-400 underline decoration-white/20 underline-offset-4 transition hover:text-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-100"
              href={contactLinks.email.issueMailto}
            >
              <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="break-words">แจ้งปัญหาการใช้งาน Daily Energy</span>
            </a>
          ) : null}
        </div>

        <nav className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4" aria-label="Soul of Love ecosystem links">
          {footerLinks.map((link) => {
            const config = contactLinks[link.key];
            if (!config?.enabled) return null;

            const Icon = link.icon;
            const href = getHref(link, config);

            return (
              <a
                key={link.key}
                href={href}
                {...linkSafetyProps(link)}
                className={`group min-h-12 rounded-2xl border px-3 py-3 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-100 ${
                  link.primary
                    ? "border-emerald-200/30 bg-emerald-200/10 text-emerald-100 hover:bg-emerald-200/16"
                    : "border-white/10 bg-slate-950/35 text-slate-300 hover:border-amber-200/30 hover:bg-white/[0.075] hover:text-white"
                }`}
                aria-label={link.key === "lineOA" ? `เปิด ${config.label} ${config.id}` : config.label}
              >
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">{link.label || config.label}</span>
                </span>
                {link.value ? <span className="mt-1 block break-words text-xs text-slate-400">{link.value}</span> : null}
              </a>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
