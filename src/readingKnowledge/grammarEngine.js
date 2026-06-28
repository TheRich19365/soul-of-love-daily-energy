export const openingPatterns = {
  universe: [
    "พลังวันนี้กำลังชี้ไปที่",
    "หัวใจของวันนี้อยู่ที่",
    "สิ่งที่จักรวาลสะท้อนกลับมาคือ",
    "จังหวะวันนี้กำลังพาคุณกลับมาเห็น",
    "แก่นของพลังงานวันนี้คือ",
    "ภาพรวมของวันกำลังเปิดให้เห็น",
    "คลื่นพลังหลักของวันนี้วางอยู่บน",
    "เสียงลึกของวันนี้กำลังพูดถึง"
  ],
  guidance: [
    "ทิศทางที่ใช่สำหรับวันนี้คือ",
    "คำแนะนำที่ควรหยิบมาใช้คือ",
    "ก้าวที่เหมาะกับพลังนี้คือ",
    "วิธีเดินวันนี้ควรเริ่มจาก",
    "แนวทางที่ช่วยให้ใจไม่กระจายคือ",
    "สิ่งที่ควรจัดก่อนคือ",
    "คำตอบเชิงปฏิบัติอยู่ที่",
    "พลังนี้ขอให้คุณเลือก"
  ],
  affirmation: [
    "ฉันอนุญาตให้ตัวเอง",
    "ฉันเลือก",
    "ฉันกำลังเรียนรู้ที่จะ",
    "ฉันวางใจให้หัวใจ",
    "ฉันให้เกียรติการเติบโตของตัวเองผ่าน",
    "ฉันค่อย ๆ กลับมาหา",
    "ฉันรับพลังวันนี้ด้วย",
    "ฉันยืนอยู่กับ"
  ],
  mission: [
    "ภารกิจวันนี้คือ",
    "ก้าวเดียวที่พอสำหรับวันนี้คือ",
    "สิ่งที่ควรทำให้เป็นรูปธรรมคือ",
    "การกระทำเล็กที่เหมาะกับพลังนี้คือ",
    "วันนี้ให้เลือกลงมือกับ",
    "งานพลังงานของวันนี้คือ",
    "ภารกิจที่จับต้องได้คือ",
    "หนึ่งสิ่งที่ควรปิดให้จบคือ"
  ]
};

export const transitionPatterns = [
  "จากนั้นให้สังเกตว่า",
  "เมื่อมองผ่านเลนส์นี้จะเห็นว่า",
  "ในระดับใจ สิ่งนี้กำลังบอกว่า",
  "พอพลังนี้ลงสู่ชีวิตจริง มันชวนให้",
  "ชั้นที่ละเอียดกว่าของข้อความนี้คือ",
  "ถ้าฟังให้ช้าลง จะพบว่า",
  "เมื่อไม่รีบสรุป คุณจะเห็นว่า",
  "ส่วนที่ควรให้ความสำคัญคือ"
];

export const narrativeBridges = {
  universe: [
    (cardName, voice) => `${cardName} เปิดภาพนี้ด้วยจังหวะที่${voice}`,
    (cardName, voice) => `ภาษาของ${cardName}ในวันนี้มีโทน${voice}`,
    (cardName, voice) => `เมื่อพลังของ${cardName}เคลื่อนผ่านวัน จังหวะของมันจะ${voice}`,
    (cardName, voice) => `${cardName}ไม่ได้เร่งให้สรุป แต่ชวนมองด้วยพลังที่${voice}`,
    (cardName, voice) => `สัญลักษณ์ของ${cardName}ทำให้ภาพรวมวันนี้ดู${voice}`,
    (cardName, voice) => `แก่นของ${cardName}ค่อย ๆ วางน้ำหนักลงแบบ${voice}`
  ],
  guidance: [
    (cardName, voice) => `${cardName}แนะนำให้จัดจังหวะด้วยความ${voice}`,
    (cardName, voice) => `เมื่อนำ${cardName}มาใช้จริง ให้เลือกทางที่${voice}`,
    (cardName, voice) => `คำตอบเชิงปฏิบัติของ${cardName}มีน้ำเสียง${voice}`,
    (cardName, voice) => `ให้พลังของ${cardName}กลายเป็นการลงมือที่${voice}`,
    (cardName, voice) => `${cardName}ชี้ไปที่วิธีเดินซึ่ง${voice}`,
    (cardName, voice) => `จังหวะที่เหมาะของ${cardName}คือการเคลื่อนแบบ${voice}`
  ]
};

