import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { FISH_BY_ID, LightLevel, Tank } from "./fishData";
import { PLANTS_BY_ID } from "./plantData";
import { useTanks } from "./TankContext";
import { useUnits } from "./UnitContext";
import {
  checkTank,
  netBioloadL,
  resolvePlants,
  resolveStock,
  tankPlantCreditL,
} from "./rules";
import { Counter } from "./Counter";
import { FishImage } from "./FishImage";
import { COLORS } from "./fishDisplay";
import { useNav } from "./NavContext";
import {
  formatLength,
  formatTemp,
  formatVolume,
  lengthToCm,
  lengthUnit,
  lengthValue,
  parseNum as num,
  tempToCelsius,
  tempValue,
  unitLabels,
  volumeToLitres,
  volumeValue,
} from "./units";

export function TankCard({ tank }: { tank: Tank }) {
  const {
    activeTankId,
    setActiveTankId,
    updateTank,
    deleteTank,
    addFishToTank,
    removeFishFromTank,
    addPlantToTank,
    removePlantFromTank,
  } = useTanks();
  const { system } = useUnits();
  const { openFish, openPlant, suggestFishForTank } = useNav();
  const labels = unitLabels(system);

  const isActive = tank.id === activeTankId;
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

  // Bioload meter: effective litres used (less plant credit) vs available —
  // same model as checkTank's overstock warning, so they always agree.
  const plantCredit = tankPlantCreditL(plantGroups, tank.volumeL);
  const pct =
    tank.volumeL > 0
      ? Math.round(
          (netBioloadL(groups, plantGroups, tank.volumeL) / tank.volumeL) * 100
        )
      : 0;
  const meterColor = pct > 100 ? COLORS.red : pct > 85 ? COLORS.yellow : COLORS.green;

  const [editing, setEditing] = useState(false);
  // Edit fields are strings in the active unit system.
  const [name, setName] = useState(tank.name);
  const [volume, setVolume] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [temp, setTemp] = useState("");
  const [ph, setPh] = useState("");

  function startEditing() {
    setName(tank.name);
    setVolume(volumeValue(tank.volumeL, system));
    setLength(lengthValue(tank.lengthCm, system));
    setWidth(lengthValue(tank.widthCm, system));
    setTemp(tempValue(tank.tempC, system));
    setPh(`${tank.ph}`);
    setEditing(true);
  }

  return (
    <Pressable
      onPress={() => !editing && setActiveTankId(tank.id)}
      style={[styles.card, isActive && styles.cardActive]}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.tankName}>{tank.name || "Untitled tank"}</Text>
        {isActive && <Text style={styles.activeBadge}>ACTIVE</Text>}
      </View>

      {editing ? (
        <View style={styles.editForm}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor={COLORS.placeholder}
            value={name}
            onChangeText={(t) => {
              setName(t);
              updateTank(tank.id, { name: t });
            }}
          />
          <View style={styles.formRow}>
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder={`Volume (${labels.volume})`}
              placeholderTextColor={COLORS.placeholder}
              keyboardType="numeric"
              value={volume}
              onChangeText={(t) => {
                setVolume(t);
                updateTank(tank.id, { volumeL: volumeToLitres(num(t), system) });
              }}
            />
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder="pH"
              placeholderTextColor={COLORS.placeholder}
              keyboardType="numeric"
              value={ph}
              onChangeText={(t) => {
                setPh(t);
                updateTank(tank.id, { ph: num(t) });
              }}
            />
          </View>
          <View style={styles.formRow}>
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder={`Length (${labels.length})`}
              placeholderTextColor={COLORS.placeholder}
              keyboardType="numeric"
              value={length}
              onChangeText={(t) => {
                setLength(t);
                updateTank(tank.id, { lengthCm: lengthToCm(num(t), system) });
              }}
            />
            <TextInput
              style={[styles.input, styles.inputHalf]}
              placeholder={`Width (${labels.length})`}
              placeholderTextColor={COLORS.placeholder}
              keyboardType="numeric"
              value={width}
              onChangeText={(t) => {
                setWidth(t);
                updateTank(tank.id, { widthCm: lengthToCm(num(t), system) });
              }}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder={`Temperature (${labels.temp})`}
            placeholderTextColor={COLORS.placeholder}
            keyboardType="numeric"
            value={temp}
            onChangeText={(t) => {
              setTemp(t);
              updateTank(tank.id, { tempC: tempToCelsius(num(t), system) });
            }}
          />
          <View style={styles.lightRow}>
            <Text style={styles.lightLabel}>Light</Text>
            {(["low", "medium", "high"] as LightLevel[]).map((level) => {
              const sel = tank.lightLevel === level;
              return (
                <Pressable
                  key={level}
                  style={[styles.lightChip, sel && styles.lightChipActive]}
                  onPress={() => updateTank(tank.id, { lightLevel: level })}
                >
                  <Text
                    style={[
                      styles.lightChipText,
                      sel && styles.lightChipTextActive,
                    ]}
                  >
                    {level}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      ) : (
        <Text style={styles.props}>
          {formatVolume(tank.volumeL, system)} ·{" "}
          {lengthValue(tank.lengthCm, system)}×
          {lengthValue(tank.widthCm, system)} {lengthUnit(system)} ·{" "}
          {formatTemp(tank.tempC, system)} · pH {tank.ph} ·{" "}
          {tank.lightLevel} light
        </Text>
      )}

      {groups.length === 0 && plantGroups.length === 0 ? (
        <Text style={styles.emptyStock}>No fish yet</Text>
      ) : (
        <>
          <Text style={styles.summary}>
            {totalFish} fish · {groups.length} species
            {plantGroups.length > 0
              ? ` · ${plantGroups.length} plant${
                  plantGroups.length > 1 ? "s" : ""
                }`
              : ""}
          </Text>
          <View style={styles.meterTrack}>
            <View
              style={[
                styles.meterFill,
                { width: `${Math.min(100, pct)}%`, backgroundColor: meterColor },
              ]}
            />
          </View>
          <Text style={styles.meterLabel}>
            {pct}% stocked
            {plantCredit > 0
              ? ` · plants −${formatVolume(plantCredit, system)}`
              : ""}
          </Text>

          {groups.map((g) => (
            <View key={g.fish.id} style={styles.stockRow}>
              <Pressable
                style={styles.stockTap}
                onPress={() => openFish(g.fish)}
              >
                <FishImage
                  source={g.fish.images?.[0]}
                  style={styles.stockThumb}
                />
                <View style={styles.stockInfo}>
                  <Text style={styles.stockName}>{g.fish.commonName}</Text>
                  <Text style={styles.stockMeta}>
                    {formatLength(g.fish.adultSizeCm, system)}
                  </Text>
                </View>
              </Pressable>
              <Counter
                count={g.count}
                onAdd={() => addFishToTank(tank.id, g.fish)}
                onRemove={() => removeFishFromTank(tank.id, g.fish)}
              />
            </View>
          ))}

          {plantGroups.map((g) => (
            <View key={g.plant.id} style={styles.stockRow}>
              <Pressable
                style={styles.stockTap}
                onPress={() => openPlant(g.plant)}
              >
                <FishImage
                  source={g.plant.images?.[0]}
                  icon="🌿"
                  style={styles.stockThumb}
                />
                <View style={styles.stockInfo}>
                  <Text style={styles.stockName}>{g.plant.commonName}</Text>
                  <Text style={styles.stockMeta}>{g.plant.placement}</Text>
                </View>
              </Pressable>
              <Counter
                count={g.count}
                onAdd={() => addPlantToTank(tank.id, g.plant)}
                onRemove={() => removePlantFromTank(tank.id, g.plant)}
              />
            </View>
          ))}
        </>
      )}

      {warnings.length > 0 && (
        <View style={styles.warningBox}>
          {warnings.map((w, i) => (
            <Text key={i} style={styles.warningText}>
              {w}
            </Text>
          ))}
        </View>
      )}

      <View style={styles.actionsRow}>
        {editing ? (
          <Pressable onPress={() => setEditing(false)} hitSlop={8}>
            <Text style={styles.doneText}>Done</Text>
          </Pressable>
        ) : (
          <Pressable onPress={startEditing} hitSlop={8}>
            <Text style={styles.editText}>Edit properties</Text>
          </Pressable>
        )}
        <Pressable onPress={() => suggestFishForTank(tank.id)} hitSlop={8}>
          <Text style={styles.suggestText}>Suggest fish</Text>
        </Pressable>
        <Pressable onPress={() => deleteTank(tank.id)} hitSlop={8}>
          <Text style={styles.deleteText}>Delete tank</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  cardActive: {
    borderColor: COLORS.accent,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tankName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  activeBadge: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: "bold",
  },
  props: {
    color: COLORS.soft,
    fontSize: 13,
    marginTop: 4,
    marginBottom: 8,
  },
  editForm: {
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    backgroundColor: COLORS.surfaceDeep,
    color: "white",
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  formRow: {
    flexDirection: "row",
    gap: 8,
  },
  inputHalf: {
    flex: 1,
  },
  lightRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  lightLabel: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "bold",
    marginRight: 2,
  },
  lightChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.chipBorder,
  },
  lightChipActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  lightChipText: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "600",
  },
  lightChipTextActive: {
    color: "white",
  },
  emptyStock: {
    color: COLORS.placeholder,
    fontSize: 14,
    fontStyle: "italic",
  },
  summary: {
    color: COLORS.soft,
    fontSize: 13,
    fontWeight: "600",
    marginTop: 4,
    marginBottom: 6,
  },
  meterTrack: {
    height: 8,
    backgroundColor: COLORS.surfaceDeep,
    borderRadius: 4,
    overflow: "hidden",
  },
  meterFill: {
    height: "100%",
    borderRadius: 4,
  },
  meterLabel: {
    color: COLORS.muted,
    fontSize: 12,
    marginTop: 4,
    marginBottom: 8,
  },
  stockRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  stockTap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // Dead gap before the +/- counter so aiming for "−" doesn't open details.
    marginRight: 18,
  },
  stockThumb: {
    width: 44,
    height: 44,
    borderRadius: 10,
    marginRight: 10,
  },
  stockInfo: {
    flex: 1,
  },
  stockName: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
  stockMeta: {
    color: COLORS.muted,
    fontSize: 13,
    marginTop: 2,
  },
  warningBox: {
    marginTop: 10,
    backgroundColor: COLORS.dangerBg,
    borderRadius: 8,
    padding: 10,
  },
  warningText: {
    color: COLORS.dangerText,
    fontSize: 14,
    paddingVertical: 2,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  editText: {
    color: COLORS.link,
    fontSize: 13,
    fontWeight: "bold",
  },
  suggestText: {
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: "bold",
  },
  doneText: {
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: "bold",
  },
  deleteText: {
    color: COLORS.danger,
    fontSize: 13,
    fontWeight: "bold",
  },
});
