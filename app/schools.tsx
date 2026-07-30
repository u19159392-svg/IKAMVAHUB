import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import SchoolCard from "./components/SchoolCard";
import { getSchools, searchSchools } from "./db/Database";

export default function Schools() {
  const [schools, setSchools] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSchools();
  }, []);

  const loadSchools = async () => {
    setLoading(true);

    try {
      const data = await getSchools();
      setSchools(data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleSearch = async (text: string) => {
    setSearch(text);

    if (text.trim() === "") {
      loadSchools();
      return;
    }

    const results = await searchSchools(text);
    setSchools(results);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Schools
      </Text>

      <TextInput
        style={styles.search}
        placeholder="Search a school..."
        value={search}
        onChangeText={handleSearch}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0097A7" />
      ) : (
        <FlatList
          data={schools}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SchoolCard school={item} />
          )}
          contentContainerStyle={{
            paddingBottom: 40,
          }}
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
    textAlign: "center",
    marginBottom: 20,
    color: "#00838F",
  },

  search: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },

});