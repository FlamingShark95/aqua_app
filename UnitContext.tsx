import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UnitSystem } from "./units";

const STORAGE_KEY = "aqua_app.unitSystem";

type UnitContextValue = {
  system: UnitSystem;
  setSystem: (system: UnitSystem) => void;
};

const UnitContext = createContext<UnitContextValue | null>(null);

export function UnitProvider({ children }: { children: ReactNode }) {
  // Default to imperial; overridden by a saved preference if one exists.
  const [system, setSystemState] = useState<UnitSystem>("imperial");

  // Load the saved choice once on mount.
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (saved === "metric" || saved === "imperial") {
          setSystemState(saved);
        }
      })
      .catch(() => {
        // Ignore read errors and keep the default.
      });
  }, []);

  // Update state and persist the choice for next launch.
  const setSystem = useCallback((next: UnitSystem) => {
    setSystemState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {
      // Ignore write errors; the in-memory choice still applies this session.
    });
  }, []);

  const value = useMemo(() => ({ system, setSystem }), [system, setSystem]);

  return (
    <UnitContext.Provider value={value}>{children}</UnitContext.Provider>
  );
}

export function useUnits(): UnitContextValue {
  const ctx = useContext(UnitContext);
  if (!ctx) throw new Error("useUnits must be used inside a <UnitProvider>");
  return ctx;
}
