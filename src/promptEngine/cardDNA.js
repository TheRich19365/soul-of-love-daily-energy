const shared = {
  materials: "flowing fabrics, subtle metallic details, translucent layers, celestial ornaments, refined champagne-gold accents, smoked glass depth",
  sacredGeometry: "Soul Ring, Vertical Light Axis, elegant Orbit Lines, minimal engraved gold geometry",
  motionLanguage: "calm cinematic stillness with subtle energetic movement",
  forbidden: "literal Rider-Waite copy, horror symbolism, embedded text, accidental letters, heavy occult clutter"
};

function defineCardDNA({
  identity,
  visual,
  emotion,
  motion,
  symbolism,
  renderHints
}) {
  return {
    identity,
    visual: {
      materials: shared.materials,
      sacredGeometry: shared.sacredGeometry,
      ...visual
    },
    emotion,
    motion: {
      movementStyle: shared.motionLanguage,
      ...motion
    },
    symbolism: {
      forbidden: shared.forbidden,
      ...symbolism
    },
    renderHints
  };
}

export const cardDNA = {
  "The Fool": defineCardDNA({
    identity: {
      archetype: "innocent traveler at the threshold",
      philosophy: "life opens when trust becomes movement",
      transformation: "from hesitation into gentle first step"
    },
    visual: {
      visualSeed: "pearl white cosmic cliff, innocent traveler, soft starlight, new beginning, gentle freedom",
      environment: "open starlit cliff above clouds and distant mountains",
      architecture: "wide sky, cliff edge, airy negative space, oracle frame if poster-based",
      camera: "medium-full body, slight low angle, airy vertical framing",
      composition: "human archetype, subject stepping into luminous open space",
      lighting: "pearl backlight and soft dawn glow",
      atmosphere: "fresh, open, weightless"
    },
    emotion: {
      core: "trust and lightness",
      shadow: "unprepared escape or naive avoidance",
      awakening: "freedom becomes wisdom when the first step is conscious"
    },
    motion: {
      energyFlow: "upward and forward",
      particleBehavior: "pearl dust rising around the cliff",
      wind: "gentle lift through fabric and hair",
      movementStyle: "fabric floating in a gentle upward breeze"
    },
    symbolism: {
      primary: "open cliff and pearl aura",
      secondary: "small companion, light bundle, distant path",
      forbidden: `${shared.forbidden}, reckless fall imagery`
    },
    renderHints: {
      focalPriority: "freedom energy, open chest gesture, traveler",
      depth: "foreground cliff, luminous figure, vast cosmic sky",
      cinematicScale: "intimate figure against large universe"
    }
  }),

  "The Magician": defineCardDNA({
    identity: {
      archetype: "conscious creator and energy channel",
      philosophy: "intention becomes reality through aligned action",
      transformation: "from scattered potential into focused manifestation"
    },
    visual: {
      visualSeed: "violet gold cosmic altar, intentional creator, luminous tools, manifestation, elegant power",
      environment: "celestial altar with abstract elemental light forms",
      architecture: "altar plane, vertical axis through hands, triangle of intention",
      camera: "three-quarter medium-full composition with hands visible",
      composition: "human archetype, hands and light tools as secondary focal points",
      lighting: "violet-gold key light from altar",
      sacredGeometry: "triangle of intention, Soul Ring, Vertical Axis, fine orbit lines",
      atmosphere: "charged, precise, magical but controlled"
    },
    emotion: {
      core: "focus and creative power",
      shadow: "performance without integrity",
      awakening: "true influence comes from aligned intention"
    },
    motion: {
      energyFlow: "gathering from above and grounding through hands",
      particleBehavior: "violet and gold sparks converging",
      wind: "minimal, controlled aura pressure",
      movementStyle: "light gathering toward the hands"
    },
    symbolism: {
      primary: "luminous altar and hands",
      secondary: "abstract tools, infinity-like aura, gold triangle",
      forbidden: `${shared.forbidden}, stage magician cliche`
    },
    renderHints: {
      focalPriority: "intention field, hands, face",
      depth: "altar foreground, creator midground, cosmic temple background",
      cinematicScale: "ritual close enough to see intention"
    }
  }),

  "The High Priestess": defineCardDNA({
    identity: {
      archetype: "guardian of inner knowing",
      philosophy: "truth often arrives through stillness before language",
      transformation: "from external seeking into inner listening"
    },
    visual: {
      visualSeed: "indigo moon temple, silent oracle, veiled intuition, sacred mystery, soft inner light",
      environment: "moonlit temple, still water, veil of stars",
      architecture: "two soft pillars, moon gate, reflective water plane",
      camera: "centered calm portrait to medium-full",
      composition: "human archetype, centered stillness with symbolic water",
      lighting: "indigo lunar glow and pearl rim light",
      sacredGeometry: "circle, crescent orbit, Vertical Axis",
      atmosphere: "quiet, secret, spacious"
    },
    emotion: {
      core: "intuition and sacred silence",
      shadow: "confusing fear with intuition",
      awakening: "inner knowing becomes clear when protected from noise"
    },
    motion: {
      energyFlow: "slow inward spiral",
      particleBehavior: "indigo pearl motes hovering",
      wind: "barely moving veil",
      movementStyle: "stillness with barely moving veil and water"
    },
    symbolism: {
      primary: "moon gate and veiled oracle",
      secondary: "still water, pearl crescent, hidden scroll-like light",
      forbidden: `${shared.forbidden}, fake occult writing`
    },
    renderHints: {
      focalPriority: "silence field, moon gate, oracle face",
      depth: "water reflection, figure, temple shadow",
      cinematicScale: "intimate and sacred"
    }
  }),

  "The Empress": defineCardDNA({
    identity: {
      archetype: "nurturer of beauty and life",
      philosophy: "what is loved with presence grows",
      transformation: "from depletion into receiving and abundance"
    },
    visual: {
      visualSeed: "rose emerald celestial garden, divine nurture, abundance, beauty, gentle healing",
      environment: "cosmic garden with luminous flora",
      architecture: "soft garden arch, organic curves, fertile foreground",
      camera: "medium-full, grounded and warm",
      composition: "human archetype, body relaxed into lush cosmic life",
      lighting: "rose-gold soft bloom",
      sacredGeometry: "Soul Ring, floral orbit arcs, hexagonal harmony",
      atmosphere: "lush, tender, fertile"
    },
    emotion: {
      core: "nurture and embodied beauty",
      shadow: "giving until self-erasure",
      awakening: "receiving is also sacred care"
    },
    motion: {
      energyFlow: "outward blooming from heart and hands",
      particleBehavior: "rose-gold pollen and sacred dust",
      wind: "soft garden breeze",
      movementStyle: "petals and sacred dust drifting softly"
    },
    symbolism: {
      primary: "cosmic garden and nurturing figure",
      secondary: "blooming light, soft fabric, emerald growth",
      forbidden: `${shared.forbidden}, oversexualized fertility imagery`
    },
    renderHints: {
      focalPriority: "abundance field, heart softness, figure",
      depth: "flowers foreground, figure, cosmic garden",
      cinematicScale: "warm and intimate"
    }
  }),

  "The Emperor": defineCardDNA({
    identity: {
      archetype: "guardian of sacred structure",
      philosophy: "true authority protects life rather than controlling it",
      transformation: "from rigidity into grounded leadership"
    },
    visual: {
      visualSeed: "gold crimson cosmic throne, grounded authority, sacred structure, calm leadership",
      environment: "star throne, mountain geometry, deep cosmic hall",
      architecture: "throne, pillars, mountain-like geometry, strong verticals",
      camera: "front-centered, dignified, stable",
      composition: "human archetype, stable central authority",
      lighting: "warm gold top light with crimson depth",
      sacredGeometry: "square, triangle, Vertical Axis, restrained Soul Ring",
      atmosphere: "solid, protective, ceremonial"
    },
    emotion: {
      core: "structure and calm power",
      shadow: "control and emotional distance",
      awakening: "discipline becomes love when it creates safety"
    },
    motion: {
      energyFlow: "downward grounding into earth",
      particleBehavior: "slow gold sparks near structural lines",
      wind: "almost none",
      movementStyle: "stillness, weight, grounded presence"
    },
    symbolism: {
      primary: "throne and vertical axis",
      secondary: "mountain geometry, crimson-gold aura",
      forbidden: `${shared.forbidden}, militaristic domination`
    },
    renderHints: {
      focalPriority: "stability, throne silhouette, face",
      depth: "foreground steps, throne, cosmic hall",
      cinematicScale: "monumental but calm"
    }
  }),

  "The Hierophant": defineCardDNA({
    identity: {
      archetype: "keeper of sacred teaching",
      philosophy: "wisdom becomes sacred when it serves growth",
      transformation: "from borrowed belief into living guidance"
    },
    visual: {
      visualSeed: "ancient star temple, spiritual teacher, sacred wisdom, tradition, luminous guidance",
      environment: "ancient cosmic temple with light pillars",
      architecture: "temple aisle, twin pillars, ceremonial steps",
      camera: "centered teacher posture, medium-full",
      composition: "human archetype, teacher framed by temple geometry",
      lighting: "ivory-gold temple glow",
      sacredGeometry: "twin pillars, vertical axis, circle of wisdom",
      atmosphere: "reverent, learned, calm"
    },
    emotion: {
      core: "wisdom and guidance",
      shadow: "dogma or spiritual authority without heart",
      awakening: "teaching becomes true when integrated"
    },
    motion: {
      energyFlow: "light descending through the crown and hands",
      particleBehavior: "ivory gold dust falling slowly",
      wind: "still temple air",
      movementStyle: "slow descending light"
    },
    symbolism: {
      primary: "teacher and twin pillars",
      secondary: "keys of light, temple path, circle halo",
      forbidden: `${shared.forbidden}, fixed religious propaganda`
    },
    renderHints: {
      focalPriority: "wisdom field, teacher gesture, temple axis",
      depth: "temple foreground, figure, pillars",
      cinematicScale: "ceremonial and spacious"
    }
  }),

  "The Lovers": defineCardDNA({
    identity: {
      archetype: "sacred choice and relational mirror",
      philosophy: "love becomes clear through conscious choosing",
      transformation: "from attachment into honest harmony"
    },
    visual: {
      visualSeed: "rose gold twin lights, sacred choice, heart connection, harmony, gentle union",
      environment: "cosmic valley or mirrored heart field",
      architecture: "two balanced light columns, shared central aura",
      camera: "balanced two-point composition or twin lights",
      composition: "human or symbolic twin composition, harmony over romance cliche",
      lighting: "rose-gold harmony glow",
      sacredGeometry: "paired circles, heart orbit, subtle vertical axis",
      atmosphere: "tender, trusting, open"
    },
    emotion: {
      core: "connection and choice",
      shadow: "losing self inside longing",
      awakening: "trust grows where truth is allowed"
    },
    motion: {
      energyFlow: "two streams moving toward a shared center",
      particleBehavior: "rose-gold paired sparks",
      wind: "soft crossing currents",
      movementStyle: "two lights slowly converging"
    },
    symbolism: {
      primary: "twin lights or two figures",
      secondary: "heart orbit, shared aura, choice path",
      forbidden: `${shared.forbidden}, melodramatic romance cover`
    },
    renderHints: {
      focalPriority: "choice energy, shared center, figures",
      depth: "two foreground paths, central aura, cosmic valley",
      cinematicScale: "balanced and intimate"
    }
  }),

  "The Chariot": defineCardDNA({
    identity: {
      archetype: "disciplined mover with sacred direction",
      philosophy: "victory comes from aligned force, not speed alone",
      transformation: "from scattered drive into controlled momentum"
    },
    visual: {
      visualSeed: "crimson celestial chariot, focused movement, victory, sacred direction, controlled momentum",
      environment: "star road and celestial direction lines",
      architecture: "forward road, chariot arc, strong center axis",
      camera: "forward perspective, central axis, strong silhouette",
      composition: "movement archetype, force directed through symmetry",
      lighting: "crimson-gold directional glow",
      sacredGeometry: "Vertical Axis, arrow triangle, disciplined orbit lines",
      atmosphere: "focused, powerful, controlled"
    },
    emotion: {
      core: "discipline and victory",
      shadow: "force without inner alignment",
      awakening: "direction turns power into progress"
    },
    motion: {
      energyFlow: "forward along a golden axis",
      particleBehavior: "crimson sparks trailing in controlled lines",
      wind: "strong forward wind",
      movementStyle: "controlled forward motion"
    },
    symbolism: {
      primary: "celestial chariot and star road",
      secondary: "reins, paired forces, arrow geometry",
      forbidden: `${shared.forbidden}, violent battle scene`
    },
    renderHints: {
      focalPriority: "direction, chariot silhouette, driver",
      depth: "road foreground, chariot, cosmic vanishing point",
      cinematicScale: "large and kinetic"
    }
  }),

  Strength: defineCardDNA({
    identity: {
      archetype: "gentle courage and compassionate force",
      philosophy: "softness can hold power without domination",
      transformation: "from fear of power into loving steadiness"
    },
    visual: {
      visualSeed: "gold rose lion aura, quiet courage, compassionate strength, inner steadiness",
      environment: "warm cosmic field with lion aura",
      architecture: "rounded sanctuary, heart-centered ring, low horizon",
      camera: "medium-full, calm human-animal harmony",
      composition: "human archetype, figure and lion aura in trust",
      lighting: "gold rose heart glow",
      sacredGeometry: "Soul Ring, infinity-like orbit, soft circle",
      atmosphere: "warm, brave, compassionate"
    },
    emotion: {
      core: "courage and tenderness",
      shadow: "suppressed anger or forced gentleness",
      awakening: "power becomes safe when held with love"
    },
    motion: {
      energyFlow: "heart outward into protective aura",
      particleBehavior: "warm gold motes around lion field",
      wind: "slow breathing air",
      movementStyle: "gentle breath, still power"
    },
    symbolism: {
      primary: "lion aura and calm human presence",
      secondary: "heart glow, infinity orbit, warm gold dust",
      forbidden: `${shared.forbidden}, aggressive beast attack`
    },
    renderHints: {
      focalPriority: "heart courage, lion aura, figure",
      depth: "warm foreground, paired presence, cosmic field",
      cinematicScale: "intimate but powerful"
    }
  }),

  "The Hermit": defineCardDNA({
    identity: {
      archetype: "keeper of inner light",
      philosophy: "solitude reveals the path that noise conceals",
      transformation: "from isolation into wise self-guidance"
    },
    visual: {
      visualSeed: "deep blue mountain lantern, wise solitude, inner path, starlit contemplation",
      environment: "cosmic mountain path and lantern light",
      architecture: "narrow path, high dark sky, lantern as sacred module",
      camera: "slightly distant full-body silhouette",
      composition: "human archetype, small figure in vast wisdom field",
      lighting: "small lantern key light against deep blue",
      sacredGeometry: "single vertical light axis, minimal orbit",
      atmosphere: "quiet, wise, spacious"
    },
    emotion: {
      core: "solitude and wisdom",
      shadow: "withdrawal that becomes avoidance",
      awakening: "inner light is meant to guide, not hide"
    },
    motion: {
      energyFlow: "small light expanding outward",
      particleBehavior: "slow blue-white dust near lantern",
      wind: "thin mountain air",
      movementStyle: "slow lantern glow, quiet step"
    },
    symbolism: {
      primary: "lantern and mountain path",
      secondary: "hooded silhouette, star trail, single orbit",
      forbidden: `${shared.forbidden}, lonely despair mood`
    },
    renderHints: {
      focalPriority: "lantern light, path, figure",
      depth: "path foreground, figure, deep cosmic mountain",
      cinematicScale: "small human against vast universe"
    }
  }),

  "Wheel of Fortune": defineCardDNA({
    identity: {
      archetype: "keeper of cycles and timing",
      philosophy: "life moves in circles that become wisdom when observed",
      transformation: "from resisting change into trusting rhythm"
    },
    visual: {
      visualSeed: "cosmic golden wheel, turning fate, cycles, timing, celestial movement",
      environment: "vast starfield with luminous wheel",
      architecture: "central golden wheel, orbiting rings, celestial clockwork",
      camera: "symbol-led wide cosmic composition",
      composition: "cosmic archetype, wheel dominates over character",
      lighting: "gold wheel radiance",
      sacredGeometry: "circle, orbit, wheel spokes, sacred dust",
      atmosphere: "cyclical, mysterious, rhythmic"
    },
    emotion: {
      core: "timing and surrender",
      shadow: "trying to control every turn",
      awakening: "change becomes guidance when rhythm is recognized"
    },
    motion: {
      energyFlow: "circular and orbital",
      particleBehavior: "gold dust tracing circular paths",
      wind: "rotational cosmic current",
      movementStyle: "slow celestial rotation"
    },
    symbolism: {
      primary: "golden cosmic wheel",
      secondary: "orbit paths, stars, timing marks",
      forbidden: `${shared.forbidden}, casino wheel or gambling imagery`
    },
    renderHints: {
      focalPriority: "wheel, orbit, cosmic depth",
      depth: "foreground dust, wheel plane, starfield",
      cinematicScale: "vast and symbolic"
    }
  }),

  Justice: defineCardDNA({
    identity: {
      archetype: "sacred balance and clear truth",
      philosophy: "clarity arrives when both sides are seen without distortion",
      transformation: "from reaction into fair seeing"
    },
    visual: {
      visualSeed: "silver gold cosmic scales, truth, balance, clear choice, sacred fairness",
      environment: "symmetrical celestial temple",
      architecture: "balanced columns, central axis, scale geometry",
      camera: "straight-on symmetrical composition",
      composition: "human archetype, perfect bilateral balance",
      lighting: "silver-gold balanced illumination",
      sacredGeometry: "Vertical Axis, balanced circles, fine gold scales geometry",
      atmosphere: "clear, calm, authoritative"
    },
    emotion: {
      core: "truth and balance",
      shadow: "cold judgment or rigid fairness",
      awakening: "balance becomes compassionate when truth is held gently"
    },
    motion: {
      energyFlow: "equal left-right balance through center axis",
      particleBehavior: "silver-gold particles suspended evenly",
      wind: "still ceremonial air",
      movementStyle: "perfect stillness with tiny balanced shimmer"
    },
    symbolism: {
      primary: "cosmic scales and vertical axis",
      secondary: "balanced bowls, pearl halo, temple symmetry",
      forbidden: `${shared.forbidden}, courtroom cliche`
    },
    renderHints: {
      focalPriority: "balance field, scales, calm authority",
      depth: "temple foreground, scales/figure, cosmic arch",
      cinematicScale: "formal and iconic"
    }
  }),

  "The Hanged Man": defineCardDNA({
    identity: {
      archetype: "sacred pause and reversed seeing",
      philosophy: "surrender can reveal a wider truth than force",
      transformation: "from resistance into new perspective"
    },
    visual: {
      visualSeed: "suspended starlight figure, surrender, new perspective, soft pause, spiritual release",
      environment: "floating cosmic threshold",
      architecture: "suspended vertical frame, inverted triangle, open void",
      camera: "suspended vertical composition",
      composition: "transformation archetype, weightless centered figure",
      lighting: "aqua-violet halo glow",
      sacredGeometry: "inverted triangle, Soul Ring, vertical axis",
      atmosphere: "quiet, suspended, spacious"
    },
    emotion: {
      core: "surrender and perspective",
      shadow: "stagnation disguised as spirituality",
      awakening: "stillness becomes movement when meaning shifts"
    },
    motion: {
      energyFlow: "downward release becoming upward insight",
      particleBehavior: "aqua dust suspended in place",
      wind: "zero-gravity drift",
      movementStyle: "weightless suspension"
    },
    symbolism: {
      primary: "suspended figure or light form",
      secondary: "inverted triangle, soft halo, hanging thread of light",
      forbidden: `${shared.forbidden}, suffering or punishment imagery`
    },
    renderHints: {
      focalPriority: "suspension energy, halo, figure",
      depth: "empty space, figure, distant threshold",
      cinematicScale: "meditative and weightless"
    }
  }),

  Death: defineCardDNA({
    identity: {
      archetype: "gentle ending and rebirth threshold",
      philosophy: "what leaves creates space for truer life",
      transformation: "from fear of ending into sacred release"
    },
    visual: {
      visualSeed: "black violet dawn threshold, transformation, gentle ending, rebirth, sacred release",
      environment: "violet-black threshold opening into dawn",
      architecture: "doorway, veil, dissolving arch, dawn horizon",
      camera: "threshold composition with symbolic figure or veil",
      composition: "transformation archetype, dark-to-light passage",
      lighting: "dawn gold cutting through dark violet",
      sacredGeometry: "doorway rectangle, circle of rebirth, vertical axis",
      atmosphere: "reverent, releasing, not frightening"
    },
    emotion: {
      core: "release and rebirth",
      shadow: "clinging to what has completed",
      awakening: "ending becomes mercy when it restores truth"
    },
    motion: {
      energyFlow: "dissolving outward then rising",
      particleBehavior: "ash-like violet dust turning gold",
      wind: "soft threshold breeze",
      movementStyle: "veil dissolving into light"
    },
    symbolism: {
      primary: "threshold and dawn",
      secondary: "falling petals, dissolving veil, rebirth circle",
      forbidden: `${shared.forbidden}, skeleton horror, gore, death scene`
    },
    renderHints: {
      focalPriority: "transformation light, threshold, figure/veil",
      depth: "dark foreground, doorway, dawn beyond",
      cinematicScale: "sacred and liminal"
    }
  }),

  Temperance: defineCardDNA({
    identity: {
      archetype: "alchemist of balance and integration",
      philosophy: "healing emerges from right proportion",
      transformation: "from extremes into harmonious flow"
    },
    visual: {
      visualSeed: "blue gold flowing light, sacred blending, balance, healing water, calm integration",
      environment: "cosmic water and flowing light streams",
      architecture: "two vessels or streams, circular pool, balanced horizon",
      camera: "centered calm figure, hands/vessels visible",
      composition: "human archetype, flow between two points",
      lighting: "blue-gold water glow",
      sacredGeometry: "two flowing arcs, circle, vertical axis",
      atmosphere: "healing, calm, fluid"
    },
    emotion: {
      core: "integration and moderation",
      shadow: "over-correcting or diluting truth",
      awakening: "balance is alive, not static"
    },
    motion: {
      energyFlow: "between vessels, left to right and back",
      particleBehavior: "blue-gold droplets of light",
      wind: "humid soft current",
      movementStyle: "liquid light pouring slowly"
    },
    symbolism: {
      primary: "flowing light between vessels",
      secondary: "water, circular pool, balanced arcs",
      forbidden: `${shared.forbidden}, literal chemistry lab`
    },
    renderHints: {
      focalPriority: "flow, hands/vessels, calm face",
      depth: "water foreground, figure, cosmic stream",
      cinematicScale: "serene and balanced"
    }
  }),

  "The Devil": defineCardDNA({
    identity: {
      archetype: "mirror of desire and liberation",
      philosophy: "shadow loses power when met with honesty",
      transformation: "from unconscious attachment into chosen freedom"
    },
    visual: {
      visualSeed: "dark ruby mirror chamber, desire awareness, shadow integration, liberation, inner honesty",
      environment: "ruby mirror chamber, elegant shadow space",
      architecture: "mirror threshold, dark glass, diamond geometry",
      camera: "mirror/threshold perspective, non-horror",
      composition: "transformation archetype, self-facing mirror without fear",
      lighting: "dark ruby glow with gold edge light",
      sacredGeometry: "diamond mirror, orbit of release, soft axis",
      atmosphere: "honest, intimate, shadow-aware"
    },
    emotion: {
      core: "desire awareness and liberation",
      shadow: "compulsion or self-betrayal",
      awakening: "freedom begins when the pattern is named"
    },
    motion: {
      energyFlow: "inward reflection then outward release",
      particleBehavior: "ruby sparks dissolving into gold",
      wind: "warm low current",
      movementStyle: "chains or shadows dissolving gently"
    },
    symbolism: {
      primary: "mirror chamber",
      secondary: "loosened thread, ruby aura, gold exit line",
      forbidden: `${shared.forbidden}, demon figure, horror sexuality`
    },
    renderHints: {
      focalPriority: "mirror honesty, release path, figure/symbol",
      depth: "glass foreground, mirror plane, dark chamber",
      cinematicScale: "intimate and psychologically rich"
    }
  }),

  "The Tower": defineCardDNA({
    identity: {
      archetype: "awakening flash that clears illusion",
      philosophy: "truth can arrive as disruption when the old form is too small",
      transformation: "from false stability into liberated clarity"
    },
    visual: {
      visualSeed: "violet storm tower, awakening flash, collapse of illusion, cleansing lightning, safe transformation",
      environment: "cosmic storm clearing an old structure",
      architecture: "old tower silhouette, lightning axis, broken geometric shell",
      camera: "vertical release composition",
      composition: "transformation archetype, structure opening to light",
      lighting: "electric gold-violet flash, controlled not violent",
      sacredGeometry: "broken rectangle, vertical lightning axis, orbit fragments",
      atmosphere: "cleansing, intense but safe"
    },
    emotion: {
      core: "awakening and truth",
      shadow: "fear of losing false certainty",
      awakening: "collapse can reveal the sky"
    },
    motion: {
      energyFlow: "top-down flash opening outward",
      particleBehavior: "violet-gold fragments becoming sacred dust",
      wind: "storm current moving upward",
      movementStyle: "light breaking through old form"
    },
    symbolism: {
      primary: "tower opening to lightning",
      secondary: "broken frame, storm clouds, gold flash",
      forbidden: `${shared.forbidden}, disaster gore, people falling`
    },
    renderHints: {
      focalPriority: "awakening light, tower shell, open sky",
      depth: "storm foreground, tower, cosmic clearing",
      cinematicScale: "large and dramatic but non-horror"
    }
  }),

  "The Star": defineCardDNA({
    identity: {
      archetype: "healer of hope and renewal",
      philosophy: "hope is the quiet intelligence of the soul",
      transformation: "from depletion into trust in renewal"
    },
    visual: {
      visualSeed: "aqua starlit water, hope, healing, cosmic blessing, soft renewal",
      environment: "starlit water and open cosmic sky",
      architecture: "water plane, star field, open horizon",
      camera: "wide serene composition with luminous figure or water",
      composition: "cosmic archetype, hope before figure",
      lighting: "aqua-pearl star glow",
      sacredGeometry: "star orbit, Soul Ring, water reflection circles",
      atmosphere: "hopeful, clean, healing"
    },
    emotion: {
      core: "hope and renewal",
      shadow: "waiting for rescue instead of receiving guidance",
      awakening: "hope becomes active when it nourishes the next step"
    },
    motion: {
      energyFlow: "downward blessing into water",
      particleBehavior: "aqua star dust reflecting on water",
      wind: "cool night breeze",
      movementStyle: "gentle pouring light"
    },
    symbolism: {
      primary: "star water and blessing light",
      secondary: "vessel, reflection, distant constellation",
      forbidden: `${shared.forbidden}, pin-up water pose`
    },
    renderHints: {
      focalPriority: "hope light, water reflection, figure/symbol",
      depth: "water foreground, luminous center, open sky",
      cinematicScale: "wide and tender"
    }
  }),

  "The Moon": defineCardDNA({
    identity: {
      archetype: "keeper of dreams and emotional mist",
      philosophy: "not all truth is visible before dawn",
      transformation: "from confusion into compassionate sensing"
    },
    visual: {
      visualSeed: "silver indigo moon path, dream mist, subconscious, emotional mystery, gentle night",
      environment: "misty moon path and dream water",
      architecture: "moon gate, water path, soft twin silhouettes if needed",
      camera: "symbol-led atmospheric wide composition",
      composition: "cosmic archetype, moon path before character",
      lighting: "silver moon haze",
      sacredGeometry: "crescent orbit, soft circle, subtle vertical path",
      atmosphere: "mysterious, sensitive, safe"
    },
    emotion: {
      core: "intuition through uncertainty",
      shadow: "projection, anxiety, emotional fog",
      awakening: "mist becomes guidance when fear softens"
    },
    motion: {
      energyFlow: "slow tidal movement",
      particleBehavior: "silver dust drifting through mist",
      wind: "cool nocturnal haze",
      movementStyle: "mist drifting slowly"
    },
    symbolism: {
      primary: "moon path and mist",
      secondary: "water, crescent, dream reflection",
      forbidden: `${shared.forbidden}, horror moon, wolves attacking`
    },
    renderHints: {
      focalPriority: "moon atmosphere, path, subtle figure/symbol",
      depth: "mist foreground, path, moon gate",
      cinematicScale: "dreamlike and spacious"
    }
  }),

  "The Sun": defineCardDNA({
    identity: {
      archetype: "radiant truth and vital joy",
      philosophy: "clarity warms what shame once hid",
      transformation: "from dimming oneself into embodied brightness"
    },
    visual: {
      visualSeed: "solar gold cosmic sunrise, joy, vitality, radiant truth, warm clarity",
      environment: "cosmic sunrise and warm luminous field",
      architecture: "sun circle, open sky, simple horizon",
      camera: "open centered composition",
      composition: "cosmic archetype, vitality before literal sun",
      lighting: "solar gold radiance, warm but not harsh",
      sacredGeometry: "sun circle, vertical axis, light rays",
      atmosphere: "clear, joyful, warm"
    },
    emotion: {
      core: "joy and visibility",
      shadow: "performing happiness or avoiding complexity",
      awakening: "true light allows the whole self to be seen"
    },
    motion: {
      energyFlow: "outward expansion from center",
      particleBehavior: "gold motes radiating gently",
      wind: "warm open air",
      movementStyle: "radiant outward expansion"
    },
    symbolism: {
      primary: "solar glow and open clarity",
      secondary: "sun ring, simple horizon, warm fabric",
      forbidden: `${shared.forbidden}, childish cartoon sun`
    },
    renderHints: {
      focalPriority: "vitality glow, open posture, sun circle",
      depth: "warm foreground, figure/symbol, bright cosmic sky",
      cinematicScale: "open and radiant"
    }
  }),

  Judgement: defineCardDNA({
    identity: {
      archetype: "awakening call and soul renewal",
      philosophy: "the deeper self calls without punishment",
      transformation: "from self-judgment into conscious rebirth"
    },
    visual: {
      visualSeed: "violet gold awakening sky, soul calling, forgiveness, rebirth, rising light",
      environment: "awakening sky with rising soul light",
      architecture: "vertical portal, rising steps, dawn opening",
      camera: "vertical rising composition",
      composition: "transformation archetype, upward pull and release",
      lighting: "violet-gold dawn beam",
      sacredGeometry: "vertical axis, rising triangle, Soul Ring",
      atmosphere: "forgiving, expansive, awakening"
    },
    emotion: {
      core: "calling and forgiveness",
      shadow: "harsh self-judgment",
      awakening: "rebirth begins when the old self is forgiven"
    },
    motion: {
      energyFlow: "upward through central axis",
      particleBehavior: "violet-gold dust rising like breath",
      wind: "updraft through the body",
      movementStyle: "light ascending"
    },
    symbolism: {
      primary: "rising light and soul call",
      secondary: "dawn portal, lifted hands, forgiveness field",
      forbidden: `${shared.forbidden}, apocalyptic judgment scene`
    },
    renderHints: {
      focalPriority: "rising light, open posture, portal",
      depth: "lower shadow, central beam, open sky",
      cinematicScale: "vertical and elevating"
    }
  }),

  "The World": defineCardDNA({
    identity: {
      archetype: "integrated whole and completed cycle",
      philosophy: "completion is not an ending but a fuller self returning",
      transformation: "from fragmentation into wholeness"
    },
    visual: {
      visualSeed: "emerald gold cosmic circle, completion, integration, wholeness, elegant celestial dance",
      environment: "cosmic circle and integrated star field",
      architecture: "complete ring, orbiting quadrants, balanced cosmic frame",
      camera: "centered cosmic circle composition",
      composition: "cosmic archetype, circle of wholeness dominates",
      lighting: "emerald-gold full-field glow",
      sacredGeometry: "complete circle, orbit paths, hexagonal harmony",
      atmosphere: "complete, graceful, integrated"
    },
    emotion: {
      core: "completion and integration",
      shadow: "refusing to receive completion",
      awakening: "the journey becomes wisdom when all parts are welcomed"
    },
    motion: {
      energyFlow: "circular and complete",
      particleBehavior: "emerald-gold dust orbiting gently",
      wind: "soft circular current",
      movementStyle: "slow celestial dance"
    },
    symbolism: {
      primary: "complete cosmic ring",
      secondary: "dancer/light form, four directions, emerald-gold aura",
      forbidden: `${shared.forbidden}, busy world map literalism`
    },
    renderHints: {
      focalPriority: "wholeness ring, integrated figure/symbol, orbit",
      depth: "orbit foreground, circle plane, infinite star field",
      cinematicScale: "vast, complete, elegant"
    }
  })
};

