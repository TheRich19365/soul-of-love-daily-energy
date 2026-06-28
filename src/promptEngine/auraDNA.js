export const auraDNA = {
  Violet: {
    primaryColor: "violet aura",
    secondaryColor: "deep indigo shadow",
    glowStyle: "soft mystical violet bloom, pearl-violet rim light, layered glass refraction",
    particles: "tiny violet and pearl sacred dust with slow floating motes",
    lightingMood: "introspective, psychic, refined",
    rendering: "violet lacquer depth, luminous violet core, dark indigo outer bloom, subtle volumetric rays, refined metallic violet reflection"
  },
  Blue: {
    primaryColor: "sky blue aura",
    secondaryColor: "midnight navy",
    glowStyle: "cool luminous blue edge light, sapphire glass refraction, white-gold rim",
    particles: "blue-white starlight particles and fine airy dust",
    lightingMood: "clear, calm, communicative",
    rendering: "cool sapphire glass, bright blue core glow, soft cyan bloom, clean atmospheric depth, polished silver reflection"
  },
  Gold: {
    primaryColor: "solar gold aura",
    secondaryColor: "warm champagne",
    glowStyle: "white-gold core, radiant solar halo, liquid gold rim, warm volumetric bloom",
    particles: "gold sacred dust, champagne sparks, tiny sunlit motes",
    lightingMood: "confident, visible, blessed",
    rendering: "solar gold, champagne pearl, white-gold core, liquid gold metallic rim, luminous outer bloom, elegant reflective highlights"
  },
  Silver: {
    primaryColor: "silver moon aura",
    secondaryColor: "pearl gray",
    glowStyle: "white-silver core, soft lunar rim light, pearl grey reflection",
    particles: "silver pearl dust and quiet lunar particles",
    lightingMood: "quiet, reflective, intuitive",
    rendering: "moon silver, pearl grey, white silver core, soft lunar reflection, smoked glass depth, restrained bloom"
  },
  Crimson: {
    primaryColor: "crimson aura",
    secondaryColor: "deep ruby shadow",
    glowStyle: "bright ruby core, warm scarlet bloom, deep wine shadow edge",
    particles: "ruby sparks, warm scarlet dust, tiny ember-gold motes",
    lightingMood: "focused, powerful, disciplined",
    rendering: "ruby crimson, deep wine shadow, bright ruby core, controlled warm bloom, polished garnet metallic reflection"
  },
  Emerald: {
    primaryColor: "emerald aura",
    secondaryColor: "deep forest teal",
    glowStyle: "crystal green core, soft emerald mist, forest jade outer depth",
    particles: "emerald particles, jade sacred dust, small living light motes",
    lightingMood: "nurturing, stable, abundant",
    rendering: "bright emerald, forest jade, crystal green glow, soft emerald mist, botanical luxury depth, polished jade reflection"
  },
  Indigo: {
    primaryColor: "indigo aura",
    secondaryColor: "cosmic violet",
    glowStyle: "deep inner glow, cosmic blue rim, royal indigo nebula haze",
    particles: "indigo nebula particles, pearl-blue dust, subtle star motes",
    lightingMood: "mysterious, inward, ancient",
    rendering: "royal indigo, cosmic blue, deep inner glow, nebula particle field, smoked violet glass, quiet multidimensional depth"
  },
  "Rose Gold": {
    primaryColor: "rose-gold aura",
    secondaryColor: "soft blush shadow",
    glowStyle: "soft rose core, copper pearl rim, warm blush bloom",
    particles: "rose pearl dust, heart-like soft motes, copper-gold sparkles",
    lightingMood: "tender, loving, harmonious",
    rendering: "soft rose, copper pearl, warm blush bloom, gentle heart particles, rose metallic reflection, creamy glass refraction"
  },
  Pearl: {
    primaryColor: "pearl white aura",
    secondaryColor: "soft ivory",
    glowStyle: "opalescent white core, ivory outer bloom, soft prism reflection",
    particles: "pearl-white sacred dust and tiny opal motes",
    lightingMood: "innocent, pure, open",
    rendering: "pearl white, ivory, opalescent core, soft prism refraction, clean white-gold rim, gentle luminous bloom"
  },
  Turquoise: {
    primaryColor: "turquoise aura",
    secondaryColor: "deep ocean blue",
    glowStyle: "aqua core shimmer, oceanic bloom, turquoise glass edge",
    particles: "turquoise and pearl light motes, waterlike sacred dust",
    lightingMood: "flowing, fresh, emotionally clear",
    rendering: "turquoise aqua glass, deep ocean blue depth, fresh teal glow, liquid refraction, calm luminous particles"
  }
};

export function getAuraDNA(aura) {
  return auraDNA[aura?.english] || {
    primaryColor: `${aura?.english || "aura"} glow`,
    secondaryColor: "deep cosmic violet",
    glowStyle: aura?.glow || "soft aura glow",
    particles: "subtle sacred dust",
    lightingMood: "balanced and gentle",
    rendering: "layered aura glow, metallic rim light, soft bloom, glass depth, subtle sacred dust"
  };
}
