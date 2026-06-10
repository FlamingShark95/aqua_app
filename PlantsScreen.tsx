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
import { Counter } from "./Counter";
import { FishImage } from "./FishImage";
import { COLORS } from "./fishDisplay";
import { useNav } from "./NavContext";
import { useUnits } from "./UnitContext";
import { useTanks } from "./TankContext";
import { plantWarnings } from "./rules";

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
      <FishImage source={plant.images?.[0]} icon="🌿" style={styles.thumb} />
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

export default function PlantsScreen() {
  const [query, setQuery] = useState("");
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

  // Substring match on either name; alphabetical, sectioned by first letter.
  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    return AVAILABLE_PLANTS.filter(
      (p) =>
        p.commonName.toLowerCase().includes(q) ||
        p.scientificName.toLowerCase().includes(q)
    )
      .sort((a, b) => a.commonName.localeCompare(b.commonName))
      .reduce<{ key: string; data: Plant[] }[]>((acc, plant) => {
        const key = plant.commonName.charAt(0).toUpperCase();
        const last = acc[acc.length - 1];
        if (last && last.key === key) last.data.push(plant);
        else acc.push({ key, data: [plant] });
        return acc;
      }, []);
  }, [query]);

  const countByPlantId = useMemo(
    () => new Map(activeTank?.plants.map((e) => [e.plantId, e.count]) ?? []),
    [activeTank]
  );

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
    </>
  );

  return (
    <SectionList
      style={styles.screen}
      contentContainerStyle={styles.content}
      sections={sections}
      keyExtractor={(plant) => plant.id}
      stickySectionHeadersEnabled={false}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={header}
      ListEmptyComponent={<Text style={styles.noResults}>No plants found</Text>}
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
