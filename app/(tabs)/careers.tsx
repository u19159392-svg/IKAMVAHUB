import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getCareers } from "../db/Database";

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
      const searchText = text.toLowerCase();

      filtered = filtered.filter((c) =>
        (
          c.name +
          " " +
          c.field +
          " " +
          c.description +
          " " +
          c.subjects_needed +
          " " +
          c.study_path
        )
          .toLowerCase()
          .includes(searchText),
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
    "ICT & Digital Media",
    "Commerce & Business",
    "Arts & Creative Fields",
    "Education",
    "Law & Legal Studies",
    "Agriculture & Environmental Studies",
    "Hospitality & Tourism",
    "TVET & Skilled Trades",
    "Built Environment & Construction",
    "Transport & Logistics",
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
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search careers..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={handleSearch}
        />
      </View>

      {/* Stream Filter Buttons */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.streamContainer}
        contentContainerStyle={styles.streamContent}
      >
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
      </ScrollView>

      {/* Career List */}
      <FlatList
        data={filteredCareers}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
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
  container: {
    flex: 1,
    backgroundColor: "#F7FAFA",
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7FAFA",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#0F766E",
    marginTop: 15,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingHorizontal: 16,
    height: 54,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#D6ECE9",
    elevation: 3,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },

  searchBar: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#D6ECE9",
    marginBottom: 18,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  streamContainer: {
    marginBottom: 18,
  },

  streamContent: {
    paddingHorizontal: 4,
  },

  streamButton: {
    backgroundColor: "#E8F5F3",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 10,
  },

  streamButtonActive: {
    backgroundColor: "#14B8A6",
  },

  streamButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F766E",
  },

  streamButtonTextActive: {
    color: "#FFFFFF",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,

    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  careerName: {
    fontSize: 19,
    fontWeight: "700",
    color: "#0F766E",
  },

  careerField: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },

  careerAps: {
    fontSize: 15,
    color: "#14B8A6",
    fontWeight: "600",
    marginTop: 5,
  },

  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 30,
    fontSize: 16,
  },
});
