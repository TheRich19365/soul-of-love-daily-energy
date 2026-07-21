import EcosystemNavigation from "./EcosystemNavigation.jsx";

export default function TarotHeader() {
  return (
    <header className="hero-shell">
      <EcosystemNavigation />
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Elemental Tarot · 78 Cards</p>
          <h1>Soul of Love Tarot Compass</h1>
          <p className="hero-thai">
            สุ่มไพ่เพื่อดูว่า
            <br />
            พลังใดกำลังทำงาน พลังเคลื่อนไปในทิศทางใด
            <br />
            และสิ่งใดกำลังต้องการความสมดุล
          </p>
          <p className="soft-note">
            การอ่านนี้เป็นภาษาสัญลักษณ์เพื่อการสะท้อนตนเอง ไม่ใช่คำทำนายตายตัว
          </p>
        </div>
        <div className="card-back-hero" aria-hidden="true">
          <div className="soul-ring" />
          <div className="compass-line north" />
          <div className="compass-line east" />
          <div className="hero-symbol">✦</div>
          <div className="element-mark top">□</div>
          <div className="element-mark right">◎</div>
          <div className="element-mark bottom">△</div>
          <div className="element-mark left">▽</div>
        </div>
      </div>
    </header>
  );
}
