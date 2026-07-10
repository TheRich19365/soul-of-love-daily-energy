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

export const contactLinks = {
  portfolio: {
    label: "Portfolio Hub",
    url: "https://win-soul-of-love-portfolio-hub.vercel.app",
    enabled: true
  },
  lineOa: {
    label: "LINE Official",
    id: "@514wppkc",
    url: "https://line.me/R/ti/p/%40514wppkc",
    enabled: true
  },
  email: {
    label: "Email / Contact",
    address: "Souloflove19365@gmail.com",
    mailto: "mailto:Souloflove19365@gmail.com",
    issueMailto: createMailto("Souloflove19365@gmail.com", issueSubject, issueBody),
    enabled: true
  },
  matrix9: {
    label: "Matrix 9 Interface",
    url: "https://matrix9-interface.vercel.app",
    enabled: true
  },
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
