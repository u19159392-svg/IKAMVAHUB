import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { getData, saveData } from "../app/utils/Storage";
import SchoolCard from "../components/SchoolCard";
import {
  checkTyelimhlophe,
  getSchools,
  searchSchools,
} from "./db/ReferenceDatabase";


export default function Schools() {
  const [schools, setSchools] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  // removed unused subjects state

  const loadSchools = async () => {
    try {
      setLoading(true);

      console.log("Loading schools...");

      const data = await getSchools();

      console.log("Schools:", data);

      //Save schools locally(saving database data locally)
      await saveData("schools",data);

      //use the data
      setSchools(data);
    }catch(error){
      console.error("Could not load schools from database:",error);

      //Try cached data instead
      const cachedSchools= await getData("schools");

      if (cachedSchools){
        console.log("Using cached schools", cachedSchools);
        setSchools(cachedSchools);
      }
    }finally{
      setLoading(false);
    }
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

  useEffect(() => {
    loadSchools();
    checkTyelimhlophe();
  }, []);

  // removed unused stream/subject related code
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schools</Text>

      <TextInput
        style={styles.searchInput}
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
          renderItem={({ item }) => <SchoolCard school={item} />}
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
    backgroundColor: "#FFFFFF",
    padding: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#008C95",
    textAlign: "center",
    marginBottom: 16,
  },

  searchInput: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E0E0E0",

    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  schoolName: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#008C95",
    marginBottom: 8,
  },

  schoolInfo: {
    fontSize: 14,
    color: "#333333",
    marginBottom: 5,
  },

  subjects: {
    fontSize: 14,
    color: "#555555",
    marginTop: 8,
    lineHeight: 20,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#666666",
  },
});