export const actionVerbs = [
  "จัดลำดับ",
  "ลดเสียงรบกวน",
  "เลือกหนึ่งก้าว",
  "วางขอบเขต",
  "ทำให้ชัด",
  "พักเพื่อฟัง",
  "ลงมืออย่างพอดี",
  "สื่อสารอย่างจริงใจ",
  "ตรวจความจำเป็น",
  "คืนพื้นที่ให้ใจ"
];

export const emotionalVerbs = [
  "ฟังใจโดยไม่ตัดสิน",
  "ยอมรับความรู้สึกที่ยังอธิบายไม่ครบ",
  "ให้ความอ่อนโยนกับส่วนที่เหนื่อย",
  "อยู่กับความจริงอย่างนุ่มนวล",
  "รับรู้ความต้องการที่ซ่อนอยู่",
  "ประคองตัวเองด้วยความเมตตา",
  "คืนความปลอดภัยให้หัวใจ",
  "มองเงาเป็นข้อมูล ไม่ใช่ข้อกล่าวโทษ"
];

export const reflectionVerbs = [
  "ทบทวน",
  "สังเกต",
  "แยกแยะ",
  "รับรู้",
  "ฟังลึก",
  "มองให้ตรง",
  "ถามใจอย่างซื่อสัตย์",
  "คืนความหมายให้ประสบการณ์"
];

export const areaClosings = {
  universe: [
    "นี่คือภาพรวมเชิงสัญลักษณ์ ไม่ใช่คำตอบตายตัว",
    "ให้รับไว้เป็นแสงนำทาง ไม่ใช่กรอบที่บังคับชีวิต",
    "ข้อความนี้เหมาะกับการใช้สังเกตตัวเองตลอดวัน",
    "ยิ่งฟังอย่างไม่เร่ง พลังนี้ยิ่งชัดขึ้น"
  ],
  guidance: [
    "เลือกทำเท่าที่ใจและชีวิตจริงรองรับได้",
    "ความคืบหน้าเล็ก ๆ ยังมีคุณค่า",
    "ให้ความชัดมาก่อนความสมบูรณ์แบบ",
    "อย่าลืมเว้นที่ว่างให้ร่างกายตามทันใจ"
  ],
  affirmation: [
    "และฉันไม่ต้องรีบกลายเป็นใครนอกจากตัวเอง",
    "อย่างนุ่มนวล ชัดเจน และมีขอบเขต",
    "ทีละลมหายใจ ทีละการเลือก",
    "โดยไม่ลดทอนคุณค่าของหัวใจ"
  ],
  mission: [
    "ทำให้จบแบบเรียบง่ายก็เพียงพอ",
    "ไม่ต้องใหญ่ แต่ต้องจริง",
    "ให้เห็นผลเล็ก ๆ ภายในวันนี้",
    "แล้วปล่อยให้ใจรับรู้ว่าคุณขยับแล้ว"
  ]
};

export const poeticClosings = [
  "แสงเล็ก ๆ ก็ยังเป็นแสง",
  "สิ่งที่จริงไม่จำเป็นต้องเสียงดัง",
  "หัวใจรู้จังหวะของมันเสมอ",
  "ความชัดบางครั้งเริ่มจากความเบาลง",
  "ก้าวที่นุ่มก็ยังพาไปข้างหน้า",
  "การฟังตัวเองคือรูปแบบหนึ่งของความกล้า",
  "วันนี้ไม่ต้องชนะ แค่ไม่ทอดทิ้งตัวเอง",
  "ความหมายจะชัดขึ้นเมื่อใจไม่ถูกเร่ง"
];

