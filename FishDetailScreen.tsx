import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Fish, FISH_BY_ID } from "./fishData";
import { FISH_IMAGE_CREDITS, FISH_THUMBS } from "./fishImages.generated";
import { useTanks } from "./TankContext";
import { useUnits } from "./UnitContext";
import { Counter } from "./Counter";
import { FishImage } from "./FishImage";
import { previewFishInTank } from "./rules";
import {
  availabilityBadge,
  Badge,
  careBadge,
  COLORS,
  dietBadge,
  tankRegionLabel,
  temperamentBadge,
  waterTypeLabel,
} from "./fishDisplay";
import { formatLength, formatLengthRange, formatTempRange, formatVolume } from "./units";

export default function FishDetailScreen({
  fish,
  onBack,
}: {
  fish: Fish;
  onBack: () => void;
}) {
  const { system } = useUnits();
  const { tanks, addFishToTank, removeFishFromTank } = useTanks();
  const [page, setPage] = useState(0);
  // Gallery slides are square, screen width minus the content padding. Comes
  // from the hook (not a module constant) so rotation re-sizes the gallery.
  const slideWidth = useWindowDimensions().width - 40;

  const tags: Badge[] = [
    careBadge(fish),
    temperamentBadge(fish),
    dietBadge(fish),
    availabilityBadge(fish),
  ];

  // Gallery: real photos if present, otherwise a single placeholder frame.
  // The bundled thumb (if any) underlays each slide, so remote hi-res images
  // appear instantly as the offline thumbnail and upgrade in place.
  const slides = fish.images && fish.images.length > 0 ? fish.images : [null];
  const thumb = FISH_THUMBS[fish.id];
  // One credit per slide (extra gallery photos have their own photographers);
  // the line under the gallery follows the swipe.
  const credits = FISH_IMAGE_CREDITS[fish.id];
  const credit = credits?.[page] ?? credits?.[0];

  // Quick facts — only the rows we actually have a value for (no "?" clutter).
  const facts: { label: string; value: string }[] = [
    {
      label: "Size",
      value: fish.adultSizeMinCm
        ? formatLengthRange(fish.adultSizeMinCm, fish.adultSizeCm, system)
        : formatLength(fish.adultSizeCm, system),
    },
    { label: "Minimum tank", value: formatVolume(fish.minTankVolumeL, system) },
    {
      label: "Temperature",
      value: formatTempRange(fish.tempMinC, fish.tempMaxC, system),
    },
    { label: "pH", value: `${fish.phMin} – ${fish.phMax}` },
    { label: "Water type", value: waterTypeLabel(fish) },
    ...(fish.tankRegion
      ? [{ label: "Tank region", value: tankRegionLabel(fish) }]
      : []),
    ...(fish.minGroupSize > 1
      ? [{
          label: fish.maxGroupSize ? "Group size" : "Minimum group",
          value: fish.maxGroupSize
            ? `${fish.minGroupSize}–${fish.maxGroupSize} fish`
            : `${fish.minGroupSize} fish`,
        }]
      : []),
    ...(fish.lifeExpectancyYears
      ? [{
          label: "Life expectancy",
          value: fish.lifeExpectancyMaxYears
            ? `${fish.lifeExpectancyYears}–${fish.lifeExpectancyMaxYears} years`
            : `${fish.lifeExpectancyYears} years`,
        }]
      : []),
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
              source={picture ?? thumb}
              // Thumb underlay only on the first slide — it's the same photo.
              // Extra slides are different photos; a mismatched underlay would
              // flash the wrong picture while they load.
              fallback={i === 0 && picture ? thumb : undefined}
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
      {credit && (
        <Text style={styles.photoCredit}>
          Photo: {credit.artist} · {credit.license} · {credit.source}
        </Text>
      )}

      <Text style={styles.commonName}>{fish.commonName}</Text>
      <Text style={styles.scientificName}>{fish.scientificName}</Text>

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

      {/* Add to any tank — one counter per tank. */}
      <Text style={styles.sectionTitle}>Add to a tank</Text>
      {tanks.length === 0 ? (
        <Text style={styles.noTankHint}>
          Create a tank on the Tanks tab, then add this fish to it here.
        </Text>
      ) : (
        <View style={styles.card}>
          {tanks.map((tank, i) => {
            const count =
              tank.stock.find((e) => e.speciesId === fish.id)?.count ?? 0;
            // Advisory only — this never gates the +/- counter below.
            const issues = previewFishInTank(fish, tank, system, FISH_BY_ID);
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
                    onAdd={() => addFishToTank(tank.id, fish)}
                    onRemove={() => removeFishFromTank(tank.id, fish)}
                  />
                </View>
                {issues.length === 0 ? (
                  <Text style={styles.fitGood}>✓ Good fit for this tank</Text>
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

      <Prose title="Description" text={fish.description} />
      <Prose title="Origin" text={fish.origin} />
      {fish.behavior ? <Prose title="Behavior" text={fish.behavior} /> : null}
      {fish.reproduction ? (
        <Prose title="Reproduction" text={fish.reproduction} />
      ) : null}
      {fish.dimorphism ? (
        <Prose title="Dimorphism" text={fish.dimorphism} />
      ) : null}
    </ScrollView>
  );
}

function Prose({ title, text }: { title: string; text: string }) {
  return (
    <View style={styles.proseBlock}>
      <Text style={styles.proseTitle}>{title}</Text>
      <Text style={styles.proseText}>{text}</Text>
    </View>
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
  photoCredit: {
    color: COLORS.muted,
    fontSize: 11,
    marginTop: 4,
    marginBottom: 2,
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
