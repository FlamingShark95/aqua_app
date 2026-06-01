import { Fish, Tank } from "./fishData";
import {
  formatLength,
  formatTemp,
  formatTempRange,
  formatVolume,
  lengthUnit,
  lengthValue,
  UnitSystem,
} from "./units";

export const PREDATION_RATIO = 3;

// Collapse a stock list into one entry per species, with a count.
export function groupBySpecies(stock: Fish[]): { fish: Fish; count: number }[] {
  return stock.reduce<{ fish: Fish; count: number }[]>((acc, fish) => {
    const existing = acc.find((g) => g.fish.id === fish.id);
    if (existing) existing.count += 1;
    else acc.push({ fish, count: 1 });
    return acc;
  }, []);
}

// Can `predator` swallow `prey`? Predatory and at least PREDATION_RATIO× its
// adult size. Shared by the whole-tank check and the add-time preview.
export function canEat(predator: Fish, prey: Fish): boolean {
  return (
    predator.temperament === "predatory" &&
    predator.adultSizeCm >= prey.adultSizeCm * PREDATION_RATIO
  );
}

// Warnings from one fish vs a tank's environment: water volume, floor
// footprint, temperature and pH. Count-independent — true no matter how many
// are kept. Comparisons stay in canonical metric; `system` only controls the
// unit text. Shared by checkTank and previewFishInTank.
export function fishEnvironmentWarnings(
  fish: Fish,
  tank: Tank,
  system: UnitSystem
): string[] {
  const warnings: string[] = [];
  const unit = lengthUnit(system);

  // Minimum water volume.
  if (fish.minTankVolumeL > tank.volumeL) {
    warnings.push(
      `${fish.commonName} needs at least ${formatVolume(
        fish.minTankVolumeL,
        system
      )} (tank is ${formatVolume(tank.volumeL, system)})`
    );
  }

  // Floor footprint — matters most for long, bottom-hugging fish.
  if (
    fish.minFootprintCm.length > tank.lengthCm ||
    fish.minFootprintCm.width > tank.widthCm
  ) {
    warnings.push(
      `${fish.commonName} needs a ${lengthValue(
        fish.minFootprintCm.length,
        system
      )}×${lengthValue(fish.minFootprintCm.width, system)} ${unit} footprint ` +
        `(tank is ${lengthValue(tank.lengthCm, system)}×${lengthValue(
          tank.widthCm,
          system
        )} ${unit})`
    );
  }

  // Temperature range.
  if (tank.tempC < fish.tempMinC || tank.tempC > fish.tempMaxC) {
    warnings.push(
      `${fish.commonName} prefers ${formatTempRange(
        fish.tempMinC,
        fish.tempMaxC,
        system
      )} (tank is ${formatTemp(tank.tempC, system)})`
    );
  }

  // pH range (pH is unitless, no conversion).
  if (tank.ph < fish.phMin || tank.ph > fish.phMax) {
    warnings.push(
      `${fish.commonName} prefers pH ${fish.phMin}–${fish.phMax} (tank is pH ${tank.ph})`
    );
  }

  return warnings;
}

// All warnings for a tank: predation between species, plus each species
// checked against the tank's own size/space/chemistry, plus group size and a
// bioload guess. Comparisons stay in canonical metric; `system` only controls
// the unit text.
export function checkTank(tank: Tank, system: UnitSystem): string[] {
  const warnings: string[] = [];
  const groups = groupBySpecies(tank.stock);

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

  // Bioload: a rough "1 cm of adult fish per litre" rule of thumb.
  const totalAdultCm = tank.stock.reduce((sum, f) => sum + f.adultSizeCm, 0);
  if (totalAdultCm > tank.volumeL) {
    warnings.push(
      `Possibly overstocked: ${formatLength(
        totalAdultCm,
        system
      )} of adult fish for ${formatVolume(tank.volumeL, system)}`
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
  system: UnitSystem
): string[] {
  const warnings = fishEnvironmentWarnings(fish, tank, system);
  for (const { fish: other } of groupBySpecies(tank.stock)) {
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
