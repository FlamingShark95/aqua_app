// Validates plants.json against the Plant contract, the same way
// validate-fish.mjs guards fish.json (the `as unknown` cast in plantData.ts
// means tsc doesn't check the data). Run with `npm run validate-plants`.
// Dependency-free (Node built-ins only).
import { readFileSync } from "node:fs";

const FILE = new URL("./plants.json", import.meta.url);

const REQUIRED_STRINGS = ["id", "commonName", "scientificName", "description"];
const OPTIONAL_STRINGS = ["origin"];
const REQUIRED_NUMBERS = ["heightCm", "tempMinC", "tempMaxC", "phMin", "phMax"];
const ENUMS = {
  type: ["stem", "rosette", "rhizome", "moss", "floating", "carpet", "bulb"],
  placement: ["foreground", "midground", "background", "floating"],
  growthRate: ["slow", "medium", "fast"],
  light: ["low", "medium", "high"],
  co2: ["none", "optional", "required"],
  careLevel: ["beginner", "intermediate", "advanced"],
  priceRange: ["$", "$$", "$$$"],
};

let plants;
try {
  plants = JSON.parse(readFileSync(FILE, "utf8"));
} catch (err) {
  console.error(`plants.json is not valid JSON: ${err.message}`);
  process.exit(1);
}

if (!Array.isArray(plants)) {
  console.error("plants.json must be a top-level array.");
  process.exit(1);
}

const errors = [];
const seenIds = new Map();
plants.forEach((p, i) => {
  const where = `#${i} (${p && typeof p.id === "string" ? p.id : "no-id"})`;
  if (p === null || typeof p !== "object" || Array.isArray(p)) {
    errors.push(`${where}: not an object`);
    return;
  }

  for (const k of REQUIRED_STRINGS) {
    if (typeof p[k] !== "string" || p[k].trim() === "") {
      errors.push(`${where}: "${k}" must be a non-empty string`);
    }
  }
  for (const k of OPTIONAL_STRINGS) {
    if (k in p && typeof p[k] !== "string") {
      errors.push(`${where}: optional "${k}" must be a string when present`);
    }
  }
  for (const k of REQUIRED_NUMBERS) {
    if (typeof p[k] !== "number" || Number.isNaN(p[k])) {
      errors.push(`${where}: "${k}" must be a number`);
    }
  }
  for (const [k, allowed] of Object.entries(ENUMS)) {
    if (!allowed.includes(p[k])) {
      errors.push(
        `${where}: "${k}" must be one of ${allowed.join(" | ")} (got ${JSON.stringify(p[k])})`
      );
    }
  }
  if ("images" in p) {
    if (!Array.isArray(p.images) || !p.images.every((im) => typeof im === "string")) {
      errors.push(`${where}: "images" in JSON must be an array of URL strings`);
    }
  }

  if (typeof p.id === "string") {
    if (seenIds.has(p.id)) {
      errors.push(`${where}: duplicate id (also at #${seenIds.get(p.id)})`);
    } else {
      seenIds.set(p.id, i);
    }
  }
});

if (errors.length) {
  console.error(`plants.json validation FAILED — ${errors.length} problem(s):`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}

console.log(`plants.json OK: ${plants.length} entries, all valid.`);
