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
  minTankVolumeL: number;
  minFootprintCm: { length: number; width: number };

  // behavior (rule inputs)
  temperament: "peaceful" | "semi" | "aggressive" | "predatory";
  diet: "herbivore" | "omnivore" | "carnivore";
  minGroupSize: number;

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
    behavior:
      "A slow, mostly nocturnal ambush hunter that cruises the bottom and gulps air at the surface. Can be territorial toward its own kind.",
    reproduction:
      "Egg scatterer that spawns among fine-leaved plants. Rarely bred in home tanks; most are farmed or wild-caught.",
    dimorphism:
      "Hard to sex; mature males tend to show a thicker, broader anal fin.",
    commonName: "Delhezi bichir",
    scientificName: "Polypterus delhezi",
    adultSizeCm: 35,
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
    lifeExpectancyYears: 10,
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
    lifeExpectancyYears: 8,
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
    lifeExpectancyYears: 10,
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
    lifeExpectancyYears: 12,
    behavior:
      "An intelligent, interactive cichlid that rearranges decor, recognizes its keeper, and eats anything it can swallow.",
    reproduction:
      "Egg layer; pairs clean a flat rock and guard the eggs and fry together.",
    dimorphism:
      "Not reliably sexable by eye; a breeding pair usually has to be vented to tell them apart.",
    commonName: "Oscar",
    scientificName: "Astronotus ocellatus",
    adultSizeCm: 35,
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
    lifeExpectancyYears: 10,
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
    behavior:
      "An active, peaceful livebearer that swims and displays near the surface and top of the water column. Hardy and endlessly busy, it does best in hard, mineral-rich water.",
    reproduction:
      "Prolific livebearer; females give birth to broods of free-swimming fry every few weeks and can store sperm for several broods. Adults will eat their own fry.",
    dimorphism:
      "Strongly dimorphic: males are small and brilliantly coloured with large ornate fins, while females are larger, bulkier, and much plainer.",
    commonName: "Guppy",
    scientificName: "Poecilia reticulata",
    adultSizeCm: 6,
    minTankVolumeL: 40,
    minFootprintCm: { length: 45, width: 25 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 3,
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
    behavior:
      "A peaceful, constantly active livebearer that grazes algae and accepts almost any food. Sociable and undemanding, it suits a mixed community of similar hard-water fish.",
    reproduction:
      "Livebearer; females drop broods of free-swimming fry every four to six weeks and can store sperm between broods. Provide cover so some fry survive.",
    dimorphism:
      "Males are smaller and slimmer with a rod-like gonopodium fin; females are larger and rounder, especially when gravid.",
    commonName: "Platy",
    scientificName: "Xiphophorus maculatus",
    adultSizeCm: 7,
    minTankVolumeL: 60,
    minFootprintCm: { length: 60, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 3,
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
    minTankVolumeL: 40,
    minFootprintCm: { length: 45, width: 25 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 3,
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
    minTankVolumeL: 110,
    minFootprintCm: { length: 80, width: 35 },
    temperament: "semi",
    diet: "omnivore",
    minGroupSize: 6,
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
    lifeExpectancyYears: 8,
    behavior:
      "A fast, torpedo-shaped schooling 'shark' barb from fast-flowing rivers; it needs strong flow, well-oxygenated water, and length to cruise. Peaceful but boisterous, and unhappy in small numbers.",
    reproduction:
      "Egg-scatterer that is very difficult to breed at home; commercial stock is largely farmed or hormone-induced rather than wild-caught.",
    dimorphism:
      "Not reliably sexed by eye; mature females tend to be a little larger and deeper-bodied than males.",
    commonName: "Denison barb",
    scientificName: "Sahyadria denisonii",
    adultSizeCm: 15,
    minTankVolumeL: 200,
    minFootprintCm: { length: 120, width: 40 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
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
    minTankVolumeL: 110,
    minFootprintCm: { length: 90, width: 40 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
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
    lifeExpectancyYears: 4,
    behavior:
      "A colourful labyrinth fish that breathes air at the surface and uses thread-like feeler fins to explore. Usually calm, but individuals can be unpredictably territorial, so give it cover and gentle flow.",
    reproduction:
      "Bubble-nest builder; the male builds a floating nest, often among plants, and guards the eggs and fry.",
    dimorphism:
      "Males are larger and brilliantly striped in red and electric blue; females are smaller, plainer, and silvery.",
    commonName: "Dwarf gourami",
    scientificName: "Trichogaster lalius",
    adultSizeCm: 8.5,
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
    behavior:
      "An air-breathing labyrinth fish with huge, flowing fins. Males are highly territorial and flare at rivals — keep only one male per tank, with no fin-nipping or long-finned tankmates, in warm, gently filtered water.",
    reproduction:
      "Bubble-nest builder; the male wraps around the female beneath a floating nest, then collects the eggs and guards the nest and fry alone.",
    dimorphism:
      "Males are large-finned and intensely coloured; females are smaller with much shorter fins and often show a pale ovipositor spot.",
    commonName: "Betta",
    scientificName: "Betta splendens",
    adultSizeCm: 6.5,
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
    lifeExpectancyYears: 5,
    behavior:
      "A peaceful, hardy 'butterfly' dwarf cichlid that sifts sand for food and defends only a small territory. Easygoing enough for a calm community, unlike its touchier German blue ram cousin.",
    reproduction:
      "Open/substrate spawner; a pair lays eggs on a cleaned flat rock or leaf and both parents tend the eggs and fry.",
    dimorphism:
      "Difficult to sex; males tend to be a little larger with longer, more extended dorsal- and tail-fin filaments.",
    commonName: "Bolivian ram",
    scientificName: "Mikrogeophagus altispinosus",
    adultSizeCm: 8,
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
    lifeExpectancyYears: 10,
    behavior:
      "The tall, disc-shaped 'king of the aquarium' — a social cichlid kept in groups that needs warm, pristine, soft water. Shy and sensitive to stress and poor water quality, with a pecking order that settles best in a group of five or more.",
    reproduction:
      "Open spawner; a pair lays eggs on a vertical surface and the fry feed on a nutritious mucus secreted from the parents' skin.",
    dimorphism:
      "Very hard to sex; males may be slightly larger with a thicker forehead, but the sexes are reliably told apart only by their breeding tubes when spawning.",
    commonName: "Discus",
    scientificName: "Symphysodon aequifasciatus",
    adultSizeCm: 20,
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
    lifeExpectancyYears: 8,
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
    behavior:
      "A social, playful bottom loach that clicks audibly, 'plays dead', and hunts snails. Often sold tiny, it grows very large and lives for decades, so it needs a big tank, a group of five or more, smooth sand, and plenty of caves.",
    reproduction:
      "A migratory egg layer in the wild; essentially never bred in home aquariums, so almost all stock is wild-caught or commercially hormone-induced.",
    dimorphism:
      "Hard to sex; mature females tend to be plumper, and the tips of the tail fin differ subtly between the sexes.",
    commonName: "Clown loach",
    scientificName: "Chromobotia macracanthus",
    adultSizeCm: 30,
    minTankVolumeL: 450,
    minFootprintCm: { length: 150, width: 60 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 5,
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
    behavior:
      "An active, peaceful schooling rainbowfish with a striking split blue-and-orange body. Males colour up and display constantly to one another, so it needs swimming length, hard alkaline water, and a good-sized group to look its best.",
    reproduction:
      "Continuous egg-scatterer that deposits adhesive eggs among fine-leaved plants or spawning mops over several days; the eggs hatch in one to two weeks.",
    dimorphism:
      "Males are larger, deeper-bodied, and far more vivid — blue at the front, orange at the rear; females are slimmer and a plain silvery-olive.",
    commonName: "Boeseman's rainbowfish",
    scientificName: "Melanotaenia boesemani",
    adultSizeCm: 10,
    minTankVolumeL: 110,
    minFootprintCm: { length: 120, width: 30 },
    temperament: "peaceful",
    diet: "omnivore",
    minGroupSize: 6,
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
