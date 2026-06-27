export const HERO_ARTWORK_STATUSES = {
  DRAFT: "DRAFT",
  GENERATED: "GENERATED",
  REVIEW: "REVIEW",
  QA: "QA",
  APPROVED: "APPROVED",
  LOCKED: "LOCKED"
};

const defaultArtist = "Win Soul of Love";
const defaultUpdated = "2026-06-26";

function createStatus({
  id,
  name,
  filename,
  status = HERO_ARTWORK_STATUSES.DRAFT,
  version = "none",
  lastUpdated = defaultUpdated,
  artist = defaultArtist,
  reviewNotes = "Awaiting production artwork.",
  approvedBy = ""
}) {
  return {
    id,
    name,
    filename,
    status,
    version,
    lastUpdated,
    artist,
    reviewNotes,
    approvedBy
  };
}

export const heroArtworkStatus = [
  createStatus({
    id: 0,
    name: "The Fool",
    filename: "the-fool.webp",
    status: HERO_ARTWORK_STATUSES.APPROVED,
    version: "test-v1",
    reviewNotes: "Initial pearl-white hero artwork approved as style reference. Not locked for production use yet.",
    approvedBy: "Win Soul of Love"
  }),
  createStatus({ id: 1, name: "The Magician", filename: "the-magician.webp" }),
  createStatus({ id: 2, name: "The High Priestess", filename: "the-high-priestess.webp" }),
  createStatus({ id: 3, name: "The Empress", filename: "the-empress.webp" }),
  createStatus({ id: 4, name: "The Emperor", filename: "the-emperor.webp" }),
  createStatus({ id: 5, name: "The Hierophant", filename: "the-hierophant.webp" }),
  createStatus({ id: 6, name: "The Lovers", filename: "the-lovers.webp" }),
  createStatus({
    id: 7,
    name: "The Chariot",
    filename: "the-chariot.webp",
    status: HERO_ARTWORK_STATUSES.APPROVED,
    version: "test-v1",
    reviewNotes: "Initial crimson hero artwork approved as style reference. Not locked for production use yet.",
    approvedBy: "Win Soul of Love"
  }),
  createStatus({ id: 8, name: "Strength", filename: "strength.webp" }),
  createStatus({ id: 9, name: "The Hermit", filename: "the-hermit.webp" }),
  createStatus({ id: 10, name: "Wheel of Fortune", filename: "wheel-of-fortune.webp" }),
  createStatus({
    id: 11,
    name: "Justice",
    filename: "justice.webp",
    status: HERO_ARTWORK_STATUSES.APPROVED,
    version: "test-v1",
    reviewNotes: "Initial silver-gold hero artwork approved as style reference. Not locked for production use yet.",
    approvedBy: "Win Soul of Love"
  }),
  createStatus({ id: 12, name: "The Hanged Man", filename: "the-hanged-man.webp" }),
  createStatus({ id: 13, name: "Death", filename: "death.webp" }),
  createStatus({ id: 14, name: "Temperance", filename: "temperance.webp" }),
  createStatus({ id: 15, name: "The Devil", filename: "the-devil.webp" }),
  createStatus({ id: 16, name: "The Tower", filename: "the-tower.webp" }),
  createStatus({ id: 17, name: "The Star", filename: "the-star.webp" }),
  createStatus({ id: 18, name: "The Moon", filename: "the-moon.webp" }),
  createStatus({ id: 19, name: "The Sun", filename: "the-sun.webp" }),
  createStatus({ id: 20, name: "Judgement", filename: "judgement.webp" }),
  createStatus({ id: 21, name: "The World", filename: "the-world.webp" })
];

export const heroArtworkStatusByName = Object.fromEntries(
  heroArtworkStatus.map((item) => [item.name, item])
);

export function isHeroArtworkLocked(item) {
  return item?.status === HERO_ARTWORK_STATUSES.LOCKED;
}
