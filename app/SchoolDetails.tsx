import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { getSchoolById } from "./db/Database";

export default function SchoolDetails() {
  const { id } = useLocalSearchParams();
  const [school, setSchool] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSchool = async () => {
      const data = await getSchoolById(Number(id));
      setSchool(data);
      setLoading(false);
    };
    loadSchool();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#00ACC1" />
      </View>
    );
  }

  if (!school) {
    return (
      <View style={styles.centered}>
        <Text>School not found</Text>
      </View>
    );
  }

  // Parse subjects_offered into sections
  const subjectsText = school.subjects_offered || "";
  const lines = subjectsText.split('\n').filter((line: string) => line.trim() !== '');

  return (
    <ScrollView style={styles.container}>
      {/* School Header */}
      <Text style={styles.schoolName}>{school.name}</Text>
      <Text style={styles.info}>Type: {school.type}</Text>
      <Text style={styles.info}>Province: {school.province}</Text>
      <Text style={styles.info}>Location: {school.location || 'N/A'}</Text>

      <View style={styles.divider} />

      {/* Task 6: Subjects Offered Section */}
      <Text style={styles.sectionTitle}>📚 Subjects Offered</Text>
      {lines.length > 0 ? (
        lines.map((line: string, index: number) => {
          // Bold the label (e.g., "Languages:", "Subjects:", "Programs:")
          const [label, ...rest] = line.split(': ');
          const content = rest.join(': ');
          return (
            <View key={index} style={styles.subjectItem}>
              <Text style={styles.subjectLabel}>{label}:</Text>
              <Text style={styles.subjectContent}>{content}</Text>
            </View>
          );
        })
      ) : (
        <Text style={styles.noData}>No subject information available</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  schoolName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#00ACC1',
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  subjectItem: {
    marginBottom: 8,
    paddingVertical: 4,
  },
  subjectLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00ACC1',
  },
  subjectContent: {
    fontSize: 15,
    color: '#333',
    marginTop: 2,
    lineHeight: 22,
  },
  noData: {
    fontSize: 16,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 8,
  },
});