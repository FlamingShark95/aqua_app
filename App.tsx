import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TankProvider } from "./TankContext";
import { UnitProvider } from "./UnitContext";
import { NavProvider, Suggestion } from "./NavContext";
import { Fish } from "./fishData";
import { Plant } from "./plantData";
import { COLORS } from "./fishDisplay";
import TanksScreen from "./TanksScreen";
import SearchScreen from "./SearchScreen";
import PlantsScreen from "./PlantsScreen";
import SettingsScreen from "./SettingsScreen";
import FishDetailScreen from "./FishDetailScreen";
import PlantDetailScreen from "./PlantDetailScreen";

type Tab = "tanks" | "fish" | "plants" | "settings";

const TABS: { id: Tab; label: string }[] = [
  { id: "tanks", label: "Tanks" },
  { id: "fish", label: "Fish" },
  { id: "plants", label: "Plants" },
  { id: "settings", label: "Settings" },
];

export default function App() {
  const [tab, setTab] = useState<Tab>("tanks");
  // The open fish/plant detail, if any. Owned here (not inside a tab) so it
  // can be opened from anywhere and shown as an overlay over the current tab.
  // At most one is open at a time.
  const [selectedFish, setSelectedFish] = useState<Fish | null>(null);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  // Pending "suggest fish for tank X" request, consumed by SearchScreen.
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);

  const closeDetails = () => {
    setSelectedFish(null);
    setSelectedPlant(null);
  };

  // Switching tabs also dismisses an open detail.
  const goTab = (next: Tab) => {
    closeDetails();
    setTab(next);
  };

  const openFish = useCallback((fish: Fish | null) => {
    setSelectedPlant(null);
    setSelectedFish(fish);
  }, []);

  const openPlant = useCallback((plant: Plant | null) => {
    setSelectedFish(null);
    setSelectedPlant(plant);
  }, []);

  const suggestFishForTank = useCallback((tankId: string) => {
    setSelectedFish(null);
    setSelectedPlant(null);
    setSuggestion((prev) => ({ tankId, key: (prev?.key ?? 0) + 1 }));
    setTab("fish");
  }, []);

  return (
    <UnitProvider>
      <TankProvider>
        <NavProvider
          openFish={openFish}
          openPlant={openPlant}
          suggestFishForTank={suggestFishForTank}
          suggestion={suggestion}
        >
          <View style={styles.app}>
            <View style={styles.body}>
              {tab === "tanks" ? (
                <TanksScreen />
              ) : tab === "fish" ? (
                <SearchScreen />
              ) : tab === "plants" ? (
                <PlantsScreen />
              ) : (
                <SettingsScreen />
              )}
              {selectedFish && (
                <View style={StyleSheet.absoluteFill}>
                  <FishDetailScreen
                    fish={selectedFish}
                    onBack={() => setSelectedFish(null)}
                  />
                </View>
              )}
              {selectedPlant && (
                <View style={StyleSheet.absoluteFill}>
                  <PlantDetailScreen
                    plant={selectedPlant}
                    onBack={() => setSelectedPlant(null)}
                  />
                </View>
              )}
            </View>

            <View style={styles.tabBar}>
              {TABS.map((t) => (
                <Pressable
                  key={t.id}
                  style={styles.tab}
                  onPress={() => goTab(t.id)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      tab === t.id && styles.tabTextActive,
                    ]}
                  >
                    {t.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </NavProvider>
      </TankProvider>
    </UnitProvider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  body: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: COLORS.surface,
    backgroundColor: COLORS.bgDeep,
    paddingTop: 10,
    paddingBottom: 28,
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  tabText: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: "bold",
  },
  tabTextActive: {
    color: "white",
  },
});
