export function getLayoutProfile(reading) {
  const titleLength = Math.max(reading.card.thaiName.length, reading.card.englishName.length);
  const messageLength = reading.universeMessage.length;
  const pressure = titleLength > 22 || messageLength > 160 ? "high" : titleLength > 15 || messageLength > 118 ? "medium" : "low";

  return {
    pressure,
    titleClass:
      titleLength > 22
        ? "text-base leading-5"
        : titleLength > 15
          ? "text-[1.05rem] leading-6"
          : "text-lg leading-6",
    exportTitleClass:
      titleLength > 22
        ? "text-2xl leading-tight"
        : titleLength > 15
          ? "text-3xl leading-tight"
          : "text-4xl leading-tight",
    artworkClass: pressure === "high" ? "h-[80%] w-[80%]" : pressure === "medium" ? "h-[84%] w-[84%]" : "h-[88%] w-[88%]",
    symbolClass: pressure === "high" ? "h-[80%] w-[80%]" : pressure === "medium" ? "h-[84%] w-[84%]" : "h-[88%] w-[88%]",
    exportSymbolSize: pressure === "high" ? "h-36 w-36" : pressure === "medium" ? "h-40 w-40" : "h-44 w-44",
    quoteMax: pressure === "high" ? 108 : pressure === "medium" ? 126 : 144
  };
}

export function orientationLabel(orientation) {
  return orientation === "upright" ? "Upright / พลังเปิด" : "Reversed / พลังทบทวน";
}

export function orientationMeaning(reading) {
  return reading.orientation === "upright" ? reading.card.uprightMeaning : reading.card.reversedMeaning;
}

export function shortenText(text, maxLength) {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

export function createSocialDisplayQuote(reading) {
  const cleaned = reading.universeMessage
    .replace(/วันนี้ไพ่[^,.，、:：]*[:：]?\s*/gi, "")
    .replace(/วันนี้คือ\s*/gi, "")
    .replace(/สะท้อน(?:ให้เห็น)?\s*/gi, "")
    .replace(/ผ่านพลัง(?:งาน)?[^,.，、:：]*[:：]?\s*/gi, "")
    .replace(/พลังงานของคุณ\s*/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^["“”'‘’]+|["“”'‘’]+$/g, "");

  const source = cleaned || reading.affirmation || reading.guidance || reading.card.energyTheme;
  return shortenText(source, 80);
}
