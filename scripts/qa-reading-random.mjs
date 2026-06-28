import { writeFileSync } from "node:fs";
import { auraPalette } from "../src/data/auraPalette.js";
import { tarotDeck } from "../src/data/tarotDeck.js";
import { auraProfiles, getAuraProfile } from "../src/readingKnowledge/auraProfiles.js";
import { createReading } from "../src/lib/createReading.js";

const CHECKPOINTS = [100, 200, 300, 400, 500];
const AREAS = ["universe", "guidance", "love", "work", "money", "focus", "warning", "affirmation", "mission"];
const VISIBLE_READING_AREAS = ["universe", "love", "work", "money", "focus", "warning", "affirmation", "mission"];
const INTERNAL_ONLY_AREAS = AREAS.filter((area) => !VISIBLE_READING_AREAS.includes(area));
const ENGLISH_LEAK_TERMS = [
  "harmony",
  "healing",
  "intuition",
  "awakening",
  "transformation",
  "creation",
  "movement",
  "release",
  "insight",
  "mystery",
  "shadow",
  "light",
  "focus"
];

function scoreBand(score) {
  if (score <= 39) return "low";
  if (score <= 69) return "medium";
  return "high";
}

function normalizeText(text = "") {
  return text
    .toLowerCase()
    .replace(/[“”"'.:;!?()[\]{}_,/\\|~`<>+=*-]/g, " ")
    .replace(/[ๆฯ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text = "") {
  return normalizeText(text).split(" ").filter(Boolean);
}

function textStart(text, length = 10) {
  return tokenize(text).slice(0, length).join(" ");
}

function chunks(text, size = 7) {
  const tokens = tokenize(text);
  const result = [];
  for (let index = 0; index <= tokens.length - size; index += 1) {
    result.push(tokens.slice(index, index + size).join(" "));
  }
  return result;
}

function tokenOverlap(a, b) {
  const aTokens = new Set(tokenize(a));
  const bTokens = new Set(tokenize(b));
  if (!aTokens.size || !bTokens.size) return 0;
  let shared = 0;
  for (const token of aTokens) {
    if (bTokens.has(token)) shared += 1;
  }
  return shared / Math.min(aTokens.size, bTokens.size);
}

function increment(map, key) {
  map.set(key, (map.get(key) || 0) + 1);
}

function sortEntries(map) {
  return [...map.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])));
}

function markdownTable(headers, rows) {
  if (!rows.length) return "_None_\n";
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.join(" | ")} |`)
  ].join("\n");
}

function truncate(value = "", max = 120) {
  const text = String(value).replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max)}...` : text;
}

function drawSignature(reading) {
  const card = reading.card.englishName;
  const aura = reading.aura.english;
  const aspect = reading.orientation === "upright" ? "Light" : "Shadow";
  const band = scoreBand(reading.energyScore);
  return { card, aura, aspect, band };
}

function getAreaText(reading, area) {
  if (area === "universe") return reading.universeMessage || "";
  return reading[area] || "";
}

function comboKey(parts) {
  return parts.join(" + ");
}

