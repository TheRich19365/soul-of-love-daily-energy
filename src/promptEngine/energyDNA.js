export function getEnergyDNA(score = 50) {
  if (score <= 25) {
    return {
      band: "heavy",
      atmosphere: "dense, inward, quiet, protective",
      lightBehavior: "low light with a small central glow",
      visualPace: "still and slow"
    };
  }

  if (score <= 50) {
    return {
      band: "transition",
      atmosphere: "shifting, reflective, between states",
      lightBehavior: "light emerging through soft shadow",
      visualPace: "gentle movement"
    };
  }

  if (score <= 75) {
    return {
      band: "balanced",
      atmosphere: "clear, grounded, emotionally steady",
      lightBehavior: "balanced aura glow with calm contrast",
      visualPace: "stable and flowing"
    };
  }

  return {
    band: "radiant",
    atmosphere: "bright, open, confident, elevated",
    lightBehavior: "strong aura bloom with refined highlights",
    visualPace: "expansive and luminous"
  };
}
