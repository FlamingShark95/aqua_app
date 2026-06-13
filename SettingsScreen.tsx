import { useEffect, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { useUnits } from "./UnitContext";
import { COLORS } from "./fishDisplay";
import {
  applyFeedReminder,
  DEFAULT_REMINDER,
  FeedReminder,
  loadFeedReminder,
  MAX_FEED_TIMES,
  notificationsSupported,
  parseTime,
  saveFeedReminder,
} from "./feedReminder";

const PRESET_TIMES = ["07:00", "12:00", "18:00"];

// expo weekday numbers (1 = Sunday … 7 = Saturday) with short labels, in week
// order for display.
const DAYS: { n: number; label: string }[] = [
  { n: 1, label: "Su" },
  { n: 2, label: "Mo" },
  { n: 3, label: "Tu" },
  { n: 4, label: "We" },
  { n: 5, label: "Th" },
  { n: 6, label: "Fr" },
  { n: 7, label: "Sa" },
];

export default function SettingsScreen() {
  const { system, setSystem } = useUnits();

  const [reminder, setReminder] = useState<FeedReminder>(DEFAULT_REMINDER);
  const [customTime, setCustomTime] = useState("");
  const [permissionDenied, setPermissionDenied] = useState(false);
  // Gate persisting/scheduling until the saved settings have loaded, the same
  // pattern TankContext uses.
  const [loaded, setLoaded] = useState(false);
  const firstApply = useRef(true);

  useEffect(() => {
    loadFeedReminder()
      .then(setReminder)
      .finally(() => setLoaded(true));
  }, []);

  // Persist + (re)schedule whenever the settings change after load. Also runs
  // once right after load so the schedule always matches the saved settings.
  useEffect(() => {
    if (!loaded) return;
    if (!firstApply.current) {
      saveFeedReminder(reminder);
    }
    firstApply.current = false;
    applyFeedReminder(reminder).then((ok) =>
      setPermissionDenied(reminder.enabled && !ok && notificationsSupported)
    );
  }, [reminder, loaded]);

  const addTime = (value: string) => {
    const parsed = parseTime(value);
    if (!parsed) return;
    const normalized = `${String(parsed.hour).padStart(2, "0")}:${String(
      parsed.minute
    ).padStart(2, "0")}`;
    setReminder((r) =>
      r.times.includes(normalized) || r.times.length >= MAX_FEED_TIMES
        ? r
        : { ...r, times: [...r.times, normalized].sort() }
    );
    setCustomTime("");
  };

  const removeTime = (value: string) => {
    setReminder((r) => ({ ...r, times: r.times.filter((t) => t !== value) }));
  };

  // Toggle a weekday on/off, but never leave zero days selected (an enabled
  // reminder with no days would silently never fire).
  const toggleDay = (n: number) => {
    setReminder((r) => {
      const has = r.days.includes(n);
      if (has && r.days.length === 1) return r;
      const days = has
        ? r.days.filter((d) => d !== n)
        : [...r.days, n].sort((a, b) => a - b);
      return { ...r, days };
    });
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Settings</Text>

      <Text style={styles.sectionTitle}>Units</Text>
      <View style={styles.unitToggle}>
        {(["metric", "imperial"] as const).map((option) => (
          <Pressable
            key={option}
            style={[
              styles.unitOption,
              system === option && styles.unitOptionActive,
            ]}
            onPress={() => setSystem(option)}
          >
            <Text
              style={[
                styles.unitOptionText,
                system === option && styles.unitOptionTextActive,
              ]}
            >
              {option === "metric" ? "Metric" : "Imperial"}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Feeding reminder</Text>
      <View style={styles.card}>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Feeding reminder</Text>
          <Switch
            value={reminder.enabled}
            onValueChange={(enabled) =>
              setReminder((r) => ({ ...r, enabled }))
            }
            trackColor={{ false: COLORS.surfaceDeep, true: COLORS.accent }}
            thumbColor="white"
          />
        </View>

        {reminder.enabled && (
          <>
            <Text style={styles.fieldLabel}>
              Repeat on{" "}
              {reminder.days.length === 7 ? "(every day)" : `(${reminder.days.length} days)`}
            </Text>
            <View style={styles.chipRow}>
              {DAYS.map((day) => {
                const on = reminder.days.includes(day.n);
                return (
                  <Pressable
                    key={day.n}
                    style={[styles.dayChip, on && styles.dayChipActive]}
                    onPress={() => toggleDay(day.n)}
                    accessibilityLabel={day.label}
                  >
                    <Text
                      style={[styles.dayChipText, on && styles.dayChipTextActive]}
                    >
                      {day.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.fieldLabel}>
              Feeding times ({reminder.times.length}/{MAX_FEED_TIMES})
            </Text>
            <View style={styles.chipRow}>
              {reminder.times.map((time) => (
                <Pressable
                  key={time}
                  style={styles.timeChipActive}
                  onPress={() => removeTime(time)}
                >
                  <Text style={styles.timeChipActiveText}>{time} ✕</Text>
                </Pressable>
              ))}
            </View>

            {reminder.times.length < MAX_FEED_TIMES && (
              <>
                <Text style={styles.fieldLabel}>Add a time</Text>
                <View style={styles.chipRow}>
                  {PRESET_TIMES.filter(
                    (t) => !reminder.times.includes(t)
                  ).map((time) => (
                    <Pressable
                      key={time}
                      style={styles.timeChip}
                      onPress={() => addTime(time)}
                    >
                      <Text style={styles.timeChipText}>{time}</Text>
                    </Pressable>
                  ))}
                </View>
                <View style={styles.customRow}>
                  <TextInput
                    style={styles.timeInput}
                    placeholder="HH:MM"
                    placeholderTextColor={COLORS.placeholder}
                    value={customTime}
                    onChangeText={setCustomTime}
                    autoCorrect={false}
                    autoCapitalize="none"
                  />
                  <Pressable
                    style={[
                      styles.addButton,
                      !parseTime(customTime) && styles.addButtonDisabled,
                    ]}
                    disabled={!parseTime(customTime)}
                    onPress={() => addTime(customTime)}
                  >
                    <Text style={styles.addButtonText}>Add</Text>
                  </Pressable>
                </View>
              </>
            )}
          </>
        )}

        {!notificationsSupported && (
          <Text style={styles.hint}>
            Notifications need the iOS/Android app — settings made here still
            carry over.
          </Text>
        )}
        {permissionDenied && (
          <Text style={styles.warning}>
            Notification permission was denied — allow notifications for this
            app in your system settings to get reminders.
          </Text>
        )}
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
  sectionTitle: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
    marginTop: 8,
  },
  unitToggle: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
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
    backgroundColor: COLORS.accent,
  },
  unitOptionText: {
    color: COLORS.soft,
    fontSize: 14,
    fontWeight: "bold",
  },
  unitOptionTextActive: {
    color: "white",
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switchLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  fieldLabel: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 14,
    marginBottom: 8,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  dayChip: {
    width: 40,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.chipBorder,
    alignItems: "center",
  },
  dayChipActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  dayChipText: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: "600",
  },
  dayChipTextActive: {
    color: "white",
  },
  timeChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.chipBorder,
  },
  timeChipText: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: "600",
  },
  timeChipActive: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: COLORS.accent,
  },
  timeChipActiveText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  customRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  timeInput: {
    flex: 1,
    backgroundColor: COLORS.surfaceDeep,
    color: "white",
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 8,
    paddingHorizontal: 18,
    justifyContent: "center",
  },
  addButtonDisabled: {
    opacity: 0.4,
  },
  addButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  hint: {
    color: COLORS.soft,
    fontSize: 13,
    marginTop: 12,
  },
  warning: {
    color: COLORS.dangerText,
    fontSize: 13,
    marginTop: 12,
  },
});
