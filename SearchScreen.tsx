import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AVAILABLE_FISH, Fish } from "./fishData";
import { FishImage } from "./FishImage";
import { COLORS } from "./fishDisplay";
import FishDetailScreen from "./FishDetailScreen";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [selectedFish, setSelectedFish] = useState<Fish | null>(null);

  // Tapping a row opens the detail page; back returns to the list.
  if (selectedFish) {
    return (
      <FishDetailScreen
        fish={selectedFish}
        onBack={() => setSelectedFish(null)}
      />
    );
  }

  const filteredFish = AVAILABLE_FISH.filter((fish) =>
    fish.commonName.toLowerCase().startsWith(query.trim().toLowerCase())
  );

  // Sort alphabetically, then group into sections by first letter. Because the
  // list is sorted first, fish sharing a letter land next to each other, so we
  // only ever need to look at the last section while grouping.
  const sections = [...filteredFish]
    .sort((a, b) => a.commonName.localeCompare(b.commonName))
    .reduce<{ letter: string; fish: Fish[] }[]>((acc, fish) => {
      const letter = fish.commonName.charAt(0).toUpperCase();
      const last = acc[acc.length - 1];
      if (last && last.letter === letter) last.fish.push(fish);
      else acc.push({ letter, fish: [fish] });
      return acc;
    }, []);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Fish</Text>
      <Text style={styles.banner}>
        Tap a fish for details, then add it to any of your tanks.
      </Text>

      <TextInput
        style={styles.search}
        placeholder="Search fish..."
        placeholderTextColor="#88a"
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
      />

      {filteredFish.length === 0 ? (
        <Text style={styles.noResults}>No fish found</Text>
      ) : (
        sections.map((section) => (
          <View key={section.letter}>
            <Text style={styles.sectionHeader}>{section.letter}</Text>
            {section.fish.map((fish) => (
              <Pressable
                key={fish.id}
                style={styles.row}
                onPress={() => setSelectedFish(fish)}
              >
                <FishImage
                  source={fish.images?.[0]}
                  iconSize={24}
                  style={styles.thumb}
                />
                <View style={styles.rowText}>
                  <Text style={styles.fishName}>{fish.commonName}</Text>
                  <Text style={styles.fishSci}>{fish.scientificName}</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </Pressable>
            ))}
          </View>
        ))
      )}
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
    marginBottom: 8,
  },
  banner: {
    color: "#9bc",
    fontSize: 15,
    marginBottom: 16,
  },
  bannerName: {
    color: "white",
    fontWeight: "bold",
  },
  search: {
    backgroundColor: "#13314a",
    color: "white",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 8,
  },
  noResults: {
    color: "#88a",
    fontSize: 15,
    fontStyle: "italic",
    paddingVertical: 12,
  },
  sectionHeader: {
    color: "#2a7",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 18,
    marginBottom: 2,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#13314a",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#13314a",
  },
  thumb: {
    width: 52,
    height: 52,
    marginRight: 12,
  },
  rowText: {
    flex: 1,
  },
  fishName: {
    color: "white",
    fontSize: 17,
  },
  fishSci: {
    color: COLORS.muted,
    fontSize: 13,
    fontStyle: "italic",
    marginTop: 2,
  },
  chevron: {
    color: COLORS.muted,
    fontSize: 24,
    marginLeft: 8,
  },
});
