// Tests for the unit conversion/formatting helpers (units.ts). Same harness as
// rules.test.mjs: plain node:test against the CJS build emitted to .test-dist/
// (units.ts is pure — no imports — so it compiles and loads cleanly under Node).
// These guard the app's canonical-units rule: everything internal is metric and
// these are the only places a value crosses to/from the user's chosen system.
// Run with `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const {
  unitLabels,
  formatVolume,
  lengthValue,
  lengthUnit,
  formatLength,
  formatLengthRange,
  formatTemp,
  formatTempRange,
  volumeValue,
  tempValue,
  parseNum,
  volumeToLitres,
  lengthToCm,
  tempToCelsius,
} = require("./.test-dist/units.js");

const L_PER_GAL = 3.785411784;
const CM_PER_IN = 2.54;
const close = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} ≉ ${b}`);
const EN = "–"; // the en-dash used in range strings (U+2013)

// --- labels ------------------------------------------------------------------

test("unitLabels: per-system suffixes", () => {
  assert.deepEqual(unitLabels("metric"), { volume: "L", length: "cm", temp: "°C" });
  assert.deepEqual(unitLabels("imperial"), { volume: "gal", length: "in", temp: "°F" });
  assert.equal(lengthUnit("metric"), "cm");
  assert.equal(lengthUnit("imperial"), "in");
});

// --- parsing user input back to canonical metric -----------------------------

test("volumeToLitres / lengthToCm / tempToCelsius: metric is identity", () => {
  assert.equal(volumeToLitres(75, "metric"), 75);
  assert.equal(lengthToCm(30, "metric"), 30);
  assert.equal(tempToCelsius(25, "metric"), 25);
});

test("imperial parsing converts to metric with the right factors", () => {
  close(volumeToLitres(1, "imperial"), L_PER_GAL);
  close(volumeToLitres(20, "imperial"), 20 * L_PER_GAL);
  close(lengthToCm(1, "imperial"), CM_PER_IN);
  close(lengthToCm(12, "imperial"), 30.48);
  assert.equal(tempToCelsius(32, "imperial"), 0);
  assert.equal(tempToCelsius(212, "imperial"), 100);
  close(tempToCelsius(50, "imperial"), 10);
});

test("temperature parse is the exact inverse of the display formula", () => {
  for (const c of [0, 10, 24, 25, 27.5, 30]) {
    const f = (c * 9) / 5 + 32;
    close(tempToCelsius(f, "imperial"), c);
  }
});

test("parseNum: leading number, else 0", () => {
  assert.equal(parseNum("5.5"), 5.5);
  assert.equal(parseNum("12cm"), 12); // parseFloat takes the leading number
  assert.equal(parseNum("  7 "), 7);
  assert.equal(parseNum(""), 0);
  assert.equal(parseNum("abc"), 0);
  assert.equal(parseNum("NaN"), 0);
});

// --- display formatting (metric in, localized string out) --------------------

test("formatVolume: rounded whole units with suffix", () => {
  assert.equal(formatVolume(75, "metric"), "75 L");
  assert.equal(formatVolume(L_PER_GAL, "imperial"), "1 gal");
  assert.equal(formatVolume(10 * L_PER_GAL, "imperial"), "10 gal");
});

test("lengthValue / formatLength: cm whole, inches to 1dp", () => {
  assert.equal(lengthValue(10, "metric"), "10");
  assert.equal(lengthValue(CM_PER_IN, "imperial"), "1");
  assert.equal(lengthValue(30.48, "imperial"), "12");
  assert.equal(formatLength(10, "metric"), "10 cm");
  assert.equal(formatLength(CM_PER_IN, "imperial"), "1 in");
});

test("formatLengthRange: en-dash and a single trailing unit", () => {
  assert.equal(formatLengthRange(5, 8, "metric"), `5${EN}8 cm`);
  assert.equal(formatLengthRange(CM_PER_IN, 30.48, "imperial"), `1${EN}12 in`);
});

test("formatTemp: °C to 1dp, °F whole", () => {
  assert.equal(formatTemp(25, "metric"), "25°C"); // round strips the .0
  assert.equal(formatTemp(25.5, "metric"), "25.5°C");
  assert.equal(formatTemp(0, "imperial"), "32°F");
  assert.equal(formatTemp(100, "imperial"), "212°F");
  assert.equal(formatTemp(25, "imperial"), "77°F");
});

test("formatTempRange: matches formatTemp at both ends", () => {
  assert.equal(formatTempRange(22, 28, "metric"), `22${EN}28°C`);
  assert.equal(formatTempRange(22, 28, "imperial"), `72${EN}82°F`); // 71.6→72, 82.4→82
});

test("volumeValue / tempValue: raw seed values, 1dp", () => {
  assert.equal(volumeValue(75, "metric"), "75");
  assert.equal(volumeValue(L_PER_GAL, "imperial"), "1");
  assert.equal(tempValue(25, "metric"), "25");
  assert.equal(tempValue(0, "imperial"), "32");
});

// --- round-trip invariant ----------------------------------------------------

test("seed → parse round-trips back to the original metric value", () => {
  // A value the user sees (raw seed) parsed back through the converter returns
  // the metric original, within the display's rounding step. Volume seeds at
  // 1dp gal, so allow ~0.2 L of rounding drift; these inch values divide evenly
  // so they round-trip exactly.
  for (const litres of [40, 75, 200]) {
    const seen = parseNum(volumeValue(litres, "imperial"));
    assert.ok(Math.abs(volumeToLitres(seen, "imperial") - litres) < 0.2);
  }
  for (const cm of [2.54, 25.4, 30.48]) {
    const seen = parseNum(lengthValue(cm, "imperial"));
    close(lengthToCm(seen, "imperial"), cm);
  }
});