function checkpointStats(draws) {
  const cardCounts = new Map();
  const auraCounts = new Map();
  const aspectCounts = new Map();
  const bandCounts = new Map();
  const combos = {
    cardAura: new Map(),
    cardAspect: new Map(),
    auraAspect: new Map(),
    cardAuraAspect: new Map(),
    cardAuraAspectBand: new Map()
  };

  for (const draw of draws) {
    const { card, aura, aspect, band } = drawSignature(draw);
    increment(cardCounts, card);
    increment(auraCounts, aura);
    increment(aspectCounts, aspect);
    increment(bandCounts, band);
    increment(combos.cardAura, comboKey([card, aura]));
    increment(combos.cardAspect, comboKey([card, aspect]));
    increment(combos.auraAspect, comboKey([aura, aspect]));
    increment(combos.cardAuraAspect, comboKey([card, aura, aspect]));
    increment(combos.cardAuraAspectBand, comboKey([card, aura, aspect, band]));
  }

  const allCards = tarotDeck.map((card) => card.englishName);
  const allProfileAuraIds = auraProfiles.map((profile) => profile.id);
  const appAuraNames = Object.values(auraPalette).map((aura) => aura.english);
  const appearedProfileAuraIds = new Set(draws.map((draw) => getAuraProfile(draw.aura).id));
  const profileNamesById = Object.fromEntries(auraProfiles.map((profile) => [profile.id, profile.enName]));

  return {
    total: draws.length,
    cardCounts,
    auraCounts,
    aspectCounts,
    bandCounts,
    combos,
    missingCards: allCards.filter((card) => !cardCounts.has(card)),
    missingProfileAuras: allProfileAuraIds.filter((id) => !appearedProfileAuraIds.has(id)).map((id) => profileNamesById[id]),
    missingAppAuras: appAuraNames.filter((aura) => !auraCounts.has(aura))
  };
}

function analyzeText(draws) {
  const byArea = Object.fromEntries(
    AREAS.map((area) => [
      area,
      {
        exact: new Map(),
        starts: new Map(),
        chunks: new Map(),
        similar: [],
        leaks: []
      }
    ])
  );

  for (const draw of draws) {
    const signature = drawSignature(draw);
    const signatureKey = comboKey([signature.card, signature.aura, signature.aspect, signature.band]);

    for (const area of AREAS) {
      const text = getAreaText(draw, area);
      const normalized = normalizeText(text);
      const start = textStart(text, 10);
      const areaStats = byArea[area];

      if (!areaStats.exact.has(normalized)) areaStats.exact.set(normalized, []);
      areaStats.exact.get(normalized).push(signatureKey);

      if (start) increment(areaStats.starts, start);
      for (const chunk of chunks(text, 7)) increment(areaStats.chunks, chunk);

      for (const term of ENGLISH_LEAK_TERMS) {
        if (new RegExp(`\\b${term}\\b`, "i").test(text)) {
          areaStats.leaks.push({ term, signature: signatureKey, sample: text.slice(0, 160) });
        }
      }
    }
  }

  for (const area of AREAS) {
    const uniqueTexts = [...byArea[area].exact.keys()];
    for (let left = 0; left < uniqueTexts.length; left += 1) {
      for (let right = left + 1; right < uniqueTexts.length; right += 1) {
        const similarity = tokenOverlap(uniqueTexts[left], uniqueTexts[right]);
        if (similarity > 0.7) {
          byArea[area].similar.push({
            similarity,
            a: uniqueTexts[left].slice(0, 140),
            b: uniqueTexts[right].slice(0, 140)
          });
          if (byArea[area].similar.length >= 12) break;
        }
      }
      if (byArea[area].similar.length >= 12) break;
    }
  }

  return byArea;
}

function renderCheckpoint(name, stats) {
  const cardRows = sortEntries(stats.cardCounts).map(([card, count]) => [card, count]);
  const auraRows = sortEntries(stats.auraCounts).map(([aura, count]) => [aura, count]);
  const aspectRows = sortEntries(stats.aspectCounts).map(([aspect, count]) => [aspect, count]);
  const bandRows = sortEntries(stats.bandCounts).map(([band, count]) => [band, count]);

  return `## ${name}

- Unique Major Arcana cards: ${stats.cardCounts.size} / ${tarotDeck.length}
- Missing cards: ${stats.missingCards.length ? stats.missingCards.join(", ") : "None"}
- Unique app aura colors appeared: ${stats.auraCounts.size} / ${Object.keys(auraPalette).length}
- Missing app aura colors: ${stats.missingAppAuras.length ? stats.missingAppAuras.join(", ") : "None"}
- Missing knowledge-base aura profiles: ${stats.missingProfileAuras.length ? stats.missingProfileAuras.join(", ") : "None"}

### Card Frequency
${markdownTable(["Card", "Count"], cardRows)}

### Aura Frequency
${markdownTable(["Aura", "Count"], auraRows)}

### Light vs Shadow
${markdownTable(["Aspect", "Count"], aspectRows)}

### Score Bands
${markdownTable(["Band", "Count"], bandRows)}
`;
}

