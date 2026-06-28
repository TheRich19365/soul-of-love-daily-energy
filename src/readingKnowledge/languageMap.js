export const languageModes = ["TH", "EN", "MIX"];

export const energyKeywordMap = {
  harmony: { TH: "ความกลมกลืน / สมดุลภายใน", EN: "harmony", MIX: "harmony / สมดุลภายใน" },
  healing: { TH: "การเยียวยา", EN: "healing", MIX: "healing / การเยียวยา" },
  intuition: { TH: "สัญชาตญาณ / ญาณรู้ภายใน", EN: "intuition", MIX: "intuition / ญาณรู้ภายใน" },
  awakening: { TH: "การตื่นรู้", EN: "awakening", MIX: "awakening / การตื่นรู้" },
  mystery: { TH: "ความลี้ลับ", EN: "mystery", MIX: "mystery / ความลี้ลับ" },
  hope: { TH: "ความหวัง", EN: "hope", MIX: "hope / ความหวัง" },
  structure: { TH: "โครงสร้าง", EN: "structure", MIX: "structure / โครงสร้าง" },
  movement: { TH: "การเคลื่อนไหว", EN: "movement", MIX: "movement / การเคลื่อนไหว" },
  courage: { TH: "ความกล้า", EN: "courage", MIX: "courage / ความกล้า" },
  solitude: { TH: "การอยู่กับตนเอง", EN: "solitude", MIX: "solitude / การอยู่กับตนเอง" },
  transformation: { TH: "การเปลี่ยนผ่าน", EN: "transformation", MIX: "transformation / การเปลี่ยนผ่าน" },
  balance: { TH: "ความสมดุล", EN: "balance", MIX: "balance / ความสมดุล" },
  clarity: { TH: "ความชัดเจน", EN: "clarity", MIX: "clarity / ความชัดเจน" },
  release: { TH: "การปล่อยวาง", EN: "release", MIX: "release / การปล่อยวาง" },
  trust: { TH: "ความไว้วางใจ", EN: "trust", MIX: "trust / ความไว้วางใจ" },
  power: { TH: "พลังภายใน", EN: "power", MIX: "power / พลังภายใน" }
};

export function translateEnergyKeyword(keyword, language = "TH") {
  return energyKeywordMap[keyword]?.[language] || keyword;
}
