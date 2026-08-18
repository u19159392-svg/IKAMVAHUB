import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import {
  getSchools,
  searchSchools
} from "./db/ReferenceDatabase";

// ─── Types ───────────────────────────────────────────────────
type School = {
  id: number;
  name: string;
  province: string;
  type: string;
  location: string;
  contact: string;
  email: string;
  subjects_offered: string;
};

// ─── Constants ───────────────────────────────────────────────
const TEAL = "#0F8B8D";
const TEAL_DARK = "#0A6C6D";
const TEAL_LIGHT = "#E6F7F7";
const TEAL_BANNER = "#0A7A7C";

const AREA_OPTIONS = ["All Areas", "Mount Frere", "Tabankulu", "Bizana"];
const TYPE_OPTIONS = ["All School Types", "Public", "Private", "Combined"];
const PROVINCE_OPTIONS = [
  "All Provinces",
  "Eastern Cape",
  "Western Cape",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Free State",
  "Northern Cape",
];

// ─── Dropdown Component ──────────────────────────────────────
function Dropdown({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <View style={dd.wrapper}>
      <TouchableOpacity
        style={dd.trigger}
        onPress={() => setOpen(!open)}
        activeOpacity={0.8}
      >
        <Text style={dd.triggerText} numberOfLines={1}>
          {selected}
        </Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={14}
          color="#555"
        />
      </TouchableOpacity>

      {open && (
        <View style={dd.list}>
          {options.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[dd.option, selected === opt && dd.optionActive]}
              onPress={() => {
                onSelect(opt);
                setOpen(false);
              }}
            >
              <Text
                style={[dd.optionText, selected === opt && dd.optionTextActive]}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

// ─── Stat Card ───────────────────────────────────────────────
function StatCard({
  icon,
  value,
  label,
}: {
  icon: string;
  value: string;
  label: string;
}) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// ─── Main Screen ─────────────────────────────────────────────
export default function HighSchools() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const [allSchools, setAllSchools] = useState<School[]>([]);
  const [displayed, setDisplayed] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [province, setProvince] = useState("All Provinces");
  const [schoolType, setSchoolType] = useState("All School Types");
  const [area, setArea] = useState("All Areas");

  // load all schools on mount
  useEffect(() => {
    (async () => {
      const data = (await getSchools()) as School[];
      setAllSchools(data);
      setDisplayed(data);
      setLoading(false);
    })();
  }, []);

  // apply filters whenever filter values change (but NOT on every keystroke –
  // the search button handles text search)
  const applyFilters = useCallback(
    async (text: string, prov: string, type: string, loc: string) => {
      setSearching(true);
      try {
        let results: School[];

        if (text.trim()) {
          results = (await searchSchools(text.trim())) as School[];
        } else {
          results = (await getSchools()) as School[];
        }

        // client-side province filter
        if (prov !== "All Provinces") {
          results = results.filter((s) => s.province === prov);
        }

        // client-side type filter
        if (type !== "All School Types") {
          results = results.filter((s) => s.type === type);
        }

        // client-side area (location) filter
        if (loc !== "All Areas") {
          results = results.filter(
            (s) =>
              s.location?.toLowerCase().includes(loc.toLowerCase()),
          );
        }

        setDisplayed(results);
      } finally {
        setSearching(false);
      }
    },
    [],
  );

  const handleSearchPress = () => {
    applyFilters(searchText, province, schoolType, area);
  };

  const handleClearSearch = () => {
    setSearchText("");
    applyFilters("", province, schoolType, area);
  };

  // re-run whenever dropdowns change
  useEffect(() => {
    applyFilters(searchText, province, schoolType, area);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [province, schoolType, area]);

  // ── Featured schools (first 4 for horizontal carousel) ───
  const featured = allSchools.slice(0, 4);

  // ── Render ────────────────────────────────────────────────
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={TEAL} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={TEAL_DARK} />

      <FlatList
        data={displayed}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <>
            {/* ── Hero Banner ──────────────────────────────────── */}
            <View style={styles.hero}>
              <View style={styles.heroContent}>
                <View style={styles.heroBadge}>
                  <MaterialIcons name="home-work" size={13} color="#fff" />
                  <Text style={styles.heroBadgeText}>Our Main Focus</Text>
                </View>

                <Text style={styles.heroTitle}>
                  Find the Right School{"\n"}
                  <Text style={styles.heroTitleAccent}>in Mount Frere</Text>
                </Text>

                <Text style={styles.heroSubtitle}>
                  Explore secondary schools in the Mount Frere Education Area.
                  {"\n"}Compare subjects, facilities, activities and contact
                  details.{"\n"}All information available offline.
                </Text>

                <View style={styles.heroButtons}>
                  <TouchableOpacity
                    style={styles.heroBtnPrimary}
                    onPress={() =>
                      applyFilters("", "All Provinces", "All School Types", "All Areas")
                    }
                  >
                    <Ionicons name="search" size={15} color={TEAL_DARK} />
                    <Text style={styles.heroBtnPrimaryText}>
                      Explore Schools
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.heroBtnSecondary}
                    onPress={() =>
                      applyFilters(searchText, province, schoolType, "Mount Frere")
                    }
                  >
                    <Ionicons
                      name="location-outline"
                      size={15}
                      color="#fff"
                    />
                    <Text style={styles.heroBtnSecondaryText}>
                      Find a School Near Me
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* ── Search Card ───────────────────────────────────── */}
            <View style={styles.searchCard}>
              <Text style={styles.searchCardTitle}>Search for a School</Text>

              {/* Text input row */}
              <View style={styles.searchRow}>
                <Ionicons
                  name="search-outline"
                  size={18}
                  color="#999"
                  style={{ marginRight: 8 }}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search by school name..."
                  placeholderTextColor="#aaa"
                  value={searchText}
                  onChangeText={setSearchText}
                  returnKeyType="search"
                  onSubmitEditing={handleSearchPress}
                />
                {searchText.length > 0 && (
                  <TouchableOpacity onPress={handleClearSearch}>
                    <Ionicons name="close-circle" size={18} color="#aaa" />
                  </TouchableOpacity>
                )}
              </View>

              {/* Filter dropdowns */}
              <View style={styles.filterRow}>
                <Dropdown
                  options={PROVINCE_OPTIONS}
                  selected={province}
                  onSelect={setProvince}
                />
                <Dropdown
                  options={TYPE_OPTIONS}
                  selected={schoolType}
                  onSelect={setSchoolType}
                />
                <Dropdown
                  options={AREA_OPTIONS}
                  selected={area}
                  onSelect={setArea}
                />
              </View>

              {/* Search button */}
              <TouchableOpacity
                style={styles.searchButton}
                onPress={handleSearchPress}
                activeOpacity={0.85}
              >
                {searching ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <Ionicons name="search" size={16} color="#fff" />
                    <Text style={styles.searchButtonText}>Search Schools</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* ── Stats Row ─────────────────────────────────────── */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.statsRow}
            >
              <StatCard
                icon="🏫"
                value={`${allSchools.length}+`}
                label="Secondary Schools"
              />
              <StatCard icon="📋" value="5+" label="School Types" />
              <StatCard icon="📖" value="10+" label="Areas Covered" />
              <StatCard icon="📚" value="100+" label="Subjects Offered" />
              <StatCard icon="📶" value="Offline" label="Access Anywhere" />
            </ScrollView>

            {/* ── Featured Schools ──────────────────────────────── */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Explore Schools in Mount Frere
              </Text>
              <TouchableOpacity
                onPress={() =>
                  applyFilters("", "All Provinces", "All School Types", "All Areas")
                }
              >
                <Text style={styles.viewAll}>View All Schools →</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredList}
            >
              {featured.map((school) => (
                <TouchableOpacity
                  key={school.id}
                  style={styles.featuredCard}
                  onPress={() =>
                    router.push(`/SchoolDetails?id=${school.id}` as any)
                  }
                  activeOpacity={0.85}
                >
                  {/* Shield icon placeholder */}
                  <View style={styles.schoolBadge}>
                    <MaterialIcons name="school" size={28} color={TEAL} />
                  </View>

                  <Text style={styles.featuredName} numberOfLines={2}>
                    {school.name}
                  </Text>

                  <View style={styles.featuredLocation}>
                    <Ionicons
                      name="location-outline"
                      size={12}
                      color="#888"
                    />
                    <Text style={styles.featuredLocationText}>
                      {school.location || "Mount Frere"}
                    </Text>
                  </View>

                  <View style={styles.featuredFooter}>
                    <View style={styles.typeBadge}>
                      <Text style={styles.typeBadgeText}>{school.type}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.viewSchoolBtn}
                      onPress={() =>
                        router.push(`/SchoolDetails?id=${school.id}` as any)
                      }
                    >
                      <Text style={styles.viewSchoolBtnText}>View School</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* ── Info Features Row ─────────────────────────────── */}
            <View style={styles.featuresSection}>
              <Text style={styles.featuresTitle}>
                Everything You Need to Know About a School
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.featuresList}
              >
                {[
                  { icon: "📖", title: "Subjects", desc: "See subjects offered\nby each school" },
                  { icon: "🏛", title: "Facilities", desc: "Explore facilities and\nresources available" },
                  { icon: "⚽", title: "Activities", desc: "Find sports and\nextracurriculars" },
                  { icon: "📞", title: "Contact Info", desc: "Find contact details\nand location" },
                  { icon: "📄", title: "Application Info", desc: "Access application\ninformation" },
                  { icon: "📶", title: "Works Offline", desc: "Access information\nwithout internet" },
                ].map((f) => (
                  <View key={f.title} style={styles.featureCard}>
                    <Text style={styles.featureIcon}>{f.icon}</Text>
                    <Text style={styles.featureTitle}>{f.title}</Text>
                    <Text style={styles.featureDesc}>{f.desc}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* ── All Schools section heading ───────────────────── */}
            <View style={styles.allSchoolsHeader}>
              <Text style={styles.allSchoolsTitle}>
                {displayed.length === allSchools.length
                  ? `All ${allSchools.length} Schools`
                  : `${displayed.length} Result${displayed.length !== 1 ? "s" : ""} Found`}
              </Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listCard}
            onPress={() =>
              router.push(`/SchoolDetails?id=${item.id}` as any)
            }
            activeOpacity={0.85}
          >
            <View style={styles.listCardLeft}>
              <View style={styles.listBadge}>
                <MaterialIcons name="school" size={22} color={TEAL} />
              </View>
            </View>

            <View style={styles.listCardBody}>
              <Text style={styles.listName}>{item.name}</Text>
              <View style={styles.listMeta}>
                <Ionicons name="location-outline" size={13} color="#888" />
                <Text style={styles.listLocation}>
                  {item.location || "Mount Frere"}
                </Text>
              </View>
              <View style={styles.listFooter}>
                <View style={styles.typeBadge}>
                  <Text style={styles.typeBadgeText}>{item.type}</Text>
                </View>
                <View style={styles.provinceBadge}>
                  <Text style={styles.provinceBadgeText}>
                    {item.province}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.listViewBtn}
              onPress={() =>
                router.push(`/SchoolDetails?id=${item.id}` as any)
              }
            >
              <Text style={styles.listViewBtnText}>View</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color="#ccc" />
            <Text style={styles.emptyTitle}>No schools found</Text>
            <Text style={styles.emptyDesc}>
              Try adjusting your search or filters
            </Text>
            <TouchableOpacity
              style={styles.emptyReset}
              onPress={() => {
                setSearchText("");
                setProvince("All Provinces");
                setSchoolType("All School Types");
                setArea("All Areas");
                setDisplayed(allSchools);
              }}
            >
              <Text style={styles.emptyResetText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </View>
  );
}

// ─── Dropdown Styles ────────────────────────────────────────
const dd = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: "relative",
    zIndex: 10,
    marginHorizontal: 3,
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  triggerText: {
    fontSize: 12,
    color: "#333",
    flex: 1,
    marginRight: 4,
  },
  list: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    zIndex: 999,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    maxHeight: 200,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  optionActive: {
    backgroundColor: "#E6F7F7",
  },
  optionText: {
    fontSize: 13,
    color: "#333",
  },
  optionTextActive: {
    color: TEAL,
    fontWeight: "600",
  },
});

