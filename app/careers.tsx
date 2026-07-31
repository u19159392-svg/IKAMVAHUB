import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getCareers } from "./db/Database";

export default function Careers() {
  const router = useRouter();
  const [careers, setCareers] = useState<any[]>([]);
  const [filteredCareers, setFilteredCareers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStream, setSelectedStream] = useState("All");

  useEffect(() => {
    loadCareers();
  }, []);

  const loadCareers = async () => {
    const data = await getCareers();
    console.log("📊 CAREERS LOADED:", data.length);
    setCareers(data);
    setFilteredCareers(data);
    setLoading(false);
  };

  const filterCareers = (text: string, stream: string) => {
    let filtered = careers;

    if (text.trim() !== "") {
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(text.toLowerCase()),
      );
    }

    if (stream !== "All") {
      filtered = filtered.filter((c) => c.field === stream);
    }

    setFilteredCareers(filtered);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    filterCareers(text, selectedStream);
  };

  const handleStreamSelect = (stream: string) => {
    setSelectedStream(stream);
    filterCareers(search, stream);
  };

  const streams = [
    "All",
    "Science & Health Sciences",
    "Engineering & Technology",
    "Commerce & Business",
    "Arts & Creative Fields",
    "Education",
  ];

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Career Finder</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search Career..."
        value={search}
        onChangeText={handleSearch}
      />

      {/* Stream Filter Buttons */}
      <View style={styles.streamContainer}>
        {streams.map((stream) => (
          <TouchableOpacity
            key={stream}
            style={[
              styles.streamButton,
              selectedStream === stream && styles.streamButtonActive,
            ]}
            onPress={() => handleStreamSelect(stream)}
          >
            <Text
              style={[
                styles.streamButtonText,
                selectedStream === stream && styles.streamButtonTextActive,
              ]}
            >
              {stream}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Career List */}
      <FlatList
        data={filteredCareers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/career-details?id=${item.id}` as any)}
          >
            <Text style={styles.careerName}>▼ {item.name}</Text>
            <Text style={styles.careerField}>
              Field: {item.field || "General"}
            </Text>
            <Text style={styles.careerAps}>
              APS: {item.aps_minimum || "N/A"}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No careers found</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F5F5F5" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  searchBar: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
    fontSize: 16,
  },
  streamContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  streamButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#e5e5ea",
    marginRight: 6,
    marginBottom: 6,
  },
  streamButtonActive: {
    backgroundColor: "#007AFF",
  },
  streamButtonText: {
    fontSize: 13,
    color: "#333",
  },
  streamButtonTextActive: {
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  careerName: { fontSize: 18, fontWeight: "bold", color: "#007AFF" },
  careerField: { fontSize: 14, color: "#555", marginTop: 4 },
  careerAps: { fontSize: 14, color: "#555", marginTop: 4 },
  emptyText: { textAlign: "center", color: "#999", marginTop: 20 },
});
