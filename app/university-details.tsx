import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getCoursesByUniversity } from "./db/ReferenceDatabase";
const groupByFaculty = (courses: any[]) => {
  return courses.reduce((groups: any, course: any) => {
    const faculty = course.faculty || "Other";

    if (!groups[faculty]) {
      groups[faculty] = [];
    }

    groups[faculty].push(course);

    return groups;
  }, {});
};

export default function UniversityDetails() {

  const { id, name } = useLocalSearchParams();

const [courses, setCourses] = useState<any[]>([]);
console.log("University params:", { id, name });

useEffect(() => {
  const loadCourses = async () => {
    console.log("University ID:", id);
    const data = await getCoursesByUniversity(Number(id));
    setCourses(data);
  };

  loadCourses();
}, [id]);

const groupedCourses = groupByFaculty(courses);
  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>{name}</Text>

      {Object.keys(groupedCourses).map((faculty) => (

        <View key={faculty} style={{ marginBottom: 35 }}>

          <Text style={styles.facultyTitle}>
            {faculty}
          </Text>

          <ScrollView horizontal>

            <View>

              <View style={styles.headerRow}>

                <Text style={styles.headerCell}>Qualification</Text>

                <Text style={styles.headerCell}>
                  Qualification Type
                </Text>

                <Text style={styles.headerCell}>
                  Duration
                </Text>

                <Text style={styles.headerCell}>
                  APS
                </Text>

                <Text style={styles.headerCell}>
                  English
                </Text>

                <Text style={styles.headerCell}>
                  Mathematics
                </Text>

              </View>

              {groupedCourses[faculty].map((course: any) => (

                <View key={course.id} style={styles.row}>

                  <Text style={styles.cell}>
                    {course.qualification}
                  </Text>

                  <Text style={styles.cell}>
                    {course.qualification_type}
                  </Text>

                  <Text style={styles.cell}>
                    {course.duration}
                  </Text>

                  <Text style={styles.cell}>
                    {course.minimum_aps}
                  </Text>

                  <Text style={styles.cell}>
                    {course.english_hl}
                  </Text>

                  <Text style={styles.cell}>
                    {course.mathematics}
                  </Text>

                </View>

              ))}

            </View>

          </ScrollView>

        </View>

      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    margin: 20,
  },

  facultyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0057A3",
    marginLeft: 20,
    marginBottom: 10,
  },

  headerRow: {
    flexDirection: "row",
    backgroundColor: "#0057A3",
  },

  headerCell: {
    width: 180,
    color: "#fff",
    fontWeight: "bold",
    padding: 12,
  },

  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  cell: {
    width: 180,
    padding: 12,
  },

});