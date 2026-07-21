import TarotCard from "./TarotCard.jsx";

const classes = ["center", "north", "east", "south", "west"];

export default function ElementCompass({ cards }) {
  if (cards.length !== 5) {
    return (
      <div className="result-grid">
        {cards.map((item) => (
          <TarotCard key={`${item.card.id}-${item.positionIndex}`} item={item} />
        ))}
      </div>
    );
  }

  return (
    <div className="compass-spread">
      {cards.map((item, index) => (
        <div key={`${item.card.id}-${item.positionIndex}`} className={`compass-slot ${classes[index]}`}>
          <TarotCard item={item} compact={index !== 0} />
        </div>
      ))}
    </div>
  );
}