function renderPatternCoverage(stats) {
  const theoreticalMaximum = 22 * 12 * 2 * 3;
  const actualAppMaximum = tarotDeck.length * Object.keys(auraPalette).length * 2 * 3;
  const uniqueComboCount = stats.combos.cardAuraAspectBand.size;
  const repeated = [...stats.combos.cardAuraAspectBand.entries()].filter(([, count]) => count > 1);
  const mostRepeated = sortEntries(stats.combos.cardAuraAspectBand)
    .filter(([, count]) => count > 1)
    .slice(0, 15)
    .map(([combo, count]) => [combo, count]);

  return `## Pattern Coverage

- Unique card + aura: ${stats.combos.cardAura.size}
- Unique card + aspect: ${stats.combos.cardAspect.size}
- Unique aura + aspect: ${stats.combos.auraAspect.size}
- Unique card + aura + aspect: ${stats.combos.cardAuraAspect.size}
- Unique card + aura + aspect + scoreBand: ${uniqueComboCount}
- Repeated card + aura + aspect + scoreBand combinations: ${repeated.length}
- Coverage vs requested theoretical maximum (22 x 12 x 2 x 3 = 1584): ${((uniqueComboCount / theoreticalMaximum) * 100).toFixed(2)}%
- Coverage vs current app maximum (22 x ${Object.keys(auraPalette).length} x 2 x 3 = ${actualAppMaximum}): ${((uniqueComboCount / actualAppMaximum) * 100).toFixed(2)}%

### Most Repeated Combinations
${markdownTable(["Combination", "Count"], mostRepeated)}
`;
}

function renderTextQa(textQa) {
  const exactRows = [];
  const startRows = [];
  const chunkRows = [];
  const similarRows = [];
  const leakRows = [];

  for (const area of AREAS) {
    for (const [text, signatures] of textQa[area].exact.entries()) {
      const uniqueSignatures = new Set(signatures);
      if (signatures.length > 1 && uniqueSignatures.size > 1) {
        exactRows.push([area, signatures.length, truncate([...uniqueSignatures].slice(0, 3).join("<br>"), 120), truncate(text, 140)]);
      }
    }

    for (const [start, count] of sortEntries(textQa[area].starts).filter(([, count]) => count > 5).slice(0, 8)) {
      startRows.push([area, count, truncate(start, 140)]);
    }

    for (const [chunk, count] of sortEntries(textQa[area].chunks).filter(([, count]) => count > 5).slice(0, 8)) {
      chunkRows.push([area, count, truncate(chunk, 140)]);
    }

    for (const item of textQa[area].similar.slice(0, 5)) {
      similarRows.push([area, `${Math.round(item.similarity * 100)}%`, truncate(item.a, 140), truncate(item.b, 140)]);
    }

    for (const leak of textQa[area].leaks.slice(0, 20)) {
      leakRows.push([area, leak.term, truncate(leak.signature, 120), truncate(leak.sample.replace(/\|/g, "/"), 140)]);
    }
  }

  return `## Repeated Sentence Starts
${markdownTable(["Area", "Count", "Repeated Start"], startRows)}

## Repeated Phrase Chunks
${markdownTable(["Area", "Count", "Repeated Chunk"], chunkRows)}

## Exact Duplicate Readings
${markdownTable(["Area", "Count", "Different Signatures", "Sample"], exactRows)}

## Similar Meaning Warnings
${markdownTable(["Area", "Overlap", "Sample A", "Sample B"], similarRows)}

## English Keyword Leaks
${markdownTable(["Area", "Term", "Signature", "Sample"], leakRows)}
`;
}

