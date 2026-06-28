import { getAuraKnowledge } from "./auraKnowledge.js";

export const auraProfiles = [
  {
    id: "pearl-white",
    thName: "ขาวมุก",
    enName: "Pearl White",
    hex: "#f8fafc",
    keywordsTH: ["ความบริสุทธิ์", "การเริ่มใหม่", "ความเบาใจ"],
    keywordsEN: ["purity", "new beginning", "gentle clarity"],
    lightToneTH: "ทำให้พลังของไพ่ใบนั้นนุ่ม สะอาด และพร้อมเริ่มต้นใหม่อย่างไม่กดดัน",
    shadowToneTH: "ชวนมองความเปราะบาง ความว่าง และความต้องการพักใจอย่างซื่อสัตย์",
    adviceToneTH: "เลือกสิ่งเรียบง่ายที่ทำให้ใจโล่งก่อน แล้วค่อยตัดสินใจเรื่องใหญ่",
    visualMood: "pearl mist, soft starlight, clean spiritual atmosphere",
    promptColorLabel: "pearl white aura"
  },
  {
    id: "solar-gold",
    thName: "ทองสุริยะ",
    enName: "Solar Gold",
    hex: "#f8c76b",
    keywordsTH: ["ความมั่นใจ", "คุณค่า", "แสงนำทาง"],
    keywordsEN: ["confidence", "value", "solar clarity"],
    lightToneTH: "ขยายพลังของไพ่ให้เด่นขึ้นในเรื่องความมั่นใจ คุณค่า และการกล้าแสดงตัว",
    shadowToneTH: "สะท้อนบทเรียนเรื่องการพิสูจน์ตัวเองมากเกินไป หรือแบกความคาดหวังไว้บนบ่า",
    adviceToneTH: "ใช้แสงของตัวเองอย่างอบอุ่น ไม่ต้องสว่างจนลืมฟังหัวใจ",
    visualMood: "warm gold glow, elegant radiance, noble clarity",
    promptColorLabel: "solar gold aura"
  },
  {
    id: "crimson-red",
    thName: "แดงคริมสัน",
    enName: "Crimson Red",
    hex: "#fb7185",
    keywordsTH: ["แรงขับ", "ความกล้า", "พลังชีวิต"],
    keywordsEN: ["drive", "courage", "life force"],
    lightToneTH: "เติมพลังลงมือ ความกล้า และแรงผลักให้ไพ่ทำงานชัดขึ้น",
    shadowToneTH: "ชวนสังเกตความรีบ ความหงุดหงิด หรือการใช้แรงมากกว่าความเข้าใจ",
    adviceToneTH: "ขยับอย่างมีทิศทาง ใช้ไฟภายในเพื่อสร้าง ไม่ใช่เพื่อเผาตัวเอง",
    visualMood: "crimson aura, warm pulse, alive and focused",
    promptColorLabel: "crimson red aura"
  },
  {
    id: "rose-pink",
    thName: "ชมพูกุหลาบ",
    enName: "Rose Pink",
    hex: "#f0a7a0",
    keywordsTH: ["ความรัก", "ความอ่อนโยน", "การเปิดใจ"],
    keywordsEN: ["love", "softness", "emotional openness"],
    lightToneTH: "ทำให้ไพ่พูดผ่านหัวใจ ความสัมพันธ์ และการดูแลตัวเองอย่างอ่อนโยน",
    shadowToneTH: "สะท้อนความคาดหวังในความรัก การยอมมากเกินไป หรือความกลัวไม่ถูกรัก",
    adviceToneTH: "เริ่มจากการพูดกับตัวเองอย่างเมตตา แล้วค่อยส่งต่อความรักให้ผู้อื่น",
    visualMood: "rose glow, gentle heart field, soft emotional light",
    promptColorLabel: "rose pink aura"
  },
  {
    id: "emerald-green",
    thName: "เขียวมรกต",
    enName: "Emerald Green",
    hex: "#34d399",
    keywordsTH: ["การเยียวยา", "การเติบโต", "ความมั่นคงของหัวใจ"],
    keywordsEN: ["healing", "growth", "heart stability"],
    lightToneTH: "เปิดพื้นที่ให้ไพ่ทำงานผ่านการเยียวยา การเติบโต และความสัมพันธ์กับชีวิตจริง",
    shadowToneTH: "ชวนเห็นจุดที่ใจยังเก็บความเหนื่อย ความคาดหวัง หรือความกลัวการเปลี่ยนแปลง",
    adviceToneTH: "กลับมาดูแลร่างกาย พื้นที่ชีวิต และสิ่งเล็ก ๆ ที่ทำให้ใจฟื้น",
    visualMood: "emerald healing light, grounded heart, living glow",
    promptColorLabel: "emerald green aura"
  },
  {
    id: "turquoise",
    thName: "เทอร์ควอยซ์",
    enName: "Turquoise",
    hex: "#2dd4bf",
    keywordsTH: ["การสื่อสาร", "การไหลลื่น", "ความจริงใจ"],
    keywordsEN: ["communication", "flow", "truthful expression"],
    lightToneTH: "ทำให้ไพ่ชัดขึ้นผ่านการพูด การฟัง และการขยับตามจังหวะที่เป็นธรรมชาติ",
    shadowToneTH: "สะท้อนคำที่ยังติดอยู่ในใจ หรือความพยายามทำให้ทุกอย่างดูเรียบร้อยเกินจริง",
    adviceToneTH: "พูดให้เรียบง่าย ซื่อสัตย์ และมีพื้นที่ให้ใจอีกฝ่ายตอบกลับ",
    visualMood: "turquoise current, clear water light, expressive calm",
    promptColorLabel: "turquoise aura"
  },
  {
    id: "sky-blue",
    thName: "ฟ้าคราม",
    enName: "Sky Blue",
    hex: "#38bdf8",
    keywordsTH: ["ความชัดเจน", "ความสงบ", "มุมมองกว้าง"],
    keywordsEN: ["clarity", "calm", "higher perspective"],
    lightToneTH: "ช่วยให้ไพ่สื่อสารด้วยความโปร่ง โล่ง และเห็นภาพรวมมากขึ้น",
    shadowToneTH: "ชวนระวังการคิดวน หรือการหลบความรู้สึกด้วยเหตุผลมากเกินไป",
    adviceToneTH: "เว้นระยะให้ใจหายใจ แล้วเลือกคำตอบที่ชัดแต่ไม่แข็ง",
    visualMood: "sky blue clarity, airy cosmic light, calm openness",
    promptColorLabel: "sky blue aura"
  },
  {
    id: "indigo",
    thName: "ครามอินดิโก",
    enName: "Indigo",
    hex: "#818cf8",
    keywordsTH: ["ญาณรู้ภายใน", "การมองลึก", "ความลี้ลับ"],
    keywordsEN: ["intuition", "inner sight", "mystery"],
    lightToneTH: "ทำให้ไพ่ทำงานผ่านสัญชาตญาณ ความฝัน และการเข้าใจสิ่งที่ยังไม่มีคำอธิบาย",
    shadowToneTH: "สะท้อนความลังเล ความกลัวสิ่งที่มองไม่เห็น หรือการตีความมากเกินไป",
    adviceToneTH: "ฟังเสียงภายใน แต่ให้ชีวิตจริงช่วยยืนยันคำตอบด้วย",
    visualMood: "indigo night, intuitive glow, quiet mystery",
    promptColorLabel: "indigo aura"
  },
  {
    id: "violet",
    thName: "ม่วงไวโอเล็ต",
    enName: "Violet",
    hex: "#a855f7",
    keywordsTH: ["การตื่นรู้", "จิตวิญญาณ", "การยกระดับ"],
    keywordsEN: ["awakening", "spirituality", "higher growth"],
    lightToneTH: "ยกความหมายของไพ่ไปสู่การเรียนรู้ด้านในและการเติบโตทางจิตใจ",
    shadowToneTH: "ชวนระวังการลอยห่างจากความจริง หรือใช้คำว่าจิตวิญญาณแทนการลงมือ",
    adviceToneTH: "ให้ปัญญาภายในนำทาง แต่ยังกลับมาทำสิ่งที่จับต้องได้ในวันนี้",
    visualMood: "violet spiritual glow, sacred softness, elevated calm",
    promptColorLabel: "violet aura"
  },
  {
    id: "shadow-violet",
    thName: "ม่วงเงา",
    enName: "Shadow Violet",
    hex: "#6d28d9",
    keywordsTH: ["เงาภายใน", "การยอมรับ", "พลังที่ยังไม่ถูกรวม"],
    keywordsEN: ["inner shadow", "acceptance", "integration"],
    lightToneTH: "ช่วยให้ไพ่พาเข้าใจพลังลึกที่ยังรอการยอมรับและรวมกลับมาเป็นส่วนหนึ่งของตัวเอง",
    shadowToneTH: "สะท้อนสิ่งที่ถูกกดไว้ ความเหนื่อยลึก หรือ pattern ที่กลับมาเมื่อกดดัน",
    adviceToneTH: "มองด้านเงาอย่างไม่ตัดสิน แล้วถามว่ามันกำลังปกป้องอะไรในใจเรา",
    visualMood: "deep violet shadow light, soft integration, inner temple",
    promptColorLabel: "shadow violet aura"
  },
  {
    id: "obsidian-black",
    thName: "ดำออบซิเดียน",
    enName: "Obsidian Black",
    hex: "#111827",
    keywordsTH: ["การปกป้อง", "ความจริงลึก", "การตัดสิ่งรบกวน"],
    keywordsEN: ["protection", "deep truth", "energetic boundary"],
    lightToneTH: "ทำให้ไพ่ชัดในเรื่องขอบเขต ความจริง และการเลือกไม่รับทุกพลังเข้ามา",
    shadowToneTH: "ชวนสังเกตการปิดใจ ความแข็ง หรือการปกป้องตัวเองจนโดดเดี่ยว",
    adviceToneTH: "ตั้งขอบเขตอย่างสงบ ไม่จำเป็นต้องอธิบายทุกอย่างให้ทุกคนเข้าใจ",
    visualMood: "obsidian cosmic depth, protective glow, quiet power",
    promptColorLabel: "obsidian black aura"
  },
  {
    id: "rainbow-prism",
    thName: "รุ้งปริซึม",
    enName: "Rainbow Prism",
    hex: "#f472b6",
    keywordsTH: ["การรวมพลัง", "ความหลากหลาย", "ความเป็นไปได้"],
    keywordsEN: ["integration", "multiplicity", "possibility"],
    lightToneTH: "ทำให้ไพ่เปิดหลายมุมมองและเชื่อมบทเรียนหลายด้านเข้าด้วยกัน",
    shadowToneTH: "สะท้อนความกระจัดกระจาย หรือการเปิดรับมากจนไม่รู้ว่าจะเริ่มจากตรงไหน",
    adviceToneTH: "เลือกหนึ่งสี หนึ่งจังหวะ หนึ่งก้าว แล้วให้ภาพรวมค่อย ๆ ชัดขึ้นเอง",
    visualMood: "rainbow prism aura, luminous facets, multidimensional softness",
    promptColorLabel: "rainbow prism aura"
  }
];

export const auraProfilesById = Object.fromEntries(auraProfiles.map((profile) => [profile.id, profile]));

const auraAlias = {
  Pearl: "pearl-white",
  "Pearl White": "pearl-white",
  Gold: "solar-gold",
  "Solar Gold": "solar-gold",
  Crimson: "crimson-red",
  "Crimson Red": "crimson-red",
  "Rose Gold": "rose-pink",
  "Rose Pink": "rose-pink",
  Emerald: "emerald-green",
  "Emerald Green": "emerald-green",
  Turquoise: "turquoise",
  Blue: "sky-blue",
  "Sky Blue": "sky-blue",
  Indigo: "indigo",
  Violet: "violet",
  "Shadow Violet": "shadow-violet",
  Obsidian: "obsidian-black",
  "Obsidian Black": "obsidian-black",
  Rainbow: "rainbow-prism",
  "Rainbow Prism": "rainbow-prism",
  Silver: "pearl-white"
};

export function getAuraProfile(aura) {
  const key = aura?.english || aura?.enName || aura?.id || aura?.name;
  const profile = auraProfilesById[auraAlias[key] || key] || auraProfilesById["violet"];
  return {
    ...profile,
    ...getAuraKnowledge(profile, aura)
  };
}
