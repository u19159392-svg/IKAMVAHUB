import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { initDatabase, seedSchools } from "../db/Database";
import { initReferenceDatabase, seedReferenceDatabase } from "../db/ReferenceDatabase";
export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    const setupDatabases = async () => {
      try {
        await initDatabase();
        await seedSchools();

        await initReferenceDatabase();
        await seedReferenceDatabase();

        console.log("✅ Databases initialized and seeded on app start");
      } catch (error) {
        console.error("❌ Database setup error:", error);
      }
    };

    setupDatabases();
  }, []);

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

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/aps-calculator" as any)}
      >
        <ThemedText style={styles.buttonText}>📊 APS Calculator</ThemedText>
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