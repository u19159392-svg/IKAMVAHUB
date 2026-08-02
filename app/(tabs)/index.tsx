import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";

console.log("✅ TABS INDEX OPENED");

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ThemedText type="title">Welcome to Ikamva Hub 🎓</ThemedText>

      <ThemedText>
        Explore schools, careers, bursaries and opportunities.
      </ThemedText>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/debug")}
      >
        <ThemedText style={styles.buttonText}>Debug Database</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/settings")}
      >
        <ThemedText style={styles.buttonText}>Settings</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/notifications")}
      >
        <ThemedText style={styles.buttonText}>Notifications</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/schools" as any)}
      >
        <ThemedText style={styles.buttonText}>🔍 School Finder</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/industries" as any)}
      >
        <ThemedText style={styles.buttonText}>🏭 Industries</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/careers" as any)}
      >
        <ThemedText style={styles.buttonText}>💼 Career Guidance</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    gap: 15,
  },

  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
});
