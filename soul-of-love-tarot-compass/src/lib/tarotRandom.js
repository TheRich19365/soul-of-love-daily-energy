function randomFloat() {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const values = new Uint32Array(1);
    crypto.getRandomValues(values);
    return values[0] / 4294967296;
  }
  return Math.random();
}

export function shuffleDeck(cards) {
  const shuffled = [...cards];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(randomFloat() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

export function drawCards(deck, count, allowReversed) {
  return shuffleDeck(deck)
    .slice(0, count)
    .map((card) => ({
      card,
      orientation: allowReversed && randomFloat() >= 0.5 ? "reversed" : "upright",
    }));
}
