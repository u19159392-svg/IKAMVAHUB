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

import { filterSchools, getSchools, searchSchools } from "./db/Database";

const SCHOOL_TYPES = ["All", "Public"];

const PROVINCES = [
  "All",
  "Eastern Cape",
  "Free State",
  "KwaZulu-Natal",
];

const SPORTS = [
  "All",
  "Soccer",
  "Rugby",
  "Cricket",
  "Netball",
  "Athletics",
];

const EXTRACURRICULAR = [
  "All",
  "Debate",
  "Choir",
  "Drama",
  "Chess",
  "Science Club",
];

const FACILITIES = [
  "All",
  "Library",
  "Computer Laboratory",
  "Science Laboratory",
  "Sports Field",
  "Hostel",
  "School Hall",
];
export default function Schools() {
    const router = useRouter();

    const [schools, setSchools] = useState<any[]>([]);
const [query, setQuery] = useState("");

// Filters
const [province, setProvince] = useState("All");
const [schoolType, setSchoolType] = useState("All");
const [sport, setSport] = useState("All");
const [activity, setActivity] = useState("All");
const [facility, setFacility] = useState("All");

const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadSchools();
    }, []);

    const loadSchools = async () => {
        setLoading(true);
        const data = await getSchools();
        setSchools(data);
        setLoading(false);
    };

    // Central function that decides which DB call to make
    // based on current search text + filter state
    const refresh = async (text: string, selectedType: string) => {
        setLoading(true);
        try {
            if (text.trim() !== "") {
                const results = await searchSchools(text);
                setSchools(results);
            } else if (selectedType !== "All") {
              const results = await filterSchools("", selectedType);
                setSchools(results);
            } else {
                const data = await getSchools();
                setSchools(data);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (text: string) => {
        setQuery(text);
        refresh(text, schoolType);
    };

    const handleTypeSelect = (item: string) => {
        setSchoolType(item);
        setQuery(""); // clear search so filter takes effect
        refresh("", item);
    };

    const renderSchool = ({ item }: { item: any }) => (
        <TouchableOpacity 
        style={styles.card}
        onPress ={() =>
            router.push({
               pathname: "/SchoolDetails",
               params: {
            id: item.id.toString(),
            name: item.name,
            province: item.province,
            type: item.type,
        },
      })
    }
    >
            <Text style={styles.schoolName}>{item.name}</Text>
            <Text style={styles.cardText}>Province: {item.province}</Text>
            <Text style={styles.cardText}>Type: {item.type}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Schools</Text>

            {/* Task 4: Search bar */}
            <TextInput
                style={styles.searchBar}
                placeholder="Search schools..."
                value={query}
                onChangeText={handleSearch}
            />

            {/* Task 5: Filter buttons (School Type only) */}
            <Text style={styles.heading}>School Type</Text>
            <View style={styles.buttonRow}>
                {SCHOOL_TYPES.map((item) => (
                    <TouchableOpacity
                        key={item}
                        style={[
                            styles.filterButton,
                            schoolType === item && styles.activeButton,
                        ]}
                        onPress={() => handleTypeSelect(item)}
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                schoolType === item && styles.activeButtonText,
                            ]}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Text style={styles.heading}>Province</Text>

<View style={styles.buttonRow}>
  {PROVINCES.map((item) => (
    <TouchableOpacity
      key={item}
      style={[
        styles.filterButton,
        province === item && styles.activeButton,
      ]}
      onPress={() => setProvince(item)}
    >
      <Text
        style={[
          styles.buttonText,
          province === item && styles.activeButtonText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  ))}
</View>
<Text style={styles.heading}>Sports</Text>

<View style={styles.buttonRow}>
  {SPORTS.map((item) => (
    <TouchableOpacity
      key={item}
      style={[
        styles.filterButton,
        sport === item && styles.activeButton,
      ]}
      onPress={() => setSport(item)}
    >
      <Text
        style={[
          styles.buttonText,
          sport === item && styles.activeButtonText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  ))}
</View>
<Text style={styles.heading}>Extracurricular Activities</Text>

<View style={styles.buttonRow}>
  {EXTRACURRICULAR.map((item) => (
    <TouchableOpacity
      key={item}
      style={[
        styles.filterButton,
        activity === item && styles.activeButton,
      ]}
      onPress={() => setActivity(item)}
    >
      <Text
        style={[
          styles.buttonText,
          activity === item && styles.activeButtonText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  ))}
</View>
<Text style={styles.heading}>Services & Amenities</Text>

<View style={styles.buttonRow}>
  {FACILITIES.map((item) => (
    <TouchableOpacity
      key={item}
      style={[
        styles.filterButton,
        facility === item && styles.activeButton,
      ]}
      onPress={() => setFacility(item)}
    >
      <Text
        style={[
          styles.buttonText,
          facility === item && styles.activeButtonText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  ))}
</View>

            {/* Task 6: School cards */}
            {loading ? (
                <ActivityIndicator size="large" color="#00ACC1" />
            ) : schools.length === 0 ? (
                <Text style={styles.noResults}>No schools found</Text>
            ) : (
                <FlatList
                    data={schools}
                    keyExtractor={(item: any) => item.id.toString()}
                    renderItem={renderSchool}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        paddingTop: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        textAlign: "center",
    },
    searchBar: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginHorizontal: 16,
        marginBottom: 12,
        backgroundColor: "#fff",
    },
    heading: {
        fontSize: 16,
        fontWeight: "bold",
        marginHorizontal: 16,
        marginBottom: 8,
    },
    buttonRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: 16,
        marginBottom: 16,
    },
    filterButton: {
        backgroundColor: "#D9EAF7",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },
    activeButton: {
        backgroundColor: "#00ACC1",
    },
    buttonText: {
        color: "#000",
        fontWeight: "600",
    },
    activeButtonText: {
        color: "#fff",
    },
    card: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 16,
        marginVertical: 8,
        padding: 16,
        borderRadius: 8,
        elevation: 3,
    },
    schoolName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#00ACC1",
        marginBottom: 6,
    },
    cardText: {
        fontSize: 15,
        color: "#555",
        marginBottom: 4,
    },
    noResults: {
        textAlign: "center",
        marginTop: 20,
        color: "#888",
    },
});
