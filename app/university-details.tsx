import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { universityCovers } from "../assets/university-covers/coverMap";
import { universityLogos } from "../assets/university-logos/logoMap";
import { getCoursesByUniversity, getUniversityById } from "./db/ReferenceDatabase";

const TURQUOISE = "#14B8A6";

const groupByFaculty = (courses: any[]) => {
  return courses.reduce((groups: any, course: any) => {
    const faculty = course.faculty || "Other";

    if (!groups[faculty]) {
      groups[faculty] = [];
    }

    groups[faculty].push(course);

    return groups;
  }, {});
};

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function UniversityDetails() {
  const router = useRouter();
  const { id, name } = useLocalSearchParams();

  const [courses, setCourses] = useState<any[]>([]);
  const [university, setUniversity] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const data = await getCoursesByUniversity(Number(id));
      setCourses(data);

      const uni = await getUniversityById(Number(id));
      setUniversity(uni);
    };

    load();
  }, [id]);

  const groupedCourses = groupByFaculty(courses);
  const numericId = Number(id);
  const coverImage = universityCovers[numericId];
  const logoImage = universityLogos[numericId];

  const handleApply = () => {
    if (university?.application_link) {
      Linking.openURL(university.application_link);
    }
  };

  const handleEnquire = () => {
    if (university?.contact) {
      Linking.openURL(`tel:${university.contact}`);
    }
  };

  const handleWebsite = () => {
    if (university?.website) {
      Linking.openURL(university.website);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Cover photo */}
      <View style={styles.coverWrapper}>
        {coverImage ? (
          <Image source={coverImage} style={styles.coverImage} resizeMode="cover" />
        ) : (
          <View style={styles.coverFallback} />
        )}

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>

        <View style={styles.logoBadge}>
          {logoImage ? (
            <Image source={logoImage} style={styles.logoImage} resizeMode="contain" />
          ) : (
            <Text style={styles.logoPlaceholderText}>
              {String(name || "?").charAt(0)}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.title}>{name}</Text>

        {university?.city ? (
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color="#6B7280" style={styles.pin} />
            <Text style={styles.locationText}>{university.city}</Text>
          </View>
        ) : null}

        {university?.application_open_date && university?.application_close_date ? (
          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={14} color="#6B7280" style={styles.calendarIcon} />
            <Text style={styles.dateText}>
              {formatDate(university.application_open_date)} - {formatDate(university.application_close_date)}
            </Text>
          </View>
        ) : null}

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionButton} onPress={handleApply}>
            <Text style={styles.actionButtonText}>Apply</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleEnquire}>
            <Text style={styles.actionButtonText}>Enquire</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleWebsite}>
            <Text style={styles.actionButtonText}>Website</Text>
          </TouchableOpacity>
        </View>

        {university?.description ? (
          <View style={styles.aboutSection}>
            <Text style={styles.aboutHeading}>About</Text>
            <Text style={styles.aboutText}>{university.description}</Text>
          </View>
        ) : null}
      </View>

      {Object.keys(groupedCourses).map((faculty) => (
        <View key={faculty} style={{ marginBottom: 35 }}>
          <Text style={styles.facultyTitle}>{faculty}</Text>

          <ScrollView horizontal>
            <View>
              <View style={styles.headerRow}>
                <Text style={styles.headerCell}>Qualification</Text>
                <Text style={styles.headerCell}>Qualification Type</Text>
                <Text style={styles.headerCell}>Duration</Text>
                <Text style={styles.headerCell}>APS</Text>
                <Text style={styles.headerCell}>English</Text>
                <Text style={styles.headerCell}>Mathematics</Text>
              </View>

              {groupedCourses[faculty].map((course: any) => (
                <View key={course.id} style={styles.row}>
                  <Text style={styles.cell}>{course.qualification}</Text>
                  <Text style={styles.cell}>{course.qualification_type}</Text>
                  <Text style={styles.cell}>{course.duration}</Text>
                  <Text style={styles.cell}>{course.minimum_aps}</Text>
                  <Text style={styles.cell}>{course.english_hl}</Text>
                  <Text style={styles.cell}>{course.mathematics}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
}

const COVER_HEIGHT = 260;
const LOGO_SIZE = 96;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  coverWrapper: {
    height: COVER_HEIGHT,
    backgroundColor: "#E5E7EB",
  },

  coverImage: {
    width: "100%",
    height: "100%",
  },

  coverFallback: {
    width: "100%",
    height: "100%",
    backgroundColor: TURQUOISE,
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  backArrow: {
    color: "#fff",
    fontSize: 26,
    marginTop: -2,
  },

  logoBadge: {
    position: "absolute",
    bottom: -LOGO_SIZE / 2,
    left: 20,
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  logoImage: {
    width: "75%",
    height: "75%",
  },

  logoPlaceholderText: {
    fontSize: 32,
    fontWeight: "bold",
    color: TURQUOISE,
  },

  infoSection: {
    paddingTop: LOGO_SIZE / 2 + 16,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 6,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  pin: {
    fontSize: 13,
    marginRight: 4,
  },

  locationText: {
    fontSize: 14,
    color: "#6B7280",
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  calendarIcon: {
    fontSize: 13,
    marginRight: 6,
  },

  dateText: {
    fontSize: 14,
    color: "#6B7280",
  },

  buttonRow: {
    flexDirection: "row",
    marginBottom: 20,
  },

  actionButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: TURQUOISE,
    borderRadius: 10,
    paddingVertical: 12,
    marginRight: 10,
    alignItems: "center",
  },

  actionButtonText: {
    color: TURQUOISE,
    fontWeight: "700",
    fontSize: 14,
  },

  aboutSection: {
    marginBottom: 10,
  },

  aboutHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },

  aboutText: {
    fontSize: 14,
    color: "#444",
    lineHeight: 21,
  },

  facultyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0057A3",
    marginLeft: 20,
    marginBottom: 10,
  },

  headerRow: {
    flexDirection: "row",
    backgroundColor: "#0057A3",
  },

  headerCell: {
    width: 180,
    color: "#fff",
    fontWeight: "bold",
    padding: 12,
  },

  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  cell: {
    width: 180,
    padding: 12,
  },
});