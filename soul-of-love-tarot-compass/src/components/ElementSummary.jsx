import { elementInfo } from "../data/tarotCorrespondences.js";

export default function ElementSummary({ summary, singleCard }) {
  if (!summary && singleCard) {
    const info = elementInfo[singleCard.derivedElement];
    return (
      <section className="glass-panel">
        <p className="eyebrow">Element</p>
        <h2>ธาตุของไพ่ใบนี้: {info.th}</h2>
        <p>{info.summary}</p>
      </section>
    );
  }

  if (!summary) return null;

  return (
    <section className="glass-panel">
      <p className="eyebrow">Elemental Summary</p>
      <h2>ภาพรวมธาตุของชุดไพ่</h2>
      <div className="element-bars">
        {Object.entries(summary.percentages).map(([element, value]) => (
          <div key={element} className="element-row">
            <span>{elementInfo[element].th}</span>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${value}%`, background: elementInfo[element].accent }} />
            </div>
            <strong>{value}%</strong>
          </div>
        ))}
      </div>
      <p className="meaning">{summary.text}</p>
      <p className="soft-note">
        ระบบนี้ใช้ correspondence: เหนือ-ดิน · ตะวันออก-ลม · ใต้-ไฟ · ตะวันตก-น้ำ
      </p>
    </section>
  );
}
