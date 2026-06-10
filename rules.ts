// Type-only import keeps this module loadable outside React Native (the tests
// run it under plain Node) — fishData's runtime side pulls in bundled assets.
// Callers pass the catalog (normally FISH_BY_ID) explicitly.
import type { Fish, StockEntry, Tank } from "./fishData";
import {
  formatTemp,
  formatTempRange,
  formatVolume,
  lengthUnit,
  lengthValue,
  UnitSystem,
} from "./units";

export const PREDATION_RATIO = 3;

// Resolve stock entries against the catalog. Entries whose species id is no
// longer in the catalog are skipped silently (the tank keeps the entry, the
// UI and checks just can't say anything about it).
export function resolveStock(
  stock: StockEntry[],
  catalog: ReadonlyMap<string, Fish>
): { fish: Fish; count: number }[] {
  const resolved: { fish: Fish; count: number }[] = [];
  for (const entry of stock) {
    const fish = catalog.get(entry.speciesId);
    if (fish) resolved.push({ fish, count: entry.count });
  }
  return resolved;
}

// Can `predator` swallow `prey`? Predatory and at least PREDATION_RATIO× its
// adult size. Shared by the whole-tank check and the add-time preview.
export function canEat(predator: Fish, prey: Fish): boolean {
  return (
    predator.temperament === "predatory" &&
    predator.adultSizeCm >= prey.adultSizeCm * PREDATION_RATIO
  );
}

// One fish vs a tank's environment: water volume, floor footprint,
// temperature and pH. Count-independent — true no matter how many are kept.
// Comparisons stay in canonical metric. This is the single source of truth
// for the comparisons; fishEnvironmentWarnings formats it for the UI and
// scoreFishForTank counts it.
export type IssueCode = "volume" | "footprint" | "temp" | "ph";

export function environmentIssues(fish: Fish, tank: Tank): IssueCode[] {
  const issues: IssueCode[] = [];
  if (fish.minTankVolumeL > tank.volumeL) issues.push("volume");
  if (
    fish.minFootprintCm.length > tank.lengthCm ||
    fish.minFootprintCm.width > tank.widthCm
  ) {
    issues.push("footprint");
  }
  if (tank.tempC < fish.tempMinC || tank.tempC > fish.tempMaxC) {
    issues.push("temp");
  }
  if (tank.ph < fish.phMin || tank.ph > fish.phMax) issues.push("ph");
  return issues;
}

// The same checks as user-facing warning strings; `system` only controls the
// unit text. Shared by checkTank and previewFishInTank.
export function fishEnvironmentWarnings(
  fish: Fish,
  tank: Tank,
  system: UnitSystem
): string[] {
  const unit = lengthUnit(system);
  return environmentIssues(fish, tank).map((issue) => {
    switch (issue) {
      case "volume":
        return `${fish.commonName} needs at least ${formatVolume(
          fish.minTankVolumeL,
          system
        )} (tank is ${formatVolume(tank.volumeL, system)})`;
      case "footprint":
        return (
          `${fish.commonName} needs a ${lengthValue(
            fish.minFootprintCm.length,
            system
          )}×${lengthValue(fish.minFootprintCm.width, system)} ${unit} footprint ` +
          `(tank is ${lengthValue(tank.lengthCm, system)}×${lengthValue(
            tank.widthCm,
            system
          )} ${unit})`
        );
      case "temp":
        return `${fish.commonName} prefers ${formatTempRange(
          fish.tempMinC,
          fish.tempMaxC,
          system
        )} (tank is ${formatTemp(tank.tempC, system)})`;
      case "ph":
        return `${fish.commonName} prefers pH ${fish.phMin}–${fish.phMax} (tank is pH ${tank.ph})`;
    }
  });
}

// --- Bioload -------------------------------------------------------------
// Waste output scales superlinearly with body length (mass goes with the
// cube); 1.8 is a softer exponent so mid-size community fish aren't crushed.
// The divisor calibrates a 5 cm omnivore to 5 L — matching the old
// "1 cm per litre" rule for small fish — while one 30 cm carnivore now costs
// ~163 L instead of 30. Messier diets cost extra.
const BIOLOAD_EXPONENT = 1.8;
const BIOLOAD_CALIBRATION = 5 ** (BIOLOAD_EXPONENT - 1);
const DIET_FACTOR: Record<Fish["diet"], number> = {
  carnivore: 1.3,
  herbivore: 1.15,
  omnivore: 1,
};

// Effective bioload of one adult fish, in litres of tank volume it "uses".
export function fishBioloadL(fish: Fish): number {
  return (
    (fish.adultSizeCm ** BIOLOAD_EXPONENT / BIOLOAD_CALIBRATION) *
    DIET_FACTOR[fish.diet]
  );
}

