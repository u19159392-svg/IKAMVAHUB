import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { StyleSheet, Text, View } from "react-native";
=======
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
>>>>>>> 4c3152f6c3340566a1f4f3151b0865dad0b2924f
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

<<<<<<< HEAD
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
    });
    export const schools = [
  {
    id: "1",
    name: "Baleni Secondary School",
    type: "Public",
    district: "Alfred Nzo East",
    town: "Bizana",
    facilities: [
      "Classrooms",
      "Government-owned buildings",
      "Limited rural infrastructure",
      "Soccer Field",
      "Netball Court",
      "Government Textbooks",
      "Stationery"
    ]
  },

  {
    id: "2",
    name: "Bonxa High School",
    type: "Public",
    district: "Alfred Nzo West",
    town: "Tabankulu",
    facilities: [
      "Classrooms",
      "Government-owned buildings",
      "Government-owned land",
      "Soccer Field",
      "Netball Court"
    ]
  },

  {
    id: "3",
    name: "Toleni Secondary School",
    type: "Public",
    district: "Alfred Nzo West",
    town: "Mount Frere",
    facilities: [
      "Standard Government Classrooms",
      "School Grounds",
      "Soccer Field",
      "Netball Court"
    ]
  },

  {
    id: "4",
    name: "Tyelimhlophe Secondary School",
    type: "Public",
    district: "Alfred Nzo West",
    town: "Mount Frere",
    facilities: [
      "Classrooms",
      "Agricultural Demonstration Area",
      "Agricultural Practical Area",
      "School Garden",
      "Soccer Field",
      "Netball Court",
      "Government Textbooks",
      "Stationery"
    ]
  },

  {
    id: "5",
    name: "Dangwana Senior Secondary School",
    type: "Public",
    district: "Alfred Nzo West",
    town: "Mount Frere",
    facilities: [
      "Classrooms",
      "Government-owned Buildings",
      "School Grounds",
      "Soccer Field",
      "Netball Court"
    ]
  },
  {
    id: "6",
    name: "Zibokwana High School",
    type: "Public",
    district: "Alfred Nzo West",
    town: "Mount Frere",
  facilities: [
    "Classrooms",
    "Government-owned Buildings",
    "School Grounds",
    "Soccer Field",
    "Netball Court",
    "Government Textbooks",
    "Stationery"
  ]
},

{
  id: "7",
  name: "Dumsi Senior Secondary School",
  type: "Public",
  district: "Alfred Nzo West",
  town: "Mount Frere",
  facilities: [
    "Standard Government School Facilities",
    "Classrooms",
    "School Grounds",
    "Soccer Field",
    "Netball Court"
  ]
},

{
  id: "8",
  name: "Zwelitsha High Secondary School",
  type: "Public",
  district: "Alfred Nzo West",
  town: "Mount Frere",
  facilities: [
    "Standard Government Classrooms",
    "School Grounds",
    "Soccer Field",
    "Netball Court",
    "Government Textbooks",
    "Stationery"
  ]
},

{
  id: "9",
  name: "Mbodleni Senior Secondary School",
  type: "Public",
  district: "Alfred Nzo West",
  town: "Mount Frere",
  facilities: [
    "Classrooms",
    "Government-owned Buildings",
    "Government-owned Land",
    "School Grounds",
    "Soccer Field",
    "Netball Court",
    "Government Textbooks",
    "Stationery"
  ]
},

{
  id: "10",
  name: "Mfazwe Technical High School",
  type: "Public Technical School",
  district: "Alfred Nzo West",
  town: "Tabankulu",
  facilities: [
    "Classrooms",
    "Computer Laboratory",
    "Engineering Practical Laboratory",
    "Technical Workshops",
    "Civil Technology Workshop",
    "Electrical Technology Workshop",
    "Mechanical Technology Workshop",
    "Engineering Equipment",
    "School Grounds",
    "Soccer Field",
    "Netball Court",
    "Government Textbooks",
    "Stationery"
  ]
},
{
  id: "11",
  name: "Mvenyane High School",
  type: "Public",
  district: "Alfred Nzo West",
  town: "Mount Frere",
  facilities: [
    "Standard Government School Facilities",
    "Classrooms",
    "School Grounds",
    "Soccer Field",
    "Netball Court",
    "Government Textbooks",
    "Stationery"
  ]
},

{
  id: "12",
  name: "Mpondombini Secondary School",
  type: "Public",
  district: "Alfred Nzo West",
  town: "Mount Frere",
  facilities: [
    "Standard Government Classrooms",
    "School Grounds",
    "Soccer Field",
    "Netball Court"
  ]
},

{
  id: "13",
  name: "Ndzululwazi Senior Secondary School",
  type: "Public",
  district: "Alfred Nzo West",
  town: "Mount Frere",
  facilities: [
    "Classrooms",
    "Government-owned Buildings",
    "School Grounds",
    "Soccer Field",
    "Netball Court",
    "Government Textbooks",
    "Stationery"
  ]
},

{
  id: "14",
  name: "Nomaqwathekana High School",
  type: "Public",
  district: "Alfred Nzo West",
  town: "Mount Frere",
  facilities: [
    "Standard Government School Facilities",
    "Classrooms",
    "School Grounds",
    "Soccer Field",
    "Netball Court"
  ]
},

{
  id: "15",
  name: "Ntabankulu Comprehensive Technical High School",
  type: "Public Technical School",
  district: "Alfred Nzo West",
  town: "Ntabankulu",
  facilities: [
    "Classrooms",
    "Technical Workshops",
    "Engineering Practical Laboratories",
    "Mechanical Workshop",
    "Electrical Workshop",
    "Civil Technology Workshop",
    "Computer Laboratory",
    "School Grounds",
    "Soccer Field",
    "Netball Court",
    "Government Textbooks",
    "Stationery"
  ]
}
    ];
=======
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
>>>>>>> 4c3152f6c3340566a1f4f3151b0865dad0b2924f
