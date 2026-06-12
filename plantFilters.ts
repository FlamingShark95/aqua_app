import { Plant } from "./plantData";
import { FilterCategory, FilterOption } from "./fishFilters";
import {
  plantCareMap,
  lightMap,
  co2Map,
  growthMap,
  typeMap,
  placementMap,
} from "./plantDisplay";
import { formatTemp, tempValue } from "./units";

// The filter model for the Plant list — the plant-side mirror of fishFilters.ts.
// Same contract: each category defines its options + a per-plant predicate, and a
// plant passes when it matches at least one selected option in every active
// category (OR within a category, AND across categories). Numeric buckets compare
// in canonical metric; only labels localize. The generic FilterOption/
// FilterCategory types come from fishFilters.ts so FilterSheet renders either list.

export type PlantCategoryId =
  | "type"
  | "placement"
  | "light"
  | "co2"
  | "growth"
  | "care"
  | "price"
  | "temp"
  | "ph";

// Selected option ids per category. A missing/empty entry means "not filtering".
export type SelectedPlantFilters = Partial<Record<PlantCategoryId, string[]>>;

// A label that ignores the unit system.
const lit = (text: string) => () => text;

// Do ranges [aMin,aMax] and [bMin,bMax] overlap? Used for pH/temperature, which
// are themselves ranges per plant.
const overlaps = (aMin: number, aMax: number, bMin: number, bMax: number) =>
  aMin <= bMax && bMin <= aMax;

// Build chip options straight from a plantDisplay badge map, so labels/colors
// match the badges shown on the detail screen.
function fromBadgeMap<K extends string>(
  map: Record<K, { text: string; color: string }>,
  get: (plant: Plant) => K
): FilterOption<Plant>[] {
  return (Object.keys(map) as K[]).map((key) => ({
    id: key,
    label: lit(map[key].text),
    color: map[key].color,
    matches: (plant) => get(plant) === key,
  }));
}

export const PLANT_CATEGORIES: FilterCategory<Plant, PlantCategoryId>[] = [
  {
    id: "type",
    title: "Form",
    options: fromBadgeMap(typeMap, (p) => p.type),
  },
  {
    id: "placement",
    title: "Placement",
    options: fromBadgeMap(placementMap, (p) => p.placement),
  },
  {
    id: "light",
    title: "Light",
    options: fromBadgeMap(lightMap, (p) => p.light),
  },
  {
    id: "co2",
    title: "CO₂",
    options: fromBadgeMap(co2Map, (p) => p.co2),
  },
  {
    id: "growth",
    title: "Growth rate",
    options: fromBadgeMap(growthMap, (p) => p.growthRate),
  },
  {
    id: "care",
    title: "Care level",
    options: fromBadgeMap(plantCareMap, (p) => p.careLevel),
  },
  {
    id: "price",
    title: "Price",
    options: (["$", "$$", "$$$"] as Plant["priceRange"][]).map((p) => ({
      id: p,
      label: lit(p),
      matches: (plant) => plant.priceRange === p,
    })),
  },
  {
    id: "temp",
    title: "Temperature",
    options: [
      {
        id: "cold",
        label: (s) => `< ${formatTemp(22, s)}`,
        matches: (p) => overlaps(p.tempMinC, p.tempMaxC, 0, 22),
      },
      {
        id: "tropical",
        label: (s) => `${tempValue(22, s)}–${formatTemp(28, s)}`,
        matches: (p) => overlaps(p.tempMinC, p.tempMaxC, 22, 28),
      },
      {
        id: "warm",
        label: (s) => `> ${formatTemp(28, s)}`,
        matches: (p) => overlaps(p.tempMinC, p.tempMaxC, 28, 40),
      },
    ],
  },
  {
    id: "ph",
    title: "pH",
    options: [
      {
        id: "acidic",
        label: lit("Acidic (< 6.5)"),
        matches: (p) => overlaps(p.phMin, p.phMax, 0, 6.5),
      },
      {
        id: "neutral",
        label: lit("Neutral (6.5–7.5)"),
        matches: (p) => overlaps(p.phMin, p.phMax, 6.5, 7.5),
      },
      {
        id: "alkaline",
        label: lit("Alkaline (> 7.5)"),
        matches: (p) => overlaps(p.phMin, p.phMax, 7.5, 14),
      },
    ],
  },
];

// A plant passes when, for every category that has selections, it matches at
// least one of them. Categories with no selection are ignored.
export function matchesPlantFilters(
  plant: Plant,
  selected: SelectedPlantFilters
): boolean {
  return PLANT_CATEGORIES.every((cat) => {
    const sel = selected[cat.id];
    if (!sel || sel.length === 0) return true;
    return cat.options.some((opt) => sel.includes(opt.id) && opt.matches(plant));
  });
}

// Total number of selected chips, for the "Filters (N)" badge.
export function countActivePlantFilters(
  selected: SelectedPlantFilters
): number {
  return Object.values(selected).reduce(
    (n, arr) => n + (arr ? arr.length : 0),
    0
  );
}

// Add/remove one option id within a category, returning a new SelectedPlantFilters
// (categories that become empty are dropped so countActivePlantFilters stays right).
export function togglePlantFilter(
  selected: SelectedPlantFilters,
  category: PlantCategoryId,
  optionId: string
): SelectedPlantFilters {
  const current = selected[category] ?? [];
  const next = current.includes(optionId)
    ? current.filter((id) => id !== optionId)
    : [...current, optionId];
  const result: SelectedPlantFilters = { ...selected, [category]: next };
  if (next.length === 0) delete result[category];
  return result;
}
