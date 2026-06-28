import { writeFileSync } from "node:fs";
import { auraPalette } from "../src/data/auraPalette.js";
import { tarotDeck } from "../src/data/tarotDeck.js";
import { createReading } from "../src/lib/createReading.js";
import { getAuraProfile } from "../src/readingKnowledge/auraProfiles.js";
import { getCardAspect } from "../src/readingKnowledge/cardAspects.js";

const TOTAL = 1000;
const VISIBLE_AREAS = ["universe", "love", "work", "money", "focus", "warning", "affirmation", "mission"];
const SHADOW_TERMS = ["สะท้อน", "ซ่อน", "เงา", "ทบทวน", "รับรู้", "ฟัง", "ค่อย", "เมตตา", "ไม่ตัดสิน", "ชะลอ", "ขอบเขต", "ภายใน"];
const NEGATIVE_TERMS = ["แย่", "ร้าย", "หายนะ", "ล้มเหลว", "โชคร้าย", "ลงโทษ"];

function normalize(text = "") {
  return String(text)
    .toLowerCase()
    .replace(/[“”"'.:;!?()[\]{}_,/\\|~`<>+=*-]/g, " ")
    .replace(/[ๆฯ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(text = "") {
  return normalize(text).split(" ").filter((token) => token.length > 1);
}

function overlap(left, right) {
  const a = new Set(tokens(left));
  const b = new Set(tokens(right));
  if (!a.size || !b.size) return 0;
  let shared = 0;
  for (const token of a) if (b.has(token)) shared += 1;
  return shared / Math.min(a.size, b.size);
}

function getAreaText(reading, area) {
  return area === "universe" ? reading.universeMessage || "" : reading[area] || "";
}

function fullText(reading, areas = VISIBLE_AREAS) {
  return areas.map((area) => getAreaText(reading, area)).join(" ");
}

function avg(values) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
}

function pct(value) {
  return `${Math.round(value * 100)}%`;
}

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

function truncate(text = "", max = 150) {
  const clean = String(text).replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max)}...` : clean;
}

function table(headers, rows) {
  if (!rows.length) return "_None_\n";
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.join(" | ")} |`)
  ].join("\n");
}

function cardIdentityText(card) {
  const aspect = getCardAspect(card);
  return [
    card.englishName,
    card.thaiName,
    card.energyTheme,
    ...(card.energyTags || []),
    aspect.identity,
    aspect.philosophy,
    aspect.coreMeaning,
    aspect.lightExpression,
    aspect.shadowExpression,
    aspect.gift,
    aspect.blindSpot,
    aspect.transformation,
    ...(aspect.keywords || [])
  ].join(" ");
}

function auraIdentityText(aura) {
  const profile = getAuraProfile(aura);
  return [
    aura.english,
    aura.name,
    profile.identity,
    profile.coreMeaning,
    profile.emotionalTone,
    profile.lightExpression,
    profile.shadowExpression,
    profile.relationshipLens,
    profile.workLens,
    profile.moneyLens,
    profile.focusLens,
    profile.warningLens,
    ...(profile.keywords || [])
  ].join(" ");
}

const readings = Array.from({ length: TOTAL }, () => createReading("daily-card"));
const byCard = new Map();
const byAura = new Map();

for (const reading of readings) {
  const cardName = reading.card.englishName;
  const auraName = reading.aura.english;
  if (!byCard.has(cardName)) byCard.set(cardName, []);
  if (!byAura.has(auraName)) byAura.set(auraName, []);
  byCard.get(cardName).push(reading);
  byAura.get(auraName).push(reading);
}

const cardIdentity = Object.fromEntries(tarotDeck.map((card) => [card.englishName, cardIdentityText(card)]));
const cardRows = [];
const driftRows = [];

for (const card of tarotDeck) {
  const draws = byCard.get(card.englishName) || [];
  const ownIdentity = cardIdentity[card.englishName];
  const identityScores = draws.map((reading) => overlap(fullText(reading), ownIdentity));
  let driftCount = 0;

  for (const reading of draws) {
    const text = fullText(reading);
    const ownScore = overlap(text, ownIdentity);
    const [competitor, competitorScore] = Object.entries(cardIdentity)
      .filter(([name]) => name !== card.englishName)
      .map(([name, identity]) => [name, overlap(text, identity)])
      .sort((a, b) => b[1] - a[1])[0] || ["", 0];

    if (competitorScore > 0.7 && competitorScore > ownScore + 0.08) {
      driftCount += 1;
      if (driftRows.length < 20) {
        driftRows.push([card.englishName, competitor, pct(ownScore), pct(competitorScore), truncate(getAreaText(reading, "universe"))]);
      }
    }
  }

  cardRows.push([card.englishName, draws.length, pct(avg(identityScores)), driftCount]);
}

