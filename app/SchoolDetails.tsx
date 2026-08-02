import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getSchoolById, getSchoolContacts } from "./db/Database";

export default function SchoolDetails() {
  const { id } = useLocalSearchParams();
  const [school, setSchool] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<any>(null);

  useEffect(() => {
    const loadSchool = async () => {
      const data = await getSchoolById(Number(id));
      setSchool(data);

      try {
        const contactData = await getSchoolContacts(Number(id));
        setContacts(contactData);
      } catch (contactError) {
        console.log("ℹ️ Contacts not available yet:", contactError);
        setContacts(null);
      }

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
      <View style={styles.container}>
        <Text style={styles.schoolName}>{school?.name}</Text>
        <Text style={styles.info}>{school?.type}</Text>
        <Text style={styles.info}>{school?.province}</Text>
        <Text style={styles.info}>{school?.address}</Text>
        <Text style={styles.info}>{school?.contactNumber}</Text>
      </View>
    );
  }

  // Parse subjects_offered into sections
  const subjectsText = school.subjects_offered || "";
  const lines = subjectsText
    .split("\n")
    .filter((line: string) => line.trim() !== "");

  return (
    <ScrollView style={styles.container}>
      {/* School Header */}
      <Text style={styles.schoolName}>{school.name}</Text>
      <Text style={styles.info}>Type: {school.type}</Text>
      <Text style={styles.info}>Province: {school.province}</Text>
      <Text style={styles.info}>Location: {school.location || "N/A"}</Text>

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>🏫 School Information</Text>

      <Text style={styles.info}>
        Principal: {school.principal || "Not Available"}
      </Text>

      <Text style={styles.info}>
        Quintile: {school.quintile || "Not Available"}
      </Text>

      <Text style={styles.info}>EMIS: {school.emis || "Not Available"}</Text>

      <Text style={styles.info}>
        Grades: {school.grades || "Not Available"}
      </Text>

      <Text style={styles.info}>
        Learners: {school.learners || "Not Available"}
      </Text>

      <Text style={styles.info}>
        Teachers: {school.teachers || "Not Available"}
      </Text>

      <View style={styles.divider} />

      {/* Task 5: Facilities Section */}
      <Text style={styles.sectionTitle}>🏫 Facilities</Text>
      <Text style={styles.subjectContent}>
        {school.facilities || "No facilities information available"}
      </Text>

      <View style={styles.divider} />

      {/* Task 6: Subjects Offered Section */}
      <Text style={styles.sectionTitle}>📚 Subjects Offered</Text>
      {lines.length > 0 ? (
        lines.map((line: string, index: number) => {
          // Bold the label (e.g., "Languages:", "Subjects:", "Programs:")
          const [label, ...rest] = line.split(": ");
          const content = rest.join(": ");
          console.log("School Object:", school);
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

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>
        ⚽ Sports, Extracurricular, Services & Amenities
      </Text>

      <Text style={styles.subjectLabel}>Sports</Text>
      <Text style={styles.subjectContent}>
        {school.sports || "No information available"}
      </Text>

      <Text style={styles.subjectLabel}>Extracurricular</Text>
      <Text style={styles.subjectContent}>
        {school.extracurricular || "No information available"}
      </Text>

      <Text style={styles.subjectLabel}>Services & Amenities</Text>
      <Text style={styles.subjectContent}>
        {school.services_amenities || "No information available"}
      </Text>
      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>📖 About This School</Text>
      <Text style={styles.subjectContent}>
        {school.about || "No description available yet."}
      </Text>

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>📞 Contact Details</Text>

      <Text style={styles.subjectLabel}>Phone</Text>
      <Text style={styles.subjectContent}>
        {contacts?.phone || "Not available"}
      </Text>

      <Text style={styles.subjectLabel}>Email</Text>
      <Text style={styles.subjectContent}>
        {contacts?.email || "Not available"}
      </Text>

      <Text style={styles.subjectLabel}>Address</Text>
      <Text style={styles.subjectContent}>
        {contacts?.address || "Not available"}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  schoolName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 15,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subjectItem: {
    marginBottom: 12,
  },

  subjectLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },

  subjectContent: {
    fontSize: 15,
    marginLeft: 10,
  },

  noData: {
    fontStyle: "italic",
    color: "gray",
  },
});
