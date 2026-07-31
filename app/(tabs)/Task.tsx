import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";

// TYPES
type TaskType =
  | "School"
  | "Bursary"
  | "University"
  | "Mentorship";

type Task = {
  id: string;
  title: string;
  type: TaskType;
  dueDate: string;
  completed: boolean;
};

// ✅ ALL SCHOOLS (24)
const schools = [
  "Baleni Secondary School",
  "Tyelimhlophe Secondary School",
  "Toleni Secondary School",
  "Nomaqwatekana High School",
  "Zwelitsha High Secondary School",
  "Bonxa High School",
  "Dumsi Senior Secondary School",
  "Mfazwe Tech High School",
  "Mpondombini Secondary School",
  "Mvenyane High School",
  "Mount Frere High School",
  "Ludeke High School",
  "Dangwana High School",
  "Cabazi High School",
  "Mpendla High School",
  "Ntenetyana High School",
  "Tabankulu High School",
  "Bizana High School",
  "Amadiba Secondary School",
  "Lugangeni Secondary School",
  "Mvuzo Secondary School",
  "Ntlamvini High School",
  "Umzimvubu Secondary School",
  "Eastern Cape Tech High School",
];

// BURSARIES
const bursaries = [
  "NSFAS",
  "Vodacom Bursary",
  "Capitec Bank Bursary",
  "MTN Bursary",
  "Standard Bank Bursary",
  "Sasol Bursary",
  "Transnet Bursary",
  "Shoprite Bursary",
];

// UNIVERSITIES
const universities = [
  "University of Pretoria",
  "University of Cape Town",
  "University of Johannesburg",
  "Walter Sisulu University",
  "Nelson Mandela University",
];

// MENTORSHIP
const mentorships = [
  "Career Guidance Program",
  "Coding Mentorship",
  "University Prep Mentorship",
  "Business Mentorship",
];

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [selectedType, setSelectedType] =
    useState<TaskType>("School");

  const [selectedItem, setSelectedItem] = useState("");
  const [dueDate, setDueDate] = useState("");

  // GET ITEMS BASED ON TYPE
  const getItems = () => {
    switch (selectedType) {
      case "School":
        return schools;
      case "Bursary":
        return bursaries;
      case "University":
        return universities;
      case "Mentorship":
        return mentorships;
      default:
        return [];
    }
  };

  // ADD TASK
  const addTask = () => {
    if (!selectedItem) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: `Apply to ${selectedItem}`,
      type: selectedType,
      dueDate,
      completed: false,
    };

    setTasks([newTask, ...tasks]);

    setSelectedItem("");
    setDueDate("");
    setShowForm(false);
  };

  // TOGGLE COMPLETE
  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // DELETE TASK
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tasks</Text>
      <Text style={styles.sub}>
        Track applications (schools, bursaries, university, mentorship)
      </Text>

      <Text style={styles.summary}>
        {completedCount} completed | {tasks.length - completedCount} remaining
      </Text>

      {/* ADD BUTTON */}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setShowForm(!showForm)}
      >
        <Text style={styles.addBtnText}>+ Add Task</Text>
      </TouchableOpacity>

      {/* FORM */}
      {showForm && (
        <View style={styles.form}>
          <Text style={styles.label}>Select Type:</Text>

          <View style={styles.row}>
            {["School", "Bursary", "University", "Mentorship"].map(
              (type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.selectBtn,
                    selectedType === type && styles.selected,
                  ]}
                  onPress={() =>
                    setSelectedType(type as TaskType)
                  }
                >
                  <Text>{type}</Text>
                </TouchableOpacity>
              )
            )}
          </View>

          <Text style={styles.label}>
            Select {selectedType}:
          </Text>

          {getItems().map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.itemBtn,
                selectedItem === item && styles.selected,
              ]}
              onPress={() => setSelectedItem(item)}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}

          <TextInput
            placeholder="Due Date (YYYY-MM-DD)"
            style={styles.input}
            value={dueDate}
            onChangeText={setDueDate}
          />

          <TouchableOpacity style={styles.saveBtn} onPress={addTask}>
            <Text style={{ color: "white" }}>Save Task</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* TASK LIST */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={[styles.title, item.completed && styles.completed]}>
              {item.title}
            </Text>

            <Text style={styles.meta}>
              📅 {item.dueDate} | 📂 {item.type}
            </Text>

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => toggleComplete(item.id)}>
                <Text style={styles.complete}>
                  {item.completed ? "✔ Done" : "Mark Done"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Text style={styles.delete}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f4f6f8" },

  header: { fontSize: 28, fontWeight: "bold" },

  sub: { color: "gray", marginBottom: 10 },

  summary: { marginBottom: 10, fontWeight: "bold" },

  addBtn: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },

  addBtnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  form: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  label: { fontWeight: "bold", marginTop: 5 },

  row: { flexDirection: "row", flexWrap: "wrap" },

  selectBtn: {
    padding: 10,
    backgroundColor: "#ddd",
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 5,
  },

  itemBtn: {
    padding: 10,
    backgroundColor: "#eee",
    marginBottom: 5,
    borderRadius: 5,
  },

  selected: {
    backgroundColor: "#007bff",
  },

  input: {
    borderWidth: 1,
    padding: 10,
    marginTop: 8,
    borderRadius: 6,
  },

  saveBtn: {
    backgroundColor: "#007bff",
    padding: 12,
    marginTop: 10,
    alignItems: "center",
    borderRadius: 6,
  },

  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  title: { fontWeight: "bold", fontSize: 16 },

  completed: {
    textDecorationLine: "line-through",
    color: "gray",
  },

  meta: { color: "gray", fontSize: 12, marginTop: 5 },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  complete: { color: "#007bff" },

  delete: { color: "red" },
});