export function tankBioloadL(groups: { fish: Fish; count: number }[]): number {
  return groups.reduce((sum, g) => sum + fishBioloadL(g.fish) * g.count, 0);
}

// All warnings for a tank: predation between species, plus each species
// checked against the tank's own size/space/chemistry, plus group size and a
// bioload guess. Comparisons stay in canonical metric; `system` only controls
// the unit text.
export function checkTank(
  tank: Tank,
  system: UnitSystem,
  catalog: ReadonlyMap<string, Fish>
): string[] {
  const warnings: string[] = [];
  const groups = resolveStock(tank.stock, catalog);

  // Predation: a predatory species big enough to swallow a tankmate.
  for (const { fish: predator } of groups) {
    if (predator.temperament !== "predatory") continue;
    for (const { fish: prey } of groups) {
      if (predator.id === prey.id) continue;
      if (canEat(predator, prey)) {
        warnings.push(`${predator.commonName} may eat the ${prey.commonName}`);
      }
    }
  }

  // Per-species checks against this tank's properties.
  for (const { fish, count } of groups) {
    // Environment fit (volume, footprint, temperature, pH).
    warnings.push(...fishEnvironmentWarnings(fish, tank, system));

    // Schooling group size.
    if (count < fish.minGroupSize) {
      warnings.push(
        `${fish.commonName} is happiest in groups of ${fish.minGroupSize}+ (you have ${count})`
      );
    }
  }

  // Bioload: effective litres used vs litres available.
  const bioload = tankBioloadL(groups);
  if (bioload > tank.volumeL) {
    warnings.push(
      `Possibly overstocked: bioload is about ${formatVolume(
        bioload,
        system
      )} for a ${formatVolume(tank.volumeL, system)} tank`
    );
  }

  return warnings;
}

// What adding this fish to this tank would mean, for the "Add to a tank" list
// on the fish detail screen: environment fit plus predation in both directions
// against the fish already living there. Count-independent (no group-size or
// bioload checks), so the verdict stays stable as the user taps +/-. Empty
// means "good fit". Advisory only — it never blocks adding.
export function previewFishInTank(
  fish: Fish,
  tank: Tank,
  system: UnitSystem,
  catalog: ReadonlyMap<string, Fish>
): string[] {
  const warnings = fishEnvironmentWarnings(fish, tank, system);
  for (const { fish: other } of resolveStock(tank.stock, catalog)) {
    if (other.id === fish.id) continue;
    if (canEat(fish, other)) {
      warnings.push(`${fish.commonName} may eat the ${other.commonName}`);
    }
    if (canEat(other, fish)) {
      warnings.push(`${other.commonName} may eat the ${fish.commonName}`);
    }
  }
  return warnings;
}

// How well a fish suits a tank, for the "Best fit" sort. Tier comes from hard
// problems (environment misfits + predation either way): 0 → great, 1 →
// workable, 2+ → poor. Score orders fish within a tier; bigger is better.
export type FitTier = "great" | "workable" | "poor";

export function scoreFishForTank(
  fish: Fish,
  tank: Tank,
  catalog: ReadonlyMap<string, Fish>
): { score: number; tier: FitTier } {
  const groups = resolveStock(tank.stock, catalog);

  let problems = environmentIssues(fish, tank).length;
  for (const { fish: other } of groups) {
    if (other.id === fish.id) continue;
    if (canEat(fish, other)) problems += 1;
    if (canEat(other, fish)) problems += 1;
  }
  const tier: FitTier =
    problems === 0 ? "great" : problems === 1 ? "workable" : "poor";

  let score = 0;
  const owned = groups.find((g) => g.fish.id === fish.id);

  // "Finish your school": already kept, but below its minimum group size.
  if (problems === 0 && owned && owned.count < fish.minGroupSize) {
    score += 50;
  }

  // Bioload headroom: how much of the (remaining) minimum group fits in the
  // capacity left? Full marks when the whole group fits, scaled down to 0.
  const remaining = tank.volumeL - tankBioloadL(groups);
  const missingCount = Math.max(fish.minGroupSize - (owned?.count ?? 0), 1);
  const groupCost = fishBioloadL(fish) * missingCount;
  score += 30 * Math.max(0, Math.min(1, remaining / groupCost));

  // Region complement: fills a level of the tank nothing else occupies.
  if (
    groups.length > 0 &&
    fish.tankRegion &&
    !groups.some((g) => g.fish.tankRegion === fish.tankRegion)
  ) {
    score += 15;
  }

  // Temperament margin — only meaningful once there are tankmates.
  if (groups.length > 0) {
    if (fish.temperament === "peaceful") score += 10;
    else if (fish.temperament === "semi") score += 5;
  }

  // Beginner-friendliness.
  if (fish.careLevel === "beginner") score += 6;
  else if (fish.careLevel === "intermediate") score += 3;

  return { score, tier };
}
