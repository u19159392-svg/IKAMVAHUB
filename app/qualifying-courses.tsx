// app/qualifying-courses.tsx
//
// Shows the courses the learner qualifies for, based on their most recently
// saved APS calculation. Reachable from anywhere in the app — the university
// browsing screens, a menu button, etc. — not just right after the calculator.

import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { getAllCourses } from './db/ReferenceDatabase'; // added in Step 6
import { ApsResult, getApsResult } from './utils/apsStorage';
import { Course, getQualifyingCourses } from './utils/eligibility';

export default function QualifyingCoursesScreen() {
  const [apsResult, setApsResult] = useState<ApsResult | null>(null);
  const [qualifyingCourses, setQualifyingCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const saved = await getApsResult();
      setApsResult(saved);

      if (saved) {
        const allCourses = (await getAllCourses()) as Course[];
        const matches = getQualifyingCourses(
          allCourses,
          saved.total,
          saved.breakdown,
        );
        setQualifyingCourses(matches);
      }

      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // No APS result saved yet — send them to the calculator first
  if (!apsResult) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>
          You haven't calculated your APS yet.
        </Text>
        <TouchableOpacity
          style={styles.calculateButton}
          onPress={() => router.push('/aps-calculator')}
        >
          <Text style={styles.calculateButtonText}>Calculate my APS</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const calculatedDate = new Date(apsResult.calculatedAt).toLocaleDateString();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Courses You Qualify For</Text>
      <Text style={styles.subheading}>
        Based on your APS of {apsResult.total}, calculated on {calculatedDate}
      </Text>

      <TouchableOpacity
        style={styles.recalculateLink}
        onPress={() => router.push('/aps-calculator')}
      >
        <Text style={styles.recalculateLinkText}>Recalculate my APS</Text>
      </TouchableOpacity>

      {qualifyingCourses.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>
            No courses match your current APS yet.
          </Text>
        </View>
      ) : (
        <FlatList
          data={qualifyingCourses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.courseCard}>
              <Text style={styles.courseName}>{item.qualification}</Text>
              <Text style={styles.courseFaculty}>{item.faculty}</Text>
              <Text style={styles.courseMeta}>
                {item.qualification_type} · {item.duration}
                {item.minimum_aps != null ? ` · APS ${item.minimum_aps}+` : ''}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  subheading: { fontSize: 14, color: '#666', marginBottom: 12 },
  recalculateLink: { marginBottom: 16 },
  recalculateLinkText: { color: '#1E88E5', fontWeight: '600' },
  emptyText: { fontSize: 15, textAlign: 'center', color: '#666', marginBottom: 16 },
  calculateButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  calculateButtonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 16 },
  courseCard: {
    backgroundColor: '#F5F5F5',
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
  },
  courseName: { fontSize: 17, fontWeight: '600', color: '#000' },
  courseFaculty: { fontSize: 14, color: '#1E88E5', marginTop: 4 },
  courseMeta: { fontSize: 13, color: '#666', marginTop: 4 },
});