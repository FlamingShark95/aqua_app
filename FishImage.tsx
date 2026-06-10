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
import { COLORS } from "./fishDisplay";

// Framed fish picture, used both as the small list thumbnail and the large
// detail-page hero. Shows the WHOLE image (contain), which fills the frame
// cleanly for square photos and letterboxes non-square ones in the dark frame
// rather than cropping them. The caller's style sets the frame's size and
// corner radius. Accepts a bundled image (require(...)), a remote URL string,
// or nothing (placeholder fish icon, sized via iconSize).
export function FishImage({
  source,
  style,
  iconSize = 24,
  icon = "🐟",
}: {
  source?: FishPicture | null;
  style?: StyleProp<ViewStyle>;
  iconSize?: number;
  icon?: string; // placeholder glyph; plants pass "🌿"
}) {
  const resolved: ImageSourcePropType | undefined =
    typeof source === "string" ? { uri: source } : source ?? undefined;

  return (
    <View style={[styles.frame, style]}>
      {resolved ? (
        <Image source={resolved} style={styles.image} resizeMode="contain" />
      ) : (
        <Text style={[styles.icon, { fontSize: iconSize }]}>{icon}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    backgroundColor: COLORS.bgDeep,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  icon: {
    opacity: 0.65,
  },
});
