import ElementCompass from "./ElementCompass.jsx";
import ElementSummary from "./ElementSummary.jsx";

export default function TarotReadingResult({ reading, onCopy, copied }) {
  if (!reading) return null;
  const isSingle = reading.cards.length === 1;

  return (
    <section className="reading-result" aria-live="polite">
      <div className="section-heading">
        <p className="eyebrow">Reading Result</p>
        <h2>{reading.spreadLabel}</h2>
        <button type="button" className="secondary-button" onClick={onCopy}>
          {copied ? "คัดลอกสรุปแล้ว" : "คัดลอกสรุปการอ่าน"}
        </button>
      </div>
      <ElementCompass cards={reading.cards} />
      <ElementSummary summary={reading.elementalSummary} singleCard={isSingle ? reading.cards[0].card : null} />
    </section>
  );
}
