/** @jsxImportSource react */
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Homescreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>IKAMVA HUB</Text>
        <Text style={styles.subtitle}>
          Helping students discover educational and career opportunities in the
          Eastern Cape.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/highschools" as any)}
      >
        <Text style={styles.icon}>🏫</Text>
        <View>
          <Text style={styles.cardTitle}>High Schools</Text>
          <Text style={styles.cardText}>
            Find high schools across the Eastern Cape.
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/bursaries" as any)}
      >
        <Text style={styles.icon}>💰</Text>
        <View>
          <Text style={styles.cardTitle}>Bursaries</Text>
          <Text style={styles.cardText}>
            Explore bursaries and student funding.
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/mentorship" as any)}
      >
        <Text style={styles.icon}>🤝</Text>
        <View>
          <Text style={styles.cardTitle}>Mentorship</Text>
          <Text style={styles.cardText}>
            Connect with mentors and career guidance.
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/universities" as any)}
      >
        <Text style={styles.icon}>🎓</Text>
        <View>
          <Text style={styles.cardTitle}>Universities & Colleges</Text>
          <Text style={styles.cardText}>
            Browse universities and TVET colleges.
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/industries" as any)}
      >
        <Text style={styles.icon}>🏭</Text>
        <View>
          <Text style={styles.cardTitle}>Industries & Factories</Text>
          <Text style={styles.cardText}>
            Discover industries and career opportunities.
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FA",
    padding: 20,
  },

  header: {
    backgroundColor: "#005B96",
    borderRadius: 20,
    padding: 25,
    marginBottom: 25,
  },

  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 22,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
  },

  icon: {
    fontSize: 35,
    marginRight: 20,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#005B96",
  },

  cardText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    width: 240,
  },
});