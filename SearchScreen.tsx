import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AVAILABLE_FISH, Fish } from "./fishData";
import { FishThumbnail } from "./FishThumbnail";
import { COLORS } from "./fishDisplay";
import { useNav } from "./NavContext";
import { FilterSheet } from "./FilterSheet";
import {
  countActiveFilters,
  matchesFilters,
  SelectedFilters,
} from "./fishFilters";
import { SORT_MODES, SortId } from "./fishSort";
import { useUnits } from "./UnitContext";
import { useTanks } from "./TankContext";
import { previewFishInTank } from "./rules";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SelectedFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [sortId, setSortId] = useState<SortId>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const { system } = useUnits();
  const { openFish } = useNav();
  const {
    tanks,
    activeTank,
    activeTankId,
    setActiveTankId,
    addFishToTank,
    removeFishFromTank,
  } = useTanks();

  // Name prefix match AND every active filter category.
  const filteredFish = AVAILABLE_FISH.filter(
    (fish) =>
      fish.commonName.toLowerCase().startsWith(query.trim().toLowerCase()) &&
      matchesFilters(fish, filters)
  );
  const activeCount = countActiveFilters(filters);

  // Sort by the active mode, then group into sections by that mode's key.
  // Because the list is sorted first, fish sharing a key land next to each
  // other, so we only ever need to look at the last section while grouping.
  const sortMode = SORT_MODES.find((m) => m.id === sortId) ?? SORT_MODES[0];
  const sections = [...filteredFish]
    .sort((a, b) =>
      sortDir === "asc" ? sortMode.compare(a, b) : -sortMode.compare(a, b)
    )
    .reduce<{ key: string; fish: Fish[] }[]>((acc, fish) => {
      const key = sortMode.sectionKey(fish);
      const last = acc[acc.length - 1];
      if (last && last.key === key) last.fish.push(fish);
      else acc.push({ key, fish: [fish] });
      return acc;
    }, []);

  return (
    <>
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Fish</Text>
      {tanks.length === 0 ? (
        <Text style={styles.banner}>
          Create a tank on the Tanks tab to see what fits here.
        </Text>
      ) : (
        <View style={styles.tankPickerRow}>
          <Text style={styles.tankPickerLabel}>For tank</Text>
          {tanks.map((t) => {
            const sel = t.id === activeTankId;
            return (
              <Pressable
                key={t.id}
                style={[styles.tankChip, sel && styles.tankChipActive]}
                onPress={() => setActiveTankId(t.id)}
              >
                <Text
                  style={[
                    styles.tankChipText,
                    sel && styles.tankChipTextActive,
                  ]}
                >
                  {t.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}

      <View style={styles.searchRow}>
        <TextInput
          style={styles.search}
          placeholder="Search fish..."
          placeholderTextColor="#88a"
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
        />
        <Pressable
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Text style={styles.filterButtonText}>
            Filters{activeCount > 0 ? ` (${activeCount})` : ""}
          </Text>
        </Pressable>
        {activeCount > 0 && (
          <Pressable style={styles.clearButton} onPress={() => setFilters({})}>
            <Text style={styles.clearButtonText}>Clear ✕</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.sortRow}>
        <Text style={styles.sortLabel}>Sort</Text>
        {SORT_MODES.map((mode) => {
          const active = mode.id === sortId;
          return (
            <Pressable
              key={mode.id}
              style={[styles.sortChip, active && styles.sortChipActive]}
              onPress={() => {
                if (active) {
                  setSortDir((d) => (d === "asc" ? "desc" : "asc"));
                } else {
                  setSortId(mode.id);
                  setSortDir("asc");
                }
              }}
            >
              <Text
                style={[
                  styles.sortChipText,
                  active && styles.sortChipTextActive,
                ]}
              >
                {mode.label}
                {active ? (sortDir === "asc" ? " ↑" : " ↓") : ""}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {filteredFish.length === 0 ? (
        <Text style={styles.noResults}>No fish found</Text>
      ) : (
        sections.map((section) => (
          <View key={section.key}>
            <Text style={styles.sectionHeader}>{section.key}</Text>
            {section.fish.map((fish) => {
              const issues = activeTank
                ? previewFishInTank(fish, activeTank, system)
                : null;
              const inTank = activeTank
                ? activeTank.stock.filter((f) => f.id === fish.id).length
                : 0;
              return (
                <Pressable
                  key={fish.id}
                  style={styles.row}
                  onPress={() => openFish(fish)}
                >
                  <FishThumbnail
                    source={fish.images?.[0]}
                    style={styles.thumb}
                  />
                  <View style={styles.rowText}>
                    <Text style={styles.fishName}>{fish.commonName}</Text>
                    <Text style={styles.fishSci}>{fish.scientificName}</Text>
                    {issues && (
                      <Text
                        style={[
                          styles.fitBadge,
                          { color: issues.length === 0 ? COLORS.green : COLORS.red },
                        ]}
                      >
                        {issues.length === 0
                          ? "✓ Fits this tank"
                          : `⚠ ${issues.length} issue${
                              issues.length > 1 ? "s" : ""
                            }`}
                      </Text>
                    )}
                  </View>
                  {activeTank && (
                    <View style={styles.addCluster}>
                      <Pressable
                        style={styles.countButton}
                        onPress={() => removeFishFromTank(activeTank.id, fish)}
                      >
                        <Text style={styles.countButtonText}>−</Text>
                      </Pressable>
                      <Text style={styles.inTankCount}>{inTank}</Text>
                      <Pressable
                        style={styles.countButton}
                        onPress={() => addFishToTank(activeTank.id, fish)}
                      >
                        <Text style={styles.countButtonText}>+</Text>
                      </Pressable>
                    </View>
                  )}
                  <Text style={styles.chevron}>›</Text>
                </Pressable>
              );
            })}
          </View>
        ))
      )}
    </ScrollView>
    <FilterSheet
      visible={showFilters}
      filters={filters}
      onChange={setFilters}
      onClose={() => setShowFilters(false)}
      resultCount={filteredFish.length}
      system={system}
    />
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0b1d2a",
  },
  content: {
    paddingTop: 70,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  banner: {
    color: "#9bc",
    fontSize: 15,
    marginBottom: 16,
  },
  tankPickerRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14,
  },
  tankPickerLabel: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "bold",
    marginRight: 2,
  },
  tankChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#2c4a63",
  },
  tankChipActive: {
    backgroundColor: "#2a7",
    borderColor: "#2a7",
  },
  tankChipText: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "600",
  },
  tankChipTextActive: {
    color: "white",
  },
  searchRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  search: {
    flex: 1,
    backgroundColor: "#13314a",
    color: "white",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  filterButton: {
    backgroundColor: "#13314a",
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  filterButtonText: {
    color: "#7fd1ff",
    fontSize: 15,
    fontWeight: "bold",
  },
  clearButton: {
    backgroundColor: "#13314a",
    borderRadius: 10,
    paddingHorizontal: 14,
    justifyContent: "center",
  },
  clearButtonText: {
    color: "#ff8080",
    fontSize: 15,
    fontWeight: "bold",
  },
  sortRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  sortLabel: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "bold",
    marginRight: 2,
  },
  sortChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#2c4a63",
  },
  sortChipActive: {
    backgroundColor: "#2a7",
    borderColor: "#2a7",
  },
  sortChipText: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "600",
  },
  sortChipTextActive: {
    color: "white",
  },
  noResults: {
    color: "#88a",
    fontSize: 15,
    fontStyle: "italic",
    paddingVertical: 12,
  },
  sectionHeader: {
    color: "#2a7",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 18,
    marginBottom: 2,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#13314a",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#13314a",
  },
  thumb: {
    marginRight: 12,
  },
  rowText: {
    flex: 1,
  },
  fishName: {
    color: "white",
    fontSize: 17,
  },
  fishSci: {
    color: COLORS.muted,
    fontSize: 13,
    fontStyle: "italic",
    marginTop: 2,
  },
  fitBadge: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 3,
  },
  addCluster: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  inTankCount: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: 6,
    minWidth: 18,
    textAlign: "center",
  },
  countButton: {
    backgroundColor: "#2a7",
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  countButtonText: {
    color: "white",
    fontSize: 19,
    fontWeight: "bold",
    lineHeight: 21,
  },
  chevron: {
    color: COLORS.muted,
    fontSize: 24,
    marginLeft: 8,
  },
});
