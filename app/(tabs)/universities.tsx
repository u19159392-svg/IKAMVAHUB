import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getUniversities } from "../db/ReferenceDatabase";
interface University {
  id: number;
  name: string;
  province: string;
  website: string;
  contact: string;
  minimum_aps: number;
}

export default function Universities() {
  const router = useRouter();
  const [universities, setUniversities] = useState<University[]>([]);
  const [filtered, setFiltered] = useState<University[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUniversities();
  }, []);

  const loadUniversities = async () => {
    try {
      setError(null);
      const data = (await getUniversities()) as University[];

      console.log("🏛 Universities:", data);

      setUniversities(data);
      setFiltered(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load universities. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (text: string) => {
    setSearch(text);

    if (text.trim() === "") {
      setFiltered(universities);
      return;
    }

    const results = universities.filter((u) =>
      u.name.toLowerCase().includes(text.toLowerCase())
    );

    setFiltered(results);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0066CC" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={loadUniversities}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        South African Universities
      </Text>

      <TextInput
        placeholder="Search university..."
        value={search}
        onChangeText={handleSearch}
        style={styles.search}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {search ? "No universities found matching your search" : "No universities available"}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/university-details",
                params: {
                  id: item.id.toString(),
                  name: item.name,
                },
              })
            }
          >
            <Text style={styles.name}>{item.name}</Text>

            <Text style={styles.province}>
              📍 {item.province}
            </Text>

            <Text style={styles.aps}>
              Minimum APS: {item.minimum_aps ?? "Varies"}
            </Text>
          </TouchableOpacity>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 15,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
  },

  search: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    elevation: 2,
  },

  name: {
    fontSize: 19,
    fontWeight: "bold",
  },

  province: {
    marginTop: 5,
    color: "#666",
  },

  aps: {
    marginTop: 8,
    color: "#0066CC",
    fontWeight: "600",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  error: {
    color: "#d32f2f",
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },

  retryButton: {
    backgroundColor: "#0066CC",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  retryText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },

  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});