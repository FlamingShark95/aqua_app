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

// Large hero image for the fish detail page. Shows the WHOLE image (contain),
// never cropped — the dark frame provides clean padding around it. The frame is
// sized by the caller (the gallery slide). Owns its own look — independent from
// FishThumbnail. Accepts a bundled image (require(...)), a remote URL string,
// or nothing (placeholder).
export function FishDetailImage({
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
    backgroundColor: "#0a1622",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  icon: {
    fontSize: 80,
    opacity: 0.65,
  },
});
