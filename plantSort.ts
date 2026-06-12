import { Plant } from "./plantData";
import { plantCareMap } from "./plantDisplay";

// Sort options for the Plant list — the plant-side mirror of fishSort.ts. UI-free
// so PlantsScreen stays thin: each mode supplies an ascending `compare` plus a
// `sectionKey` used for the list's section headers (the list is sorted by the
// same key first, so same-key plants stay contiguous and the grouping logic still
// works).
//
// "fit" is not in PLANT_SORT_MODES: it needs the active tank for context, so
// PlantsScreen special-cases it using scorePlantForTank from rules.ts. Only the
// id and the tier section labels live here.

export type PlantSortId = "name" | "size" | "care" | "price" | "fit";

export const PLANT_FIT_TIER_LABELS = {
  great: "Great fit",
  workable: "Workable",
  poor: "Poor fit",
} as const;

export type PlantSortMode = {
  id: PlantSortId;
  label: string;
  compare: (a: Plant, b: Plant) => number;
  sectionKey: (plant: Plant) => string;
};

const byName = (a: Plant, b: Plant) => a.commonName.localeCompare(b.commonName);

// Friendly bucket name for the height sections.
function heightBucketName(cm: number): string {
  if (cm < 10) return "Short";
  if (cm < 30) return "Medium";
  return "Tall";
}

const PRICE_ORDER: Record<Plant["priceRange"], number> = {
  $: 0,
  $$: 1,
  $$$: 2,
};

const CARE_ORDER: Record<Plant["careLevel"], number> = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
};

export const PLANT_SORT_MODES: PlantSortMode[] = [
  {
    id: "name",
    label: "Name",
    compare: byName,
    sectionKey: (p) => p.commonName.charAt(0).toUpperCase(),
  },
  {
    id: "size",
    label: "Height",
    compare: (a, b) => a.heightCm - b.heightCm || byName(a, b),
    sectionKey: (p) => heightBucketName(p.heightCm),
  },
  {
    id: "care",
    label: "Care",
    compare: (a, b) =>
      CARE_ORDER[a.careLevel] - CARE_ORDER[b.careLevel] || byName(a, b),
    sectionKey: (p) => plantCareMap[p.careLevel].text,
  },
  {
    id: "price",
    label: "Price",
    compare: (a, b) =>
      PRICE_ORDER[a.priceRange] - PRICE_ORDER[b.priceRange] || byName(a, b),
    sectionKey: (p) => p.priceRange,
  },
];
