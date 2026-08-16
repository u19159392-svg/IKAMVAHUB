import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const TEAL = "#14B8A6";
const DARK = "#111B4A";
const LIGHT_TEAL = "#E8FAF7";
const BLUE = "#1671D9";
const GREY = "#697397";
const WHITE = "#FFFFFF";

const schools = [
  {
    name: "Baleni",
    type: "Secondary School",
    location: "Bizana",
  },
  {
    name: "Tylelimlhope",
    type: "Secondary School",
    location: "Mount Frere",
  },
  {
    name: "Toleni",
    type: "Secondary School",
    location: "Mount Frere",
  },
  {
    name: "Bonxa",
    type: "High School",
    location: "Tabankulu",
  },
  {
    name: "Dumsi Senior",
    type: "Secondary School",
    location: "Mount Frere",
  },
];

const universities = [
  {
    name: "University of Cape Town",
    location: "Cape Town",
    aps: "APS: 34+",
  },
  {
    name: "Wits University",
    location: "Johannesburg",
    aps: "APS: 36+",
  },
  {
    name: "University of Pretoria",
    location: "Pretoria",
    aps: "APS: 30+",
  },
  {
    name: "University of Johannesburg",
    location: "Johannesburg",
    aps: "APS: 30+",
  },
  {
    name: "UKZN",
    location: "Durban",
    aps: "APS: 28+",
  },
];

