import { spreadDefinitions } from "../data/tarotSpreadDefinitions.js";

export default function ReadingHistory({ history, onRestore, onDelete, onClear }) {
  return (
    <section className="glass-panel">
      <div className="section-heading compact">
        <div>
          <p className="eyebrow">Local History</p>
          <h2>ประวัติการอ่านล่าสุด</h2>
        </div>
        {history.length ? (
          <button type="button" className="ghost-button" onClick={onClear}>
            ล้างทั้งหมด
          </button>
        ) : null}
      </div>
      <p className="soft-note">ประวัติถูกเก็บไว้เฉพาะในอุปกรณ์นี้</p>
      <div className="history-list">
        {history.length === 0 ? <p className="empty-state">ยังไม่มีประวัติการอ่าน</p> : null}
        {history.map((item) => (
          <div className="history-item" key={item.id}>
            <div>
              <strong>{spreadDefinitions[item.spreadId]?.label}</strong>
              <span>{new Date(item.timestamp).toLocaleString("th-TH", { dateStyle: "medium", timeStyle: "short" })}</span>
            </div>
            <div className="history-actions">
              <button type="button" onClick={() => onRestore(item)}>เปิดดู</button>
              <button type="button" onClick={() => onDelete(item.id)}>ลบ</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
