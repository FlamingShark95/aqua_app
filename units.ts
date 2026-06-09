// All tank/fish measurements are stored in canonical metric units (litres, cm,
// °C). These helpers convert to/from the user's chosen system at the edges:
// format* for display, *to-canonical for parsing user input back to metric.

export type UnitSystem = "metric" | "imperial";

const L_PER_GAL = 3.785411784;
const CM_PER_IN = 2.54;

function round(n: number, dp: number): number {
  const f = 10 ** dp;
  return Math.round(n * f) / f;
  // Note: `${round(25, 1)}` prints "25", not "25.0" — JS strips trailing zeros.
}

export function unitLabels(system: UnitSystem) {
  return system === "imperial"
    ? { volume: "gal", length: "in", temp: "°F" }
    : { volume: "L", length: "cm", temp: "°C" };
}

// --- Display formatting (metric value in, localized string out) ---

export function formatVolume(litres: number, system: UnitSystem): string {
  if (system === "imperial") return `${round(litres / L_PER_GAL, 0)} gal`;
  return `${round(litres, 0)} L`;
}

export function lengthValue(cm: number, system: UnitSystem): string {
  if (system === "imperial") return `${round(cm / CM_PER_IN, 1)}`;
  return `${round(cm, 0)}`;
}

export function lengthUnit(system: UnitSystem): string {
  return system === "imperial" ? "in" : "cm";
}

export function formatLength(cm: number, system: UnitSystem): string {
  return `${lengthValue(cm, system)} ${lengthUnit(system)}`;
}

export function formatLengthRange(minCm: number, maxCm: number, system: UnitSystem): string {
  return `${lengthValue(minCm, system)}–${lengthValue(maxCm, system)} ${lengthUnit(system)}`;
}

export function formatTemp(celsius: number, system: UnitSystem): string {
  if (system === "imperial") return `${round((celsius * 9) / 5 + 32, 0)}°F`;
  return `${round(celsius, 1)}°C`;
}

export function formatTempRange(
  minC: number,
  maxC: number,
  system: UnitSystem
): string {
  if (system === "imperial") {
    return `${round((minC * 9) / 5 + 32, 0)}–${round((maxC * 9) / 5 + 32, 0)}°F`;
  }
  return `${round(minC, 1)}–${round(maxC, 1)}°C`;
}

// Raw numeric value (no unit suffix) in the active system — for seeding inputs.
export function volumeValue(litres: number, system: UnitSystem): string {
  if (system === "imperial") return `${round(litres / L_PER_GAL, 1)}`;
  return `${round(litres, 1)}`;
}

export function tempValue(celsius: number, system: UnitSystem): string {
  if (system === "imperial") return `${round((celsius * 9) / 5 + 32, 1)}`;
  return `${round(celsius, 1)}`;
}

// --- Parsing user input (localized value in, canonical metric out) ---

// TextInput gives us strings; bad/empty input parses to 0.
export function parseNum(s: string): number {
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
}

export function volumeToLitres(value: number, system: UnitSystem): number {
  return system === "imperial" ? value * L_PER_GAL : value;
}

export function lengthToCm(value: number, system: UnitSystem): number {
  return system === "imperial" ? value * CM_PER_IN : value;
}

export function tempToCelsius(value: number, system: UnitSystem): number {
  return system === "imperial" ? ((value - 32) * 5) / 9 : value;
}
