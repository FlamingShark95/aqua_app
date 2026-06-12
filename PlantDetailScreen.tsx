import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Plant } from "./plantData";
import { useTanks } from "./TankContext";
import { useUnits } from "./UnitContext";
import { Counter } from "./Counter";
import { FishImage } from "./FishImage";
import { plantWarnings } from "./rules";
import { Badge, COLORS } from "./fishDisplay";
import { plantCareMap, lightMap, co2Map, growthMap } from "./plantDisplay";
import { formatLength, formatTempRange } from "./units";

const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function PlantDetailScreen({
  plant,
  onBack,
}: {
  plant: Plant;
  onBack: () => void;
}) {
  const { system } = useUnits();
  const { tanks, addPlantToTank, removePlantFromTank } = useTanks();
  const [page, setPage] = useState(0);
  const slideWidth = useWindowDimensions().width - 40;

  const tags: Badge[] = [
    plantCareMap[plant.careLevel],
    lightMap[plant.light],
    co2Map[plant.co2],
    growthMap[plant.growthRate],
  ];

  const slides =
    plant.images && plant.images.length > 0 ? plant.images : [null];

  const facts: { label: string; value: string }[] = [
    { label: "Height", value: formatLength(plant.heightCm, system) },
    { label: "Type", value: titleCase(plant.type) },
    { label: "Placement", value: titleCase(plant.placement) },
    {
      label: "Temperature",
      value: formatTempRange(plant.tempMinC, plant.tempMaxC, system),
    },
    { label: "pH", value: `${plant.phMin} – ${plant.phMax}` },
    ...(plant.origin ? [{ label: "Origin", value: plant.origin }] : []),
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Pressable style={styles.backButton} onPress={onBack} hitSlop={8}>
        <Text style={styles.backChevron}>‹</Text>
      </Pressable>

      <View style={[styles.gallery, { height: slideWidth }]}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) =>
            setPage(Math.round(e.nativeEvent.contentOffset.x / slideWidth))
          }
        >
          {slides.map((picture, i) => (
            <FishImage
              key={i}
              source={picture}
              icon="🌿"
              iconSize={80}
              style={[styles.slide, { width: slideWidth, height: slideWidth }]}
            />
          ))}
        </ScrollView>
        {slides.length > 1 && (
          <View style={styles.dots} pointerEvents="none">
            {slides.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === page && styles.dotActive]}
              />
            ))}
          </View>
        )}
      </View>

      <Text style={styles.commonName}>{plant.commonName}</Text>
      <Text style={styles.scientificName}>{plant.scientificName}</Text>

      <View style={styles.tags}>
        {tags.map((tag) => (
          <View
            key={tag.text}
            style={[styles.tag, { backgroundColor: tag.color + "22" }]}
          >
            <Text style={[styles.tagText, { color: tag.color }]}>
              {tag.text}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Add to a tank</Text>
      {tanks.length === 0 ? (
        <Text style={styles.noTankHint}>
          Create a tank on the Tanks tab, then add this plant to it here.
        </Text>
      ) : (
        <View style={styles.card}>
          {tanks.map((tank, i) => {
            const count =
              tank.plants.find((e) => e.plantId === plant.id)?.count ?? 0;
            // Advisory only — never gates the +/- counter.
            const issues = plantWarnings(plant, tank, system);
            return (
              <View
                key={tank.id}
                style={[
                  styles.tankEntry,
                  i < tanks.length - 1 && styles.factDivider,
                ]}
              >
                <View style={styles.tankRow}>
                  <View style={styles.tankRowText}>
                    <Text style={styles.tankRowName}>{tank.name}</Text>
                    <Text style={styles.tankRowMeta}>
                      {count > 0 ? `${count} in this tank` : "none yet"}
                    </Text>
                  </View>
                  <Counter
                    size={34}
                    count={count}
                    onAdd={() => addPlantToTank(tank.id, plant)}
                    onRemove={() => removePlantFromTank(tank.id, plant)}
                  />
                </View>
                {issues.length === 0 ? (
                  <Text style={styles.fitGood}>✓ Suits this tank</Text>
                ) : (
                  <View style={styles.fitBad}>
                    {issues.map((issue, j) => (
                      <Text key={j} style={styles.fitBadText}>
                        ⚠ {issue}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      )}

      <Text style={styles.sectionTitle}>Quick facts</Text>
      <View style={styles.card}>
        {facts.map((fact, i) => (
          <View
            key={fact.label}
            style={[styles.factRow, i < facts.length - 1 && styles.factDivider]}
          >
            <Text style={styles.factLabel}>{fact.label}</Text>
            <Text style={styles.factValue}>{fact.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.proseBlock}>
        <Text style={styles.proseTitle}>Description</Text>
        <Text style={styles.proseText}>{plant.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 48,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  backChevron: {
    color: "white",
    fontSize: 26,
    lineHeight: 28,
    marginTop: -2,
  },
  gallery: {
    marginBottom: 16,
  },
  slide: {
    borderRadius: 18,
  },
  dots: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  dotActive: {
    backgroundColor: "white",
  },
  commonName: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  scientificName: {
    color: COLORS.muted,
    fontSize: 16,
    fontStyle: "italic",
    marginTop: 2,
    marginBottom: 14,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 18,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  tagText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  tankEntry: {
    paddingVertical: 12,
  },
  tankRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fitGood: {
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: "600",
    marginTop: 8,
  },
  fitBad: {
    marginTop: 8,
    backgroundColor: COLORS.dangerBg,
    borderRadius: 8,
    padding: 10,
  },
  fitBadText: {
    color: COLORS.dangerText,
    fontSize: 13,
    paddingVertical: 2,
  },
  tankRowText: {
    flex: 1,
    paddingRight: 12,
  },
  tankRowName: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  tankRowMeta: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 2,
  },
  noTankHint: {
    color: COLORS.muted,
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 22,
  },
  sectionTitle: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  card: {
    backgroundColor: COLORS.surfaceDeep,
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 22,
  },
  factRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  factDivider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  factLabel: {
    color: COLORS.muted,
    fontSize: 15,
  },
  factValue: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "600",
  },
  proseBlock: {
    marginBottom: 18,
  },
  proseTitle: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 6,
  },
  proseText: {
    color: "#c4d2de",
    fontSize: 15,
    lineHeight: 22,
  },
});
