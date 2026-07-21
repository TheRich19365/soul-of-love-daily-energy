import { spreadDefinitions } from "../data/tarotSpreadDefinitions.js";

export default function TarotDeckStage({
  spreadId,
  setSpreadId,
  allowReversed,
  setAllowReversed,
  phase,
  hasReading,
  onDraw,
  onClear,
}) {
  const spread = spreadDefinitions[spreadId];
  const busy = phase === "shuffling" || phase === "revealing";

  return (
    <section className="deck-stage">
      <div className="control-panel">
        <p className="eyebrow">Choose Spread</p>
        <h2>เลือกวิธีเปิดไพ่</h2>
        <div className="spread-options" role="radiogroup" aria-label="เลือกรูปแบบการอ่าน">
          {Object.values(spreadDefinitions).map((item) => (
            <button
              key={item.id}
              type="button"
              className={spreadId === item.id ? "is-active" : ""}
              onClick={() => setSpreadId(item.id)}
              aria-pressed={spreadId === item.id}
            >
              <strong>{item.label}</strong>
              <span>{item.subtitle}</span>
            </button>
          ))}
        </div>
        <label className="toggle-row">
          <input
            type="checkbox"
            checked={allowReversed}
            onChange={(event) => setAllowReversed(event.target.checked)}
          />
          <span>ใช้ไพ่กลับหัว</span>
          <small>ใช้กับการเปิดไพ่ครั้งถัดไปเท่านั้น</small>
        </label>
        <div className="button-row">
          <button type="button" className="primary-button" onClick={onDraw} disabled={busy}>
            {busy ? "กำลังสับไพ่..." : hasReading ? "เปิดไพ่ชุดใหม่" : spread.buttonLabel}
          </button>
          {hasReading ? (
            <button type="button" className="ghost-button" onClick={onClear} disabled={busy}>
              ล้างการอ่าน
            </button>
          ) : null}
        </div>
      </div>
      <div className={`deck-visual ${busy ? "is-shuffling" : ""}`} aria-hidden="true">
        <div className="deck-card one" />
        <div className="deck-card two" />
        <div className="deck-card three" />
        <div className="deck-label">{phase === "idle" ? "78" : phase === "revealed" ? "เปิดแล้ว" : "Shuffle"}</div>
      </div>
    </section>
  );
}
