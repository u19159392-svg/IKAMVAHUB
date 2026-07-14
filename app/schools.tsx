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

import { getSchools, searchSchools } from "./db/Database";

export default function Schools() {
    const [schools, setSchools] = useState<any[]>([]);
    const [query, setQuery] = useState("");
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

    const handleSearch = async (text: string) => {
        setQuery(text);
        setLoading(true);
        if (text.trim() === "") {
            const data = await getSchools();
            setSchools(data);
        } else {
            const results = await searchSchools(text);
            setSchools(results);
        }
        setLoading(false);
    };

    const renderSchool = ({ item }: {item: any}) => (
        <TouchableOpacity style={styles.card}>
            <Text style={styles.schoolName}>{item.name}</Text>
            <Text style={styles.cardText}>Province: {item.province}</Text>
            <Text style={styles.cardText}>Type: {item.type}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Schools</Text>

            {/* 🔍 Search Bar */}
            <TextInput
                style={styles.searchBar}
                placeholder="Search schools..."
                value={query}
                onChangeText={handleSearch}
            />

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
