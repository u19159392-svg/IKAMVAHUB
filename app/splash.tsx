import { Image, StyleSheet, View } from "react-native";

/**
 * Pure visual splash screen — no internal navigation.
 * Routing after the splash is handled by app/index.tsx.
 */
export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F8B8D",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 280,
    height: 280,
  },
});
