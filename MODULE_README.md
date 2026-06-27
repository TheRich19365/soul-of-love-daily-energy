# Soul of Love Daily Energy

Production Candidate: `1.0.0-rc1`

## Purpose

Soul of Love Daily Energy is the first production-candidate module of the Soul of Love platform. It provides a premium, symbolic daily tarot-style energy reading focused on self-awareness, emotional reflection, and gentle behavioral guidance.

The module is not deterministic fortune telling. It is a visual, narrative, and energetic interface that helps users reflect on the current day through one Major Arcana archetype, aura color, card orientation, energy score, and layered interpretation text.

## Architecture Overview

The module is a client-side React/Next.js app with no backend dependency. The user flow is:

1. User chooses a reading mode.
2. User draws a Daily Energy card.
3. `createReading()` generates a reading object from deck data, aura palette, mode text, random utilities, and layered interpretation pools.
4. The hero card renders the selected Major Arcana with either approved hero artwork or symbolic fallback.
5. Today's Reading displays the full layered interpretation.
6. Prompt Engine builds external AI image prompts for result-card artwork generation.

## Folder Structure

```text
src/
  App.jsx
  components/
    HeroCard.jsx
    ReadingSection.jsx
    PromptPanel.jsx
    common/
      SoulUI.jsx
    internal/
      HeroArtworkProductionDashboard.jsx
  data/
    auraPalette.js
    heroArtworkStatus.js
    interpretationPools.js
    modeText.js
    tarotDeck.js
  lib/
    createAreaInsight.js
    createLayeredInterpretation.js
    createReading.js
    random.js
  platform/
    config/
      uiConstants.js
    utils/
      displayUtils.js
  promptEngine/
    auraDNA.js
    buildPrompt.js
    cardDNA.js
    compositionDNA.js
    energyDNA.js
    negativePrompt.js
    styleDNA.js
```

## Prompt Engine Overview

The Prompt Engine lives in `src/promptEngine/` and combines:

- `styleDNA.js`: permanent Soul of Love visual language.
- `auraDNA.js`: aura color translation into palette, glow, particles, and lighting mood.
- `cardDNA.js`: Major Arcana visual identity, symbolism, environment, materials, motion, and cinematic hints.
- `energyDNA.js`: energy score atmosphere bands.
- `compositionDNA.js`: prompt layout intent such as Hero Artwork or Social Poster.
- `negativePrompt.js`: centralized avoidance rules.
- `buildPrompt.js`: final prompt composer.

In RC1, the visible prompt buttons copy prompts for external image/result-card generation. They do not generate images inside the app.

## Hero Artwork Workflow

Hero artwork support is prepared for all 22 Major Arcana.

The deck data references hero artwork paths under:

```text
public/cards/major/
```

The production status tracker is stored in:

```text
src/data/heroArtworkStatus.js
```

Only artwork that passes the production workflow should be treated as final. If a hero image is unavailable or fails to load, the UI falls back to a symbolic card illustration. This keeps the module stable while the art library is completed.

## Reading Engine Overview

The reading engine is centered in:

```text
src/lib/createReading.js
src/lib/createLayeredInterpretation.js
src/data/interpretationPools.js
```

It generates:

- universeMessage
- guidance
- mission
- soulMessage
- love
- work
- money
- warning
- focus
- affirmation

The engine uses card energy tags, orientation, aura color, energy score, and reading mode to produce consistent but varied narrative output.

## Future Integration Points

Matrix 9:
Daily Energy can share Soul of Love visual tokens, prompt engine language, and result-card composition rules with Matrix 9.

Aura:
Aura color and aura DNA can become a shared platform service used by Daily Energy, Matrix 9, Compatibility, and Oracle modules.

Compatibility:
Card archetypes, aura states, and narrative tone pools can be reused for relationship and pair-reading modules.

Portfolio:
The Design Bible, hero artwork system, and prompt engine can support a public creative portfolio or product showcase site.

Oracle:
The Hero Artwork workflow and reading section structure can become the foundation for a fuller Soul of Love Oracle product.

## RC1 Notes

Social PNG export is intentionally removed from the user-facing UI in RC1. The previous export preview needs a dedicated production rewrite before it returns.