function imbalanceNotes(stats) {
  const notes = [];
  const cardCounts = sortEntries(stats.cardCounts).map(([, count]) => count);
  const auraCounts = sortEntries(stats.auraCounts).map(([, count]) => count);
  const [maxCard = 0] = cardCounts;
  const minCard = cardCounts.at(-1) || 0;
  const [maxAura = 0] = auraCounts;
  const minAura = auraCounts.at(-1) || 0;

  notes.push(`Card frequency range: ${minCard} to ${maxCard}.`);
  notes.push(`Aura frequency range: ${minAura} to ${maxAura}.`);
  if (stats.missingProfileAuras.length) {
    notes.push(`Some 12-profile aura colors do not appear because the current app random source uses card.auraColors + auraPalette, not the full auraProfiles database.`);
  }
  if (maxAura > minAura * 2) {
    notes.push("Aura distribution is noticeably uneven; this is expected while each card has a limited auraColors list.");
  }
  return notes;
}

const draws = Array.from({ length: 500 }, () => createReading("daily-card"));
const checkpointReports = CHECKPOINTS.map((checkpoint) => ({
  checkpoint,
  stats: checkpointStats(draws.slice(0, checkpoint))
}));
const finalStats = checkpointReports.at(-1).stats;
const textQa = analyzeText(draws);
const reportDate = new Date().toISOString();
const recommendations = [
  finalStats.missingProfileAuras.length
    ? "Consider deciding whether the Daily Energy app should use the full 12-aura knowledge base or keep the current deck-limited aura palette."
    : "Aura coverage reached all knowledge-base profiles in this run.",
  "Review repeated starts and chunks before changing production text; some repeats may be acceptable if they are area labels or intentional affirmations.",
  "If exact duplicates appear across different signatures, add more card-specific or aura-specific clauses for that area.",
  "If similarity warnings cluster in one area, add more area-specific pattern variants rather than changing all sections globally."
];

const report = `# QA Random Reading Report

Generated: ${reportDate}

## Summary

- Total simulated draws: ${draws.length}
- Checkpoints: ${CHECKPOINTS.join(", ")}
- Reading source: \`createReading("daily-card")\`
- Visible reading cards checked: ${VISIBLE_READING_AREAS.join(", ")}
- Internal-only fields still checked: ${INTERNAL_ONLY_AREAS.join(", ")}
- All text areas checked: ${AREAS.join(", ")}
- English leak terms checked: ${ENGLISH_LEAK_TERMS.join(", ")}

${checkpointReports.map(({ checkpoint, stats }) => renderCheckpoint(`${checkpoint}-draw checkpoint`, stats)).join("\n")}

## Missing Cards / Missing Auras

- Missing cards at 500 draws: ${finalStats.missingCards.length ? finalStats.missingCards.join(", ") : "None"}
- Missing app aura colors at 500 draws: ${finalStats.missingAppAuras.length ? finalStats.missingAppAuras.join(", ") : "None"}
- Missing knowledge-base aura profiles at 500 draws: ${finalStats.missingProfileAuras.length ? finalStats.missingProfileAuras.join(", ") : "None"}

## Distribution Imbalance

${imbalanceNotes(finalStats).map((note) => `- ${note}`).join("\n")}

${renderPatternCoverage(finalStats)}

${renderTextQa(textQa)}

## Recommended Fixes

${recommendations.map((item) => `- ${item}`).join("\n")}
`;

writeFileSync("QA_RANDOM_READING_REPORT.md", report, "utf8");

const summary = {
  draws: draws.length,
  uniqueCards: finalStats.cardCounts.size,
  missingCards: finalStats.missingCards,
  uniqueAuras: finalStats.auraCounts.size,
  missingAppAuras: finalStats.missingAppAuras,
  missingProfileAuras: finalStats.missingProfileAuras,
  uniqueCardAuraAspectBand: finalStats.combos.cardAuraAspectBand.size,
  repeatedCombinations: [...finalStats.combos.cardAuraAspectBand.values()].filter((count) => count > 1).length,
  report: "QA_RANDOM_READING_REPORT.md"
};

console.log(JSON.stringify(summary, null, 2));
