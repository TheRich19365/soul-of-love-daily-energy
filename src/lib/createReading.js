import { auraPalette } from '../data/auraPalette.js';
import { modeText } from '../data/modeText.js';
import { tarotDeck } from '../data/tarotDeck.js';
import { makeAreaInsight } from './createAreaInsight.js';
import { createLayeredInterpretation } from './createLayeredInterpretation.js';
import { randomItem, randomNumber } from './random.js';
import { buildEnergyReading } from '../readingKnowledge/buildEnergyReading.js';

export function createReading(mode = 'daily-card') {
  const selectedModeText = modeText[mode];

  const card = randomItem(tarotDeck);
  const orientation = Math.random() > 0.5 ? 'upright' : 'reversed';
  const aura = auraPalette[randomItem(card.auraColors)];
  const [minEnergy, maxEnergy] = card.energyRange;
  const score = randomNumber(minEnergy, maxEnergy);
  const fallbackGuidance = `${orientation === "upright" ? card.uprightMeaningThai : card.reversedMeaningThai} ${card.guidanceText}`;
  const layered = createLayeredInterpretation({
    card,
    orientation,
    aura,
    energyScore: score,
    mode,
    modeText
  });
  const knowledgeReading = buildEnergyReading({
    card,
    aura,
    aspect: orientation,
    score,
    language: "TH"
  });
  const focus = layered.focus || randomItem(card.focusPoints);

  return {
    id: `${card.id}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    card,
    orientation,
    aura,
    energyScore: score,
    mainEnergy: knowledgeReading.mainEnergy || card.energyTheme,
    universeMessage: knowledgeReading.universe || layered.universeMessage || selectedModeText?.guidance?.(card, orientation) || fallbackGuidance,
    soulMessage: knowledgeReading.soulMessage || layered.soulMessage || randomItem(card.soulMessages),
    warning: knowledgeReading.warning || layered.warning || randomItem(card.warnings),
    focus: knowledgeReading.focus || focus,
    focusPoint: knowledgeReading.focus || focus,
    emotionalState: knowledgeReading.emotionalState || randomItem(card.emotionalStates),
    guidance: knowledgeReading.guidance || layered.guidance || fallbackGuidance,
    mission: knowledgeReading.mission || layered.mission || selectedModeText?.focus || randomItem(card.focusPoints),
    affirmation: knowledgeReading.affirmation || layered.affirmation || randomItem(card.soulMessages),
    love: knowledgeReading.love || layered.love || makeAreaInsight('love', card, orientation),
    work: knowledgeReading.work || layered.work || makeAreaInsight('work', card, orientation),
    money: knowledgeReading.money || layered.money || makeAreaInsight('money', card, orientation),
    knowledgeMeta: knowledgeReading.meta
  };
}
