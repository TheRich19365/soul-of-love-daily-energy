import { getAuraDNA } from "./auraDNA.js";
import { getCardDNA } from "./cardDNA.js";
import { getCompositionDNA } from "./compositionDNA.js";
import { getEnergyDNA } from "./energyDNA.js";
import { buildNegativePrompt } from "./negativePrompt.js";
import { styleDNA } from "./styleDNA.js";

function platformLayer(platform, sharedPrompt) {
  const platformGuides = {
    Midjourney: `${sharedPrompt}, vertical premium poster, ethereal aura around a symbolic tarot archetype, luxury cosmic UI, clean composition --ar 3:4 --v 6 --style raw`,
    "ChatGPT Image": `${sharedPrompt}. Create a polished hero artwork background for a social result card. Do not include readable text. Keep the center expressive but leave clean safe space for HTML/CSS title overlay.`,
    Flux: `${sharedPrompt}, high detail editorial poster, luminous aura field, refined spiritual branding, minimal typography area, balanced negative space, premium mystic interface aesthetic`,
    "Stable Diffusion": `${sharedPrompt}, masterpiece, best quality, negative prompt: ${buildNegativePrompt()}`,
    Gemini: `${sharedPrompt}. Generate a shareable mystical hero artwork image with refined Thai-inspired cosmic feeling, soft emotional atmosphere, clear focal point, and clean safe areas for app UI overlay.`
  };

  return platformGuides[platform] || sharedPrompt;
}

export function buildPrompt({ reading, platform = "ChatGPT Image", compositionType = "Hero Artwork" }) {
  const card = reading.card;
  const aura = getAuraDNA(reading.aura);
  const cardLayer = getCardDNA(card);
  const energy = getEnergyDNA(reading.energyScore);
  const composition = getCompositionDNA(compositionType);
  const isResultPoster = compositionType === "Social Poster";
  const outputRequirements = isResultPoster
    ? [
        "create a complete premium Soul of Love Daily Energy result-card poster",
        "include tasteful readable typography for: Soul of Love, by Win Soul of Love, card name, aura color, energy score, orientation, and one short universe message",
        "keep typography elegant, sparse, centered, and high contrast",
        "do not overcrowd the poster",
        "make it feel like a premium spiritual oracle result image, not an app screenshot"
      ].join("; ")
    : "no text, no letters, no typography, no logo, no watermark, leave safe space for UI overlay";

  const sharedPrompt = [
    "Soul of Love Daily Energy artwork",
    isResultPoster ? "complete external AI-generated result image with Soul of Love branding" : "hero artwork background for app UI",
    `tarot archetype: ${card.englishName} (${card.thaiName})`,
    `orientation: ${reading.orientation}`,
    `universe message: ${reading.universeMessage}`,
    `card visual seed: ${cardLayer.visualSeed}`,
    `environment: ${cardLayer.environment}`,
    `emotion: ${cardLayer.emotion}`,
    `camera: ${cardLayer.camera}`,
    `lighting: ${cardLayer.lighting}`,
    `sacred geometry: ${cardLayer.sacredGeometry}`,
    `materials: ${cardLayer.materials}`,
    `motion language: ${cardLayer.motionLanguage}`,
    `aura palette: ${aura.primaryColor}, ${aura.secondaryColor}`,
    `aura glow: ${aura.glowStyle}`,
    `aura particles: ${aura.particles}`,
    `lighting mood: ${aura.lightingMood}`,
    `energy score: ${reading.energyScore}/100`,
    `energy atmosphere: ${energy.band}, ${energy.atmosphere}, ${energy.lightBehavior}, ${energy.visualPace}`,
    `composition type: ${compositionType}`,
    `composition rules: ${composition.rules.join("; ")}`,
    `brand identity: ${styleDNA.brandIdentity}`,
    `master style: ${styleDNA.masterReference.join("; ")}`,
    `Soul of Love signature: ${styleDNA.permanentSignature.join("; ")}`,
    `material language: ${styleDNA.materialLanguage.join("; ")}`,
    `requirements: ${outputRequirements}`,
    `style: ${styleDNA.mood}`,
    isResultPoster ? "avoid: cluttered layout, unreadable text, fake watermarks, horror, scary occult cliches, low contrast typography" : `avoid: ${buildNegativePrompt()}`,
    "message tone: gentle self-awareness, symbolic energy reading, not deterministic fortune telling"
  ].join(", ");

  return platformLayer(platform, sharedPrompt);
}
