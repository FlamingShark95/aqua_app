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
    adultSizeCm: 44,
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
    adultSizeCm: 7.5,
    adultSizeMinCm: 6,
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
    adultSizeCm: 4,
    adultSizeMinCm: 3,
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
    adultSizeCm: 5,
    adultSizeMinCm: 3,
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
    adultSizeCm: 2.5,
    adultSizeMinCm: 2,
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
    adultSizeMinCm: 12,
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
    adultSizeMinCm: 4,
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
    adultSizeCm: 130,
    adultSizeMinCm: 100,
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
    adultSizeMinCm: 18,
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
    adultSizeCm: 12,
    adultSizeMinCm: 7,
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
    adultSizeMinCm: 4,
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
    adultSizeMinCm: 6,
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
    adultSizeCm: 46,
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
    adultSizeMinCm: 10,
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
    adultSizeCm: 11,
    adultSizeMinCm: 9,
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
    adultSizeMinCm: 4,
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
    adultSizeCm: 16,
    adultSizeMinCm: 10,
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
    adultSizeMinCm: 5,
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
    adultSizeCm: 9.6,
    adultSizeMinCm: 6,
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
    adultSizeCm: 30,
    adultSizeMinCm: 25,
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
      "A fast, toothy predator with two long fangs. In the wild this species reaches over a metre, but aquarium specimens typically top out around 30 cm (12 in). Still a huge, demanding fish for specialists only.",
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
    adultSizeMinCm: 3,
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
    adultSizeMinCm: 4,
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
    adultSizeCm: 15,
    adultSizeMinCm: 10,
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
    adultSizeCm: 6,
    adultSizeMinCm: 4,
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
    adultSizeMinCm: 3,
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
    adultSizeMinCm: 4,
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
    adultSizeMinCm: 11,
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
    adultSizeMinCm: 2,
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
    adultSizeMinCm: 1.5,
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
    adultSizeCm: 7.5,
    adultSizeMinCm: 5,
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
    adultSizeMinCm: 3,
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
    adultSizeMinCm: 3,
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
    adultSizeMinCm: 4,
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
    adultSizeCm: 12,
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
    adultSizeCm: 12,
    adultSizeMinCm: 8,
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
    adultSizeCm: 15,
    adultSizeMinCm: 10,
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
    adultSizeCm: 5,
    adultSizeMinCm: 3,
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
    adultSizeCm: 6.8,
    adultSizeMinCm: 5,
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
    adultSizeCm: 11,
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
    adultSizeCm: 70,
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
    adultSizeCm: 66,
    adultSizeMinCm: 50,
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
    adultSizeCm: 54,
    adultSizeMinCm: 40,
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
    adultSizeCm: 85,
    adultSizeMinCm: 55,
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
    adultSizeCm: 92,
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
    adultSizeCm: 60,
    adultSizeMinCm: 30,
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
    adultSizeCm: 6.5,
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
    adultSizeCm: 3.5,
    adultSizeMinCm: 2,
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
    adultSizeCm: 13,
    adultSizeMinCm: 7,
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
    adultSizeCm: 18,
    adultSizeMinCm: 10,
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
    adultSizeMinCm: 2,
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
    adultSizeMinCm: 3,
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
    adultSizeMinCm: 4,
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
    adultSizeCm: 4.5,
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
    adultSizeCm: 10,
    adultSizeMinCm: 7,
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
    adultSizeCm: 13,
    adultSizeMinCm: 10,
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
    adultSizeCm: 5,
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
    adultSizeCm: 4,
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
    adultSizeCm: 11,
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
    adultSizeCm: 5,
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
    adultSizeCm: 13,
    adultSizeMinCm: 10,
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

  // ── Tetras & Characins (new batch) ────────────────────────────────────────

  // Sources: FishBase (https://fishbase.se/summary/Hyphessobrycon-megalopterus.html), Seriously Fish (https://www.seriouslyfish.com/species/hyphessobrycon-megalopterus/), Aquariadise (https://www.aquariadise.com/black-phantom-tetra/)
  // Confidence: adultSizeCm HIGH | minTankVolumeL HIGH | phMin MEDIUM
  // Notes: FishBase max 3.6 cm SL → ~4.0 cm TL. SF and Aquariadise agree on 4 cm TL. pH: SF gives 5.0–7.0, Aquariadise 5.0–7.5; using wider captive-bred range.
  {
    id: "black-phantom-tetra",
    commonName: "Black phantom tetra",
    scientificName: "Hyphessobrycon megalopterus",
    adultSizeCm: 4.0,
    adultSizeMinCm: 3.5,
    minTankVolumeL: 75,
    minFootprintCm: { length: 80, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 10,
    tempMinC: 20,
    tempMaxC: 28,
    phMin: 5.0,
    phMax: 7.5,
    origin: "South America",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A striking South American tetra with a ghost-like black shoulder patch. Males are silvery-grey with an oversized black dorsal fin; females are rounder with reddish-orange accents in the ventral fins. Best kept in groups of 6 or more in soft, slightly acidic water with dense planting and dim lighting.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 4,
    lifeExpectancyMaxYears: 5,
    behavior:
      "Mid-water shoaler that forms loose schools among plants. Males engage in fin-spreading display behavior and circle rivals but rarely cause injury.",
    reproduction:
      "Egg scatterer. Requires soft, acidic water and fine-leaved plants; adults must be removed after spawning to prevent egg predation.",
    dimorphism:
      "Males have a larger, jet-black dorsal fin and a slimmer body; females are deeper-bodied with red-orange tinting in the pelvic and ventral fins.",
  },

  // Sources: Seriously Fish (https://www.seriouslyfish.com/species/hyphessobrycon-erythrostigma/), Fishkeeping World (https://www.fishkeepingworld.com/bleeding-heart-tetra/), Wikipedia (https://en.wikipedia.org/wiki/Hyphessobrycon_erythrostigma)
  // Confidence: adultSizeCm MEDIUM | minTankVolumeL MEDIUM | phMin MEDIUM
  // Notes: SF gives SL 55–60 mm → TL ~6.5–7 cm; FKW says "up to 2.5 in" = 6.35 cm TL — agree within 10%. pH: SF 4.0–7.5 (wild), FKW 6.0–6.5 (optimal); using conservative aquarium range 5.5–7.5.
  {
    id: "bleeding-heart-tetra",
    commonName: "Bleeding heart tetra",
    scientificName: "Hyphessobrycon erythrostigma",
    adultSizeCm: 7.0,
    adultSizeMinCm: 6.0,
    minTankVolumeL: 80,
    minFootprintCm: { length: 90, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 10,
    tempMinC: 21,
    tempMaxC: 28,
    phMin: 5.5,
    phMax: 7.5,
    origin: "Upper Amazon",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "Named for the vivid red heart-shaped mark on its flank, this is one of the larger community tetras. Males develop spectacular elongated fins. Best in soft, slightly acidic water with dense planting and dim lighting. Sensitive to water quality — requires consistent maintenance.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 5,
    behavior:
      "Mid-water shoaler that prefers dimly-lit, heavily planted tanks. Males rival each other in fin-spreading displays with color intensification; rarely causes harm.",
    reproduction:
      "Egg scatterer. Prefers soft, acidic water with fine-leaved plants for spawning sites; parents should be removed after spawning.",
    dimorphism:
      "Males are larger with greatly elongated dorsal, pelvic, and anal fins; females are deeper-bodied and more compact, especially when gravid.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Hyphessobrycon-anisitsi.html), Seriously Fish (https://www.seriouslyfish.com/species/hyphessobrycon-anisitsi/), Fishkeeping World (https://www.fishkeepingworld.com/buenos-aires-tetra/)
  // Confidence: adultSizeCm MEDIUM | minTankVolumeL HIGH | phMin HIGH
  // Notes: FishBase reports 13.2 cm TL (exceptional wild max for reclassified Psalidodon anisitsi); SF gives SL 50–60 mm → TL ~6–7 cm; FKW says ~3 in = 7.6 cm TL. Aquarium specimens top out ~7.5 cm. Used aquarium consensus for adultSizeCm; FishBase outlier noted. Taxonomy: reclassified to Psalidodon anisitsi on FishBase; hobby still uses Hyphessobrycon anisitsi.
  {
    id: "buenos-aires-tetra",
    commonName: "Buenos Aires tetra",
    scientificName: "Psalidodon anisitsi",
    adultSizeCm: 7.5,
    adultSizeMinCm: 5.0,
    minTankVolumeL: 80,
    minFootprintCm: { length: 90, width: 30 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 10,
    tempMinC: 16,
    tempMaxC: 28,
    phMin: 5.5,
    phMax: 8.5,
    origin: "South America",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A hardy, fast-swimming tetra that tolerates a wide range of temperatures and water conditions, making it one of the more adaptable members of the family. Known for fin-nipping — especially of long-finned or slow fish — so choose tankmates carefully. Best kept in a group of 6 or more with plenty of open swimming space. Formerly Hyphessobrycon anisitsi.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 3,
    lifeExpectancyMaxYears: 5,
    behavior:
      "Boisterous and fast-moving mid-water fish. Active even at cooler room temperatures. Fin-nipping tendency is reduced in larger groups with ample space; avoid slow or long-finned tankmates.",
    dimorphism:
      "Males are slimmer and more intensely colored; females are larger and deeper-bodied.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Hyphessobrycon-columbianus.html), Seriously Fish (https://www.seriouslyfish.com/species/hyphessobrycon-columbianus/), Fish Laboratory (https://www.fishlaboratory.com/fish/colombian-tetra)
  // Confidence: adultSizeCm HIGH | minTankVolumeL MEDIUM | phMin HIGH
  // Notes: FishBase 7.0 cm TL; SF SL 65 mm → ~7.5 cm TL; Fish Lab "just over 2.5 in" = ~6.5 cm TL — all within ~15%. Min tank: SF 90×30 cm (~81L) vs Fish Lab 30 gal (113L); used SF recommendation.
  {
    id: "colombian-tetra",
    commonName: "Colombian tetra",
    scientificName: "Hyphessobrycon columbianus",
    adultSizeCm: 7.0,
    adultSizeMinCm: 5.5,
    minTankVolumeL: 90,
    minFootprintCm: { length: 90, width: 30 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 10,
    tempMinC: 20,
    tempMaxC: 28,
    phMin: 5.5,
    phMax: 7.5,
    origin: "Colombia",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$",
    description:
      "A bold, colorful tetra with vivid blue-silver flanks and red-orange fin accents. More assertive than typical tetras — known to nip fins, especially in smaller groups. Best kept in schools of 8 or more with fast-moving, similarly-sized tankmates in soft to moderately hard water.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 3,
    lifeExpectancyMaxYears: 5,
    behavior:
      "Active mid-water schooler that can be feisty and fin-nippy, especially toward long-finned or slow tankmates. Behavior improves significantly in larger groups of 8 or more.",
    dimorphism:
      "Males are slimmer and more intensely blue-silver with a more extended dorsal fin; females are larger and deeper-bodied.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Moenkhausia-pittieri.html), Seriously Fish (https://www.seriouslyfish.com/species/moenkhausia-pittieri/), Fishkeeping World (https://www.fishkeepingworld.com/diamond-tetra/)
  // Confidence: adultSizeCm HIGH | minTankVolumeL MEDIUM | phMin HIGH
  // Notes: FishBase max 6.0 cm SL (reclassified to Makunaima pittieri, taxonomy still in flux); SF 6 cm SL → ~7 cm TL; FKW ~6.35 cm TL — strong agreement. Min tank: SF 70L vs FKW 15 gal (56L); used SF as more conservative.
  {
    id: "diamond-tetra",
    commonName: "Diamond tetra",
    scientificName: "Moenkhausia pittieri",
    adultSizeCm: 7.0,
    adultSizeMinCm: 5.0,
    minTankVolumeL: 75,
    minFootprintCm: { length: 75, width: 40 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 10,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 5.5,
    phMax: 7.5,
    origin: "Venezuela",
    careLevel: "beginner",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "One of the most visually striking small tetras: each scale catches light like a cut diamond, especially in planted tanks with directional lighting. Endemic to Venezuela's Lake Valencia basin. A peaceful community fish that rewards patience — males develop their spectacular violet-sheened finnage slowly as they mature.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 3,
    lifeExpectancyMaxYears: 6,
    behavior:
      "Mid-water schooler that sparkles brilliantly under good lighting. Best in groups of 6 or more in a planted tank; smaller groups tend toward fin-nipping.",
    dimorphism:
      "Males develop spectacular elongated fins with a violet iridescent sheen as they age; females are stockier with smaller, mostly clear fins.",
  },

  // ── Tetras & Characins (batch 2) ──

  // Sources: FishBase (https://fishbase.se/summary/Thayeria-boehlkei.html), Seriously Fish (https://www.seriouslyfish.com/species/thayeria-boehlkei/), Aquadiction (https://aquadiction.world/species-spotlight/penguin-tetra)
  // Confidence: adultSizeCm MEDIUM | minTankVolumeL MEDIUM | tempMinC/tempMaxC HIGH | phMin/phMax HIGH
  // Notes: FishBase 6 cm TL and Aquadiction 6 cm vs Seriously Fish 7.5 cm TL — used 7.5 as the realistic max, 6 as typical. Sources allow pH to 8.0; capped husbandry max at 7.5.
  {
    id: "penguin-tetra",
    commonName: "Penguin tetra",
    scientificName: "Thayeria boehlkei",
    adultSizeCm: 7.5,
    adultSizeMinCm: 6.0,
    minTankVolumeL: 75,
    minFootprintCm: { length: 75, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 10,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Upper Amazon",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "Named for its upright, head-up resting posture and the bold black band that runs along the body and dips into the lower tail lobe. An active, hardy schooler that hangs in the mid-to-upper water column and shows best in larger groups. Peaceful, but won't compete well with very boisterous or much larger tankmates.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 4,
    lifeExpectancyMaxYears: 5,
    behavior:
      "Constantly active mid-water shoaler that swims at a distinctive tail-down, head-up angle. Tighter, more natural schooling and less skittishness in groups of 8 or more.",
    dimorphism:
      "Subtle — females are noticeably rounder and fuller-bodied than the slimmer males, especially when in breeding condition.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Hasemania-nana.html), Seriously Fish (https://www.seriouslyfish.com/species/hasemania-nana/), Wikipedia (https://en.wikipedia.org/wiki/Hasemania_nana)
  // Confidence: adultSizeCm HIGH | tempMinC/tempMaxC HIGH | phMin/phMax HIGH | minTankVolumeL MEDIUM
  // Notes: FishBase 3.8 cm SL (~4.4 cm TL); SF and Wikipedia give 5 cm. Sources allow pH to 8.0; capped husbandry max at 7.5. Lacks an adipose fin, unusual for a tetra.
  {
    id: "silvertip-tetra",
    commonName: "Silvertip tetra",
    scientificName: "Hasemania nana",
    adultSizeCm: 5.0,
    adultSizeMinCm: 4.0,
    minTankVolumeL: 75,
    minFootprintCm: { length: 75, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 10,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Eastern Brazil",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A lively coppery-gold tetra with bright white-tipped fins that flash as it moves. Hardy and undemanding, but a confirmed nipper if kept in too small a group — keep it in a tight shoal to channel that energy. Endemic to the Rio São Francisco basin in eastern Brazil.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 4,
    lifeExpectancyMaxYears: 5,
    behavior:
      "Fast, restless shoaler that spends most of its time in open mid-water. Fin-nipping toward slow or long-finned tankmates increases sharply when kept in groups smaller than six.",
    dimorphism:
      "Males are deeper copper-orange with crisp black-and-white fin tips and intensify in colour when displaying; females are smaller, paler and more yellow-silver.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Hyphessobrycon-flammeus.html), Seriously Fish (https://www.seriouslyfish.com/species/hyphessobrycon-flammeus/), Fishkeeping World (https://www.fishkeepingworld.com/flame-tetra/)
  // Confidence: adultSizeCm MEDIUM | minTankVolumeL HIGH | tempMinC/tempMaxC MEDIUM | phMin/phMax HIGH
  // Notes: FishBase 2.6 cm SL (~3.4 cm TL); SF and FKW quote ~2.5 cm TL; some hobby refs cite up to 4 cm. Temp spans 20–28 across sources; used 22–28. Also called the Rio or red tetra.
  {
    id: "flame-tetra",
    commonName: "Flame tetra",
    scientificName: "Hyphessobrycon flammeus",
    adultSizeCm: 3.5,
    adultSizeMinCm: 2.5,
    minTankVolumeL: 60,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 10,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 5.5,
    phMax: 7.5,
    origin: "Southeast Brazil",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A small, very peaceful tetra washed in warm red over the rear half of the body, with black-and-white edged fins. One of the easiest egg-layers to breed and an ideal resident of a calm, planted community. Native to coastal rivers around Rio de Janeiro in southeastern Brazil.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 4,
    lifeExpectancyMaxYears: 5,
    behavior:
      "Gentle, undemanding shoaler that colours up and displays most when kept in a group of eight or more in a well-planted tank with subdued lighting.",
    dimorphism:
      "Males are slimmer and far redder, with a black-edged anal fin; females are rounder, deeper-bodied and noticeably paler.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Hemigrammus-ocellifer.html), Seriously Fish (https://www.seriouslyfish.com/species/hemigrammus-ocellifer/), Wikipedia (https://en.wikipedia.org/wiki/Hemigrammus_ocellifer)
  // Confidence: adultSizeCm HIGH | tempMinC/tempMaxC MEDIUM | phMin/phMax MEDIUM | minTankVolumeL MEDIUM
  // Notes: FishBase now places this in Holopristis (Holopristis ocellifera); kept the hobby-standard Hemigrammus ocellifer. Size 4.5 cm (SF) – 4.9 cm (FishBase/Wiki). Temp 22–26 (FishBase) vs 24–28 (SF); used 22–28.
  {
    id: "head-and-tail-light-tetra",
    commonName: "Head and tail light tetra",
    scientificName: "Hemigrammus ocellifer",
    adultSizeCm: 5.0,
    adultSizeMinCm: 4.0,
    minTankVolumeL: 75,
    minFootprintCm: { length: 75, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 10,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Amazon Basin",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A silver community classic named for the glowing copper-red spots at the base of the tail and just behind the head, which catch light like tiny lamps. Hardy, peaceful and widely distributed across the Amazon and the Guianas. An excellent, forgiving first tetra for a planted community.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 4,
    lifeExpectancyMaxYears: 5,
    behavior:
      "Easygoing mid-water shoaler that stays out in the open in a group of six or more; the tail-base 'light' is its most reliable identifying mark.",
    dimorphism:
      "Females are rounder and fuller-bodied; males are slimmer and can show a small white mark on the anal fin.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Astyanax-mexicanus.html), Seriously Fish (https://www.seriouslyfish.com/species/astyanax-mexicanus/), Wikipedia (https://en.wikipedia.org/wiki/Mexican_tetra)
  // Confidence: adultSizeCm HIGH | tempMinC/tempMaxC HIGH | phMin/phMax HIGH | minTankVolumeL MEDIUM
  // Notes: Eyeless cave form of the Mexican tetra. FishBase and Wikipedia 12 cm TL; SF 9.5 cm. SF min tank 72 L, raised to 90 L for an active ~10 cm schooler. Hardy and peaceful but a known fin-nipper at feeding, so rated "semi".
  {
    id: "blind-cave-tetra",
    commonName: "Blind cave tetra",
    scientificName: "Astyanax mexicanus",
    adultSizeCm: 12,
    adultSizeMinCm: 9.0,
    minTankVolumeL: 90,
    minFootprintCm: { length: 90, width: 35 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 10,
    tempMinC: 20,
    tempMaxC: 25,
    phMin: 6.5,
    phMax: 8.0,
    origin: "Mexico",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "The eyeless, pinkish-white cave form of the Mexican tetra — born with eyes that regress and skin over as it grows. Astonishingly hardy and tolerant of hard, alkaline water, it navigates entirely by its lateral line and finds food with ease despite having no sight. Active and peaceful overall, but it can nip at feeding time, so avoid slow or long-finned tankmates.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 5,
    lifeExpectancyMaxYears: 10,
    behavior:
      "A bold, constantly active schooler that uses its lateral line to map the tank and is unfazed by light or darkness. Best kept in a group, which spreads out any feeding-time nipping.",
    dimorphism:
      "Females grow larger and noticeably rounder, especially when carrying eggs; males stay slimmer.",
  },

  // ── Corydoras ──

  // Sources: FishBase (https://fishbase.se/summary/Corydoras-paleatus.html), Seriously Fish (https://www.seriouslyfish.com/species/corydoras-paleatus/), Wikipedia (https://en.wikipedia.org/wiki/Corydoras_paleatus)
  // Confidence: adultSizeCm HIGH | tempMinC/tempMaxC MEDIUM | phMin/phMax MEDIUM | minTankVolumeL MEDIUM
  // Notes: FishBase reclassifies to Hoplisoma paleatum; kept Corydoras paleatus (hobby standard). 6.6–7.1 cm SL → ~7.5 cm TL. Subtropical: temps span 16–26 across sources and it tolerates unheated tanks. FishBase pH to 8.0; capped husbandry at 7.5.
  {
    id: "peppered-cory",
    commonName: "Peppered cory",
    scientificName: "Corydoras paleatus",
    adultSizeCm: 7.5,
    adultSizeMinCm: 6.0,
    minTankVolumeL: 75,
    minFootprintCm: { length: 75, width: 35 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 10,
    tempMinC: 18,
    tempMaxC: 26,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Southern South America",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A hardy, peaceful bottom-dweller and one of the oldest aquarium catfish in the hobby, marbled in dark peppery blotches over olive-bronze. Subtropical and happy in cooler, even unheated tanks. Constantly forages the substrate in groups and is one of the easiest Corydoras to breed.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 5,
    lifeExpectancyMaxYears: 10,
    behavior:
      "Sociable bottom forager that sifts sand with its barbels and periodically darts to the surface to gulp air (intestinal breathing). Most active and confident in groups of six or more.",
    dimorphism:
      "Females are larger, rounder and taller-bodied, especially when full of eggs; males are smaller and slimmer with a more pointed dorsal fin.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Corydoras-panda.html), Seriously Fish (https://www.seriouslyfish.com/species/corydoras-panda/), Wikipedia (https://en.wikipedia.org/wiki/Corydoras_panda)
  // Confidence: adultSizeCm HIGH | tempMinC/tempMaxC HIGH | phMin/phMax MEDIUM | minTankVolumeL MEDIUM
  // Notes: FishBase reclassifies to Hoplisoma panda; kept Corydoras panda. 3.8 cm SL (~4.5) – SF 5 – Wiki 5.5. Prefers cooler water (≤25 °C). SF min tank 42.5 L, raised to 60 L for a group. Wikipedia claims lifespans often >10–15 yr; used a conservative 5–10.
  {
    id: "panda-cory",
    commonName: "Panda cory",
    scientificName: "Corydoras panda",
    adultSizeCm: 5.0,
    adultSizeMinCm: 4.0,
    minTankVolumeL: 60,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 10,
    tempMinC: 20,
    tempMaxC: 25,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Upper Amazon",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A small, endearing cory named for its black eye-patches, black tail band and pale cream body — a panda in miniature. Prefers cooler, clean, well-oxygenated water and the company of its own kind. Sensitive to poor water quality, so best added to a mature, stable tank.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 5,
    lifeExpectancyMaxYears: 10,
    behavior:
      "Playful, active bottom forager that often dashes about in a tight group; spends the day sifting the substrate and rests in shaded spots. Keep six or more for natural behaviour.",
    dimorphism:
      "Females grow larger and noticeably broader when viewed from above; males stay smaller and slimmer.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Corydoras-julii.html), Seriously Fish (https://www.seriouslyfish.com/species/corydoras-julii/), Wikipedia (https://en.wikipedia.org/wiki/Corydoras_julii)
  // Confidence: adultSizeCm HIGH | tempMinC/tempMaxC MEDIUM | phMin/phMax MEDIUM | minTankVolumeL MEDIUM
  // Notes: FishBase reclassifies to Hoplisoma julii. 5.2–5.5 cm. SF gives a min base of 90×30 cm (81 L). True julii is genuinely uncommon — most fish sold as "julii" are C. trilineatus.
  {
    id: "julii-cory",
    commonName: "Julii cory",
    scientificName: "Corydoras julii",
    adultSizeCm: 5.5,
    adultSizeMinCm: 4.5,
    minTankVolumeL: 80,
    minFootprintCm: { length: 90, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 10,
    tempMinC: 22,
    tempMaxC: 26,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Northeastern Brazil",
    careLevel: "beginner",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "The true julii cory — a small, elegant catfish patterned with fine dark spots and a single broken stripe along the midline. Genuinely uncommon in the hobby: the great majority of fish sold as 'julii' are actually the similar Corydoras trilineatus. Peaceful, gregarious and at home in a soft, sandy-bottomed community.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 5,
    lifeExpectancyMaxYears: 10,
    behavior:
      "Gregarious daytime forager that works the substrate for food in a group; calmer and bolder when kept with several of its own kind.",
    dimorphism:
      "Females are larger and rounder-bodied than the slimmer males, most obvious when viewed from above.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Corydoras-trilineatus.html), Seriously Fish (https://www.seriouslyfish.com/species/corydoras-trilineatus/), Wikipedia (https://en.wikipedia.org/wiki/Corydoras_trilineatus)
  // Confidence: adultSizeCm HIGH | tempMinC/tempMaxC HIGH | phMin/phMax MEDIUM | minTankVolumeL MEDIUM
  // Notes: FishBase reclassifies to Hoplisoma trilineatum. 5.5 (SF) – 6.4 (Wiki) cm. Routinely sold as "false julii"/"julii" though it is C. trilineatus. SF min tank 42.5 L, raised to 60 L for a group.
  {
    id: "false-julii-cory",
    commonName: "False julii cory",
    scientificName: "Corydoras trilineatus",
    adultSizeCm: 6.0,
    adultSizeMinCm: 5.0,
    minTankVolumeL: 60,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 10,
    tempMinC: 22,
    tempMaxC: 26,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Amazon Basin",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "The cory most often sold in shops as 'julii', though it is really Corydoras trilineatus — told apart by its bolder reticulated markings and a more solid mid-body stripe. A hardy, very peaceful bottom-dweller that thrives in an active group over soft sand. An excellent, forgiving community catfish.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 5,
    lifeExpectancyMaxYears: 10,
    behavior:
      "Constantly busy substrate forager that shoals with its own kind by day; sifts sand with its barbels and occasionally surfaces to gulp air.",
    dimorphism:
      "Females are larger and deeper-bodied; males are smaller and slimmer with a more pointed dorsal fin.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Corydoras-arcuatus.html), Seriously Fish (https://www.seriouslyfish.com/species/corydoras-arcuatus/), Wikipedia (https://en.wikipedia.org/wiki/Corydoras_arcuatus)
  // Confidence: adultSizeCm HIGH | tempMinC/tempMaxC MEDIUM | phMin/phMax MEDIUM | minTankVolumeL LOW
  // Notes: FishBase reclassifies to Brochis arcuatus. 4.8 cm SL (~5.5) – SF 5–5.5. No tank size given in sources; 75 L set for an active bottom-foraging group. Wikipedia corroborated only distribution.
  {
    id: "skunk-cory",
    commonName: "Skunk cory",
    scientificName: "Corydoras arcuatus",
    adultSizeCm: 5.5,
    adultSizeMinCm: 4.5,
    minTankVolumeL: 75,
    minFootprintCm: { length: 75, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 10,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 5.5,
    phMax: 7.5,
    origin: "Upper Amazon",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A clean-lined cory marked by a single bold black stripe that arches from the snout up over the back and down to the tail, like a skunk's. Peaceful and gregarious, it prefers soft, warm, slightly acidic water and a soft substrate to forage over. Best kept in a group in a mature, well-filtered tank.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 5,
    lifeExpectancyMaxYears: 10,
    behavior:
      "Active bottom forager that sifts the substrate in a loose shoal and surfaces now and then to gulp air; most settled in groups of six or more.",
    dimorphism:
      "Females grow larger and rounder, particularly when carrying eggs; males remain slimmer.",
  },

  // --- Corydoras / Other Catfish batch 2 ---

  // Sources: FishBase (https://fishbase.se/summary/Brochis-splendens.html), Seriously Fish (https://www.seriouslyfish.com/species/brochis-splendens/), Wikipedia (https://en.wikipedia.org/wiki/Brochis_splendens)
  // Confidence: adultSizeCm MEDIUM (FB 9.9 cm SL ~11 cm TL; SF/Wiki 7–8 cm aquarium max — using hobby max) | tempMinC/tempMaxC HIGH | phMin/phMax HIGH | minTankVolumeL MEDIUM
  // Notes: Genus Brochis was revalidated in 2024; SF still lists as Corydoras splendens. FishBase wild max 9.9 cm SL (~11 cm TL); aquarium specimens typically 7–8 cm. Min tank from SF 120×45 cm base.
  {
    id: "emerald-cory",
    commonName: "Emerald cory",
    scientificName: "Brochis splendens",
    adultSizeCm: 8,
    adultSizeMinCm: 7,
    minTankVolumeL: 200,
    minFootprintCm: { length: 120, width: 45 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 10,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 5.8,
    phMax: 8.0,
    origin: "Amazon Basin",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A compact cory with a vivid metallic emerald-green sheen and a noticeably deeper, more rounded body than most Corydoras — a distinctive profile in the group. Peaceful and gregarious, it forages the substrate continuously and is as easy to keep as any cory, just needing more floor space.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 5,
    lifeExpectancyMaxYears: 10,
    behavior:
      "Active bottom forager that sifts sand with its barbels and periodically gulps air at the surface. Most confident and natural-looking in groups of six or more; will school loosely with other cory species.",
    dimorphism:
      "Females are larger, deeper-bodied and noticeably rounder when viewed from above, especially when full of eggs; males are slimmer.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Corydoras-adolfoi.html), Seriously Fish (https://www.seriouslyfish.com/species/corydoras-adolfoi/), Wikipedia (https://en.wikipedia.org/wiki/Corydoras_adolfoi)
  // Confidence: adultSizeCm HIGH | tempMinC/tempMaxC MEDIUM | phMin/phMax LOW (FB 6.0–8.0 vs SF 4.0–7.0; blackwater Rio Negro habitat supports SF's lower end) | minTankVolumeL LOW (no direct source; derived from fish size and group requirement)
  // Notes: FishBase accepts as Hoplisoma adolfoi; Wikipedia confirms; kept Corydoras adolfoi (hobby standard). Highly endemic to narrow Rio Negro blackwater tributaries — demands soft, acidic, very clean water.
  {
    id: "adolfo-cory",
    commonName: "Adolfo's cory",
    scientificName: "Corydoras adolfoi",
    adultSizeCm: 6,
    adultSizeMinCm: 5,
    minTankVolumeL: 75,
    minFootprintCm: { length: 75, width: 35 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 10,
    tempMinC: 22,
    tempMaxC: 26,
    phMin: 4.0,
    phMax: 7.0,
    origin: "Upper Rio Negro, Brazil",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "A striking small cory with a bright orange blaze behind the eye set against a black face mask and pale cream body. Endemic to the blackwater tributaries of the upper Rio Negro, it demands soft, acidic, very clean water and is less forgiving than most Corydoras. A rewarding choice for experienced cory keepers.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 5,
    lifeExpectancyMaxYears: 8,
    behavior:
      "Gregarious bottom forager that works fine sand with its barbels; shy and retiring when kept in small numbers, more confident and active in groups of six or more. Pectoral spines can pierce skin — handle with care.",
    dimorphism:
      "Females are larger and rounder-bodied, especially when full of eggs; males remain slimmer.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Pimelodus-pictus.html), Seriously Fish (https://www.seriouslyfish.com/species/pimelodus-pictus/), Fishkeeping World (https://www.fishkeepingworld.com/pictus-catfish/)
  // Confidence: adultSizeCm HIGH (FB 11 cm TL, SF 12 cm, FKW 12.7 cm — consensus ~12 cm) | tempMinC/tempMaxC HIGH (FB + SF agree 22–25 °C) | phMin/phMax MEDIUM (SF 5.8–6.8 used; FB 6.0–8.0, FKW 7.0–7.5 diverge) | minTankVolumeL MEDIUM
  // Notes: SF says minimum 120 L; FKW recommends 208 L for a single fish. Used 150 L as group minimum. Predatory: will eat fish small enough to swallow, despite peaceful disposition toward larger tankmates.
  {
    id: "pictus-catfish",
    commonName: "Pictus catfish",
    scientificName: "Pimelodus pictus",
    adultSizeCm: 12,
    minTankVolumeL: 150,
    minFootprintCm: { length: 120, width: 45 },
    temperament: "predatory",
    diet: "carnivore",
    minGroupSize: 6,
    maxGroupSize: 10,
    tempMinC: 22,
    tempMaxC: 25,
    phMin: 5.8,
    phMax: 7.0,
    origin: "Amazon, Orinoco",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$",
    description:
      "A fast, active pimelodid catfish with a bold leopard-spot pattern on a silver body and extremely long barbels that can reach the tail. Peaceful toward fish it cannot swallow, but will eat anything small enough — not safe with neon-sized tankmates. Single specimens stay hidden; a group of six keeps them bold and swimming in the open.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 8,
    behavior:
      "Restless nocturnal hunter that patrols the middle and lower water column; long barbels can snag in coarse nets so use a bag when catching. Prone to over-eating — feed every two to three days rather than daily. Sensitive to deteriorating water quality; needs robust filtration.",
    dimorphism:
      "No obvious external dimorphism; females may appear slightly fuller-bodied when gravid.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Kryptopterus-vitreolus.html), Seriously Fish (https://www.seriouslyfish.com/species/kryptopterus-vitreolus/), Aquariadise (https://aquariadise.com/glass-catfish/)
  // Confidence: adultSizeCm HIGH (FB 6.5 cm SL ~7 cm TL, SF 6.5 cm TL, Aquariadise ~6.4 cm — strong consensus; FKW 12.7 cm discarded as likely K. bicirrhis confusion) | tempMinC/tempMaxC MEDIUM | phMin/phMax MEDIUM (SF 4.0–7.0 is natural habitat; aquarium consensus from two sources is 6.5–7.5) | minTankVolumeL MEDIUM
  // Notes: Species was formally named only in 2013; earlier "glass catfish" literature often refers to the larger Kryptopterus bicirrhis (~15 cm TL). Confirmed K. vitreolus is the small (~7 cm) trade species.
  {
    id: "glass-catfish",
    commonName: "Glass catfish",
    scientificName: "Kryptopterus vitreolus",
    adultSizeCm: 7,
    minTankVolumeL: 80,
    minFootprintCm: { length: 80, width: 35 },
    temperament: "peaceful",
    diet: "carnivore",
    minGroupSize: 6,
    maxGroupSize: 12,
    tempMinC: 20,
    tempMaxC: 26,
    phMin: 6.5,
    phMax: 7.5,
    origin: "Thailand, Southeast Asia",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$",
    description:
      "An extraordinary catfish with a completely transparent body — skeleton, organs and swim bladder all visible — wearing a faint iridescent blue sheen in good light. A mid-water schooler rather than a bottom dweller. Sensitive to water chemistry swings and does not cope well with change; demands a mature, stable tank.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 7,
    lifeExpectancyMaxYears: 8,
    behavior:
      "Schools in the middle of the water column, often orienting into a gentle current. Stressed or poorly kept specimens turn opaque and lose their signature transparency. Shy alone; bolder and more active in groups of six or more.",
    dimorphism:
      "No obvious external dimorphism; females may appear slightly fuller-bodied when gravid.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Platydoras-armatulus.html), Seriously Fish (https://www.seriouslyfish.com/species/platydoras-armatulus/), Fish Laboratory (https://fishlaboratory.com/fish/striped-raphael-catfish)
  // Confidence: adultSizeCm MEDIUM (SF 24 cm TL + FishLab 20–24 cm TL agree; FishBase 43 cm SL is a wild record — aquarium max used) | tempMinC/tempMaxC MEDIUM | phMin/phMax MEDIUM | minTankVolumeL MEDIUM
  // Notes: FishBase wild max 43 cm SL (~49 cm TL); aquarium specimens rarely exceed 24 cm TL. FishLab lifespan 10 yr captivity, 15–20 yr wild. SF min tank 108 L; FishLab recommends 50 gal (189 L); used 200 L for a fish of this eventual size.
  {
    id: "striped-raphael",
    commonName: "Striped raphael catfish",
    scientificName: "Platydoras armatulus",
    adultSizeCm: 24,
    adultSizeMinCm: 20,
    minTankVolumeL: 200,
    minFootprintCm: { length: 120, width: 45 },
    temperament: "predatory",
    diet: "omnivore",
    minGroupSize: 1,
    maxGroupSize: 3,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Amazon, Paraná",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A boldly striped doradid armoured catfish with cream-and-brown bands running the length of the body and sharp locking pectoral spines that can snag in nets. Hardy and very adaptable, but an opportunistic feeder that will eat any tankmate small enough to fit in its mouth. Strictly nocturnal and slow-growing — a decades-long commitment.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    lifeExpectancyMaxYears: 15,
    behavior:
      "Spends the day completely hidden in a cave or wedged under driftwood; emerges only after lights-out to forage the bottom. Tolerates other individuals of its own species when adequate refuges are provided. Produces an audible creaking stridulation when handled or alarmed.",
    dimorphism:
      "Not reliably sexable externally; females may be slightly larger and fuller-bodied.",
  },

  // --- Other Catfish & Plecos batch ---

  // Sources: FishBase (https://fishbase.se/summary/Agamyxis-pectinifrons.html), Seriously Fish (https://www.seriouslyfish.com/species/agamyxis-pectinifrons/), Fishkeeping World (https://www.fishkeepingworld.com/spotted-raphael-catfish/)
  // Confidence: adultSizeCm MEDIUM (FB SL 15 cm ~17 cm TL; SF 12–15 cm TL; FKW conflicting 20–30 cm — using FB-derived TL) | tempMinC/tempMaxC MEDIUM | phMin/phMax MEDIUM | minTankVolumeL LOW (SF 360 L vs FKW 76 L; used 300 L for a group)
  // Notes: Opportunistic feeder — will consume very small fish. SF recommends 4+ individuals; FKW dramatically underestimates tank size. Produces stridulation sounds like the striped raphael.
  {
    id: "spotted-raphael",
    commonName: "Spotted raphael catfish",
    scientificName: "Agamyxis pectinifrons",
    adultSizeCm: 17,
    adultSizeMinCm: 12,
    minTankVolumeL: 300,
    minFootprintCm: { length: 120, width: 45 },
    temperament: "predatory",
    diet: "omnivore",
    minGroupSize: 1,
    maxGroupSize: 4,
    tempMinC: 22,
    tempMaxC: 26,
    phMin: 5.5,
    phMax: 7.5,
    origin: "Amazon Basin",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A stocky doradid armoured catfish covered in white spots and blotches on a dark brown body, with the same sharp locking pectoral spines as its raphael relatives. Hardy and undemanding, but an opportunistic feeder that will swallow small tankmates given the chance. Nocturnal and reclusive by day.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    behavior:
      "Hides under driftwood or in caves during the day; active at night foraging the substrate. Tolerates others of its species if provided with adequate refuges, and like all doradids produces audible stridulation sounds when removed from the water.",
    dimorphism:
      "Not reliably sexable externally; females may be slightly larger.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Microglanis-iheringi.html), Fishkeeping World (https://www.fishkeepingworld.com/bumblebee-catfish/), Fish Laboratory (https://fishlaboratory.com/fish/bumblebee-catfish)
  // Confidence: adultSizeCm HIGH (FB SL 6 cm ~7 cm TL; FKW 7.6 cm; FishLab up to 7.6 cm) | tempMinC/tempMaxC MEDIUM (FB 24–28 °C vs FKW/FishLab 21–25 °C; used 22–26 °C) | phMin/phMax HIGH | minTankVolumeL MEDIUM
  {
    id: "bumblebee-catfish",
    commonName: "Bumblebee catfish",
    scientificName: "Microglanis iheringi",
    adultSizeCm: 7,
    minTankVolumeL: 80,
    minFootprintCm: { length: 75, width: 35 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 1,
    maxGroupSize: 3,
    tempMinC: 22,
    tempMaxC: 26,
    phMin: 6.5,
    phMax: 7.5,
    origin: "Orinoco Basin, Venezuela",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A small, chunky pimelodid catfish patterned in alternating yellow and dark brown bands — the bumblebee colour scheme. Peaceful and shy, it spends the day wedged into a cave or crevice and rarely emerges in bright light. An easy, undemanding catfish suited to most peaceful community setups.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 4,
    lifeExpectancyMaxYears: 5,
    behavior:
      "Strictly nocturnal and secretive; may never be seen during the day unless it has a snug cave to feel secure in. Peaceful toward similarly-sized tank mates but may snack on very small invertebrates at night.",
    dimorphism:
      "Females are generally larger and fuller-bodied; males are slimmer.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Phractocephalus-hemioliopterus.html), Seriously Fish (https://www.seriouslyfish.com/species/phractocephalus-hemioliopterus/), Fishkeeping World (https://www.fishkeepingworld.com/redtail-catfish/)
  // Confidence: adultSizeCm HIGH (FB 135 cm TL, SF 134 cm, FKW wild to 180 cm — used FB/SF consensus) | tempMinC/tempMaxC HIGH | phMin/phMax HIGH | minTankVolumeL HIGH (SF 10,368 L, FKW 5,678 L — used FKW minimum; SF is more conservative)
  // Notes: One of the largest freshwater fish in the aquarium hobby. SF requires 10,368 L; FKW 5,678 L. Both figures represent commercial-scale facilities; not suitable for any home aquarium. Territorial toward conspecifics and other large pimelodids.
  {
    id: "redtail-catfish",
    commonName: "Redtail catfish",
    scientificName: "Phractocephalus hemioliopterus",
    adultSizeCm: 135,
    adultSizeMinCm: 90,
    minTankVolumeL: 5000,
    minFootprintCm: { length: 400, width: 150 },
    temperament: "predatory",
    diet: "carnivore",
    minGroupSize: 1,
    maxGroupSize: 1,
    tempMinC: 21,
    tempMaxC: 26,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Amazon, Orinoco",
    careLevel: "advanced",
    rarity: "common",
    priceRange: "$$",
    description:
      "One of the largest catfish kept in captivity — a massive pimelodid with a stark red tail, white belly, and dark grey body that can reach 135 cm and live 15 years. Juveniles are sold widely in fish stores but grow rapidly to a size that makes home aquariums entirely unsuitable. Requires commercial-scale facilities of 5,000+ litres to be kept humanely.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 15,
    behavior:
      "An active, voracious swimmer (unlike most catfish) that will eat any fish or animal it can fit in its mouth. Territorial toward other large pimelodids and conspecifics. Grows several centimetres per month when young; most home aquariums are outgrown within a year.",
    dimorphism: "Not visually sexable externally.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Hypostomus-plecostomus.html), Wikipedia (https://en.wikipedia.org/wiki/Hypostomus_plecostomus), Fish Laboratory (https://fishlaboratory.com/fish/common-pleco)
  // Confidence: adultSizeCm LOW (FB SL 25 cm common TL 28 cm vs Wiki up to 50 cm SL; FishLab 30–61 cm — significant conflict; used Wiki/trade figure) | tempMinC/tempMaxC MEDIUM | phMin/phMax MEDIUM | minTankVolumeL MEDIUM
  // Notes: Taxonomy confusion is widespread — most fish sold as "common pleco" in the trade are Pterygoplichthys species (especially P. pardalis/multiradiatus), not true H. plecostomus. FishBase max SL 25 cm may reflect a restricted wild population; Wikipedia records up to 50 cm SL. The entry reflects trade fish characteristics.
  {
    id: "common-pleco",
    commonName: "Common pleco",
    scientificName: "Hypostomus plecostomus",
    adultSizeCm: 50,
    adultSizeMinCm: 30,
    minTankVolumeL: 300,
    minFootprintCm: { length: 150, width: 50 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 1,
    maxGroupSize: 1,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 6.5,
    phMax: 7.5,
    origin: "Northeastern South America",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$",
    description:
      "The archetypal sucker-mouthed catfish — dark, armoured, and sold in virtually every fish store as a juvenile 3–5 cm long. Grows rapidly to 30–50 cm and outgrows most tanks within a few years. Most fish sold under this name are actually large Pterygoplichthys species; all require the same long-term commitment. Peaceful when young but increasingly territorial as an adult.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    lifeExpectancyMaxYears: 15,
    behavior:
      "Grazes algae from surfaces during the day; nocturnal for active feeding. Adults become highly territorial toward other plecos and bottom-dwellers of similar body shape, chasing and fin-clipping. Produces copious waste — needs powerful biological filtration.",
    dimorphism:
      "Males often develop odontodes (bristle-like growths) on the head and pectoral spines; females are plainer.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Panaqolus-maccus.html), Fishkeeping World (https://www.fishkeepingworld.com/clown-pleco/), Fish Laboratory (https://fishlaboratory.com/fish/clown-pleco)
  // Confidence: adultSizeCm HIGH (FB SL 8.8 cm ~10 cm TL; FKW 10 cm; FishLab 8.75–10 cm) | tempMinC/tempMaxC HIGH | phMin/phMax MEDIUM | minTankVolumeL MEDIUM
  // Notes: FishLab uses old genus name Panaque maccus; FishBase accepted name is Panaqolus maccus. Wood-eating species requiring driftwood in the tank for gut health.
  {
    id: "clown-pleco",
    commonName: "Clown pleco",
    scientificName: "Panaqolus maccus",
    adultSizeCm: 10,
    minTankVolumeL: 80,
    minFootprintCm: { length: 75, width: 35 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 1,
    maxGroupSize: 1,
    tempMinC: 23,
    tempMaxC: 28,
    phMin: 6.5,
    phMax: 7.5,
    origin: "Orinoco Basin, Venezuela",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A small, boldly patterned loricariid pleco with alternating dark and cream bands, compact and manageable at only 10 cm. One of the few plecos that stays small enough for typical community tanks. Requires driftwood in the setup — it rasps and ingests wood as a key part of its diet and gut health.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    lifeExpectancyMaxYears: 12,
    behavior:
      "Spends most of its time clinging to driftwood and rasping algae or wood fibres; shy and reclusive in bright light. Territorial toward other plecos in a small tank — best kept one per setup unless the aquarium is large with multiple refuges.",
    dimorphism:
      "Males develop odontodes (hair-like bristles) on the cheeks and along the pectoral spines; females are plainer.",
  },

  // --- Plecos & Loaches batch ---

  // Sources: FishBase (https://fishbase.se/summary/Baryancistrus-xanthellus.html), Seriously Fish (https://www.seriouslyfish.com/species/baryancistrus-xanthellus/), Fish Laboratory (https://fishlaboratory.com/fish/gold-nugget-pleco)
  // Confidence: adultSizeCm MEDIUM (FB 29.7 cm TL, SF 22.4 cm TL, FishLab 20–25 cm; SF used as hobby max) | tempMinC/tempMaxC MEDIUM (SF 27–32 °C, FishLab 25–30 °C; FKW outlier 22.8–26.1 °C discarded — Xingu river ecology supports warmer end) | phMin/phMax HIGH | minTankVolumeL HIGH
  // Notes: Endemic to a narrow stretch of the Xingu; wild max ~30 cm per FishBase, aquarium specimens rarely exceed 22–25 cm. Requires very high oxygenation and frequent partial water changes (40–70% weekly per SF). Temperature conflict: FKW lists 22.8–26.1 °C, but SF and FishLab agree on a warmer range appropriate for the Xingu system.
  {
    id: "gold-nugget-pleco",
    commonName: "Gold nugget pleco",
    scientificName: "Baryancistrus xanthellus",
    adultSizeCm: 22,
    adultSizeMinCm: 15,
    minTankVolumeL: 200,
    minFootprintCm: { length: 120, width: 45 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 1,
    maxGroupSize: 1,
    tempMinC: 26,
    tempMaxC: 30,
    phMin: 6.5,
    phMax: 7.5,
    origin: "Rio Xingu, Brazil",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "A stunning loricariid pleco with a velvety dark body covered in bright yellow spots and yellow-tipped fins — one of the most visually striking plecos in the hobby. Endemic to the Rio Xingu, it demands warm, highly oxygenated, very clean water and does not tolerate poor water quality. Males become highly territorial toward one another and toward other bottom-dwellers as they mature.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 5,
    lifeExpectancyMaxYears: 10,
    behavior:
      "Grazes algae and aufwuchs from rocks; rests in caves during the day and is most active in low light. Requires numerous rock caves and hiding spots. Males stake out territories and will chase other plecos or similar-shaped fish; keep only one per tank unless the setup is very large.",
    dimorphism:
      "Males develop prominent odontodes (bristle-like spines) on the head and pectoral spines; females are plainer and fuller-bodied.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Botia-striata.html), Seriously Fish (https://www.seriouslyfish.com/species/botia-striata/), Wikipedia (https://en.wikipedia.org/wiki/Botia_striata)
  // Confidence: adultSizeCm HIGH (FB SL 7.8 cm ~9 cm TL; SF 8–9 cm TL; Wiki 9.5 cm) | tempMinC/tempMaxC HIGH | phMin/phMax MEDIUM | minTankVolumeL MEDIUM
  // Notes: Range is tiny (~400 km² in Western Ghats); listed as vulnerable in the wild. SF recommends groups of 10+ for ideal social behavior; 6 is workable minimum. Active snail eater.
  {
    id: "zebra-loach",
    commonName: "Zebra loach",
    scientificName: "Botia striata",
    adultSizeCm: 9,
    minTankVolumeL: 100,
    minFootprintCm: { length: 120, width: 30 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 12,
    tempMinC: 22,
    tempMaxC: 26,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Western Ghats, India",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "A compact, boldly patterned botia loach with alternating blue-grey and cream vertical stripes along the body. Peaceful within a group but boisterous and nippy — best avoided with slow-moving or long-finned species. An effective snail predator. Requires very clean, well-filtered water and a mature tank.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 8,
    behavior:
      "Highly social and best kept in groups of six or more, where it forms complex social hierarchies centred around food. A pack hunter of snails; will vigorously hunt down and eat any snail in the tank. Active and sometimes boisterous — may nip long fins on slower species.",
    dimorphism:
      "Females are rounder and deeper-bodied; males are more slender.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Misgurnus-anguillicaudatus.html), Seriously Fish (https://www.seriouslyfish.com/species/misgurnus-anguillicaudatus/), Fishkeeping World (https://www.fishkeepingworld.com/dojo-loach/)
  // Confidence: adultSizeCm MEDIUM (FB SL 28 cm ~32 cm TL; SF 20–28 cm TL; FKW 15–30 cm; used SF upper end) | tempMinC/tempMaxC HIGH (SF, FKW agree on 18–24 °C husbandry range; FB allows down to 5 °C but that is winter dormancy) | phMin/phMax MEDIUM | minTankVolumeL LOW (SF 540 L, FKW 208 L — large discrepancy; used FKW as the practical minimum for a single fish)
  // Notes: Subtropical species; tolerates unheated tanks in temperate homes. SF's 540 L may be for a group or a very active specimen. Burrowing fish — fine sand substrate essential.
  {
    id: "dojo-loach",
    commonName: "Dojo loach",
    scientificName: "Misgurnus anguillicaudatus",
    adultSizeCm: 28,
    adultSizeMinCm: 20,
    minTankVolumeL: 200,
    minFootprintCm: { length: 120, width: 45 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 1,
    maxGroupSize: 5,
    tempMinC: 15,
    tempMaxC: 24,
    phMin: 6.5,
    phMax: 8.0,
    origin: "East Asia",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A long, eel-like loach with a mottled sandy or olive body and small, downward-facing barbels, sometimes called the weather loach for its reported ability to sense barometric pressure changes and become unusually active before storms. Hardy, peaceful, and tolerant of cool temperatures — one of the few aquarium fish suited to an unheated setup in a temperate home.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 7,
    lifeExpectancyMaxYears: 10,
    behavior:
      "Spends much of its time burrowed into fine sand with only its head exposed; becomes very active at feeding time. Peaceful and curious; will investigate tank mates but does not bother them. Jumps readily — a tight lid is essential.",
    dimorphism:
      "Females are typically larger and fuller-bodied; males have slightly enlarged pectoral fins.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Beaufortia-kweichowensis.html), Seriously Fish (https://www.seriouslyfish.com/species/beaufortia-kweichowensis/), Wikipedia (https://en.wikipedia.org/wiki/Beaufortia_kweichowensis)
  // Confidence: adultSizeCm MEDIUM (FB common length 5.4 cm SL ~6 cm TL; SF 6.5–7.5 cm; Wiki 8 cm) | tempMinC/tempMaxC MEDIUM | phMin/phMax MEDIUM | minTankVolumeL LOW (SF 54 L for a small 60×30 cm base; high-flow sump or powerhead significantly changes effective requirements)
  // Notes: "Hillstream loach" is a name shared by many species; this entry is for B. kweichowensis specifically (Xi River, China). Requires very high water flow and oxygen levels — a specialist species. SF min tank 54 L (60×30 cm base); high flow gear required regardless of tank volume.
  {
    id: "hillstream-loach",
    commonName: "Hillstream loach",
    scientificName: "Beaufortia kweichowensis",
    adultSizeCm: 8,
    minTankVolumeL: 75,
    minFootprintCm: { length: 75, width: 35 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 12,
    tempMinC: 16,
    tempMaxC: 24,
    phMin: 6.5,
    phMax: 8.0,
    origin: "Xi River, China",
    careLevel: "advanced",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "A remarkable flatbodied loach with broad, laterally flattened pectoral and pelvic fins that form a suction disc, allowing it to cling to rocks in fast-flowing mountain streams. The patterning is striking — a maze of brown lines on cream to tan. Demands highly oxygenated, fast-flowing, cool water; not suitable for a standard still tropical tank.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 8,
    lifeExpectancyMaxYears: 10,
    behavior:
      "Clings to flat rock or glass surfaces using its suction-disc underside; grazes biofilm and algae continuously throughout the day. Males establish small feeding territories but conflicts are rarely damaging. Needs strong, turbulent flow directed across surfaces — powerheads or a spray bar are typically required.",
    dimorphism:
      "Males have a more pronounced head shape and develop odontodes on the snout and cheeks; females are rounder-bodied.",
  },

  // --- Loaches & Barbs batch ---

  // Sources: FishBase (https://fishbase.se/summary/Ambastaia-sidthimunki.html), Seriously Fish (https://www.seriouslyfish.com/species/ambastaia-sidthimunki/), Fish Laboratory (https://fishlaboratory.com/fish/dwarf-chain-loach)
  // Confidence: adultSizeCm HIGH (FB SL 5.5 cm ~6 cm TL; SF 5–6 cm TL; FishLab 6.3 cm TL) | tempMinC/tempMaxC MEDIUM (SF/FishLab 20–30 °C; FB 26–28 °C; Wiki 25–30 °C — used 24–30 °C) | phMin/phMax MEDIUM | minTankVolumeL MEDIUM
  // Notes: Thought extinct in the wild; rediscovered in Mae Klong and Ataran River basins in Thailand. Most individuals in the trade are captive-bred. Frequently misidentified as other dwarf loach species in shops. Lifespan up to 15 years.
  {
    id: "dwarf-chain-loach",
    commonName: "Dwarf chain loach",
    scientificName: "Ambastaia sidthimunki",
    adultSizeCm: 6,
    minTankVolumeL: 80,
    minFootprintCm: { length: 80, width: 35 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 12,
    tempMinC: 24,
    tempMaxC: 30,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Thailand",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "A tiny but charismatic botia loach with a distinctive chain-link pattern of dark spots connected by thin lines along the flanks. One of the smallest loaches suitable for aquariums, yet it forms the same complex social hierarchies as larger botias. Can nip at long fins and needs very clean, mature water.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 8,
    lifeExpectancyMaxYears: 12,
    behavior:
      "Mid-water schooler that bobs and weaves through the water column in a tight group; establishes social ranks through chasing and play-fighting. An effective snail hunter despite its small size. Needs a group of six or more to behave naturally and reduce stress-related aggression.",
    dimorphism:
      "Females are rounder and fuller-bodied; males are slightly more slender.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Barbodes-semifasciolatus.html), Seriously Fish (https://www.seriouslyfish.com/species/barbodes-semifasciolatus/), Fishkeeping World (https://www.fishkeepingworld.com/gold-barb/)
  // Confidence: adultSizeCm HIGH (FB max TL 7.6 cm; SF TL 7.5 cm; FKW 7.6 cm) | tempMinC/tempMaxC HIGH (all sources agree on 16–24 °C — subtropical, suits cool-water setups) | phMin/phMax HIGH | minTankVolumeL HIGH
  // Notes: The "gold barb" is a captive-developed colour morph of the wild olive-green Barbodes semifasciolatus; both are the same species and kept identically. A genuinely cool-water species — suitable for unheated tanks in temperate climates.
  {
    id: "gold-barb",
    commonName: "Gold barb",
    scientificName: "Barbodes semifasciolatus",
    adultSizeCm: 7.5,
    minTankVolumeL: 80,
    minFootprintCm: { length: 90, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 12,
    tempMinC: 16,
    tempMaxC: 24,
    phMin: 6.0,
    phMax: 8.0,
    origin: "Southern China",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A cheerful, bright-yellow schooling barb — a captive colour morph of the wild olive-green Barbodes semifasciolatus. Hardy and undemanding, it thrives in cooler water than most tropical fish, making it an ideal candidate for an unheated tank in a temperate home alongside white clouds and similar species. Peaceful and active.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 5,
    lifeExpectancyMaxYears: 7,
    behavior:
      "An active, tight schooler that spends the day foraging the mid-water and lower levels; always in motion. Peaceful and easy to keep with other small, similarly-paced species. Keep six or more for natural shoaling behavior.",
    dimorphism:
      "Females are deeper-bodied and plainer in colour; males are slimmer with brighter golden coloration and may show a reddish tint to the fins.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Barbonymus-schwanenfeldii.html), Seriously Fish (https://www.seriouslyfish.com/species/barbonymus-schwanefeldii/), Fish Laboratory (https://fishlaboratory.com/fish/tinfoil-barb)
  // Confidence: adultSizeCm HIGH (FB SL 35 cm ~40 cm TL; SF TL 35.5 cm; FishLab TL 35–41 cm) | tempMinC/tempMaxC HIGH | phMin/phMax MEDIUM | minTankVolumeL HIGH (SF 756 L for school; FishLab ~666 L for 6 fish; used 700 L)
  // Notes: FishBase accepted spelling is "schwanefeldii" (one n); backlog used "schwanenfeldii" — corrected to FishBase accepted name. Predatory toward small fish. Needs a secure lid — powerful jumper.
  {
    id: "tinfoil-barb",
    commonName: "Tinfoil barb",
    scientificName: "Barbonymus schwanefeldii",
    adultSizeCm: 35,
    adultSizeMinCm: 25,
    minTankVolumeL: 700,
    minFootprintCm: { length: 210, width: 60 },
    temperament: "predatory",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 10,
    tempMinC: 22,
    tempMaxC: 26,
    phMin: 6.5,
    phMax: 7.5,
    origin: "Southeast Asia",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$",
    description:
      "A large, silver-scaled barb with bold red fins that flash in the light — impressive but demanding. Sold as juveniles 4–6 cm long, tinfoil barbs grow rapidly to 35 cm and require a very large school in an enormous tank to be kept properly. Will eat any fish small enough to fit in its mouth.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 10,
    lifeExpectancyMaxYears: 15,
    behavior:
      "An energetic, constantly-moving open-water schooler that covers a lot of ground; needs a large, open swimming space with minimal decoration. Becomes nervous and prone to crashing into glass if kept in too small a group or too small a tank. A powerful jumper — a tight-fitting lid is essential.",
    dimorphism:
      "Not easily sexable externally; females may be slightly plumper when gravid.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Pethia-padamya.html), Seriously Fish (https://www.seriouslyfish.com/species/pethia-padamya/), Fish Laboratory (https://fishlaboratory.com/fish/odessa-barb)
  // Confidence: adultSizeCm MEDIUM (FB SL 4.6 cm ~5 cm TL; SF TL 4.6 cm; FishLab 7.6–12.7 cm — FishLab likely mis-identifies or inflates; used FB/SF) | tempMinC/tempMaxC MEDIUM | phMin/phMax MEDIUM (SF 6.5–8.5 very high upper end; FishLab 6.0–7.0; used 6.5–7.5) | minTankVolumeL MEDIUM
  // Notes: One of the most striking barbs in the trade — males develop vivid red flanks. FishLab's size data (3–5 inches = 7.6–12.7 cm) appears to be for a different species or error; FishBase and SF agree on ~5 cm.
  {
    id: "odessa-barb",
    commonName: "Odessa barb",
    scientificName: "Pethia padamya",
    adultSizeCm: 5,
    minTankVolumeL: 75,
    minFootprintCm: { length: 75, width: 35 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 10,
    tempMinC: 20,
    tempMaxC: 26,
    phMin: 6.5,
    phMax: 7.5,
    origin: "Myanmar",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A small, compact barb from Myanmar where the males are spectacular — a vivid wash of red across the flank offset by a cream belly and dark fin edging. Peaceful in groups and well-suited to a community tank, though males may spar and occasionally nip at long-finned companions.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 3,
    lifeExpectancyMaxYears: 5,
    behavior:
      "Active schooler that occupies the mid-water column; males establish a loose dominance order through short chasing bouts that rarely cause damage. Most vivid coloration appears when well-fed and in good water. Keep six or more to spread any inter-male aggression.",
    dimorphism:
      "Males are much more vivid — bright red flanks, dark scale edges and red-tipped fins; females are plainer, silver-bodied with a rounded belly.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Oliotius-oligolepis.html), Seriously Fish (https://www.seriouslyfish.com/species/oliotius-oligolepis/), Fish Laboratory (https://fishlaboratory.com/fish/checker-barb)
  // Confidence: adultSizeCm HIGH (FB TL 5.0 cm; SF TL 4–4.5 cm; FishLab TL 5 cm — consensus ~5 cm) | tempMinC/tempMaxC HIGH (FB/FishLab 20–24 °C; SF extends to 25 °C) | phMin/phMax MEDIUM (FB/FishLab 6.0–6.5; SF 5.5–7.5 — used 6.0–7.5) | minTankVolumeL MEDIUM
  {
    id: "checker-barb",
    commonName: "Checker barb",
    scientificName: "Oliotius oligolepis",
    adultSizeCm: 5,
    minTankVolumeL: 70,
    minFootprintCm: { length: 75, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 12,
    tempMinC: 20,
    tempMaxC: 25,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Sumatra, Indonesia",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A small, lively barb from Sumatra with a grid-like pattern of dark scale edges on a silver-gold body — the 'checker' of its common name. Males develop richer coloration with age. Peaceful, undemanding and easy to breed, it is a great starter barb that suits most small community setups.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 5,
    lifeExpectancyMaxYears: 8,
    behavior:
      "A constantly active schooler that explores the full water column; males spar and display to each other in brief fin-spreading chases but rarely cause harm. Gets more active and natural-looking in larger groups.",
    dimorphism:
      "Males develop richer golden-red coloration and are slimmer; females are plainer and rounder, especially when full of eggs.",
  },

  // --- Danios, Rasboras & micro fish batch ---

  // Sources: FishBase (https://fishbase.se/summary/Desmopuntius-pentazona.html), Seriously Fish (https://www.seriouslyfish.com/species/desmopuntius-pentazona/), Wikipedia (https://en.wikipedia.org/wiki/Desmopuntius_pentazona)
  // Confidence: adultSizeCm MEDIUM (FB/Wiki 8.8 cm TL vs SF 5.5 cm TL — two sources agree on 8.8 cm; SF may reflect typical aquarium size) | tempMinC/tempMaxC MEDIUM | phMin/phMax HIGH (FB/Wiki both give 5.0–6.0; SF extends to 7.0)
  // Notes: Blackwater peat-swamp species requiring soft, acidic water; not suitable for hard or alkaline setups. SF's 5.5 cm TL is likely the typical captive max; FB and Wiki record wild max of 8.8 cm.
  {
    id: "five-banded-barb",
    commonName: "Five-banded barb",
    scientificName: "Desmopuntius pentazona",
    adultSizeCm: 9,
    adultSizeMinCm: 5,
    minTankVolumeL: 72,
    minFootprintCm: { length: 80, width: 35 },
    temperament: "peaceful",
    diet: "carnivore",
    minGroupSize: 8,
    maxGroupSize: 15,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 5.0,
    phMax: 7.0,
    origin: "Borneo, Southeast Asia",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "A striking blackwater barb with five bold black vertical bands on a coppery-gold body. Originates from peat-swamp streams in Borneo and requires soft, acidic water — it does not thrive in the hard alkaline conditions many community tanks provide. In correct water, a lively and peaceful schooler.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 5,
    behavior:
      "A tight schooler that moves in formation through the mid-water; settles best in a densely planted tank with gentle flow and dim lighting that mimics its peat-swamp habitat. Peaceful and harmless to all but the smallest invertebrates.",
    dimorphism:
      "Females are rounder and fuller-bodied; males are slimmer and may show brighter banding.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Devario-aequipinnatus.html), Fishkeeping World (https://www.fishkeepingworld.com/giant-danio/), Fish Laboratory (https://fishlaboratory.com/fish/giant-danio)
  // Confidence: adultSizeCm MEDIUM (FB TL 15 cm; FKW 10–15 cm; FishLab 10 cm — wild max vs typical aquarium 10 cm; used 12 cm) | tempMinC/tempMaxC HIGH | phMin/phMax MEDIUM | minTankVolumeL MEDIUM
  // Notes: Noticeably larger than other danio species; fast and boisterous — can stress smaller, slower-moving tankmates. FishBase max 15 cm is the wild record; aquarium specimens typically 10–12 cm.
  {
    id: "giant-danio",
    commonName: "Giant danio",
    scientificName: "Devario aequipinnatus",
    adultSizeCm: 12,
    adultSizeMinCm: 10,
    minTankVolumeL: 150,
    minFootprintCm: { length: 120, width: 40 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 12,
    tempMinC: 22,
    tempMaxC: 26,
    phMin: 6.5,
    phMax: 7.5,
    origin: "India, Southeast Asia",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "The largest of the commonly kept danios — a streamlined, fast-swimming schooler with horizontal blue and yellow-gold stripes along the flanks. Lively and hardy, it makes an impressive display fish in a large school but can bother smaller, slower companions with its boisterous swimming and competitive feeding.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 5,
    lifeExpectancyMaxYears: 7,
    behavior:
      "An energetic open-water schooler that moves fast and covers the full length of the tank; needs plenty of swimming space. Can outcompete slower fish at feeding time. Groups of six or more are calmer and more cohesive than smaller numbers.",
    dimorphism:
      "Females are deeper-bodied and fuller; males are slimmer with brighter colour during spawning.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Danio-albolineatus.html), Seriously Fish (https://www.seriouslyfish.com/species/danio-albolineatus/), Fish Laboratory (https://fishlaboratory.com/fish/pearl-danio)
  // Confidence: adultSizeCm MEDIUM (SF 5.5 cm TL; FishLab 5.0 cm; FB common SL 3.4 cm → ~4 cm TL, max TL 9.6 cm likely a wild outlier — SF used) | tempMinC/tempMaxC MEDIUM (SF 16–25 °C; FishLab 20–26 °C; used 18–26 °C) | phMin/phMax HIGH | minTankVolumeL MEDIUM
  // Notes: FB common SL of 3.4 cm is the typical specimen size; 9.6 cm TL is probably a wild-record outlier. SF uses old synonym Brachydanio albolineata; current accepted name is Danio albolineatus (FishBase). A secure lid is essential — strong jumper.
  {
    id: "pearl-danio",
    commonName: "Pearl danio",
    scientificName: "Danio albolineatus",
    adultSizeCm: 5.5,
    minTankVolumeL: 75,
    minFootprintCm: { length: 90, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 12,
    tempMinC: 18,
    tempMaxC: 26,
    phMin: 6.0,
    phMax: 8.0,
    origin: "Myanmar, Southeast Asia",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A delicate, iridescent danio with a faint pinkish or blue sheen across the body and fine horizontal streaks along the flanks — the 'pearl' of its common name becomes most vivid in a good light. Peaceful, active, and extremely hardy. Tolerates a wider temperature range than most tropical danios, suiting a slightly cooler setup.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 3,
    lifeExpectancyMaxYears: 5,
    behavior:
      "An active mid-water to surface schooler that darts constantly across the tank; females tend to be rounder and slightly calmer than the faster-moving males. Strong jumper — a tight-fitting lid is essential.",
    dimorphism:
      "Females are rounder and deeper-bodied; males are slimmer with a brighter iridescent sheen, particularly during spawning.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Boraras-urophthalmoides.html), Seriously Fish (https://www.seriouslyfish.com/species/boraras-urophthalmoides/), Fish Laboratory (https://fishlaboratory.com/fish/exclamation-point-rasbora)
  // Confidence: adultSizeCm MEDIUM (FB 4.0 cm TL discarded as error; SF max 1.6 cm; FishLab 2.5 cm — used 2 cm as compromise) | tempMinC/tempMaxC MEDIUM | phMin/phMax HIGH | minTankVolumeL MEDIUM
  // Notes: FishBase max 4.0 cm TL is almost certainly an error or misidentification — the species is a confirmed micro/nano fish; SF and FishLab agree on 1.5–2.5 cm. One of the smallest aquarium fish available; not suitable for any tank containing fish larger than 3–4 cm that might predate it.
  {
    id: "exclamation-point-rasbora",
    commonName: "Exclamation point rasbora",
    scientificName: "Boraras urophthalmoides",
    adultSizeCm: 2,
    minTankVolumeL: 40,
    minFootprintCm: { length: 45, width: 30 },
    temperament: "peaceful",
    diet: "carnivore",
    minGroupSize: 8,
    maxGroupSize: 20,
    tempMinC: 20,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 7.0,
    origin: "Southeast Asia",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "One of the smallest aquarium fish in regular trade — a micro-rasbora barely 2 cm long, with a bold black spot at the base of the tail and a dash of brilliant red on the body that together resemble an exclamation mark. Completely peaceful but extremely vulnerable to any tankmate large enough to swallow it; best kept as a species-only tank or with other nano fish of similar size.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 4,
    lifeExpectancyMaxYears: 8,
    behavior:
      "Schools loosely in the mid-water; most vivid and active in a large group of 10 or more. Needs very small food items — standard flake is too large; use micro-pellets, infusoria, or baby brine shrimp. Sensitive to water quality and parameter swings.",
    dimorphism:
      "Females are rounder and slightly larger; males are more intensely coloured.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Trigonostigma-espei.html), Seriously Fish (https://www.seriouslyfish.com/species/trigonostigma-espei/), Fish Laboratory (https://fishlaboratory.com/fish/lambchop-rasbora)
  // Confidence: adultSizeCm MEDIUM (FB SL 2.5 cm ~3 cm TL; SF TL 2.5–3 cm; FishLab 5 cm is likely an outlier) | tempMinC/tempMaxC HIGH (all 3 agree 23–28 °C) | phMin/phMax MEDIUM | minTankVolumeL MEDIUM
  // Notes: FishLab's 5 cm (2 inches) TL is inconsistent with FB and SF and is likely an error or mixed-species confusion. Very similar to the harlequin rasbora (T. heteromorpha) but smaller and with a more elongated body patch.
  {
    id: "espei-rasbora",
    commonName: "Lambchop rasbora",
    scientificName: "Trigonostigma espei",
    adultSizeCm: 3,
    minTankVolumeL: 54,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 8,
    maxGroupSize: 15,
    tempMinC: 23,
    tempMaxC: 28,
    phMin: 5.5,
    phMax: 7.5,
    origin: "Thailand, Cambodia",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "A petite, charming schooling fish closely related to the harlequin rasbora but smaller and with a more elongated, lambchop-shaped dark patch on the hind body — the source of both common names. Thrives in a planted, slightly acidic, warm setup with gentle filtration. One of the most rewarding micro-community fish when kept in a large group.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 3,
    lifeExpectancyMaxYears: 5,
    behavior:
      "A tight, graceful schooler that drifts through the mid-water in a synchronized group; most active and colourful in a well-planted tank with gentle flow. Peaceful with all suitably-sized tank mates. Breed in small caves or under broad leaves.",
    dimorphism:
      "Females are rounder and more uniformly coloured; males are slimmer with a more vibrant body patch.",
  },

  // --- Rasboras, Sharks & Algae Eaters batch ---

  // Sources: FishBase (https://fishbase.se/summary/Rasbora-trilineata.html), Seriously Fish (https://www.seriouslyfish.com/species/rasbora-trilineata/), Fish Laboratory (https://fishlaboratory.com/fish/scissortail-rasbora)
  // Confidence: adultSizeCm MEDIUM (FB TL 13 cm; SF TL 15 cm; FishLab 12.7–15.2 cm — FB/SF/FishLab agree on 13–15 cm range; FKW outlier 8.9 cm discarded) | tempMinC/tempMaxC HIGH | phMin/phMax MEDIUM | minTankVolumeL LOW (SF 255 L vs FKW/FishLab 76 L — SF used for group of 6 at this size)
  // Notes: Surface-dweller and strong jumper; a tight lid is essential. FKW's 8.9 cm appears to be for juvenile trade fish — adult max clearly 13–15 cm per FB and SF.
  {
    id: "scissortail-rasbora",
    commonName: "Scissortail rasbora",
    scientificName: "Rasbora trilineata",
    adultSizeCm: 14,
    adultSizeMinCm: 10,
    minTankVolumeL: 200,
    minFootprintCm: { length: 120, width: 45 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
    maxGroupSize: 12,
    tempMinC: 22,
    tempMaxC: 26,
    phMin: 6.5,
    phMax: 7.5,
    origin: "Southeast Asia",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A large, streamlined rasbora named for its deeply forked tail with bold black-and-white tips that open and close as it swims — the scissor motion is most visible in a school. Peaceful, active and hardy; needs a long, open tank to accommodate its restless schooling and surface-feeding habits.",
    waterType: "freshwater",
    tankRegion: "top",
    lifeExpectancyYears: 5,
    lifeExpectancyMaxYears: 10,
    behavior:
      "A fast, surface-hugging schooler that moves in tight formation; can be skittish and bolt into the glass if suddenly startled, so needs a calm environment. Strong jumper — a tight-fitting lid is essential. Keep six or more for natural schooling behavior.",
    dimorphism:
      "Females are fuller-bodied and rounder; males are slightly slimmer.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Epalzeorhynchos-bicolor.html), Seriously Fish (https://www.seriouslyfish.com/species/epalzeorhynchos-bicolor/), Wikipedia (https://en.wikipedia.org/wiki/Epalzeorhynchos_bicolor)
  // Confidence: adultSizeCm MEDIUM (FB TL 13 cm; SF TL 12.5 cm — close agreement; Wiki 16 cm is an outlier — used FB/SF) | tempMinC/tempMaxC HIGH | phMin/phMax MEDIUM | minTankVolumeL MEDIUM
  // Notes: Critically Endangered in the wild; once thought extinct (1996–2011). Virtually all trade specimens are captive-bred. Becomes highly territorial as it matures; should not be kept with similarly-shaped fish. Lifespan: SF says 15+ yr; Wiki says 5–8 yr captivity — used 8 yr as conservative.
  {
    id: "redtail-black-shark",
    commonName: "Redtail black shark",
    scientificName: "Epalzeorhynchos bicolor",
    adultSizeCm: 13,
    minTankVolumeL: 200,
    minFootprintCm: { length: 120, width: 45 },
    temperament: "aggressive",
    diet: "omnivore",
    minGroupSize: 1,
    maxGroupSize: 1,
    tempMinC: 22,
    tempMaxC: 26,
    phMin: 6.5,
    phMax: 7.5,
    origin: "Chao Phraya, Thailand",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$",
    description:
      "A striking aquarium classic — jet-black body with a vivid red tail, resembling a miniature shark in silhouette. Critically endangered in the wild; almost all trade fish are captive-bred. Peaceful as a juvenile but becomes increasingly territorial and aggressive as it matures, especially toward fish of similar shape or colour. Best kept as the only bottom-dwelling shark-type fish in the tank.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 5,
    lifeExpectancyMaxYears: 8,
    behavior:
      "Patrols a defined territory across the bottom, chasing intruders vigorously; nocturnal but active during the day once settled. Becomes increasingly intolerant of similar-looking species with age. Good jumper — a lid is recommended.",
    dimorphism:
      "Not easily sexable externally; females may be slightly fuller-bodied.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Epalzeorhynchos-frenatum.html), Seriously Fish (https://www.seriouslyfish.com/species/epalzeorhynchos-frenatum/), Fish Laboratory (https://fishlaboratory.com/fish/rainbow-shark)
  // Confidence: adultSizeCm HIGH (FB TL 15 cm; SF TL 13–15 cm; FishLab TL 15 cm) | tempMinC/tempMaxC HIGH | phMin/phMax MEDIUM | minTankVolumeL MEDIUM
  // Notes: Very similar to the redtail black shark but with red-tipped fins on a dark body. Equally territorial and not suitable for grouping. SF records lifespan exceeding 15 years; FishLab says 4–6 years — used 8 years.
  {
    id: "rainbow-shark",
    commonName: "Rainbow shark",
    scientificName: "Epalzeorhynchos frenatum",
    adultSizeCm: 15,
    minTankVolumeL: 200,
    minFootprintCm: { length: 120, width: 45 },
    temperament: "aggressive",
    diet: "omnivore",
    minGroupSize: 1,
    maxGroupSize: 1,
    tempMinC: 24,
    tempMaxC: 26,
    phMin: 6.5,
    phMax: 8.0,
    origin: "Mekong, Southeast Asia",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$",
    description:
      "A sleek dark-grey cyprinid with red-orange fins — the 'rainbow' of its name. Almost identical in behaviour to the redtail black shark; peaceful as a juvenile but steadily more territorial as it matures. Not suitable for grouping with other shark-type fish or similar-looking species. Best kept singly with robust, unrelated tankmates.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 5,
    lifeExpectancyMaxYears: 8,
    behavior:
      "Grazes the substrate and rocks for algae and biofilm; establishes a territory that it defends aggressively from similar-looking species. Juveniles are more peaceful. Requires excellent filtration — sensitive to organic waste.",
    dimorphism:
      "Females may be slightly rounder and fuller-bodied; males develop small black lines on the caudal fin.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Epalzeorhynchos-kalopterus.html), Seriously Fish (https://www.seriouslyfish.com/species/epalzeorhynchos-kalopterus/), Fish Laboratory (https://fishlaboratory.com/fish/flying-fox-fish)
  // Confidence: adultSizeCm HIGH (FB TL 16 cm; SF TL 16 cm; FishLab TL 16 cm — perfect agreement) | tempMinC/tempMaxC HIGH | phMin/phMax HIGH | minTankVolumeL MEDIUM
  // Notes: Frequently confused in the trade with the Siamese algae eater (Crossocheilus oblongus). The flying fox has a broader brown lateral stripe, black-edged fins and a more rounded snout. Adults largely stop eating algae and become aggressively territorial — not a long-term algae control solution. SF records lifespan 15+ yr; FishLab 8–10 yr — used 10 yr.
  {
    id: "flying-fox",
    commonName: "Flying fox",
    scientificName: "Epalzeorhynchos kalopterus",
    adultSizeCm: 16,
    minTankVolumeL: 200,
    minFootprintCm: { length: 120, width: 45 },
    temperament: "aggressive",
    diet: "omnivore",
    minGroupSize: 1,
    maxGroupSize: 1,
    tempMinC: 23,
    tempMaxC: 26,
    phMin: 6.5,
    phMax: 7.5,
    origin: "Thailand, Borneo, Indonesia",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$",
    description:
      "A streamlined, torpedo-shaped cyprinid with a broad dark stripe bordered by gold, contrasting black-edged fins, and a pointed snout. Often sold as an algae eater but juveniles eat algae while adults abandon this and become territorial. Frequently confused with the true Siamese algae eater (Crossocheilus oblongus), which is the better algae-control choice.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 8,
    lifeExpectancyMaxYears: 10,
    behavior:
      "Grazes biofilm from rocks and plants as a juvenile; adults shift to a more omnivorous diet and become increasingly territorial toward fish with similar body shapes, chasing them relentlessly. Best kept singly with unrelated, robust tankmates.",
    dimorphism:
      "Females are rounder-bodied; males are slimmer. Difficult to sex externally.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Crossocheilus-oblongus.html), Fishkeeping World (https://www.fishkeepingworld.com/siamese-algae-eater/), Fish Laboratory (https://fishlaboratory.com/fish/siamese-algae-eater)
  // Confidence: adultSizeCm MEDIUM (FB SL 16 cm ~18–19 cm TL; FKW TL 15 cm; FishLab TL 15 cm — FKW/FishLab agree on 15 cm aquarium max; used 15 cm) | tempMinC/tempMaxC HIGH | phMin/phMax HIGH | minTankVolumeL MEDIUM
  // Notes: The true Siamese algae eater is the only reliably effective consumer of black beard algae in the hobby; often confused with the flying fox (Epalzeorhynchos kalopterus). Distinguish by the single sharp lateral stripe that extends into the tail on C. oblongus vs the broader, gold-bordered stripe of the flying fox.
  {
    id: "siamese-algae-eater",
    commonName: "Siamese algae eater",
    scientificName: "Crossocheilus oblongus",
    adultSizeCm: 15,
    minTankVolumeL: 100,
    minFootprintCm: { length: 100, width: 40 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 1,
    maxGroupSize: 6,
    tempMinC: 24,
    tempMaxC: 26,
    phMin: 6.5,
    phMax: 7.5,
    origin: "Thailand, Southeast Asia",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "The most effective algae-eating fish in the hobby and the only species that reliably consumes black beard algae. A sleek silver fish with a clean black stripe from snout to tail tip. Peaceful and undemanding, though it grows to 15 cm — a medium-sized fish for a species often added to nano tanks. Frequently confused with the flying fox, which is less effective and more aggressive.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    behavior:
      "Actively grazes algae from all surfaces throughout its life; can be kept alone or in small groups, though males may skirmish in very small tanks. Becomes more omnivorous with age but continues algae-grazing. Active swimmer — not a sedentary fish.",
    dimorphism:
      "Not reliably sexable externally; females may be slightly fuller-bodied.",
  },

  // --- Gouramis & Algae Eaters batch ---

  // Sources: FishBase (https://fishbase.se/summary/Gyrinocheilus-aymonieri.html), Seriously Fish (https://www.seriouslyfish.com/species/gyrinocheilus-aymonieri/), Fishkeeping World (https://www.fishkeepingworld.com/chinese-algae-eater/)
  // Confidence: adultSizeCm MEDIUM (FB SL 28 cm ~32 cm TL; SF TL 28 cm; FKW 12.7–17.8 cm in captivity — FB/SF agree; FKW reflects trade fish size) | tempMinC/tempMaxC MEDIUM | phMin/phMax MEDIUM | minTankVolumeL MEDIUM
  // Notes: Unlike the Siamese algae eater, this species abandons algae-grazing as an adult and becomes territorial; also develops a habit of sucking the slime coat from other fish. Lifespan: SF says 15+ yr; FKW 7–10 yr — used 10 yr. adultSizeMinCm reflects typical trade fish (juveniles sold at 5–10 cm).
  {
    id: "chinese-algae-eater",
    commonName: "Chinese algae eater",
    scientificName: "Gyrinocheilus aymonieri",
    adultSizeCm: 28,
    adultSizeMinCm: 15,
    minTankVolumeL: 250,
    minFootprintCm: { length: 150, width: 45 },
    temperament: "aggressive",
    diet: "omnivore",
    minGroupSize: 1,
    maxGroupSize: 1,
    tempMinC: 22,
    tempMaxC: 26,
    phMin: 6.5,
    phMax: 7.5,
    origin: "Southeast Asia",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$",
    description:
      "A popular algae eater as a juvenile — active, gold-striped and effective at grazing — but its reputation falls apart with age. Adults abandon algae-eating, grow to 28 cm, become aggressive, and develop a destructive habit of sucking the protective slime coat from other fish. A better long-term choice for algae control is the Siamese algae eater (Crossocheilus oblongus).",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 7,
    lifeExpectancyMaxYears: 10,
    behavior:
      "Active sucker-mouthed fish that grazes rocks and glass as a juvenile; adults become increasingly territorial and will chase, ram, and attach themselves to the flanks of other fish to rasp their slime coat. Best kept singly with robust, unrelated tankmates.",
    dimorphism:
      "Not reliably sexable externally; females may be slightly rounder.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Trichopodus-trichopterus.html), Seriously Fish (https://www.seriouslyfish.com/species/trichopodus-trichopterus/), Fishkeeping World (https://www.fishkeepingworld.com/blue-gourami/)
  // Confidence: adultSizeCm HIGH (FB SL 15 cm ~17 cm TL; SF TL 15 cm; FKW 12.7–15.2 cm — solid consensus around 15 cm) | tempMinC/tempMaxC MEDIUM | phMin/phMax MEDIUM | minTankVolumeL MEDIUM
  // Notes: The blue gourami has many captive colour morphs (gold, opaline/marbled, platinum, Cosby) that are all Trichopodus trichopterus and kept identically. Males are particularly aggressive toward each other and toward other male gouramis; best kept one male per tank.
  {
    id: "blue-gourami",
    commonName: "Blue gourami",
    scientificName: "Trichopodus trichopterus",
    adultSizeCm: 15,
    minTankVolumeL: 90,
    minFootprintCm: { length: 90, width: 40 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 1,
    maxGroupSize: 1,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 6.5,
    phMax: 8.0,
    origin: "Southeast Asia",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A widespread and robust labyrinth fish sold in a range of colour forms — the wild blue-grey, gold, opaline/marbled and platinum morphs are all the same species. Relatively easy to keep and hardy, but males become territorial as they mature and should not be housed with other male gouramis or bettas. Available in virtually every fish store.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 5,
    behavior:
      "A surface-breathing labyrinth fish that gulps air at the surface regularly; keeps this habit even in well-oxygenated tanks. Males are territorial and chase other males and slow-finned fish. Feeler-like pelvic fins probe tank mates and the environment constantly.",
    dimorphism:
      "Males have a longer, more pointed dorsal fin; females are rounder with a shorter, rounded dorsal.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Trichopodus-microlepis.html), Seriously Fish (https://www.seriouslyfish.com/species/trichopodus-microlepis/), Fishkeeping World (https://www.fishkeepingworld.com/moonlight-gourami/)
  // Confidence: adultSizeCm HIGH (FB TL 14 cm; SF TL 15 cm; FKW TL 12–15 cm — good consensus ~15 cm) | tempMinC/tempMaxC HIGH (all 3 agree 25–30 °C) | phMin/phMax MEDIUM | minTankVolumeL MEDIUM
  {
    id: "moonlight-gourami",
    commonName: "Moonlight gourami",
    scientificName: "Trichopodus microlepis",
    adultSizeCm: 15,
    minTankVolumeL: 90,
    minFootprintCm: { length: 90, width: 40 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 1,
    maxGroupSize: 2,
    tempMinC: 25,
    tempMaxC: 30,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Cambodia, Vietnam",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "A large, elegant gourami with an ethereal, reflective silver body that shimmers like moonlight — one of the most beautiful in the family. Less common in the hobby than the blue gourami and somewhat more sensitive; it prefers warmer, softer water and is more easily stressed by boisterous tankmates. Males can be territorial.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 4,
    lifeExpectancyMaxYears: 5,
    behavior:
      "A surface-breathing labyrinth fish; calmer and less nippy than the blue gourami. Males will spar and chase rival males; pairs do best with a ratio of one male to two or more females. Skittish in a busy tank — prefers quiet, planted setups.",
    dimorphism:
      "Males have a longer, more pointed dorsal and anal fin; females are rounder, especially when carrying eggs.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Helostoma-temminckii.html), Fishkeeping World (https://www.fishkeepingworld.com/kissing-gourami/), Fish Laboratory (https://fishlaboratory.com/fish/kissing-gourami)
  // Confidence: adultSizeCm HIGH (FB TL 30 cm; FKW 30.5 cm; FishLab 25–30.5 cm — strong consensus) | tempMinC/tempMaxC HIGH | phMin/phMax HIGH | minTankVolumeL HIGH
  // Notes: The "kissing" behaviour is competitive lip-locking between males testing strength — not affection. Lifespan highly variable: 7 yr average per FishLab; up to 20–25 yr documented.
  {
    id: "kissing-gourami",
    commonName: "Kissing gourami",
    scientificName: "Helostoma temminckii",
    adultSizeCm: 30,
    adultSizeMinCm: 20,
    minTankVolumeL: 200,
    minFootprintCm: { length: 120, width: 45 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 1,
    maxGroupSize: 2,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 8.0,
    origin: "Southeast Asia",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$",
    description:
      "A large, distinctive labyrinth fish named for the 'kissing' behaviour in which males lock lips and push against each other — a display of strength, not affection. Grows to 30 cm and needs a spacious tank; sold as small juveniles in shops but quickly outgrows starter setups. Generally peaceful but can intimidate smaller fish.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 7,
    lifeExpectancyMaxYears: 20,
    behavior:
      "A surface-breathing labyrinth fish that regularly gulps air; constantly grazes surfaces for algae and biofilm. The kissing behaviour is most common between rival males. Can be territorial toward similarly-shaped fish but generally leaves unlike species alone.",
    dimorphism:
      "Males and females are nearly identical externally; females may be slightly fuller-bodied when gravid.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Osphronemus-goramy.html), Seriously Fish (https://www.seriouslyfish.com/species/osphronemus-goramy/), Fishkeeping World (https://www.fishkeepingworld.com/giant-gourami/)
  // Confidence: adultSizeCm MEDIUM (FB SL 70 cm ~80 cm TL; SF TL 70 cm; FKW TL 50.8 cm — FB/SF agree on wild max of 70+ cm; FKW likely reflects typical captive size) | tempMinC/tempMaxC HIGH | phMin/phMax MEDIUM | minTankVolumeL MEDIUM (SF ~2,880 L is likely a misextraction; FKW 757 L used; SF may have listed a larger setup ideal)
  // Notes: One of the largest gourami species; also a food fish throughout Southeast Asia. SF and FishBase indicate TL beyond 70 cm in the wild; captive fish typically reach 45–60 cm. Lifespan: SF says 20+ yr; FKW 2–5 yr (likely poorly-kept fish) — used 20 yr.
  {
    id: "giant-gourami",
    commonName: "Giant gourami",
    scientificName: "Osphronemus goramy",
    adultSizeCm: 70,
    adultSizeMinCm: 45,
    minTankVolumeL: 750,
    minFootprintCm: { length: 200, width: 75 },
    temperament: "predatory",
    diet: "omnivore",
    minGroupSize: 1,
    maxGroupSize: 1,
    tempMinC: 20,
    tempMaxC: 30,
    phMin: 6.5,
    phMax: 8.0,
    origin: "Southeast Asia",
    careLevel: "advanced",
    rarity: "common",
    priceRange: "$$",
    description:
      "The largest gourami species — a powerful, hump-headed labyrinth fish that grows to 70 cm and lives over 20 years. Juveniles are attractive and 10 cm long when sold; adults are enormous, long-lived, and will eat any fish small enough to swallow. Requires a professional-scale aquarium and a genuine long-term commitment.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 15,
    lifeExpectancyMaxYears: 20,
    behavior:
      "A surface-breathing labyrinth fish that needs unobstructed access to the surface. Intelligent and slow-moving; interacts with its keeper and can become hand-fed. Generally peaceful with similarly-large, unrelated fish but will consume anything it can fit in its mouth. Produces large amounts of waste — requires very powerful filtration.",
    dimorphism:
      "Males develop a more prominent head hump and longer, more pointed dorsal and anal fins; females are rounder.",
  },

  // --- Small Gouramis & New World Cichlids batch ---

  // Sources: FishBase (https://fishbase.se/summary/Trichopsis-pumila.html), Seriously Fish (https://www.seriouslyfish.com/species/trichopsis-pumila/), Fishkeeping World (https://www.fishkeepingworld.com/sparkling-gourami/)
  // Confidence: adultSizeCm HIGH (FB SL 4 cm ~4.6 cm TL; SF 3.5–4 cm; FKW 4 cm — excellent consensus) | tempMinC/tempMaxC HIGH | phMin/phMax MEDIUM | minTankVolumeL MEDIUM
  {
    id: "sparkling-gourami",
    commonName: "Sparkling gourami",
    scientificName: "Trichopsis pumila",
    adultSizeCm: 4,
    minTankVolumeL: 40,
    minFootprintCm: { length: 45, width: 30 },
    temperament: "peaceful",
    diet: "carnivore",
    minGroupSize: 1,
    maxGroupSize: 6,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Southeast Asia",
    careLevel: "beginner",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "A jewel of the nano tank — the smallest commonly kept gourami, barely 4 cm long, with iridescent blue-green spangles that sparkle in light against a warm beige body. Produces audible clicking and purring sounds during courtship and territorial disputes, detectable without amplification. Males compete but rarely cause serious harm.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 4,
    lifeExpectancyMaxYears: 5,
    behavior:
      "A surface-breathing labyrinth fish that drifts slowly through heavily-planted water, occasionally snapping at the surface. Males spar with fin displays and clicking sounds rather than physical combat. Shy with boisterous tankmates; best kept as a species tank or with other small, peaceful nano fish.",
    dimorphism:
      "Males are more intensely coloured with longer, more pointed dorsal and caudal fins; females are plainer and rounder.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Trichopsis-vittata.html), Seriously Fish (https://www.seriouslyfish.com/species/trichopsis-vittata/), Wikipedia (https://en.wikipedia.org/wiki/Trichopsis_vittata)
  // Confidence: adultSizeCm MEDIUM (FB TL 8 cm; SF TL 6–7 cm; Wiki TL 5–7 cm — FB is the outlier; SF/Wiki agree on 6–7 cm) | tempMinC/tempMaxC HIGH | phMin/phMax MEDIUM | minTankVolumeL MEDIUM
  // Notes: Produces audible croaking sounds via modified pectoral fin structures; sounds are used in dominance and courtship displays. Best heard at night or with a hydrophone near the glass.
  {
    id: "croaking-gourami",
    commonName: "Croaking gourami",
    scientificName: "Trichopsis vittata",
    adultSizeCm: 7,
    adultSizeMinCm: 5,
    minTankVolumeL: 54,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "carnivore",
    minGroupSize: 1,
    maxGroupSize: 4,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 7.5,
    origin: "Southeast Asia",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "Larger than the sparkling gourami but with the same remarkable ability to produce audible croaking sounds — earned in the name. A peaceful, undemanding labyrinth fish suited to a planted tank with quiet, similarly-sized companions. Builds bubble nests at the surface under broad leaves.",
    waterType: "freshwater",
    tankRegion: "top",
    lifeExpectancyYears: 3,
    lifeExpectancyMaxYears: 5,
    behavior:
      "A surface and upper-column fish that lurks among reeds and under large leaves; occasionally gulps air at the surface. Males croak and display to each other and during spawning. Peaceful outside breeding season; best in a densely-planted, low-flow setup.",
    dimorphism:
      "Males are more colourful with longer, more pointed fins; females are plainer and rounder, especially when gravid.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Macropodus-opercularis.html), Seriously Fish (https://www.seriouslyfish.com/species/macropodus-opercularis/), Fishkeeping World (https://www.fishkeepingworld.com/paradise-fish/)
  // Confidence: adultSizeCm HIGH (FB SL 6.7 cm ~7.7 cm TL; SF TL 7–8 cm; FKW TL 5–7.6 cm — consensus ~7–8 cm) | tempMinC/tempMaxC MEDIUM (SF 10–22 °C vs FKW 21–27 °C; FB 16–26 °C; SF used — subtropical species) | phMin/phMax HIGH | minTankVolumeL MEDIUM
  // Notes: Subtropical fish unsuitable for warm tropical tanks (24–28 °C). One of the oldest aquarium fish in the West, introduced to Europe in the 1860s. Males must be kept separately — intense combat over territory.
  {
    id: "paradise-fish",
    commonName: "Paradise fish",
    scientificName: "Macropodus opercularis",
    adultSizeCm: 8,
    minTankVolumeL: 75,
    minFootprintCm: { length: 80, width: 35 },
    temperament: "aggressive",
    diet: "carnivore",
    minGroupSize: 1,
    maxGroupSize: 1,
    tempMinC: 10,
    tempMaxC: 24,
    phMin: 6.0,
    phMax: 8.0,
    origin: "Southern China, Vietnam",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$",
    description:
      "One of the oldest aquarium fish — stunning red-and-blue banded flanks on a labyrinth fish that is almost indestructible in the right conditions. Thrives in cool water (15–22 °C) where bettas and other gouramis struggle, making it ideal for an unheated tank in a temperate climate. Males are violently aggressive toward each other and will shred bettas.",
    waterType: "freshwater",
    tankRegion: "top",
    lifeExpectancyYears: 8,
    lifeExpectancyMaxYears: 10,
    behavior:
      "An active surface-dweller that builds bubble nests and chases anything it perceives as a rival male. Can live in stagnant, low-oxygen water thanks to its labyrinth organ. Extremely hardy — tolerates temperature swings, low oxygen, and a range of water chemistries that would kill more delicate species.",
    dimorphism:
      "Males are larger, more brilliantly coloured with longer, more elaborate fins; females are plainer with a rounded belly.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Heros-efasciatus.html), Seriously Fish (https://www.seriouslyfish.com/species/heros-efasciatus/), Fish Laboratory (https://fishlaboratory.com/fish/severum)
  // Confidence: adultSizeCm MEDIUM (FB SL 17 cm ~20 cm TL; SF TL 30 cm typical 20–25 cm aquarium; FishLab TL 20 cm — FB and FishLab agree on ~20 cm; SF max 30 cm used cautiously; aquarium max set to 25 cm) | tempMinC/tempMaxC MEDIUM (FB 24–32 °C; SF 22–29 °C; FishLab 24–29 °C — used 24–28 °C) | phMin/phMax MEDIUM | minTankVolumeL MEDIUM
  {
    id: "severum",
    commonName: "Severum",
    scientificName: "Heros efasciatus",
    adultSizeCm: 25,
    adultSizeMinCm: 18,
    minTankVolumeL: 200,
    minFootprintCm: { length: 120, width: 45 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 1,
    maxGroupSize: 2,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 5.5,
    phMax: 7.0,
    origin: "Amazon",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$$",
    description:
      "A large, laterally compressed cichlid from the Amazon with a warm olive-to-golden body and faint dark banding — one of the calmer large cichlids in the hobby. Comes in several wild-type and captive colour morphs (gold, red, turquoise). Generally peaceful for its size but becomes territorial during spawning and will rearrange plants and decor.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 5,
    lifeExpectancyMaxYears: 10,
    behavior:
      "A relatively calm cichlid that patrols the mid-water; pairs bond strongly and become fiercely protective during spawning. Best kept singly or as a bonded pair. Eats soft-leafed plants and will uproot rooted species — use hardy plants or plastic. Intelligent and recognises its keeper.",
    dimorphism:
      "Males develop longer, more pointed dorsal and anal fins; females are rounder when gravid and tend to be slightly smaller.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Andinoacara-rivulatus.html), Seriously Fish (https://www.seriouslyfish.com/species/andinoacara-rivulatus/), Fishkeeping World (https://www.fishkeepingworld.com/green-terror-cichlid/)
  // Confidence: adultSizeCm MEDIUM (FB TL 20 cm; SF TL 30 cm; FKW TL 30 cm — SF/FKW agree on 30 cm; FB likely measures SL; used 30 cm) | tempMinC/tempMaxC HIGH (all 3 agree ~20–25 °C) | phMin/phMax HIGH | minTankVolumeL MEDIUM (SF 675 L appears to be a misextraction; at 150×45 cm base + 50 cm height = 337 L; used 300 L)
  // Notes: From the Pacific coastal drainages of Ecuador and Peru — cooler and harder water than most Amazonian cichlids. Males develop a prominent nuchal hump with age. Highly aggressive during breeding; females can be more aggressive than males.
  {
    id: "green-terror",
    commonName: "Green terror",
    scientificName: "Andinoacara rivulatus",
    adultSizeCm: 30,
    adultSizeMinCm: 20,
    minTankVolumeL: 300,
    minFootprintCm: { length: 150, width: 50 },
    temperament: "aggressive",
    diet: "omnivore",
    minGroupSize: 1,
    maxGroupSize: 2,
    tempMinC: 20,
    tempMaxC: 25,
    phMin: 6.5,
    phMax: 8.0,
    origin: "Pacific Coast, Ecuador/Peru",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$$",
    description:
      "A stunning cichlid from coastal Pacific South America — iridescent turquoise-blue and green scales on a powerful, muscular body with orange-red edging on the tail. Males develop a pronounced hump on the forehead with age. Beautiful but aggressive; attacks similar-sized fish and is particularly dangerous during spawning.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 7,
    lifeExpectancyMaxYears: 10,
    behavior:
      "Patrols a territory in the lower water column and will attack any fish that enters it; most aggressive toward other cichlids and similarly-patterned species. Pairs bond strongly but females can be aggressive toward males outside spawning. Digs substrate heavily when establishing territory.",
    dimorphism:
      "Males develop a prominent nuchal hump and grow larger; females are smaller but may be more aggressive during spawning. Males have more extensive iridescent patterning.",
  },

  // --- New World Cichlids batch ---

  // Sources: FishBase (https://fishbase.se/summary/Andinoacara-pulcher.html), Seriously Fish (https://www.seriouslyfish.com/species/andinoacara-pulcher/), Fish Laboratory (https://fishlaboratory.com/fish/blue-acara)
  // Confidence: adultSizeCm HIGH (FB TL 16 cm; SF TL 15 cm; FishLab TL 16 cm — consensus 15–16 cm) | tempMinC/tempMaxC MEDIUM (FB 18–23 °C unusually cool; SF 22–28 °C; FishLab 22–30 °C — used SF as primary husbandry range) | phMin/phMax HIGH | minTankVolumeL MEDIUM
  // Notes: FB's temperature range (18–23 °C) is suspiciously cool for a tropical cichlid — SF and FishLab are more consistent with hobbyist experience. One of the most peaceful cichlids, suitable for a large community tank.
  {
    id: "blue-acara",
    commonName: "Blue acara",
    scientificName: "Andinoacara pulcher",
    adultSizeCm: 16,
    minTankVolumeL: 110,
    minFootprintCm: { length: 90, width: 40 },
    temperament: "peaceful",
    diet: "carnivore",
    minGroupSize: 1,
    maxGroupSize: 2,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 6.5,
    phMax: 8.0,
    origin: "Trinidad, Venezuela",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "One of the most beginner-friendly cichlids — a compact, iridescent turquoise-and-blue fish from Trinidad and Venezuela with a restrained temperament. Pairs bond and dig to spawn but are otherwise peaceful toward unrelated species. An excellent gateway cichlid that shares a tank with most robust community fish.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 7,
    lifeExpectancyMaxYears: 10,
    behavior:
      "Patrols the lower water column and digs in the substrate; pairs form strong bonds and become moderately territorial during breeding but return to peaceful behaviour shortly after. Generally ignores fish that are not competing for its territory.",
    dimorphism:
      "Males are larger with more pointed dorsal and anal fins; females are smaller, rounder when gravid, and sometimes more intensely coloured when breeding.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Hypselecara-temporalis.html), Seriously Fish (https://www.seriouslyfish.com/species/hypselecara-temporalis/), Fish Laboratory (https://fishlaboratory.com/fish/chocolate-cichlid)
  // Confidence: adultSizeCm MEDIUM (FB SL 16 cm ~18 cm TL; SF TL 30 cm; FishLab TL 30 cm — SF/FishLab agree on 30 cm; FB appears to record a smaller/different population or sex) | tempMinC/tempMaxC HIGH | phMin/phMax HIGH | minTankVolumeL MEDIUM (SF 120 L seems low for a 30 cm fish; FishLab 284 L used)
  {
    id: "chocolate-cichlid",
    commonName: "Chocolate cichlid",
    scientificName: "Hypselecara temporalis",
    adultSizeCm: 30,
    adultSizeMinCm: 18,
    minTankVolumeL: 250,
    minFootprintCm: { length: 150, width: 50 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 1,
    maxGroupSize: 2,
    tempMinC: 25,
    tempMaxC: 30,
    phMin: 5.0,
    phMax: 7.0,
    origin: "Amazon",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "A large, deep-bodied Amazonian cichlid with a rich reddish-brown to chocolate colouration and a black lateral spot — one of the calmer large cichlids in the hobby. Grows impressively large (30 cm) and requires soft, warm, acidic water. Peaceful for its size when not spawning, and can be kept with other large, peaceful fish.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    behavior:
      "A slow-moving, deliberate fish that shares territory more readily than most large cichlids; bonded pairs are devoted parents. Needs warm, soft, acidic water consistently — does not tolerate hard alkaline conditions. Eats plants.",
    dimorphism:
      "Males grow larger and develop a small nuchal hump with age; females are slightly smaller and rounder.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Trichromis-salvini.html), Fish Laboratory (https://fishlaboratory.com/fish/salvini-cichlid), Wikipedia (https://en.wikipedia.org/wiki/Trichromis_salvini)
  // Confidence: adultSizeCm MEDIUM (FB SL 22 cm ~25 cm TL; FishLab TL 22 cm; Wiki TL 15 cm — FB/FishLab agree better; Wiki may reflect female or captive size; used 22 cm TL) | tempMinC/tempMaxC MEDIUM (FB 22–32 °C; FishLab 22–26 °C; Wiki 22–27 °C; used 22–28 °C) | phMin/phMax HIGH | minTankVolumeL MEDIUM
  // Notes: Central American cichlid from hard, alkaline river systems — unlike most New World cichlids that prefer softer, acidic conditions. Aggressive, especially during spawning.
  {
    id: "salvini-cichlid",
    commonName: "Salvini cichlid",
    scientificName: "Trichromis salvini",
    adultSizeCm: 22,
    minTankVolumeL: 200,
    minFootprintCm: { length: 120, width: 45 },
    temperament: "aggressive",
    diet: "carnivore",
    minGroupSize: 1,
    maxGroupSize: 2,
    tempMinC: 22,
    tempMaxC: 28,
    phMin: 7.0,
    phMax: 8.0,
    origin: "Central America",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "A strikingly coloured Central American cichlid — vivid yellow-green body with a black midlateral stripe and vivid red belly that intensifies during breeding. Aggressive and territorial, particularly during spawning when it becomes markedly more dangerous. From harder, more alkaline water than most New World cichlids.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    behavior:
      "A bottom-oriented cichlid that establishes and defends a territory vigorously; females take an unusually active breeding role. Best kept as a single specimen or bonded pair — becomes particularly aggressive toward other cichlids during spawning.",
    dimorphism:
      "Females are typically smaller but develop more intense red colouration on the belly during breeding; males are larger with more pointed fins.",
  },

  // Sources: FishBase (https://fishbase.se/summary/Mesonauta-festivus.html), Seriously Fish (https://www.seriouslyfish.com/species/mesonauta-festivus/), Wikipedia (https://en.wikipedia.org/wiki/Mesonauta_festivus)
  // Confidence: adultSizeCm MEDIUM (FB SL 12.1 cm ~14 cm TL; SF TL 10 cm; Wiki TL 12.1 cm — Wiki corroborates FB size; SF 10 cm is likely the smaller sex or captive minimum; used 14 cm) | tempMinC/tempMaxC MEDIUM (FB 25–34 °C; SF 24–28 °C; used SF range as realistic) | phMin/phMax MEDIUM | minTankVolumeL MEDIUM
  // Notes: One of the less commonly encountered South American cichlids; seen far less often than relatives like the angelfish. Unusually peaceful for a cichlid of its size.
  {
    id: "flag-cichlid",
    commonName: "Flag cichlid",
    scientificName: "Mesonauta festivus",
    adultSizeCm: 14,
    adultSizeMinCm: 10,
    minTankVolumeL: 140,
    minFootprintCm: { length: 100, width: 45 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 1,
    maxGroupSize: 2,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 8.0,
    origin: "Paraná, Amazon",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "A laterally compressed South American cichlid with a distinctive diagonal black stripe running from the snout through the eye to the base of the dorsal fin — the 'flag' of its common name. Unusually peaceful for a cichlid; suitable for a large community tank with other calm species. Needs a well-planted setup with hiding spots.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 8,
    behavior:
      "A mid-water cichlid that shelters among tall plants and driftwood; peaceful and shy compared to most cichlids. Pairs become territorial during spawning but return to a relatively calm demeanour afterward. Compatible with angelfish and similar-sized peaceful cichlids.",
    dimorphism:
      "Males develop longer, more pointed dorsal and anal fins; females are rounder when gravid.",
  },

  // Sources: FishBase (https://www.fishbase.se/summary/Amphilophus-labiatus.html), Seriously Fish (https://www.seriouslyfish.com/species/amphilophus-labiatus/), Fish Laboratory (https://fishlaboratory.com/fish/red-devil-cichlid)
  // Confidence: adultSizeCm LOW (FishBase 28.3 cm TL; SF 30–35 cm; FL 40.6 cm — wide spread, FL outlier likely exaggerated; used SF 35 cm as realistic hobby max) | adultSizeMinCm MEDIUM (FishBase TL 28 cm used for female/smaller individuals) | minTankVolumeL MEDIUM (SF 150×45 cm footprint implies ~300 L; FL 208 L single; used 300 L) | tempMinC/tempMaxC MEDIUM (FishBase 28–33°C wild; SF 21–26°C aquarium; FL 24–26°C; FishBase range likely wild summer peaks; SF/FL aquarium consensus used) | phMin/phMax MEDIUM (SF 6.0–8.0; FL 6.5–7.5; used 6.5–7.5 inner consensus) | tankRegion LOW (SF: mid-water; FL: bottom; territory-holding behaviour leans bottom in captivity)
  // Notes: Often confused with A. citrinellus (Midas cichlid) — both share the "red devil" common name; A. citrinellus (Midas) is more correctly a Lake Managua/Nicaragua species with a larger nuchal hump and more yellow colouration. Extensive hybridisation in the hobby trade further complicates identification. Wild Nicaragua lake fish may exceed 35 cm; 35 cm is the realistic captive maximum for males. Females typically smaller (~25–28 cm).
  {
    id: "red-devil-cichlid",
    commonName: "Red devil cichlid",
    scientificName: "Amphilophus labiatus",
    adultSizeCm: 35,
    adultSizeMinCm: 28,
    minTankVolumeL: 300,
    minFootprintCm: { length: 150, width: 45 },
    temperament: "aggressive",
    diet: "omnivore",
    minGroupSize: 1,
    maxGroupSize: 2,
    tempMinC: 21,
    tempMaxC: 26,
    phMin: 6.5,
    phMax: 7.5,
    origin: "Lakes Nicaragua and Managua, Central America",
    careLevel: "advanced",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "A large, powerfully built Central American cichlid renowned for its aggressive personality and striking coloration — ranging from vivid orange-red to white or yellow. Males develop a pronounced nuchal hump and can exceed 30 cm; their territorial and predatory behaviour makes them one of the most demanding cichlids to keep. Best housed alone or as a bonded pair in a heavily filtered, spacious tank.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    lifeExpectancyMaxYears: 13,
    behavior:
      "Extremely aggressive and territorial; will attack and kill most tankmates including other large cichlids. Often becomes 'tame' toward its keeper but treats all other fish as rivals or prey. Pairs bond monogamously and both parents guard eggs and fry actively.",
    reproduction:
      "Substrate spawner; female lays 600–700 eggs on flat rock or cleaned substrate. Both parents defend the clutch vigorously. Fry are free-swimming within a week.",
    dimorphism:
      "Males grow significantly larger and develop a pronounced nuchal hump; females are smaller (~25–28 cm) and lack the hump. Males also show longer, more pointed dorsal and anal fins.",
  },

  // Sources: FishBase (https://www.fishbase.se/Summary/SpeciesSummary.php?id=4781), Fish Laboratory (https://www.fishlaboratory.com/fish/geophagus-surinamensis/)
  // Confidence: adultSizeCm HIGH | minTankVolumeL MEDIUM | tempMinC MEDIUM | tempMaxC MEDIUM | phMin HIGH | phMax HIGH
  // Notes: FishBase gives max TL 30 cm (SL 17.2 cm + ~10–15% = ~19–20 cm TL, but FishBase itself lists 30 cm TL explicitly — likely includes fin extensions). Hobby sources consistently cite 25–30 cm; 30 cm used as max. minTankVolumeL 300 L is for a group of 5+; 55 gal (208 L) is often cited for a pair but eartheaters need a group. FishBase temp range 22–25°C is narrow/wild; aquarium husbandry range 24–29°C used per Fish Laboratory and hobby consensus. Geophagus surinamensis is the ACCEPTED name per FishBase (Bloch, 1791) — not a synonym, no reclassification.
  {
    id: "geophagus-surinamensis",
    commonName: "Redstriped eartheater",
    scientificName: "Geophagus surinamensis",
    adultSizeCm: 30,
    adultSizeMinCm: 25,
    minTankVolumeL: 300,
    minFootprintCm: { length: 120, width: 50 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 5,
    tempMinC: 24,
    tempMaxC: 29,
    phMin: 6.0,
    phMax: 8.0,
    origin: "Suriname, French Guiana",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "A large, elegant South American cichlid named for its habit of scooping mouthfuls of substrate to sift out food. Males develop striking red lateral stripes and iridescent scaling; both sexes remain relatively peaceful for a cichlid of their size, though males become territorial during spawning. Requires a spacious tank with a fine sand substrate, kept in a group of five or more.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 8,
    lifeExpectancyMaxYears: 10,
    behavior:
      "Constantly sifts the substrate by scooping mouthfuls of sand and expelling it through the gills to filter out invertebrates and organic matter. Peaceful toward similarly sized tankmates outside of breeding; males spar and establish hierarchies within the group but rarely cause serious injury.",
    reproduction:
      "Mouthbrooder; the female picks up eggs after spawning and incubates them in her buccal cavity. Fry are released once free-swimming and may continue to shelter in the parent's mouth when threatened.",
    dimorphism:
      "Males grow larger and develop more vivid red striping and elongated dorsal and anal fin rays; females are smaller and less intensely coloured.",
  },

  // ── Plecos (continued) ───────────────────────────────────────────────────
  // Sources: FishBase (https://www.fishbase.se/summary/Chaetostoma-milesi.html), Fishkeeping World (https://www.fishkeepingworld.com/rubber-lip-pleco/), Aquariadise (https://www.aquariadise.com/rubber-lip-pleco/)
  // Confidence: adultSizeCm MEDIUM (FishBase SL 14.6 cm → TL ~17 cm; hobbyist sources 13–18 cm TL; typical captive size 12–14 cm) | minTankVolumeL MEDIUM (Aquariadise 95 L; FKW/AquariumSource 114 L; 114 L used) | tempMinC HIGH | phMin MEDIUM (Scotcat 6.0; hobbyist consensus 6.5) | phMax MEDIUM (7.5 vs 8.0 split; 7.5 used as conservative Andean-foothills range)
  // Notes: Post-2016 taxonomy restricts true C. milesi to the Magdalena-Cauca basin (Colombia); Apure River attributions likely refer to C. joropo. Seriously Fish has no dedicated page. Needs high flow and oxygenation; solitary — territorial toward conspecifics.
  {
    id: "rubberlip-pleco",
    commonName: "Rubberlip pleco",
    scientificName: "Chaetostoma milesi",
    adultSizeCm: 17,
    adultSizeMinCm: 13,
    minTankVolumeL: 114,
    minFootprintCm: { length: 90, width: 40 },
    temperament: "peaceful",
    diet: "herbivore",
    minGroupSize: 1,
    tempMinC: 21,
    tempMaxC: 27,
    phMin: 6.5,
    phMax: 7.5,
    origin: "Colombia",
    careLevel: "beginner",
    rarity: "common",
    priceRange: "$",
    description:
      "A compact loricariid from fast-flowing Colombian mountain streams, reaching around 17 cm total length. Its large fleshy mouth is adapted for rasping biofilm and algae from rocks, making it an effective algae-eater. It needs good water flow and oxygenation to thrive, and is territorial toward its own kind — best kept singly in a well-oxygenated tank with smooth rocks and driftwood.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    lifeExpectancyMaxYears: 12,
    behavior:
      "A benthic grazer that clings to rocks, driftwood, and glass; spends most of its time rasping surfaces for algae and biofilm. Active at dusk and night; prefers areas of strong current. Territorial toward conspecifics but ignores most other species.",
    images: [],
  },

  // ── New World Cichlids (continued) ───────────────────────────────────────
  // Sources: FishBase (https://www.fishbase.se/summary/Amphilophus-citrinellus.html), Seriously Fish (https://www.seriouslyfish.com/species/amphilophus-citrinellus/)
  // Confidence: adultSizeCm MEDIUM (FishBase SL 24.4 cm → TL ~28–30 cm; SF 30–35 cm for males; 35 cm used as max) | adultSizeMinCm MEDIUM (females ~25 cm) | minTankVolumeL MEDIUM (SF footprint 150×45 cm implies ~300 L) | tempMinC/tempMaxC MEDIUM (FishBase wild 23–33°C; SF aquarium 21–26°C; 23–28°C used as overlap) | phMin/phMax MEDIUM (SF only; cichlidae.com returned 403) | lifespan LOW (estimated from comparable cichlids; not confirmed by fetched sources)
  // Notes: Frequently confused with A. labiatus (Red Devil cichlid) — both sold as "red devil" and hybridise heavily in the trade. A. citrinellus is the Midas cichlid; distinguished by larger nuchal hump and more yellow-orange coloration. Both are endemic to Lake Nicaragua and Lake Managua.
  {
    id: "midas-cichlid",
    commonName: "Midas cichlid",
    scientificName: "Amphilophus citrinellus",
    adultSizeCm: 35,
    adultSizeMinCm: 25,
    minTankVolumeL: 300,
    minFootprintCm: { length: 150, width: 50 },
    temperament: "aggressive",
    diet: "omnivore",
    minGroupSize: 1,
    maxGroupSize: 2,
    tempMinC: 23,
    tempMaxC: 28,
    phMin: 6.0,
    phMax: 8.0,
    origin: "Nicaragua, Costa Rica",
    careLevel: "advanced",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "A large, powerful Central American cichlid from the lakes of Nicaragua and Costa Rica, ranging from grey-brown juveniles to brilliant gold, orange, or white adults. Males develop a pronounced nuchal hump and can reach 35 cm; they are among the most aggressive cichlids available. Often confused with the Red Devil cichlid (A. labiatus) — both are sold under the same common name and hybridise extensively in the trade. Best kept alone or as a bonded pair in a heavily filtered, spacious tank.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 10,
    lifeExpectancyMaxYears: 12,
    behavior:
      "Extremely territorial and aggressive toward all tankmates; will attack and injure most fish. Best kept alone or as a single bonded pair acclimated carefully over time. Pairs form monogamous bonds and both parents guard eggs and fry vigorously.",
    dimorphism:
      "Males grow substantially larger and develop a pronounced cranial nuchal hump; females are smaller and lack the hump. The hump size increases with age and condition.",
    images: [],
  },

  // Sources: Fishkeeping World (https://www.fishkeepingworld.com/flowerhorn-cichlid/), Aquariadise (https://www.aquariadise.com/flowerhorn-cichlid/), AquariumSource (https://www.aquariumsource.com/flowerhorn-cichlid/)
  // Confidence: adultSizeCm HIGH (all three sources agree on 41 cm max) | adultSizeMinCm MEDIUM (25 vs 30 cm lower end; short-body strains smaller) | minTankVolumeL MEDIUM (Aquariadise 208 L; FKW/AquariumSource 265 L; 265 L used) | tempMinC HIGH | tempMaxC MEDIUM (AquariumSource 30°C vs FKW/Aquariadise 31.7°C; 30°C used) | phMin/phMax MEDIUM (FKW/Aquariadise 6.5–7.8; AquariumSource 7.0–8.0) | diet MEDIUM (Aquariadise: carnivore; FKW/AquariumSource: omnivore) | careLevel MEDIUM (AquariumSource: easy; FKW/Aquariadise: moderate)
  // Notes: FishBase does not catalogue hybrids — no scientific name is formally assigned. Parent species include A. labiatus, A. trimaculatus, Vieja spp., and possibly Midas cichlid; exact lineage varies by strain. FishBase not used as a source.
  {
    id: "flowerhorn",
    commonName: "Flowerhorn cichlid",
    scientificName: "Hybrid (Amphilophus / Vieja spp.)",
    adultSizeCm: 41,
    adultSizeMinCm: 30,
    minTankVolumeL: 265,
    minFootprintCm: { length: 150, width: 60 },
    temperament: "aggressive",
    diet: "omnivore",
    minGroupSize: 1,
    tempMinC: 27,
    tempMaxC: 30,
    phMin: 6.5,
    phMax: 7.8,
    origin: "Captive hybrid (Malaysia, Taiwan, Thailand)",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$$",
    description:
      "A man-made hybrid cichlid developed in Southeast Asia in the 1990s, primarily from Red Devil, Three Spot, and Midas cichlids. Best known for its vivid coloration and pronounced nuchal hump (kok), which grows with age. Highly aggressive and territorial — must be kept alone or as a carefully matched breeding pair in a very large tank. Its hardiness and bold, interactive personality make it manageable for experienced fishkeepers despite demanding space requirements.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 10,
    lifeExpectancyMaxYears: 12,
    behavior:
      "Extremely territorial and aggressive toward all tankmates; best kept as a solitary specimen. Known for bold, interactive behaviour with its keeper — often tracks movement outside the tank and responds to feeding routines.",
    images: [],
  },

  // ── African Cichlids ──────────────────────────────────────────────────────
  // Sources: FishBase (https://www.fishbase.se/summary/Melanochromis-auratus.html), Seriously Fish (https://www.seriouslyfish.com/species/melanochromis-auratus/)
  // Confidence: adultSizeCm HIGH (FishBase + SF both cite 11 cm TL) | minTankVolumeL MEDIUM (SF only; 200 L) | minFootprintCm MEDIUM (SF 120×45 cm) | tempMinC MEDIUM (FishBase 22°C vs SF 24°C; SF used) | tempMaxC MEDIUM (FishBase 26°C vs SF 28°C; SF used) | phMin MEDIUM (FishBase 7.0 vs SF 7.6; SF used) | phMax MEDIUM (FishBase 8.5 vs SF 8.8; SF used) | lifespan not confirmed by primary sources
  // Notes: Dramatic reversed sexual dichromatism — females/juveniles are golden-yellow with black stripes; dominant males invert to near-black with light stripes. Dominant male coloration is context-dependent; subordinates revert to golden. Should not be kept with other Melanochromis due to hybridization risk. Harem ratio (1M:3F) required — never keep as a pair.
  {
    id: "auratus-cichlid",
    commonName: "Auratus cichlid",
    scientificName: "Melanochromis auratus",
    adultSizeCm: 11,
    adultSizeMinCm: 9,
    minTankVolumeL: 200,
    minFootprintCm: { length: 120, width: 45 },
    temperament: "aggressive",
    diet: "herbivore",
    minGroupSize: 4,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 7.6,
    phMax: 8.8,
    origin: "Lake Malawi",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$",
    description:
      "A mbuna from the southern rocky shores of Lake Malawi, famous for its dramatic reversed sexual dichromatism: females and juveniles are brilliant golden-yellow with bold black stripes, while dominant males transform to near-black with pale blue stripes. One of the most aggressive and territorial mbuna; must be kept as a harem (one male, three or more females) in a heavily rock-scaped tank. Should never be kept with other Melanochromis species due to aggression and hybridization risk.",
    waterType: "freshwater",
    tankRegion: "bottom",
    behavior:
      "Highly aggressive and territorial; males suppress rivals visually through color dominance (dominant males are dark; subordinates revert to the golden female pattern). Best managed by overcrowding to diffuse aggression. A maternal mouthbrooder; females incubate fry for several weeks.",
    dimorphism:
      "Reversed colour dimorphism: females and juveniles are golden-yellow with black and white stripes on the upper body; dominant males are near-black with pale blue or yellow stripes — a near-inversion of the female pattern.",
    images: [],
  },

  // Sources: FishBase (https://www.fishbase.se/summary/Maylandia-lombardoi.html), Fish Laboratory (https://fishlaboratory.com/fish/kenyi-cichlid), Wikipedia (https://en.wikipedia.org/wiki/Maylandia_lombardoi)
  // Confidence: adultSizeCm MEDIUM (FishBase SL 8.7 cm → ~10 cm TL; Wikipedia + Fish Lab cite 13 cm aquarium max; 13 cm used) | adultSizeMinCm MEDIUM (females ~10 cm) | minTankVolumeL MEDIUM (Fish Lab 189 L minimum, rounded to 200 L) | tempMinC HIGH | tempMaxC HIGH | phMin MEDIUM (FishBase gives 8.0 minimum; Fish Lab 7.6–8.8; 7.6 retained) | lifespan MEDIUM (Fish Lab 10 yr)
  // Notes: Seriously Fish and Cichlid Room Companion both returned 4xx errors; data from FishBase + Wikipedia + Fish Laboratory. Accepted name Maylandia lombardoi; older trade name Pseudotropheus lombardoi still common. Reversed dimorphism: females blue-striped, males turn yellow-orange at maturity.
  {
    id: "kenyi-cichlid",
    commonName: "Kenyi cichlid",
    scientificName: "Maylandia lombardoi",
    adultSizeCm: 13,
    adultSizeMinCm: 10,
    minTankVolumeL: 200,
    minFootprintCm: { length: 120, width: 45 },
    temperament: "aggressive",
    diet: "omnivore",
    minGroupSize: 4,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 7.6,
    phMax: 8.8,
    origin: "Lake Malawi",
    careLevel: "intermediate",
    rarity: "common",
    priceRange: "$$",
    description:
      "A robust mbuna from Mbenji Island, Lake Malawi, famous for its reversed sexual dimorphism: females and juvenile males are pale blue with bold black vertical bars, while adult males transform to bright yellow-orange. Highly aggressive and territorial — keep as a harem of one male with three or more females in a heavily rock-scaped tank. Not suitable for peaceful community setups.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 8,
    lifeExpectancyMaxYears: 10,
    behavior:
      "Males establish and defend territories among rocks; females and subordinate males form loose groups. A maternal mouthbrooder — females hold eggs and fry in the mouth for several weeks.",
    dimorphism:
      "Reversed colour dimorphism: females and juvenile males are pale blue with bold black vertical bars; adult males transform to bright yellow-orange with faint brown barring and plain yellow fins.",
    images: [],
  },

  // Sources: FishBase (https://www.fishbase.se/summary/Nimbochromis-venustus.html), Seriously Fish (https://www.seriouslyfish.com/species/nimbochromis-venustus/)
  // Confidence: adultSizeCm MEDIUM (FishBase 25 cm TL; SF 30 cm max recorded in nature; 30 cm used as upper bound for predator-sizing engine) | adultSizeMinCm MEDIUM (females typically ~22 cm) | minTankVolumeL MEDIUM (SF 200 L for single specimen) | tempMinC MEDIUM (FishBase 25°C vs SF 24°C; SF used) | phMin MEDIUM (FishBase 7.2 vs SF 7.6; SF used) | lifespan inferred from haplochromine genus data — not primary-sourced
  // Notes: Cichlid Room Companion returned 403. Famous for thanatosis (playing dead) to ambush prey. Exclusive piscivore in the wild; accepts dead foods in captivity. Only one male per tank; harem of 1M:3–6F recommended.
  {
    id: "venustus",
    commonName: "Venustus cichlid",
    scientificName: "Nimbochromis venustus",
    adultSizeCm: 30,
    adultSizeMinCm: 22,
    minTankVolumeL: 200,
    minFootprintCm: { length: 120, width: 45 },
    temperament: "predatory",
    diet: "carnivore",
    minGroupSize: 1,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 7.6,
    phMax: 8.8,
    origin: "Lake Malawi",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "A large giraffe-patterned haplochromine from Lake Malawi renowned for an extraordinary ambush strategy: it lies motionless on the sandy substrate, mimicking a dead fish, then lunges at curious prey. An exclusive piscivore that will eat any fish small enough to swallow. Males develop vivid blue-and-yellow coloration when in breeding condition; females retain the mottled giraffe pattern year-round. Keep only one male per tank.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 8,
    lifeExpectancyMaxYears: 12,
    behavior:
      "Uses thanatosis — lies motionless on the sand, sometimes partially buried, using its mottled coloration to lure smaller fish investigating what appears to be a dead fish, then strikes. Males are highly aggressive toward each other; best kept as a harem (1 male, 3–6 females).",
    dimorphism:
      "Males grow larger (up to 30 cm) and develop vivid blue-and-yellow coloration on the head and flanks in breeding condition. Females are smaller (~22 cm) and retain the mottled brown giraffe pattern year-round.",
    reproduction:
      "Maternal mouthbrooder. Female incubates eggs and fry in her mouth for approximately 3 weeks.",
    images: [],
  },

  // Sources: FishBase (https://www.fishbase.se/summary/Protomelas-taeniolatus.html), Seriously Fish (https://www.seriouslyfish.com/species/protomelas-taeniolatus/), Wikipedia (https://en.wikipedia.org/wiki/Protomelas_taeniolatus)
  // Confidence: adultSizeCm MEDIUM (FishBase 11.3 cm TL wild average vs SF 20 cm SL — significant conflict; SF 20 cm SL used as aquarium max for males) | adultSizeMinCm MEDIUM (females ~12 cm) | minTankVolumeL HIGH (SF 200 L; Wikipedia 55 gal = 208 L; agree) | tempMinC HIGH (SF + Wikipedia) | phMin MEDIUM (SF only; Cichlidae.com 403) | lifespan LOW (no primary source; cichlid-hobbyist consensus 5–8 yr)
  // Notes: FishBase wild TL of 11.3 cm is far below the 20 cm SL cited by SF for captive males — likely a wild measurement bias. SF 20 cm SL ≈ 22–23 cm TL when fin is included; using 20 cm as the app value (SF quotes it as the relevant husbandry figure). Cichlid Room Companion returned 403.
  {
    id: "red-empress",
    commonName: "Red Empress cichlid",
    scientificName: "Protomelas taeniolatus",
    adultSizeCm: 20,
    adultSizeMinCm: 12,
    minTankVolumeL: 200,
    minFootprintCm: { length: 120, width: 45 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 4,
    tempMinC: 24,
    tempMaxC: 28,
    phMin: 7.6,
    phMax: 8.8,
    origin: "Lake Malawi",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "One of the most vividly colored Lake Malawi haplochromines. Adult males display a striking red-orange body with an iridescent blue head; females remain a plain silver-grey with faint barring. Best kept as a harem of one male with three or more females in a spacious rocky Malawi biotope alongside other peaceful Malawi cichlids. Requires hard, alkaline water and a plant-based diet supplemented with small invertebrates.",
    waterType: "freshwater",
    tankRegion: "middle",
    lifeExpectancyYears: 5,
    lifeExpectancyMaxYears: 8,
    behavior:
      "An active mid-water swimmer that patrols open rocky habitat. Males are territorial toward other males and defend a spawning site but are generally peaceful toward dissimilar tankmates.",
    reproduction:
      "Maternal mouthbrooder. Female incubates fertilized eggs in her mouth for 3–4 weeks and releases free-swimming fry.",
    dimorphism:
      "Males are substantially larger and brilliantly colored — body red to orange with a blue head and extended dorsal, anal, and pelvic fins. Females and juveniles are plain silvery-grey with faint vertical barring.",
    images: [],
  },

  // Sources: FishBase (https://www.fishbase.se/summary/Julidochromis-transcriptus.html), Seriously Fish (https://www.seriouslyfish.com/species/julidochromis-transcriptus/), Wikipedia (https://en.wikipedia.org/wiki/Julidochromis_transcriptus)
  // Confidence: adultSizeCm HIGH (FishBase 7.0 cm TL; SF 60–65 mm SL → ~7 cm TL; Wikipedia 7 cm — all agree) | minTankVolumeL MEDIUM (FishBase gives 60 cm footprint; 110 L derived from footprint + pair-territory needs; no litre figure in any source) | phMin MEDIUM (FishBase wild min 8.5; aquarium consensus 8.0 used) | tempMaxC MEDIUM (FishBase 25°C; aquarium practice 26°C) | lifespan LOW (no species-specific source; Julidochromis genus estimate)
  // Notes: Cichlid Room Companion returned 403. IUCN Critically Endangered — most trade specimens are captive-bred. Lake Tanganyika species; requires hard, alkaline water (pH 8.0–9.0). Monogamous pair-bonder; never keep as trio or more unless very large tank.
  {
    id: "julie-cichlid",
    commonName: "Masked Julie",
    scientificName: "Julidochromis transcriptus",
    adultSizeCm: 7,
    minTankVolumeL: 110,
    minFootprintCm: { length: 100, width: 40 },
    temperament: "aggressive",
    diet: "omnivore",
    minGroupSize: 2,
    maxGroupSize: 2,
    tempMinC: 23,
    tempMaxC: 26,
    phMin: 8.0,
    phMax: 9.0,
    origin: "Lake Tanganyika",
    careLevel: "intermediate",
    rarity: "uncommon",
    priceRange: "$$",
    description:
      "A small but boldly patterned black-and-white cichlid endemic to the rocky northwestern shore of Lake Tanganyika. It forms a strong monogamous pair bond and spawns in rock caves or crevices, with both parents guarding fry tenaciously. Requires hard, alkaline Tanganyika-type water (pH 8.0–9.0) and a densely rock-scaped aquarium. Aggressive toward intruders of all kinds — not suitable for community tanks.",
    waterType: "freshwater",
    tankRegion: "bottom",
    lifeExpectancyYears: 5,
    lifeExpectancyMaxYears: 8,
    behavior:
      "A monogamous, cave-dwelling pair-bonder that claims and fiercely defends a rock territory. Aggressive toward any fish entering its space; will consume fry of other species. Stays close to the rockwork at all times.",
    images: [],
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