export default function HomeScreen() {
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => {}}
          >
            <Ionicons
              name="menu-outline"
              size={34}
              color={DARK}
            />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>
              IKAMVA HUB
            </Text>

            <Text style={styles.tagline}>
              Your Future. Your Choice. Your Journey.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => {}}
          >
            <Ionicons
              name="notifications-outline"
              size={30}
              color={DARK}
            />

            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* =====================================================
            HERO
            TEXT AND IMAGE ARE SEPARATED
        ===================================================== */}

        <View style={styles.hero}>
          {/* LEFT SIDE - TEXT */}

          <View style={styles.heroText}>
            <Text style={styles.heroTitle}>
              Find your school,
            </Text>

            <Text style={styles.heroTitleTeal}>
              Find your future.
            </Text>

            <Text style={styles.heroDescription}>
              Discover opportunities and build
              {"\n"}
              the future you deserve.
            </Text>
          </View>

          {/* RIGHT SIDE - IMAGE */}

          <View style={styles.studentContainer}>
            <Image
              source={require("../../assets/images/schoolkid.png")}
              style={styles.studentImage}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* =====================================================
            SEARCH
        ===================================================== */}

        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={27}
            color="#65709A"
          />

          <TextInput
            placeholder="Search schools, careers, bursaries..."
            placeholderTextColor="#98A2B3"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />

          <TouchableOpacity style={styles.filterButton}>
            <Ionicons
              name="options-outline"
              size={26}
              color="#65709A"
            />
          </TouchableOpacity>
        </View>

        {/* =====================================================
            QUICK OPTIONS
        ===================================================== */}

        <Text style={styles.quickHeading}>
          Quick Options
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickScroll}
        >
          <QuickCard
            icon="school-outline"
            title="Schools"
            description="Find high schools and preparation resources."
            color={TEAL}
            onPress={() => router.push("/schools")}
          />

          <QuickCard
            icon="school-outline"
            title="Universities"
            description="Explore universities, programmes and admission requirements."
            color={BLUE}
            onPress={() => router.push("/universities")}
          />

          <QuickCard
            icon="briefcase-outline"
            title="Careers"
            description="Discover career paths and find the right fit for you."
            color="#11A66A"
            onPress={() => router.push("/careers")}
          />

          <QuickCard
            icon="calculator-outline"
            title="APS Calculator"
            description="Calculate your APS instantly and see what you qualify for."
            color="#FF8500"
            onPress={() => router.push("/aps-calculator")}
          />

          <QuickCard
            icon="cash-outline"
            title="Bursaries"
            description="Find bursaries and funding opportunities to support your studies."
            color="#F52E63"
            onPress={() => router.push("/bursaries")}
          />
        </ScrollView>

        {/* =====================================================
            EASTERN CAPE SCHOOLS
        ===================================================== */}

        <SectionHeader
          title="Eastern Cape Schools"
          onPress={() => router.push("/schools")}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsScroll}
        >
          {schools.map((school, index) => (
            <TouchableOpacity
              key={index}
              style={styles.schoolCard}
              onPress={() => router.push("/schools")}
            >
              <View style={styles.schoolIcon}>
                <Ionicons
                  name="school"
                  size={35}
                  color={TEAL}
                />
              </View>

              <Text style={styles.schoolName}>
                {school.name}
              </Text>

              <Text style={styles.schoolType}>
                {school.type}
              </Text>

              <Text style={styles.location}>
                {school.location}
              </Text>

              <View style={styles.publicBadge}>
                <Text style={styles.publicText}>
                  Public School
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* =====================================================
            POPULAR UNIVERSITIES
        ===================================================== */}

        <SectionHeader
          title="Popular Universities"
          onPress={() => router.push("/universities")}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsScroll}
        >
          {universities.map((university, index) => (
            <TouchableOpacity
              key={index}
              style={styles.universityCard}
              onPress={() => router.push("/universities")}
            >
              <View style={styles.universityLogo}>
                <Ionicons
                  name="school-outline"
                  size={38}
                  color={TEAL}
                />
              </View>

              <Text style={styles.universityName}>
                {university.name}
              </Text>

              <Text style={styles.location}>
                {university.location}
              </Text>

              <View style={styles.apsBadge}>
                <Text style={styles.apsText}>
                  {university.aps}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

/* =====================================================
   QUICK CARD
===================================================== */

function QuickCard({
  icon,
  title,
  description,
  color,
  onPress,
}: {
  icon: any;
  title: string;
  description: string;
  color: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.quickCard}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View
        style={[
          styles.quickIcon,
          {
            backgroundColor: color,
          },
        ]}
      >
        <Ionicons
          name={icon}
          size={32}
          color="white"
        />
      </View>

      <Text
        style={[
          styles.quickTitle,
          {
            color,
          },
        ]}
      >
        {title}
      </Text>

      <Text style={styles.quickDescription}>
        {description}
      </Text>

      <View
        style={[
          styles.arrowButton,
          {
            backgroundColor: color,
          },
        ]}
      >
        <Ionicons
          name="arrow-forward"
          size={22}
          color="white"
        />
      </View>
    </TouchableOpacity>
  );
}

/* =====================================================
   SECTION HEADER
===================================================== */

function SectionHeader({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      <TouchableOpacity onPress={onPress}>
        <View style={styles.viewAll}>
          <Text style={styles.viewAllText}>
            View all
          </Text>

          <Ionicons
            name="arrow-forward"
            size={20}
            color={TEAL}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

/* =====================================================
   STYLES
===================================================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  /* ===================================================
     HEADER
  =================================================== */

  header: {
    height: 78,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: WHITE,
  },

  headerButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  logoText: {
    fontSize: 24,
    fontWeight: "900",
    color: TEAL,
    letterSpacing: 0.5,
  },

  tagline: {
    marginTop: 3,
    fontSize: 10,
    color: DARK,
    fontWeight: "500",
    textAlign: "center",
  },

  notificationDot: {
    position: "absolute",
    top: 6,
    right: 5,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#EF476F",
    borderWidth: 1.5,
    borderColor: WHITE,
  },

  /* ===================================================
     HERO
     
     LEFT = TEXT
     RIGHT = IMAGE
     
     No overlap.
  =================================================== */

  hero: {
    width: "100%",
    minHeight: 340,
    flexDirection: "row",
    backgroundColor: WHITE,
    overflow: "hidden",
  },

  heroText: {
    width: "52%",
    paddingLeft: 23,
    paddingRight: 8,
    paddingTop: 52,
    backgroundColor: WHITE,
    justifyContent: "flex-start",
    zIndex: 2,
  },

  heroTitle: {
  fontSize: 27,
  lineHeight: 33,
  fontWeight: "900",
  color: "#000000",
},

  heroTitleTeal: {
    fontSize: 27,
    lineHeight: 33,
    fontWeight: "900",
    color: TEAL,
  },

  heroDescription: {
    marginTop: 22,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "500",
    color: DARK,
    paddingRight: 2,
  },

  studentContainer: {
    width: "48%",
    height: 270,
    overflow: "hidden",
    borderBottomLeftRadius: 100,
    backgroundColor: LIGHT_TEAL,
  },

  studentImage: {
    width: "100%",
    height: "100%",
  },

  /* ===================================================
     SEARCH
  =================================================== */

  searchContainer: {
    height: 58,
    marginHorizontal: 20,
    marginTop: 18,
    marginBottom: 8,
    paddingLeft: 17,
    paddingRight: 8,
    borderRadius: 30,
    backgroundColor: WHITE,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E6EAF0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 8,
    fontSize: 13,
    color: DARK,
  },

  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: LIGHT_TEAL,
  },

  /* ===================================================
     QUICK OPTIONS
  =================================================== */

  quickHeading: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 5,
    fontSize: 19,
    fontWeight: "900",
    color: DARK,
  },

  quickScroll: {
    paddingHorizontal: 18,
    paddingVertical: 12,
  },

  quickCard: {
    width: 190,
    height: 215,
    marginRight: 13,
    padding: 17,
    borderRadius: 20,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: "#E8ECF2",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  quickIcon: {
    width: 55,
    height: 55,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  quickTitle: {
    marginTop: 13,
    fontSize: 18,
    fontWeight: "900",
  },

  quickDescription: {
    marginTop: 7,
    paddingRight: 5,
    fontSize: 12,
    lineHeight: 17,
    color: "#697397",
  },

  arrowButton: {
    position: "absolute",
    right: 15,
    bottom: 15,
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },

  /* ===================================================
     SECTION HEADERS
  =================================================== */

  sectionHeader: {
    marginTop: 25,
    marginHorizontal: 20,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: DARK,
  },

  viewAll: {
    flexDirection: "row",
    alignItems: "center",
  },

  viewAllText: {
    marginRight: 4,
    fontSize: 13,
    fontWeight: "800",
    color: TEAL,
  },

  /* ===================================================
     SCHOOL CARDS
  =================================================== */

  cardsScroll: {
    paddingHorizontal: 18,
    paddingVertical: 5,
  },

  schoolCard: {
    width: 190,
    minHeight: 220,
    marginRight: 13,
    padding: 16,
    borderRadius: 20,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: "#E8ECF2",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 7,
    elevation: 3,
  },

  schoolIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: LIGHT_TEAL,
    marginBottom: 13,
  },

  schoolName: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "900",
    color: DARK,
  },

  schoolType: {
    marginTop: 4,
    fontSize: 12,
    color: GREY,
  },

  location: {
    marginTop: 5,
    fontSize: 12,
    color: "#7A849C",
  },

  publicBadge: {
    alignSelf: "flex-start",
    marginTop: 13,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: LIGHT_TEAL,
  },

  publicText: {
    fontSize: 10,
    fontWeight: "800",
    color: TEAL,
  },

  /* ===================================================
     UNIVERSITY CARDS
  =================================================== */

  universityCard: {
    width: 190,
    minHeight: 220,
    marginRight: 13,
    padding: 16,
    borderRadius: 20,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: "#E8ECF2",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 7,
    elevation: 3,
  },

  universityLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: LIGHT_TEAL,
    marginBottom: 13,
  },

  universityName: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "900",
    color: DARK,
  },

  apsBadge: {
    alignSelf: "flex-start",
    marginTop: 14,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: TEAL,
  },

  apsText: {
    fontSize: 10,
    fontWeight: "900",
    color: WHITE,
  },
});