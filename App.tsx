import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TankProvider } from "./TankContext";
import { UnitProvider } from "./UnitContext";
import { NavProvider } from "./NavContext";
import { Fish } from "./fishData";
import { COLORS } from "./fishDisplay";
import TanksScreen from "./TanksScreen";
import SearchScreen from "./SearchScreen";
import FishDetailScreen from "./FishDetailScreen";

type Tab = "tanks" | "search";

export default function App() {
  const [tab, setTab] = useState<Tab>("tanks");
  // The open fish detail, if any. Owned here (not inside a tab) so it can be
  // opened from anywhere and shown as an overlay over the current tab.
  const [selectedFish, setSelectedFish] = useState<Fish | null>(null);

  // Switching tabs also dismisses an open detail.
  const goTab = (next: Tab) => {
    setSelectedFish(null);
    setTab(next);
  };

  return (
    <UnitProvider>
      <TankProvider>
        <NavProvider openFish={setSelectedFish}>
          <View style={styles.app}>
            <View style={styles.body}>
              {tab === "tanks" ? <TanksScreen /> : <SearchScreen />}
              {selectedFish && (
                <View style={StyleSheet.absoluteFill}>
                  <FishDetailScreen
                    fish={selectedFish}
                    onBack={() => setSelectedFish(null)}
                  />
                </View>
              )}
            </View>

            <View style={styles.tabBar}>
              <Pressable style={styles.tab} onPress={() => goTab("tanks")}>
                <Text
                  style={[
                    styles.tabText,
                    tab === "tanks" && styles.tabTextActive,
                  ]}
                >
                  Tanks
                </Text>
              </Pressable>
              <Pressable style={styles.tab} onPress={() => goTab("search")}>
                <Text
                  style={[
                    styles.tabText,
                    tab === "search" && styles.tabTextActive,
                  ]}
                >
                  Add fish
                </Text>
              </Pressable>
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
