const auraRendering = {
  Violet: {
    primary: "#a855f7",
    secondary: "#5b21b6",
    coreGlow: "rgba(216,180,254,.7)",
    outerBloom: "rgba(126,34,206,.42)",
    particle: "#e9d5ff",
    lightReflection: "rgba(245,243,255,.34)",
    metallicReflection: "rgba(196,181,253,.36)",
    glassRefraction: "rgba(139,92,246,.18)",
    bloomStrength: 0.62,
    volumetricRays: "rgba(196,181,253,.22)",
    depthLayer: "rgba(35,18,67,.62)",
    luxuryFinish: "violet lacquer with pearl-gold reflection"
  },
  Blue: {
    primary: "#38bdf8",
    secondary: "#075985",
    coreGlow: "rgba(186,230,253,.72)",
    outerBloom: "rgba(14,165,233,.38)",
    particle: "#e0f2fe",
    lightReflection: "rgba(240,249,255,.34)",
    metallicReflection: "rgba(125,211,252,.32)",
    glassRefraction: "rgba(56,189,248,.18)",
    bloomStrength: 0.54,
    volumetricRays: "rgba(125,211,252,.18)",
    depthLayer: "rgba(7,47,73,.62)",
    luxuryFinish: "cool sapphire glass with white-gold edge"
  },
  Gold: {
    primary: "#f8c76b",
    secondary: "#b45309",
    coreGlow: "rgba(255,247,237,.78)",
    outerBloom: "rgba(251,191,36,.46)",
    particle: "#fde68a",
    lightReflection: "rgba(255,251,235,.42)",
    metallicReflection: "rgba(245,158,11,.42)",
    glassRefraction: "rgba(251,191,36,.2)",
    bloomStrength: 0.7,
    volumetricRays: "rgba(253,230,138,.26)",
    depthLayer: "rgba(69,26,3,.58)",
    luxuryFinish: "liquid solar gold with champagne pearl rim"
  },
  Silver: {
    primary: "#cbd5e1",
    secondary: "#475569",
    coreGlow: "rgba(248,250,252,.76)",
    outerBloom: "rgba(203,213,225,.34)",
    particle: "#f8fafc",
    lightReflection: "rgba(255,255,255,.36)",
    metallicReflection: "rgba(148,163,184,.38)",
    glassRefraction: "rgba(226,232,240,.16)",
    bloomStrength: 0.48,
    volumetricRays: "rgba(226,232,240,.16)",
    depthLayer: "rgba(15,23,42,.62)",
    luxuryFinish: "moon silver with pearl grey reflection"
  },
  Crimson: {
    primary: "#fb7185",
    secondary: "#7f1d1d",
    coreGlow: "rgba(255,228,230,.72)",
    outerBloom: "rgba(244,63,94,.42)",
    particle: "#fecdd3",
    lightReflection: "rgba(255,241,242,.32)",
    metallicReflection: "rgba(190,18,60,.36)",
    glassRefraction: "rgba(251,113,133,.18)",
    bloomStrength: 0.6,
    volumetricRays: "rgba(251,113,133,.2)",
    depthLayer: "rgba(69,10,10,.62)",
    luxuryFinish: "ruby crimson enamel with deep wine reflection"
  },
  Emerald: {
    primary: "#34d399",
    secondary: "#065f46",
    coreGlow: "rgba(209,250,229,.72)",
    outerBloom: "rgba(16,185,129,.4)",
    particle: "#a7f3d0",
    lightReflection: "rgba(236,253,245,.34)",
    metallicReflection: "rgba(5,150,105,.34)",
    glassRefraction: "rgba(52,211,153,.18)",
    bloomStrength: 0.58,
    volumetricRays: "rgba(110,231,183,.2)",
    depthLayer: "rgba(6,78,59,.6)",
    luxuryFinish: "emerald crystal with forest jade depth"
  },
  Indigo: {
    primary: "#818cf8",
    secondary: "#312e81",
    coreGlow: "rgba(224,231,255,.66)",
    outerBloom: "rgba(99,102,241,.42)",
    particle: "#c7d2fe",
    lightReflection: "rgba(238,242,255,.3)",
    metallicReflection: "rgba(79,70,229,.34)",
    glassRefraction: "rgba(129,140,248,.18)",
    bloomStrength: 0.52,
    volumetricRays: "rgba(165,180,252,.18)",
    depthLayer: "rgba(30,27,75,.66)",
    luxuryFinish: "royal indigo nebula glass with deep inner glow"
  },
  "Rose Gold": {
    primary: "#f0a7a0",
    secondary: "#9f6b53",
    coreGlow: "rgba(255,241,242,.72)",
    outerBloom: "rgba(251,207,232,.38)",
    particle: "#ffe4e6",
    lightReflection: "rgba(255,247,237,.34)",
    metallicReflection: "rgba(251,146,60,.28)",
    glassRefraction: "rgba(244,114,182,.14)",
    bloomStrength: 0.52,
    volumetricRays: "rgba(253,186,116,.16)",
    depthLayer: "rgba(76,29,38,.56)",
    luxuryFinish: "soft rose copper pearl with warm blush bloom"
  },
  Pearl: {
    primary: "#f8fafc",
    secondary: "#cbd5e1",
    coreGlow: "rgba(255,255,255,.78)",
    outerBloom: "rgba(226,232,240,.32)",
    particle: "#ffffff",
    lightReflection: "rgba(255,255,255,.4)",
    metallicReflection: "rgba(226,232,240,.34)",
    glassRefraction: "rgba(248,250,252,.16)",
    bloomStrength: 0.5,
    volumetricRays: "rgba(255,255,255,.18)",
    depthLayer: "rgba(30,41,59,.54)",
    luxuryFinish: "opalescent pearl white with soft ivory reflection"
  },
  Turquoise: {
    primary: "#2dd4bf",
    secondary: "#0f766e",
    coreGlow: "rgba(204,251,241,.7)",
    outerBloom: "rgba(20,184,166,.38)",
    particle: "#99f6e4",
    lightReflection: "rgba(240,253,250,.32)",
    metallicReflection: "rgba(45,212,191,.3)",
    glassRefraction: "rgba(45,212,191,.18)",
    bloomStrength: 0.56,
    volumetricRays: "rgba(94,234,212,.18)",
    depthLayer: "rgba(19,78,74,.58)",
    luxuryFinish: "aqua glass shimmer with oceanic pearl refraction"
  }
};

