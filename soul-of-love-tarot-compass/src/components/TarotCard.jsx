import { elementInfo } from "../data/tarotCorrespondences.js";

export default function TarotCard({ item, compact = false }) {
  const { card, orientation, position } = item;
  const info = elementInfo[card.derivedElement || card.element];
  const keywords = orientation === "reversed" ? card.keywordsReversed : card.keywordsUpright;
  const meaning = orientation === "reversed" ? card.meaningReversed : card.meaningUpright;

  return (
    <article className={`tarot-card ${orientation === "reversed" ? "is-reversed" : ""} ${compact ? "is-compact" : ""}`}>
      <div className="card-face" style={{ "--element-color": info.accent }}>
        <div className="card-orbit" />
        <div className="card-topline">
          <span>{card.number ?? card.rank}</span>
          <span>{info.symbol}</span>
        </div>
        <div className="card-center-symbol">{card.visualSymbol}</div>
        <div className="card-title">
          <strong>{card.nameTh}</strong>
          <span>{card.nameEn}</span>
        </div>
      </div>
      <div className="card-reading">
        {position ? <p className="position-label">{position}</p> : null}
        <div className="card-name-row">
          <h3>{card.nameTh}</h3>
          <span>{orientation === "reversed" ? "ไพ่กลับหัว" : "ไพ่ตั้งตรง"}</span>
        </div>
        <p className="english-name">{card.nameEn}</p>
        <div className="meta-grid">
          <span>{card.arcana === "Major" ? "Major Arcana" : `${card.suit} · Minor`}</span>
          <span>{info.th} · {info.directionTh}</span>
          <span>{card.arcana === "Major" ? "Correspondence หลัก" : "Suit correspondence"}: {card.correspondence}</span>
          {card.arcana === "Major" ? <span>ธาตุที่ใช้ในระบบ: {info.th}</span> : null}
        </div>
        <p className="keywords">{keywords.join(" · ")}</p>
        <p className="meaning">{meaning}</p>
        <p className="question">คำถามสะท้อนใจ: {card.reflectionQuestion}</p>
      </div>
    </article>
  );
}
