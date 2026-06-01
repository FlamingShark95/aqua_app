import { Fish } from "./fishData";
import { careMap } from "./fishDisplay";

// Sort options for the Fish list. UI-free so SearchScreen stays thin: each mode
// supplies an ascending `compare` plus a `sectionKey` used for the list's
// section headers (the list is sorted by the same key first, so same-key fish
// stay contiguous and the existing grouping logic still works).

export type SortId = "name" | "size" | "price" | "care";

export type SortMode = {
  id: SortId;
  label: string;
  compare: (a: Fish, b: Fish) => number;
  sectionKey: (fish: Fish) => string;
};

const byName = (a: Fish, b: Fish) => a.commonName.localeCompare(b.commonName);

// Friendly bucket name for the size sections.
function sizeBucketName(cm: number): string {
  if (cm < 5) return "Nano";
  if (cm < 10) return "Small";
  if (cm < 25) return "Medium";
  return "Large";
}

const PRICE_ORDER: Record<Fish["priceRange"], number> = {
  $: 0,
  $$: 1,
  $$$: 2,
};

const CARE_ORDER: Record<Fish["careLevel"], number> = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
};

export const SORT_MODES: SortMode[] = [
  {
    id: "name",
    label: "Name",
    compare: byName,
    sectionKey: (f) => f.commonName.charAt(0).toUpperCase(),
  },
  {
    id: "size",
    label: "Size",
    compare: (a, b) => a.adultSizeCm - b.adultSizeCm || byName(a, b),
    sectionKey: (f) => sizeBucketName(f.adultSizeCm),
  },
  {
    id: "price",
    label: "Price",
    compare: (a, b) =>
      PRICE_ORDER[a.priceRange] - PRICE_ORDER[b.priceRange] || byName(a, b),
    sectionKey: (f) => f.priceRange,
  },
  {
    id: "care",
    label: "Care",
    compare: (a, b) =>
      CARE_ORDER[a.careLevel] - CARE_ORDER[b.careLevel] || byName(a, b),
    sectionKey: (f) => careMap[f.careLevel].text,
  },
];
