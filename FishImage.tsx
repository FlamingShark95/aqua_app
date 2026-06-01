import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { FishPicture } from "./fishData";

// A picture frame for a fish. Accepts a bundled image (require(...)), a remote
// URL string, or nothing (renders a clean placeholder). A URL string is
// normalized into the { uri } shape that <Image> expects.
export function FishImage({
  source,
  style,
  iconSize = 28,
  resizeMode = "cover",
}: {
  source?: FishPicture | null;
  style?: StyleProp<ViewStyle>;
  iconSize?: number;
  // "cover" fills the frame (may crop); "contain" shows the whole image.
  resizeMode?: "cover" | "contain";
}) {
  const resolved: ImageSourcePropType | undefined =
    typeof source === "string" ? { uri: source } : source ?? undefined;

  return (
    <View style={[styles.frame, style]}>
      {resolved ? (
        <Image
          source={resolved}
          style={StyleSheet.absoluteFill}
          resizeMode={resizeMode}
        />
      ) : (
        <Text style={[styles.icon, { fontSize: iconSize }]}>🐟</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    backgroundColor: "#0a1622",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  icon: {
    opacity: 0.65,
  },
});
