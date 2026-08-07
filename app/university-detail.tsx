// app/university-detail.tsx
//
// Shows one institution's faculties as collapsible dropdowns. Tap a faculty
// to expand it and see its courses underneath. Works for both universities
// and colleges — the `type` param decides which institution_type to query.
//
// Toggle: "All courses" vs "Courses I qualify for" — the latter filters
// this institution's courses against the learner's saved APS result.

import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getCoursesByInstitution } from './db/ReferenceDatabase';
import { ApsResult, getApsResult } from './utils/apsStorage';
import { Course, isEligible } from './utils/eligibility';

type FacultyGroup = {
  faculty: string;
  courses: Course[];
};

export default function UniversityDetailScreen() {
  const { id, name, type } = useLocalSearchParams<{
    id: string;
    name: string;
    type?: string;
  }>();

  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [apsResult, setApsResult] = useState<ApsResult | null>(null);
  const [showQualifyingOnly, setShowQualifyingOnly] = useState(false);
  const [expandedFaculties, setExpandedFaculties] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const institutionType = type === 'college' ? 'college' : 'university';

  useEffect(() => {
    const load = async () => {
      const [courses, saved] = await Promise.all([
        getCoursesByInstitution(parseInt(id, 10), institutionType) as Promise<Course[]>,
        getApsResult(),
      ]);
      setAllCourses(courses);
      setApsResult(saved);
      setLoading(false);
    };
    load();
  }, [id, institutionType]);

  const visibleCourses =
    showQualifyingOnly && apsResult
      ? allCourses.filter((course) => isEligible(course, apsResult.total, apsResult.breakdown))
      : allCourses;

  const facultyGroups = groupByFaculty(visibleCourses);

  function groupByFaculty(courses: Course[]): FacultyGroup[] {
    const map = new Map<string, Course[]>();
    for (const course of courses) {
      const key = course.faculty || 'Other';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(course);
    }
    return Array.from(map.entries())
      .map(([faculty, courses]) => ({ faculty, courses }))
      .sort((a, b) => a.faculty.localeCompare(b.faculty));
  }

  const toggleFaculty = (faculty: string) => {
    setExpandedFaculties((prev) => {
      const next = new Set(prev);
      if (next.has(faculty)) {
        next.delete(faculty);
      } else {
        next.add(faculty);
      }
      return next;
    });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>{name}</Text>
      <Text style={styles.subheading}>Faculties</Text>

      {/* Toggle: All courses vs Courses I qualify for */}
      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleButton, !showQualifyingOnly && styles.toggleButtonActive]}
          onPress={() => setShowQualifyingOnly(false)}
        >
          <Text style={[styles.toggleText, !showQualifyingOnly && styles.toggleTextActive]}>
            All Courses
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, showQualifyingOnly && styles.toggleButtonActive]}
          onPress={() => setShowQualifyingOnly(true)}
        >
          <Text style={[styles.toggleText, showQualifyingOnly && styles.toggleTextActive]}>
            What I Qualify For
          </Text>
        </TouchableOpacity>
      </View>

      {showQualifyingOnly && !apsResult && (
        <Text style={styles.apsHint}>
          You haven't calculated your APS yet — showing all courses instead.
        </Text>
      )}
      {showQualifyingOnly && apsResult && (
        <Text style={styles.apsHint}>Based on your APS of {apsResult.total}</Text>
      )}

      {facultyGroups.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>
            {showQualifyingOnly
              ? 'No courses at this institution match your APS yet.'
              : 'No courses have been added for this institution yet.'}
          </Text>
        </View>
      ) : (
        facultyGroups.map((group) => {
          const isExpanded = expandedFaculties.has(group.faculty);
          return (
            <View key={group.faculty} style={styles.facultySection}>
              <TouchableOpacity
                style={styles.facultyHeader}
                onPress={() => toggleFaculty(group.faculty)}
              >
                <Text style={styles.facultyName}>{group.faculty}</Text>
                <Text style={styles.facultyMeta}>
                  {group.courses.length} course{group.courses.length !== 1 ? 's' : ''}
                  {'  '}
                  {isExpanded ? '▲' : '▼'}
                </Text>
              </TouchableOpacity>

              {isExpanded &&
                group.courses.map((course) => (
                  <View key={course.id} style={styles.courseCard}>
                    <Text style={styles.courseName}>{course.qualification}</Text>
                    <Text style={styles.courseMeta}>
                      {course.qualification_type} · {course.duration}
                      {course.minimum_aps != null ? ` · APS ${course.minimum_aps}+` : ''}
                    </Text>
                  </View>
                ))}
            </View>
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  subheading: { fontSize: 14, color: '#666', marginBottom: 12 },
  emptyText: { fontSize: 15, textAlign: 'center', color: '#666' },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 4,
    marginBottom: 10,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#1E88E5',
  },
  toggleText: { fontSize: 13, fontWeight: '600', color: '#666' },
  toggleTextActive: { color: '#FFFFFF' },
  apsHint: { fontSize: 13, color: '#666', marginBottom: 12 },
  facultySection: {
    marginBottom: 12,
    borderRadius: 10,
    overflow: 'hidden',
  },
  facultyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E88E5',
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  facultyName: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', flex: 1 },
  facultyMeta: { fontSize: 13, color: '#E3F2FD' },
  courseCard: {
    backgroundColor: '#F5F5F5',
    marginTop: 8,
    padding: 15,
    borderRadius: 10,
  },
  courseName: { fontSize: 16, fontWeight: '600', color: '#000' },
  courseMeta: { fontSize: 13, color: '#666', marginTop: 4 },
});