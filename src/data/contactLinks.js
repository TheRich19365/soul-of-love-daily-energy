const emailAddress = "Souloflove19365@gmail.com";
const issueSubject = "แจ้งปัญหาการใช้งาน Soul of Love Daily Energy";
const issueBody = `สวัสดีครับ Win Soul of Love

ฉันพบปัญหาในการใช้งาน Soul of Love Daily Energy

รายละเอียดปัญหา:
-

อุปกรณ์หรือเบราว์เซอร์ที่ใช้:
-

ขั้นตอนที่ทำก่อนพบปัญหา:
-`;

function createMailto(address, subject, body) {
  return `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const portfolioHub = {
  label: "Portfolio Hub",
  url: "https://win-soul-of-love-portfolio-hub.vercel.app",
  enabled: true
};

const dailyEnergy = {
  label: "Daily Energy",
  url: "https://soul-of-love-daily-energy.vercel.app",
  localHref: "/",
  enabled: true
};

const thaiWisdom = {
  label: "ฤกษ์ดี",
  englishLabel: "Thai Wisdom",
  url: "https://soul-of-love-daily-energy.vercel.app/thai-wisdom",
  localHref: "/thai-wisdom",
  enabled: true
};

const matrix9 = {
  label: "Matrix 9",
  url: "https://matrix9-interface.vercel.app",
  enabled: true
};

const lineOA = {
  label: "LINE OA",
  id: "@514wppkc",
  url: "https://line.me/R/ti/p/%40514wppkc",
  enabled: true
};

const email = {
  label: "Email / Contact",
  address: emailAddress,
  mailto: `mailto:${emailAddress}`,
  issueMailto: createMailto(emailAddress, issueSubject, issueBody),
  enabled: true
};

export const contactLinks = {
  portfolioHub,
  dailyEnergy,
  thaiWisdom,
  matrix9,
  lineOA,
  email,

  // Backward-compatible aliases used by existing components.
  portfolio: portfolioHub,
  lineOa: lineOA,

  youtube: {
    label: "YouTube Music",
    url: "https://www.youtube.com/@SourceSignalMusic",
    enabled: true
  },
  suno: {
    label: "Suno Music",
    url: "https://suno.com/@souloflove6395",
    enabled: true
  },
  facebook: {
    label: "Facebook",
    url: "https://www.facebook.com/share/1D1UK69eAk/",
    enabled: true
  },
  instagram: {
    label: "Instagram",
    handle: "@souloflove19365",
    url: "https://www.instagram.com/souloflove19365",
    enabled: true
  }
};

export const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer"
};
