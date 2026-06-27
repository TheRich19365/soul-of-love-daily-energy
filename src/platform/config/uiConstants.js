import { BriefcaseBusiness, Eye, Heart, Moon, Sparkles, Stars, Wand2 } from "lucide-react";

export const modes = [
  {
    id: "daily-card",
    title: "ไพ่ประจำวัน",
    subtitle: "Daily card",
    icon: Wand2,
    prompt: "อ่านพลังรวมของวันนี้อย่างอ่อนโยน"
  },
  {
    id: "daily-guidance",
    title: "ดวงประจำวัน",
    subtitle: "Daily guidance",
    icon: Stars,
    prompt: "มองภาพรวมของวันแบบไม่ตัดสิน"
  },
  {
    id: "love",
    title: "พลังความรัก",
    subtitle: "Love energy",
    icon: Heart,
    prompt: "สังเกตหัวใจ ความสัมพันธ์ และการดูแลตัวเอง"
  },
  {
    id: "work",
    title: "งานและเส้นทาง",
    subtitle: "Work path",
    icon: BriefcaseBusiness,
    prompt: "อ่านจังหวะงาน เป้าหมาย และพลังการลงมือ"
  }
];

export const navItems = [
  { href: "#home", label: "หน้าแรก", icon: Moon },
  { href: "#daily-draw", label: "ไพ่", icon: Wand2 },
  { href: "#energy-status", label: "พลังงาน", icon: Stars },
  { href: "#soul-message", label: "ข้อความ", icon: Eye },
  { href: "#prompt-studio", label: "Prompt", icon: Sparkles }
];

export const revealContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08
    }
  }
};

export const revealItem = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] }
  }
};
