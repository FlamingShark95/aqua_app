import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { COLORS } from "./fishDisplay";

// The −/count/+ stepper used wherever fish are stocked: tank card rows, search
// rows, and the detail screen's per-tank list. `size` is the button square;
// the glyph scales with it.
export function Counter({
  count,
  onAdd,
  onRemove,
  size = 30,
  style,
}: {
  count: number;
  onAdd: () => void;
  onRemove: () => void;
  size?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const button = { width: size, height: size };
  const fontSize = Math.round(size * 0.63);
  const glyph = [styles.buttonText, { fontSize, lineHeight: fontSize + 2 }];
  return (
    <View style={[styles.row, style]}>
      <Pressable style={[styles.button, button]} onPress={onRemove}>
        <Text style={glyph}>−</Text>
      </Pressable>
      <Text style={styles.count}>{count}</Text>
      <Pressable style={[styles.button, button]} onPress={onAdd}>
        <Text style={glyph}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  count: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    minWidth: 28,
    textAlign: "center",
  },
});
