import { createContext, ReactNode, useContext, useMemo } from "react";
import { Fish } from "./fishData";
import { Plant } from "./plantData";

// Lightweight navigation context so any screen (e.g. a tank card) can open a
// fish's detail page, which App renders as an overlay. Keeps the detail out of
// any single tab so it's reachable from everywhere.

// A pending "suggest fish for this tank" jump. `key` increments per request so
// SearchScreen can react to repeat taps for the same tank.
export type Suggestion = { tankId: string; key: number };

type NavValue = {
  openFish: (fish: Fish) => void;
  openPlant: (plant: Plant) => void;
  // Jump to the Fish tab set up to recommend fish for this tank.
  suggestFishForTank: (tankId: string) => void;
  suggestion: Suggestion | null;
};

const NavContext = createContext<NavValue | null>(null);

export function NavProvider({
  openFish,
  openPlant,
  suggestFishForTank,
  suggestion,
  children,
}: {
  openFish: (fish: Fish) => void;
  openPlant: (plant: Plant) => void;
  suggestFishForTank: (tankId: string) => void;
  suggestion: Suggestion | null;
  children: ReactNode;
}) {
  const value = useMemo(
    () => ({ openFish, openPlant, suggestFishForTank, suggestion }),
    [openFish, openPlant, suggestFishForTank, suggestion]
  );
  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export function useNav(): NavValue {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used inside a <NavProvider>");
  return ctx;
}
