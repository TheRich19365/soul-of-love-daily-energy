const voiceByCard = {
  "The Fool": "เบา เปิด อยากลอง และไม่กดดัน",
  "The Magician": "ตั้งใจ คม ชัด และสร้างสรรค์",
  "The High Priestess": "เงียบ ลึก ลึกลับ และฟังภายใน",
  "The Empress": "อบอุ่น อุดมสมบูรณ์ ดูแล และมีชีวิต",
  "The Emperor": "มั่นคง มีขอบเขต รับผิดชอบ และเป็นระบบ",
  "The Hierophant": "สุขุม มีปัญญา เชื่อมความรู้กับชีวิตจริง",
  "The Lovers": "จริงใจ อ่อนโยน เลือกจากคุณค่า",
  "The Chariot": "ตรง มีวินัย เคลื่อนที่ และมุ่งเป้า",
  Strength: "นุ่มแต่แข็งแรง กล้าด้วยความเมตตา",
  "Wheel of Fortune": "ยืดหยุ่น เห็นจังหวะ และไม่ยึดติด",
  Justice: "ชัด เที่ยงตรง สมดุล และมีเมตตา",
  "The Hanged Man": "ช้า ลึก ยอมวาง และเปลี่ยนมุมมอง",
  Death: "สงบ ลึก ปล่อยวาง และเปิดพื้นที่ใหม่",
  Temperance: "ประคอง ผสมผสาน พอดี และเยียวยา",
  "The Devil": "ซื่อตรงต่อเงา กล้าเห็นพันธนาการ",
  "The Tower": "ชัดแรงแต่ปลอดภัย รื้อสิ่งไม่จริง",
  "The Star": "อ่อนโยน มีหวัง ฟื้นฟู และให้แสงเล็ก",
  "The Moon": "ลึก ฝัน นุ่มต่อความไม่ชัด",
  "The Sun": "สว่าง จริงใจ มีชีวิตชีวา",
  Judgement: "ปลุกเรียก ให้อภัย ลุกขึ้นใหม่",
  "The World": "ครบวงจร รวมบทเรียน และสง่างาม"
};

const cardSpecific = {
  "The Fool": {
    identity: "ผู้เริ่มต้นที่ไว้ใจชีวิต",
    philosophy: "การเริ่มก่อนสมบูรณ์แบบคือประตูของอิสรภาพ",
    gift: "ความสดใหม่และความกล้าลอง",
    blindSpot: "รีบกระโดดเพราะอยากหนีความอึดอัด",
    healing: "ให้ความไม่รู้เป็นพื้นที่เรียนรู้",
    transformation: "จากความกลัวพลาดสู่การทดลองอย่างมีสติ"
  },
  "The Emperor": {
    identity: "ผู้สร้างโครงสร้างที่ปกป้องชีวิต",
    philosophy: "ขอบเขตที่ดีไม่ได้ปิดหัวใจ แต่ช่วยให้หัวใจปลอดภัย",
    gift: "ความมั่นคง ความรับผิดชอบ และการจัดระบบ",
    blindSpot: "ควบคุมมากเกินไปจนความรู้สึกไม่มีพื้นที่",
    healing: "ทำให้ความมั่นคงอ่อนโยนขึ้น",
    transformation: "จากการควบคุมสู่การนำอย่างรับผิดชอบ"
  },
  "The Hermit": {
    identity: "ผู้ถือแสงภายใน",
    philosophy: "ความเงียบที่ดีไม่ใช่การหนีโลก แต่คือการกลับมาได้ยินตนเอง",
    gift: "ปัญญา การทบทวน และแสงนำทางจากภายใน",
    blindSpot: "แยกตัวจนไม่ยอมรับความช่วยเหลือ",
    healing: "ให้ความโดดเดี่ยวกลายเป็นพื้นที่ฟื้นฟู",
    transformation: "จากการหลบโลกสู่การนำแสงกลับมาใช้ชีวิต"
  },
  Death: {
    identity: "ประตูเปลี่ยนผ่านและการเกิดใหม่",
    philosophy: "บางสิ่งต้องจบเพื่อคืนพื้นที่ให้สิ่งที่จริงกว่า",
    gift: "การปล่อยวาง การเปลี่ยนรูป และความกล้าปิดบทเก่า",
    blindSpot: "ยื้อสิ่งที่หมดพลังเพราะกลัวความว่าง",
    healing: "ให้การจบเป็นการคืนชีวิต ไม่ใช่การสูญเสียตัวตน",
    transformation: "จากการยึดไว้สู่การเกิดใหม่อย่างสงบ"
  }
};

export function buildCardKnowledge(cardAspect) {
  const specific = cardSpecific[cardAspect.enName] || {};
  return {
    identity: specific.identity || `${cardAspect.thName}ในฐานะพลังต้นแบบของ${cardAspect.coreTH}`,
    philosophy: specific.philosophy || `${cardAspect.coreTH}จะมีพลังที่สุดเมื่อถูกใช้ด้วยสติและความเมตตาต่อตัวเอง`,
    coreMeaning: cardAspect.coreTH,
    lightExpression: cardAspect.lightAspectTH,
    shadowExpression: cardAspect.shadowAspectTH,
    gift: specific.gift || `ของขวัญของไพ่ใบนี้คือการทำให้${cardAspect.coreTH}ชัดขึ้นในชีวิตจริง`,
    blindSpot: specific.blindSpot || `จุดที่ควรระวังคือการใช้${cardAspect.coreTH}จนเสียสมดุล`,
    healing: specific.healing || `การเยียวยาเกิดเมื่อคุณให้พื้นที่กับ${cardAspect.lessonTH}`,
    transformation: specific.transformation || `จากรูปแบบเดิมสู่${cardAspect.lessonTH}`,
    relationshipLens: `ในความสัมพันธ์ ไพ่ใบนี้ชวนให้${cardAspect.loveLightTH}`,
    workLens: `ในงาน ไพ่ใบนี้ชี้ไปที่${cardAspect.workLightTH}`,
    moneyLens: `ในเรื่องทรัพยากร ไพ่ใบนี้ชวนดูว่า${cardAspect.moneyLightTH}`,
    spiritualLens: `ด้านจิตใจ ไพ่ใบนี้พาให้เห็น${cardAspect.lessonTH}`,
    emotionalLens: `ด้านอารมณ์ ไพ่ใบนี้สะท้อน${cardAspect.coreTH}ที่ต้องการพื้นที่ปลอดภัย`,
    focusLens: `จุดสนใจคือ${cardAspect.lessonTH}`,
    warningLens: cardAspect.warningShadowTH,
    affirmationTone: cardAspect.affirmationLightTH,
    missionTone: `ทำหนึ่งสิ่งที่ทำให้${cardAspect.coreTH}กลายเป็นรูปธรรม`,
    keywords: [cardAspect.coreTH, cardAspect.lightAspectTH, cardAspect.lessonTH],
    writingVoice: voiceByCard[cardAspect.enName] || "อ่อนโยน ชัดเจน และสะท้อนตัวเอง"
  };
}
