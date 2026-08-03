import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getCareerById } from "./db/Database";

export default function CareerDetails() {
  const { id } = useLocalSearchParams();
  const [career, setCareer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCareer = async () => {
      const data = await getCareerById(Number(id));
      setCareer(data);
      setLoading(false);
    };
    loadCareer();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#00ACC1" />
      </View>
    );
  }

  if (!career) {
    return (
      <View style={styles.centered}>
        <Text>Career not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{career.name}</Text>
      <Text style={styles.field}>Field: {career.field}</Text>

      <Text style={styles.sectionTitle}>📖 Description</Text>
      <Text style={styles.text}>{career.description}</Text>

      <Text style={styles.sectionTitle}>📚 Subjects Needed</Text>
      <Text style={styles.text}>{career.subjects_needed}</Text>

      <Text style={styles.sectionTitle}>🎓 Study Path</Text>
      <Text style={styles.text}>{career.study_path}</Text>

      <Text style={styles.sectionTitle}>🏛️ Where to Study</Text>
      <Text style={styles.text}>{career.institutions}</Text>

      <Text style={styles.sectionTitle}>📊 APS Range</Text>
      <Text style={styles.text}>
        {career.aps_range || "Varies by institution"}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00ACC1",
    marginBottom: 8,
  },
  field: { fontSize: 16, color: "#555", marginBottom: 16 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  text: { fontSize: 15, color: "#333", lineHeight: 22 },
});
