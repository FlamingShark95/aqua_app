import { useEffect, useState } from "react";
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
//
// `fallback` makes loading hybrid: a bundled image rendered underneath the
// main source, so a remote main appears instantly as the offline thumb and
// upgrades in place when the network delivers — and if the remote fails
// (offline), the fallback simply stays.
export function FishImage({
  source,
  fallback,
  style,
  iconSize = 24,
  icon = "🐟",
  fit = "cover",
}: {
  source?: FishPicture | null;
  fallback?: FishPicture | null;
  style?: StyleProp<ViewStyle>;
  iconSize?: number;
  icon?: string; // placeholder glyph; plants pass "🌿"
  // "cover" (default) crops to fill the frame — right for square thumbnails so
  // landscape photos don't letterbox. "contain" shows the whole image — used by
  // the detail gallery, whose box is shaped to the photo (3:2) so there's
  // little dead space anyway.
  fit?: "cover" | "contain";
}) {
  const [mainFailed, setMainFailed] = useState(false);
  // List rows recycle this component with new props; forget old failures.
  useEffect(() => setMainFailed(false), [source]);

  const resolve = (
    pic?: FishPicture | null
  ): ImageSourcePropType | undefined =>
    typeof pic === "string" ? { uri: pic } : pic ?? undefined;

  const main = resolve(source);
  const under = resolve(fallback);
  const showMain = main !== undefined && !mainFailed;

  return (
    <View style={[styles.frame, style]}>
      {!showMain && !under && (
        <Text style={[styles.icon, { fontSize: iconSize }]}>{icon}</Text>
      )}
      {under && (
        <Image source={under} style={styles.image} resizeMode={fit} />
      )}
      {showMain && (
        <Image
          source={main}
          // Overlay the fallback exactly when one is shown; otherwise this is
          // the only child and fills the frame normally.
          style={under ? [styles.image, StyleSheet.absoluteFill] : styles.image}
          resizeMode={fit}
          onError={() => setMainFailed(true)}
        />
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
