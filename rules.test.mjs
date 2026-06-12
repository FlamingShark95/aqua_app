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
  resolvePlants,
  plantCreditL,
  tankPlantCreditL,
  netBioloadL,
  plantIssues,
  plantWarnings,
  scorePlantForTank,
  PLANT_CREDIT_CAP,
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
  lightLevel: "medium",
  stock: [],
  plants: [],
  ...overrides,
});

const makePlant = (overrides = {}) => ({
  id: "test-plant",
  commonName: "Test plant",
  scientificName: "Planta testa",
  type: "stem",
  placement: "background",
  heightCm: 20,
  growthRate: "medium",
  light: "medium",
  co2: "none",
  tempMinC: 20,
  tempMaxC: 28,
  phMin: 6,
  phMax: 8,
  careLevel: "beginner",
  priceRange: "$",
  description: "test plant",
  ...overrides,
});

const catalogOf = (...fish) => new Map(fish.map((f) => [f.id, f]));
const plantCatalogOf = (...plants) => new Map(plants.map((p) => [p.id, p]));

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
  assert.deepEqual(checkTank(makeTank(), "metric", catalogOf(), plantCatalogOf()), []);
});

test("checkTank: group-size warning below minGroupSize, none at it", () => {
  const schooler = makeFish({ id: "schooler", minGroupSize: 6 });
  const catalog = catalogOf(schooler);

  const under = checkTank(
    makeTank({ stock: [{ speciesId: "schooler", count: 3 }] }),
    "metric",
    catalog,
    plantCatalogOf()
  );
  assert.equal(under.length, 1);
  assert.match(under[0], /groups of 6\+ \(you have 3\)/);

  const at = checkTank(
    makeTank({ stock: [{ speciesId: "schooler", count: 6 }] }),
    "metric",
    catalog,
    plantCatalogOf()
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
  assert.deepEqual(checkTank(tank(15), "metric", catalog, plantCatalogOf()), []);
  // 17 × ~5 L = ~85 L in 80 L: overstocked.
  const warnings = checkTank(tank(17), "metric", catalog, plantCatalogOf());
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
  const warnings = checkTank(tank, "metric", catalog, plantCatalogOf());
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

// --- plants ----------------------------------------------------------------

test("plantCreditL: height × growth factor", () => {
  // 40 cm medium grower → 4 L; 60 cm fast → 12 L; 20 cm slow → 1 L.
  assert.equal(plantCreditL(makePlant({ heightCm: 40, growthRate: "medium" })), 4);
  assert.equal(plantCreditL(makePlant({ heightCm: 60, growthRate: "fast" })), 12);
  assert.equal(plantCreditL(makePlant({ heightCm: 20, growthRate: "slow" })), 1);
});

test("tankPlantCreditL: total credit caps at 25% of tank volume", () => {
  const big = makePlant({ heightCm: 60, growthRate: "fast" }); // 12 L each
  const groups = [{ plant: big, count: 10 }]; // 120 L raw credit
  assert.equal(tankPlantCreditL(groups, 100), PLANT_CREDIT_CAP * 100);
  // Under the cap, the raw sum applies.
  assert.equal(tankPlantCreditL([{ plant: big, count: 2 }], 100), 24);
});

test("netBioloadL: plants reduce fish load, floored at zero", () => {
  const fish = makeFish({ adultSizeCm: 5, diet: "omnivore" }); // ~5 L each
  const plant = makePlant({ heightCm: 60, growthRate: "fast" }); // 12 L credit
  const fishGroups = [{ fish, count: 4 }]; // ~20 L
  // 20 − 12 = ~8 L.
  const net = netBioloadL(fishGroups, [{ plant, count: 1 }], 100);
  assert.ok(Math.abs(net - 8) < 1e-9, `expected ~8, got ${net}`);
  // Credit larger than the load floors at 0 (cap: 25 L on a 100 L tank).
  assert.equal(netBioloadL(fishGroups, [{ plant, count: 3 }], 100), 0);
});

test("resolvePlants: resolves counts, skips unknown ids", () => {
  const plant = makePlant({ id: "anubias" });
  const resolved = resolvePlants(
    [
      { plantId: "anubias", count: 3 },
      { plantId: "gone", count: 1 },
    ],
    plantCatalogOf(plant)
  );
  assert.equal(resolved.length, 1);
  assert.equal(resolved[0].count, 3);
});

test("plantIssues: light issue only when the plant needs more than the tank", () => {
  const lowTank = makeTank({ lightLevel: "low" });
  const highTank = makeTank({ lightLevel: "high" });
  assert.deepEqual(plantIssues(makePlant({ light: "high" }), lowTank), ["light"]);
  assert.deepEqual(plantIssues(makePlant({ light: "low" }), highTank), []);
  assert.deepEqual(plantIssues(makePlant({ light: "medium" }), makeTank()), []);
});

test("plantIssues: temp and pH ranges", () => {
  const coldTank = makeTank({ tempC: 15 });
  assert.deepEqual(plantIssues(makePlant({ tempMinC: 20 }), coldTank), ["temp"]);
  const acidTank = makeTank({ ph: 5 });
  assert.deepEqual(plantIssues(makePlant({ phMin: 6 }), acidTank), ["ph"]);
});

test("plantIssues: CO₂-required plants flag without tank CO₂; none/optional never", () => {
  const tank = makeTank();
  assert.deepEqual(plantIssues(makePlant({ co2: "required" }), tank), ["co2"]);
  assert.deepEqual(plantIssues(makePlant({ co2: "optional" }), tank), []);
  assert.deepEqual(plantIssues(makePlant({ co2: "none" }), tank), []);
});

test("plantIssues: a CO₂ tank clears the requirement for required plants", () => {
  const co2Tank = makeTank({ co2: true });
  assert.deepEqual(plantIssues(makePlant({ co2: "required" }), co2Tank), []);
  assert.deepEqual(plantIssues(makePlant({ co2: "optional" }), co2Tank), []);
  assert.deepEqual(plantIssues(makePlant({ co2: "none" }), co2Tank), []);
});

test("plantWarnings: CO₂ requirement produces an added-CO₂ message", () => {
  const w = plantWarnings(
    makePlant({ commonName: "Carpet", co2: "required" }),
    makeTank(),
    "metric"
  );
  assert.equal(w.length, 1);
  assert.match(w[0], /added CO₂/);
});

test("checkTank: plant warnings and plant-adjusted bioload", () => {
  const fish = makeFish({ id: "tetra", adultSizeCm: 5, diet: "omnivore" });
  const demanding = makePlant({ id: "carpet", light: "high", heightCm: 60, growthRate: "fast" });
  const catalog = catalogOf(fish);
  const plantCatalog = plantCatalogOf(demanding);

  // 17 tetras in 80 L overstocks bare (≈85 L)…
  const bare = makeTank({
    volumeL: 80,
    stock: [{ speciesId: "tetra", count: 17 }],
  });
  assert.match(
    checkTank(bare, "metric", catalog, plantCatalogOf())[0],
    /overstocked/
  );

  // …but one fast 60 cm plant credits 12 L → ~73 L, under the limit. The
  // high-light plant in a medium-light tank warns instead.
  const planted = makeTank({
    volumeL: 80,
    stock: [{ speciesId: "tetra", count: 17 }],
    plants: [{ plantId: "carpet", count: 1 }],
  });
  const warnings = checkTank(planted, "metric", catalog, plantCatalog);
  assert.equal(warnings.filter((w) => /overstocked/.test(w)).length, 0);
  assert.equal(warnings.filter((w) => /needs high light/.test(w)).length, 1);
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
    catalog,
    plantCatalogOf()
  );
  assert.equal(mixed.filter((w) => /may eat the/.test(w)).length, 1);
  assert.match(mixed[0], /Big pike may eat the Tetra/);

  // A predatory species alone never warns about eating itself.
  const alone = checkTank(
    makeTank({ stock: [{ speciesId: "pred", count: 2 }] }),
    "metric",
    catalog,
    plantCatalogOf()
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
    catalog,
    plantCatalogOf()
  );
  assert.match(addingHunter[0], /Hunter may eat the Small fry/);

  // Adding a small fish to the predator's tank.
  const addingSmall = previewFishInTank(
    small,
    makeTank({ stock: [{ speciesId: "hunter", count: 1 }] }),
    "metric",
    catalog,
    plantCatalogOf()
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

// --- plantWarnings -----------------------------------------------------

test("plantWarnings: no issues yields no warnings", () => {
  assert.deepEqual(plantWarnings(makePlant(), makeTank(), "metric"), []);
});

test("plantWarnings: one message per issue, naming the plant", () => {
  const lowTank = makeTank({ lightLevel: "low" });
  const w = plantWarnings(
    makePlant({ commonName: "Demanding stem", light: "high" }),
    lowTank,
    "metric"
  );
  assert.equal(w.length, 1);
  assert.match(w[0], /Demanding stem/);
  assert.match(w[0], /high light/);
});

test("plantWarnings: temp and pH messages localize the unit text", () => {
  const coldTank = makeTank({ tempC: 15 });
  const w = plantWarnings(makePlant({ tempMinC: 20 }), coldTank, "imperial");
  assert.equal(w.length, 1);
  assert.match(w[0], /°F/); // imperial system → Fahrenheit in the message
  const acidTank = makeTank({ ph: 5 });
  const ph = plantWarnings(makePlant({ phMin: 6 }), acidTank, "metric");
  assert.match(ph[0], /pH/);
});

// --- scorePlantForTank -------------------------------------------------

test("scorePlantForTank: tier comes from the number of suitability problems", () => {
  const tank = makeTank({ lightLevel: "low", tempC: 15, ph: 5 });
  // 0 problems → great
  assert.equal(scorePlantForTank(makePlant({ light: "low", tempMinC: 10, phMin: 4 }), tank).tier, "great");
  // 1 problem (light) → workable
  assert.equal(scorePlantForTank(makePlant({ light: "high", tempMinC: 10, phMin: 4 }), tank).tier, "workable");
  // 3 problems → poor
  assert.equal(scorePlantForTank(makePlant({ light: "high", tempMinC: 20, phMin: 6 }), tank).tier, "poor");
});

test("scorePlantForTank: undemanding plants outscore demanding ones in the same tier", () => {
  const tank = makeTank({ lightLevel: "high" });
  const easy = makePlant({ light: "low", co2: "none", careLevel: "beginner", growthRate: "fast" });
  const hard = makePlant({ light: "high", co2: "optional", careLevel: "advanced", growthRate: "slow" });
  const easyFit = scorePlantForTank(easy, tank);
  const hardFit = scorePlantForTank(hard, tank);
  assert.equal(easyFit.tier, "great");
  assert.equal(hardFit.tier, "great");
  assert.ok(easyFit.score > hardFit.score);
});

test("scorePlantForTank: a CO₂ tank stops penalizing the CO₂ axis", () => {
  // Same plant differing only in CO₂ need: without tank CO₂ the no-CO₂ plant
  // scores higher; with tank CO₂ the axis is flat so they tie there.
  const none = makePlant({ co2: "none" });
  const required = makePlant({ co2: "required" });

  const dry = makeTank();
  assert.ok(scorePlantForTank(none, dry).score > scorePlantForTank(required, dry).score);

  const co2Tank = makeTank({ co2: true });
  assert.equal(
    scorePlantForTank(none, co2Tank).score,
    scorePlantForTank(required, co2Tank).score
  );
  // A required plant is also a "great" fit in a CO₂ tank (no co2 problem).
  assert.equal(scorePlantForTank(required, co2Tank).tier, "great");
});
