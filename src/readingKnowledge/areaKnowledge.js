export const areaKnowledge = {
  universe: {
    question: "What overall energy surrounds today?",
    identity: "ภาพรวมพลังงานของวัน",
    intent: "อ่านสนามพลังหลักโดยไม่สรุปแทนชีวิตของผู้ใช้",
    verbs: ["สะท้อน", "เปิดภาพ", "ชี้ให้เห็น", "วางน้ำหนักไว้ที่"],
    avoid: ["คำสั่ง", "ภารกิจ", "รายละเอียดการเงิน"]
  },
  love: {
    question: "How should emotional relationships be approached?",
    identity: "ความสัมพันธ์และความปลอดภัยทางใจ",
    intent: "แปลพลังเป็นวิธีดูแลความสัมพันธ์ ขอบเขต ความจริงใจ และการฟังกัน",
    verbs: ["รับฟัง", "วางขอบเขต", "พูดความจริง", "ดูแลพื้นที่หัวใจ"],
    avoid: ["เป้าหมายงาน", "ตัวเลขเงิน", "คำเตือนกว้าง ๆ"]
  },
  work: {
    question: "How should today's work or purpose be handled?",
    identity: "งาน เส้นทาง และการลงมือ",
    intent: "แปลพลังเป็นทิศทางทำงาน การจัดลำดับ ความรับผิดชอบ และผลงานที่จับต้องได้",
    verbs: ["จัดลำดับ", "ลงมือ", "เลือกเป้าหมาย", "ทำให้ชัด"],
    avoid: ["โรแมนติก", "คำปลอบใจล้วน ๆ", "การเงินส่วนตัว"]
  },
  money: {
    question: "What is today's relationship with value, resources and decisions?",
    identity: "คุณค่า ทรัพยากร และการตัดสินใจ",
    intent: "อ่านความสัมพันธ์กับเงิน คุณค่า เวลา แรง และทรัพยากรโดยไม่ทำนายผลลัพธ์",
    verbs: ["ตรวจดู", "จัดสรร", "เลือกใช้", "รักษาคุณค่า"],
    avoid: ["โชคลาภเด็ดขาด", "คำฟันธง", "คำเตือนที่ทำให้กลัว"]
  },
  focus: {
    question: "What deserves conscious attention today?",
    identity: "จุดสนใจหนึ่งอย่าง",
    intent: "ทำให้ผู้ใช้เห็นประเด็นเดียวที่ควรวางสติไว้",
    verbs: ["สังเกต", "เลือก", "กลับมาเห็น", "ตั้งคำถามกับ"],
    avoid: ["ยาวเกินไป", "หลายภารกิจ", "คำสรุปแบบ universe"]
  },
  warning: {
    question: "What should be noticed before reacting?",
    identity: "คำเตือนที่อ่อนโยนและเฉพาะเจาะจง",
    intent: "เตือนจุดเสียสมดุลก่อนตอบสนอง โดยไม่ทำให้กลัวหรือรู้สึกผิด",
    verbs: ["ชะลอ", "สังเกต", "แยกแยะ", "ไม่รีบตอบสนอง"],
    avoid: ["ความกลัว", "คำตัดสิน", "การลงโทษตัวเอง"]
  },
  affirmation: {
    question: "What empowering truth should be remembered?",
    identity: "ความจริงที่ช่วยยืนอยู่กับพลังของตัวเอง",
    intent: "ให้ประโยคยืนยันสั้น ลึก และจำได้",
    verbs: ["ยืนยัน", "อนุญาต", "เลือกจำ", "กลับมายืนกับ"],
    avoid: ["คำแนะนำยาว", "คำเตือน", "รายละเอียดงาน"]
  },
  mission: {
    question: "What single practical action should be taken today?",
    identity: "การกระทำเดียวที่ทำได้จริง",
    intent: "แปลงพลังเป็นหนึ่งการกระทำเล็กที่จับต้องได้ในวันนี้",
    verbs: ["ทำหนึ่งสิ่ง", "ปิดหนึ่งเรื่อง", "ส่งหนึ่งข้อความ", "จัดหนึ่งพื้นที่"],
    avoid: ["หลายข้อ", "ความหมายเชิงนามธรรมล้วน", "การทำนาย"]
  },
  guidance: {
    question: "What internal guidance supports the reading?",
    identity: "คำแนะนำภายในที่ไม่แสดงเป็นการ์ดหลัก",
    intent: "ใช้เป็น field ภายในหรือ fallback เท่านั้น",
    verbs: ["ประคอง", "เลือกท่าที", "จัดจังหวะ", "ฟังสัญญาณ"],
    avoid: ["ซ้ำกับ mission", "ซ้ำกับ focus"]
  }
};

export function getAreaKnowledge(area) {
  return areaKnowledge[area] || areaKnowledge.universe;
}
