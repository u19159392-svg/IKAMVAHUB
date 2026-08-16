import { Ionicons } from "@expo/vector-icons";
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
import { getUniversities } from "./db/ReferenceDatabase";

const TURQUOISE = "#14B8A6";

interface University {
  id: number;
  name: string;
  province: string;
  city: string;
  website: string;
  contact: string;
  minimum_aps: number;
  image_url?: string;
}

type ProvinceSection = {
  province: string;
  data: University[];
};

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
      setUniversities(data);
      setFiltered(data);
    } catch (err) {
      console.error(err);
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

  const groupByProvince = (data: University[]): ProvinceSection[] => {
    const map = new Map<string, University[]>();
    for (const uni of data) {
      const key = uni.province || "Other";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(uni);
    }
    return Array.from(map.entries())
      .map(([province, list]) => ({ province, data: list }))
      .sort((a, b) => a.province.localeCompare(b.province));
  };

  const sections = groupByProvince(filtered);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={TURQUOISE} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadUniversities}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>

      <View style={styles.searchWrapper}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          placeholder="Search institutions..."
          placeholderTextColor="#9AA0A6"
          value={search}
          onChangeText={handleSearch}
          style={styles.search}
        />
      </View>

      <FlatList
        data={sections}
        keyExtractor={(section) => section.province}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {search
                ? "No universities found matching your search"
                : "No universities available"}
            </Text>
          </View>
        }
        renderItem={({ item: section }) => (
          <View style={styles.sectionBlock}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>{section.province}</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{section.data.length}</Text>
              </View>
            </View>

            <FlatList
              data={section.data}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingRight: 15 }}
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
                  <View style={styles.logoBox}>
                    <Text style={styles.logoPlaceholderText}>
                      {item.name.charAt(0)}
                    </Text>
                  </View>

                  <Text style={styles.name} numberOfLines={2}>
                    {item.name}
                  </Text>

                  <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={13} color="#6B7280" style={styles.pin} />
                    <Text style={styles.location} numberOfLines={1}>
                      {item.city || item.province}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      />
    </View>
  );
}

const CARD_WIDTH = 160;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 15,
    paddingHorizontal: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 15,
  },

  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F3F5",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },

  search: {
    flex: 1,
    paddingVertical: 14,
    color: "#000000",
    fontSize: 15,
  },

  sectionBlock: {
    marginBottom: 28,
  },

  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginRight: 10,
  },

  countBadge: {
    backgroundColor: "#E6FBF8",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },

  countText: {
    color: TURQUOISE,
    fontSize: 13,
    fontWeight: "700",
  },

  card: {
    width: CARD_WIDTH,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    marginRight: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  logoBox: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#F2F3F5",
    borderRadius: 12,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  logoImage: {
    width: "80%",
    height: "80%",
  },

  logoPlaceholderText: {
    fontSize: 32,
    fontWeight: "bold",
    color: TURQUOISE,
  },

  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 6,
    minHeight: 38,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  pin: {
    fontSize: 12,
    marginRight: 4,
  },

  location: {
    fontSize: 13,
    color: "#6B7280",
    flexShrink: 1,
  },

  center: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  error: {
    color: "#DC2626",
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },

  retryButton: {
    backgroundColor: TURQUOISE,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },

  retryText: {
    color: "#FFFFFF",
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
    color: "#6B7280",
    textAlign: "center",
  },
});