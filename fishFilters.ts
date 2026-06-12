import { AVAILABLE_FISH, Fish } from "./fishData";
import { careMap, dietMap, temperamentMap } from "./fishDisplay";
import {
  formatTemp,
  formatVolume,
  lengthUnit,
  lengthValue,
  tempValue,
  UnitSystem,
  volumeValue,
} from "./units";

// The filter model for the Fish list. UI-free so SearchScreen and FilterSheet
// stay thin: categories define their options + a per-fish predicate, and a fish
// passes when it matches at least one selected option in every active category
// (OR within a category, AND across categories). Numeric buckets compare in
// canonical metric; only their labels localize to the active unit system.

export type CategoryId =
  | "temperament"
  | "size"
  | "care"
  | "diet"
  | "ph"
  | "temp"
  | "volume"
  | "price"
  | "origin";

// Selected option ids per category. A missing/empty entry means "not filtering".
export type SelectedFilters = Partial<Record<CategoryId, string[]>>;

// The filter model is generic over the item being filtered (Fish here, Plant in
// plantFilters.ts) so FilterSheet can render either. Only `matches` cares about
// the item type; everything FilterSheet touches (id/title/label/color) does not.
export type FilterOption<T> = {
  id: string;
  // Label depends on the unit system for numeric buckets; static otherwise.
  label: (system: UnitSystem) => string;
  color?: string;
  matches: (item: T) => boolean;
};

export type FilterCategory<T, Id extends string = string> = {
  id: Id;
  title: string;
  options: FilterOption<T>[];
};

// A label that ignores the unit system.
const lit = (text: string) => () => text;

// Do ranges [aMin,aMax] and [bMin,bMax] overlap? Used for pH/temperature, which
// are themselves ranges per fish.
const overlaps = (aMin: number, aMax: number, bMin: number, bMax: number) =>
  aMin <= bMax && bMin <= aMax;

// Build chip options straight from a detail-screen badge map, so labels/colors
// match the badges shown elsewhere.
function fromBadgeMap<T, K extends string>(
  map: Record<K, { text: string; color: string }>,
  get: (item: T) => K
): FilterOption<T>[] {
  return (Object.keys(map) as K[]).map((key) => ({
    id: key,
    label: lit(map[key].text),
    color: map[key].color,
    matches: (item) => get(item) === key,
  }));
}

// Distinct origins present in the catalog, alphabetical.
const ORIGINS = Array.from(
  new Set(AVAILABLE_FISH.map((f) => f.origin))
).sort((a, b) => a.localeCompare(b));

export const CATEGORIES: FilterCategory<Fish, CategoryId>[] = [
  {
    id: "temperament",
    title: "Temperament",
    options: fromBadgeMap(temperamentMap, (f) => f.temperament),
  },
  {
    id: "size",
    title: "Adult size",
    options: [
      {
        id: "nano",
        label: (s) => `< ${lengthValue(5, s)} ${lengthUnit(s)}`,
        matches: (f) => f.adultSizeCm < 5,
      },
      {
        id: "small",
        label: (s) => `${lengthValue(5, s)}–${lengthValue(10, s)} ${lengthUnit(s)}`,
        matches: (f) => f.adultSizeCm >= 5 && f.adultSizeCm < 10,
      },
      {
        id: "medium",
        label: (s) =>
          `${lengthValue(10, s)}–${lengthValue(25, s)} ${lengthUnit(s)}`,
        matches: (f) => f.adultSizeCm >= 10 && f.adultSizeCm < 25,
      },
      {
        id: "large",
        label: (s) => `${lengthValue(25, s)} ${lengthUnit(s)}+`,
        matches: (f) => f.adultSizeCm >= 25,
      },
    ],
  },
  {
    id: "care",
    title: "Care level",
    options: fromBadgeMap(careMap, (f) => f.careLevel),
  },
  {
    id: "diet",
    title: "Diet",
    options: fromBadgeMap(dietMap, (f) => f.diet),
  },
  {
    id: "ph",
    title: "pH",
    options: [
      {
        id: "acidic",
        label: lit("Acidic (< 6.5)"),
        matches: (f) => overlaps(f.phMin, f.phMax, 0, 6.5),
      },
      {
        id: "neutral",
        label: lit("Neutral (6.5–7.5)"),
        matches: (f) => overlaps(f.phMin, f.phMax, 6.5, 7.5),
      },
      {
        id: "alkaline",
        label: lit("Alkaline (> 7.5)"),
        matches: (f) => overlaps(f.phMin, f.phMax, 7.5, 14),
      },
    ],
  },
  {
    id: "temp",
    title: "Temperature",
    options: [
      {
        id: "cold",
        label: (s) => `< ${formatTemp(22, s)}`,
        matches: (f) => overlaps(f.tempMinC, f.tempMaxC, 0, 22),
      },
      {
        id: "tropical",
        label: (s) => `${tempValue(22, s)}–${formatTemp(28, s)}`,
        matches: (f) => overlaps(f.tempMinC, f.tempMaxC, 22, 28),
      },
      {
        id: "warm",
        label: (s) => `> ${formatTemp(28, s)}`,
        matches: (f) => overlaps(f.tempMinC, f.tempMaxC, 28, 40),
      },
    ],
  },
  {
    id: "volume",
    title: "Min tank volume",
    options: [
      {
        id: "v40",
        label: (s) => `≤ ${formatVolume(40, s)}`,
        matches: (f) => f.minTankVolumeL <= 40,
      },
      {
        id: "v75",
        label: (s) => `${volumeValue(40, s)}–${formatVolume(75, s)}`,
        matches: (f) => f.minTankVolumeL > 40 && f.minTankVolumeL <= 75,
      },
      {
        id: "v200",
        label: (s) => `${volumeValue(75, s)}–${formatVolume(200, s)}`,
        matches: (f) => f.minTankVolumeL > 75 && f.minTankVolumeL <= 200,
      },
      {
        id: "v201",
        label: (s) => `${formatVolume(200, s)}+`,
        matches: (f) => f.minTankVolumeL > 200,
      },
    ],
  },
  {
    id: "price",
    title: "Price",
    options: (["$", "$$", "$$$"] as Fish["priceRange"][]).map((p) => ({
      id: p,
      label: lit(p),
      matches: (f) => f.priceRange === p,
    })),
  },
  {
    id: "origin",
    title: "Origin",
    options: ORIGINS.map((o) => ({
      id: o,
      label: lit(o),
      matches: (f) => f.origin === o,
    })),
  },
];

// A fish passes when, for every category that has selections, it matches at
// least one of them. Categories with no selection are ignored.
export function matchesFilters(fish: Fish, selected: SelectedFilters): boolean {
  return CATEGORIES.every((cat) => {
    const sel = selected[cat.id];
    if (!sel || sel.length === 0) return true;
    return cat.options.some((opt) => sel.includes(opt.id) && opt.matches(fish));
  });
}

// Total number of selected chips, for the "Filters (N)" badge.
export function countActiveFilters(selected: SelectedFilters): number {
  return Object.values(selected).reduce(
    (n, arr) => n + (arr ? arr.length : 0),
    0
  );
}

// Add/remove one option id within a category, returning a new SelectedFilters
// (categories that become empty are dropped so countActiveFilters stays right).
export function toggleFilter(
  selected: SelectedFilters,
  category: CategoryId,
  optionId: string
): SelectedFilters {
  const current = selected[category] ?? [];
  const next = current.includes(optionId)
    ? current.filter((id) => id !== optionId)
    : [...current, optionId];
  const result: SelectedFilters = { ...selected, [category]: next };
  if (next.length === 0) delete result[category];
  return result;
}
