import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fish, Tank } from "./fishData";

const STORAGE_KEY = "aqua_app.tanks";

type TankContextValue = {
  tanks: Tank[];
  activeTankId: string | null;
  activeTank: Tank | null;
  setActiveTankId: (id: string) => void;
  createTank: (props: Omit<Tank, "id" | "stock">) => void;
  updateTank: (id: string, patch: Partial<Omit<Tank, "id" | "stock">>) => void;
  deleteTank: (id: string) => void;
  addFishToTank: (tankId: string, fish: Fish) => void;
  removeFishFromTank: (tankId: string, fish: Fish) => void;
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
    stock: [],
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
            setTanks(saved);
            setActiveTankId(saved[0]?.id ?? null);
            nextId.current = nextIdFrom(saved);
          }
        }
      })
      .catch(() => {
        // Ignore read/parse errors and keep the defaults.
      })
      .finally(() => setLoaded(true));
  }, []);

  // Persist whenever tanks change (after the initial load).
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tanks)).catch(() => {
      // Ignore write errors; in-memory state still works this session.
    });
  }, [tanks, loaded]);

  function createTank(props: Omit<Tank, "id" | "stock">) {
    const id = `tank-${nextId.current++}`;
    const tank: Tank = { ...props, id, stock: [] };
    setTanks((prev) => [...prev, tank]);
    setActiveTankId(id);
  }

  function updateTank(id: string, patch: Partial<Omit<Tank, "id" | "stock">>) {
    setTanks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch } : t))
    );
  }

  function deleteTank(id: string) {
    setTanks((prev) => prev.filter((t) => t.id !== id));
    setActiveTankId((curr) => (curr === id ? null : curr));
  }

  function addFishToTank(tankId: string, fish: Fish) {
    setTanks((prev) =>
      prev.map((t) =>
        // Push a copy so each stocked fish is its own object, not a shared
        // reference to the catalog entry.
        t.id === tankId ? { ...t, stock: [...t.stock, { ...fish }] } : t
      )
    );
  }

  function removeFishFromTank(tankId: string, fish: Fish) {
    setTanks((prev) =>
      prev.map((t) => {
        if (t.id !== tankId) return t;
        // Remove one individual of this species (matched by species id).
        const index = t.stock.findIndex((f) => f.id === fish.id);
        if (index === -1) return t;
        return { ...t, stock: t.stock.filter((_, i) => i !== index) };
      })
    );
  }

  const activeTank = tanks.find((t) => t.id === activeTankId) ?? null;

  return (
    <TankContext.Provider
      value={{
        tanks,
        activeTankId,
        activeTank,
        setActiveTankId,
        createTank,
        updateTank,
        deleteTank,
        addFishToTank,
        removeFishFromTank,
      }}
    >
      {children}
    </TankContext.Provider>
  );
}

// Convenience hook so screens can read/write tanks without touching the
// context object directly. Throws if used outside the provider.
export function useTanks(): TankContextValue {
  const ctx = useContext(TankContext);
  if (!ctx) throw new Error("useTanks must be used inside a <TankProvider>");
  return ctx;
}
