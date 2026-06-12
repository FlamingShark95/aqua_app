import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FilterCategory } from "./fishFilters";
import { COLORS } from "./fishDisplay";
import { UnitSystem } from "./units";

// Accent used for chips whose option has no badge color (size, pH, temp, etc.).
const ACCENT = COLORS.accent;

// Selected option ids per category id. Shared by the fish (SelectedFilters) and
// plant (SelectedPlantFilters) maps — both are Partial<Record<string, string[]>>.
type Selected = Record<string, string[] | undefined>;

// Full-screen popup of stackable filter chips, generic over the item type so the
// Fish and Plant lists share one component. Selections apply live (the caller
// re-filters the list), so the footer button just closes the sheet. The caller
// passes its own categories, current selections, a toggle fn, and the count of
// active chips + the result noun ("fish" / "plants").
export function FilterSheet<T>({
  visible,
  categories,
  filters,
  activeCount,
  onToggle,
  onClear,
  onClose,
  resultCount,
  resultNoun,
  system,
}: {
  visible: boolean;
  categories: FilterCategory<T>[];
  filters: Selected;
  activeCount: number;
  onToggle: (categoryId: string, optionId: string) => void;
  onClear: () => void;
  onClose: () => void;
  resultCount: number;
  resultNoun: string;
  system: UnitSystem;
}) {

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.title}>Filters</Text>
          <Pressable onPress={onClose} hitSlop={10}>
            <Text style={styles.close}>✕</Text>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          {categories.map((cat) => {
            const selected = filters[cat.id] ?? [];
            return (
              <View key={cat.id} style={styles.group}>
                <Text style={styles.groupTitle}>{cat.title}</Text>
                <View style={styles.chips}>
                  {cat.options.map((opt) => {
                    const isOn = selected.includes(opt.id);
                    const c = opt.color ?? ACCENT;
                    return (
                      <Pressable
                        key={opt.id}
                        onPress={() => onToggle(cat.id, opt.id)}
                        style={[
                          styles.chip,
                          isOn && { backgroundColor: c + "33", borderColor: c },
                        ]}
                      >
                        <Text
                          style={[
                            styles.chipText,
                            { color: isOn ? c : COLORS.muted },
                          ]}
                        >
                          {opt.label(system)}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.footer}>
          <Pressable onPress={onClear} hitSlop={8} disabled={activeCount === 0}>
            <Text
              style={[styles.clear, activeCount === 0 && styles.clearDisabled]}
            >
              Clear all
            </Text>
          </Pressable>
          <Pressable style={styles.showButton} onPress={onClose}>
            <Text style={styles.showButtonText}>
              Show {resultCount} {resultNoun}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: 56,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  close: {
    color: "white",
    fontSize: 22,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  group: {
    marginBottom: 18,
  },
  groupTitle: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.chipBorder,
  },
  chipText: {
    fontSize: 14,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    borderTopWidth: 1,
    borderTopColor: COLORS.surface,
  },
  clear: {
    color: COLORS.link,
    fontSize: 15,
    fontWeight: "bold",
  },
  clearDisabled: {
    color: COLORS.muted,
    opacity: 0.6,
  },
  showButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
  },
  showButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
