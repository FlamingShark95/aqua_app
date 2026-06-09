import { createContext, ReactNode, useContext, useMemo } from "react";
import { Fish } from "./fishData";

// Lightweight navigation context so any screen (e.g. a tank card) can open a
// fish's detail page, which App renders as an overlay. Keeps the detail out of
// any single tab so it's reachable from everywhere.
type NavValue = {
  openFish: (fish: Fish) => void;
};

const NavContext = createContext<NavValue | null>(null);

export function NavProvider({
  openFish,
  children,
}: {
  openFish: (fish: Fish) => void;
  children: ReactNode;
}) {
  const value = useMemo(() => ({ openFish }), [openFish]);
  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

export function useNav(): NavValue {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be used inside a <NavProvider>");
  return ctx;
}
