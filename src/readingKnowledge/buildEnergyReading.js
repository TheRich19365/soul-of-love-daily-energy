import { getAuraProfile } from "./auraProfiles.js";
import { getCardAspect } from "./cardAspects.js";
import { getCardVoice } from "./cardVoices.js";
import { createGrammarContext } from "./grammarEngine.js";
import { composeKnowledgeAreaText } from "./knowledgeComposer.js";

function normalizeAspect(aspect) {
  if (aspect === "Light" || aspect === "Shadow") return aspect;
  return aspect === "upright" ? "Light" : "Shadow";
}

function getIntensity(score) {
  if (score <= 39) {
    return {
      id: "low",
      th: "เบา ลึก และละเอียด",
      emotional: "ใจต้องการความสงบ การพัก และการฟังตัวเอง",
      modifier: "พลังวันนี้ไม่จำเป็นต้องผลักดันมาก แต่เหมาะกับการสังเกตสิ่งเล็ก ๆ ที่ใจบอก"
    };
  }
  if (score <= 69) {
    return {
      id: "medium",
      th: "สมดุลและกำลังเคลื่อนไหว",
      emotional: "ใจอยู่ในจังหวะที่พร้อมจัดระบบและเลือกทิศทาง",
      modifier: "พลังวันนี้พอเหมาะสำหรับการลงมือแบบไม่รีบและไม่หยุดนิ่งเกินไป"
    };
  }
  return {
    id: "high",
    th: "เด่น ชัด และเปล่งประกาย",
    emotional: "ใจมีแรงส่งสูง แต่ยังควรใช้พลังอย่างมีสติ",
    modifier: "พลังวันนี้ชัดและแรงพอจะขยับเรื่องสำคัญ หากไม่กระจายไปหลายทางเกินไป"
  };
}

export function buildEnergyReading({ card, aura, aspect, score, language = "TH" }) {
  const normalizedAspect = normalizeAspect(aspect);
  const cardAspect = getCardAspect(card);
  const auraProfile = getAuraProfile(aura);
  const cardVoice = getCardVoice(card);
  const intensity = getIntensity(score);

  const context = {
    card,
    aura,
    cardAspect,
    auraProfile,
    cardVoice,
    aspect: normalizedAspect,
    score,
    intensity,
    language
  };
  context.grammar = createGrammarContext(context);

  return {
    universe: composeKnowledgeAreaText("universe", context),
    guidance: composeKnowledgeAreaText("guidance", context),
    love: composeKnowledgeAreaText("love", context),
    work: composeKnowledgeAreaText("work", context),
    money: composeKnowledgeAreaText("money", context),
    focus: composeKnowledgeAreaText("focus", context),
    warning: composeKnowledgeAreaText("warning", context),
    affirmation: composeKnowledgeAreaText("affirmation", context),
    mission: composeKnowledgeAreaText("mission", context),
    mainEnergy: `${cardAspect.coreTH} ผ่านเลนส์ออร่า${auraProfile.thName}`,
    emotionalState: intensity.emotional,
    soulMessage: `${cardVoice.emotionalTH}. ${cardAspect.lessonTH}. ${auraProfile.adviceToneTH}`,
    meta: {
      aspect: normalizedAspect,
      auraProfileId: auraProfile.id,
      cardAspectId: cardAspect.id,
      cardVoiceId: cardVoice.id,
      intensity: intensity.id,
      language
    }
  };
}
