import { getAuraDNA } from "./auraDNA.js";
import { getCardDNA } from "./cardDNA.js";
import { buildNegativePrompt } from "./negativePrompt.js";
import {
  BRAND_IDENTITY,
  MASTER_STYLE_REFERENCE,
  MATERIAL_LANGUAGE,
  POSTER_COMPOSITION_RULES,
  SIGNATURE_GEOMETRY
} from "./promptSystemConstants.js";

function orientationInstruction(orientation) {
  if (orientation === "reversed") {
    return "Orientation: Reversed symbolic meaning only. Do not rotate, flip, invert, or place the character upside down. Keep all figures physically upright. Express reversal through mood, lighting, posture, symbols, and atmosphere.";
  }

  return "Orientation: Upright / open energy.";
}

function orientationRendering(orientation) {
  if (orientation === "reversed") {
    return "Visual orientation rendering: inward, quiet, mysterious, reflective, integrated; obsidian, smoked silver, gunmetal, midnight blue, dark violet metallic frame; subtle inner glow and restrained reflection; never horror, never evil, never dark fantasy.";
  }

  return "Visual orientation rendering: open, luminous, hopeful, elevated, expansive; pearl gold, white gold, champagne metallic frame; luminous rim, soft bloom, elegant reflection.";
}

function platformSuffix(platform) {
  const suffixes = {
    Midjourney: "--ar 4:5 --v 6 --style raw",
    "ChatGPT Image": "Prioritize readable Thai/English typography, balanced poster hierarchy, and premium finish.",
    Flux: "high detail, clean editorial poster, crisp typography zones, refined mystical luxury",
    "Stable Diffusion": "masterpiece, best quality, poster design, readable typography",
    Gemini: "Create a polished shareable result poster with clear layout and readable text."
  };

  return suffixes[platform] || "";
}

function compactList(items) {
  return items.join("; ");
}

export function buildPrompt({ reading, platform = "ChatGPT Image" }) {
  const card = reading.card;
  const aura = getAuraDNA(reading.aura);
  const cardLayer = getCardDNA(card);
  const orientation = orientationInstruction(reading.orientation);
  const suffix = platformSuffix(platform);

  const systemStyle = [
    ...MASTER_STYLE_REFERENCE,
    ...BRAND_IDENTITY,
    ...MATERIAL_LANGUAGE,
    ...SIGNATURE_GEOMETRY
  ];

  const sections = [
    `A. Output Goal
Create a COMPLETE premium Soul of Love Daily Energy RESULT POSTER.
This is not a hero artwork background, not an app screenshot, and not a standalone tarot illustration.
Use the Soul of Love master style: ${compactList(systemStyle)}.`,

    `B. Dynamic Reading Data
Card: ${card.englishName} / ${card.thaiName}; Major Arcana number: ${card.id ?? "N/A"}.
${orientation}
${orientationRendering(reading.orientation)}
Aura: ${reading.aura.english || reading.aura.name} (${aura.primaryColor}, ${aura.secondaryColor}); glow: ${aura.glowStyle}; lighting: ${aura.lightingMood}; cinematic rendering: ${aura.rendering}.
Energy Score: ${reading.energyScore}/100.
Visual Seed: ${cardLayer.visualSeed}.`,

    `C. Poster Layout
${compactList(POSTER_COMPOSITION_RULES)}.
Required visible modules: Soul of Love, Daily Energy, framed card artwork, card name TH+EN, Aura Color, Energy Score, Orientation, Universe Message panel, Soul of Love by Win Soul of Love footer.`,

    `D. Typography
Display this exact short Universe Message inside the Universe Message panel: '${reading.universeMessage}'.
Keep Thai text readable, premium, high-contrast, and uncrowded.`,

    `E. Negative Prompt
Avoid: ${buildNegativePrompt()}.`,

    suffix
  ].filter(Boolean);

  return sections.join("\n\n");
}