function flattenCardDNA(dna, card) {
  if (!dna) {
    return {
      visualSeed: card?.artwork?.promptSeed || card?.energyTheme || "premium mystical oracle card background",
      environment: "dark cosmic oracle environment",
      emotion: "gentle self-awareness",
      camera: "mobile-first vertical hero composition",
      lighting: "soft aura glow",
      sacredGeometry: shared.sacredGeometry,
      materials: shared.materials,
      motionLanguage: shared.motionLanguage,
      architecture: "premium oracle frame",
      composition: "mobile-first centered composition",
      atmosphere: "calm and symbolic",
      identity: {},
      visual: {},
      motion: {},
      symbolism: {},
      renderHints: {}
    };
  }

  return {
    ...dna,
    visualSeed: dna.visual.visualSeed,
    environment: dna.visual.environment,
    emotion: dna.emotion.core,
    camera: dna.visual.camera,
    lighting: dna.visual.lighting,
    sacredGeometry: dna.visual.sacredGeometry,
    materials: dna.visual.materials,
    motionLanguage: dna.motion.movementStyle,
    architecture: dna.visual.architecture,
    composition: dna.visual.composition,
    atmosphere: dna.visual.atmosphere
  };
}

export function getCardDNA(card) {
  return flattenCardDNA(cardDNA[card?.englishName], card);
}
