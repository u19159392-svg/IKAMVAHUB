import React, { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { getSubjectsByStream } from "./db/Database";
type Stream = "Science" | "Arts" | "Commerce";

interface Subject {
  id: number;
  name: string;
  stream: Stream;
}
export default function SubjectsScreen() {
  const [selectedStream, setSelectedStream] =
    useState<Stream>("Science");

  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    loadSubjects("Science");
  }, []);

  const loadSubjects = (stream: Stream) => {
    const data = getSubjectsByStream(stream);
    setSubjects(data);
  };

  const handleStreamPress = (stream: Stream) => {
    setSelectedStream(stream);
    loadSubjects(stream);
  };

  const renderSubject = ({ item }: { item: Subject }) => (
    <View style={styles.subjectCard}>
      <Text style={styles.subjectName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Stream Filter Tabs */}

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedStream === "Science" && styles.activeTab,
          ]}
          onPress={() => handleStreamPress("Science")}
        >
          <Text
            style={[
              styles.tabText,
              selectedStream === "Science" &&
                styles.activeTabText,
            ]}
          >
            Science
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            selectedStream === "Arts" && styles.activeTab,
          ]}
          onPress={() => handleStreamPress("Arts")}
        >
          <Text
            style={[
              styles.tabText,
              selectedStream === "Arts" &&
                styles.activeTabText,
            ]}
          >
            Arts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            selectedStream === "Commerce" &&
              styles.activeTab,
          ]}
          onPress={() => handleStreamPress("Commerce")}
        >
          <Text
            style={[
              styles.tabText,
              selectedStream === "Commerce" &&
                styles.activeTabText,
            ]}
          >
            Commerce
          </Text>
        </TouchableOpacity>
      </View>

      {/* Subject List */}

      <FlatList
        data={subjects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSubject}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
  },

  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginBottom: 20,
  },

  tab: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#E5E5E5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#1E88E5",
  },

  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },

  activeTabText: {
    color: "#FFFFFF",
  },

  subjectCard: {
    backgroundColor: "#F5F5F5",
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
  },

  subjectName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
  },
});
