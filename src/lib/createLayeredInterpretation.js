import { interpretationPools } from "../data/interpretationPools.js";
import { randomItem } from "./random.js";

function getEnergyBand(score) {
  if (score >= 85) return "สูงและเปล่งประกาย";
  if (score >= 65) return "มั่นคงและเคลื่อนไหวได้";
  if (score >= 45) return "ละเอียดและต้องประคอง";
  return "เบาและควรถนอม";
}

function getOrientationTone(orientation) {
  return orientation === "reversed" ? "ทบทวนเงาอย่างปลอดภัย" : "เปิดรับพลังตรงอย่างมีสติ";
}

function pickUnique(section, context, used) {
  const pool = interpretationPools[section] || [];
  const candidates = pool.map((factory) => factory(context)).filter(Boolean);
  const available = candidates.filter((sentence) => !used.has(sentence));
  const picked = randomItem(available.length ? available : candidates);
  if (picked) used.add(picked);
  return picked || "";
}

function fallbackFromCard(section, card) {
  const fallback = {
    universeMessage: card.soulMessages?.[0],
    guidance: card.guidanceText,
    mission: card.focusPoints?.[0],
    soulMessage: card.soulMessages?.[1] || card.soulMessages?.[0],
    love: card.soulMessages?.[2] || card.guidanceText,
    work: card.focusPoints?.[1] || card.guidanceText,
    money: card.focusPoints?.[2] || card.guidanceText,
    warning: card.warnings?.[0],
    focus: card.focusPoints?.[0],
    affirmation: card.soulMessages?.[0]
  };
  return fallback[section] || card.guidanceText || "";
}

export function createLayeredInterpretation({ card, orientation, aura, energyScore, mode = "daily-card", modeText = {} }) {
  const primaryTag = card.energyTags?.[0] || card.energyTheme;
  const context = {
    card,
    orientation,
    orientationMeaning: orientation === "upright" ? card.uprightMeaningThai : card.reversedMeaningThai,
    orientationTone: getOrientationTone(orientation),
    aura,
    energyScore,
    energyBand: getEnergyBand(energyScore),
    mode,
    modeText: modeText[mode],
    primaryTag
  };
  const used = new Set();
  const sections = [
    "universeMessage",
    "guidance",
    "mission",
    "soulMessage",
    "love",
    "work",
    "money",
    "warning",
    "focus",
    "affirmation"
  ];

  return Object.fromEntries(
    sections.map((section) => {
      const generated = pickUnique(section, context, used);
      return [section, generated || fallbackFromCard(section, card)];
    })
  );
}
