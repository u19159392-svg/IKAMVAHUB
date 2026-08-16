import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Homescreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const categories = [
    {
      title: "Schools",
      description: "Find schools near you",
      icon: "school-outline" as const,
      route: "/highschools",
    },
    {
      title: "Careers",
      description: "Explore career paths",
      icon: "briefcase-outline" as const,
      route: "/careers",
    },
    {
      title: "Bursaries",
      description: "Find funding opportunities",
      icon: "cash-outline" as const,
      route: "/bursaries",
    },
    {
      title: "Universities",
      description: "Explore universities & colleges",
      icon: "business-outline" as const,
      route: "/universities",
    },
    {
      title: "Mentors",
      description: "Connect with mentors",
      icon: "people-outline" as const,
      route: "/mentorship",
    },
    {
      title: "Industries",
      description: "Discover industries",
      icon: "construct-outline" as const,
      route: "/industries",
    },
  ];

  const filteredCategories = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    if (!search) {
      return categories;
    }

    return categories.filter(
      (item) =>
        item.title.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search)
    );
  }, [searchText]);

  const openPage = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.welcome}>Welcome to</Text>

            <Text style={styles.title}>IKAMVAHUB</Text>

            <Text style={styles.slogan}>
              Find your school find your future
            </Text>
          </View>

          {/* Notifications */}
          <TouchableOpacity
            style={styles.notificationButton}
            activeOpacity={0.7}
            onPress={() => router.push("/notifications" as any)}
          >
            <Ionicons
              name="notifications-outline"
              size={22}
              color="#0F766E"
            />
          </TouchableOpacity>
        </View>

        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#777" />

          <TextInput
            style={styles.searchInput}
            placeholder="Search schools, careers, bursaries..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
          />

          {searchText.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchText("")}
              activeOpacity={0.7}
            >
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {/* SEARCH RESULTS */}
        {searchText.length > 0 && (
          <View style={styles.searchResults}>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((item) => (
                <TouchableOpacity
                  key={item.title}
                  style={styles.searchResultItem}
                  activeOpacity={0.7}
                  onPress={() => openPage(item.route)}
                >
                  <View style={styles.searchResultIcon}>
                    <Ionicons
                      name={item.icon}
                      size={21}
                      color="#14B8A6"
                    />
                  </View>

                  <View style={styles.searchResultText}>
                    <Text style={styles.searchResultTitle}>
                      {item.title}
                    </Text>

                    <Text style={styles.searchResultDescription}>
                      {item.description}
                    </Text>
                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color="#999"
                  />
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.noResults}>
                <Ionicons
                  name="search-outline"
                  size={28}
                  color="#999"
                />

                <Text style={styles.noResultsText}>
                  No results found
                </Text>

                <Text style={styles.noResultsSubtext}>
                  Try searching for schools, careers or bursaries.
                </Text>
              </View>
            )}
          </View>
        )}

        {/* HERO CARD */}
        <View style={styles.heroCard}>
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>
              Your future is in your hands.
            </Text>

            <Text style={styles.heroSubtitle}>
              Find the opportunities that can help you get there.
            </Text>
          </View>

          <View style={styles.heroIconContainer}>
            <Ionicons
              name="school"
              size={52}
              color="#FFFFFF"
            />
          </View>
        </View>

        {/* EXPLORE CATEGORIES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore Categories</Text>

          <TouchableOpacity
            onPress={() => router.push("/explore" as any)}
            activeOpacity={0.7}
          >
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoryGrid}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item.title}
              style={styles.categoryCard}
              activeOpacity={0.75}
              onPress={() => openPage(item.route)}
            >
              <View style={styles.categoryIcon}>
                <Ionicons
                  name={item.icon}
                  size={25}
                  color="#14B8A6"
                />
              </View>

              <Text style={styles.categoryTitle}>
                {item.title}
              </Text>

              <Text style={styles.categoryDescription}>
                {item.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* POPULAR */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular</Text>

          <TouchableOpacity
            onPress={() => router.push("/explore" as any)}
            activeOpacity={0.7}
          >
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* SCHOOLS */}
        <TouchableOpacity
          style={styles.popularCard}
          activeOpacity={0.75}
          onPress={() => router.push("/highschools" as any)}
        >
          <View style={styles.popularIcon}>
            <Ionicons
              name="school-outline"
              size={25}
              color="#14B8A6"
            />
          </View>

          <View style={styles.popularText}>
            <Text style={styles.popularTitle}>
              Nearby Schools
            </Text>

            <Text style={styles.popularDescription}>
              Find schools and start planning your future.
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#888"
          />
        </TouchableOpacity>

        {/* CAREERS */}
        <TouchableOpacity
          style={styles.popularCard}
          activeOpacity={0.75}
          onPress={() => router.push("/careers" as any)}
        >
          <View style={styles.popularIcon}>
            <Ionicons
              name="briefcase-outline"
              size={25}
              color="#14B8A6"
            />
          </View>

          <View style={styles.popularText}>
            <Text style={styles.popularTitle}>
              Top Careers
            </Text>

            <Text style={styles.popularDescription}>
              Discover careers that match your interests.
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#888"
          />
        </TouchableOpacity>

        {/* BURSARIES */}
        <TouchableOpacity
          style={styles.popularCard}
          activeOpacity={0.75}
          onPress={() => router.push("/bursaries" as any)}
        >
          <View style={styles.popularIcon}>
            <Ionicons
              name="cash-outline"
              size={25}
              color="#14B8A6"
            />
          </View>

          <View style={styles.popularText}>
            <Text style={styles.popularTitle}>
              Bursaries
            </Text>

            <Text style={styles.popularDescription}>
              Find funding opportunities for your studies.
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#888"
          />
        </TouchableOpacity>

        {/* UNIVERSITIES */}
        <TouchableOpacity
          style={styles.popularCard}
          activeOpacity={0.75}
          onPress={() => router.push("/universities" as any)}
        >
          <View style={styles.popularIcon}>
            <Ionicons
              name="business-outline"
              size={25}
              color="#14B8A6"
            />
          </View>

          <View style={styles.popularText}>
            <Text style={styles.popularTitle}>
              Universities & Colleges
            </Text>

            <Text style={styles.popularDescription}>
              Compare universities, colleges and courses.
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#888"
          />
        </TouchableOpacity>

        {/* MENTORS */}
        <TouchableOpacity
          style={styles.popularCard}
          activeOpacity={0.75}
          onPress={() => router.push("/mentorship" as any)}
        >
          <View style={styles.popularIcon}>
            <Ionicons
              name="people-outline"
              size={25}
              color="#14B8A6"
            />
          </View>

          <View style={styles.popularText}>
            <Text style={styles.popularTitle}>
              Mentors
            </Text>

            <Text style={styles.popularDescription}>
              Get guidance from people who can help.
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#888"
          />
        </TouchableOpacity>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F8F9",
  },

  container: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 30,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },

  headerText: {
    flex: 1,
    paddingRight: 10,
  },

  welcome: {
    fontSize: 14,
    color: "#444",
    marginBottom: 2,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#123B43",
    letterSpacing: 0.3,
  },

  slogan: {
    fontSize: 13,
    color: "#68777B",
    marginTop: 4,
    lineHeight: 18,
  },

  notificationButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  /* SEARCH */

  searchContainer: {
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    elevation: 2,
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  searchInput: {
    flex: 1,
    fontSize: 13,
    color: "#222",
    marginLeft: 9,
    paddingVertical: 0,
  },

  searchResults: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginTop: -8,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
  },

  searchResultItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  searchResultIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#E8F8F6",
    justifyContent: "center",
    alignItems: "center",
  },

  searchResultText: {
    flex: 1,
    marginLeft: 10,
  },

  searchResultTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#123B43",
  },

  searchResultDescription: {
    fontSize: 11,
    color: "#777",
    marginTop: 2,
  },

  noResults: {
    alignItems: "center",
    padding: 22,
  },

  noResultsText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#444",
    marginTop: 8,
  },

  noResultsSubtext: {
    fontSize: 11,
    color: "#888",
    marginTop: 4,
    textAlign: "center",
  },

  /* HERO */

  heroCard: {
    backgroundColor: "#14B8A6",
    borderRadius: 18,
    minHeight: 125,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  heroTextContainer: {
    flex: 1,
    paddingRight: 10,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 23,
  },

  heroSubtitle: {
    color: "#E8FFFC",
    fontSize: 12,
    lineHeight: 17,
    marginTop: 6,
  },

  heroIconContainer: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },

  /* SECTION */

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#173F47",
  },

  seeAll: {
    fontSize: 12,
    fontWeight: "600",
    color: "#14B8A6",
  },

  /* CATEGORIES */

  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  categoryCard: {
    width: "31.5%",
    minHeight: 112,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },

  categoryIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#E8F8F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 7,
  },

  categoryTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#173F47",
    textAlign: "center",
  },

  categoryDescription: {
    fontSize: 9,
    color: "#777",
    textAlign: "center",
    lineHeight: 12,
    marginTop: 3,
  },

  /* POPULAR */

  popularCard: {
    backgroundColor: "#FFFFFF",
    minHeight: 70,
    borderRadius: 14,
    marginBottom: 10,
    paddingHorizontal: 13,
    paddingVertical: 11,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },

  popularIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E8F8F6",
    justifyContent: "center",
    alignItems: "center",
  },

  popularText: {
    flex: 1,
    marginLeft: 12,
    paddingRight: 8,
  },

  popularTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#173F47",
  },

  popularDescription: {
    fontSize: 10,
    color: "#777",
    marginTop: 3,
    lineHeight: 14,
  },

  bottomSpace: {
    height: 20,
  },
});