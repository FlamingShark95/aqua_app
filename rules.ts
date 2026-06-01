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

// All warnings for a tank: predation between species, plus each species
// checked against the tank's own size/space/chemistry, plus a bioload guess.
// Comparisons stay in canonical metric; `system` only controls the unit text.
export function checkTank(tank: Tank, system: UnitSystem): string[] {
  const warnings: string[] = [];
  const groups = groupBySpecies(tank.stock);
  const unit = lengthUnit(system);

  // Predation: a predatory species big enough to swallow a tankmate.
  for (const { fish: predator } of groups) {
    if (predator.temperament !== "predatory") continue;
    for (const { fish: prey } of groups) {
      if (predator.id === prey.id) continue;
      if (predator.adultSizeCm >= prey.adultSizeCm * PREDATION_RATIO) {
        warnings.push(`${predator.commonName} may eat the ${prey.commonName}`);
      }
    }
  }

  // Per-species checks against this tank's properties.
  for (const { fish, count } of groups) {
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
