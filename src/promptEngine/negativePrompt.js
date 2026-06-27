export const negativePrompt = [
  "text",
  "letters",
  "typography",
  "numbers",
  "logo",
  "watermark",
  "signature",
  "readable symbols",
  "accidental letters",
  "fake Thai text",
  "fake English text",
  "malformed glyphs",
  "horror",
  "gore",
  "demons",
  "fear-based fortune telling",
  "scary expression",
  "aggressive fantasy armor",
  "RPG splash art",
  "oversexualized costume",
  "distorted hands",
  "malformed anatomy",
  "extra fingers",
  "broken scales",
  "cluttered sacred geometry",
  "busy background",
  "harsh neon",
  "cheap yellow gold",
  "heavy tarot border",
  "low resolution",
  "blurry subject",
  "UI text baked into image"
];

export function buildNegativePrompt() {
  return negativePrompt.join(", ");
}
