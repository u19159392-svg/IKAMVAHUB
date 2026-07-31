import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { getCareers } from "./db/Database";

export default function Careers() {
  const router = useRouter();
  const [careers, setCareers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCareers();
  }, []);

  const loadCareers = async () => {
    const data = await getCareers();
    setCareers(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#00ACC1" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Career Guidance</Text>
      <FlatList
        data={careers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/career-details?id=${item.id}` as any)}
          >
            <Text style={styles.careerName}>{item.name}</Text>
            <Text style={styles.careerField}>Field: {item.field}</Text>
            <Text style={styles.careerAps}>APS: {item.aps_minimum}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  careerName: { fontSize: 18, fontWeight: "bold", color: "#00ACC1" },
  careerField: { fontSize: 14, color: "#555", marginTop: 4 },
  careerAps: { fontSize: 14, color: "#555", marginTop: 4 },
});
