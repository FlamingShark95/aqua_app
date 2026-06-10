import plantData from "./plants.json";
import { FishPicture, LightLevel } from "./fishData";

export type Plant = {
  // identity
  id: string;
  commonName: string;
  scientificName: string;

  // form and placement (display + aquascaping guidance)
  type: "stem" | "rosette" | "rhizome" | "moss" | "floating" | "carpet" | "bulb";
  placement: "foreground" | "midground" | "background" | "floating";
  heightCm: number; // typical max height; feeds the bioload credit

  // care requirements (rule inputs)
  growthRate: "slow" | "medium" | "fast"; // feeds the bioload credit
  light: LightLevel; // checked against the tank's lightLevel
  co2: "none" | "optional" | "required";
  tempMinC: number;
  tempMaxC: number;
  phMin: number;
  phMax: number;

  // display only
  careLevel: "beginner" | "intermediate" | "advanced";
  priceRange: "$" | "$$" | "$$$";
  description: string;
  origin?: string;
  images?: FishPicture[];
};

// plants.json is plain data; the cast asserts it matches the Plant shape.
// validate-plants.mjs is what actually guards that contract.
export const AVAILABLE_PLANTS: Plant[] = plantData as unknown as Plant[];

export const PLANTS_BY_ID: Map<string, Plant> = new Map(
  AVAILABLE_PLANTS.map((plant) => [plant.id, plant])
);
