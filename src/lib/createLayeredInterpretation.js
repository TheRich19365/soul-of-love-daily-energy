function getEnergyBand(score) {
  if (score >= 85) return "สูงและเปล่งประกาย";
  if (score >= 65) return "มั่นคงและพร้อมขยับ";
  if (score >= 45) return "ละเอียดและต้องประคอง";
  return "เบาและควรถนอม";
}

function getNarrativeCore(card, orientation, aura, energyScore) {
  const primaryTag = card.energyTags?.[0] || card.energyTheme;
  const secondaryTag = card.energyTags?.[1] || card.archetype;
  const energyBand = getEnergyBand(energyScore);
  const upright = orientation === "upright";

  return {
    primaryTag,
    secondaryTag,
    energyBand,
    posture: upright ? "เปิดรับและลงมืออย่างมีสติ" : "ทบทวนด้านในก่อนขยับออกไป",
    pace: energyScore >= 75 ? "เดินให้ชัดและใช้พลังอย่างสง่างาม" : energyScore >= 50 ? "ค่อย ๆ จัดจังหวะให้พอดีกับใจ" : "ลดเสียงรบกวนและกลับมาดูแลตัวเองก่อน",
    relationshipTone: upright ? "สื่อสารอย่างจริงใจโดยไม่เร่งคำตอบ" : "ฟังความรู้สึกที่ยังไม่ได้พูดออกมาก่อน",
    workTone: energyScore >= 70 ? "เลือกงานสำคัญแล้วพุ่งพลังไปที่สิ่งนั้น" : "ทำให้เล็กลง ชัดขึ้น และจบได้จริง",
    moneyTone: energyScore >= 70 ? "ใช้ทรัพยากรเพื่อสร้างคุณค่าระยะยาว" : "เก็บพลังเงินไว้กับสิ่งจำเป็นและไม่ตัดสินใจจากอารมณ์",
    shadowTone: upright ? "อย่าใช้พลังที่เปิดอยู่จนลืมพัก" : "อย่าปล่อยให้ความลังเลกลายเป็นการปิดใจ",
    auraTone: `ออร่า ${aura.name} (${aura.english}) ช่วยแต้มโทนของวันนี้ให้กลับมาอยู่กับ ${primaryTag}`
  };
}

export function createLayeredInterpretation({ card, orientation, aura, energyScore }) {
  const core = getNarrativeCore(card, orientation, aura, energyScore);
  const orientationMeaning = orientation === "upright" ? card.uprightMeaningThai : card.reversedMeaningThai;

  return {
    universeMessage: `วันนี้ไพ่ ${card.thaiName} สะท้อนธีม ${card.energyTheme} ผ่านพลัง ${core.primaryTag} และออร่า ${aura.name} จักรวาลไม่ได้เร่งให้ฟันธงชีวิต แต่ชวนให้คุณ ${core.posture}`,
    guidance: `${orientationMeaning} ใช้แกนของ ${core.primaryTag} เป็นเข็มทิศ แล้ว${core.pace} เพื่อให้พลังระดับ ${core.energyBand} ทำงานแบบไม่กดดันตัวเอง`,
    mission: `ภารกิจวันนี้คือแปลงพลัง ${core.primaryTag} ให้เป็นการกระทำหนึ่งอย่างที่จับต้องได้ เลือกสิ่งที่ทำให้ใจนิ่งขึ้น ไม่ใช่สิ่งที่ทำเพื่อพิสูจน์ตัวเอง`,
    soulMessage: `เสียงลึกของ ${card.archetype} บอกให้คุณไว้ใจบทเรียนของ ${core.secondaryTag} มากขึ้น ${core.auraTone} โดยยังอ่อนโยนกับจังหวะของตัวเอง`,
    love: `ความรักวันนี้ควรเคลื่อนผ่าน ${core.relationshipTone} ไพ่ ${card.thaiName} ชวนให้ความสัมพันธ์เป็นพื้นที่ปลอดภัย ไม่ใช่สนามทดสอบคุณค่าของใคร`,
    work: `งานและเส้นทางวันนี้เหมาะกับการ${core.workTone} ให้ธีม ${card.energyTheme} กลายเป็นโครงงานเล็ก ๆ ที่เดินต่อได้จริง`,
    money: `เรื่องเงินและทรัพยากรวันนี้ให้${core.moneyTone} พลัง ${core.primaryTag} จะช่วยให้คุณมองคุณค่าของสิ่งที่มีอยู่ชัดขึ้น`,
    warning: `คำเตือนแบบอ่อนโยนคือ ${core.shadowTone} ด้านเงาของไพ่ใบนี้ไม่ได้มาเพื่อทำให้กลัว แต่มาเพื่อเตือนให้ใช้พลังอย่างสมดุล`,
    focus: `จุดโฟกัสวันนี้: กลับมาที่ ${core.primaryTag} แล้วถามตัวเองว่า “ก้าวเล็กที่สุดที่ทำให้ใจชัดขึ้นคืออะไร”`,
    affirmation: `ฉันรับพลังของ ${card.thaiName} ผ่าน ${core.primaryTag} อย่างมีสติ และอนุญาตให้วันนี้ค่อย ๆ เปิดทางที่เหมาะกับหัวใจของฉัน`
  };
}
