import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { getMentors } from "./db/ReferenceDatabase";

export default function Mentors() {
  const router = useRouter();
  const [mentors, setMentors] = useState<any[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedField, setSelectedField] = useState("All");

  const fields = [
    "All",
    "Engineering",
    "Medicine",
    "Law",
    "Education",
    "Business",
    "Technology",
    "Science",
  ];

  useEffect(() => {
    loadMentors();
  }, []);

  const loadMentors = async () => {
    const data = await getMentors();
    setMentors(data);
    setFilteredMentors(data);
    setLoading(false);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    filterData(text, selectedField);
  };

  const handleFieldSelect = (field: string) => {
    setSelectedField(field);
    filterData(search, field);
  };

  const filterData = (text: string, field: string) => {
    let filtered = mentors;

    if (text.trim() !== "") {
      filtered = filtered.filter(
  (m) =>
    m.name?.toLowerCase().includes(text.toLowerCase()) ||
    m.field?.toLowerCase().includes(text.toLowerCase()) ||
    m.course?.toLowerCase().includes(text.toLowerCase()),
);
    }

    if (field !== "All") {
      filtered = filtered.filter((m) => m.field === field);
    }

    setFilteredMentors(filtered);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mentors</Text>
      <Text style={styles.subtitle}>Connect with industry professionals</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search mentors..."
          value={search}
          onChangeText={handleSearch}
        />
      </View>

      {/* Field Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        {fields.map((field) => (
          <TouchableOpacity
            key={field}
            style={[
              styles.filterButton,
              selectedField === field && styles.filterButtonActive,
            ]}
            onPress={() => handleFieldSelect(field)}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedField === field && styles.filterButtonTextActive,
              ]}
            >
              {field}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Mentor List */}
      <FlatList
        data={filteredMentors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/mentor-details?id=${item.id}` as any)}
          >
            <View style={styles.cardHeader}>
              <View style={styles.cardInfo}>
                <Text style={styles.mentorName}>{item.name}</Text>
                <Text style={styles.mentorField}>{item.field}</Text>
              </View>
            </View>
            {item.availability && (
              <View style={styles.availabilityBadge}>
                <Ionicons name="time-outline" size={14} color="#14B8A6" />
                <Text style={styles.availabilityText}>
                  Available: {item.availability}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No mentors found</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0F766E",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#E8F5F3",
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: "#14B8A6",
  },
  filterButtonText: {
    fontSize: 13,
    color: "#0F766E",
  },
  filterButtonTextActive: {
    color: "#FFFFFF",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  mentorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F766E",
  },
  mentorField: {
    fontSize: 14,
    color: "#555",
  },
  availabilityBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  availabilityText: {
    fontSize: 13,
    color: "#14B8A6",
    marginLeft: 4,
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 30,
    fontSize: 16,
  },
});
