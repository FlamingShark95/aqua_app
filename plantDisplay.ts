import { Plant } from "./plantData";
import { Badge, COLORS } from "./fishDisplay";

// Plant-side badge maps, mirroring fishDisplay.ts. Kept here (not in the detail
// screen) so the detail screen, the filter chips, and the list all draw the same
// labels/colors from one source. `Badge` and the shared `COLORS` palette live in
// fishDisplay.ts; only plant-specific maps belong here.

export const plantCareMap: Record<Plant["careLevel"], Badge> = {
  beginner: { text: "Easy", color: COLORS.green },
  intermediate: { text: "Moderate", color: COLORS.yellow },
  advanced: { text: "Advanced", color: COLORS.orange },
};

export const lightMap: Record<Plant["light"], Badge> = {
  low: { text: "Low light", color: COLORS.green },
  medium: { text: "Medium light", color: COLORS.yellow },
  high: { text: "High light", color: COLORS.orange },
};

export const co2Map: Record<Plant["co2"], Badge> = {
  none: { text: "No CO₂", color: COLORS.green },
  optional: { text: "CO₂ optional", color: COLORS.yellow },
  required: { text: "CO₂ required", color: COLORS.orange },
};

export const growthMap: Record<Plant["growthRate"], Badge> = {
  slow: { text: "Slow grower", color: COLORS.soft },
  medium: { text: "Medium grower", color: COLORS.yellow },
  fast: { text: "Fast grower", color: COLORS.green },
};

// Form and placement have no inherent "good/bad", so they share a neutral soft
// color; the labels are what matter for the filter chips.
export const typeMap: Record<Plant["type"], Badge> = {
  stem: { text: "Stem", color: COLORS.soft },
  rosette: { text: "Rosette", color: COLORS.soft },
  rhizome: { text: "Rhizome", color: COLORS.soft },
  moss: { text: "Moss", color: COLORS.soft },
  floating: { text: "Floating", color: COLORS.soft },
  carpet: { text: "Carpet", color: COLORS.soft },
  bulb: { text: "Bulb", color: COLORS.soft },
};

export const placementMap: Record<Plant["placement"], Badge> = {
  foreground: { text: "Foreground", color: COLORS.soft },
  midground: { text: "Midground", color: COLORS.soft },
  background: { text: "Background", color: COLORS.soft },
  floating: { text: "Floating", color: COLORS.soft },
};
