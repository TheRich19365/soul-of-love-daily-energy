import { auraPalette } from '../data/auraPalette.js';
import { modeText } from '../data/modeText.js';
import { tarotDeck } from '../data/tarotDeck.js';
import { makeAreaInsight } from './createAreaInsight.js';
import { createLayeredInterpretation } from './createLayeredInterpretation.js';
import { randomItem, randomNumber } from './random.js';

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
  const focus = layered.focus || randomItem(card.focusPoints);

  return {
    id: `${card.id}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    card,
    orientation,
    aura,
    energyScore: score,
    universeMessage: layered.universeMessage || selectedModeText?.guidance?.(card, orientation) || fallbackGuidance,
    soulMessage: layered.soulMessage || randomItem(card.soulMessages),
    warning: layered.warning || randomItem(card.warnings),
    focus,
    focusPoint: focus,
    emotionalState: randomItem(card.emotionalStates),
    guidance: layered.guidance || fallbackGuidance,
    mission: layered.mission || selectedModeText?.focus || randomItem(card.focusPoints),
    affirmation: layered.affirmation || randomItem(card.soulMessages),
    love: layered.love || makeAreaInsight('love', card, orientation),
    work: layered.work || makeAreaInsight('work', card, orientation),
    money: layered.money || makeAreaInsight('money', card, orientation)
  };
}
