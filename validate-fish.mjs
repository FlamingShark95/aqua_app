// Validates fish.json against the Fish contract.
//
// The catalog lives in fish.json and is imported into fishData.ts via
// `fishData as unknown as Fish[]`. That cast means `tsc` no longer checks the
// data against the Fish type — it only catches raw JSON syntax errors. This
// script is the replacement gate: run it (and `tsc`) after any change to
// fish.json. Run with `npm run validate-fish` or `node validate-fish.mjs`.
//
// Dependency-free (Node built-ins only) to keep the project light.
import { readFileSync } from "node:fs";

const FILE = new URL("./fish.json", import.meta.url);

const REQUIRED_STRINGS = ["id", "commonName", "scientificName", "origin", "description"];
const REQUIRED_NUMBERS = [
  "adultSizeCm",
  "minTankVolumeL",
  "minGroupSize",
  "tempMinC",
  "tempMaxC",
  "phMin",
  "phMax",
];
const OPTIONAL_NUMBERS = [
  "adultSizeMinCm",
  "maxGroupSize",
  "lifeExpectancyYears",
  "lifeExpectancyMaxYears",
];
const OPTIONAL_STRINGS = ["behavior", "reproduction", "dimorphism"];
const ENUMS = {
  temperament: ["peaceful", "semi", "aggressive", "predatory"],
  diet: ["herbivore", "omnivore", "carnivore"],
  careLevel: ["beginner", "intermediate", "advanced"],
  rarity: ["common", "uncommon", "rare"],
  priceRange: ["$", "$$", "$$$"],
};
const OPTIONAL_ENUMS = {
  waterType: ["freshwater", "saltwater"],
  tankRegion: ["top", "middle", "bottom"],
};

let fish;
try {
  fish = JSON.parse(readFileSync(FILE, "utf8"));
} catch (err) {
  console.error(`fish.json is not valid JSON: ${err.message}`);
  process.exit(1);
}

const errors = [];
if (!Array.isArray(fish)) {
  console.error("fish.json must be a top-level array.");
  process.exit(1);
}

const seenIds = new Map();
fish.forEach((f, i) => {
  const where = `#${i} (${f && typeof f.id === "string" ? f.id : "no-id"})`;
  if (f === null || typeof f !== "object" || Array.isArray(f)) {
    errors.push(`${where}: not an object`);
    return;
  }

  for (const k of REQUIRED_STRINGS) {
    if (typeof f[k] !== "string" || f[k].trim() === "") {
      errors.push(`${where}: "${k}" must be a non-empty string`);
    }
  }
  for (const k of REQUIRED_NUMBERS) {
    if (typeof f[k] !== "number" || Number.isNaN(f[k])) {
      errors.push(`${where}: "${k}" must be a number`);
    }
  }
  for (const k of OPTIONAL_NUMBERS) {
    if (k in f && (typeof f[k] !== "number" || Number.isNaN(f[k]))) {
      errors.push(`${where}: optional "${k}" must be a number when present`);
    }
  }
  for (const k of OPTIONAL_STRINGS) {
    if (k in f && typeof f[k] !== "string") {
      errors.push(`${where}: optional "${k}" must be a string when present`);
    }
  }

  const fp = f.minFootprintCm;
  if (!fp || typeof fp !== "object" || typeof fp.length !== "number" || typeof fp.width !== "number") {
    errors.push(`${where}: "minFootprintCm" must be { length: number, width: number }`);
  }

  for (const [k, allowed] of Object.entries(ENUMS)) {
    if (!allowed.includes(f[k])) {
      errors.push(`${where}: "${k}" must be one of ${allowed.join(" | ")} (got ${JSON.stringify(f[k])})`);
    }
  }
  for (const [k, allowed] of Object.entries(OPTIONAL_ENUMS)) {
    if (k in f && !allowed.includes(f[k])) {
      errors.push(`${where}: optional "${k}" must be one of ${allowed.join(" | ")} (got ${JSON.stringify(f[k])})`);
    }
  }

  if ("images" in f) {
    if (!Array.isArray(f.images) || !f.images.every((im) => typeof im === "string")) {
      errors.push(`${where}: "images" in JSON must be an array of URL strings (bundled require() images belong in fishData.ts)`);
    }
  }

  if (typeof f.id === "string") {
    if (seenIds.has(f.id)) {
      errors.push(`${where}: duplicate id (also at #${seenIds.get(f.id)})`);
    } else {
      seenIds.set(f.id, i);
    }
  }
});

if (errors.length) {
  console.error(`fish.json validation FAILED — ${errors.length} problem(s):`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}

console.log(`fish.json OK: ${fish.length} entries, all valid.`);
