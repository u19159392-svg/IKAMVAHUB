import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { getMentors } from "./db/ReferenceDatabase";

interface Mentor {
  id: number;
  name: string;
  field: string;
  phone?: string;
  email?: string;
  availability?: string;
  course?: string;
}

export default function Mentorship() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [selectedField, setSelectedField] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMentors();
  }, []);

  const loadMentors = async () => {
    try {
      setLoading(true);

      const data = (await getMentors()) as Mentor[];

      console.log("👩‍🏫 MENTORS LOADED:", data);

      setMentors(data || []);
    } catch (error) {
      console.error("❌ Error loading mentors:", error);
      setMentors([]);
    } finally {
      setLoading(false);
    }
  };

  // Get fields directly from the mentors in the database
  const fields = useMemo(() => {
    const uniqueFields = Array.from(
      new Set(
        mentors
          .map((mentor) => mentor.field?.trim())
          .filter(Boolean)
      )
    );

    return ["All", ...uniqueFields];
  }, [mentors]);

  // Filter mentors by field
  const filteredMentors = useMemo(() => {
    if (selectedField === "All") {
      return mentors;
    }

    return mentors.filter(
      (mentor) =>
        mentor.field?.trim().toLowerCase() ===
        selectedField.trim().toLowerCase()
    );
  }, [mentors, selectedField]);

  const renderMentor = ({ item }: { item: Mentor }) => {
    return (
      <View style={styles.card}>
        {/* Mentor Name */}
        <Text style={styles.mentorName}>
          {item.name}
        </Text>

        {/* Field */}
        <Text style={styles.field}>
          {item.field}
        </Text>

        {/* Phone */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>
            {item.phone || "Not available"}
          </Text>
        </View>

        {/* Email */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>
            {item.email || "Not available"}
          </Text>
        </View>

        {/* Availability */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Availability:</Text>
          <Text style={styles.value}>
            {item.availability || "Not available"}
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#0057A3"
        />

        <Text style={styles.loadingText}>
          Loading mentors...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Find a Mentor
        </Text>

        <Text style={styles.subtitle}>
          Connect with mentors in your field of interest.
        </Text>
      </View>

      {/* Filter */}
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>
          Filter by field
        </Text>

        <FlatList
          data={fields}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filterList}
          renderItem={({ item: field }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelectedField(field)}
              style={[
                styles.filterButton,
                selectedField === field &&
                  styles.activeFilterButton,
              ]}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.filterText,
                  selectedField === field &&
                    styles.activeFilterText,
                ]}
              >
                {field}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Mentor List */}
      {filteredMentors.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            No mentors found
          </Text>

          <Text style={styles.emptyText}>
            There are currently no mentors available in this field.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredMentors}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMentor}
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
  },

  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    marginTop: 6,
    lineHeight: 21,
  },

  /* FILTER */

  filterSection: {
    paddingTop: 8,
    paddingBottom: 12,
  },

  filterTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  filterList: {
    paddingHorizontal: 20,
    paddingRight: 30,
  },

  filterButton: {
    minHeight: 42,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: "#E5E7EB",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  activeFilterButton: {
    backgroundColor: "#0057A3",
  },

  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  activeFilterText: {
    color: "#FFFFFF",
  },

  /* LIST */

  list: {
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 30,
  },

  /* MENTOR CARD */

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,

    elevation: 3,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  mentorName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
    marginBottom: 5,
  },

  field: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0057A3",
    marginBottom: 14,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },

  label: {
    width: 105,
    fontSize: 14,
    fontWeight: "700",
    color: "#555",
  },

  value: {
    flex: 1,
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },

  /* LOADING */

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F7FA",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 15,
    color: "#666",
  },

  /* EMPTY */

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    color: "#222",
  },

  emptyText: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
    lineHeight: 20,
  },
});