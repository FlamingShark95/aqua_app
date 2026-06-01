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

// Small square thumbnail for the fish list. Shows the WHOLE image (contain),
// which fills the square cleanly for square photos and letterboxes non-square
// ones in the dark frame rather than cropping them. Owns its own size/look —
// independent from FishDetailImage, which also uses "contain". Accepts a
// bundled image (require(...)), a remote URL string, or nothing (placeholder).
export function FishThumbnail({
  source,
  style,
}: {
  source?: FishPicture | null;
  style?: StyleProp<ViewStyle>;
}) {
  const resolved: ImageSourcePropType | undefined =
    typeof source === "string" ? { uri: source } : source ?? undefined;

  return (
    <View style={[styles.frame, style]}>
      {resolved ? (
        <Image source={resolved} style={styles.image} resizeMode="contain" />
      ) : (
        <Text style={styles.icon}>🐟</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: 52,
    height: 52,
    backgroundColor: "#0a1622",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  icon: {
    fontSize: 24,
    opacity: 0.65,
  },
});
