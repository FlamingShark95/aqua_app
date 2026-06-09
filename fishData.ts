import { ImageSourcePropType } from "react-native";
import fishData from "./fish.json";

// A picture for a fish: either a bundled file via
//   require("./assets/fish/angelfish-1.jpg")
// or a remote URL string like "https://example.com/angelfish.jpg".
export type FishPicture = string | ImageSourcePropType;

export type Fish = {
  // identity
  id: string;
  commonName: string;
  scientificName: string;

  // size and space (rule inputs)
  adultSizeCm: number;
  adultSizeMinCm?: number;    // smaller sex / natural min; display only
  minTankVolumeL: number;
  minFootprintCm: { length: number; width: number };

  // behavior (rule inputs)
  temperament: "peaceful" | "semi" | "aggressive" | "predatory";
  diet: "herbivore" | "omnivore" | "carnivore";
  minGroupSize: number;
  maxGroupSize?: number;      // recommended upper end; display only

  // water chemistry (rule inputs)
  tempMinC: number;
  tempMaxC: number;
  phMin: number;
  phMax: number;

  // feature input
  origin: string;

  // display only, never checked by the engine
  careLevel: "beginner" | "intermediate" | "advanced";
  rarity: "common" | "uncommon" | "rare";
  priceRange: "$" | "$$" | "$$$";
  description: string;

  // optional richer details, shown on the detail screen. Anything left out
  // renders as "?" there, so existing fish don't all need backfilling.
  waterType?: "freshwater" | "saltwater";
  tankRegion?: "top" | "middle" | "bottom";
  lifeExpectancyYears?: number;
  lifeExpectancyMaxYears?: number;  // upper end of lifespan range; display only
  behavior?: string;
  reproduction?: string;
  dimorphism?: string;
  // One or more pictures: mix bundled require(...) files and/or URL strings.
  // The detail screen shows them as a swipeable gallery; the list uses the
  // first as a thumbnail. A placeholder shows when this is empty.
  images?: FishPicture[];
};

// One stocked species in a tank. Only the species id and a head count are
// stored; the full Fish data is looked up in the catalog (FISH_BY_ID), so
// catalog fixes immediately apply to already-stocked tanks.
export type StockEntry = {
  speciesId: string; // Fish.id in the catalog
  count: number;
};

export type Tank = {
  // identity
  id: string;
  name: string; // "Living room 75 L", user names it

  // size and space (rule inputs)
  volumeL: number; // powers bioload, "too big for tank" checks
  lengthCm: number; // powers footprint check, key for the bichirs
  widthCm: number;

  // water chemistry (rule inputs)
  tempC: number; // the tank's set temperature
  ph: number; // the tank's measured pH

  // the contents
  stock: StockEntry[]; // the fish currently in it, one entry per species
};

// The catalog data lives in fish.json (pure data — no TypeScript, no comments).
// Bundled images can't be expressed in JSON because require() is a function call,
// so the few fish that ship a bundled asset have their images re-attached here by
// id. Fish with remote-URL images can instead store the URL strings in fish.json.
const BUNDLED_FISH_IMAGES: Record<string, FishPicture[]> = {
  "bichir-delhezi": [require("./assets/fish/DelheziBichir.webp")],
  "cardinal-tetra": [require("./assets/fish/CardinalTetra.webp")],
  "german-blue-ram": [require("./assets/fish/GermanBlueRam.webp")],
  "zebra-danio": [require("./assets/fish/ZebraDanio.webp")],
};

// fish.json is plain data, so TypeScript only infers loose types from it (e.g.
// `temperament` widens to `string`). Casting through `unknown` asserts the data
// matches the Fish shape; validate-fish.mjs is what actually guards that contract.
export const AVAILABLE_FISH: Fish[] = (fishData as unknown as Fish[]).map((fish) =>
  BUNDLED_FISH_IMAGES[fish.id]
    ? { ...fish, images: BUNDLED_FISH_IMAGES[fish.id] }
    : fish,
);

// Catalog lookup by species id, for resolving StockEntry refs.
export const FISH_BY_ID: Map<string, Fish> = new Map(
  AVAILABLE_FISH.map((fish) => [fish.id, fish])
);
