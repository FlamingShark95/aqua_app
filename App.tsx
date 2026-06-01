import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TankProvider } from "./TankContext";
import { UnitProvider } from "./UnitContext";
import TanksScreen from "./TanksScreen";
import SearchScreen from "./SearchScreen";

type Tab = "tanks" | "search";

export default function App() {
  const [tab, setTab] = useState<Tab>("tanks");

  return (
    <UnitProvider>
      <TankProvider>
        <View style={styles.app}>
        <View style={styles.body}>
          {tab === "tanks" ? <TanksScreen /> : <SearchScreen />}
        </View>

        <View style={styles.tabBar}>
          <Pressable style={styles.tab} onPress={() => setTab("tanks")}>
            <Text
              style={[styles.tabText, tab === "tanks" && styles.tabTextActive]}
            >
              Tanks
            </Text>
          </Pressable>
          <Pressable style={styles.tab} onPress={() => setTab("search")}>
            <Text
              style={[styles.tabText, tab === "search" && styles.tabTextActive]}
            >
              Add fish
            </Text>
          </Pressable>
        </View>
        </View>
      </TankProvider>
    </UnitProvider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#0b1d2a",
  },
  body: {
    flex: 1,
  },
  tabBar: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#13314a",
    backgroundColor: "#0a1622",
    paddingTop: 10,
    paddingBottom: 28,
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  tabText: {
    color: "#7792a8",
    fontSize: 14,
    fontWeight: "bold",
  },
  tabTextActive: {
    color: "white",
  },
});
