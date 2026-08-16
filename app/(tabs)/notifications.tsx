import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const TEAL = "#14B8A6";

const notifications = [
  {
    id: "1",
    title: "NSFAS Applications Open",
    message: "Applications are now open. Apply before deadline.",
    time: "2h ago",
    unread: true,
    icon: "cash-outline",
  },
  {
    id: "2",
    title: "Task Reminder",
    message: "Apply for NSFAS today",
    time: "Today",
    unread: true,
    icon: "checkmark-circle-outline",
  },
  {
    id: "3",
    title: "University Update",
    message: "UP Open Day this Saturday",
    time: "Yesterday",
    unread: false,
    icon: "school-outline",
  },
  {
    id: "4",
    title: "New Bursary Available",
    message: "FNB Bursary now open",
    time: "1d ago",
    unread: false,
    icon: "wallet-outline",
  },
];

export default function NotificationsScreen() {
  const handleNotificationPress = (item: any) => {
    if (item.title.includes("NSFAS")) {
      router.push("/bursaries");
    } else if (item.title.includes("Task")) {
      router.push("/Task");
    } else if (item.title.includes("University")) {
      router.push("/universities");
    } else {
      router.push("/notifications");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleNotificationPress(item)}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
  <Ionicons
    name={item.icon as any}
    size={24}
    color={TEAL}
  />
</View>
            <View style={styles.content}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>

            {item.unread && <View style={styles.dot} />}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000000",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    alignItems: "center",
    elevation: 3,
  },

  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#E8FAF7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 3,
  },

  message: {
    fontSize: 13,
    color: "#666666",
  },

  time: {
    fontSize: 11,
    color: "#999999",
    marginTop: 4,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: TEAL,
    marginLeft: 8,
  },
});