const auraRows = [];
const auraScores = [];
const auraNames = [...byAura.keys()].sort();
for (const auraName of auraNames) {
  const draws = byAura.get(auraName) || [];
  const identity = auraIdentityText(draws[0]?.aura || { english: auraName, name: auraName });
  const score = avg(draws.map((reading) => overlap(fullText(reading), identity)));
  auraScores.push(score);
  auraRows.push([auraName, draws.length, pct(score)]);
}

const weakAuraPairs = [];
for (let left = 0; left < auraNames.length; left += 1) {
  for (let right = left + 1; right < auraNames.length; right += 1) {
    const a = auraNames[left];
    const b = auraNames[right];
    const sim = overlap(
      (byAura.get(a) || []).map((reading) => fullText(reading)).join(" "),
      (byAura.get(b) || []).map((reading) => fullText(reading)).join(" ")
    );
    if (sim > 0.7) weakAuraPairs.push([a, b, pct(sim)]);
  }
}
weakAuraPairs.sort((a, b) => Number.parseInt(b[2]) - Number.parseInt(a[2]));

const aspectPairs = new Map();
for (const reading of readings) {
  const aspect = reading.orientation === "upright" ? "Light" : "Shadow";
  const key = `${reading.card.englishName} + ${reading.aura.english}`;
  if (!aspectPairs.has(key)) aspectPairs.set(key, { Light: [], Shadow: [] });
  aspectPairs.get(key)[aspect].push(reading);
}

const aspectRows = [];
const shadowToneRows = [];
for (const [key, groups] of aspectPairs) {
  if (!groups.Light.length || !groups.Shadow.length) continue;
  const lightText = groups.Light.map((reading) => fullText(reading)).join(" ");
  const shadowText = groups.Shadow.map((reading) => fullText(reading)).join(" ");
  const sim = overlap(lightText, shadowText);
  const reflectiveHits = SHADOW_TERMS.filter((term) => shadowText.includes(term)).length;
  const negativeHits = NEGATIVE_TERMS.filter((term) => shadowText.includes(term)).length;
  if (sim > 0.72) aspectRows.push([key, pct(sim), groups.Light.length, groups.Shadow.length]);
  if (negativeHits > reflectiveHits && negativeHits > 1) shadowToneRows.push([key, reflectiveHits, negativeHits]);
}

const startCounts = new Map();
const areaSimilarityRows = [];
const areaSimilarities = [];
for (const reading of readings) {
  for (const area of VISIBLE_AREAS) {
    const start = `${area}: ${tokens(getAreaText(reading, area)).slice(0, 8).join(" ")}`;
    startCounts.set(start, (startCounts.get(start) || 0) + 1);
  }

  for (let left = 0; left < VISIBLE_AREAS.length; left += 1) {
    for (let right = left + 1; right < VISIBLE_AREAS.length; right += 1) {
      const areaA = VISIBLE_AREAS[left];
      const areaB = VISIBLE_AREAS[right];
      const sim = overlap(getAreaText(reading, areaA), getAreaText(reading, areaB));
      areaSimilarities.push(sim);
      if (sim > 0.7 && areaSimilarityRows.length < 60) {
        areaSimilarityRows.push([reading.card.englishName, reading.aura.english, areaA, areaB, pct(sim)]);
      }
    }
  }
}

const repeatedStarts = [...startCounts.entries()]
  .filter(([, count]) => count > 10)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20)
  .map(([start, count]) => [count, truncate(start)]);

const cardCorpus = Object.fromEntries([...byCard.entries()].map(([card, draws]) => [card, draws.map((reading) => fullText(reading)).join(" ")]));
const crossCardRows = [];
const cardNames = Object.keys(cardCorpus);
for (let left = 0; left < cardNames.length; left += 1) {
  for (let right = left + 1; right < cardNames.length; right += 1) {
    const sim = overlap(cardCorpus[cardNames[left]], cardCorpus[cardNames[right]]);
    if (sim > 0.7) crossCardRows.push([cardNames[left], cardNames[right], pct(sim)]);
  }
}

