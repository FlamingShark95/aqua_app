import { memo, useMemo, useState } from "react";
import {
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AVAILABLE_FISH, Fish, FISH_BY_ID, Tank } from "./fishData";
import { Counter } from "./Counter";
import { FishImage } from "./FishImage";
import { COLORS } from "./fishDisplay";
import { useNav } from "./NavContext";
import { FilterSheet } from "./FilterSheet";
import {
  countActiveFilters,
  matchesFilters,
  SelectedFilters,
} from "./fishFilters";
import { SORT_MODES, SortId } from "./fishSort";
import { UnitSystem } from "./units";
import { useUnits } from "./UnitContext";
import { useTanks } from "./TankContext";
import { previewFishInTank } from "./rules";

// One fish row. Memoized so typing in the search box (which re-renders the
// screen) doesn't re-render rows whose props haven't changed; the compat
// preview only re-runs when the active tank or unit system changes.
const FishRow = memo(function FishRow({
  fish,
  count,
  activeTank,
  system,
  onOpen,
  onAdd,
  onRemove,
}: {
  fish: Fish;
  count: number;
  activeTank: Tank | null;
  system: UnitSystem;
  onOpen: (fish: Fish) => void;
  onAdd: (tankId: string, fish: Fish) => void;
  onRemove: (tankId: string, fish: Fish) => void;
}) {
  const issues = useMemo(
    () =>
      activeTank
        ? previewFishInTank(fish, activeTank, system, FISH_BY_ID)
        : null,
    [fish, activeTank, system]
  );

  return (
    <Pressable style={styles.row} onPress={() => onOpen(fish)}>
      <FishImage source={fish.images?.[0]} style={styles.thumb} />
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
              : `⚠ ${issues.length} issue${issues.length > 1 ? "s" : ""}`}
          </Text>
        )}
      </View>
      {activeTank && (
        <Counter
          style={styles.addCluster}
          count={count}
          onAdd={() => onAdd(activeTank.id, fish)}
          onRemove={() => onRemove(activeTank.id, fish)}
        />
      )}
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
});

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
  const filteredFish = useMemo(() => {
    const q = query.trim().toLowerCase();
    return AVAILABLE_FISH.filter(
      (fish) =>
        fish.commonName.toLowerCase().startsWith(q) &&
        matchesFilters(fish, filters)
    );
  }, [query, filters]);
  const activeCount = countActiveFilters(filters);

  // Sort by the active mode, then group into sections by that mode's key.
  // Because the list is sorted first, fish sharing a key land next to each
  // other, so we only ever need to look at the last section while grouping.
  const sections = useMemo(() => {
    const sortMode = SORT_MODES.find((m) => m.id === sortId) ?? SORT_MODES[0];
    return [...filteredFish]
      .sort((a, b) =>
        sortDir === "asc" ? sortMode.compare(a, b) : -sortMode.compare(a, b)
      )
      .reduce<{ key: string; data: Fish[] }[]>((acc, fish) => {
        const key = sortMode.sectionKey(fish);
        const last = acc[acc.length - 1];
        if (last && last.key === key) last.data.push(fish);
        else acc.push({ key, data: [fish] });
        return acc;
      }, []);
  }, [filteredFish, sortId, sortDir]);

  // Per-species count in the active tank, so rows don't scan the stock list.
  const countBySpeciesId = useMemo(
    () =>
      new Map(activeTank?.stock.map((e) => [e.speciesId, e.count]) ?? []),
    [activeTank]
  );

  const header = (
    <>
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
          placeholderTextColor={COLORS.placeholder}
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
    </>
  );

  return (
    <>
    <SectionList
      style={styles.screen}
      contentContainerStyle={styles.content}
      sections={sections}
      keyExtractor={(fish) => fish.id}
      stickySectionHeadersEnabled={false}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={header}
      ListEmptyComponent={<Text style={styles.noResults}>No fish found</Text>}
      renderSectionHeader={({ section }) => (
        <Text style={styles.sectionHeader}>{section.key}</Text>
      )}
      renderItem={({ item }) => (
        <FishRow
          fish={item}
          count={countBySpeciesId.get(item.id) ?? 0}
          activeTank={activeTank}
          system={system}
          onOpen={openFish}
          onAdd={addFishToTank}
          onRemove={removeFishFromTank}
        />
      )}
    />
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
    backgroundColor: COLORS.bg,
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
    color: COLORS.soft,
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
    borderColor: COLORS.chipBorder,
  },
  tankChipActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
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
    backgroundColor: COLORS.surface,
    color: "white",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  filterButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  filterButtonText: {
    color: COLORS.link,
    fontSize: 15,
    fontWeight: "bold",
  },
  clearButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    paddingHorizontal: 14,
    justifyContent: "center",
  },
  clearButtonText: {
    color: COLORS.danger,
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
    borderColor: COLORS.chipBorder,
  },
  sortChipActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
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
    color: COLORS.placeholder,
    fontSize: 15,
    fontStyle: "italic",
    paddingVertical: 12,
  },
  sectionHeader: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 18,
    marginBottom: 2,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },
  thumb: {
    width: 52,
    height: 52,
    borderRadius: 10,
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
    marginLeft: 8,
  },
  chevron: {
    color: COLORS.muted,
    fontSize: 24,
    marginLeft: 8,
  },
});
