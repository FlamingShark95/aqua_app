import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { LightLevel } from "./fishData";
import { useTanks } from "./TankContext";
import { useUnits } from "./UnitContext";
import { TankCard } from "./TankCard";
import { COLORS } from "./fishDisplay";
import {
  lengthToCm,
  parseNum as num,
  tempToCelsius,
  unitLabels,
  volumeToLitres,
} from "./units";

export default function TanksScreen() {
  const { tanks, createTank } = useTanks();
  const { system } = useUnits();
  const labels = unitLabels(system);

  // Local form state for the "New tank" form. Kept as strings because that's
  // what TextInput gives us; parsed to numbers on submit.
  const [name, setName] = useState("");
  const [volumeL, setVolumeL] = useState("");
  const [lengthCm, setLengthCm] = useState("");
  const [widthCm, setWidthCm] = useState("");
  const [tempC, setTempC] = useState("");
  const [ph, setPh] = useState("");
  const [lightLevel, setLightLevel] = useState<LightLevel>("medium");

  function handleCreate() {
    if (name.trim() === "") return;
    // The form takes input in the active unit system; convert to canonical
    // metric before storing.
    createTank({
      name: name.trim(),
      volumeL: volumeToLitres(num(volumeL), system),
      lengthCm: lengthToCm(num(lengthCm), system),
      widthCm: lengthToCm(num(widthCm), system),
      tempC: tempToCelsius(num(tempC), system),
      ph: num(ph),
      lightLevel,
    });
    setName("");
    setVolumeL("");
    setLengthCm("");
    setWidthCm("");
    setTempC("");
    setPh("");
    setLightLevel("medium");
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>My tanks</Text>

      {tanks.length === 0 && (
        <Text style={styles.empty}>No tanks yet — create one below.</Text>
      )}

      {tanks.map((tank) => (
        <TankCard key={tank.id} tank={tank} />
      ))}

      <Text style={styles.subtitle}>New tank</Text>
      <TextInput
        style={styles.input}
        placeholder="Name (e.g. Living room 75 L)"
        placeholderTextColor={COLORS.placeholder}
        value={name}
        onChangeText={setName}
      />
      <View style={styles.formRow}>
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder={`Volume (${labels.volume})`}
          placeholderTextColor={COLORS.placeholder}
          keyboardType="numeric"
          value={volumeL}
          onChangeText={setVolumeL}
        />
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder="pH"
          placeholderTextColor={COLORS.placeholder}
          keyboardType="numeric"
          value={ph}
          onChangeText={setPh}
        />
      </View>
      <View style={styles.formRow}>
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder={`Length (${labels.length})`}
          placeholderTextColor={COLORS.placeholder}
          keyboardType="numeric"
          value={lengthCm}
          onChangeText={setLengthCm}
        />
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder={`Width (${labels.length})`}
          placeholderTextColor={COLORS.placeholder}
          keyboardType="numeric"
          value={widthCm}
          onChangeText={setWidthCm}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder={`Temperature (${labels.temp})`}
        placeholderTextColor={COLORS.placeholder}
        keyboardType="numeric"
        value={tempC}
        onChangeText={setTempC}
      />
      <View style={styles.lightRow}>
        <Text style={styles.lightLabel}>Light</Text>
        {(["low", "medium", "high"] as LightLevel[]).map((level) => {
          const sel = lightLevel === level;
          return (
            <Pressable
              key={level}
              style={[styles.lightChip, sel && styles.lightChipActive]}
              onPress={() => setLightLevel(level)}
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
      <Pressable style={styles.createButton} onPress={handleCreate}>
        <Text style={styles.createButtonText}>Create tank</Text>
      </Pressable>
    </ScrollView>
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
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginTop: 24,
    marginBottom: 8,
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
  empty: {
    color: COLORS.placeholder,
    fontSize: 15,
    fontStyle: "italic",
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.surface,
    color: "white",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 8,
  },
  formRow: {
    flexDirection: "row",
    gap: 8,
  },
  inputHalf: {
    flex: 1,
  },
  createButton: {
    marginTop: 8,
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  createButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
