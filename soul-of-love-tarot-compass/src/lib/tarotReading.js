import { elementInfo } from "../data/tarotCorrespondences.js";
import { spreadDefinitions } from "../data/tarotSpreadDefinitions.js";

export function createReading({ spreadId, drawnCards, allowReversed }) {
  const spread = spreadDefinitions[spreadId];
  const timestamp = new Date().toISOString();
  const cards = drawnCards.map((item, index) => ({
    ...item,
    position: spread.positions[index],
    positionIndex: index,
  }));

  return {
    id: `${timestamp}-${spreadId}`,
    timestamp,
    spreadId,
    spreadLabel: spread.label,
    allowReversed,
    cards,
    elementalSummary: cards.length > 1 ? createElementalSummary(cards) : null,
  };
}

export function createElementalSummary(cards) {
  const elements = Object.keys(elementInfo);
  const total = cards.length || 1;
  const counts = Object.fromEntries(elements.map((element) => [element, 0]));

  cards.forEach(({ card }) => {
    counts[card.derivedElement || card.element] += 1;
  });

  const percentages = Object.fromEntries(elements.map((element) => [element, Math.round((counts[element] / total) * 100)]));
  const max = Math.max(...Object.values(counts));
  const dominant = elements.filter((element) => counts[element] === max && max > 0);
  const missing = elements.filter((element) => counts[element] === 0);
  const balanced = Object.values(counts).every((count) => count <= Math.ceil(total / 2)) && missing.length <= 1;

  return {
    counts,
    percentages,
    dominant,
    missing,
    balanced,
    text: buildElementSummaryText({ dominant, missing, balanced }),
  };
}

function buildElementSummaryText({ dominant, missing, balanced }) {
  if (balanced) {
    return "ภาพรวมค่อนข้างสมดุล หลายธาตุช่วยกันทำงาน จึงเหมาะกับการฟังทั้งความคิด ความรู้สึก แรงผลัก และข้อเท็จจริงพร้อมกัน";
  }

  const dominantText = dominant.map((element) => elementInfo[element].summary).join(" ");
  const missingText = missing.length ? `ธาตุที่ขาดสะท้อนว่า ${missing.map((element) => elementInfo[element].missing).join(" และ ")}` : "";
  return [dominantText, missingText].filter(Boolean).join(" ");
}

export function compactHistoryItem(reading) {
  return {
    id: reading.id,
    timestamp: reading.timestamp,
    spreadId: reading.spreadId,
    cards: reading.cards.map(({ card, orientation }) => ({ id: card.id, orientation })),
    elementalSummary: reading.elementalSummary,
  };
}

export function restoreReadingFromHistory(historyItem, deck) {
  const drawnCards = historyItem.cards
    .map((item) => {
      const card = deck.find((deckCard) => deckCard.id === item.id);
      return card ? { card, orientation: item.orientation } : null;
    })
    .filter(Boolean);
  return createReading({ spreadId: historyItem.spreadId, drawnCards, allowReversed: true });
}

export function buildCopySummary(reading) {
  const date = new Date(reading.timestamp).toLocaleString("th-TH", { dateStyle: "medium", timeStyle: "short" });
  const cardLines = reading.cards.map(({ card, orientation, position }) => {
    const keywords = orientation === "reversed" ? card.keywordsReversed : card.keywordsUpright;
    const meaning = orientation === "reversed" ? card.meaningReversed : card.meaningUpright;
    return [
      `ตำแหน่ง: ${position}`,
      `ไพ่: ${card.nameTh} (${card.nameEn})`,
      `สถานะ: ${orientation === "reversed" ? "ไพ่กลับหัว" : "ไพ่ตั้งตรง"}`,
      `ธาตุ/ทิศ: ${elementInfo[card.derivedElement].th} · ${elementInfo[card.derivedElement].directionTh}`,
      `คำสำคัญ: ${keywords.join(", ")}`,
      `บทสะท้อน: ${meaning}`,
      `คำถาม: ${card.reflectionQuestion}`,
    ].join("\n");
  });

  const summary = reading.elementalSummary
    ? [
        "สรุปธาตุ:",
        ...Object.entries(reading.elementalSummary.percentages).map(([element, value]) => `${elementInfo[element].th}: ${value}%`),
        `ภาพรวม: ${reading.elementalSummary.text}`,
      ].join("\n")
    : `ธาตุของไพ่ใบนี้: ${elementInfo[reading.cards[0].card.derivedElement].th}`;

  return [
    "Soul of Love Tarot Compass",
    `เวลาการอ่าน: ${date}`,
    `รูปแบบ: ${reading.spreadLabel}`,
    "",
    cardLines.join("\n\n"),
    "",
    summary,
    "",
    "หมายเหตุ: การอ่านนี้เป็นภาษาสัญลักษณ์เพื่อการสะท้อนตนเอง ไม่ใช่คำทำนายตายตัว การวินิจฉัย หรือการรับประกันอนาคต",
  ].join("\n");
}
