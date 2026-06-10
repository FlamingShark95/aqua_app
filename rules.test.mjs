// Tests for the compatibility rules engine (rules.ts). Dependency-free, like
// validate-fish.mjs: plain Node test runner against the CJS build emitted by
// `tsc -p tsconfig.test.json` (rules.ts itself only type-imports fishData, so
// the build loads under Node without React Native or bundled assets).
// Run with `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const {
  PREDATION_RATIO,
  canEat,
  resolveStock,
  environmentIssues,
  fishEnvironmentWarnings,
  fishBioloadL,
  tankBioloadL,
  checkTank,
  previewFishInTank,
  scoreFishForTank,
} = require("./.test-dist/rules.js");

// --- fixtures ----------------------------------------------------------

const makeFish = (overrides = {}) => ({
  id: "tetra",
  commonName: "Tetra",
  scientificName: "Tetra testus",
  adultSizeCm: 5,
  minTankVolumeL: 40,
  minFootprintCm: { length: 50, width: 25 },
  temperament: "peaceful",
  diet: "omnivore",
  minGroupSize: 1,
  tempMinC: 22,
  tempMaxC: 28,
  phMin: 6,
  phMax: 8,
  origin: "Test basin",
  careLevel: "beginner",
  rarity: "common",
  priceRange: "$",
  description: "test fish",
  ...overrides,
});

const makeTank = (overrides = {}) => ({
  id: "tank-1",
  name: "Test tank",
  volumeL: 100,
  lengthCm: 80,
  widthCm: 35,
  tempC: 25,
  ph: 7,
  stock: [],
  ...overrides,
});

const catalogOf = (...fish) => new Map(fish.map((f) => [f.id, f]));

// --- canEat ------------------------------------------------------------

test("canEat: predatory fish at exactly the ratio can eat", () => {
  const prey = makeFish({ id: "prey", adultSizeCm: 5 });
  const predator = makeFish({
    id: "pred",
    temperament: "predatory",
    adultSizeCm: 5 * PREDATION_RATIO,
  });
  assert.equal(canEat(predator, prey), true);
});

test("canEat: predatory fish just under the ratio cannot eat", () => {
  const prey = makeFish({ id: "prey", adultSizeCm: 5 });
  const predator = makeFish({
    id: "pred",
    temperament: "predatory",
    adultSizeCm: 5 * PREDATION_RATIO - 0.1,
  });
  assert.equal(canEat(predator, prey), false);
});

test("canEat: non-predatory fish never eats, regardless of size", () => {
  const prey = makeFish({ id: "prey", adultSizeCm: 2 });
  const big = makeFish({ id: "big", temperament: "peaceful", adultSizeCm: 60 });
  assert.equal(canEat(big, prey), false);
});

// --- resolveStock ------------------------------------------------------

test("resolveStock: resolves known ids with counts, skips unknown ids", () => {
  const tetra = makeFish({ id: "tetra" });
  const resolved = resolveStock(
    [
      { speciesId: "tetra", count: 6 },
      { speciesId: "gone-from-catalog", count: 3 },
    ],
    catalogOf(tetra)
  );
  assert.equal(resolved.length, 1);
  assert.equal(resolved[0].fish.id, "tetra");
  assert.equal(resolved[0].count, 6);
});

// --- fishEnvironmentWarnings -------------------------------------------

test("environment: fish that fits produces no warnings", () => {
  const warnings = fishEnvironmentWarnings(makeFish(), makeTank(), "metric");
  assert.deepEqual(warnings, []);
});

test("environment: volume warning when tank is too small", () => {
  const fish = makeFish({ minTankVolumeL: 150 });
  const warnings = fishEnvironmentWarnings(fish, makeTank({ volumeL: 100 }), "metric");
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /needs at least/);
});

test("environment: footprint warning when tank floor is too short", () => {
  const fish = makeFish({ minFootprintCm: { length: 120, width: 25 } });
  const warnings = fishEnvironmentWarnings(fish, makeTank({ lengthCm: 80 }), "metric");
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /footprint/);
});

test("environment: temperature warning outside range, none at the boundary", () => {
  const fish = makeFish({ tempMinC: 26, tempMaxC: 30 });
  const tooCold = fishEnvironmentWarnings(fish, makeTank({ tempC: 25 }), "metric");
  assert.equal(tooCold.length, 1);
  assert.match(tooCold[0], /prefers 26–30°C/);

  const atBoundary = fishEnvironmentWarnings(fish, makeTank({ tempC: 26 }), "metric");
  assert.deepEqual(atBoundary, []);
});

test("environment: pH warning outside range", () => {
  const fish = makeFish({ phMin: 6, phMax: 6.5 });
  const warnings = fishEnvironmentWarnings(fish, makeTank({ ph: 7 }), "metric");
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /prefers pH 6–6.5/);
});

// --- checkTank ---------------------------------------------------------