const lightFrame = {
  name: "Light Frame",
  frameBase: "linear-gradient(135deg, rgba(255,255,255,.5), rgba(250,204,21,.34) 32%, rgba(255,255,255,.18) 64%, rgba(251,191,36,.28))",
  innerBase: "linear-gradient(160deg, rgba(255,255,255,.12), rgba(8,6,23,.88) 42%, rgba(30,20,50,.78))",
  borderColor: "rgba(255,244,214,.5)",
  rimColor: "rgba(255,247,237,.52)",
  metalColor: "rgba(251,191,36,.42)",
  surface: "pearl gold, white gold, champagne metallic, luminous rim, soft bloom, elegant reflection",
  mood: "open, luminous, hopeful, elevated, expansive"
};

const shadowFrame = {
  name: "Shadow Frame",
  frameBase: "linear-gradient(135deg, rgba(148,163,184,.36), rgba(15,23,42,.76) 36%, rgba(76,29,149,.28) 70%, rgba(203,213,225,.24))",
  innerBase: "linear-gradient(160deg, rgba(30,41,59,.28), rgba(2,1,8,.94) 44%, rgba(30,27,75,.62))",
  borderColor: "rgba(148,163,184,.34)",
  rimColor: "rgba(203,213,225,.28)",
  metalColor: "rgba(99,102,241,.22)",
  surface: "obsidian, smoked silver, gunmetal, midnight blue, dark violet metallic, subtle inner glow, restrained reflection",
  mood: "inward, quiet, mysterious, reflective, integrated"
};

function getFrame(orientation) {
  return orientation === "reversed" ? shadowFrame : lightFrame;
}

export function getAuraRendering(aura, orientation = "upright") {
  const base = auraRendering[aura?.english] || auraRendering.Violet;
  const frame = getFrame(orientation);
  const isShadow = orientation === "reversed";
  const bloom = isShadow ? Math.max(0.28, base.bloomStrength - 0.14) : Math.min(0.82, base.bloomStrength + 0.08);

  return {
    ...base,
    frame,
    isShadow,
    bloom,
    fieldBackground: isShadow
      ? `radial-gradient(circle at 50% 28%, ${base.coreGlow}, transparent 20%), radial-gradient(circle at 50% 70%, ${base.outerBloom}, transparent 34%), linear-gradient(160deg, ${base.depthLayer}, rgba(2,1,8,.94) 48%, rgba(8,6,23,.98))`
      : `radial-gradient(circle at 50% 24%, ${base.coreGlow}, transparent 26%), radial-gradient(circle at 50% 76%, ${base.outerBloom}, transparent 36%), linear-gradient(160deg, rgba(255,255,255,.14), rgba(8,6,23,.86) 46%, ${base.depthLayer})`,
    artworkOverlay: isShadow
      ? `radial-gradient(circle at 50% 36%, ${base.glassRefraction}, transparent 38%), linear-gradient(180deg, rgba(2,1,8,.08), rgba(2,1,8,.58) 100%), linear-gradient(135deg, transparent, ${base.metallicReflection})`
      : `radial-gradient(circle at 50% 35%, ${base.coreGlow}, transparent 34%), linear-gradient(180deg, transparent 42%, rgba(2,1,8,.42) 100%), linear-gradient(135deg, ${base.lightReflection}, transparent 42%, ${base.glassRefraction})`,
    cardGlow: isShadow
      ? `0 0 34px ${base.outerBloom}, inset 0 0 38px rgba(255,255,255,.04), 0 0 0 1px ${frame.borderColor}`
      : `0 0 58px ${base.outerBloom}, 0 0 104px ${base.coreGlow}, inset 0 0 32px rgba(255,255,255,.06)`,
    artworkGlow: isShadow
      ? `0 0 34px ${base.outerBloom}, 0 0 76px rgba(2,1,8,.72), inset 0 0 26px rgba(255,255,255,.04)`
      : `0 0 52px ${base.outerBloom}, 0 0 110px ${base.coreGlow}, inset 0 0 24px rgba(255,255,255,.08)`,
    scoreGlow: isShadow
      ? `0 0 24px ${base.outerBloom}, inset 0 0 18px rgba(255,255,255,.05)`
      : `0 0 32px ${base.coreGlow}, 0 0 54px ${base.outerBloom}`,
    promptTokens: [
      base.luxuryFinish,
      isShadow ? `shadow orientation rendering: ${frame.surface}` : `light orientation rendering: ${frame.surface}`,
      isShadow ? "inward aura, restrained outer bloom, subtle inner glow, smoked reflection" : "open aura, luminous outer bloom, radiant halo, elevated rim lighting",
      `core glow ${base.coreGlow}`,
      `outer bloom ${base.outerBloom}`,
      `particle style ${base.particle}`,
      `volumetric rays ${base.volumetricRays}`,
      "layered glass refraction, metallic rim light, cinematic depth"
    ].join("; ")
  };
}