const semanticDriftCount = driftRows.length;
const cardScore = clamp(100 - semanticDriftCount * 2 + avg(cardRows.map((row) => Number.parseInt(row[2]) / 100)) * 20);
const auraScore = clamp(100 - weakAuraPairs.length * 4 + avg(auraScores) * 15);
const aspectScore = clamp(100 - aspectRows.length * 2 - shadowToneRows.length * 6 - avg(aspectRows.map((row) => Number.parseInt(row[1]) / 100)) * 20);
const areaScore = clamp(100 - areaSimilarityRows.length * 1.5 - repeatedStarts.length * 1.2 - avg(areaSimilarities) * 18);
const crossScore = clamp(100 - crossCardRows.length * 5);
const driftScore = clamp(100 - semanticDriftCount * 4);
const overall = Math.round(avg([cardScore, auraScore, aspectScore, areaScore, crossScore, driftScore]));

const report = `# QA Semantic Intelligence Report

Generated: ${new Date().toISOString()}

## Executive Summary

- Total simulated Daily Energy readings: ${TOTAL}
- Production source: \`createReading("daily-card")\`
- Visible areas audited: ${VISIBLE_AREAS.join(", ")}
- Internal area retained but not visible: guidance
- Cards covered: ${byCard.size} / ${tarotDeck.length}
- Aura colors covered: ${byAura.size} / ${Object.keys(auraPalette).length}
- Overall Daily Energy Reading Quality Score: **${overall}/100**

## Diversity Scorecard

| Metric | Score | Notes |
| --- | ---: | --- |
| Card Identity Score | ${Math.round(cardScore)} | Measures whether each reading keeps its Major Arcana identity. |
| Aura Identity Score | ${Math.round(auraScore)} | Measures whether aura lenses create distinct semantic influence. |
| Aspect Difference Score | ${Math.round(aspectScore)} | Measures Light vs Shadow contrast and non-fearful Shadow language. |
| Area Diversity Score | ${Math.round(areaScore)} | Measures visible area separation and repeated starts. |
| Cross Card Diversity Score | ${Math.round(crossScore)} | Flags different cards whose total reading language becomes too similar. |
| Semantic Drift Score | ${Math.round(driftScore)} | Flags readings that match another card identity more strongly than their own. |

## Card Identity QA

${table(["Card", "Draws", "Avg Identity Match", "Drift Flags"], cardRows)}

## Aura Identity QA

${table(["Aura", "Draws", "Avg Aura Influence"], auraRows)}

### Weak Aura Differentiation

${table(["Aura A", "Aura B", "Similarity"], weakAuraPairs.slice(0, 20))}

## Aspect QA

${table(["Card + Aura", "Similarity", "Light Draws", "Shadow Draws"], aspectRows.slice(0, 20))}

### Shadow Tone Safety

${table(["Card + Aura", "Reflective Hits", "Negative Hits"], shadowToneRows.slice(0, 20))}

## Area QA

### Top Repeated Ideas / Sentence Starts

${table(["Count", "Repeated Start"], repeatedStarts.slice(0, 10))}

### Weak Area Differentiation Examples

${table(["Card", "Aura", "Area A", "Area B", "Similarity"], areaSimilarityRows.slice(0, 20))}

## Cross Card Similarity

${table(["Card A", "Card B", "Similarity"], crossCardRows.slice(0, 20))}

## Semantic Drift Examples

${table(["Drawn Card", "Competing Identity", "Own Match", "Competing Match", "Universe Sample"], driftRows.slice(0, 20))}

## Suggested Improvements

- Continue strengthening area-specific outputs, especially any area pairs still above 70% similarity.
- Keep Silver semantically distinct from Pearl if it remains visible in the app aura palette.
- Add more card-specific mission and focus actions for cards with adjacent meanings.
- Keep guidance internal unless it gets a clearly separate role from Mission, Focus, and Warning.

## Final Production Score

**${overall}/100**
`;

writeFileSync("QA_SEMANTIC_INTELLIGENCE_REPORT.md", report, "utf8");

console.log(
  JSON.stringify(
    {
      totalReadings: TOTAL,
      cards: byCard.size,
      auras: byAura.size,
      overallQualityScore: overall,
      weakAuraPairs: weakAuraPairs.length,
      weakAreaExamples: areaSimilarityRows.length,
      crossCardPairs: crossCardRows.length,
      semanticDriftFlags: semanticDriftCount,
      report: "QA_SEMANTIC_INTELLIGENCE_REPORT.md"
    },
    null,
    2
  )
);
