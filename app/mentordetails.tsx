import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getMentorById } from "./db/ReferenceDatabase";

export default function MentorDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [mentor, setMentor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getMentorById(Number(id));
      setMentor(data);
      setLoading(false);
    })();
  }, [id]);

  useEffect(() => {
    const loadMentor = async () => {
      const data = await getMentorById(Number(id));
      setMentor(data);
      setLoading(false);
    };

    loadMentor();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!mentor) {
    return (
      <View style={styles.centered}>
        <Text>Mentor not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: mentor.profile_pic || "https://i.pravatar.cc/150?img=1",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{mentor.name}</Text>
        <Text style={styles.field}>{mentor.field}</Text>
      </View>

      <View style={styles.divider} />

      {/* Bio */}
      <Text style={styles.sectionTitle}>📖 About</Text>
      <Text style={styles.bio}>{mentor.bio || "No bio available"}</Text>

      {/* Contact */}
      <Text style={styles.sectionTitle}>📞 Contact</Text>
      <TouchableOpacity onPress={() => Linking.openURL(`tel:${mentor.phone}`)}>
        <Text style={styles.contactText}>📱 {mentor.phone || "N/A"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Linking.openURL(`mailto:${mentor.email}`)}
      >
        <Text style={styles.contactText}>✉️ {mentor.email || "N/A"}</Text>
      </TouchableOpacity>

      {/* Availability */}
      <Text style={styles.sectionTitle}>🕐 Availability</Text>
      <Text style={styles.availability}>
        {mentor.availability || "Not specified"}
      </Text>

      {/* Contact Button */}
      <TouchableOpacity
        style={styles.contactButton}
        onPress={() => Linking.openURL(`mailto:${mentor.email}`)}
      >
        <Text style={styles.contactButtonText}>Reach Out to Mentor</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    marginBottom: 12,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#14B8A6",
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0F766E",
  },
  field: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  bio: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
    marginBottom: 16,
  },
  contactText: {
    fontSize: 15,
    color: "#007AFF",
    marginBottom: 8,
    textDecorationLine: "underline",
  },
  availability: {
    fontSize: 15,
    color: "#14B8A6",
    marginBottom: 16,
  },
  contactButton: {
    backgroundColor: "#14B8A6",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  contactButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
