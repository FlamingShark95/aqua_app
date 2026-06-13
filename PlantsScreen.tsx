import { memo, useMemo, useState } from "react";
import {
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Tank } from "./fishData";
import { AVAILABLE_PLANTS, Plant, PLANTS_BY_ID } from "./plantData";
import { PLANT_THUMBS } from "./plantImages.generated";
import { Counter } from "./Counter";
import { FishImage } from "./FishImage";
import { COLORS } from "./fishDisplay";
import { FilterSheet } from "./FilterSheet";
import {
  countActivePlantFilters,
  matchesPlantFilters,
  PLANT_CATEGORIES,
  PlantCategoryId,
  SelectedPlantFilters,
  togglePlantFilter,
} from "./plantFilters";
import {
  PLANT_FIT_TIER_LABELS,
  PLANT_SORT_MODES,
  PlantSortId,
} from "./plantSort";
import { useNav } from "./NavContext";
import { useUnits } from "./UnitContext";
import { useTanks } from "./TankContext";
import { plantWarnings, scorePlantForTank } from "./rules";

// One plant row, mirroring SearchScreen's FishRow. Memoized for the same
// reason: typing re-renders the screen, not every row.
const PlantRow = memo(function PlantRow({
  plant,
  count,
  issues,
  activeTank,
  onOpen,
  onAdd,
  onRemove,
}: {
  plant: Plant;
  count: number;
  issues: string[] | null;
  activeTank: Tank | null;
  onOpen: (plant: Plant) => void;
  onAdd: (tankId: string, plant: Plant) => void;
  onRemove: (tankId: string, plant: Plant) => void;
}) {
  return (
    <Pressable style={styles.row} onPress={() => onOpen(plant)}>
      {/* Bundled thumb first: instant and offline; remote only as a fallback. */}
      <FishImage
        source={PLANT_THUMBS[plant.id] ?? plant.images?.[0]}
        icon="🌿"
        style={styles.thumb}
      />
      <View style={styles.rowText}>
        <Text style={styles.plantName}>{plant.commonName}</Text>
        <Text style={styles.plantSci}>{plant.scientificName}</Text>
        {issues && (
          <Text
            style={[
              styles.fitBadge,
              { color: issues.length === 0 ? COLORS.green : COLORS.red },
            ]}
          >
            {issues.length === 0
              ? "✓ Suits this tank"
              : `⚠ ${issues.length} issue${issues.length > 1 ? "s" : ""}`}
          </Text>
        )}
      </View>
      {activeTank && (
        <Counter
          style={styles.addCluster}
          count={count}
          onAdd={() => onAdd(activeTank.id, plant)}
          onRemove={() => onRemove(activeTank.id, plant)}
        />
      )}
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
});

// Group a pre-sorted list into sections; same-key plants are contiguous, so we
// only ever look at the last section while grouping. Mirrors SearchScreen.
function groupSections(
  plants: Plant[],
  keyOf: (plant: Plant) => string
): { key: string; data: Plant[] }[] {
  return plants.reduce<{ key: string; data: Plant[] }[]>((acc, p) => {
    const key = keyOf(p);
    const last = acc[acc.length - 1];
    if (last && last.key === key) last.data.push(p);
    else acc.push({ key, data: [p] });
    return acc;
  }, []);
}

const TIER_ORDER = { great: 0, workable: 1, poor: 2 } as const;

export default function PlantsScreen() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SelectedPlantFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [sortId, setSortId] = useState<PlantSortId>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [suitsOnly, setSuitsOnly] = useState(false);
  const { system } = useUnits();
  const { openPlant } = useNav();
  const {
    tanks,
    activeTank,
    activeTankId,
    setActiveTankId,
    addPlantToTank,
    removePlantFromTank,
  } = useTanks();

  // Suitability of every catalog plant for the active tank (light/temp/pH).
  const issuesById = useMemo(() => {
    if (!activeTank) return null;
    return new Map(
      AVAILABLE_PLANTS.map((p) => [p.id, plantWarnings(p, activeTank, system)])
    );
  }, [activeTank, system]);

  // Best-fit sorting and the suits-only chip need a tank; fall back when gone.
  const effectiveSortId: PlantSortId =
    sortId === "fit" && !activeTank ? "name" : sortId;

  // Name substring + active filter chips (OR within a category, AND across) +
  // (when the suits-only chip is on) zero suitability issues for the tank.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return AVAILABLE_PLANTS.filter(
      (p) =>
        (p.commonName.toLowerCase().includes(q) ||
          p.scientificName.toLowerCase().includes(q)) &&
        matchesPlantFilters(p, filters) &&
        (!suitsOnly || !issuesById || issuesById.get(p.id)?.length === 0)
    );
  }, [query, filters, suitsOnly, issuesById]);

  // "Surprise me": open a random plant from the current result set (or the
  // whole catalog if nothing matches), for browsing inspiration.
  const openRandomPlant = () => {
    const pool = filtered.length > 0 ? filtered : AVAILABLE_PLANTS;
    openPlant(pool[Math.floor(Math.random() * pool.length)]);
  };

  // Best-fit scores for the whole catalog, only while fit-sorting.
  const fitScores = useMemo(() => {
    if (effectiveSortId !== "fit" || !activeTank) return null;
    return new Map(
      AVAILABLE_PLANTS.map((p) => [p.id, scorePlantForTank(p, activeTank)])
    );
  }, [effectiveSortId, activeTank]);

  // Sort by the active mode, then group into sections by that mode's key.
  const sections = useMemo(() => {
    if (fitScores) {
      const sorted = [...filtered].sort((a, b) => {
        const fa = fitScores.get(a.id)!;
        const fb = fitScores.get(b.id)!;
        const d =
          TIER_ORDER[fa.tier] - TIER_ORDER[fb.tier] ||
          fb.score - fa.score ||
          a.commonName.localeCompare(b.commonName);
        return sortDir === "asc" ? d : -d;
      });
      return groupSections(
        sorted,
        (p) => PLANT_FIT_TIER_LABELS[fitScores.get(p.id)!.tier]
      );
    }
    const sortMode =
      PLANT_SORT_MODES.find((m) => m.id === effectiveSortId) ??
      PLANT_SORT_MODES[0];
    const sorted = [...filtered].sort((a, b) =>
      sortDir === "asc" ? sortMode.compare(a, b) : -sortMode.compare(a, b)
    );
    return groupSections(sorted, sortMode.sectionKey);
  }, [filtered, effectiveSortId, sortDir, fitScores]);

  const countByPlantId = useMemo(
    () => new Map(activeTank?.plants.map((e) => [e.plantId, e.count]) ?? []),
    [activeTank]
  );

  const activeFilterCount = countActivePlantFilters(filters);

  const header = (
    <>
      <Text style={styles.title}>Plants</Text>
      {tanks.length === 0 ? (
        <Text style={styles.banner}>
          Create a tank on the Tanks tab to see what suits it here.
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

      <TextInput
        style={styles.search}
        placeholder="Search plants..."
        placeholderTextColor={COLORS.placeholder}
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
      />

      <View style={styles.controlsRow}>
        <Pressable
          style={styles.diceButton}
          onPress={openRandomPlant}
          accessibilityLabel="Open a random plant"
        >
          <Text style={styles.diceButtonText}>🎲</Text>
        </Pressable>
        <Pressable
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Text style={styles.filterButtonText}>
            Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
          </Text>
        </Pressable>
      </View>

      <View style={styles.sortRow}>
        <Text style={styles.sortLabel}>Sort</Text>
        {PLANT_SORT_MODES.map((mode) => {
          const active = mode.id === effectiveSortId;
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
        {activeTank && (
          <Pressable
            style={[
              styles.sortChip,
              effectiveSortId === "fit" && styles.sortChipActive,
            ]}
            onPress={() => {
              if (effectiveSortId === "fit") {
                setSortDir((d) => (d === "asc" ? "desc" : "asc"));
              } else {
                setSortId("fit");
                setSortDir("asc");
              }
            }}
          >
            <Text
              style={[
                styles.sortChipText,
                effectiveSortId === "fit" && styles.sortChipTextActive,
              ]}
            >
              Best fit
              {effectiveSortId === "fit"
                ? sortDir === "asc"
                  ? " ↑"
                  : " ↓"
                : ""}
            </Text>
          </Pressable>
        )}
        {activeTank && (
          <Pressable
            style={[styles.sortChip, suitsOnly && styles.sortChipActive]}
            onPress={() => setSuitsOnly((v) => !v)}
          >
            <Text
              style={[
                styles.sortChipText,
                suitsOnly && styles.sortChipTextActive,
              ]}
            >
              ✓ Suits my tank
            </Text>
          </Pressable>
        )}
      </View>
    </>
  );

  return (
    <>
      <SectionList
        style={styles.screen}
        contentContainerStyle={styles.content}
        sections={sections}
        keyExtractor={(plant) => plant.id}
        stickySectionHeadersEnabled={false}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={header}
        ListEmptyComponent={
          <Text style={styles.noResults}>No plants found</Text>
        }
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.key}</Text>
        )}
        renderItem={({ item }) => (
          <PlantRow
            plant={item}
            count={countByPlantId.get(item.id) ?? 0}
            issues={issuesById?.get(item.id) ?? null}
            activeTank={activeTank}
            onOpen={openPlant}
            onAdd={addPlantToTank}
            onRemove={removePlantFromTank}
          />
        )}
      />

      <FilterSheet
        visible={showFilters}
        categories={PLANT_CATEGORIES}
        filters={filters}
        activeCount={activeFilterCount}
        onToggle={(cat, opt) =>
          setFilters((prev) =>
            togglePlantFilter(prev, cat as PlantCategoryId, opt)
          )
        }
        onClear={() => setFilters({})}
        onClose={() => setShowFilters(false)}
        resultCount={filtered.length}
        resultNoun="plants"
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
  search: {
    backgroundColor: COLORS.surface,
    color: "white",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 8,
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  diceButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    justifyContent: "center",
  },
  diceButtonText: {
    fontSize: 18,
  },
  filterButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  filterButtonText: {
    color: COLORS.link,
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
  plantName: {
    color: "white",
    fontSize: 17,
  },
  plantSci: {
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
