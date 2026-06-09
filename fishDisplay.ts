import { Fish } from "./fishData";

// Shared palette for the whole app. Components reference these instead of
// hard-coding hex values, so re-theming is a one-file change. All values are
// 6-digit hex: badge/accent colors get alpha suffixes appended ("22"/"33"),
// which silently breaks on 3-digit shorthand.
export const COLORS = {
  green: "#5fd38d",
  yellow: "#e6c84d",
  orange: "#e8896a",
  red: "#e57373",
  text: "#e8eef5",
  muted: "#7792a8",

  bg: "#0b1d2a", // screen background
  bgDeep: "#0a1622", // tab bar, image frames
  surface: "#13314a", // cards, inputs, hairline borders
  surfaceDeep: "#0f2638", // inputs/cards sitting on a surface
  divider: "#16344c", // row dividers inside detail cards
  chipBorder: "#2c4a63",
  accent: "#22aa77", // = the old "#2a7" shorthand, expanded
  link: "#7fd1ff",
  danger: "#ff8080",
  dangerBg: "#5a1a1a",
  dangerText: "#ffb3b3",
  placeholder: "#8888aa", // = the old "#88a"
  soft: "#99bbcc", // = the old "#9bc"
};

export type Badge = { text: string; color: string };

export const careMap: Record<Fish["careLevel"], Badge> = {
  beginner: { text: "Easy", color: COLORS.green },
  intermediate: { text: "Moderate", color: COLORS.yellow },
  advanced: { text: "Advanced", color: COLORS.orange },
};

export const temperamentMap: Record<Fish["temperament"], Badge> = {
  peaceful: { text: "Peaceful", color: COLORS.green },
  semi: { text: "Mostly Peaceful", color: COLORS.yellow },
  aggressive: { text: "Aggressive", color: COLORS.orange },
  predatory: { text: "Predatory", color: COLORS.red },
};

export const dietMap: Record<Fish["diet"], Badge> = {
  herbivore: { text: "Herbivore", color: COLORS.green },
  omnivore: { text: "Omnivore", color: COLORS.yellow },
  carnivore: { text: "Carnivore", color: COLORS.orange },
};

const availabilityMap: Record<Fish["rarity"], Badge> = {
  common: { text: "Common", color: COLORS.green },
  uncommon: { text: "Uncommon", color: COLORS.yellow },
  rare: { text: "Rare", color: COLORS.orange },
};

export const careBadge = (fish: Fish): Badge => careMap[fish.careLevel];
export const temperamentBadge = (fish: Fish): Badge =>
  temperamentMap[fish.temperament];
export const dietBadge = (fish: Fish): Badge => dietMap[fish.diet];
export const availabilityBadge = (fish: Fish): Badge =>
  availabilityMap[fish.rarity];

const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const tankRegionLabel = (fish: Fish): string =>
  fish.tankRegion ? titleCase(fish.tankRegion) : "?";

export const waterTypeLabel = (fish: Fish): string =>
  fish.waterType === "saltwater" ? "Salt Water" : "Fresh Water";
