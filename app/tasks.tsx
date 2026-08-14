import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {
    createTask,
    deleteTask,
    getTasksByUser,
    updateTaskStatus,
} from "./db/Database";

export default function Tasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [userId] = useState(1);
  const[dueDate,setDueDate]= useState(new Date());
  const[showDatePicker,setShowDatePicker]=useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      const data = await getTasksByUser(userId);
      setTasks(data);
    };
    loadTasks();
  }, [userId]);

  const loadTasks = async () => {
    const data = await getTasksByUser(userId);
    setTasks(data);
  };

  const handleAddTask = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a task title");
      return;
    }
    await createTask({
      title,
      description,
      priority,
      status: "pending",
      due_date: "",
      user_id: userId,
    });
    setTitle("");
    setDescription("");
    loadTasks();
  };

  const handleToggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "pending" ? "complete" : "pending";
    await updateTaskStatus(id, newStatus);
    loadTasks();
  };

  const handleDeleteTask = (id: number, title: string) => {
    Alert.alert("Delete Task", `Delete "${title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteTask(id);
          loadTasks();
        },
      },
    ]);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#FF3B30";
      case "medium":
        return "#FF9500";
      case "low":
        return "#34C759";
      default:
        return "#8E8E93";
    }
  };

  const renderTask = ({ item }: any) => {
    const isComplete = item.status === "complete";

    return (
      <View
        style={[
          styles.taskItem,
          { borderLeftColor: getPriorityColor(item.priority) },
        ]}
      >
        <TouchableOpacity
          style={[styles.statusCircle, isComplete && styles.statusComplete]}
          onPress={() => handleToggleStatus(item.id, item.status)}
        />
        <View style={styles.taskContent}>
          <Text style={[styles.taskTitle, isComplete && styles.taskComplete]}>
            {item.title}
          </Text>
          {item.description ? (
            <Text style={[styles.taskDesc, isComplete && styles.taskComplete]}>
              {item.description}
            </Text>
          ) : null}
          <View style={styles.taskMeta}>
            <Text style={styles.taskMetaText}>Priority: {item.priority}</Text>
            <Text style={styles.taskMetaText}>•</Text>
            <Text style={styles.taskMetaText}>
              {isComplete ? "✅ Complete" : "⏳ Pending"}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteTask(item.id, item.title)}
        >
          <Ionicons name="trash-outline" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    );
  };

  const pendingTasks = tasks.filter((t) => t.status === "pending");
  const completedTasks = tasks.filter((t) => t.status === "complete");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Tasks</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Task title..."
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Description (optional)"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <View style={styles.priorityContainer}>
          {["low", "medium", "high"].map((p) => (
            <TouchableOpacity
              key={p}
              style={[
                styles.priorityButton,
                priority === p && styles.priorityButtonActive,
                p === "low" && priority === p && styles.priorityLowActive,
                p === "medium" && priority === p && styles.priorityMediumActive,
                p === "high" && priority === p && styles.priorityHighActive,
              ]}
              onPress={() => setPriority(p)}
            >
              <Text
                style={[
                  styles.priorityButtonText,
                  priority === p && styles.priorityButtonTextActive,
                ]}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}

          
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>➕ Add Task</Text>
        </TouchableOpacity>
      </View>

      {pendingTasks.length > 0 && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            ⏳ Pending ({pendingTasks.length})
          </Text>
          <FlatList
            data={pendingTasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderTask}
            scrollEnabled={false}
          />
        </View>

        
      )}

      {completedTasks.length > 0 && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            ✅ Completed ({completedTasks.length})
          </Text>
          <FlatList
            data={completedTasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderTask}
            scrollEnabled={false}
          />
        </View>
      )}

      {tasks.length === 0 && (
        <View style={styles.emptyContainer}>
          <Ionicons name="checkmark-done-outline" size={60} color="#ddd" />
          <Text style={styles.emptyText}>No tasks yet</Text>
          <Text style={styles.emptySubtext}>Add a task to get started!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0F766E",
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  textArea: {
    height: 60,
    textAlignVertical: "top",
  },
  priorityContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  priorityButtonActive: {
    backgroundColor: "#007AFF",
  },
  priorityLowActive: {
    backgroundColor: "#34C759",
  },
  priorityMediumActive: {
    backgroundColor: "#FF9500",
  },
  priorityHighActive: {
    backgroundColor: "#FF3B30",
  },
  priorityButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
  },
  priorityButtonTextActive: {
    color: "#fff",
  },
  addButton: {
    backgroundColor: "#14B8A6",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 8,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  statusCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#007AFF",
    marginRight: 12,
  },
  statusComplete: {
    backgroundColor: "#34C759",
    borderColor: "#34C759",
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  taskComplete: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  taskDesc: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  taskMeta: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },
  taskMetaText: {
    fontSize: 12,
    color: "#999",
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#999",
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#bbb",
    marginTop: 4,
  },
});