test("checkTank: empty tank has no warnings", () => {
  assert.deepEqual(checkTank(makeTank(), "metric", catalogOf()), []);
});

test("checkTank: group-size warning below minGroupSize, none at it", () => {
  const schooler = makeFish({ id: "schooler", minGroupSize: 6 });
  const catalog = catalogOf(schooler);

  const under = checkTank(
    makeTank({ stock: [{ speciesId: "schooler", count: 3 }] }),
    "metric",
    catalog
  );
  assert.equal(under.length, 1);
  assert.match(under[0], /groups of 6\+ \(you have 3\)/);

  const at = checkTank(
    makeTank({ stock: [{ speciesId: "schooler", count: 6 }] }),
    "metric",
    catalog
  );
  assert.deepEqual(at, []);
});

test("checkTank: bioload counts every individual (effective litres vs volume)", () => {
  // A 5 cm omnivore is calibrated to ~5 L, matching the old 1 cm/L rule.
  const fish = makeFish({ id: "tetra", adultSizeCm: 5, diet: "omnivore" });
  const catalog = catalogOf(fish);
  const tank = (count) =>
    makeTank({ volumeL: 80, stock: [{ speciesId: "tetra", count }] });

  // 15 × ~5 L = ~75 L in 80 L: fine.
  assert.deepEqual(checkTank(tank(15), "metric", catalog), []);
  // 17 × ~5 L = ~85 L in 80 L: overstocked.
  const warnings = checkTank(tank(17), "metric", catalog);
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /overstocked/);
});

// --- bioload model -------------------------------------------------------

test("bioload: a 5 cm omnivore is calibrated to ~5 L", () => {
  const small = fishBioloadL(makeFish({ adultSizeCm: 5, diet: "omnivore" }));
  assert.ok(Math.abs(small - 5) < 1e-9, `expected ~5, got ${small}`);
});

test("bioload: grows superlinearly with length", () => {
  const small = fishBioloadL(makeFish({ adultSizeCm: 5 }));
  const big = fishBioloadL(makeFish({ adultSizeCm: 30 }));
  // 6× the length must cost far more than 6× the load (it's ~25×).
  assert.ok(big > 6 * small, `expected ${big} >> 6 × ${small}`);
});

test("bioload: diet modifier orders carnivore > herbivore > omnivore", () => {
  const carn = fishBioloadL(makeFish({ diet: "carnivore" }));
  const herb = fishBioloadL(makeFish({ diet: "herbivore" }));
  const omni = fishBioloadL(makeFish({ diet: "omnivore" }));
  assert.ok(carn > herb && herb > omni);
});

test("checkTank: one big carnivore overstocks a 100 L tank", () => {
  const oscar = makeFish({
    id: "oscar",
    commonName: "Oscar",
    adultSizeCm: 30,
    diet: "carnivore",
    minTankVolumeL: 100,
    tempMinC: 22,
    tempMaxC: 28,
  });
  const catalog = catalogOf(oscar);
  const tank = makeTank({
    volumeL: 100,
    stock: [{ speciesId: "oscar", count: 1 }],
  });
  const warnings = checkTank(tank, "metric", catalog);
  assert.equal(warnings.filter((w) => /overstocked/.test(w)).length, 1);
});

// --- environmentIssues ---------------------------------------------------

test("environmentIssues: a code per failing check, empty when all pass", () => {
  const misfit = makeFish({
    minTankVolumeL: 200,
    minFootprintCm: { length: 200, width: 25 },
    tempMinC: 26,
    tempMaxC: 30,
    phMin: 8,
    phMax: 9,
  });
  const tank = makeTank({ volumeL: 100, lengthCm: 80, tempC: 24, ph: 7 });
  assert.deepEqual(environmentIssues(misfit, tank), [
    "volume",
    "footprint",
    "temp",
    "ph",
  ]);
  assert.deepEqual(environmentIssues(makeFish(), makeTank()), []);
});

// --- scoreFishForTank ----------------------------------------------------

test("score: tier comes from the number of hard problems", () => {
  const tank = makeTank({ volumeL: 100 });
  assert.equal(scoreFishForTank(makeFish(), tank, catalogOf()).tier, "great");
  assert.equal(
    scoreFishForTank(makeFish({ minTankVolumeL: 200 }), tank, catalogOf())
      .tier,
    "workable"
  );
  assert.equal(
    scoreFishForTank(
      makeFish({ minTankVolumeL: 200, phMin: 8, phMax: 9 }),
      tank,
      catalogOf()
    ).tier,
    "poor"
  );
});

test("score: predation conflicts count as problems", () => {
  const prey = makeFish({ id: "prey", adultSizeCm: 4 });
  const hunter = makeFish({
    id: "hunter",
    temperament: "predatory",
    adultSizeCm: 30,
    minTankVolumeL: 40,
  });
  const tank = makeTank({
    volumeL: 400,
    stock: [{ speciesId: "prey", count: 5 }],
  });
  const { tier } = scoreFishForTank(hunter, tank, catalogOf(prey, hunter));
  assert.notEqual(tier, "great");
});

