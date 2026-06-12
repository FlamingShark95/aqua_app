import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fish, PlantEntry, StockEntry, Tank } from "./fishData";
import { Plant } from "./plantData";

const STORAGE_KEY = "aqua_app.tanks";

type TankContextValue = {
  tanks: Tank[];
  activeTankId: string | null;
  activeTank: Tank | null;
  setActiveTankId: (id: string) => void;
  createTank: (props: Omit<Tank, "id" | "stock" | "plants">) => void;
  updateTank: (
    id: string,
    patch: Partial<Omit<Tank, "id" | "stock" | "plants">>
  ) => void;
  deleteTank: (id: string) => void;
  addFishToTank: (tankId: string, fish: Fish) => void;
  removeFishFromTank: (tankId: string, fish: Fish) => void;
  addPlantToTank: (tankId: string, plant: Plant) => void;
  removePlantFromTank: (tankId: string, plant: Plant) => void;
};

const TankContext = createContext<TankContextValue | null>(null);

// One example tank for a brand-new install (before anything is saved).
const INITIAL_TANKS: Tank[] = [
  {
    id: "tank-1",
    name: "Living room 75 L",
    volumeL: 75,
    lengthCm: 80,
    widthCm: 35,
    tempC: 25,
    ph: 7.0,
    lightLevel: "medium",
    co2: false,
    stock: [],
    plants: [],
  },
];

