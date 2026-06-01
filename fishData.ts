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
    origin: "Native to the Amazon River basin in South America.",
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
