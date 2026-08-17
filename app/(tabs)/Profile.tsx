import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>

        <TouchableOpacity onPress={() => router.push("/profile-details")}>
          <Ionicons name="create-outline" size={22} color="#14B8A6" />
        </TouchableOpacity>
      </View>

      {/* PROFILE */}
      <View style={styles.profileBox}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }}
          style={styles.avatar}
        />

        <Text style={styles.name}>Name</Text>
        <Text style={styles.email}>Name@gmail.com</Text>
      </View>

      {/* OPTIONS */}
      <View style={styles.card}>

        <Option
          icon="person-outline"
          title="Personal Information"
          onPress={() => router.push("/profile-details")}
        />


        <Option
          icon="bookmark-outline"
          title="Saved Items"
          onPress={() => alert("Saved")}
        />

        <Option
          icon="settings-outline"
          title="Settings"
          onPress={() => router.push("/settings")}
        />

        <Option
          icon="help-circle-outline"
          title="Help & Support"
          onPress={() => router.push("/help")}
        />

      </View>

      {/* LOGOUT */}
      <TouchableOpacity
        style={styles.logout}
        onPress={() => alert("Logged out")}
      >
        <Ionicons name="log-out-outline" size={22} color="red" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
}

function Option({ icon, title, onPress }: any) {
  return (
    <TouchableOpacity style={styles.option} onPress={onPress}>
      <Ionicons name={icon} size={22} color="#333" />
      <Text style={styles.optionText}>{title}</Text>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  profileBox: {
    alignItems: "center",
    marginVertical: 20,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  email: {
    color: "#777",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  optionText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
  },

  logout: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  logoutText: {
    marginLeft: 10,
    color: "red",
    fontWeight: "bold",
  },
});
