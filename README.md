# Aqua — aquarium stocking planner

A mobile/web app for planning a freshwater aquarium: browse a large catalog of
fish and plants, build tanks, and get live, sourced compatibility feedback as
you stock — group sizes, predation, water-parameter fit, a real bioload model,
and plant-specific checks (light, CO₂, plant-eaters).

Built with Expo (SDK 54) / React Native / React 19 in strict TypeScript. The
app is deliberately **dependency-light**: navigation and state are hand-rolled
with React Context — no navigation or state-management library.

## Features

- **Catalogs** — ~936 fish and ~300 plants, each a researched, validated data
  record (adult size, water parameters, temperament, diet, care level, …).
  Many entries carry photos sourced from Wikimedia Commons and iNaturalist,
  filtered to commercially-safe licenses and attributed in-app (see
  [CREDITS.md](CREDITS.md)).
- **Tanks** — create tanks with volume, footprint, temperature, pH, lighting
  and a CO₂ toggle; stock them with fish and plants by species + count.
  Persisted locally with AsyncStorage.
- **Compatibility engine** ([rules.ts](rules.ts)) — as you stock, the app warns
  about predation, undersized groups, water-parameter mismatches, overstocking,
  plants that need more light or CO₂ than the tank provides, and herbivores that
  may eat your plants. All advisory — it informs, never blocks.
- **Bioload model** — effective load scales superlinearly with body size and by
  diet; live plants earn a capped nutrient-export credit. Calibrated so a 5 cm
  omnivore ≈ 5 L.
- **Best-fit & suggestions** — sort either catalog by how well each species
  suits the active tank, filter to "fits my tank," or tap "Suggest fish" on a
  tank for 30 picks that work.
- **Filtering & search** — multi-category filter sheets and substring search
  across common and scientific names, on both tabs.
- **Feeding reminders** — schedule 1–3 daily feed notifications (native only).
- **Units** — metric/imperial toggle. All internal logic is metric; conversion
  happens only at the UI boundary.

## Architecture

A single-screen-stack app with **no navigation or state library** — both are
hand-rolled. `App.tsx` owns navigation as local state (a `tab` plus
detail-screen overlays); `TankContext` / `UnitContext` hold state and persist to
AsyncStorage. All source lives flat in the repo root.

The catalogs are **pure JSON** (`fish.json`, `plants.json`) cast to typed
exports; because the cast bypasses `tsc`, standalone validators
(`validate-fish.mjs`, `validate-plants.mjs`) enforce the data contracts. The
rules engine (`rules.ts`) only `import type`s from the data modules, so it runs
under plain Node for tests.

See [CLAUDE.md](CLAUDE.md) for the detailed architecture, the canonical
metric-units rule, and the bioload/compatibility model.

## Develop

```bash
npm install
npm start            # Expo dev server (press a / i / w, or scan the QR in Expo Go)
npm run web          # open directly in the browser
npm run android      # Android emulator/device
npm run ios          # iOS simulator/device
```

Checks (no CI configured — run locally):

```bash
npx tsc --noEmit         # type-check (strict)
npm test                 # rules-engine tests (node:test, no test deps)
npm run validate-fish    # validate fish.json against the Fish contract
npm run validate-plants  # validate plants.json against the Plant contract
```

## Stack

Expo SDK 54 · React Native 0.81 · React 19 · TypeScript (strict) ·
`newArchEnabled`. Runtime dependencies beyond Expo/React: AsyncStorage
(persistence) and `expo-notifications` (feeding reminders; native-only).

## Image credits

Photos come from [Wikimedia Commons](https://commons.wikimedia.org/) and
[iNaturalist](https://www.inaturalist.org/) under licenses that permit
commercial reuse (public domain, CC0, CC BY, CC BY-SA), with per-photo
attribution shown in the app and listed in [CREDITS.md](CREDITS.md).

## Roadmap

Possible future work: accounts to sync tanks across devices, a shareable
"show off your tank" card, equipment (heaters/filters) suggestions, and finer
diet/feeding modeling.
