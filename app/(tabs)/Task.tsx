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
type Task = {
  id: string;
  title: string;
  type: "School" | "Bursary";
  priority: "low" | "medium" | "high";
  dueDate: string;
  completed: boolean;
};

// DATA (FROM YOUR PROJECT)
const schools = [
  "Baleni Secondary School",
  "Tyelimhlophe Secondary School",
  "Toleni Secondary School",
];

const bursaries = [
  "Vodacom Bursary",
  "Capitec Bank Bursary",
  "MTN Bursary",
  "Standard Bank Bursary",
];

// MAIN COMPONENT
export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [selectedType, setSelectedType] = useState<"School" | "Bursary">("School");
  const [selectedItem, setSelectedItem] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [dueDate, setDueDate] = useState("");

  // ADD TASK
  const addTask = () => {
    if (!selectedItem) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: `Apply to ${selectedItem}`,
      type: selectedType,
      priority,
      dueDate,
      completed: false,
    };

    setTasks([newTask, ...tasks]);

    setSelectedItem("");
    setDueDate("");
    setPriority("low");
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

  // PRIORITY COLOR
  const getColor = (priority: string) => {
    if (priority === "high") return "#ff4d4d";
    if (priority === "medium") return "#ffa500";
    return "#4CAF50";
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Text style={styles.header}>Tasks</Text>
      <Text style={styles.sub}>
        Track your school & bursary applications
      </Text>

      {/* SUMMARY */}
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
          {/* TYPE SELECT */}
          <Text style={styles.label}>Select Type:</Text>
          <View style={styles.row}>
            {["School", "Bursary"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.selectBtn,
                  selectedType === type && styles.selected,
                ]}
                onPress={() =>
                  setSelectedType(type as "School" | "Bursary")
                }
              >
                <Text>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* ITEMS */}
          <Text style={styles.label}>Select {selectedType}:</Text>
          {(selectedType === "School" ? schools : bursaries).map((item) => (
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

          {/* PRIORITY */}
          <TextInput
            placeholder="Priority (low / medium / high)"
            style={styles.input}
            value={priority}
            onChangeText={(text) =>
              setPriority(text as "low" | "medium" | "high")
            }
          />

          {/* DATE */}
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
          <View
            style={[
              styles.card,
              { borderLeftColor: getColor(item.priority) },
            ]}
          >
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

  row: { flexDirection: "row", marginBottom: 10 },

  selectBtn: {
    padding: 10,
    backgroundColor: "#ddd",
    marginRight: 5,
    borderRadius: 5,
  },

  itemBtn: {
    padding: 10,
    backgroundColor: "#eee",
    marginBottom: 5,
    borderRadius: 5,
  },

  selected: {
    backgroundColor: "#4CAF50",
  },

  input: {
    borderWidth: 1,
    padding: 10,
    marginTop: 8,
    borderRadius: 6,
  },

  saveBtn: {
    backgroundColor: "green",
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
    borderLeftWidth: 6,
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

  complete: { color: "green" },

  delete: { color: "red" },
});