import React, { useMemo, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Task {
  id: number;
  title: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  status: "Pending" | "Completed";
}

const TASKS: Task[] = [
  {
    id: 1,
    title: "Complete Information Science assignment",
    priority: "High",
    dueDate: "10 August 2026",
    status: "Pending",
  },
  {
    id: 2,
    title: "Prepare presentation",
    priority: "Medium",
    dueDate: "12 August 2026",
    status: "Pending",
  },
  {
    id: 3,
    title: "Submit project documentation",
    priority: "High",
    dueDate: "15 August 2026",
    status: "Pending",
  },
  {
    id: 4,
    title: "Complete Python exercises",
    priority: "Low",
    dueDate: "5 August 2026",
    status: "Completed",
  },
  {
    id: 5,
    title: "Research project requirements",
    priority: "Medium",
    dueDate: "3 August 2026",
    status: "Completed",
  },
];

export default function Task() {
  const [tasks, setTasks] = useState<Task[]>(TASKS);
  const [selectedFilter, setSelectedFilter] = useState<
    "All" | "Pending" | "Completed"
  >("All");

  const filteredTasks = useMemo(() => {
    if (selectedFilter === "All") {
      return tasks;
    }

    return tasks.filter((task) => task.status === selectedFilter);
  }, [tasks, selectedFilter]);

  const pendingTasks = filteredTasks.filter(
    (task) => task.status === "Pending"
  );

  const completedTasks = filteredTasks.filter(
    (task) => task.status === "Completed"
  );

  /*
   * We create one FlatList containing section headers
   * and task items so the screen still uses FlatList.
   */
  const listData = useMemo(() => {
    const data: any[] = [];

    if (pendingTasks.length > 0) {
      data.push({
        type: "header",
        title: "Pending Tasks",
      });

      pendingTasks.forEach((task) => {
        data.push({
          type: "task",
          task,
        });
      });
    }

    if (completedTasks.length > 0) {
      data.push({
        type: "header",
        title: "Completed Tasks",
      });

      completedTasks.forEach((task) => {
        data.push({
          type: "task",
          task,
        });
      });
    }

    return data;
  }, [pendingTasks, completedTasks]);

  const toggleTaskStatus = (id: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === "Pending"
                  ? "Completed"
                  : "Pending",
            }
          : task
      )
    );
  };

  const getPriorityStyle = (priority: Task["priority"]) => {
    switch (priority) {
      case "High":
        return styles.highPriority;

      case "Medium":
        return styles.mediumPriority;

      case "Low":
        return styles.lowPriority;

      default:
        return styles.mediumPriority;
    }
  };

  const renderItem = ({ item }: any) => {
    /*
     * Section heading
     */
    if (item.type === "header") {
      return (
        <Text style={styles.sectionTitle}>
          {item.title}
        </Text>
      );
    }

    const task: Task = item.task;

    return (
      <View style={styles.card}>
        {/* Task title */}
        <Text style={styles.taskTitle}>
          {task.title}
        </Text>

        {/* Priority */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Priority:</Text>

          <View
            style={[
              styles.priorityBadge,
              getPriorityStyle(task.priority),
            ]}
          >
            <Text style={styles.priorityText}>
              {task.priority}
            </Text>
          </View>
        </View>

        {/* Due date */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Due date:</Text>

          <Text style={styles.value}>
            {task.dueDate}
          </Text>
        </View>

        {/* Status */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Status:</Text>

          <Text
            style={[
              styles.status,
              task.status === "Completed"
                ? styles.completedStatus
                : styles.pendingStatus,
            ]}
          >
            {task.status}
          </Text>
        </View>

        {/* Complete / Pending button */}
        <TouchableOpacity
          style={styles.statusButton}
          onPress={() => toggleTaskStatus(task.id)}
        >
          <Text style={styles.statusButtonText}>
            {task.status === "Completed"
              ? "Mark as Pending"
              : "Mark as Completed"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      {/* Page heading */}
      <Text style={styles.title}>
        My Tasks
      </Text>

      <Text style={styles.subtitle}>
        Keep track of your academic tasks and deadlines.
      </Text>

      {/* Filters */}
      <View style={styles.filterContainer}>

        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "All" &&
              styles.activeFilter,
          ]}
          onPress={() => setSelectedFilter("All")}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === "All" &&
                styles.activeFilterText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "Pending" &&
              styles.activeFilter,
          ]}
          onPress={() => setSelectedFilter("Pending")}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === "Pending" &&
                styles.activeFilterText,
            ]}
          >
            Pending
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedFilter === "Completed" &&
              styles.activeFilter,
          ]}
          onPress={() => setSelectedFilter("Completed")}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === "Completed" &&
                styles.activeFilterText,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>

      </View>

      {/* Task list */}
      {listData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            No tasks found
          </Text>

          <Text style={styles.emptyText}>
            There are no tasks in this section.
          </Text>
        </View>
      ) : (
        <FlatList
          data={listData}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            item.type === "header"
              ? `header-${item.title}`
              : `task-${item.task.id}-${index}`
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingTop: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    paddingHorizontal: 20,
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    marginTop: 5,
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  filterButton: {
    paddingVertical: 9,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
    marginRight: 8,
  },

  activeFilter: {
    backgroundColor: "#0057A3",
  },

  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  activeFilterText: {
    color: "#fff",
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  sectionTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#0057A3",
    marginTop: 10,
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,

    elevation: 3,

    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 15,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    width: 90,
  },

  value: {
    fontSize: 14,
    color: "#333",
  },

  priorityBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },

  highPriority: {
    backgroundColor: "#FEE2E2",
  },

  mediumPriority: {
    backgroundColor: "#FEF3C7",
  },

  lowPriority: {
    backgroundColor: "#DCFCE7",
  },

  priorityText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },

  status: {
    fontSize: 14,
    fontWeight: "bold",
  },

  pendingStatus: {
    color: "#D97706",
  },

  completedStatus: {
    color: "#16A34A",
  },

  statusButton: {
    marginTop: 10,
    backgroundColor: "#0057A3",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  statusButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },

  emptyText: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
  },
});