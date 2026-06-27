export const auraDNA = {
  Violet: {
    primaryColor: "violet aura",
    secondaryColor: "deep indigo shadow",
    glowStyle: "soft mystical violet bloom",
    particles: "tiny violet and pearl sacred dust",
    lightingMood: "introspective, psychic, refined"
  },
  Blue: {
    primaryColor: "sky blue aura",
    secondaryColor: "midnight navy",
    glowStyle: "cool luminous blue edge light",
    particles: "blue-white starlight particles",
    lightingMood: "clear, calm, communicative"
  },
  Gold: {
    primaryColor: "solar gold aura",
    secondaryColor: "warm champagne",
    glowStyle: "radiant gold halo with soft bloom",
    particles: "gold sacred dust and small star sparks",
    lightingMood: "confident, visible, blessed"
  },
  Silver: {
    primaryColor: "silver moon aura",
    secondaryColor: "pearl gray",
    glowStyle: "soft lunar rim light",
    particles: "silver pearl dust",
    lightingMood: "quiet, reflective, intuitive"
  },
  Crimson: {
    primaryColor: "crimson aura",
    secondaryColor: "deep ruby shadow",
    glowStyle: "controlled crimson pulse",
    particles: "ruby and gold sparks",
    lightingMood: "focused, powerful, disciplined"
  },
  Emerald: {
    primaryColor: "emerald aura",
    secondaryColor: "deep forest teal",
    glowStyle: "grounded green healing glow",
    particles: "emerald and gold dust",
    lightingMood: "nurturing, stable, abundant"
  },
  Indigo: {
    primaryColor: "indigo aura",
    secondaryColor: "cosmic violet",
    glowStyle: "deep indigo spiritual haze",
    particles: "indigo pearl particles",
    lightingMood: "mysterious, inward, ancient"
  },
  "Rose Gold": {
    primaryColor: "rose-gold aura",
    secondaryColor: "soft blush shadow",
    glowStyle: "warm romantic rose glow",
    particles: "rose pearl and gold dust",
    lightingMood: "tender, loving, harmonious"
  },
  Pearl: {
    primaryColor: "pearl white aura",
    secondaryColor: "soft ivory",
    glowStyle: "gentle opalescent bloom",
    particles: "pearl-white sacred dust",
    lightingMood: "innocent, pure, open"
  },
  Turquoise: {
    primaryColor: "turquoise aura",
    secondaryColor: "deep ocean blue",
    glowStyle: "aqua spiritual shimmer",
    particles: "turquoise and pearl light motes",
    lightingMood: "flowing, fresh, emotionally clear"
  }
};

export function getAuraDNA(aura) {
  return auraDNA[aura?.english] || {
    primaryColor: `${aura?.english || "aura"} glow`,
    secondaryColor: "deep cosmic violet",
    glowStyle: aura?.glow || "soft aura glow",
    particles: "subtle sacred dust",
    lightingMood: "balanced and gentle"
  };
}
