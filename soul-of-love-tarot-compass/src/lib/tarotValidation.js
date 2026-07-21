export function validateTarotDeck(deck) {
  const errors = [];
  const ids = new Set(deck.map((card) => card.id));
  const majors = deck.filter((card) => card.arcana === "Major");
  const minors = deck.filter((card) => card.arcana === "Minor");
  const suits = ["Wands", "Cups", "Swords", "Pentacles"];

  if (deck.length !== 78) errors.push(`Deck must contain 78 cards, received ${deck.length}.`);
  if (ids.size !== deck.length) errors.push("Every card id must be unique.");
  if (majors.length !== 22) errors.push(`Major Arcana must contain 22 cards, received ${majors.length}.`);
  if (minors.length !== 56) errors.push(`Minor Arcana must contain 56 cards, received ${minors.length}.`);

  suits.forEach((suit) => {
    const count = deck.filter((card) => card.suit === suit).length;
    if (count !== 14) errors.push(`${suit} must contain 14 cards, received ${count}.`);
  });

  deck.forEach((card) => {
    if (!card.nameTh || !card.nameEn) errors.push(`${card.id} is missing Thai or English name.`);
    if (!card.element || !card.direction) errors.push(`${card.id} is missing element or direction.`);
    if (!card.meaningUpright || !card.meaningReversed) errors.push(`${card.id} is missing meanings.`);
    if (!card.keywordsUpright?.length || !card.keywordsReversed?.length) errors.push(`${card.id} is missing keywords.`);
  });

  if (errors.length && process.env.NODE_ENV !== "production") {
    throw new Error(`Tarot deck validation failed:\n${errors.join("\n")}`);
  }

  return { valid: errors.length === 0, errors };
}