const auraMeaning = {
  "pearl-white": "ความชัดใส การรีเซ็ต และความอ่อนโยน",
  "solar-gold": "ความมั่นใจ การมองเห็นคุณค่า และพลังสร้างสรรค์",
  "crimson-red": "แรงชีวิต ความกล้า และความปรารถนาที่ต้องมีทิศทาง",
  "rose-pink": "ความอ่อนโยน การเปิดหัวใจ และการไม่ลดคุณค่าตัวเอง",
  "emerald-green": "การเยียวยา การซ่อมแซม และความกลมกลืนของใจ",
  turquoise: "การสื่อสาร ความลื่นไหล และความจริงใจที่ฟังกันได้",
  "sky-blue": "ความสงบ มุมมองกว้าง และพื้นที่ให้ใจหายใจ",
  indigo: "ญาณรู้ภายใน ความลึก และคำตอบที่ต้องฟังช้า ๆ",
  violet: "ความหมายที่สูงขึ้น การเปลี่ยนผ่าน และการเติบโตด้านใน",
  "shadow-violet": "ความจริงที่ซ่อนอยู่ เงาภายใน และการทบทวนอย่างเมตตา",
  "obsidian-black": "ขอบเขต การปกป้องพลัง และการตัดภาพลวงอย่างสงบ",
  "rainbow-prism": "การรวมหลายบทเรียนและการเปลี่ยนแปลงหลายมิติ"
};

const runtimeAuraMeaning = {
  Silver: "ความนิ่งแบบจันทรา การสะท้อนใจ และความชัดที่ค่อย ๆ ปรากฏ",
  Pearl: "ความสะอาดของใจ การเริ่มใหม่ และความอ่อนโยนที่ไม่เร่งรัด",
  Gold: "ความมั่นใจ คุณค่าภายใน และการกล้าให้แสงของตัวเองทำงาน",
  Crimson: "แรงชีวิต ความกล้า และความปรารถนาที่ต้องมีทิศทาง",
  Emerald: "การเยียวยา การซ่อมแซม และความกลมกลืนของใจ",
  Indigo: "ญาณรู้ภายใน ความลึก และคำตอบที่ต้องฟังช้า ๆ",
  Violet: "ความหมายที่สูงขึ้น การเปลี่ยนผ่าน และการเติบโตด้านใน",
  "Rose Gold": "ความอ่อนโยน การเปิดหัวใจ และการเห็นคุณค่าตัวเอง",
  Turquoise: "การสื่อสาร ความลื่นไหล และความจริงใจที่ฟังกันได้",
  Blue: "ความสงบ มุมมองกว้าง และพื้นที่ให้ใจหายใจ"
};

const voiceStyleMeaning = {
  "the-fool": "เบา เปิด และอยากลองโดยไม่กดดันตัวเอง",
  "the-magician": "ตั้งใจ ชัด และสร้างสรรค์อย่างมีทิศทาง",
  "the-high-priestess": "เงียบ ลึก และฟังญาณรู้ภายใน",
  "the-emperor": "มั่นคง มีโครงสร้าง และรับผิดชอบต่อขอบเขต",
  "the-hermit": "นุ่ม ลึก และหันกลับมาฟังตัวเอง",
  "the-chariot": "ตรง กระชับ และขยับด้วยวินัย",
  default: "อ่อนโยน ชัดเจน และสะท้อนตัวเอง"
};

function stableIndex(key, count) {
  const value = Array.from(String(key)).reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 17), 0);
  return value % count;
}

