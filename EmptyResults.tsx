import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "./fishDisplay";

// Friendly empty state for the Fish/Plants lists when a search or filter combo
// matches nothing. Shows an icon, a message, and (when something is actually
// filtering) a one-tap "Clear filters" reset.
export function EmptyResults({
  icon,
  message,
  onClear,
}: {
  icon: string;
  message: string;
  onClear?: () => void;
}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.message}>{message}</Text>
      {onClear && (
        <Pressable style={styles.button} onPress={onClear} hitSlop={8}>
          <Text style={styles.buttonText}>Clear filters</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    paddingTop: 48,
    paddingHorizontal: 24,
  },
  icon: {
    fontSize: 40,
    opacity: 0.7,
    marginBottom: 12,
  },
  message: {
    color: COLORS.soft,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  button: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: COLORS.chipBorder,
  },
  buttonText: {
    color: COLORS.link,
    fontSize: 15,
    fontWeight: "bold",
  },
});