test("score: an owned, incomplete school outranks an equivalent newcomer", () => {
  const schooler = makeFish({ id: "schooler", minGroupSize: 6 });
  const newcomer = makeFish({ id: "newcomer", commonName: "Newcomer" });
  const catalog = catalogOf(schooler, newcomer);
  const tank = makeTank({
    volumeL: 200,
    stock: [{ speciesId: "schooler", count: 3 }],
  });
  const a = scoreFishForTank(schooler, tank, catalog);
  const b = scoreFishForTank(newcomer, tank, catalog);
  assert.equal(a.tier, "great");
  assert.equal(b.tier, "great");
  assert.ok(a.score > b.score, `expected ${a.score} > ${b.score}`);
});

test("score: region complement applies only when the tank has stock", () => {
  const bottom = makeFish({ id: "cory", tankRegion: "bottom" });
  const mid = makeFish({ id: "mid", tankRegion: "middle" });
  const catalog = catalogOf(bottom, mid);

  // Stocked tank with the middle occupied: the bottom-dweller candidate gets
  // the +15 region bonus over another middle fish, all else equal.
  const stocked = makeTank({
    volumeL: 200,
    stock: [{ speciesId: "mid", count: 6 }],
  });
  const bottomScore = scoreFishForTank(bottom, stocked, catalog).score;
  const midScore = scoreFishForTank(mid, stocked, catalog).score;
  assert.equal(bottomScore - midScore, 15);

  // Empty tank: no bonus, the two score identically.
  const empty = makeTank({ volumeL: 200 });
  assert.equal(
    scoreFishForTank(bottom, empty, catalog).score,
    scoreFishForTank(mid, empty, catalog).score
  );
});

test("checkTank: predation warning between species, not within one", () => {
  const prey = makeFish({ id: "prey", adultSizeCm: 4 });
  const predator = makeFish({
    id: "pred",
    commonName: "Big pike",
    temperament: "predatory",
    adultSizeCm: 30,
  });
  const catalog = catalogOf(prey, predator);

  const mixed = checkTank(
    makeTank({
      stock: [
        { speciesId: "prey", count: 5 },
        { speciesId: "pred", count: 1 },
      ],
    }),
    "metric",
    catalog
  );
  assert.equal(mixed.filter((w) => /may eat the/.test(w)).length, 1);
  assert.match(mixed[0], /Big pike may eat the Tetra/);

  // A predatory species alone never warns about eating itself.
  const alone = checkTank(
    makeTank({ stock: [{ speciesId: "pred", count: 2 }] }),
    "metric",
    catalog
  );
  assert.deepEqual(alone.filter((w) => /may eat/.test(w)), []);
});

// --- previewFishInTank ---------------------------------------------------

test("preview: empty result means good fit", () => {
  const fish = makeFish();
  assert.deepEqual(
    previewFishInTank(fish, makeTank(), "metric", catalogOf(fish)),
    []
  );
});

test("preview: predation reported in both directions", () => {
  const small = makeFish({ id: "small", commonName: "Small fry", adultSizeCm: 4 });
  const hunter = makeFish({
    id: "hunter",
    commonName: "Hunter",
    temperament: "predatory",
    adultSizeCm: 30,
  });
  const catalog = catalogOf(small, hunter);

  // Adding the predator to a tank of small fish.
  const addingHunter = previewFishInTank(
    hunter,
    makeTank({ stock: [{ speciesId: "small", count: 5 }] }),
    "metric",
    catalog
  );
  assert.match(addingHunter[0], /Hunter may eat the Small fry/);

  // Adding a small fish to the predator's tank.
  const addingSmall = previewFishInTank(
    small,
    makeTank({ stock: [{ speciesId: "hunter", count: 1 }] }),
    "metric",
    catalog
  );
  assert.match(addingSmall[0], /Hunter may eat the Small fry/);
});

test("preview: ignores fish of the same species already in the tank", () => {
  const cannibal = makeFish({
    id: "cannibal",
    temperament: "predatory",
    adultSizeCm: 30,
  });
  const warnings = previewFishInTank(
    cannibal,
    makeTank({ stock: [{ speciesId: "cannibal", count: 1 }] }),
    "metric",
    catalogOf(cannibal)
  );
  assert.deepEqual(warnings, []);
});

test("preview: count-independent — no group-size or bioload warnings", () => {
  const schooler = makeFish({ id: "schooler", minGroupSize: 6, adultSizeCm: 5 });
  const warnings = previewFishInTank(
    schooler,
    makeTank({ volumeL: 10, stock: [] }),
    "metric",
    catalogOf(schooler)
  );
  // Volume warning fires (needs 40 L, tank is 10 L) but nothing about groups.
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /needs at least/);
});
