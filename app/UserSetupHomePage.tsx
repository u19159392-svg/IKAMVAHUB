import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";

export default function SetupScreen() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [career, setCareer] = useState("");

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🎓 IkamvaHub</Text>

        <Text style={styles.title}>Welcome! 👋</Text>
        <Text style={styles.subtitle}>
          Let's set up your profile
        </Text>

        <View style={styles.progress}>
          <View style={styles.activeDot} />
          <View style={styles.line} />
          <View style={styles.dot} />
          <View style={styles.line} />
          <View style={styles.dot} />
          <View style={styles.line} />
          <View style={styles.dot} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#14B8A6" />
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="cake" size={20} color="#14B8A6" />
          <TextInput
            placeholder="Age"
            keyboardType="numeric"
            style={styles.input}
            value={age}
            onChangeText={setAge}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="male-female-outline" size={20} color="#14B8A6" />
          <TextInput
            placeholder="Gender"
            style={styles.input}
            value={gender}
            onChangeText={setGender}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="school-outline" size={20} color="#14B8A6" />
          <TextInput
            placeholder="School"
            style={styles.input}
            value={school}
            onChangeText={setSchool}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome5 name="graduation-cap" size={18} color="#14B8A6" />
          <TextInput
            placeholder="Grade"
            style={styles.input}
            value={grade}
            onChangeText={setGrade}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="briefcase-outline" size={20} color="#14B8A6" />
          <TextInput
            placeholder="Career Interest"
            style={styles.input}
            value={career}
            onChangeText={setCareer}
          />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continue →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },

  header: {
    padding: 25,
    paddingTop: 60,
  },

  logo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2563EB",
    marginBottom: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#111827",
  },

  subtitle: {
    fontSize: 18,
    color: "#6B7280",
    marginTop: 5,
  },

  progress: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
  },

  activeDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#14B8A6",
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#D1D5DB",
  },

  line: {
    flex: 1,
    height: 3,
    backgroundColor: "#D1D5DB",
  },

  card: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 20,
    elevation: 4,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: "#111827",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 15,
    marginBottom: 18,
  },

  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
