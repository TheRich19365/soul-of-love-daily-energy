export const compositionDNA = {
  "Hero Artwork": {
    purpose: "raw card hero image used behind HTML/CSS text",
    rules: [
      "mobile-first vertical composition",
      "central focal point between 28 and 62 percent vertical height",
      "top 12-15 percent calm safe zone",
      "bottom 18-22 percent dark low-detail overlay zone",
      "no embedded text"
    ]
  },
  "Social Poster": {
    purpose: "shareable premium result poster",
    rules: [
      "poster-first premium oracle architecture",
      "large ceremonial title zone",
      "central framed oracle card altar",
      "small side data satellite modules",
      "dark glass message panel",
      "quiet brand footer",
      "refined gold hairline dividers"
    ]
  },
  "Concept UI": {
    purpose: "interface and product visual exploration",
    rules: [
      "dark cosmic glass UI",
      "clear card altar hierarchy",
      "aura-driven accent system",
      "thin sacred geometry layers",
      "mobile-readable spacing",
      "premium restrained controls"
    ]
  }
};

export function getCompositionDNA(type = "Hero Artwork") {
  return compositionDNA[type] || compositionDNA["Hero Artwork"];
}
