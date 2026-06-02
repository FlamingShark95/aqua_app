import { ImageSourcePropType } from "react-native";

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

export const AVAILABLE_FISH: Fish[] = [
  {
    id: "bichir-delhezi",
    images: [require("./assets/fish/DelheziBichir.webp")],
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 15,
    lifeExpectancyMaxYears: 20,
    behavior:
      "A slow, mostly nocturnal ambush hunter that cruises the bottom and gulps air at the surface. Can be territorial toward its own kind.",
    reproduction:
      "Egg scatterer that spawns among fine-leaved plants. Rarely bred in home tanks; most are farmed or wild-caught.",
    dimorphism:
      "Hard to sex; mature males tend to show a thicker, broader anal fin.",
    commonName: "Delhezi bichir",
    scientificName: "Polypterus delhezi",
    adultSizeCm: 35,
    adultSizeMinCm: 30,
    minTankVolumeL: 280,
    minFootprintCm: { length: 120, width: 45 },
    temperament: "predatory",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 6.5,
    phMax: 7.5,
    origin: "West Africa",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$$",
    description:
      "A prehistoric looking predator with armored scales and a snakelike body. Will eat any fish small enough to fit in its mouth.",
  },
  {
    id: "angelfish",
    commonName: "Angelfish",
    scientificName: "Pterophyllum scalare",
    adultSizeCm: 15.2,
    adultSizeMinCm: 12,
    minTankVolumeL: 110,
    minFootprintCm: { length: 80, width: 40 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 1,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 6.8,
    phMax: 7.0,
    origin: "Amazon",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$$",
    description:
      "Angelfish are iconic aquarium inhabitants known for their tall, triangular bodies and graceful swimming patterns. They prefer tall aquariums with gentle water flow, decorated with broadleaf plants and vertical structures like driftwood to simulate their natural habitat. Generally peaceful, but they will eat fish small enough to fit in their mouths and can turn territorial while breeding.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 8,
    lifeExpectancyMaxYears: 12,
    behavior:
      "An active mid-water swimmer that appreciates tall, planted tanks and calm, steady flow.",
    reproduction:
      "Egg layer. A bonded pair cleans a vertical surface, spawns on it, and guards the eggs and fry together.",
    dimorphism:
      "Difficult to sex by eye; males may develop a slightly steeper forehead and a small breeding tube when spawning.",
  },
  {
    id: "corydoras-bronze",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 5,
    lifeExpectancyMaxYears: 10,
    behavior:
      "A peaceful, social bottom-dweller that constantly forages the substrate and darts up for a gulp of air. Happiest in groups of six or more.",
    reproduction:
      "Egg layer; the female carries eggs in a pelvic-fin pouch and sticks them to glass and plants, often after a cool water change.",
    dimorphism:
      "Seen from above, females are noticeably rounder and broader than the slimmer males.",
    commonName: "Bronze corydoras",
    scientificName: "Corydoras aeneus",
    adultSizeCm: 6,
    minTankVolumeL: 75,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 15,
    tempMinC: 22,
    tempMaxC: 26,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Amazon",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A peaceful bottom dwelling catfish that scavenges leftover food. Happiest in groups of six or more.",
  },
  {
    id: "neon-tetra",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 5,
    behavior:
      "A peaceful, tightly schooling fish that holds in the middle water column. Becomes nervous and washed-out when kept in small numbers.",
    reproduction:
      "Egg scatterer that spawns in soft, dim, acidic water; the eggs and fry are sensitive to light.",
    dimorphism:
      "Subtle; females are a little rounder, which makes the blue stripe look slightly bent.",
    commonName: "Neon tetra",
    scientificName: "Paracheirodon innesi",
    adultSizeCm: 3,
    minTankVolumeL: 40,
    minFootprintCm: { length: 45, width: 25 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 20,
    tempMinC: 20,
    tempMaxC: 26,
    phMin: 5.0,
    phMax: 7.0,
    origin: "Amazon",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A tiny, brightly striped schooling fish. Peaceful but small enough to become a snack for larger tankmates.",
  },
  {
    id: "cardinal-tetra",
    images: [require("./assets/fish/CardinalTetra.webp")],
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 5,
    behavior:
      "A calm schooling tetra that shoals in the middle of the tank and shows its best color over dark substrate.",
    reproduction:
      "Egg scatterer that needs very soft, acidic water to spawn; challenging to breed at home.",
    dimorphism:
      "Hard to tell apart; females are a touch deeper-bodied than males.",
    commonName: "Cardinal tetra",
    scientificName: "Paracheirodon axelrodi",
    adultSizeCm: 3,
    minTankVolumeL: 40,
    minFootprintCm: { length: 45, width: 25 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 20,
    tempMinC: 23,
    tempMaxC: 27,
    phMin: 5.0,
    phMax: 7.0,
    origin: "Amazon",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "Similar to the neon tetra but with a fuller red stripe. A peaceful schooling fish that prefers soft, slightly acidic water.",
  },
  {
    id: "ember-tetra",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 4,
    behavior:
      "A tiny, peaceful schooler that drifts in loose groups among plants in the middle and upper water.",
    reproduction:
      "Egg scatterer among fine-leaved plants; the parents will eat the eggs if they aren't removed.",
    dimorphism:
      "Males are brighter orange and slimmer; females are paler and rounder.",
    commonName: "Ember tetra",
    scientificName: "Hyphessobrycon amandae",
    adultSizeCm: 2,
    minTankVolumeL: 40,
    minFootprintCm: { length: 45, width: 25 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 8,
    maxGroupSize: 20,
    tempMinC: 23,
    tempMaxC: 29,
    phMin: 5.5,
    phMax: 7.0,
    origin: "Amazon",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A very small, glowing orange schooling fish. Peaceful and well suited to planted community tanks.",
  },
  {
    id: "firemouth-cichlid",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    behavior:
      "Generally calm, but digs and defends a territory, flaring its bright red throat to bluff rivals — especially when breeding.",
    reproduction:
      "Egg layer; a pair cleans a flat rock or pit and both parents guard the eggs and fry.",
    dimorphism:
      "Males grow larger with longer, more pointed dorsal and anal fins.",
    commonName: "Firemouth cichlid",
    scientificName: "Thorichthys meeki",
    adultSizeCm: 17,
    minTankVolumeL: 110,
    minFootprintCm: { length: 90, width: 40 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 1,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 6.5,
    phMax: 8.0,
    origin: "Central America",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$$",
    description:
      "A grey cichlid that flares a bright red throat when showing off. Mostly peaceful but territorial when breeding.",
  },
  {
    id: "german-blue-ram",
    images: [require("./assets/fish/GermanBlueRam.webp")],
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 3,
    behavior:
      "A peaceful dwarf cichlid that stays near the bottom, sifting substrate and defending a small territory.",
    reproduction:
      "Egg layer; pairs spawn on a cleaned flat surface and both parents tend the brood.",
    dimorphism:
      "Males have longer first dorsal-fin rays; females show a pink-purple belly in breeding condition.",
    commonName: "German blue ram",
    scientificName: "Mikrogeophagus ramirezi",
    adultSizeCm: 7,
    adultSizeMinCm: 5,
    minTankVolumeL: 60,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 2,
    tempMinC: 26,
    tempMaxC: 30,
    phMin: 5.5,
    phMax: 7.0,
    origin: "Amazon",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$$",
    description:
      "A small, colourful dwarf cichlid that likes warm, soft water and a calm community.",
  },
  {
    id: "harlequin-rasbora",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 6,
    behavior:
      "A hardy, peaceful schooler that shoals in the middle water and is happiest in groups of eight or more.",
    reproduction:
      "An unusual egg layer that deposits its eggs on the undersides of broad leaves.",
    dimorphism:
      "Males have a slightly larger, more rounded black patch; females are fuller-bodied.",
    commonName: "Harlequin rasbora",
    scientificName: "Trigonostigma heteromorpha",
    adultSizeCm: 5,
    minTankVolumeL: 60,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 8,
    maxGroupSize: 15,
    tempMinC: 22,
    tempMaxC: 27,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Southeast Asia",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A hardy, copper-coloured schooling fish with a black triangular patch. Great for beginners.",
  },
  {
    id: "iridescent-shark",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 20,
    behavior:
      "A skittish, fast-growing schooling catfish that bolts when startled and quickly outgrows nearly every home tank.",
    reproduction:
      "A migratory egg layer in the wild; not bred in home aquariums.",
    dimorphism:
      "Difficult to sex; mature females are bulkier.",
    commonName: "Iridescent shark",
    scientificName: "Pangasianodon hypophthalmus",
    adultSizeCm: 100,
    minTankVolumeL: 4000,
    minFootprintCm: { length: 300, width: 100 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 1,
    tempMinC: 22,
    tempMaxC: 26,
    phMin: 6.5,
    phMax: 7.5,
    origin: "Southeast Asia",
    careLevel: "advanced",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "A giant catfish often sold tiny. It grows enormous and needs a pond-sized tank, so it suits very few setups.",
  },
  {
    id: "jack-dempsey",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    behavior:
      "A bold, territorial cichlid that digs, rearranges decor, and defends its space aggressively.",
    reproduction:
      "Egg layer; pairs spawn on flat surfaces and are dedicated parents that guard the fry.",
    dimorphism:
      "Males are larger with longer, pointed fins and brighter spangling; females are smaller.",
    commonName: "Jack Dempsey",
    scientificName: "Rocio octofasciata",
    adultSizeCm: 25,
    minTankVolumeL: 200,
    minFootprintCm: { length: 120, width: 45 },
    temperament: "aggressive",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 22,
    tempMaxC: 30,
    phMin: 6.5,
    phMax: 8.0,
    origin: "Central America",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$$",
    description:
      "A stocky, spangled cichlid named after a boxer. Bold and scrappy, best kept with fish that can hold their own.",
  },
  {
    id: "kuhli-loach",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 8,
    lifeExpectancyMaxYears: 12,
    behavior:
      "A shy, nocturnal, eel-like loach that burrows and hides by day and forages along the bottom at night. Much calmer in a group.",
    reproduction:
      "Egg layer that scatters greenish eggs among floating plant roots; rarely bred in captivity.",
    dimorphism:
      "Hard to sex; females can look plumper and males have slightly larger pectoral fins.",
    commonName: "Kuhli loach",
    scientificName: "Pangio kuhlii",
    adultSizeCm: 10,
    minTankVolumeL: 75,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 5,
    maxGroupSize: 10,
    tempMinC: 24,
    tempMaxC: 30,
    phMin: 5.5,
    phMax: 7.0,
    origin: "Southeast Asia",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A slender, eel-like loach that hides by day and wriggles through the substrate at night.",
  },
  {
    id: "lemon-tetra",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 6,
    behavior:
      "A peaceful, active schooler that shoals in the middle water and colors up best in a planted tank.",
    reproduction:
      "Egg scatterer that spawns among fine-leaved plants in soft, slightly acidic water.",
    dimorphism:
      "Males have a bolder black edge on the anal fin; females are rounder.",
    commonName: "Lemon tetra",
    scientificName: "Hyphessobrycon pulchripinnis",
    adultSizeCm: 5,
    minTankVolumeL: 60,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 15,
    tempMinC: 23,
    tempMaxC: 28,
    phMin: 5.5,
    phMax: 7.5,
    origin: "Amazon",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A pale yellow schooling tetra with black-and-yellow fin edges. Peaceful and easy to keep.",
  },
  {
    id: "molly",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 5,
    behavior:
      "An active, sociable livebearer that grazes algae across all levels and appreciates hard, mineral-rich water.",
    reproduction:
      "Livebearer; females give birth to free-swimming fry and can store sperm for several broods.",
    dimorphism:
      "Males are slimmer with a rod-like gonopodium fin; females are larger and rounder.",
    commonName: "Molly",
    scientificName: "Poecilia sphenops",
    adultSizeCm: 10,
    minTankVolumeL: 75,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 3,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 7.0,
    phMax: 8.5,
    origin: "Central America",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A livebearer that comes in many colours and likes hard, slightly alkaline water.",
  },
  {
    id: "oscar",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    lifeExpectancyMaxYears: 15,
    behavior:
      "An intelligent, interactive cichlid that rearranges decor, recognizes its keeper, and eats anything it can swallow.",
    reproduction:
      "Egg layer; pairs clean a flat rock and guard the eggs and fry together.",
    dimorphism:
      "Not reliably sexable by eye; a breeding pair usually has to be vented to tell them apart.",
    commonName: "Oscar",
    scientificName: "Astronotus ocellatus",
    adultSizeCm: 35,
    adultSizeMinCm: 28,
    minTankVolumeL: 280,
    minFootprintCm: { length: 120, width: 50 },
    temperament: "predatory",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 23,
    tempMaxC: 27,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Amazon",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$$",
    description:
      "A large, intelligent cichlid with loads of personality. It will eat any fish it can swallow.",
  },
  {
    id: "pearl-gourami",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 6,
    behavior:
      "A peaceful labyrinth fish that gulps air at the surface and uses thread-like pelvic fins to feel out its surroundings.",
    reproduction:
      "Bubble-nest builder; the male builds a floating nest and guards the eggs and fry.",
    dimorphism:
      "Males have a longer, more pointed dorsal fin and a fiery red-orange throat when mature.",
    commonName: "Pearl gourami",
    scientificName: "Trichopodus leerii",
    adultSizeCm: 12,
    minTankVolumeL: 110,
    minFootprintCm: { length: 80, width: 35 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 1,
    tempMinC: 24,
    tempMaxC: 30,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Southeast Asia",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$$",
    description:
      "A graceful gourami with a lacy, pearl-spotted body. Calm and undemanding for its size.",
  },
  {
    id: "queen-arabesque-pleco",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    behavior:
      "A shy, mostly nocturnal pleco that grazes biofilm and hides among rocks and wood during the day.",
    reproduction:
      "Cave-spawning egg layer; the male guards the eggs inside a tight crevice.",
    dimorphism:
      "Males develop longer cheek bristles (odontodes) and broader heads.",
    commonName: "Queen arabesque pleco",
    scientificName: "Hypancistrus sp. L260",
    adultSizeCm: 9,
    minTankVolumeL: 110,
    minFootprintCm: { length: 80, width: 35 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 1,
    tempMinC: 25,
    tempMaxC: 29,
    phMin: 6.0,
    phMax: 7.0,
    origin: "Brazil",
    careLevel: "intermediate",
    rarity: "rare",
    priceRange: "$$$",
    description:
      "A small, striking pleco covered in fine black-and-white maze patterns. A prized algae grazer.",
  },
  {
    id: "rummynose-tetra",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 6,
    behavior:
      "A precision schooler whose red nose fades when water quality slips, making it a living health gauge.",
    reproduction:
      "Egg scatterer that needs very soft, acidic water; tricky to breed.",
    dimorphism:
      "Subtle; females are slightly deeper-bodied than males.",
    commonName: "Rummynose tetra",
    scientificName: "Hemigrammus rhodostomus",
    adultSizeCm: 5,
    minTankVolumeL: 75,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 8,
    maxGroupSize: 15,
    tempMinC: 24,
    tempMaxC: 27,
    phMin: 5.5,
    phMax: 7.0,
    origin: "Amazon",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$",
    description:
      "A tight-schooling tetra with a bright red nose, often used as a living water-quality gauge.",
  },
  {
    id: "swordtail",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 5,
    behavior:
      "An active, peaceful livebearer that swims constantly; males spar and chase but rarely harm tankmates.",
    reproduction:
      "Livebearer; females drop broods of free-swimming fry every few weeks.",
    dimorphism:
      "Males carry the signature sword on the lower tail and a gonopodium; females lack the sword.",
    commonName: "Swordtail",
    scientificName: "Xiphophorus hellerii",
    adultSizeCm: 14,
    minTankVolumeL: 75,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 3,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 7.0,
    phMax: 8.4,
    origin: "Central America",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "An active livebearer; males sport a long sword on the lower tail fin. Hardy and prolific.",
  },
  {
    id: "tiger-barb",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 6,
    behavior:
      "A lively, semi-aggressive shoaling barb that nips fins in too small a group; a school of six or more keeps the peace.",
    reproduction:
      "Egg scatterer that spawns among plants and readily eats its own eggs.",
    dimorphism:
      "Males are smaller and more intensely colored with a red-tipped snout; females are rounder.",
    commonName: "Tiger barb",
    scientificName: "Puntigrus tetrazona",
    adultSizeCm: 7,
    minTankVolumeL: 75,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 12,
    tempMinC: 22,
    tempMaxC: 27,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Southeast Asia",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A bold, stripy barb that nips fins if kept in small groups. Keep a big school to spread the energy.",
  },
  {
    id: "upside-down-catfish",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 8,
    behavior:
      "A peaceful, social catfish that famously swims belly-up to graze the surface and undersides of leaves, most active at dusk.",
    reproduction:
      "Egg layer that spawns in caves; uncommon but achievable in the home aquarium.",
    dimorphism:
      "Females are usually larger and rounder; males may be a little more colorful.",
    commonName: "Upside-down catfish",
    scientificName: "Synodontis nigriventris",
    adultSizeCm: 10,
    minTankVolumeL: 75,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 4,
    maxGroupSize: 8,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 7.5,
    origin: "West Africa",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$$",
    description:
      "A quirky catfish that swims belly-up to graze the underside of leaves and the surface.",
  },
  {
    id: "vampire-tetra",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 15,
    behavior:
      "A powerful, fast open-water predator that hunts other fish and needs a huge tank with room to cruise.",
    reproduction:
      "A migratory predator that is not bred in home aquariums.",
    dimorphism:
      "Not reliably distinguished externally.",
    commonName: "Vampire tetra",
    scientificName: "Hydrolycus scomberoides",
    adultSizeCm: 45,
    minTankVolumeL: 1000,
    minFootprintCm: { length: 200, width: 60 },
    temperament: "predatory",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 23,
    tempMaxC: 28,
    phMin: 5.5,
    phMax: 7.0,
    origin: "Amazon",
    careLevel: "advanced",
    rarity: "rare",
    priceRange: "$$$",
    description:
      "A fast, toothy predator with two long fangs. A huge, demanding fish for specialists only.",
  },
  {
    id: "white-cloud-mountain-minnow",
    waterType: "freshwater",
    tankRegion: "top",
    lifeExpectancyYears: 5,
    behavior:
      "A hardy, peaceful coolwater schooler that's active near the top and tolerates unheated rooms.",
    reproduction:
      "Egg scatterer that spawns readily and rarely eats its own eggs; easy to breed.",
    dimorphism:
      "Males are slimmer and more colorful, flaring brighter fins in display.",
    commonName: "White cloud mountain minnow",
    scientificName: "Tanichthys albonubes",
    adultSizeCm: 4,
    minTankVolumeL: 40,
    minFootprintCm: { length: 45, width: 25 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    tempMinC: 18,
    tempMaxC: 24,
    phMin: 6.0,
    phMax: 8.0,
    origin: "China",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A tiny, cool-water schooling fish that can even live unheated in a mild room.",
  },
  {
    id: "x-ray-tetra",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 5,
    behavior:
      "A hardy, peaceful schooler with a translucent body, comfortable across a wide range of water conditions.",
    reproduction:
      "Egg scatterer that spawns among plants in soft, acidic water.",
    dimorphism:
      "Females are larger and rounder; males show slightly bolder fin markings.",
    commonName: "X-ray tetra",
    scientificName: "Pristella maxillaris",
    adultSizeCm: 5,
    minTankVolumeL: 60,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 7.5,
    origin: "South America",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A see-through tetra with yellow-and-black fin flashes. Hardy and tolerant of a range of water.",
  },
  {
    id: "yoyo-loach",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 8,
    lifeExpectancyMaxYears: 12,
    behavior:
      "A busy, social bottom loach that hunts snails, plays dead, and can click audibly; keep it in a small group.",
    reproduction:
      "Egg layer; rarely bred in captivity and mostly commercially farmed.",
    dimorphism:
      "Hard to sex; females tend to be plumper when mature.",
    commonName: "Yoyo loach",
    scientificName: "Botia almorhae",
    adultSizeCm: 13,
    minTankVolumeL: 110,
    minFootprintCm: { length: 90, width: 35 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 4,
    maxGroupSize: 8,
    tempMinC: 24,
    tempMaxC: 30,
    phMin: 6.5,
    phMax: 7.5,
    origin: "India",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$$",
    description:
      "A playful loach marked with 'YOYO'-like lettering. Social and busy; keep it in a small group.",
  },
  {
    id: "zebra-danio",
    images: [require("./assets/fish/ZebraDanio.webp")],
    waterType: "freshwater",
    tankRegion: "top",
    lifeExpectancyYears: 4,
    behavior:
      "A fast, hardy, endlessly active schooler that zips along the top and tolerates cooler water and beginner mistakes.",
    reproduction:
      "Egg scatterer that spawns enthusiastically over substrate or marbles; very easy to breed.",
    dimorphism:
      "Males are slimmer and more torpedo-shaped; females are larger with rounder bellies.",
    commonName: "Zebra danio",
    scientificName: "Danio rerio",
    adultSizeCm: 5,
    minTankVolumeL: 60,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 12,
    tempMinC: 18,
    tempMaxC: 24,
    phMin: 6.5,
    phMax: 7.5,
    origin: "India",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A fast, hardy striped fish that's nearly indestructible. Likes cooler water and open swimming space.",
  },
  // Sources: aquariumcoop.com/blogs/aquarium/guppy-care-guide, en.wikipedia.org/wiki/Guppy, fishbase.se Poecilia-reticulata
  {
    id: "guppy",
    waterType: "freshwater",
    tankRegion: "top",
    lifeExpectancyYears: 2,
    lifeExpectancyMaxYears: 3,
    behavior:
      "An active, peaceful livebearer that swims and displays near the surface and top of the water column. Hardy and endlessly busy, it does best in hard, mineral-rich water.",
    reproduction:
      "Prolific livebearer; females give birth to broods of free-swimming fry every few weeks and can store sperm for several broods. Adults will eat their own fry.",
    dimorphism:
      "Strongly dimorphic: males are small and brilliantly coloured with large ornate fins, while females are larger, bulkier, and much plainer.",
    commonName: "Guppy",
    scientificName: "Poecilia reticulata",
    adultSizeCm: 6,
    adultSizeMinCm: 3,
    minTankVolumeL: 40,
    minFootprintCm: { length: 45, width: 25 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 3,
    maxGroupSize: 10,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 7.0,
    phMax: 8.0,
    origin: "South America",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "The most popular livebearer, available in endless colour and fin varieties. Hardy, adaptable, and prolific — ideal for beginners, though it breeds readily and prefers hard water.",
  },
  // Sources: aquariumcoop.com/blogs/aquarium/platy-care-guide, en.wikipedia.org/wiki/Xiphophorus_maculatus, aquariumindustries.com.au platy care sheet
  {
    id: "platy",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 3,
    lifeExpectancyMaxYears: 5,
    behavior:
      "A peaceful, constantly active livebearer that grazes algae and accepts almost any food. Sociable and undemanding, it suits a mixed community of similar hard-water fish.",
    reproduction:
      "Livebearer; females drop broods of free-swimming fry every four to six weeks and can store sperm between broods. Provide cover so some fry survive.",
    dimorphism:
      "Males are smaller and slimmer with a rod-like gonopodium fin; females are larger and rounder, especially when gravid.",
    commonName: "Platy",
    scientificName: "Xiphophorus maculatus",
    adultSizeCm: 7,
    adultSizeMinCm: 5,
    minTankVolumeL: 60,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 3,
    maxGroupSize: 10,
    tempMinC: 21,
    tempMaxC: 28,
    phMin: 7.0,
    phMax: 8.2,
    origin: "Central America",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A hardy, colourful livebearer that comes in many colours and patterns. Peaceful and easy to keep, it prefers hard, slightly alkaline water.",
  },
  // Sources: aquariumcoop.com/blogs/aquarium/endlers-livebearer-care-guide, aquariumsource.com/endlers-livebearer, inaturalist.org Poecilia wingei
  {
    id: "endlers-livebearer",
    waterType: "freshwater",
    tankRegion: "top",
    lifeExpectancyYears: 2,
    behavior:
      "A tiny, peaceful, perpetually active livebearer that dwells in the upper water. Sociable and best kept in a group, it thrives in hard, slightly alkaline water.",
    reproduction:
      "Prolific livebearer; females produce small broods of free-swimming fry every few weeks. Pure (N-class) strains must be kept away from guppies to avoid hybridising.",
    dimorphism:
      "Males are tiny (barely over 2 cm) and vividly patterned in green, orange, and black; females are larger, plumper, and plain silvery.",
    commonName: "Endler's livebearer",
    scientificName: "Poecilia wingei",
    adultSizeCm: 4,
    adultSizeMinCm: 2,
    minTankVolumeL: 40,
    minFootprintCm: { length: 45, width: 25 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 3,
    maxGroupSize: 10,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 7.0,
    phMax: 8.5,
    origin: "South America",
    careLevel: "beginner",
    rarity: "uncommon",
    priceRange: "$",
    description:
      "A close cousin of the guppy, smaller and more vividly patterned. Hardy and prolific, it likes hard, mineral-rich water and is happiest in a small group.",
  },
  // Sources: seriouslyfish.com/species/puntius-titteya, en.wikipedia.org/wiki/Cherry_barb, aquariumcoop.com cherry barb
  {
    id: "cherry-barb",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 5,
    behavior:
      "A peaceful, slightly shy schooling barb that gains confidence and colour in a group, shoaling in the lower-middle water of a planted tank.",
    reproduction:
      "Egg-scattering free spawner with no parental care; the adults will eat their own eggs, which hatch in 24–48 hours.",
    dimorphism:
      "Males are slimmer and flush a deep cherry red in spawning condition; females are rounder and a paler brownish-yellow.",
    commonName: "Cherry barb",
    scientificName: "Puntius titteya",
    adultSizeCm: 5,
    minTankVolumeL: 60,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 12,
    tempMinC: 23,
    tempMaxC: 27,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Sri Lanka",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A small, hardy schooling barb whose males turn a rich cherry red. Peaceful and undemanding, ideal for a planted community aquarium.",
  },
  // Sources: en.wikipedia.org/wiki/Rosy_barb, fishlore.com/Profiles-RosyBarb, en.aqua-fish.net/fish/rosy-barb
  {
    id: "rosy-barb",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 5,
    behavior:
      "A hardy, boisterous, fast-moving schooling barb that tolerates cool water. Kept in too small a group it can become a fin-nipper, so keep a proper school with open swimming space.",
    reproduction:
      "Egg-scatterer that spawns readily among fine-leaved plants and shows no parental care; the parents will eat the eggs.",
    dimorphism:
      "Males flush a bright rosy red, especially when breeding; females are larger, deeper-bodied, and an olive-yellow.",
    commonName: "Rosy barb",
    scientificName: "Pethia conchonius",
    adultSizeCm: 14,
    adultSizeMinCm: 10,
    minTankVolumeL: 110,
    minFootprintCm: { length: 80, width: 35 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 12,
    tempMinC: 18,
    tempMaxC: 24,
    phMin: 6.0,
    phMax: 7.5,
    origin: "South Asia",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "One of the hardiest barbs — an active, coolwater schooling fish whose males glow rosy red. Needs a big school and swimming room to keep its fin-nipping in check.",
  },
  // Sources: aquariumsource.com/denison-barb, aquadiction.world/species-spotlight/denison-barb, tankarium.com/roseline-shark-denison-barb
  {
    id: "denison-barb",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 5,
    lifeExpectancyMaxYears: 8,
    behavior:
      "A fast, torpedo-shaped schooling 'shark' barb from fast-flowing rivers; it needs strong flow, well-oxygenated water, and length to cruise. Peaceful but boisterous, and unhappy in small numbers.",
    reproduction:
      "Egg-scatterer that is very difficult to breed at home; commercial stock is largely farmed or hormone-induced rather than wild-caught.",
    dimorphism:
      "Not reliably sexed by eye; mature females tend to be a little larger and deeper-bodied than males.",
    commonName: "Denison barb",
    scientificName: "Sahyadria denisonii",
    adultSizeCm: 15,
    adultSizeMinCm: 13,
    minTankVolumeL: 200,
    minFootprintCm: { length: 120, width: 40 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 10,
    tempMinC: 20,
    tempMaxC: 26,
    phMin: 6.5,
    phMax: 7.8,
    origin: "India",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$$",
    description:
      "Also called the roseline shark — a sleek, red-and-black striped barb for large aquariums. Active and peaceful, it needs a long tank, strong flow, and a school of six or more.",
  },
  // Sources: aquariumcoop.com/blogs/aquarium/celestial-pearl-danio, fishkeepingworld.com/celestial-pearl-danio, tankarium.com/celestial-pearl-danio
  {
    id: "celestial-pearl-danio",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 3,
    behavior:
      "A tiny, jewel-like nano fish that can be timid in the open; in a good-sized group the males display and spar constantly. Best in a densely planted tank with gentle flow.",
    reproduction:
      "Continuous egg-scatterer that deposits eggs among mosses and fine plants; shows no parental care and will eat its own eggs.",
    dimorphism:
      "Males are more vivid with bold red fins and black fin bars; females are plumper and paler with more orange fins.",
    commonName: "Celestial pearl danio",
    scientificName: "Danio margaritatus",
    adultSizeCm: 2.5,
    minTankVolumeL: 40,
    minFootprintCm: { length: 45, width: 25 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 8,
    maxGroupSize: 15,
    tempMinC: 20,
    tempMaxC: 25,
    phMin: 6.5,
    phMax: 7.5,
    origin: "Southeast Asia",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$$",
    description:
      "Also called the galaxy rasbora — a spectacular nano fish speckled like a night sky with red-orange fins. Peaceful but a little shy; keep a large group in a planted nano tank.",
  },
  // Sources: aquariumcoop.com/blogs/aquarium/chili-rasbora, aquariumsource.com/chili-rasbora, aquariadise.com/chili-rasbora
  {
    id: "chili-rasbora",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 4,
    behavior:
      "One of the smallest aquarium fish — a peaceful blackwater shoaler that glows brightest in a large group over dark substrate with soft, gentle flow.",
    reproduction:
      "Continuous egg-scatterer among mosses and fine-leaved plants; no parental care, and the adults eat eggs left in the open.",
    dimorphism:
      "Males are slimmer and an intense red with bold black markings; females are rounder and a paler orange.",
    commonName: "Chili rasbora",
    scientificName: "Boraras brigittae",
    adultSizeCm: 2,
    minTankVolumeL: 40,
    minFootprintCm: { length: 45, width: 25 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 8,
    maxGroupSize: 20,
    tempMinC: 23,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Southeast Asia",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$$",
    description:
      "A tiny, brilliant red blackwater nano fish, also called the mosquito rasbora. Peaceful and best in a big shoal; it needs tiny foods and a mature, stable tank.",
  },
  // Sources: fishlore.com/profile-blackskirttetra, aquariadise.com/black-skirt-tetra, en.aqua-fish.net/fish/black-skirt-tetra
  {
    id: "black-skirt-tetra",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 5,
    behavior:
      "A hardy, active shoaling tetra with flowing black rear fins. Easygoing in a proper school, but prone to nipping the fins of slow or long-finned tankmates when kept in small numbers.",
    reproduction:
      "Egg-scatterer that spawns among fine-leaved plants and shows no parental care; the adults will eat the eggs.",
    dimorphism:
      "Females are larger and rounder-bodied; males are slimmer with a broader, more pointed dorsal and anal fin.",
    commonName: "Black skirt tetra",
    scientificName: "Gymnocorymbus ternetzi",
    adultSizeCm: 6,
    minTankVolumeL: 75,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 12,
    tempMinC: 21,
    tempMaxC: 27,
    phMin: 6.0,
    phMax: 7.5,
    origin: "South America",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A hardy, silvery tetra with sweeping black fins. Peaceful in a good-sized school, but keep it away from long-finned tankmates to curb its fin-nipping.",
  },
  // Sources: fishlore.com/Profiles-SerpaeTetra, aquadiction.world/species-spotlight/serpae-tetra, en.aqua-fish.net/fish/serpae-tetra
  {
    id: "serpae-tetra",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 5,
    behavior:
      "A vivid blood-red tetra that is lively but a notorious fin-nipper; a large school keeps the nipping within the group. Can be skittish, so it appreciates planted cover.",
    reproduction:
      "Egg-scatterer that spawns among fine-leaved plants in soft, acidic water and shows no parental care.",
    dimorphism:
      "Males are slimmer with a bolder black dorsal fin edged in white; females are rounder and a little paler.",
    commonName: "Serpae tetra",
    scientificName: "Hyphessobrycon eques",
    adultSizeCm: 4,
    minTankVolumeL: 75,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 12,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Amazon",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A striking blood-red tetra, also sold as the red minor tetra. Keep a big school and avoid long-finned tankmates, as it tends to nip fins.",
  },
  // Sources: fishlore.com/profiles_glowlight_tetra, aquariadise.com/glowlight-tetra, theaquariumwiki.com/wiki/Hemigrammus_erythrozonus
  {
    id: "glowlight-tetra",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 5,
    behavior:
      "A peaceful, gentle shoaling tetra with a glowing orange-red stripe that shows best over dark substrate in a planted, dimly lit tank. Skittish when kept in small numbers.",
    reproduction:
      "Egg-scatterer that needs soft, acidic water to spawn; scatters eggs among fine plants and will eat them afterwards.",
    dimorphism:
      "Subtle; females are slightly larger and rounder-bodied than the slimmer males.",
    commonName: "Glowlight tetra",
    scientificName: "Hemigrammus erythrozonus",
    adultSizeCm: 4,
    minTankVolumeL: 60,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 15,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Guyana",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A peaceful little tetra with a luminous orange-red stripe down a translucent body. Easy to keep and best shown off in a planted blackwater-style tank.",
  },
  // Sources: seriouslyfish.com/species/phenacogrammus-interruptus, aquariumstoredepot.com/blogs/news/congo-tetra, aquariadise.com/congo-tetra
  {
    id: "congo-tetra",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 5,
    behavior:
      "A larger, shimmering African tetra that schools in open mid-water and develops long, flowing fins on mature males. Somewhat skittish, it needs swimming room, subdued light, and a planted retreat.",
    reproduction:
      "Egg-scatterer that spawns in soft, acidic water, scattering eggs over the substrate and plants; not easy to breed at home.",
    dimorphism:
      "Strongly dimorphic: males are larger with iridescent blue-gold-orange bodies and long, wispy grey-white fin extensions; females are smaller and duller.",
    commonName: "Congo tetra",
    scientificName: "Phenacogrammus interruptus",
    adultSizeCm: 8.5,
    adultSizeMinCm: 6,
    minTankVolumeL: 110,
    minFootprintCm: { length: 90, width: 40 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 12,
    tempMinC: 24,
    tempMaxC: 27,
    phMin: 6.0,
    phMax: 7.0,
    origin: "Central Africa",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$$",
    description:
      "A large, iridescent tetra from the Congo basin; mature males trail long, flowing fins. Peaceful but a little shy — give it soft water, a school, and room to swim.",
  },
  // Sources: seriouslyfish.com/species/trichogaster-lalius, aquariumcoop.com/blogs/aquarium/dwarf-gourami, aquadiction.world/species-spotlight/dwarf-gourami
  {
    id: "dwarf-gourami",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 3,
    lifeExpectancyMaxYears: 5,
    behavior:
      "A colourful labyrinth fish that breathes air at the surface and uses thread-like feeler fins to explore. Usually calm, but individuals can be unpredictably territorial, so give it cover and gentle flow.",
    reproduction:
      "Bubble-nest builder; the male builds a floating nest, often among plants, and guards the eggs and fry.",
    dimorphism:
      "Males are larger and brilliantly striped in red and electric blue; females are smaller, plainer, and silvery.",
    commonName: "Dwarf gourami",
    scientificName: "Trichogaster lalius",
    adultSizeCm: 8.5,
    adultSizeMinCm: 6,
    minTankVolumeL: 60,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 1,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 7.5,
    origin: "South Asia",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$$",
    description:
      "A small, vividly coloured gourami for calm community tanks. Generally peaceful but sometimes territorial, and best bought from healthy stock as the species is prone to disease.",
  },
  // Sources: aquariumcoop.com/blogs/aquarium/honey-gourami, en.wikipedia.org/wiki/Honey_gourami, blog.tetra.net honey gourami
  {
    id: "honey-gourami",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 4,
    behavior:
      "One of the most peaceful gouramis — a shy, gentle labyrinth fish that hangs in the upper-middle water and appreciates floating plants, gentle flow, and quiet tankmates.",
    reproduction:
      "Bubble-nest builder; the male constructs a small nest, sometimes anchored to plants, and tends the eggs and fry.",
    dimorphism:
      "Breeding males turn deep honey-orange with a dark blue-black throat and belly; females and non-display males are a plain silvery tan.",
    commonName: "Honey gourami",
    scientificName: "Trichogaster chuna",
    adultSizeCm: 5,
    minTankVolumeL: 40,
    minFootprintCm: { length: 45, width: 25 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 1,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 7.5,
    origin: "South Asia",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A small, gentle gourami that glows honey-orange in breeding colour. Peaceful and undemanding, it's ideal for a calm, planted community tank.",
  },
  // Sources: aquadiction.world/species-spotlight/siamese-fighting-fish, tfhmagazine.com/articles/freshwater/betta-splendens, aqueon.com/resources/care-guides/betta
  {
    id: "betta",
    waterType: "freshwater",
    tankRegion: "top",
    lifeExpectancyYears: 3,
    lifeExpectancyMaxYears: 5,
    behavior:
      "An air-breathing labyrinth fish with huge, flowing fins. Males are highly territorial and flare at rivals — keep only one male per tank, with no fin-nipping or long-finned tankmates, in warm, gently filtered water.",
    reproduction:
      "Bubble-nest builder; the male wraps around the female beneath a floating nest, then collects the eggs and guards the nest and fry alone.",
    dimorphism:
      "Males are large-finned and intensely coloured; females are smaller with much shorter fins and often show a pale ovipositor spot.",
    commonName: "Betta",
    scientificName: "Betta splendens",
    adultSizeCm: 6.5,
    adultSizeMinCm: 5,
    minTankVolumeL: 20,
    minFootprintCm: { length: 40, width: 20 },
    temperament: "aggressive",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 6.5,
    phMax: 7.5,
    origin: "Southeast Asia",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$$",
    description:
      "The Siamese fighting fish — a hardy, warm-water labyrinth fish prized for its flowing fins and bold colours. Keep one male alone; they cannot be housed with other bettas or fin-nippers.",
  },
  // Sources: aquariadise.com/convict-cichlid, aquariumsource.com/convict-cichlid, aquadiction.world/species-spotlight/convict-cichlid
  {
    id: "convict-cichlid",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 8,
    behavior:
      "A bold, hardy Central American cichlid that digs, rearranges decor, and forms strong pair bonds. Extremely territorial when breeding — it will attack fish several times its size, so it is usually kept in a species tank.",
    reproduction:
      "One of the easiest cichlids to breed; a pair spawns on a rock or in a cave and both parents ferociously guard the eggs and fry.",
    dimorphism:
      "Males are larger with longer, pointed dorsal and anal fins; smaller females develop an orange-pink patch on the belly.",
    commonName: "Convict cichlid",
    scientificName: "Amatitlania nigrofasciata",
    adultSizeCm: 13,
    adultSizeMinCm: 8,
    minTankVolumeL: 110,
    minFootprintCm: { length: 90, width: 40 },
    temperament: "aggressive",
    diet: "omnivore",
    minGroupSize: 1,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 6.5,
    phMax: 8.0,
    origin: "Central America",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A black-and-white striped cichlid that is nearly indestructible and breeds at the drop of a hat. Hardy and full of personality, but very aggressive — best kept alone or as a pair.",
  },
  // Sources: seriouslyfish.com/species/pelvicachromis-pulcher, en.aqua-fish.net/fish/kribensis, aquadiction.world/species-spotlight/kribensis-cichlid
  {
    id: "kribensis",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 5,
    behavior:
      "A colourful West African dwarf cichlid that stays near the bottom, sifting substrate and claiming a cave. Peaceful in a community most of the time, but a defensive pair will chase others away from their spawning site.",
    reproduction:
      "Cave spawner; a pair lays eggs inside a cave and both parents guard the wriggling fry — easy and rewarding to breed.",
    dimorphism:
      "Females are smaller but showier when ready to breed, flushing a vivid cherry-red/purple belly; males are larger with more pointed dorsal and tail fins.",
    commonName: "Kribensis",
    scientificName: "Pelvicachromis pulcher",
    adultSizeCm: 10,
    adultSizeMinCm: 7,
    minTankVolumeL: 60,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 1,
    tempMinC: 24,
    tempMaxC: 27,
    phMin: 6.0,
    phMax: 7.5,
    origin: "West Africa",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$$",
    description:
      "A hardy, beautiful dwarf cichlid that's easy to keep and breed. Mostly peaceful, but give it a cave and expect it to defend a territory when spawning.",
  },
  // Sources: seriouslyfish.com/species/mikrogeophagus-altispinosus, en.aqua-fish.net/fish/bolivian-ram, aquadiction.world/species-spotlight/bolivian-ram-cichlid
  {
    id: "bolivian-ram",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 4,
    lifeExpectancyMaxYears: 6,
    behavior:
      "A peaceful, hardy 'butterfly' dwarf cichlid that sifts sand for food and defends only a small territory. Easygoing enough for a calm community, unlike its touchier German blue ram cousin.",
    reproduction:
      "Open/substrate spawner; a pair lays eggs on a cleaned flat rock or leaf and both parents tend the eggs and fry.",
    dimorphism:
      "Difficult to sex; males tend to be a little larger with longer, more extended dorsal- and tail-fin filaments.",
    commonName: "Bolivian ram",
    scientificName: "Mikrogeophagus altispinosus",
    adultSizeCm: 8,
    adultSizeMinCm: 6,
    minTankVolumeL: 75,
    minFootprintCm: { length: 80, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 1,
    tempMinC: 23,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Amazon",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$$",
    description:
      "A hardy, peaceful dwarf cichlid with subtle gold-and-black colours and a constant sand-sifting habit. A great, forgiving first cichlid for a community tank.",
  },
  // Sources: aquariumcoop.com/blogs/aquarium/apistogramma-dwarf-cichlid, aquadiction.world/species-spotlight/cockatoo-dwarf-cichlid, en.aqua-fish.net/fish/cockatoo-dwarf-cichlid
  {
    id: "cockatoo-dwarf-cichlid",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 4,
    behavior:
      "A small, characterful Amazonian dwarf cichlid; males flare large, spiky 'cockatoo' dorsal fins and hold a territory. Mildly territorial — far calmer than big cichlids — and a harem (one male to several females) works well in a planted tank.",
    reproduction:
      "Cave spawner; the female lays eggs in a small cave and fiercely guards the fry while the male patrols the wider territory.",
    dimorphism:
      "Strongly dimorphic: males are much larger and colourful with extended spiky dorsal rays and red-marked tails; females are small and yellow, turning bright yellow with black markings when guarding fry.",
    commonName: "Cockatoo dwarf cichlid",
    scientificName: "Apistogramma cacatuoides",
    adultSizeCm: 8,
    adultSizeMinCm: 5,
    minTankVolumeL: 60,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "semi",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 25,
    tempMaxC: 29,
    phMin: 6.0,
    phMax: 7.0,
    origin: "Amazon",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$$",
    description:
      "The hardiest of the Apistogramma dwarf cichlids; males sport flamboyant spiky fins. Mostly peaceful, it prefers soft, warm water, fine sand, and meaty foods.",
  },
  // Sources: aquariumcoop.com/blogs/aquarium/discus-care-guide, aquariadise.com/discus-fish, theaquariumwiki.com/wiki/Symphysodon_aequifasciatus
  {
    id: "discus",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 8,
    lifeExpectancyMaxYears: 15,
    behavior:
      "The tall, disc-shaped 'king of the aquarium' — a social cichlid kept in groups that needs warm, pristine, soft water. Shy and sensitive to stress and poor water quality, with a pecking order that settles best in a group of five or more.",
    reproduction:
      "Open spawner; a pair lays eggs on a vertical surface and the fry feed on a nutritious mucus secreted from the parents' skin.",
    dimorphism:
      "Very hard to sex; males may be slightly larger with a thicker forehead, but the sexes are reliably told apart only by their breeding tubes when spawning.",
    commonName: "Discus",
    scientificName: "Symphysodon aequifasciatus",
    adultSizeCm: 20,
    adultSizeMinCm: 15,
    minTankVolumeL: 280,
    minFootprintCm: { length: 120, width: 50 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 5,
    tempMinC: 28,
    tempMaxC: 30,
    phMin: 6.0,
    phMax: 7.0,
    origin: "Amazon",
    careLevel: "advanced",
    rarity: "uncommon",
    priceRange: "$$$",
    description:
      "A spectacular, round-bodied Amazonian cichlid and a showpiece for dedicated keepers. It demands a large group, very warm water, and immaculate water quality.",
  },
  // Sources: fishlore.com/profile-bristlenose-pleco, aquariumsource.com/bristlenose-pleco, en.aqua-fish.net/fish/bristlenose-pleco
  {
    id: "bristlenose-pleco",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 7,
    lifeExpectancyMaxYears: 12,
    behavior:
      "A peaceful, mostly nocturnal suckermouth catfish that rasps algae and biofilm off surfaces and driftwood. A great cleanup fish, though mature males get territorial over their favourite caves.",
    reproduction:
      "Cave spawner; the male guards the eggs inside a cave and fans the fry until they are free-swimming. One of the easiest plecos to breed.",
    dimorphism:
      "Males grow long, branching tentacle-like bristles across the snout; females have far shorter bristles confined to the snout edge.",
    commonName: "Bristlenose pleco",
    scientificName: "Ancistrus sp.",
    adultSizeCm: 13,
    minTankVolumeL: 110,
    minFootprintCm: { length: 80, width: 35 },
    temperament: "peaceful",
    diet: "herbivore",
    minGroupSize: 1,
    tempMinC: 20,
    tempMaxC: 27,
    phMin: 6.5,
    phMax: 7.5,
    origin: "South America",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A small, hardy suckermouth pleco and an excellent algae grazer for community tanks. Give it driftwood to rasp on; unlike common plecos it stays a manageable size.",
  },
  // Sources: aquariumcoop.com/blogs/aquarium/otocinclus-catfish, fishkeepingworld.com/otocinclus, aquariumsource.com/otocinclus
  {
    id: "otocinclus",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 5,
    behavior:
      "A tiny, peaceful, social algae-grazer that constantly rasps biofilm from plants and glass. It needs a mature, algae-rich, well-oxygenated tank and the company of its own kind.",
    reproduction:
      "Egg layer that scatters eggs on leaves and glass; breeding is uncommon but does happen in well-established planted tanks.",
    dimorphism:
      "Subtle; seen from above, females are noticeably larger and broader-bodied than the slimmer males.",
    commonName: "Otocinclus",
    scientificName: "Otocinclus sp.",
    adultSizeCm: 4,
    minTankVolumeL: 60,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "herbivore",
    minGroupSize: 6,
    maxGroupSize: 12,
    tempMinC: 21,
    tempMaxC: 26,
    phMin: 6.5,
    phMax: 7.5,
    origin: "South America",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$",
    description:
      "A tiny, peaceful 'dwarf sucker' and one of the best small algae eaters. It needs a mature tank with steady biofilm and a group — it can starve in a brand-new, spotless setup.",
  },
  // Sources: fishlore.com/profile-sterbai-corydoras, aquariumsource.com/sterbai-cory, aquariadise.com/sterbai-cory
  {
    id: "sterbai-cory",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    lifeExpectancyMaxYears: 20,
    behavior:
      "A peaceful, social bottom-dweller that forages the substrate in a busy group and dashes to the surface for gulps of air. It tolerates warmer water than most corys, making it a classic discus tankmate.",
    reproduction:
      "Egg layer; the female carries eggs in a pelvic-fin pouch and sticks them to glass and plants, often after a cool water change.",
    dimorphism:
      "Seen from above, females are noticeably rounder and larger than the slimmer males.",
    commonName: "Sterba's cory",
    scientificName: "Corydoras sterbai",
    adultSizeCm: 6.5,
    minTankVolumeL: 75,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 12,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Amazon",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$$",
    description:
      "A handsome, white-spotted corydoras catfish that's peaceful, hardy, and happiest in a group. It takes warmer water than most corys, so it pairs well with discus and rams.",
  },
  // Sources: aquariadise.com/caresheet-clown-loach-chromobotia-macracanthus, fishkeeper.co.uk clown loach, aquariumlab.co clown loach
  {
    id: "clown-loach",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 20,
    lifeExpectancyMaxYears: 40,
    behavior:
      "A social, playful bottom loach that clicks audibly, 'plays dead', and hunts snails. Often sold tiny, it grows very large and lives for decades, so it needs a big tank, a group of five or more, smooth sand, and plenty of caves.",
    reproduction:
      "A migratory egg layer in the wild; essentially never bred in home aquariums, so almost all stock is wild-caught or commercially hormone-induced.",
    dimorphism:
      "Hard to sex; mature females tend to be plumper, and the tips of the tail fin differ subtly between the sexes.",
    commonName: "Clown loach",
    scientificName: "Chromobotia macracanthus",
    adultSizeCm: 30,
    adultSizeMinCm: 20,
    minTankVolumeL: 450,
    minFootprintCm: { length: 150, width: 60 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 5,
    maxGroupSize: 10,
    tempMinC: 25,
    tempMaxC: 30,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Southeast Asia",
    careLevel: "advanced",
    rarity: "common",
    priceRange: "$$",
    description:
      "A boldly striped, sociable loach full of personality — but it reaches 30 cm, lives for decades, and needs a large tank and a group. A long-term commitment despite how it's sold as a cute juvenile.",
  },
  // Sources: seriouslyfish.com/species/melanotaenia-boesemani, aquariumcoop.com/blogs/aquarium/boesemani-rainbowfish, fishkeepingworld.com/boesemani-rainbow
  {
    id: "boesemani-rainbowfish",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 5,
    lifeExpectancyMaxYears: 8,
    behavior:
      "An active, peaceful schooling rainbowfish with a striking split blue-and-orange body. Males colour up and display constantly to one another, so it needs swimming length, hard alkaline water, and a good-sized group to look its best.",
    reproduction:
      "Continuous egg-scatterer that deposits adhesive eggs among fine-leaved plants or spawning mops over several days; the eggs hatch in one to two weeks.",
    dimorphism:
      "Males are larger, deeper-bodied, and far more vivid — blue at the front, orange at the rear; females are slimmer and a plain silvery-olive.",
    commonName: "Boeseman's rainbowfish",
    scientificName: "Melanotaenia boesemani",
    adultSizeCm: 10,
    adultSizeMinCm: 8,
    minTankVolumeL: 110,
    minFootprintCm: { length: 120, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 10,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 7.0,
    phMax: 8.0,
    origin: "New Guinea",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$$",
    description:
      "A hardy, dazzling rainbowfish whose front half glows blue-purple and rear half blazes orange. Active and peaceful — give it a long tank, hard alkaline water, and a school to bring out the colour.",
  },

  // ── Polypteridae (bichirs & ropefish) ────────────────────────────────────

  // Sources: seriouslyfish.com/species/polypterus-senegalus, fishbase.org/summary/Polypterus-senegalus.html, aquariumsource.com/senegal-bichir
  {
    id: "senegal-bichir",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    lifeExpectancyMaxYears: 15,
    behavior:
      "The most beginner-friendly bichir — hardy, curious, and slower to outgrow a tank than most relatives. Nocturnal ambush hunter that gulps air from the surface. Peaceful with fish too large to swallow; anything smaller disappears.",
    reproduction:
      "Egg scatterer; males wrap their anal and caudal fins around the female to fertilize eggs. Rarely achieved in home aquaria.",
    dimorphism:
      "Males have a broader, bushier anal fin. Otherwise difficult to sex until mature.",
    commonName: "Senegal bichir",
    scientificName: "Polypterus senegalus",
    adultSizeCm: 40,
    adultSizeMinCm: 30,
    minTankVolumeL: 200,
    minFootprintCm: { length: 120, width: 45 },
    temperament: "predatory",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 24,
    tempMaxC: 30,
    phMin: 6.5,
    phMax: 7.8,
    origin: "West Africa",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "The entry-level bichir — grey-green, eel-like, and surprisingly personable. It breathes air, can survive short trips out of water, and accepts most meaty foods. Keep the tank tightly covered; it will escape any gap.",
  },
  // Sources: seriouslyfish.com/species/polypterus-ornatipinnis, fishbase.org/summary/Polypterus-ornatipinnis.html, practicalfishkeeping.co.uk/features/polypterus-ornatipinnis
  {
    id: "ornate-bichir",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    lifeExpectancyMaxYears: 15,
    behavior:
      "A striking, reticulated bichir and one of the most popular in the trade. Bolder and more active than many relatives. Predatory — will consume fish small enough to fit in its mouth. Generally tolerant of conspecifics in a large tank.",
    reproduction:
      "Egg scatterer; spawning infrequently reported in captivity. Conditioning with live or frozen foods and a slight temperature rise can trigger breeding.",
    dimorphism:
      "Males develop a noticeably wider, paddle-like anal fin at maturity.",
    commonName: "Ornate bichir",
    scientificName: "Polypterus ornatipinnis",
    adultSizeCm: 60,
    adultSizeMinCm: 45,
    minTankVolumeL: 450,
    minFootprintCm: { length: 150, width: 60 },
    temperament: "predatory",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 26,
    tempMaxC: 30,
    phMin: 6.5,
    phMax: 7.5,
    origin: "Central Africa (Congo)",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "One of the most beautiful bichirs — a deep black-and-yellow reticulated pattern covers the whole body. Needs a spacious, tightly lidded tank with meaty foods. A showpiece predator for large community setups.",
  },
  // Sources: seriouslyfish.com/species/polypterus-endlicheri-endlicheri, fishbase.org/summary/Polypterus-endlicheri.html, tfhmagazine.com/details/articles/the-genus-polypterus
  {
    id: "endlicheri-bichir",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    lifeExpectancyMaxYears: 20,
    behavior:
      "A large, thick-bodied bichir with a distinctive saddled pattern. Sluggish by day, active at dusk. Can be aggressive toward smaller bichirs but generally peaceable with similar-sized tank mates it cannot eat.",
    reproduction:
      "Egg scatterer; rarely bred in captivity. Conditioning with high-protein live foods increases spawning likelihood.",
    dimorphism:
      "Males possess a distinctly wider, more paddle-shaped anal fin.",
    commonName: "Endlicheri bichir",
    scientificName: "Polypterus endlicheri",
    adultSizeCm: 75,
    adultSizeMinCm: 60,
    minTankVolumeL: 600,
    minFootprintCm: { length: 180, width: 60 },
    temperament: "predatory",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 26,
    tempMaxC: 30,
    phMin: 6.5,
    phMax: 7.8,
    origin: "West Africa",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "A large, powerfully built bichir with a dark-banded saddled pattern. Requires a very spacious, well-covered tank and a diet of meaty foods. Long-lived and rewarding for dedicated keepers.",
  },
  // Sources: seriouslyfish.com/species/polypterus-lapradei, fishbase.org/summary/Polypterus-lapradei.html, aquaticcommunity.com/polypterus/lapradei.php
  {
    id: "lapradei-bichir",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    lifeExpectancyMaxYears: 20,
    behavior:
      "One of the largest bichirs in the trade; a slow-moving, bottom-dwelling predator. Generally tolerant of other large fish but will eat anything that fits in its substantial mouth.",
    reproduction:
      "Egg scatterer. Captive breeding is rare; conditioning with varied live and frozen prey is the best approach.",
    dimorphism:
      "Males have a broader anal fin; otherwise sexing is difficult outside breeding condition.",
    commonName: "Lapradei bichir",
    scientificName: "Polypterus lapradei",
    adultSizeCm: 90,
    adultSizeMinCm: 70,
    minTankVolumeL: 800,
    minFootprintCm: { length: 200, width: 60 },
    temperament: "predatory",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 26,
    tempMaxC: 30,
    phMin: 6.5,
    phMax: 7.8,
    origin: "West Africa",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "A giant among bichirs — needs a very large tank, a tight-fitting lid, and meaty whole-prey foods. Impressive and long-lived, but only suitable for dedicated fishkeepers with the space for a species of this size.",
  },
  // Sources: seriouslyfish.com/species/polypterus-polli, fishbase.org/summary/Polypterus-polli.html, aquariumglaser.de
  {
    id: "polli-bichir",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    lifeExpectancyMaxYears: 15,
    behavior:
      "A smaller, more slender bichir than most. Active at twilight and night; spends days sheltering under wood or rocks. Can coexist with same-size tankmates it cannot eat, but remains predatory by nature.",
    reproduction:
      "Egg scatterer; rarely bred in home aquaria.",
    dimorphism:
      "Males have a broader anal fin. Females are slightly fuller-bodied when gravid.",
    commonName: "Polli bichir",
    scientificName: "Polypterus polli",
    adultSizeCm: 35,
    adultSizeMinCm: 28,
    minTankVolumeL: 200,
    minFootprintCm: { length: 120, width: 45 },
    temperament: "predatory",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Central Africa (Congo)",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "A modestly sized, slender bichir from the Congo basin. Less commonly available than Senegal or Ornate bichirs but manageable in a 200 L setup. Needs a tight lid, meaty foods, and peaceful tankmates it cannot swallow.",
  },
  // Sources: seriouslyfish.com/species/polypterus-palmas-palmas, fishbase.org/summary/Polypterus-palmas.html, theaquariumwiki.com/wiki/Polypterus_palmas
  {
    id: "palmas-bichir",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 8,
    lifeExpectancyMaxYears: 12,
    behavior:
      "One of the smaller and more manageable bichirs. Active and inquisitive compared to its larger relatives. Tolerates a wider range of water chemistry than most polypterids. Still predatory — small fish will be eaten.",
    reproduction:
      "Egg scatterer. Captive spawning occasionally reported with conditioning and a slight temperature increase.",
    dimorphism:
      "Males develop a wider anal fin at maturity.",
    commonName: "Palmas bichir",
    scientificName: "Polypterus palmas",
    adultSizeCm: 30,
    adultSizeMinCm: 23,
    minTankVolumeL: 150,
    minFootprintCm: { length: 100, width: 40 },
    temperament: "predatory",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 24,
    tempMaxC: 30,
    phMin: 6.0,
    phMax: 8.0,
    origin: "West Africa",
    careLevel: "beginner",
    rarity: "uncommon",
    priceRange: "$",
    description:
      "One of the more forgiving bichirs for new keepers — smaller, tolerant of a broad pH range, and comfortable in a 150 L tank. Several subspecies exist with slightly different patterning. Cover the tank: it escapes any opening.",
  },
  // Sources: seriouslyfish.com/species/polypterus-weeksii, fishbase.org/summary/Polypterus-weeksii.html, practicalfishkeeping.co.uk
  {
    id: "weeksii-bichir",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 12,
    lifeExpectancyMaxYears: 20,
    behavior:
      "A large, robust bichir with a distinctive deeply-lobed dorsal fin ray pattern. Slow, deliberate mover by day; active hunter at night. Predatory toward anything swallowable; otherwise tolerant of tank mates of similar size.",
    reproduction:
      "Egg scatterer. Rarely bred in captivity; requires very large conditioning tanks.",
    dimorphism:
      "Males have a characteristically wider anal fin.",
    commonName: "Weeksii bichir",
    scientificName: "Polypterus weeksii",
    adultSizeCm: 90,
    adultSizeMinCm: 75,
    minTankVolumeL: 750,
    minFootprintCm: { length: 200, width: 60 },
    temperament: "predatory",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 26,
    tempMaxC: 30,
    phMin: 6.5,
    phMax: 7.5,
    origin: "Central Africa (Congo)",
    careLevel: "advanced",
    rarity: "rare",
    priceRange: "$$$",
    description:
      "A massive, impressive bichir for specialist keepers only. Its deeply-notched dorsal finlets are distinctive among the family. Requires an enormous, tightly lidded tank and regular large meaty meals. Not a fish for an average setup.",
  },
  // Sources: seriouslyfish.com/species/polypterus-retropinnis, fishbase.org/summary/Polypterus-retropinnis.html, aquariumglaser.de
  {
    id: "retropinnis-bichir",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 8,
    lifeExpectancyMaxYears: 15,
    behavior:
      "A slender, medium-sized bichir with the dorsal finlets set unusually far back — giving it a different silhouette from most relatives. Nocturnal and predatory; calm by day in suitable hiding spots.",
    reproduction:
      "Egg scatterer; captive breeding uncommonly reported.",
    dimorphism:
      "Males have a broader anal fin.",
    commonName: "Retropinnis bichir",
    scientificName: "Polypterus retropinnis",
    adultSizeCm: 35,
    adultSizeMinCm: 28,
    minTankVolumeL: 200,
    minFootprintCm: { length: 120, width: 45 },
    temperament: "predatory",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Central Africa (Congo)",
    careLevel: "intermediate",
    rarity: "rare",
    priceRange: "$$",
    description:
      "An unusual bichir whose dorsal finlets start very close to the tail, giving it a distinctively sleek profile. Less commonly available than most bichirs. Care is the same as its relatives — meaty food, tight lid, adequate space.",
  },
  // Sources: seriouslyfish.com/species/polypterus-ansorgii, fishbase.org/summary/Polypterus-ansorgii.html, aquariumglaser.de
  {
    id: "ansorgii-bichir",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    lifeExpectancyMaxYears: 18,
    behavior:
      "A mid-sized bichir that tends to be more active than the very large species. Predatory and nocturnal; will eat small fish. Less frequently offered in shops than senegalus or ornatipinnis, making it a collector's fish.",
    reproduction:
      "Egg scatterer; rarely bred in captivity.",
    dimorphism:
      "Males have a noticeably wider anal fin.",
    commonName: "Ansorgii bichir",
    scientificName: "Polypterus ansorgii",
    adultSizeCm: 55,
    adultSizeMinCm: 42,
    minTankVolumeL: 400,
    minFootprintCm: { length: 150, width: 55 },
    temperament: "predatory",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 26,
    tempMaxC: 30,
    phMin: 6.5,
    phMax: 7.5,
    origin: "West Africa",
    careLevel: "intermediate",
    rarity: "rare",
    priceRange: "$$$",
    description:
      "A seldom-seen bichir that commands a premium in the hobby. Care mirrors other polypterids — a large, covered tank with meaty foods and good filtration. Appeals to collectors who want something different from the standard senegalus.",
  },
  // Sources: seriouslyfish.com/species/polypterus-bichir, fishbase.org/summary/Polypterus-bichir.html, aquaticsource.net
  {
    id: "nile-bichir",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    lifeExpectancyMaxYears: 20,
    behavior:
      "The type species of the genus and one of the largest. Powerful, slow, nocturnal predator. Tolerates conspecifics in large tanks but any fish small enough to swallow will be eaten.",
    reproduction:
      "Egg scatterer; captive breeding very rarely reported. Requires very large tanks and conditioning with live prey.",
    dimorphism:
      "Males have a wider, paddle-like anal fin.",
    commonName: "Nile bichir",
    scientificName: "Polypterus bichir",
    adultSizeCm: 72,
    adultSizeMinCm: 60,
    minTankVolumeL: 600,
    minFootprintCm: { length: 180, width: 60 },
    temperament: "predatory",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 26,
    tempMaxC: 30,
    phMin: 6.5,
    phMax: 8.0,
    origin: "East Africa",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "The original bichir — large, long-lived, and historically fascinating as one of the most primitive ray-finned fish. Needs a very spacious, tightly covered tank. Feed meaty foods like earthworms, whole fish, and shrimp.",
  },
  // Sources: seriouslyfish.com/species/erpetoichthys-calabaricus, fishbase.org/summary/Erpetoichthys-calabaricus.html, fishkeepingworld.com/rope-fish
  {
    id: "ropefish",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    lifeExpectancyMaxYears: 15,
    behavior:
      "A serpentine, snake-like polypterid that is more active than true bichirs. Social and best kept in a group; lone individuals tend to hide constantly. Strongly nocturnal. Will eat small fish and shrimp. Famous escape artist — any gap is a door.",
    reproduction:
      "Reportedly egg scatters in dense vegetation; captive breeding is extremely rare.",
    dimorphism:
      "Males have more dorsal finlets (9–14) than females (7–9).",
    commonName: "Ropefish",
    scientificName: "Erpetoichthys calabaricus",
    adultSizeCm: 37,
    minTankVolumeL: 150,
    minFootprintCm: { length: 100, width: 40 },
    temperament: "semi",
    diet: "carnivore",
    minGroupSize: 2,
    maxGroupSize: 6,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 7.5,
    origin: "West Africa",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$",
    description:
      "A living rope with fins — long, olive-green, and endlessly curious. Not a true bichir but in the same family. Peaceful with fish too large to swallow, and surprisingly social with others of its kind. Cover every millimetre of the tank lid.",
  },

  // ── Killifish ────────────────────────────────────────────────────────────

  // Sources: seriouslyfish.com/species/aphyosemion-australe, fishbase.org/summary/Aphyosemion-australe.html, killifish.org/species/australe
  {
    id: "lyretail-killifish",
    waterType: "freshwater",
    tankRegion: "top",
    lifeExpectancyYears: 3,
    lifeExpectancyMaxYears: 5,
    behavior:
      "A peaceful, colourful surface-dweller that pairs well with small community fish. Males display and occasionally spar but rarely cause injury. Best kept as a pair or trio (one male, two females) in a planted, tightly covered tank.",
    reproduction:
      "A non-annual plant spawner; deposits adhesive eggs on fine-leaved plants or spawning mops over weeks. Eggs can be pulled and hatched separately. Fry are tiny and need infusoria or micro-worms initially.",
    dimorphism:
      "Males are brilliantly coloured with elongated lyrate caudal fin extensions; females are plain brown with a rounded tail.",
    commonName: "Lyretail killifish",
    scientificName: "Aphyosemion australe",
    adultSizeCm: 6,
    adultSizeMinCm: 4,
    minTankVolumeL: 40,
    minFootprintCm: { length: 45, width: 30 },
    temperament: "peaceful",
    diet: "carnivore",
    minGroupSize: 2,
    tempMinC: 20,
    tempMaxC: 26,
    phMin: 6.0,
    phMax: 7.5,
    origin: "West Africa",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "One of the most beginner-friendly killifish — stunning red-spotted orange-brown colouring on the male, a manageable size, and forgiving water requirements. Does best in a soft, slightly acidic, heavily planted nano tank with a tight lid.",
  },
  // Sources: seriouslyfish.com/species/fundulopanchax-gardneri, fishbase.org/summary/Fundulopanchax-gardneri.html, thekillifish.net
  {
    id: "steel-blue-killifish",
    waterType: "freshwater",
    tankRegion: "top",
    lifeExpectancyYears: 3,
    lifeExpectancyMaxYears: 4,
    behavior:
      "Hardy and slightly more robust than many killifish; tolerates a range of water conditions. Males are active and will display to each other but rarely cause serious injury. Can be kept in a community with similarly-sized peaceful fish.",
    reproduction:
      "Plant spawner; deposits eggs on spawning mops or fine plants. Eggs hatch in 14–21 days at 24 °C. Multiple females reduce male pressure.",
    dimorphism:
      "Males are vivid blue-green with red spots; females are plain olive-brown.",
    commonName: "Steel-blue killifish",
    scientificName: "Fundulopanchax gardneri",
    adultSizeCm: 6,
    adultSizeMinCm: 4.5,
    minTankVolumeL: 40,
    minFootprintCm: { length: 45, width: 30 },
    temperament: "peaceful",
    diet: "carnivore",
    minGroupSize: 2,
    tempMinC: 22,
    tempMaxC: 26,
    phMin: 6.0,
    phMax: 7.5,
    origin: "West Africa",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "One of the most widely kept and easiest killifish — the electric-blue male with red spotting is striking, and it tolerates harder water than many relatives. Good starting point for anyone curious about the killifish hobby.",
  },
  // Sources: seriouslyfish.com/species/epiplatys-annulatus, fishbase.org/summary/Epiplatys-annulatus.html, killiesource.com
  {
    id: "clown-killifish",
    waterType: "freshwater",
    tankRegion: "top",
    lifeExpectancyYears: 3,
    behavior:
      "A tiny, surface-hugging killifish. Males display their striking banded-and-fan-tail pattern to females and rivals. Best in a species tank or nano community with equally small fish; larger tank mates will outcompete it for food.",
    reproduction:
      "Plant spawner; lays single eggs on floating plants or under surface vegetation. Fry are very small — first food is infusoria or commercial micro fry food.",
    dimorphism:
      "Males have a vivid fan-shaped caudal fin in blue, orange and red; females have a plain rounded tail.",
    commonName: "Clown killifish",
    scientificName: "Pseudepiplatys annulatus",
    adultSizeCm: 3.5,
    adultSizeMinCm: 2.5,
    minTankVolumeL: 20,
    minFootprintCm: { length: 30, width: 25 },
    temperament: "peaceful",
    diet: "carnivore",
    minGroupSize: 4,
    maxGroupSize: 10,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 5.5,
    phMax: 7.5,
    origin: "West Africa",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$",
    description:
      "A jewel-box fish for nano tanks — horizontal black bands on the body and a spectacular fan tail on the male make it one of the most striking small fish available. Peaceful and ideal for a heavily planted micro-community.",
  },
  // Sources: seriouslyfish.com/species/aplocheilus-lineatus, fishbase.org/summary/Aplocheilus-lineatus.html, aquariumsource.com/striped-panchax
  {
    id: "striped-panchax",
    waterType: "freshwater",
    tankRegion: "top",
    lifeExpectancyYears: 3,
    lifeExpectancyMaxYears: 5,
    behavior:
      "A larger, more predatory killifish — will eat anything that fits in its mouth, including guppy fry and small neon tetras. Surface-oriented and bold; makes an active display fish but must be kept with fish of similar or larger size.",
    reproduction:
      "Plant spawner; deposits adhesive eggs in floating plants or mops over several weeks. Eggs hatch in 12–14 days.",
    dimorphism:
      "Males are more colourful with yellow-green iridescent scaling and a lyre-shaped caudal fin; females are plainer and fuller-bodied.",
    commonName: "Striped panchax",
    scientificName: "Aplocheilus lineatus",
    adultSizeCm: 10,
    adultSizeMinCm: 7,
    minTankVolumeL: 80,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "semi",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 7.5,
    origin: "South Asia",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$",
    description:
      "A classic Asian killifish with strong surface presence and a golden body with iridescent rows of scales. Hardy and undemanding, but predatory toward small fish. Works well as a surface-layer species in a medium community.",
  },

  // ── Freshwater puffers ────────────────────────────────────────────────────

  // Sources: seriouslyfish.com/species/carinotetraodon-travancoricus, fishbase.org/summary/Carinotetraodon-travancoricus.html, aquariumcoop.com/blogs/aquarium/pea-puffer-fish
  {
    id: "pea-puffer",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 3,
    lifeExpectancyMaxYears: 5,
    behavior:
      "Tiny but feisty — the world's smallest pufferfish, with a huge personality. Males are territorial and will nip fins of slow-moving tank mates. Best in a densely planted species tank or with fast-swimming, short-finned companions. Eats snails, which keeps populations in check.",
    reproduction:
      "Egg depositor; male guards eggs laid on plants or substrate. Breeding in captivity has been achieved with careful conditioning.",
    dimorphism:
      "Males show a distinct dark ventral stripe and iridescent eye rings; females are rounder, plainer, and often spotted on the belly.",
    commonName: "Pea puffer",
    scientificName: "Carinotetraodon travancoricus",
    adultSizeCm: 2.5,
    minTankVolumeL: 40,
    minFootprintCm: { length: 40, width: 30 },
    temperament: "semi",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 6.5,
    phMax: 8.0,
    origin: "South Asia",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$",
    description:
      "The world's smallest puffer — barely 2.5 cm but packed with attitude. An entertaining, intelligent fish that recognises its keeper and actively hunts snails. Keep heavily planted to break sight lines and reduce aggression.",
  },
  // Sources: seriouslyfish.com/species/colomesus-asellus, fishbase.org/summary/Colomesus-asellus.html, aquariumsource.com/amazon-puffer
  {
    id: "south-american-puffer",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 5,
    lifeExpectancyMaxYears: 10,
    behavior:
      "Unusually for a puffer, this species is schooling — it should be kept in groups and is substantially more peaceful than most relatives. Active, constantly swimming. Still needs hard food (snails, shellfish) to wear down ever-growing teeth.",
    reproduction:
      "Rarely bred in captivity; little documented in the hobby.",
    dimorphism:
      "Not reliably distinguishable externally.",
    commonName: "South American puffer",
    scientificName: "Colomesus asellus",
    adultSizeCm: 8,
    minTankVolumeL: 80,
    minFootprintCm: { length: 80, width: 35 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 3,
    maxGroupSize: 8,
    tempMinC: 23,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 7.5,
    origin: "South America",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "The friendliest puffer in the hobby — schools like a tetra, ignores tank mates, and is far less belligerent than its relatives. Needs snails or shellfish regularly to prevent overgrown teeth. A surprisingly community-compatible puffer.",
  },
  // Sources: seriouslyfish.com/species/tetraodon-miurus, fishbase.org/summary/Tetraodon-miurus.html, aquaticquotient.com
  {
    id: "congo-puffer",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    behavior:
      "An ambush predator that buries itself in substrate until only its upturned eyes are visible, then lunges at passing fish. Aggressive and highly predatory — best as a species-only or single-specimen fish. Not a community fish under any circumstances.",
    reproduction:
      "Rarely documented in captivity.",
    dimorphism:
      "Not reliably distinguishable externally; females may be slightly fuller-bodied.",
    commonName: "Congo puffer",
    scientificName: "Tetraodon miurus",
    adultSizeCm: 15,
    minTankVolumeL: 120,
    minFootprintCm: { length: 80, width: 40 },
    temperament: "predatory",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 6.5,
    phMax: 7.5,
    origin: "Central Africa (Congo)",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "A bizarre ambush specialist that buries in sand and waits for prey to swim overhead. Changes colour to match substrate. Fascinating to observe but exclusively a solitary predator — it will eat any fish it can fit in its mouth.",
  },
  // Sources: seriouslyfish.com/species/tetraodon-mbu, fishbase.org/summary/Tetraodon-mbu.html, fishkeepingworld.com/mbu-puffer-fish
  {
    id: "mbu-puffer",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 10,
    lifeExpectancyMaxYears: 20,
    behavior:
      "The largest strictly freshwater puffer — intelligent, interactive, and highly aggressive toward fish and decorations alike. Best kept as a solitary specimen. Recognises its keeper and can become hand-tame, but will bite hard if provoked.",
    reproduction:
      "Not documented in the hobby.",
    dimorphism:
      "Not reliably distinguishable.",
    commonName: "MBU puffer",
    scientificName: "Tetraodon mbu",
    adultSizeCm: 67,
    adultSizeMinCm: 50,
    minTankVolumeL: 1000,
    minFootprintCm: { length: 240, width: 80 },
    temperament: "predatory",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 7.0,
    phMax: 8.0,
    origin: "Central Africa (Congo)",
    careLevel: "advanced",
    rarity: "uncommon",
    priceRange: "$$$",
    description:
      "The giant of freshwater puffers — interactive, intelligent, and grows to 67 cm. Requires a truly enormous tank and a powerful filter. Eats hard-shelled prey to keep ever-growing teeth trimmed. A long-term commitment for serious fishkeepers only.",
  },

  // ── Gobies & gudgeons ─────────────────────────────────────────────────────

  // Sources: seriouslyfish.com/species/tateurndina-ocellicauda, fishbase.org/summary/Tateurndina-ocellicauda.html, aquariumcoop.com/blogs/aquarium/peacock-gudgeon
  {
    id: "peacock-gudgeon",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 4,
    lifeExpectancyMaxYears: 5,
    behavior:
      "A gem of a small fish — peaceful, colourful, and easy to breed. Males establish small territories around cave-like hiding spots and display to females constantly. Best in a nano tank with similar-sized peaceful companions.",
    reproduction:
      "Caves spawner; male guards egg clusters in a cave or PVC tube. Fry are free-swimming after a few days and accept micro foods immediately.",
    dimorphism:
      "Males have a distinct nuchal hump on the forehead and more vivid colouration; females are smaller and plumper when gravid.",
    commonName: "Peacock gudgeon",
    scientificName: "Tateurndina ocellicauda",
    adultSizeCm: 7,
    adultSizeMinCm: 5,
    minTankVolumeL: 40,
    minFootprintCm: { length: 45, width: 30 },
    temperament: "peaceful",
    diet: "carnivore",
    minGroupSize: 2,
    maxGroupSize: 8,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 6.5,
    phMax: 7.5,
    origin: "New Guinea",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A jewel from Papua New Guinea — pink-and-blue iridescent scales, a bold ocellus on the tail, and an easy-going temperament. Readily bred in captivity, tolerant of a range of water chemistry, and perfect for a planted nano tank.",
  },
  // Sources: seriouslyfish.com/species/brachygobius-xanthomelas, fishbase.org/summary/Brachygobius-xanthomelas.html, aquaticarts.com/bumblebee-goby
  {
    id: "bumblebee-goby",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 3,
    lifeExpectancyMaxYears: 4,
    behavior:
      "A tiny, bold goby that perches on the substrate and hops between surfaces. Can be kept in freshwater but does better with a slight salt addition (brackish-tolerant). Males are territorial toward each other; fine in groups with sufficient hiding spots. Fussy eater — usually refuses dry food.",
    reproduction:
      "Cave spawner; male guards eggs under a flat stone or in a cave. Fry are tiny and need live micro foods.",
    dimorphism:
      "Males are slimmer and more intensely banded; females are rounder when gravid.",
    commonName: "Bumblebee goby",
    scientificName: "Brachygobius xanthomelas",
    adultSizeCm: 4,
    minTankVolumeL: 40,
    minFootprintCm: { length: 40, width: 25 },
    temperament: "semi",
    diet: "carnivore",
    minGroupSize: 4,
    maxGroupSize: 10,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 7.0,
    phMax: 8.5,
    origin: "Southeast Asia",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$",
    description:
      "A bold, yellow-and-black striped miniature goby. Fascinating to watch as it perches and hops about the substrate. Needs live or frozen foods and appreciates a small salt addition. Best in a brackish nano species tank.",
  },

  // ── Spiny eels ───────────────────────────────────────────────────────────

  // Sources: seriouslyfish.com/species/mastacembelus-erythrotaenia, fishbase.org/summary/Mastacembelus-erythrotaenia.html, fishkeepingworld.com/fire-eel
  {
    id: "fire-eel",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    lifeExpectancyMaxYears: 20,
    behavior:
      "A spectacular spiny eel with vivid red-orange lateral stripe and spots. Nocturnal and secretive during the day, but becomes bolder over time. Peaceful toward fish too large to swallow; will eat small fish and invertebrates. Escapes through any gap.",
    reproduction:
      "Not documented in the hobby.",
    dimorphism:
      "Females are typically larger and fuller-bodied.",
    commonName: "Fire eel",
    scientificName: "Mastacembelus erythrotaenia",
    adultSizeCm: 100,
    adultSizeMinCm: 75,
    minTankVolumeL: 450,
    minFootprintCm: { length: 150, width: 60 },
    temperament: "semi",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 6.5,
    phMax: 7.5,
    origin: "Southeast Asia",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "One of the most visually striking freshwater fish available — a long, serpentine body traced with vivid red and orange lines. Needs a deep sand substrate to burrow in, a very secure lid, and a large tank. Worth every bit of the effort.",
  },
  // Sources: seriouslyfish.com/species/macrognathus-siamensis, fishbase.org/summary/Macrognathus-siamensis.html, theaquariumwiki.com/wiki/Macrognathus_siamensis
  {
    id: "peacock-spiny-eel",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 8,
    lifeExpectancyMaxYears: 12,
    behavior:
      "A smaller, more manageable spiny eel. Peaceful toward fish that are too large to eat; will consume small shrimp and tiny fish. Likes to burrow in soft substrate and wedge into crevices. Nocturnal but can be trained to feed during the day.",
    reproduction:
      "Rarely bred in captivity; eggs have been reported scattered among plants.",
    dimorphism:
      "Females are generally larger and more robust.",
    commonName: "Peacock spiny eel",
    scientificName: "Macrognathus siamensis",
    adultSizeCm: 30,
    adultSizeMinCm: 20,
    minTankVolumeL: 110,
    minFootprintCm: { length: 90, width: 40 },
    temperament: "peaceful",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 6.5,
    phMax: 7.5,
    origin: "Southeast Asia",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$",
    description:
      "A popular and more beginner-accessible spiny eel with distinctive eye-spots along its dorsal edge. Adapts to captivity better than larger relatives and fits in a 90 cm tank. Needs a soft sand substrate for burrowing and a tight lid.",
  },
  // Sources: seriouslyfish.com/species/mastacembelus-armatus, fishbase.org/summary/Mastacembelus-armatus.html, aquariumsource.com/tire-track-eel
  {
    id: "tire-track-eel",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    lifeExpectancyMaxYears: 18,
    behavior:
      "A large, patterned spiny eel named for the Y-shaped markings along its body. Nocturnal and secretive; spends much of the day buried in substrate. Peaceful toward fish it cannot eat, but small fish and shrimp will disappear. Escape-prone.",
    reproduction:
      "Rarely if ever bred in captivity.",
    dimorphism:
      "Females tend to be larger and heavier-bodied at maturity.",
    commonName: "Tire track eel",
    scientificName: "Mastacembelus armatus",
    adultSizeCm: 90,
    adultSizeMinCm: 60,
    minTankVolumeL: 400,
    minFootprintCm: { length: 150, width: 55 },
    temperament: "semi",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 6.5,
    phMax: 7.5,
    origin: "Southeast Asia",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "A large, beautifully patterned spiny eel for a spacious, sandy-floored tank. Feeds on worms, shrimp, and small fish; best with tankmates large enough not to be eaten. Secure every lid gap — they escape with ease.",
  },

  // ── Hatchetfish ──────────────────────────────────────────────────────────

  // Sources: seriouslyfish.com/species/carnegiella-strigata, fishbase.org/summary/Carnegiella-strigata.html, aquariumcoop.com/blogs/aquarium/marble-hatchetfish
  {
    id: "marbled-hatchetfish",
    waterType: "freshwater",
    tankRegion: "top",
    lifeExpectancyYears: 3,
    lifeExpectancyMaxYears: 5,
    behavior:
      "A true surface fish — hatchetfish never swim down to mid-water. They school tightly just under the surface and will jump when startled. The marbled pattern provides camouflage against rippled surface light. Keep in groups of 6+ with a very tight lid.",
    reproduction:
      "Rarely bred in captivity; eggs scattered among floating plants.",
    dimorphism:
      "Females are slightly fuller-bodied when viewed from above.",
    commonName: "Marbled hatchetfish",
    scientificName: "Carnegiella strigata",
    adultSizeCm: 3.5,
    minTankVolumeL: 50,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "carnivore",
    minGroupSize: 6,
    maxGroupSize: 20,
    tempMinC: 23,
    tempMaxC: 28,
    phMin: 5.5,
    phMax: 7.0,
    origin: "South America",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$",
    description:
      "A tiny, deep-keeled fish that lives its entire life right at the surface, where it hunts insects. Soft, acidic water and a very tight lid are essential — they can clear the water surface with a powerful leap. Excellent for filling the top layer of an Amazonian biotope.",
  },
  // Sources: seriouslyfish.com/species/gasteropelecus-sternicla, fishbase.org/summary/Gasteropelecus-sternicla.html, aquariumsource.com/silver-hatchetfish
  {
    id: "silver-hatchetfish",
    waterType: "freshwater",
    tankRegion: "top",
    lifeExpectancyYears: 3,
    lifeExpectancyMaxYears: 5,
    behavior:
      "The larger of the two commonly kept hatchetfish. Schools at the surface; will jump if startled or if water quality is poor. Peaceful with all tank mates. Needs floating plants to feel secure. Sensitive to ammonia — best with a mature filter.",
    reproduction:
      "Rarely bred in captivity.",
    dimorphism:
      "Females are slightly deeper-bodied.",
    commonName: "Silver hatchetfish",
    scientificName: "Gasteropelecus sternicla",
    adultSizeCm: 6,
    minTankVolumeL: 80,
    minFootprintCm: { length: 80, width: 35 },
    temperament: "peaceful",
    diet: "carnivore",
    minGroupSize: 6,
    maxGroupSize: 20,
    tempMinC: 23,
    tempMaxC: 28,
    phMin: 5.5,
    phMax: 7.5,
    origin: "South America",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$",
    description:
      "A classic surface schooler with a chrome-silver body and sharp keel. Fills the surface layer of a South American community beautifully. Tight lid mandatory. Keep ammonia at zero — they show water quality problems quickly.",
  },

  // ── Pencilfish ────────────────────────────────────────────────────────────

  // Sources: seriouslyfish.com/species/nannostomus-beckfordi, fishbase.org/summary/Nannostomus-beckfordi.html, aquariumglaser.de/en/fish-archives/nannostomus-beckfordi
  {
    id: "beckfords-pencilfish",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 3,
    lifeExpectancyMaxYears: 5,
    behavior:
      "The most robust and beginner-friendly pencilfish. Schools loosely in mid-water; males display to each other with spread fins but rarely cause injury. Compatible with small peaceful community fish. Will nip very long fins on slow fish.",
    reproduction:
      "Egg scatterer; spawns among fine-leaved plants. Parents may eat eggs — remove adults or use a spawning mesh.",
    dimorphism:
      "Males are more intensely coloured and slimmer; females fuller-bodied and paler.",
    commonName: "Beckford's pencilfish",
    scientificName: "Nannostomus beckfordi",
    adultSizeCm: 6,
    adultSizeMinCm: 4,
    minTankVolumeL: 50,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 15,
    tempMinC: 23,
    tempMaxC: 28,
    phMin: 5.5,
    phMax: 7.5,
    origin: "South America",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "The gateway pencilfish — tolerant, colourful, and easy to find. A gold lateral stripe with red accents makes males eye-catching in a planted tank. One of the few pencilfish that works well in a mixed community.",
  },
  // Sources: seriouslyfish.com/species/nannostomus-marginatus, fishbase.org/summary/Nannostomus-marginatus.html, fishbase.org
  {
    id: "dwarf-pencilfish",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 3,
    behavior:
      "A tiny, exquisitely marked pencilfish for a nano or species tank. Holds its body at a characteristic head-up angle at rest. Best with very small, peaceful companions — easily outcompeted for food in a larger community. Very sensitive to water quality.",
    reproduction:
      "Egg scatterer among fine plants. Eggs and fry are minute; microworms or infusoria needed for first foods.",
    dimorphism:
      "Males have a red lower body stripe and slimmer build; females are plainer and more rounded.",
    commonName: "Dwarf pencilfish",
    scientificName: "Nannostomus marginatus",
    adultSizeCm: 3.5,
    adultSizeMinCm: 2.5,
    minTankVolumeL: 30,
    minFootprintCm: { length: 40, width: 25 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 15,
    tempMinC: 23,
    tempMaxC: 28,
    phMin: 5.0,
    phMax: 7.0,
    origin: "South America",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$",
    description:
      "One of the smallest pencilfish and one of the most charming nano fish in the hobby. Three bold horizontal stripes in red, black and white. Needs pristine, soft, acidic water and very small tank mates that won't outcompete it for food.",
  },
  // Sources: seriouslyfish.com/species/nannostomus-trifasciatus, fishbase.org/summary/Nannostomus-trifasciatus.html, aquariumsource.com/three-line-pencilfish
  {
    id: "three-lined-pencilfish",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 3,
    lifeExpectancyMaxYears: 5,
    behavior:
      "A slightly larger pencilfish with three bold horizontal stripes. More colourful and easier to find than many relatives. Schools in mid-water; males display intensely but combat is limited to fin-spreading. Best in a planted soft-water community.",
    reproduction:
      "Egg scatterer; eggs deposited among fine-leaved plants. Adults will eat eggs if not removed.",
    dimorphism:
      "Males show more intense red colouring in the belly stripe; females are plumper and slightly paler.",
    commonName: "Three-lined pencilfish",
    scientificName: "Nannostomus trifasciatus",
    adultSizeCm: 6,
    adultSizeMinCm: 5,
    minTankVolumeL: 60,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 15,
    tempMinC: 23,
    tempMaxC: 28,
    phMin: 5.5,
    phMax: 7.0,
    origin: "South America",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$",
    description:
      "A boldly striped pencilfish with a distinctive nocturnal colour change — the dark stripes fade to a mottled oblique pattern at night. Needs soft, slightly acidic water and a heavily planted tank to really thrive and colour up.",
  },

  // ── African cichlids — Lake Malawi ───────────────────────────────────────

  // Sources: seriouslyfish.com/species/labidochromis-caeruleus, fishbase.org/summary/Labidochromis-caeruleus.html, cichlid-forum.com/articles/labidochromis_caeruleus.php
  {
    id: "yellow-lab",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 6,
    lifeExpectancyMaxYears: 10,
    behavior:
      "The most beginner-friendly mbuna — electric lemon-yellow with black dorsal fin trim, and substantially less aggressive than most Lake Malawi cichlids. Peaceful enough to mix with other calmer mbuna. Still needs hard, alkaline water and a rocky tank.",
    reproduction:
      "Maternal mouthbrooder; female incubates 10–20 eggs in her mouth for ~3 weeks. Fry are released free-swimming and surprisingly large.",
    dimorphism:
      "Males have a more defined black edge on the dorsal and anal fins; females are identical in colour but slightly smaller.",
    commonName: "Yellow lab",
    scientificName: "Labidochromis caeruleus",
    adultSizeCm: 10,
    adultSizeMinCm: 8,
    minTankVolumeL: 110,
    minFootprintCm: { length: 100, width: 40 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 4,
    maxGroupSize: 10,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 7.5,
    phMax: 8.5,
    origin: "East Africa",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "The entry-level mbuna — uniform lemon yellow with a neat black dorsal stripe. Hardy, relatively peaceful, and works in a mixed Malawi community. Needs hard alkaline water, rockwork, and a well-maintained filter. A great first African cichlid.",
  },
  // Sources: seriouslyfish.com/species/chindongo-demasoni, fishbase.org/summary/Pseudotropheus-demasoni.html, cichlid-forum.com/articles/demasoni.php
  {
    id: "demasoni-cichlid",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 8,
    lifeExpectancyMaxYears: 12,
    behavior:
      "A small but intensely aggressive mbuna. Must be kept in large groups (10+) to distribute aggression — small groups lead to targeted killing. A single dominant male will harass subordinates to death unless the tank is densely stocked with many individuals and thoroughly rockscaped.",
    reproduction:
      "Maternal mouthbrooder; female holds 5–15 eggs for ~3 weeks. Fry are tiny and vulnerable.",
    dimorphism:
      "Males and females are nearly identical (blue-and-black striped); dominant males may show slight intensification of colour.",
    commonName: "Demasoni cichlid",
    scientificName: "Pseudotropheus demasoni",
    adultSizeCm: 9,
    minTankVolumeL: 200,
    minFootprintCm: { length: 120, width: 45 },
    temperament: "aggressive",
    diet: "herbivore",
    minGroupSize: 10,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 7.5,
    phMax: 8.5,
    origin: "East Africa",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$",
    description:
      "A strikingly beautiful but punishingly aggressive mbuna. The only safe way to keep them is in a large, overstock of 10+ fish in a heavily rocky tank, which disperses the aggression across many targets. Worth the challenge for the bold electric-blue-and-black pattern.",
  },
  // Sources: seriouslyfish.com/species/aulonocara-jacobfreibergi, fishbase.org/summary/Aulonocara-jacobfreibergi.html, cichlid-forum.com/articles/aulonocara.php
  {
    id: "peacock-cichlid",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 6,
    lifeExpectancyMaxYears: 10,
    behavior:
      "One of the most peaceful Malawi cichlids — males are spectacular in colour but direct aggression mainly toward other male Aulonocara. Swims in open water more than mbuna. Works well in a peaceful Malawi community with other Aulonocara species and Utaka.",
    reproduction:
      "Maternal mouthbrooder; female holds 20–30 eggs for ~3 weeks before releasing free-swimming fry.",
    dimorphism:
      "Males are brilliantly coloured (blue, yellow, or orange depending on variety); females are plain silver-brown.",
    commonName: "Peacock cichlid",
    scientificName: "Aulonocara jacobfreibergi",
    adultSizeCm: 15,
    adultSizeMinCm: 10,
    minTankVolumeL: 200,
    minFootprintCm: { length: 120, width: 45 },
    temperament: "semi",
    diet: "carnivore",
    minGroupSize: 4,
    maxGroupSize: 8,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 7.5,
    phMax: 8.5,
    origin: "East Africa",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$$",
    description:
      "One of the most dazzling freshwater fish available — males in full colour are electric blue, orange or yellow depending on population. Calmer than mbuna and open-water oriented. Needs hard alkaline water and at least a 120 cm tank.",
  },

  // ── African cichlids — Lake Tanganyika ────────────────────────────────────

  // Sources: seriouslyfish.com/species/cyphotilapia-frontosa, fishbase.org/summary/Cyphotilapia-frontosa.html, cichlid-forum.com/articles/frontosa.php
  {
    id: "frontosa",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 15,
    lifeExpectancyMaxYears: 25,
    behavior:
      "A slow, majestic deep-water cichlid. Peaceful in a species colony but predatory toward small fish — it hunts sleeping fish in the wild at dawn. Best in a large, species-dedicated tank with other frontosa. Males develop a pronounced nuchal hump with age.",
    reproduction:
      "Maternal mouthbrooder; female holds 20–50 large eggs for 4–5 weeks. Fry are large when released.",
    dimorphism:
      "Males develop a large nuchal hump and are substantially bigger than females.",
    commonName: "Frontosa",
    scientificName: "Cyphotilapia frontosa",
    adultSizeCm: 35,
    adultSizeMinCm: 25,
    minTankVolumeL: 500,
    minFootprintCm: { length: 180, width: 60 },
    temperament: "semi",
    diet: "carnivore",
    minGroupSize: 6,
    maxGroupSize: 12,
    tempMinC: 24,
    tempMaxC: 27,
    phMin: 7.8,
    phMax: 9.0,
    origin: "East Africa",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$$",
    description:
      "A regal Tanganyika cichlid with bold blue-and-white banding and a growing nuchal hump in males. Long-lived (25+ years possible), slow-growing, and colony-oriented. Requires very hard, alkaline water and a very large tank. A fish for patient keepers.",
  },
  // Sources: seriouslyfish.com/species/neolamprologus-brichardi, fishbase.org/summary/Neolamprologus-brichardi.html, cichlid-forum.com/articles/brichardi.php
  {
    id: "fairy-cichlid",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 8,
    lifeExpectancyMaxYears: 10,
    behavior:
      "A unique cichlid that forms cooperative family groups — older offspring help guard younger siblings. Graceful and relatively peaceful outside of breeding, but will defend a cave area aggressively when spawning. Best in a species or Tanganyika community tank.",
    reproduction:
      "Cave spawner; both parents and older offspring guard the clutch. Multiple generations can coexist peacefully in the same tank.",
    dimorphism:
      "Males are slightly larger; otherwise sexing is difficult without direct behaviour observation.",
    commonName: "Fairy cichlid",
    scientificName: "Neolamprologus brichardi",
    adultSizeCm: 9,
    adultSizeMinCm: 7,
    minTankVolumeL: 80,
    minFootprintCm: { length: 80, width: 35 },
    temperament: "semi",
    diet: "carnivore",
    minGroupSize: 4,
    maxGroupSize: 10,
    tempMinC: 24,
    tempMaxC: 27,
    phMin: 7.8,
    phMax: 9.0,
    origin: "East Africa",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "An elegant, lyre-tailed Tanganyika cichlid that lives in extended family colonies and cooperatively raises its young — a fascinating cichlid behaviour to observe. Relatively easy to keep and breed in hard, alkaline water.",
  },
  // Sources: seriouslyfish.com/species/neolamprologus-leleupi, fishbase.org/summary/Neolamprologus-leleupi.html, cichlid-forum.com
  {
    id: "lemon-cichlid",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 8,
    lifeExpectancyMaxYears: 12,
    behavior:
      "A vibrant orange-yellow Tanganyika cichlid. Territorial and will defend a cave area, but manageable in a Tanganyika community with adequate space and rockwork. Males can be aggressive toward females outside breeding — keep in pairs with plenty of cover.",
    reproduction:
      "Cave spawner; both parents guard the eggs and fry. Fry are relatively easy to raise.",
    dimorphism:
      "Males are slightly larger and more intensely coloured; otherwise difficult to sex.",
    commonName: "Lemon cichlid",
    scientificName: "Neolamprologus leleupi",
    adultSizeCm: 10,
    adultSizeMinCm: 7,
    minTankVolumeL: 80,
    minFootprintCm: { length: 80, width: 35 },
    temperament: "semi",
    diet: "carnivore",
    minGroupSize: 2,
    tempMinC: 24,
    tempMaxC: 27,
    phMin: 7.8,
    phMax: 9.0,
    origin: "East Africa",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$",
    description:
      "A vivid, entirely orange-yellow Tanganyika cichlid that glows in a well-lit rock cave setup. Territorial but manageable with good aquascaping. Needs very hard, alkaline water like all Tanganyika species.",
  },

  // ── Other African cichlids ─────────────────────────────────────────────────

  // Sources: seriouslyfish.com/species/hemichromis-bimaculatus, fishbase.org/summary/Hemichromis-bimaculatus.html, cichlid-forum.com
  {
    id: "jewel-cichlid",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 5,
    lifeExpectancyMaxYears: 10,
    behavior:
      "A spectacularly coloured West African cichlid — blood-red with iridescent blue-green spots. Highly aggressive, particularly during breeding. Should be kept as a bonded pair in their own tank or a very large community only with robust tank mates. Will destroy plants and rearrange substrate.",
    reproduction:
      "Open spawner; pair bonds tightly and both parents aggressively defend eggs and fry. One of the most dedicated cichlid parents in the hobby.",
    dimorphism:
      "Males are slightly larger and often more intensely red; females may show a dark spot on the dorsal fin.",
    commonName: "Jewel cichlid",
    scientificName: "Hemichromis bimaculatus",
    adultSizeCm: 15,
    adultSizeMinCm: 12,
    minTankVolumeL: 110,
    minFootprintCm: { length: 100, width: 40 },
    temperament: "aggressive",
    diet: "carnivore",
    minGroupSize: 2,
    tempMinC: 22,
    tempMaxC: 26,
    phMin: 6.5,
    phMax: 7.5,
    origin: "West Africa",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$",
    description:
      "One of the most beautiful fish in freshwater — a blazing red body studded with iridescent turquoise spots. Ferociously aggressive when breeding; best kept as a pair in a species tank. Easy to spawn and rear but demands respect for its territorial nature.",
  },
  // Sources: seriouslyfish.com/species/tropheus-moorii, fishbase.org/summary/Tropheus-moorii.html, cichlid-forum.com/articles/tropheus.php
  {
    id: "tropheus",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 10,
    lifeExpectancyMaxYears: 15,
    behavior:
      "One of the most challenging cichlids to keep — extremely aggressive toward conspecifics, requiring a large overstock of 15–20 fish to disperse aggression. Highly sensitive to diet: needs a high-fibre, low-protein vegetable diet; high-protein foods cause fatal Malawi bloat rapidly.",
    reproduction:
      "Maternal mouthbrooder; female holds 5–15 large eggs for 4–5 weeks. Fry are surprisingly large when released.",
    dimorphism:
      "Males and females are similar in most colour morphs; males tend to be slightly larger.",
    commonName: "Tropheus",
    scientificName: "Tropheus moorii",
    adultSizeCm: 14,
    adultSizeMinCm: 10,
    minTankVolumeL: 350,
    minFootprintCm: { length: 150, width: 55 },
    temperament: "aggressive",
    diet: "herbivore",
    minGroupSize: 15,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 7.8,
    phMax: 9.0,
    origin: "East Africa",
    careLevel: "advanced",
    rarity: "uncommon",
    priceRange: "$$$",
    description:
      "Dozens of stunning colour morphs, an extraordinary diversity of patterns — and one of the most demanding fish in the hobby. Requires a strict vegetable diet, very hard alkaline water, high-density stocking, and meticulous observation to spot early signs of illness. For experienced Tanganyika keepers only.",
  },

  // ── Rainbowfish ──────────────────────────────────────────────────────────

  // Sources: seriouslyfish.com/species/melanotaenia-praecox, fishbase.org/summary/Melanotaenia-praecox.html, aquariumcoop.com/blogs/aquarium/neon-rainbowfish
  {
    id: "neon-dwarf-rainbowfish",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 3,
    lifeExpectancyMaxYears: 5,
    behavior:
      "A small, peaceful rainbowfish that stays active in mid-water and schools loosely. Males colour up intensely and display to each other with raised fins — no real combat. Compatible with most peaceful community fish. Does best with a long tank for swimming.",
    reproduction:
      "Continuous egg scatterer; deposits adhesive eggs on plants or spawning mops daily. Eggs hatch in 5–7 days. Best removed and hatched separately.",
    dimorphism:
      "Males are vivid neon blue with bright red fins; females are silver-green with clear fins.",
    commonName: "Neon dwarf rainbowfish",
    scientificName: "Melanotaenia praecox",
    adultSizeCm: 6,
    adultSizeMinCm: 4,
    minTankVolumeL: 60,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 15,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 6.5,
    phMax: 8.0,
    origin: "New Guinea",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "The most popular dwarf rainbowfish — neon-blue body with vivid red fins on the male, manageable at 6 cm, and peaceful enough for most communities. Tolerates a broad pH range, is easy to breed, and rewards good feeding with spectacular colour.",
  },
  // Sources: seriouslyfish.com/species/iriatherina-werneri, fishbase.org/summary/Iriatherina-werneri.html, aquariumglaser.de
  {
    id: "threadfin-rainbowfish",
    waterType: "freshwater",
    tankRegion: "top",
    lifeExpectancyYears: 3,
    behavior:
      "A delicate, slow-moving nano rainbowfish with spectacular trailing fins on the male. Peaceful but easily outcompeted for food by faster tank mates. Best in a nano or species tank, or with tiny companions like chili rasboras or small killifish. Sensitive to water quality.",
    reproduction:
      "Egg scatterer; spawns among fine plants. Fry require micro foods.",
    dimorphism:
      "Males have extraordinarily long, filamentous dorsal and anal fins with coloured tips; females have normal fin length.",
    commonName: "Threadfin rainbowfish",
    scientificName: "Iriatherina werneri",
    adultSizeCm: 5,
    adultSizeMinCm: 3,
    minTankVolumeL: 40,
    minFootprintCm: { length: 40, width: 25 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 15,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 8.0,
    origin: "New Guinea",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$",
    description:
      "One of the most ornate small fish in the hobby — the male's fin extensions trail like silk ribbons. Peaceful and fragile; needs calm water, micro foods, and tank mates small enough not to nip those spectacular fins.",
  },
  // Sources: seriouslyfish.com/species/melanotaenia-lacustris, fishbase.org/summary/Melanotaenia-lacustris.html, fishkeepingworld.com/lake-kutubu-rainbowfish
  {
    id: "lake-kutubu-rainbowfish",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 5,
    lifeExpectancyMaxYears: 8,
    behavior:
      "An active, fast-swimming schooling rainbowfish. Males display and compete with raised fins but rarely cause injury. More tolerant of softer, slightly acidic water than Boeseman's rainbowfish. Peaceful and well-suited to a large planted community.",
    reproduction:
      "Continuous egg scatterer; deposits sticky eggs on plants over several days. Eggs hatch in 6–8 days.",
    dimorphism:
      "Males are vivid turquoise to deep blue; females are silver-green with a less intense blue sheen.",
    commonName: "Lake Kutubu rainbowfish",
    scientificName: "Melanotaenia lacustris",
    adultSizeCm: 12,
    adultSizeMinCm: 9,
    minTankVolumeL: 150,
    minFootprintCm: { length: 120, width: 40 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 15,
    tempMinC: 22,
    tempMaxC: 27,
    phMin: 7.0,
    phMax: 8.0,
    origin: "New Guinea",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A stunning deep-blue rainbowfish from Lake Kutubu in Papua New Guinea. Males at peak colour are almost entirely turquoise-blue — rare among freshwater fish. Easy to keep, peaceful, and a spectacular centrepiece for a large planted community.",
  },
  // Sources: seriouslyfish.com/species/pseudomugil-furcatus, fishbase.org/summary/Pseudomugil-furcatus.html, aquariumglaser.de
  {
    id: "forktail-blue-eye",
    waterType: "freshwater",
    tankRegion: "top",
    lifeExpectancyYears: 3,
    lifeExpectancyMaxYears: 4,
    behavior:
      "A tiny, peaceful rainbowfish relative that lives near the surface and displays vivid yellow fins and glittering eyes. Males court females in a continuous spinning display. Sensitive to water quality; best in a mature, densely planted nano tank.",
    reproduction:
      "Egg scatterer; deposits small eggs on plant leaves or spawning mops daily. Fry need micro foods.",
    dimorphism:
      "Males have bright yellow fins with dark edges; females have plainer, smaller fins and are more slender.",
    commonName: "Forktail blue-eye",
    scientificName: "Pseudomugil furcatus",
    adultSizeCm: 6,
    adultSizeMinCm: 4,
    minTankVolumeL: 40,
    minFootprintCm: { length: 50, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 15,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 6.5,
    phMax: 8.0,
    origin: "New Guinea",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$",
    description:
      "A jewel-like surface fish — the yellow fins and glittering blue eyes of the male catch any light in the tank. Peaceful and perfect for a planted nano community. Needs clean, warm water and small foods; will fade and waste in poor conditions.",
  },

  // ── Bonus gap species ─────────────────────────────────────────────────────

  // Sources: seriouslyfish.com/species/pantodon-buchholzi, fishbase.org/summary/Pantodon-buchholzi.html, fishkeepingworld.com/african-butterfly-fish
  {
    id: "african-butterfly-fish",
    waterType: "freshwater",
    tankRegion: "top",
    lifeExpectancyYears: 5,
    lifeExpectancyMaxYears: 10,
    behavior:
      "A prehistoric-looking surface ambush predator. Floats motionless just under the surface film, waiting for insects or fish to come within range. Entirely surface-oriented — does not swim down. Peaceful toward fish too large to eat, but will take anything fitting in its substantial upturned mouth.",
    reproduction:
      "Egg floater; eggs are released among surface vegetation and float until hatching. Rarely bred in captivity.",
    dimorphism:
      "Males have a notched anal fin; females have a straight anal fin edge.",
    commonName: "African butterfly fish",
    scientificName: "Pantodon buchholzi",
    adultSizeCm: 10,
    minTankVolumeL: 80,
    minFootprintCm: { length: 80, width: 40 },
    temperament: "semi",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 23,
    tempMaxC: 30,
    phMin: 6.0,
    phMax: 7.5,
    origin: "West Africa",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "One of the most ancient-looking freshwater fish — wide pectoral fins like wings, an upturned mouth, and a body that never leaves the surface. An exceptional surface predator that co-exists peacefully with mid- and bottom-dwellers. A very tight lid is essential; it can glide short distances.",
  },
  // Sources: seriouslyfish.com/species/gnathonemus-petersii, fishbase.org/summary/Gnathonemus-petersii.html, fishkeepingworld.com/elephantnose-fish
  {
    id: "elephantnose-fish",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 6,
    lifeExpectancyMaxYears: 10,
    behavior:
      "A weakly electric fish that navigates and communicates via self-generated electrical pulses. Highly intelligent — among the largest brain-to-body ratio of any fish. Shy and nocturnal; needs caves and dim lighting. Sensitive to other electric fish and should not be kept with other mormyrids or knife fish. Peaceful but can be nippy with its elongated chin probe.",
    reproduction:
      "Not documented in captivity.",
    dimorphism:
      "Males have a slight indentation on the anal fin; otherwise sexing is extremely difficult.",
    commonName: "Elephantnose fish",
    scientificName: "Gnathonemus petersii",
    adultSizeCm: 25,
    adultSizeMinCm: 18,
    minTankVolumeL: 200,
    minFootprintCm: { length: 120, width: 45 },
    temperament: "peaceful",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 7.5,
    origin: "West Africa",
    careLevel: "advanced",
    rarity: "common",
    priceRange: "$$",
    description:
      "A remarkable, trunk-nosed fish with one of the highest brain-to-body ratios in the animal kingdom. Uses a weak electric field to hunt worms buried in soft substrate. Needs live or frozen worms, dim lighting, caves, and pristine water quality. Not beginner-friendly, but endlessly fascinating.",
  },
];

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
  stock: Fish[]; // the fish currently in it
};
