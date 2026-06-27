"use client";

import React, { useState } from "react";
import { HERO_ARTWORK_STATUSES, heroArtworkStatus } from "../../data/heroArtworkStatus.js";

const statusOrder = [
  HERO_ARTWORK_STATUSES.DRAFT,
  HERO_ARTWORK_STATUSES.GENERATED,
  HERO_ARTWORK_STATUSES.REVIEW,
  HERO_ARTWORK_STATUSES.QA,
  HERO_ARTWORK_STATUSES.APPROVED,
  HERO_ARTWORK_STATUSES.LOCKED
];

const statusStyles = {
  DRAFT: "border-slate-400/20 bg-slate-400/10 text-slate-200",
  GENERATED: "border-sky-300/25 bg-sky-300/10 text-sky-100",
  REVIEW: "border-violet-300/25 bg-violet-300/10 text-violet-100",
  QA: "border-amber-300/25 bg-amber-300/10 text-amber-100",
  APPROVED: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  LOCKED: "border-rose-200/30 bg-rose-200/10 text-rose-100"
};

function countWhere(predicate) {
  return heroArtworkStatus.filter(predicate).length;
}

function getProgress() {
  const total = heroArtworkStatus.length || 1;
  const generated = countWhere((item) => statusOrder.indexOf(item.status) >= statusOrder.indexOf(HERO_ARTWORK_STATUSES.GENERATED));
  const reviewed = countWhere((item) => statusOrder.indexOf(item.status) >= statusOrder.indexOf(HERO_ARTWORK_STATUSES.REVIEW));
  const approved = countWhere((item) => item.status === HERO_ARTWORK_STATUSES.APPROVED || item.status === HERO_ARTWORK_STATUSES.LOCKED);
  const locked = countWhere((item) => item.status === HERO_ARTWORK_STATUSES.LOCKED);

  return {
    total,
    generated,
    reviewed,
    approved,
    locked,
    completion: Math.round((locked / total) * 100)
  };
}

function ArtworkPreview({ item }) {
  const [failed, setFailed] = useState(false);
  const src = `/cards/major/${item.filename}`;
  const showImage = item.status !== HERO_ARTWORK_STATUSES.DRAFT && !failed;

  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-slate-950/65">
      {showImage ? (
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
          draggable="false"
        />
      ) : (
        <div className="grid h-full place-items-center px-4 text-center text-xs uppercase tracking-[0.18em] text-slate-500">
          No Preview
        </div>
      )}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
    </div>
  );
}

export function HeroArtworkProductionDashboard() {
  const progress = getProgress();

  return (
    <section className="min-h-screen bg-[#05030f] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <header className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_0_42px_rgba(109,40,217,.14)] backdrop-blur-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-100">Internal Production</p>
          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Hero Artwork Production Dashboard</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Developer-only tracker for Major Arcana hero artwork status. This component is not mounted in the public route.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-200/20 bg-amber-200/10 px-4 py-3 text-right">
              <p className="text-xs uppercase tracking-[0.18em] text-amber-100">Overall Completion</p>
              <p className="mt-1 text-3xl font-semibold">{progress.completion}%</p>
            </div>
          </div>
        </header>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <ProgressCard label="Generated" value={progress.generated} total={progress.total} />
          <ProgressCard label="Reviewed" value={progress.reviewed} total={progress.total} />
          <ProgressCard label="Approved" value={progress.approved} total={progress.total} />
          <ProgressCard label="Locked" value={progress.locked} total={progress.total} />
          <ProgressCard label="Total Cards" value={progress.total} total={progress.total} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {heroArtworkStatus.map((item) => (
            <article key={item.id} className="rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-2xl">
              <div className="grid grid-cols-[7rem_1fr] gap-4">
                <ArtworkPreview item={item} />
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Major Arcana {item.id}</p>
                      <h2 className="mt-1 text-xl font-semibold leading-7">{item.name}</h2>
                    </div>
                    <span className={`rounded-full border px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.14em] ${statusStyles[item.status] || statusStyles.DRAFT}`}>
                      {item.status}
                    </span>
                  </div>

                  <dl className="mt-4 grid gap-2 text-sm">
                    <InfoRow label="Version" value={item.version} />
                    <InfoRow label="Artist" value={item.artist} />
                    <InfoRow label="Last Updated" value={item.lastUpdated} />
                    <InfoRow label="Locked" value={item.status === HERO_ARTWORK_STATUSES.LOCKED ? "YES" : "NO"} />
                  </dl>
                </div>
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/45 p-3">
                <p className="text-[0.62rem] uppercase tracking-[0.18em] text-slate-500">Review Notes</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.reviewNotes}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgressCard({ label, value, total }) {
  return (
    <article className="rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-4 backdrop-blur-2xl">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs text-slate-400">of {total}</p>
    </article>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-2">
      <dt className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</dt>
      <dd className="truncate text-slate-200">{value || "-"}</dd>
    </div>
  );
}

export default HeroArtworkProductionDashboard;
