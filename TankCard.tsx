import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Tank } from "./fishData";
import { useTanks } from "./TankContext";
import { useUnits } from "./UnitContext";
import { checkTank, groupBySpecies } from "./rules";
import { FishThumbnail } from "./FishThumbnail";
import { COLORS } from "./fishDisplay";
import {
  formatLength,
  formatTemp,
  formatVolume,
  lengthToCm,
  lengthUnit,
  lengthValue,
  tempToCelsius,
  tempValue,
  unitLabels,
  volumeToLitres,
  volumeValue,
} from "./units";

const num = (s: string) => {
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
};

export function TankCard({ tank }: { tank: Tank }) {
  const {
    activeTankId,
    setActiveTankId,
    updateTank,
    deleteTank,
    addFishToTank,
    removeFishFromTank,
  } = useTanks();
  const { system } = useUnits();
  const labels = unitLabels(system);

  const isActive = tank.id === activeTankId;
  const groups = groupBySpecies(tank.stock);
  const warnings = checkTank(tank, system);

  // Bioload: rough "1 cm of adult fish per litre" rule (matches checkTank).
  const totalAdultCm = tank.stock.reduce((s, f) => s + f.adultSizeCm, 0);
  const pct = tank.volumeL > 0 ? Math.round((totalAdultCm / tank.volumeL) * 100) : 0;
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
            placeholderTextColor="#88a"
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
              placeholderTextColor="#88a"
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
              placeholderTextColor="#88a"
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
              placeholderTextColor="#88a"
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
              placeholderTextColor="#88a"
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
            placeholderTextColor="#88a"
            keyboardType="numeric"
            value={temp}
            onChangeText={(t) => {
              setTemp(t);
              updateTank(tank.id, { tempC: tempToCelsius(num(t), system) });
            }}
          />
        </View>
      ) : (
        <Text style={styles.props}>
          {formatVolume(tank.volumeL, system)} ·{" "}
          {lengthValue(tank.lengthCm, system)}×
          {lengthValue(tank.widthCm, system)} {lengthUnit(system)} ·{" "}
          {formatTemp(tank.tempC, system)} · pH {tank.ph}
        </Text>
      )}

      {groups.length === 0 ? (
        <Text style={styles.emptyStock}>No fish yet</Text>
      ) : (
        <>
          <Text style={styles.summary}>
            {tank.stock.length} fish · {groups.length} species
          </Text>
          <View style={styles.meterTrack}>
            <View
              style={[
                styles.meterFill,
                { width: `${Math.min(100, pct)}%`, backgroundColor: meterColor },
              ]}
            />
          </View>
          <Text style={styles.meterLabel}>{pct}% stocked</Text>

          {groups.map((g) => (
            <View key={g.fish.id} style={styles.stockRow}>
              <FishThumbnail
                source={g.fish.images?.[0]}
                style={styles.stockThumb}
              />
              <View style={styles.stockInfo}>
                <Text style={styles.stockName}>{g.fish.commonName}</Text>
                <Text style={styles.stockMeta}>
                  {formatLength(g.fish.adultSizeCm, system)}
                </Text>
              </View>
              <View style={styles.counter}>
                <Pressable
                  style={styles.counterButton}
                  onPress={() => removeFishFromTank(tank.id, g.fish)}
                >
                  <Text style={styles.counterButtonText}>−</Text>
                </Pressable>
                <Text style={styles.countText}>{g.count}</Text>
                <Pressable
                  style={styles.counterButton}
                  onPress={() => addFishToTank(tank.id, g.fish)}
                >
                  <Text style={styles.counterButtonText}>+</Text>
                </Pressable>
              </View>
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
        <Pressable onPress={() => deleteTank(tank.id)} hitSlop={8}>
          <Text style={styles.deleteText}>Delete tank</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#13314a",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  cardActive: {
    borderColor: "#2a7",
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
    color: "#2a7",
    fontSize: 12,
    fontWeight: "bold",
  },
  props: {
    color: "#9bc",
    fontSize: 13,
    marginTop: 4,
    marginBottom: 8,
  },
  editForm: {
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#0f2638",
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
  emptyStock: {
    color: "#88a",
    fontSize: 14,
    fontStyle: "italic",
  },
  summary: {
    color: "#9bc",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 4,
    marginBottom: 6,
  },
  meterTrack: {
    height: 8,
    backgroundColor: "#0f2638",
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
  stockThumb: {
    width: 44,
    height: 44,
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
  counter: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterButton: {
    backgroundColor: "#2a7",
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  counterButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 20,
  },
  countText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    minWidth: 28,
    textAlign: "center",
  },
  warningBox: {
    marginTop: 10,
    backgroundColor: "#5a1a1a",
    borderRadius: 8,
    padding: 10,
  },
  warningText: {
    color: "#ffb3b3",
    fontSize: 14,
    paddingVertical: 2,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  editText: {
    color: "#7fd1ff",
    fontSize: 13,
    fontWeight: "bold",
  },
  doneText: {
    color: "#2a7",
    fontSize: 13,
    fontWeight: "bold",
  },
  deleteText: {
    color: "#ff8080",
    fontSize: 13,
    fontWeight: "bold",
  },
});
