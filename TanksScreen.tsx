import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useTanks } from "./TankContext";
import { useUnits } from "./UnitContext";
import { TankCard } from "./TankCard";
import {
  lengthToCm,
  tempToCelsius,
  unitLabels,
  volumeToLitres,
} from "./units";

export default function TanksScreen() {
  const { tanks, createTank } = useTanks();
  const { system, setSystem } = useUnits();
  const labels = unitLabels(system);

  // Local form state for the "New tank" form. Kept as strings because that's
  // what TextInput gives us; parsed to numbers on submit.
  const [name, setName] = useState("");
  const [volumeL, setVolumeL] = useState("");
  const [lengthCm, setLengthCm] = useState("");
  const [widthCm, setWidthCm] = useState("");
  const [tempC, setTempC] = useState("");
  const [ph, setPh] = useState("");

  const num = (s: string) => {
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : 0;
  };

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
    });
    setName("");
    setVolumeL("");
    setLengthCm("");
    setWidthCm("");
    setTempC("");
    setPh("");
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>My tanks</Text>

      <View style={styles.unitToggle}>
        <Pressable
          style={[
            styles.unitOption,
            system === "metric" && styles.unitOptionActive,
          ]}
          onPress={() => setSystem("metric")}
        >
          <Text
            style={[
              styles.unitOptionText,
              system === "metric" && styles.unitOptionTextActive,
            ]}
          >
            Metric
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.unitOption,
            system === "imperial" && styles.unitOptionActive,
          ]}
          onPress={() => setSystem("imperial")}
        >
          <Text
            style={[
              styles.unitOptionText,
              system === "imperial" && styles.unitOptionTextActive,
            ]}
          >
            Imperial
          </Text>
        </Pressable>
      </View>

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
        placeholderTextColor="#88a"
        value={name}
        onChangeText={setName}
      />
      <View style={styles.formRow}>
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder={`Volume (${labels.volume})`}
          placeholderTextColor="#88a"
          keyboardType="numeric"
          value={volumeL}
          onChangeText={setVolumeL}
        />
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder="pH"
          placeholderTextColor="#88a"
          keyboardType="numeric"
          value={ph}
          onChangeText={setPh}
        />
      </View>
      <View style={styles.formRow}>
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder={`Length (${labels.length})`}
          placeholderTextColor="#88a"
          keyboardType="numeric"
          value={lengthCm}
          onChangeText={setLengthCm}
        />
        <TextInput
          style={[styles.input, styles.inputHalf]}
          placeholder={`Width (${labels.length})`}
          placeholderTextColor="#88a"
          keyboardType="numeric"
          value={widthCm}
          onChangeText={setWidthCm}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder={`Temperature (${labels.temp})`}
        placeholderTextColor="#88a"
        keyboardType="numeric"
        value={tempC}
        onChangeText={setTempC}
      />
      <Pressable style={styles.createButton} onPress={handleCreate}>
        <Text style={styles.createButtonText}>Create tank</Text>
      </Pressable>
    </ScrollView>
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
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginTop: 24,
    marginBottom: 8,
  },
  unitToggle: {
    flexDirection: "row",
    backgroundColor: "#13314a",
    borderRadius: 10,
    padding: 4,
    marginBottom: 16,
  },
  unitOption: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  unitOptionActive: {
    backgroundColor: "#2a7",
  },
  unitOptionText: {
    color: "#9bc",
    fontSize: 14,
    fontWeight: "bold",
  },
  unitOptionTextActive: {
    color: "white",
  },
  empty: {
    color: "#88a",
    fontSize: 15,
    fontStyle: "italic",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#13314a",
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
    backgroundColor: "#2a7",
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