export function pickGrammar(list, context, area, variantSalt = "default") {
  if (!list?.length) return "";
  const cardKey = context.card?.id ?? context.cardAspect?.id ?? "card";
  const auraKey = context.aura?.english ?? context.aura?.enName ?? context.auraProfile?.id ?? "aura";
  const key = `${cardKey}|${auraKey}|${context.aspect}|${area}|${context.intensity?.id}|${variantSalt}`;
  return list[stableIndex(key, list.length)];
}

export function createGrammarContext(context) {
  const areaPick = (area, collection, salt) => pickGrammar(collection, context, area, salt);

  return {
    opening(area, salt = "opening") {
      return areaPick(area, openingPatterns[area] || openingPatterns.universe, salt);
    },
    transition(area, salt = "transition") {
      return areaPick(area, transitionPatterns, salt);
    },
    action(area, salt = "action") {
      return areaPick(area, actionVerbs, salt);
    },
    emotional(area, salt = "emotional") {
      return areaPick(area, emotionalVerbs, salt);
    },
    reflection(area, salt = "reflection") {
      return areaPick(area, reflectionVerbs, salt);
    },
    closing(area, salt = "closing") {
      return areaPick(area, areaClosings[area] || areaClosings.guidance, salt);
    },
    poetic(area, salt = "poetic") {
      return areaPick(area, poeticClosings, salt);
    },
    bridge(area, cardName, voice, salt = "bridge") {
      const bridge = areaPick(area, narrativeBridges[area] || narrativeBridges.universe, salt);
      return typeof bridge === "function" ? bridge(cardName, voice) : "";
    },
    auraMeaning() {
      const runtimeKey = context.aura?.english ?? context.aura?.enName;
      return runtimeAuraMeaning[runtimeKey] || auraMeaning[context.auraProfile?.id] || "การสังเกตพลังงานอย่างอ่อนโยน";
    },
    voiceMeaning() {
      return voiceStyleMeaning[context.cardVoice?.id] || voiceStyleMeaning.default;
    }
  };
}

function trimSentence(text = "") {
  return text.replace(/\s+/g, " ").trim();
}

export function diversifyAreaText(area, text, context) {
  if (!["universe", "guidance", "affirmation", "mission"].includes(area)) {
    return text;
  }

  const grammar = context.grammar || createGrammarContext(context);
  const cardName = context.cardAspect.thName;
  const core = context.cardAspect.coreTH;
  const aura = grammar.auraMeaning();
  const voice = grammar.voiceMeaning();
  const base = trimSentence(text);

  if (area === "universe") {
    return trimSentence(
      `${grammar.opening(area, "u1")} ${core}. ${grammar.transition(area, "u2")} ${aura}. ` +
        `${grammar.bridge(area, cardName, voice, "u4")}: ${base} ${grammar.poetic(area, "u3")}`
    );
  }

  if (area === "guidance") {
    return trimSentence(
      `${grammar.opening(area, "g1")} ${grammar.action(area, "g2")}กับสิ่งที่สำคัญที่สุดก่อน. ` +
        `${grammar.transition(area, "g3")} ${aura}; ${grammar.bridge(area, cardName, voice, "g5")}. ${base} ${grammar.closing(area, "g4")}`
    );
  }

  if (area === "affirmation") {
    return trimSentence(
      `${grammar.opening(area, "a1")} ${grammar.emotional(area, "a2")} ผ่านพลังของ${cardName}. ` +
        `ฉันรับ${aura}ไว้เป็นแรงประคอง และ${grammar.reflection(area, "a3")}สิ่งที่ใจต้องการจริง. ${grammar.closing(area, "a4")}`
    );
  }

  return trimSentence(
    `${grammar.opening(area, "m1")} ${grammar.action(area, "m2")}หนึ่งเรื่องที่เกี่ยวกับ${core}. ` +
      `${grammar.transition(area, "m3")} ${aura}; ให้พลังของ${cardName}ออกมาเป็นการกระทำที่${voice}. ${grammar.closing(area, "m4")}`
  );
}