// Generated ids look like "tank-3"; pull the next free number from existing ids
// so a generated id never collides with a loaded one.
function nextIdFrom(tanks: Tank[]): number {
  const maxN = tanks.reduce((max, t) => {
    const match = /^tank-(\d+)$/.exec(t.id);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0);
  return maxN + 1;
}

// Saved data used to store each stocked fish as a full copy of its catalog
// entry (one object per individual). Collapse that old shape into the current
// {speciesId, count} form; entries already in the new shape pass through.
// The next save then persists the new format, so this runs at most once.
function migrateStock(stock: unknown): StockEntry[] {
  if (!Array.isArray(stock)) return [];
  const entries: StockEntry[] = [];
  for (const item of stock) {
    if (!item || typeof item !== "object") continue;
    if ("speciesId" in item && "count" in item) {
      entries.push(item as StockEntry);
    } else if ("id" in item && typeof (item as { id: unknown }).id === "string") {
      // Old format: one full Fish copy per individual.
      const id = (item as { id: string }).id;
      const existing = entries.find((e) => e.speciesId === id);
      if (existing) existing.count += 1;
      else entries.push({ speciesId: id, count: 1 });
    }
  }
  return entries;
}

export function TankProvider({ children }: { children: ReactNode }) {
  const [tanks, setTanks] = useState<Tank[]>(INITIAL_TANKS);
  const [activeTankId, setActiveTankId] = useState<string | null>(
    INITIAL_TANKS[0]?.id ?? null
  );
  // Gate saving until the initial load finishes, so we don't overwrite saved
  // tanks with the defaults before they've been read.
  const [loaded, setLoaded] = useState(false);
  const nextId = useRef(nextIdFrom(INITIAL_TANKS));

  // Load saved tanks once on mount.
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) {
          const saved = JSON.parse(raw) as Tank[];
          if (Array.isArray(saved)) {
            // Older saves predate plants/lighting/CO₂; default them in.
            const migrated = saved.map((t) => ({
              ...t,
              stock: migrateStock(t.stock),
              plants: Array.isArray(t.plants) ? t.plants : [],
              lightLevel: t.lightLevel ?? "medium",
              co2: t.co2 ?? false,
            }));
            setTanks(migrated);
            setActiveTankId(migrated[0]?.id ?? null);
            nextId.current = nextIdFrom(migrated);
          }
        }
      })
      .catch(() => {
        // Ignore read/parse errors and keep the defaults.
      })
      .finally(() => setLoaded(true));
  }, []);

  // Persist whenever tanks change (after the initial load). Debounced so a
  // burst of changes — every keystroke in the tank edit form goes through
  // updateTank — coalesces into one write.
  useEffect(() => {
    if (!loaded) return;
    const timer = setTimeout(() => {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tanks)).catch(() => {
        // Ignore write errors; in-memory state still works this session.
      });
    }, 400);
    return () => clearTimeout(timer);
  }, [tanks, loaded]);

  const createTank = useCallback(
    (props: Omit<Tank, "id" | "stock" | "plants">) => {
      const id = `tank-${nextId.current++}`;
      const tank: Tank = { ...props, id, stock: [], plants: [] };
      setTanks((prev) => [...prev, tank]);
      setActiveTankId(id);
    },
    []
  );

  const updateTank = useCallback(
    (id: string, patch: Partial<Omit<Tank, "id" | "stock" | "plants">>) => {
      setTanks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...patch } : t))
      );
    },
    []
  );

  const deleteTank = useCallback((id: string) => {
    setTanks((prev) => prev.filter((t) => t.id !== id));
    setActiveTankId((curr) => (curr === id ? null : curr));
  }, []);

  const addFishToTank = useCallback((tankId: string, fish: Fish) => {
    setTanks((prev) =>
      prev.map((t) => {
        if (t.id !== tankId) return t;
        const existing = t.stock.find((e) => e.speciesId === fish.id);
        const stock = existing
          ? t.stock.map((e) =>
              e.speciesId === fish.id ? { ...e, count: e.count + 1 } : e
            )
          : [...t.stock, { speciesId: fish.id, count: 1 }];
        return { ...t, stock };
      })
    );
  }, []);

  const removeFishFromTank = useCallback((tankId: string, fish: Fish) => {
    setTanks((prev) =>
      prev.map((t) => {
        if (t.id !== tankId) return t;
        const existing = t.stock.find((e) => e.speciesId === fish.id);
        if (!existing) return t;
        // Remove one individual; drop the species entry when it hits zero.
        const stock =
          existing.count > 1
            ? t.stock.map((e) =>
                e.speciesId === fish.id ? { ...e, count: e.count - 1 } : e
              )
            : t.stock.filter((e) => e.speciesId !== fish.id);
        return { ...t, stock };
      })
    );
  }, []);

  const addPlantToTank = useCallback((tankId: string, plant: Plant) => {
    setTanks((prev) =>
      prev.map((t) => {
        if (t.id !== tankId) return t;
        const existing = t.plants.find((e) => e.plantId === plant.id);
        const plants = existing
          ? t.plants.map((e) =>
              e.plantId === plant.id ? { ...e, count: e.count + 1 } : e
            )
          : [...t.plants, { plantId: plant.id, count: 1 }];
        return { ...t, plants };
      })
    );
  }, []);

  const removePlantFromTank = useCallback((tankId: string, plant: Plant) => {
    setTanks((prev) =>
      prev.map((t) => {
        if (t.id !== tankId) return t;
        const existing = t.plants.find((e) => e.plantId === plant.id);
        if (!existing) return t;
        const plants =
          existing.count > 1
            ? t.plants.map((e) =>
                e.plantId === plant.id ? { ...e, count: e.count - 1 } : e
              )
            : t.plants.filter((e) => e.plantId !== plant.id);
        return { ...t, plants };
      })
    );
  }, []);

  const activeTank = tanks.find((t) => t.id === activeTankId) ?? null;

  const value = useMemo(
    () => ({
      tanks,
      activeTankId,
      activeTank,
      setActiveTankId,
      createTank,
      updateTank,
      deleteTank,
      addFishToTank,
      removeFishFromTank,
      addPlantToTank,
      removePlantFromTank,
    }),
    [
      tanks,
      activeTankId,
      activeTank,
      createTank,
      updateTank,
      deleteTank,
      addFishToTank,
      removeFishFromTank,
      addPlantToTank,
      removePlantFromTank,
    ]
  );

  return (
    <TankContext.Provider value={value}>{children}</TankContext.Provider>
  );
}

// Convenience hook so screens can read/write tanks without touching the
// context object directly. Throws if used outside the provider.
export function useTanks(): TankContextValue {
  const ctx = useContext(TankContext);
  if (!ctx) throw new Error("useTanks must be used inside a <TankProvider>");
  return ctx;
}
