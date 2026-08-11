import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const courses = [
  {
    qualification: "BSc Eng (Chemical)",
    type: "Bachelor",
    duration: "4 yrs",
    aps: "38",
    english: "5",
    maths: "6",
  },
  {
    qualification: "BSc Eng (Civil)",
    type: "Bachelor",
    duration: "4 yrs",
    aps: "38",
    english: "5",
    maths: "6",
  },
  {
    qualification: "BSc Eng (Electrical)",
    type: "Bachelor",
    duration: "4 yrs",
    aps: "38",
    english: "5",
    maths: "6",
  },
  {
    qualification: "BSc Eng (Mechanical)",
    type: "Bachelor",
    duration: "4 yrs",
    aps: "38",
    english: "5",
    maths: "6",
  },
  {
    qualification: "BSc Eng (Computer)",
    type: "Bachelor",
    duration: "4 yrs",
    aps: "38",
    english: "5",
    maths: "6",
  },
];

export default function FacultyCourses() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        University of Cape Town
      </Text>

      <Text style={styles.subtitle}>
        Faculty of Engineering & the Built Environment
      </Text>

      <ScrollView horizontal>
        <View>

          {/* Header */}
          <View style={[styles.row, styles.header]}>
            <Text style={[styles.headerCell, { width: 220 }]}>
              Qualification
            </Text>

            <Text style={[styles.headerCell, { width: 120 }]}>
              Type
            </Text>

            <Text style={[styles.headerCell, { width: 90 }]}>
              Duration
            </Text>

            <Text style={[styles.headerCell, { width: 70 }]}>
              APS
            </Text>

            <Text style={[styles.headerCell, { width: 90 }]}>
              English
            </Text>

            <Text style={[styles.headerCell, { width: 90 }]}>
              Maths
            </Text>
          </View>

          {courses.map((course, index) => (
            <View
              key={index}
              style={[
                styles.row,
                index % 2 === 0
                  ? styles.evenRow
                  : styles.oddRow,
              ]}
            >
              <Text style={[styles.cell, { width: 220 }]}>
                {course.qualification}
              </Text>

              <Text style={[styles.cell, { width: 120 }]}>
                {course.type}
              </Text>

              <Text style={[styles.cell, { width: 90 }]}>
                {course.duration}
              </Text>

              <Text style={[styles.cell, { width: 70 }]}>
                {course.aps}
              </Text>

              <Text style={[styles.cell, { width: 90 }]}>
                {course.english}
              </Text>

              <Text style={[styles.cell, { width: 90 }]}>
                {course.maths}
              </Text>
            </View>
          ))}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 20,
  },

  header: {
    backgroundColor: "#0A5EB0",
  },

  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },

  headerCell: {
    color: "white",
    fontWeight: "bold",
    padding: 12,
  },

  cell: {
    padding: 12,
    color: "#222",
  },

  evenRow: {
    backgroundColor: "#ffffff",
  },

  oddRow: {
    backgroundColor: "#f6f8fb",
  },
});