// ─── Main Styles ─────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F8FAFA",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFA",
  },

  // ── Hero ───────────────────────────────────────────────────
  hero: {
    backgroundColor: TEAL,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 36,
  },
  heroContent: {
    maxWidth: 420,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  heroBadgeText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
    marginLeft: 5,
    fontWeight: "500",
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    lineHeight: 36,
    marginBottom: 12,
  },
  heroTitleAccent: {
    color: "#B2EBF2",
  },
  heroSubtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.82)",
    lineHeight: 20,
    marginBottom: 20,
  },
  heroButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  heroBtnPrimary: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 8,
    gap: 6,
  },
  heroBtnPrimaryText: {
    color: TEAL_DARK,
    fontWeight: "700",
    fontSize: 13,
  },
  heroBtnSecondary: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 8,
    gap: 6,
  },
  heroBtnSecondaryText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },

  // ── Search Card ────────────────────────────────────────────
  searchCard: {
    backgroundColor: "#fff",
    marginHorizontal: 14,
    marginTop: -18,
    borderRadius: 14,
    padding: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    zIndex: 5,
    marginBottom: 6,
  },
  searchCardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 10,
    backgroundColor: "#FAFAFA",
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    paddingVertical: 8,
  },
  filterRow: {
    flexDirection: "row",
    marginBottom: 12,
    zIndex: 20,
  },
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: TEAL_DARK,
    paddingVertical: 13,
    borderRadius: 10,
    gap: 8,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  // ── Stats ──────────────────────────────────────────────────
  statsRow: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    minWidth: 100,
    borderWidth: 1,
    borderColor: "#EBEBEB",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  statIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "800",
    color: TEAL,
  },
  statLabel: {
    fontSize: 11,
    color: "#777",
    textAlign: "center",
    marginTop: 2,
  },

  // ── Section header ─────────────────────────────────────────
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },
  viewAll: {
    fontSize: 13,
    color: TEAL,
    fontWeight: "600",
  },

  // ── Featured Cards (horizontal) ────────────────────────────
  featuredList: {
    paddingHorizontal: 14,
    paddingBottom: 4,
    gap: 12,
  },
  featuredCard: {
    width: 180,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#EBEBEB",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  schoolBadge: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: TEAL_LIGHT,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  featuredName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 6,
    lineHeight: 20,
  },
  featuredLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 3,
  },
  featuredLocationText: {
    fontSize: 12,
    color: "#888",
  },
  featuredFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 6,
  },
  typeBadge: {
    backgroundColor: TEAL_LIGHT,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  typeBadgeText: {
    fontSize: 11,
    color: TEAL_DARK,
    fontWeight: "600",
  },
  viewSchoolBtn: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: TEAL,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  viewSchoolBtnText: {
    fontSize: 11,
    color: TEAL,
    fontWeight: "600",
  },

  // ── Features Section ───────────────────────────────────────
  featuresSection: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
  },
  featuresList: {
    gap: 10,
    paddingBottom: 4,
  },
  featureCard: {
    width: 120,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EBEBEB",
  },
  featureIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
    textAlign: "center",
  },
  featureDesc: {
    fontSize: 11,
    color: "#777",
    textAlign: "center",
    lineHeight: 16,
  },

  // ── All Schools List ───────────────────────────────────────
  allSchoolsHeader: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  allSchoolsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },
  listCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 14,
    marginBottom: 10,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#EBEBEB",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  listCardLeft: {
    marginRight: 12,
  },
  listBadge: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: TEAL_LIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  listCardBody: {
    flex: 1,
  },
  listName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  listMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginBottom: 6,
  },
  listLocation: {
    fontSize: 12,
    color: "#888",
  },
  listFooter: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
  },
  provinceBadge: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  provinceBadgeText: {
    fontSize: 11,
    color: "#555",
    fontWeight: "500",
  },
  listViewBtn: {
    backgroundColor: TEAL,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  listViewBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },

  // ── Empty State ────────────────────────────────────────────
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginTop: 12,
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
  },
  emptyReset: {
    backgroundColor: TEAL,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  emptyResetText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});
