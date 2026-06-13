import { useMemo } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FISH_BY_ID, Tank } from "./fishData";
import { PLANTS_BY_ID } from "./plantData";
import { useUnits } from "./UnitContext";
import { COLORS } from "./fishDisplay";
import {
  checkTank,
  netBioloadL,
  resolvePlants,
  resolveStock,
} from "./rules";
import {
  formatTemp,
  formatVolume,
  lengthUnit,
  lengthValue,
} from "./units";

// A shareable summary of a tank: a polished card the user can screenshot, plus
// a "Share" button that sends a plain-text summary via the OS share sheet.
// Dependency-light: no image-capture library — the card is a normal view and
// the text share uses React Native's built-in Share API.
export function TankShareCard({
  tank,
  onClose,
}: {
  tank: Tank;
  onClose: () => void;
}) {
  const { system } = useUnits();

  const groups = useMemo(
    () => resolveStock(tank.stock, FISH_BY_ID),
    [tank.stock]
  );
  const plantGroups = useMemo(
    () => resolvePlants(tank.plants, PLANTS_BY_ID),
    [tank.plants]
  );
  const warnings = useMemo(
    () => checkTank(tank, system, FISH_BY_ID, PLANTS_BY_ID),
    [tank, system]
  );

  const totalFish = groups.reduce((s, g) => s + g.count, 0);
  const totalPlants = plantGroups.reduce((s, g) => s + g.count, 0);
  const pct =
    tank.volumeL > 0
      ? Math.round(
          (netBioloadL(groups, plantGroups, tank.volumeL) / tank.volumeL) * 100
        )
      : 0;
  const meterColor =
    pct > 100 ? COLORS.red : pct > 85 ? COLORS.yellow : COLORS.green;

  const unit = lengthUnit(system);
  const propsLine =
    `${formatVolume(tank.volumeL, system)} · ` +
    `${lengthValue(tank.lengthCm, system)}×${lengthValue(tank.widthCm, system)} ${unit} · ` +
    `${formatTemp(tank.tempC, system)} · pH ${tank.ph} · ${tank.lightLevel} light` +
    (tank.co2 ? " · CO₂" : "");

  const health =
    warnings.length === 0
      ? "✓ Looks healthy"
      : `⚠ ${warnings.length} note${warnings.length > 1 ? "s" : ""} to review`;

  const shareSummary = () => {
    const lines = [
      `🐠 ${tank.name || "My tank"}`,
      propsLine,
      "",
      `Stock — ${totalFish} fish, ${groups.length} species:`,
      ...groups.map((g) => `• ${g.count}× ${g.fish.commonName}`),
    ];
    if (plantGroups.length > 0) {
      lines.push("", `Plants — ${totalPlants}:`);
      lines.push(...plantGroups.map((g) => `• ${g.count}× ${g.plant.commonName}`));
    }
    lines.push("", `Bioload: ${pct}% stocked`, health, "", "Planned with Aqua 🐟");
    Share.share({ message: lines.join("\n") }).catch(() => {
      // User dismissed the share sheet, or it's unavailable — no-op.
    });
  };

  return (
    <Modal
      visible
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        {/* Inner press shouldn't dismiss. */}
        <Pressable style={styles.card} onPress={() => {}}>
          <View style={styles.cardHeader}>
            <Text style={styles.tankName} numberOfLines={1}>
              {tank.name || "My tank"}
            </Text>
            <Text style={styles.brand}>Aqua 🐟</Text>
          </View>
          <Text style={styles.props}>{propsLine}</Text>

          <View style={styles.meterTrack}>
            <View
              style={[
                styles.meterFill,
                { width: `${Math.min(100, pct)}%`, backgroundColor: meterColor },
              ]}
            />
          </View>
          <Text style={styles.meterLabel}>
            {pct}% stocked · {totalFish} fish · {groups.length} species
            {plantGroups.length > 0 ? ` · ${totalPlants} plants` : ""}
          </Text>

          <ScrollView style={styles.list} contentContainerStyle={styles.listInner}>
            {groups.length === 0 && plantGroups.length === 0 ? (
              <Text style={styles.empty}>No fish or plants yet.</Text>
            ) : (
              <>
                {groups.map((g) => (
                  <Text key={g.fish.id} style={styles.lineItem}>
                    <Text style={styles.count}>{g.count}× </Text>
                    {g.fish.commonName}
                  </Text>
                ))}
                {plantGroups.map((g) => (
                  <Text key={g.plant.id} style={styles.lineItem}>
                    <Text style={styles.count}>{g.count}× </Text>🌿 {g.plant.commonName}
                  </Text>
                ))}
              </>
            )}
          </ScrollView>

          <Text
            style={[
              styles.health,
              { color: warnings.length === 0 ? COLORS.green : COLORS.yellow },
            ]}
          >
            {health}
          </Text>

          <View style={styles.actions}>
            <Pressable style={[styles.button, styles.shareButton]} onPress={shareSummary}>
              <Text style={styles.shareText}>Share</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.closeButton]} onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.chipBorder,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tankName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    marginRight: 8,
  },
  brand: {
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: "bold",
  },
  props: {
    color: COLORS.soft,
    fontSize: 13,
    marginTop: 4,
    marginBottom: 12,
  },
  meterTrack: {
    height: 10,
    backgroundColor: COLORS.surfaceDeep,
    borderRadius: 5,
    overflow: "hidden",
  },
  meterFill: {
    height: "100%",
    borderRadius: 5,
  },
  meterLabel: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 6,
    marginBottom: 10,
  },
  list: {
    maxHeight: 220,
  },
  listInner: {
    paddingVertical: 2,
  },
  lineItem: {
    color: "white",
    fontSize: 15,
    paddingVertical: 3,
  },
  count: {
    color: COLORS.accent,
    fontWeight: "bold",
  },
  empty: {
    color: COLORS.placeholder,
    fontSize: 14,
    fontStyle: "italic",
  },
  health: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  shareButton: {
    backgroundColor: COLORS.accent,
  },
  shareText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: COLORS.surfaceDeep,
  },
  closeText: {
    color: COLORS.soft,
    fontSize: 15,
    fontWeight: "bold",
  },
});
